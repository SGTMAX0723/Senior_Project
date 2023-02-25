const ConnectionsCard = (props) => {
    return (
        <div className="w-2/3 lg:w-1/2 p-2 ">
            <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${props.followers}/${props.followerAvatar}`}/>

                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">{props.followerName}</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: {props.followerEmail} <br></br> Github: <a className="text-blue-500" href={props.githubLink}>{props.githubLink} </a></p>

            </div>
        </div>
    );
};



export default ConnectionsCard;