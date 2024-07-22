'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Flex, HStack, Image } from '@chakra-ui/react';

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <Box bg="dark_sienna.500" p={4} sx={{
            height: '90px',
            borderBottomRadius: 'md',
            boxShadow: '0 2px 10px 2px rgba(0,0,0,0.5)',
            zIndex: 999
        }}>
            <Flex h={'100%'} alignItems={'center'} justifyContent={'center'}>
                <HStack spacing={8} alignItems={'center'} h={'100%'}>
                    <Box onClick={() => router.push('/')} sx={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer'
                    }}>
                        <Image
                            src='/assets/images/logos/starwars-logo-light.png'
                            alt='Logo'
                            boxSize='100%'
                        />
                    </Box>
                </HStack>
            </Flex>
        </Box>
    );
}

export default Navbar;