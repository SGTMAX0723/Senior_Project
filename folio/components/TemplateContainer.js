import { useState, useEffect, useRef } from 'react';
import CreateForm from './CreateForm';

const TemplateContainer = (props) => {
    const [showButton, setShowButton] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isIconClicked, setIsIconClicked] = useState(false);
    const saveFormRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if ((isIconClicked || showForm) && saveFormRef.current && !saveFormRef.current.contains(event.target)) {
                setIsIconClicked(false);
                setShowForm(false);
            }
        };      
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isIconClicked, showForm]);

    const handleIconClick = () => {
        setIsIconClicked(!isIconClicked);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setIsIconClicked(false);
        setShowForm(false);
    };

    const handleFormSubmit = () => {
        setIsIconClicked(false);
        setShowForm(false);
    };

    return (
        <main className="w-64 mx-auto rounded-md">
            <div className="flex flex-col h-60 rounded-md bg-zinc-50 drop-shadow-md">
                <div className="h-3/5 w-full overflow-hidden overflow-y-auto rounded-t-md">
                    <div
                        className={props.alt_img}
                        onMouseEnter={() => setShowButton(true)}
                        onMouseLeave={() => setShowButton(false)}
                    >
                        {showButton && (
                            <button
                                onClick={handleIconClick}
                                className="bg-secondary hover:brightness-150 text-white py-2 px-4 rounded-md"
                            >
                                Create Project
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center flex-grow">
                    <button onClick={handleIconClick}>
                        <h2 className="w-full text-xl font-medium">
                            <span className="hover:text-[#A3A0FB]">{props.template_name}</span>
                        </h2>
                    </button>
                    <div className="flex justify-center items-center w-full">{props.text}</div>
                </div>
            </div>
            {showForm && (
                <div
                className="fixed z-10 top-0 left-0 h-full w-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
                onClick={handleFormClose}
                >
                    <div
                        className="bg-white p-6 rounded-md"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <CreateForm templateId={props.templateId} onClose={handleFormSubmit} ref={saveFormRef} template_name={props.template_name} />
                    </div>
                </div>
            )}
        </main>
    );
};

export default TemplateContainer;
