// going to be the page that shows all the connections, both followere and following
'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../../components/SideBar';
import NavBarLogged from '../../../../components/NavBarLogged.js';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import Link from 'next/link';
import ConnectionCards from '../../../../components/ConnectionsCard';
import ConnectionBar from '../../../../components/ConnectionBar';


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
        if (isLoggedIn) {
            fetchFollowers();
            fetchFollowing();
        } else {
            router.push('/login');
        }
    }, [isLoggedIn]);  

    useEffect(() => {
        if (followers.length > 0) {
            fetchFollowersInfo();
        }
    }, [followers]);

    if (!isLoggedIn) {
        return null;
    }

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		return null;
	}

    return (
        <main>
            <div className='w-screen min-h-screen flex self-center bg-primary items-center justify-center pl-48'>
                <div className="flex flex-col w-4/5 min-h-screen bg-zinc-50 border-l-2 border-r-2"> 
                    <ConnectionBar followers='followers'/>
                    <div className='flex flex-col w-full items-center justify-center overflow-auto'>
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
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    );
}

export default Followers;