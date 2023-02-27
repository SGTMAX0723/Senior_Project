const TemplateContainer = (props) => {
    return(
        <main>

            <div className='flex-rows w-[23rem] h-72 
                            lg:w-[16rem] lg:h-64 
                            md:w-[16rem] md:h-64 
                            sm:w-[16rem] sm:h-60 
                            bg-[#43425f] drop-shadow-md'>
                <div className="h-1/6 bg-zinc-50 self-end">
                    <div className="template-text">
                        <p className='pl-1'>{props.text}</p>
                    </div>
                    </div>
                <div class="flex flex-wrap justify-center">
                    <img 
                    src = {`https://folio-database.fly.dev/api/files/r7hm900s98f9cmw/${props.id}/${props.img}`}
                    class='w-[23rem] h-72'
                    alt="..."
                    ></img>
                </div>
                

            </div>
        </main>
    );
};


export default TemplateContainer;