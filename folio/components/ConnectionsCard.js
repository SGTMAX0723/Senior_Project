import { AiFillMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import {pb} from "./UserAuthentication";
import FollowButton from './FollowButton';
import Default from '../public/Default_PFP.jpg'
import Link from "next/link";

const ConnectionsCard = (props) => {
    const user = pb.authStore.model;

    return (
        <div className="grid grid-cols-3 h-24 w-full items-center bg-white bg-cover border-b-2 hover:">
            <div className="relative flex h-full w-full justify-center items-center rounded-r-xl bg-cover" style={{backgroundImage: "url('https://i.ibb.co/FWggPq1/banner.png')"}}>
                <div className="absolute -right-10 flex h-20 w-20 items-center justify-center rounded-full border-[4px] border-white bg-white">
                    <img className="h-full w-full rounded-full" src={props.followerAvatar ? `https://folio-database.fly.dev/api/files/_pb_users_auth_/${props.followers}/${props.followerAvatar}` : Default } alt=''/> 
                </div>
            </div>
            <div className="flex flex-col pl-16">
                <Link href={`/accounts/${props.followers}/profile`}>
                    <h4 className="text-secondary text-xl font-bold">{props.followerName}</h4>
                </Link>
                <p className="text-zinc-400">{props.followerEmail}</p>
            </div>
            <div className="flex items-center justify-end pr-8">
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

export default ConnectionsCard;