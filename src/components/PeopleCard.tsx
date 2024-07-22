'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, HStack, Heading, IconButton, Image, Skeleton, SkeletonCircle, SkeletonText, Stack, Tooltip } from '@chakra-ui/react';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getRandomNumber } from '@/lib/helper';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '@/lib/localstorage';

const PeopleCard: React.FC<{
    people: People,
    favoritePeople: {
        get: Array<string>
        set: Function
    }
}> = ({ people, favoritePeople }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        const urlParts = people.url.split('/');
        const id = urlParts[urlParts.length - 2];
        router.push(`/people/${id}`);
    }

    const handleFavorite = () => {
        if (people) {
            let favoritePeopleLocalStorage: Array<string> = getDataFromLocalStorage('favoritePeople') || [];
            if (favoritePeople.get.includes(people.name)) {
                favoritePeople.set(favoritePeople.get.filter((n) => n !== people.name));
                favoritePeopleLocalStorage = favoritePeopleLocalStorage.filter((n) => n !== people.name);
            } else {
                favoritePeople.set((prev: Array<string>) => ([...prev, people.name]));
                favoritePeopleLocalStorage.push(people.name);
            }
            saveDataToLocalStorage('favoritePeople', favoritePeopleLocalStorage, true);
        }
    }

    return (
        <>
            <Card maxW='sm' sx={{ position: 'relative', overflow: 'hidden' }}>
                <Box bg={'blue.600'} sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '7px',
                    zIndex: 99
                }}></Box>
                <CardBody>
                    {/* Note: there is not any image coming from the api so used random images from the assets */}
                    <Image
                        src={`/assets/images/characters/character${getRandomNumber()}.jpg`}
                        alt='Starwars characters'
                        height={'250px'}
                        borderRadius='lg'
                        objectFit={'cover'}
                        objectPosition={'center center'}
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='sm' sx={{
                            fontFamily: 'var(--font-press-start-2p)'
                        }}>{people.name}</Heading>
                        <Stack gap={0}>
                            <HStack mt={4}>
                                <Badge colorScheme='blue' variant={'solid'}>Height</Badge>
                                <Badge colorScheme='blue' variant={'subtle'}>{people.height}</Badge>
                            </HStack>
                            <HStack mt={4}>
                                <Badge colorScheme='cyan' variant={'solid'}>Mass</Badge>
                                <Badge colorScheme='cyan' variant={'subtle'}>{people.mass}</Badge>
                            </HStack>
                            <HStack mt={4}>
                                <Badge colorScheme='orange' variant={'solid'}>Hair color</Badge>
                                <Badge colorScheme='orange' variant={'subtle'}>{people.hair_color}</Badge>
                            </HStack>
                            <HStack mt={4}>
                                <Badge colorScheme='purple' variant={'solid'}>Skin color</Badge>
                                <Badge colorScheme='purple' variant={'subtle'}>{people.skin_color}</Badge>
                            </HStack>
                            <HStack mt={4}>
                                <Badge colorScheme='green' variant={'solid'}>Eye color</Badge>
                                <Badge colorScheme='green' variant={'subtle'}>{people.eye_color}</Badge>
                            </HStack>
                            <HStack mt={4}>
                                <Badge colorScheme='cyan' variant={'solid'}>Birth year</Badge>
                                <Badge colorScheme='cyan' variant={'subtle'}>{people.birth_year}</Badge>
                            </HStack>
                            <HStack mt={4}>
                                <Badge colorScheme='yellow' variant={'solid'}>Gender</Badge>
                                <Badge colorScheme='yellow' variant={'subtle'}>{people.gender}</Badge>
                            </HStack>
                        </Stack>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2' justifyContent={'space-between'} width={'100%'}>
                        <Button variant='solid' bg={'dark_sienna.400'} borderRadius={'sm'} onClick={handleViewDetails}>
                            View Details
                        </Button>
                        <Tooltip hasArrow label='Add to favorites' bg='black' color='white' placement='top'>
                            <IconButton
                                isRound={true}
                                variant='outline'
                                colorScheme='red'
                                aria-label='Favourite'
                                fontSize='20px'
                                icon={favoritePeople.get.includes(people.name) ? <MdFavorite /> : <MdFavoriteBorder />}
                                onClick={handleFavorite}
                            />
                        </Tooltip>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    )
}

export const PeopleCardSkeleton: React.FC<{
    isLoaded: boolean
}> = ({ isLoaded }) => {
    return (
        <Card maxW='sm'>
            <CardBody>
                <Skeleton maxWidth={'100%'} height={'200px'} isLoaded={isLoaded} borderRadius={'lg'} />
                <Stack mt='6' spacing='3'>
                    <SkeletonText height={'36px'} isLoaded={isLoaded} />
                    <Stack gap={0}>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <HStack key={index} mt={4}>
                                <Skeleton height={'18px'} width={'80px'} isLoaded={isLoaded} />
                                <Skeleton height={'18px'} width={'80px'} isLoaded={isLoaded} />
                            </HStack>
                        ))}
                    </Stack>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Flex justifyContent={'space-between'} width={'100%'}>
                    <Skeleton height={'40px'} width={'125px'} isLoaded={isLoaded} />
                    <SkeletonCircle height={'40px'} width={'40px'} isLoaded={isLoaded} />
                </Flex>
            </CardFooter>
        </Card>
    )
}

export default PeopleCard;