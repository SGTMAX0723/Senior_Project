// going to be the page that shows all the connections, both followere and following
'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../../components/SideBar';
import NavBarLogged from '../../../../components/NavBarLogged.js';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import Link from 'next/link';
import ConnectionsButtonFollowing from '../../../../components/ConnectionsButtonFollowing';
import ConnectionCards from '../../../../components/ConnectionsCard';




const Following = () => {
    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    const user: any = pb.authStore.model; 
    pb.autoCancellation(false);

    type MyRecord = Record<string, number>;
    const [following, setFollowing] = useState([] as MyRecord[]);
    const [followers, setFollowers] = useState([] as MyRecord[]);
    const [users, setUsers] = useState([] as MyRecord[]);
    const [name, setName] = useState([] as MyRecord[]);
    const [email, setEmail] = useState([] as MyRecord[]);
    const [github, setGithub] = useState([] as MyRecord[]);

    let match = false;

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

    const fetchAvatars = async () => {
        const promises = following.map(({ followed }: any) => {
            return pb.collection('users').getOne(followed, {
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
            fetchFollowing();
            fetchFollowers();
        } else {
            router.push('/login');
        }
    }, [isLoggedIn]);  

    useEffect(() => {
        if (following.length > 0) {
            fetchAvatars();
        }
    }, [following]);

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
            <div className='xl:h-screen lg:h-screen md:h-screen sm:h-screen pt-16 ml-48
                            flex
                            bg-primary'>
                
                <div className="container mt-5 sm:mt place-items-center grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 space-x-2 space-y-2 pt-16 ml-4 "> 
                    {following.map(({ follows, followed, id }: any, index:number) => {
                        followers.map(({ follows, followed }: any) => {
                            if (followed === user.id && follows === followers[index].follows) {
                                match = true;
                            }
                        })
                        return (
                        <ConnectionCards    key={index} 
                                            cardType='following'
                                            currentUserId={user.id}
                                            connection={id}
                                            match={match}
                                            following={follows === user.id}
                                            followers={followed}
                                            followerAvatar={users[index]} 
                                            followerName={name[index]} 
                                            followerEmail={email[index]}
                                            githubLink={github[index]}
                                            onFollow={() => fetchFollowing()}
                                            onUnfollow={() => fetchFollowing()} />
                    )})}
                </div>
            </div>
            <NavBarLogged />
            <ConnectionsButtonFollowing />
            <SideBar />
        </main>
    );
}

export default Following;
