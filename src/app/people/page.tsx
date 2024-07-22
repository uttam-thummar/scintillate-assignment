'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const People: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, [router]);

    return (<></>);
}

export default People;