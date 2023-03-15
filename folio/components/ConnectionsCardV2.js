import { AiFillMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si"
import FollowButton from '../components/FollowButton'
import { useEffect, useState } from 'react';
import {pb} from "./UserAuthentication";



const ConnectionsCardV2 = (props) => {


    const [isFollowing, setIsFollowing] = useState(false);
    user = pb.authStore.model;


    return (

        <div class="dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[550px] flex-col items-center bg-white bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none rounded">
            <div class="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover" style={{backgroundImage: "url('https://i.ibb.co/FWggPq1/banner.png')"}}>
                <div class="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                 <img class="h-full w-full rounded-full" src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${props.followers}/${props.followerAvatar}`}/> 
                </div>
            </div>
            <div class="mt-16 flex flex-col items-center">
                <h4 class="text-bluePrimary text-xl font-bold">{props.followerName}</h4>
                <IconText icon={<AiFillMail size='20' />} text={<p className="text-grey-darker lg:mr-3 " >{props.followerEmail}</p>}/>
                <IconText icon={<SiGithub size='20' />} text={<a className="text-blue-500 mr-3" href={props.githubLink}>{props.githubLink} </a>}/>

            </div>
            <div >
                <FollowButton /*isFollowing={isFollowing} userId={props.currentUserId} followId={props.followers} setIsFollowing={setIsFollowing} */ />
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

export default ConnectionsCardV2;