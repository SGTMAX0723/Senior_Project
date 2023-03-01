import { FcLike } from "react-icons/fc";
import  { pb } from 'components/UserAuthentication';

const ImageContainerDashboard = (props) => {
    return(
        <main>
            <div className='flex-rows w-[23rem] h-72 
                            lg:w-[23rem] lg:h-64 
                            md:w-[23rem] md:h-64 
                            sm:w-[23rem] sm:h-60 
                            bg-[#43425f] drop-shadow-md'>
                <div className="h-5/6 self-end overflow-hidden overflow-y-auto">
                    <img src={`https://folio-database.fly.dev/api/files/zncdy0gkg9xd30m/${props.id}/${props.project_img}`}/>
                </div>
                <div className="h-1/6 bg-zinc-50 self-end flex justify-center items-center">
                    <div className='h-full text-sm w-full flex justify-center items-center'>
                        <ImageContainerDashboardUtility icon={<FcLike size="18" className="ml-[72px]" /> } text={<p className='font-bold'>{props.project_name}</p>} />
                    </div>
                </div>
            </div>
        </main>
    );
};

const ImageContainerDashboardUtility = ({ text, icon }) => (
    <div className='flex items-center justify-center w-full'>
        <div class="flex-1"></div>
        {text}
        <div class="flex-1">
            <button>{icon}</button>
        </div>
    </div>
);

export default ImageContainerDashboard;