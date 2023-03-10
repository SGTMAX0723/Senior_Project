import { useState } from 'react';

const TemplateContainer = (props) => {
    const [showButton, setShowButton] = useState(false);

    return (
        <main className="w-64 mx-auto rounded-md">
            <div className="flex flex-col h-60 rounded-md bg-zinc-50 drop-shadow-md">
                <div className="h-3/5 w-full overflow-hidden overflow-y-auto rounded-t-md">
                    {/* <img src={`https://folio-database.fly.dev/api/files/zncdy0gkg9xd30m/${props.id}/${props.project_img}`}/> */}
                    <div className={props.alt_img}
                        onMouseEnter={() => setShowButton(true)}
                        onMouseLeave={() => setShowButton(false)}>
                        {showButton && (
                            <button onClick={props.create_proj} className="bg-secondary hover:brightness-150 text-white py-2 px-4 rounded-md">
                                Create Project
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center flex-grow">
                    <button onClick={props.create_proj}>
                        <h2 className="w-full text-xl font-medium"><span className="hover:text-[#A3A0FB]">{props.template_name}</span></h2>
                    </button>
                    <div className="flex justify-center items-center w-full">
                        {props.text}
                    </div>
                </div>
            </div>
        </main>
    )
};

export default TemplateContainer;