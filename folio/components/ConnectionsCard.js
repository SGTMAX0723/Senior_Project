import { AiFillMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si"


const ConnectionsCard = (props) => {
    return (
        <div className="w-2/3 lg:w-1/2 p-2 ">
            <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal flex items-center">

                <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${props.followers}/${props.followerAvatar}`}/>

                <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">{props.followerName}</div> 
                <div>
                    <IconText icon={<AiFillMail size='20' />} text={<p className="text-grey-darker lg:mr-3 " >{props.followerEmail}</p>}/>
                    <IconText icon={<SiGithub size='20' />} text={<a className="text-blue-500" href={props.githubLink}>{props.githubLink} </a>}/>
                </div>
            </div>
        </div>
    );
};

// React components that take an icon and text component as input props and renders
// out a div class of sidebar-icon-top and bottom with the icon and text inside it.
const IconText = ({ icon, text }) => (
    <div className='icon-text flex items-center space-x-2 ml-1'>
        {icon}
        {text}
    </div>
);

export default ConnectionsCard;