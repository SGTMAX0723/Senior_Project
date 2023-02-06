const TemplateContainer = () => {
    return(
        <main>
            <div className='flex-rows w-[23rem] h-72 
                            lg:w-[16rem] lg:h-64 
                            md:w-[16rem] md:h-64 
                            sm:w-[16rem] sm:h-60 
                            bg-[#43425f] drop-shadow-md'>
                <div className="h-5/6 self-end"></div>
                <div className="h-1/6 bg-zinc-50 self-end"></div>
            </div>
        </main>
    );
};

export default TemplateContainer;