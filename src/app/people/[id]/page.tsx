'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Image, Spinner, Stack, Tag, Text, Tooltip, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { AxiosResponse } from 'axios';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { API } from '@/lib/Api';
import { getRandomNumber } from '@/lib/helper';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '@/lib/localstorage';

const randomNumber = getRandomNumber();

const PeopleDetails: React.FC<{
    params: { id: string }
}> = ({ params }) => {
    const toast = useToast();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [peopleDetail, setPeopleDetail] = useState<People | null>(null);
    const [films, setFilms] = useState<Array<Film>>([]);
    const [favoritePeople, setFavoritePeople] = useState<Array<string>>([]);

    const handleFavorite = () => {
        if (peopleDetail) {
            let favoritePeopleLocalStorage: Array<string> = getDataFromLocalStorage('favoritePeople') || [];
            if (favoritePeople.includes(peopleDetail.name)) {
                setFavoritePeople(favoritePeople.filter((n) => n !== peopleDetail.name));
                favoritePeopleLocalStorage = favoritePeopleLocalStorage.filter((n) => n !== peopleDetail.name);
            } else {
                setFavoritePeople((prev: Array<string>) => ([...prev, peopleDetail.name]));
                favoritePeopleLocalStorage.push(peopleDetail.name);
            }
            saveDataToLocalStorage('favoritePeople', favoritePeopleLocalStorage, true);
        }
    }

    useEffect(() => {
        const favoritePeopleLocalStorage: Array<string> = getDataFromLocalStorage('favoritePeople') || [];
        setFavoritePeople(favoritePeopleLocalStorage);

    }, []);

    useEffect(() => {
        const getStarWarsPeopleDetail = async () => {
            try {
                setIsLoading(true);
                const endpoint: string = `https://swapi.dev/api/people/${params.id}`;
                const response: AxiosResponse = await API.get(endpoint);

                if (response.data.name !== undefined) {
                    setPeopleDetail(response.data);

                    const filmsPromises = response.data.films.map(async (film: string) => {
                        try {
                            const response: AxiosResponse = await API.get(film);

                            if (response.data.title) {
                                return response.data;
                            } else {
                                return null;
                            }
                        } catch (error) {
                            console.log("Error filmsPromises:", error);
                            return null;
                        }
                    });
                    const films = (await Promise.all(filmsPromises)).filter(Boolean);
                    setFilms(films);

                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    toast({
                        title: response.data.message || "Something went wrong",
                        description: "Please try after sometime!",
                        status: 'error',
                        variant: 'left-accent',
                        position: 'top-right'
                    });
                    router.push('/');
                }
            } catch (error: any) {
                setIsLoading(false);
                console.log('Error:', error);
                toast({
                    title: error?.response?.data?.message || "Something went wrong",
                    description: "Please try after sometime!",
                    status: 'error',
                    variant: 'left-accent',
                    position: 'top-right'
                });
            }
        }

        getStarWarsPeopleDetail();
    }, [params.id, toast, router]);

    return (
        <>
            <Box bg="dark_sienna.100" sx={{
                width: '100vw',
                height: 'calc(100vh - 90px)',
                overflowY: 'auto'
            }}>
                {isLoading ? (
                    <Flex maxWidth={'1800px'} width={'100%'} p={4} justifyContent={'center'} alignItems={'center'} gap={'60px'} height={'calc(100vh - 140px)'}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='dark_sienna.200'
                            color='dark_sienna.500'
                            size='xl'
                        />
                    </Flex>
                ) : (
                    peopleDetail && (
                        <Flex maxWidth={'1800px'} width={'100%'} p={4} justifyContent={'center'} gap={'60px'}>
                            <Box bg={'white'} sx={{
                                boxShadow: '0 2px 10px 2px rgba(0,0,0,0.1)',
                                p: '20px',
                                maxW: '1000px',
                                minH: '100%',
                                borderRadius: '9px'
                            }}>
                                <Stack>
                                    <IconButton
                                        isRound={true}
                                        variant='outline'
                                        colorScheme='dark_sienna'
                                        aria-label='Back'
                                        fontSize='20px'
                                        icon={<ArrowBackIcon />}
                                        onClick={() => router.push('/')}
                                        sx={{
                                            alignSelf: 'center',
                                            width: 'fit-content',
                                            mb: 4
                                        }}
                                    />
                                    <Heading size='2xl' textAlign={'center'} width={'100%'} mt={2} sx={{
                                        fontFamily: 'var(--font-press-start-2p)'
                                    }}>{peopleDetail.name}</Heading>
                                    <Flex gap={'10px'} mt={4} wrap={'wrap'} w={{ sm: '100%', md: '90%' }} justifyContent={'center'} alignSelf={'center'}>
                                        <Badge colorScheme='yellow'>Gender: {peopleDetail.gender}</Badge>
                                        <Badge colorScheme='green'>Height: {peopleDetail.height}</Badge>
                                        <Badge colorScheme='orange'>Mass: {peopleDetail.mass}</Badge>
                                        <Badge colorScheme='red'>Hair Color: {peopleDetail.hair_color}</Badge>
                                        <Badge colorScheme='blue'>Skin Color: {peopleDetail.skin_color}</Badge>
                                        <Badge colorScheme='gray' variant='solid'>Eye Color: {peopleDetail.eye_color}</Badge>
                                        <Badge colorScheme='purple'>Birth Year: {peopleDetail.birth_year}</Badge>
                                    </Flex>
                                    <Box p={2} width={'100%'} mt={4}>
                                        {/* Note: there is not any image coming from the api so used random images from the assets */}
                                        <Image
                                            src={`/assets/images/characters/character${randomNumber}.jpg`}
                                            alt='Starwars characters'
                                            width={'100%'}
                                            borderRadius='lg'
                                            objectFit={'cover'}
                                            objectPosition={'center center'}
                                        />
                                    </Box>
                                    <Tooltip hasArrow label='Add to favorites' bg='black' color='white' placement='bottom'>
                                        <IconButton
                                            isRound={true}
                                            variant='outline'
                                            colorScheme='red'
                                            aria-label='Favourite'
                                            fontSize='20px'
                                            icon={favoritePeople.includes(peopleDetail.name) ? <MdFavorite /> : <MdFavoriteBorder />}
                                            onClick={handleFavorite}
                                            sx={{
                                                alignSelf: 'center',
                                                width: 'fit-content',
                                                my: 4
                                            }}
                                        />
                                    </Tooltip>
                                    <Stack>
                                        <Text fontSize='4xl'>Films:</Text>
                                        {films.map((film: Film, index) => (
                                            <Card key={index} variant={'filled'}>
                                                <CardHeader>
                                                    <Heading size='md'>{film.title}</Heading>
                                                    <Badge colorScheme='dark_sienna'>Ep. {film.episode_id}</Badge>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>Description: {film.opening_crawl}</Text>
                                                    <Stack mt={4}>
                                                        <Tag size={'md'} variant='solid' colorScheme='orange' w={'fit-content'} borderRadius={'sm'}>
                                                            Director: {film.director}
                                                        </Tag>
                                                        <Tag size={'md'} variant='solid' colorScheme='blue' w={'fit-content'} borderRadius={'sm'}>
                                                            Producer: {film.producer}
                                                        </Tag>
                                                        <Tag size={'md'} variant='solid' colorScheme='green' w={'fit-content'} borderRadius={'sm'}>
                                                            Releasing on: {film.release_date}
                                                        </Tag>
                                                    </Stack>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Box>
                        </Flex>
                    )
                )}
            </Box>
        </>
    )
}

export default PeopleDetails;