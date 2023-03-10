// going to be the page that shows all the connections, both followere and following
'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import ConnectionCards from '../../../components/ConnectionsCard';

export default function Followers() {
    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    const user: any = pb.authStore.model; 
    pb.autoCancellation(false);

    type MyRecord = Record<string, number>;
    const [connections, setConnections] = useState([] as MyRecord[]);
    const [users, setUsers] = useState([] as MyRecord[]);
    const [name, setName] = useState([] as MyRecord[]);
    const [email, setEmail] = useState([] as MyRecord[]);
    const [github, setGithub] = useState([] as MyRecord[]);

    const fetchConnections = async () => {
        let expandFollowers = 'followed = "' + user.id + '"';
        try {
            const records = await pb.collection('connections').getList(1, 100000000, /* batch size */ {
                sort: '-created',
                filter: expandFollowers
            });
            setConnections(records.items);
        } catch(error) {
            console.error(error);
        }
    };

    const fetchAvatars = async () => {
        const promises = connections.map(({ follows }: any) => {
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
        fetchConnections();
    }, []);

    useEffect(() => {
        if (connections.length > 0) {
            fetchAvatars();
        }
    }, [connections]);

    if (isLoggedIn) {
        return (
            <main>
                <div className='xl:h-screen lg:h-screen md:h-screen sm:h-screen min-h-screen pt-16 ml-48
                                flex
                                bg-primary'>
    
                    <div className="container max-w-7xl  m-auto flex md:flex-row shrink:0 items-center justify-center"> 
                    
                     {connections.map(({ follows }: any, index:number) => (
                        <ConnectionCards    key={index} 
                                            followers={follows} 
                                            followerAvatar={users[index]} 
                                            followerName={name[index]} 
                                            followerEmail={email[index]}
                                            githubLink={github[index]} />
                        ))}
                    </div>
                </div>
                <NavBarLogged />
                <SideBar />
            </main>
        )
    } else {
        router.push('/login')
    }
}
