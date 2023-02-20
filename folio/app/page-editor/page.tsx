'use client'

import { useRouter } from 'next/navigation';
import GrapesJS from '../../components/GrapesJS_Init.js';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

const Editor = () => {
    // Re-renders the component after the first render
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        // This forces a rerender, so the page is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();

    if (isLoggedIn) {
        return (
            <div>
                <GrapesJS />
            </div>
        );
    } else {
        router.push('/login')
    }
};

export default Editor;