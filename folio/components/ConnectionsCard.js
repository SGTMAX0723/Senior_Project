import { AiFillMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import {pb} from "./UserAuthentication";
import FollowButton from './FollowButton';



const ConnectionsCard = (props) => {
    user = pb.authStore.model;

    return (
        <div class="shadow-shadow-500 shadow-3xl rounded-primary mx-2 flex h-80 w-96 flex-col items-center bg-white bg-cover bg-clip-border p-[16px] rounded-xl border hover:shadow-2xl">
            <div class="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover" style={{backgroundImage: "url('https://i.ibb.co/FWggPq1/banner.png')"}}>
                <div class="absolute -bottom-10 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                    <img class="h-full w-full rounded-full" src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${props.followers}/${props.followerAvatar}`} alt='user profile'/> 
                </div>
            </div>
            <div class="mt-16 flex flex-col items-center">
                <h4 class="text-bluePrimary text-xl font-bold">{props.followerName}</h4>
                <IconText icon={<AiFillMail size='20' />} text={<p className="text-grey-darker lg:mr-3 " >{props.followerEmail}</p>}/>
                <IconText icon={<SiGithub size='20' />} text={<a className="text-blue-500 mr-3" href={props.githubLink}>{props.githubLink} </a>}/>

            </div>
            <div >
                <FollowButton   userId={props.currentUserId} 
                                cardType={props.cardType}
                                connection={props.connection} 
                                followId={props.followers} 
                                follows={props.follows}
                                following={props.following} 
                                match={props.match}
                                onFollow={() => props.onFollow(props.followers)}
                                onUnfollow={() => props.onUnfollow(props.followers)} />
            </div>

        </div>
    );
};

// React components that take an icon and text component as input props and renders
// out a div class of sidebar-icon-top and bottom with the icon and text inside it.
const IconText = ({ icon, text }) => (
    <div className='icon-text flex items-center space-x-2 ml-1 mr-3'>
        {icon}
        {text}
    </div>
);

export default ConnectionsCard;