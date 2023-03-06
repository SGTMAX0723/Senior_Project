const TemplateContainer = (props) => {
    return(
        <main>
            <div className='flex-rows w-[23rem] h-72 
                            lg:w-[16rem] lg:h-64 
                            md:w-[16rem] md:h-64 
                            sm:w-[16rem] sm:h-60 
                            bg-[#43425f] drop-shadow-md'>
                <div className="flex items-center h-1/6 bg-zinc-50 self-end">
                    <div className="pl-2">
                        {props.text}
                    </div>
                </div>
                <div className="flex flex-wrap h-5/6">
                    <img 
                    src = {`https://folio-database.fly.dev/api/files/r7hm900s98f9cmw/${props.id}/${props.img}`}
                    className='object-cover w-full h-full'
                    alt=''
                    ></img>
                </div>
            </div>
        </main>
    );
};


export default TemplateContainer;