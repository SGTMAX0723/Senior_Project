'use client'

import { useState, useEffect } from 'react';
import UserProfile from '../../../../components/UserProfile';

export default function Profile() {
    const [hydrated, setHydrated] = useState(false);
    
    useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		return null;
	}

    return (
        <UserProfile />
    );
}