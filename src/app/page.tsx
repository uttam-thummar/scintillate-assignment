'use client';

import { Box, Button, ButtonGroup, Grid, GridItem, IconButton, Stack, useToast } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { API } from "@/lib/Api";
import { AxiosResponse } from "axios";
import PeopleCard, { PeopleCardSkeleton } from "@/components/PeopleCard";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getDataFromLocalStorage } from "@/components/localstorage";

export default function People() {
  const toast = useToast();
  const contentDivRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [people, setPeople] = useState<Array<People>>([]);
  const [favoritePeople, setFavoritePeople] = useState<Array<string>>([]);

  const handleCurrentPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (contentDivRef.current) {
      contentDivRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    const getStarWarsPeopleList = async () => {
      try {
        setIsLoading(true);
        const endpoint: string = `https://swapi.dev/api/people?page=${currentPage}`;
        const response: AxiosResponse = await API.get(endpoint);

        if (response.data.count !== undefined) {
          setPeople(response.data.results);
          if (currentPage === 1) {
            setTotalPages(Math.ceil(response.data.count / response.data.results.length));
          }

          const favoritePeopleLocalStorage: Array<string> = getDataFromLocalStorage('favoritePeople') || [];
          setFavoritePeople(favoritePeopleLocalStorage);

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

    getStarWarsPeopleList();
  }, [currentPage, toast]);

  return (
    <>
      <Navbar />
      <Box ref={contentDivRef} bg="dark_sienna.100" sx={{
        width: '100vw',
        height: 'calc(100vh - 90px)',
        overflowY: 'auto'
      }}>
        <Stack maxWidth={'1800px'} width={'100%'} p={4} justifyContent={'center'} alignItems={'center'} gap={'60px'}>
          <Grid templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            '2xl': 'repeat(4, 1fr)',
          }} gap={6}>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <GridItem key={index} w='100%'>
                  <PeopleCardSkeleton isLoaded={!isLoading} />
                </GridItem>
              ))
            ) : (
              people.map((p, index) => (
                <GridItem key={index} w='100%'>
                  <PeopleCard
                    people={p}
                    favoritePeople={{ get: favoritePeople, set: setFavoritePeople }}
                  />
                </GridItem>
              ))
            )}
          </Grid>
          {totalPages && (
            <Box>
              <ButtonGroup spacing={2} justifyContent={'end'} width={'100%'}>
                <IconButton
                  variant='solid'
                  borderRadius={'sm'}
                  colorScheme='coffee'
                  aria-label='first'
                  fontSize='20px'
                  isDisabled={currentPage === 1}
                  icon={<ArrowLeftIcon />}
                  onClick={() => handleCurrentPageChange(1)}
                />
                <IconButton
                  variant='solid'
                  borderRadius={'sm'}
                  colorScheme='coffee'
                  aria-label='previous'
                  fontSize='20px'
                  isDisabled={currentPage === 1}
                  icon={<ChevronLeftIcon />}
                  onClick={() => handleCurrentPageChange(currentPage - 1)}
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button key={index} variant={'solid'} colorScheme={currentPage === index + 1 ? 'dark_sienna' : 'coffee'} borderRadius={'sm'} onClick={() => handleCurrentPageChange(index + 1)}>
                    {index + 1}
                  </Button>
                ))}
                <IconButton
                  variant='solid'
                  borderRadius={'sm'}
                  colorScheme='coffee'
                  aria-label='next'
                  fontSize='20px'
                  isDisabled={currentPage === totalPages}
                  icon={<ChevronRightIcon />}
                  onClick={() => handleCurrentPageChange(currentPage + 1)}
                />
                <IconButton
                  variant='solid'
                  borderRadius={'sm'}
                  colorScheme='coffee'
                  aria-label='last'
                  fontSize='20px'
                  isDisabled={currentPage === totalPages}
                  icon={<ArrowRightIcon />}
                  onClick={() => handleCurrentPageChange(totalPages)}
                />
              </ButtonGroup>
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
}
