import React, {useState} from 'react'

function Popup(props) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.handleUpdatePicture(selectedFile);
        props.setProfilePicture(selectedFile);
        props.setTrigger(false);
    };

    return (props.trigger) ? (
        <div className='bg-white w-64 h-64'>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect} />
                {selectedFile && <img className='inline-block h-36 w-36 rounded-full' src={selectedFile} alt="Selected Image"/>}
                <button className='border bg-indigo-900 text-white' type="submit">Save</button>
            </form>
            {props.children}
        </div>
    ): null;
}

export default Popup;