// going to be the page that shows all the connections, both followere and following
'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../../components/SideBar';
import NavBarLogged from '../../../../components/NavBarLogged.js';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import Link from 'next/link';
import ConnectionCards from '../../../../components/ConnectionsCard';
import ConnectionsButtonFollowers from '../../../../components/ConnectionsButtonFollowers';


const Followers = () => {
    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    const user: any = pb.authStore.model;

    pb.autoCancellation(false);

    type MyRecord = Record<string, number>;
    const [followers, setFollowers] = useState([] as MyRecord[]);
    const [following, setFollowing] = useState([] as MyRecord[]);
    const [users, setUsers] = useState([] as MyRecord[]);
    const [name, setName] = useState([] as MyRecord[]);
    const [email, setEmail] = useState([] as MyRecord[]);
    const [github, setGithub] = useState([] as MyRecord[]);

    let match = false;

    // Get users who follow logged in user 
    const fetchFollowers = async () => {
        let expandFollowers = 'followed = "' + user.id + '"';
        try {
            const records = await pb.collection('connections').getList(1, 100000000, /* batch size */ {
                sort: '-created',
                filter: expandFollowers
            });
            setFollowers(records.items);
        } catch(error) {
            console.error(error);
        }
    };

    const fetchFollowing = async () => {
        let expandFollowers = 'follows = "' + user.id + '"';
        try {
            const records = await pb.collection('connections').getList(1, 100000000, /* batch size */ {
                sort: '-created',
                filter: expandFollowers
            });
            setFollowing(records.items);
        } catch(error) {
            console.error(error);
        }
    };

    const fetchFollowersInfo = async () => {
        const promises = followers.map(({ follows }: any) => {
            return pb.collection('users').getOne(follows, {
                expand: 'avatar, name, email, githubLink',
            });
        });
        const records = await Promise.all(promises);
        setUsers(records.map((record: any) => record.avatar));
        setName(records.map((record: any) => record.name));
        setEmail(records.map((record: any) => record.email));
        setGithub(records.map((record: any) => record.githubLink));
        console.log(records);
    };

    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
    });

    useEffect(() => {
        if (followers.length > 0) {
            fetchFollowersInfo();
        }
    }, [followers]);

    if (isLoggedIn) {
        return (
            <main>
                <div className='xl:h-screen lg:h-screen md:h-screen sm:h-screen min-h-screen pt-16 ml-48
                                flex
                                bg-primary'>

                    
                    <div className="container mt-5 sm:mt place-items-center grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 space-x-2 space-y-2 pt-16 ml-4 "> 
                    
                        {followers.map(({ follows, followed, id }: any, index:number) => {
                            following.map(({ follows, followed }: any) => {
                                if (follows === user.id && followed === followers[index].follows) {
                                    match = true;
                                }
                            })
                            return (
                            <ConnectionCards    key={index}
                                                cardType='followers'
                                                currentUserId={user.id}
                                                connection={id}
                                                match={match}
                                                following={followed === user.id}
                                                followers={follows} 
                                                followerAvatar={users[index]} 
                                                followerName={name[index]} 
                                                followerEmail={email[index]}
                                                githubLink={github[index]}
                                                onFollow={() => fetchFollowers()}
                                                onUnfollow={() => fetchFollowers()} />
                        )})}
                    </div>
                </div>
                
                <NavBarLogged />
                <ConnectionsButtonFollowers />
                <SideBar />
            </main>
        )
    } else {
        router.push('/login')
    }
}

export default Followers;