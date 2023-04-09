import { MdCheckCircle, MdSettings } from 'react-icons/md';
import { motion } from "framer-motion";
import { Box, Flex, Accordion,
    Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Img,
  List,
  ListItem,
  ListIcon,
  useMediaQuery,
  Icon,
  Stack,
  Divider,
  Skeleton,
  Heading} from '@chakra-ui/react';
import { GiElfHelmet, GiPointySword, GiSwordSmithing } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { componentsRepository } from '@/repositories/functions';
import Image from "next/image";
import {RiSeparator} from 'react-icons/ri';

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `Montserrat, sans-serif`,
    body: `'Body Font Name', sans-serif`,
  },
})

export default theme

type FetchComponentsCategoryProps = {
    categories: Array<string>;
    supabaseClient: any;
};


const displayComponentLevel = (marketPrice:string, category:string) => {
    // GiPunchBlast => bad
    // GiPointySword => medium
    // GiAk47 => good
    // GiUfo => very good

    // GiCrackedSaber => dogshit

    // TODO implements rules

    return ( 
        <Box
            w={10}
            h={10}
            bgGradient="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
            borderRadius="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backdropFilter="blur(10px) brightness(150%) saturate(120%)"
            shadow="xl">
                <Icon as={GiPointySword} w={6} h={6} color="black" />
        </Box>

    )
    
}


const displayAsPrice = (price:string) : string => {

    const formattedPrice = (parseInt(price) / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });

    return formattedPrice;

}


const getProperCatName = (cat:string) : string => {
    switch (cat.toLowerCase()) {
        case "gpu":
            return "Carte graphique".toUpperCase();
        case "cpu":
            return "Processeur".toUpperCase();
        case "ram":
            return "Mémoire vive (RAM)".toUpperCase();
        case "motherboard":
            return "Carte mère".toUpperCase();
        case "power_supply":
            return "Alimentation".toUpperCase();
        case "ventirad":
            return "Refroidissement".toUpperCase();
        case "box":
            return "Boitier".toUpperCase();
        case "keyboard":
            return "Clavier".toUpperCase();
        case "mouse":
            return "Souris".toUpperCase();
        case "monitor":
            return "Ecran".toUpperCase();
        case "hdd":
            return "Stockage HDD".toUpperCase();
        case "ssd1":
            return "Stockage SSD".toUpperCase();
        case "m2":
            return "Stockage M2".toUpperCase();
        case "termal_paste":
            return "Pâte thermique".toUpperCase();
        default:
            break;
    }

    return cat;

}



// TODO : for cache could consider redis instead ( with TTL key ) but since values are not changing often, it's not a big deal
export const FetchComponentsCategory = ({categories, supabaseClient}:FetchComponentsCategoryProps) => {

    const [isLargerThanTablet] = useMediaQuery("(min-width: 48em)");
    const flexBasis = isLargerThanTablet ? "25%" : "50%";


    const [cacheDataComponents, setCacheDataComponents] = useState<any>(new Map());

    // One the first time we click on tab, data is stored into state for caching and if we reclick , just get data from it, call is not required
    const handleAccordionChange = async (openIndexes:any) => {
        let cache: Map<number, any> = new Map(cacheDataComponents);

        if ( openIndexes.length > 0 ) {
            // ! map not working as expected when using async / await inside

            for ( let index of openIndexes ) {
                if ( cache.has(index) ) {
                    // do not need to call again ( tab is still open )
                } else {
                    const {data, error} = await componentsRepository.getComponentsByCategory(supabaseClient, categories[index]);
                    cache.set(index, data);    
                }


            }
            
        }

        console.log(cache)
        // update reference 
        setCacheDataComponents(new Map(cache));
    }

    useEffect( () => {
        
    }, [])

    return ( 
        <>
{/* 
            <Box
                position="fixed"
                top={0}
                bottom={0}
                left={0}
                right={0}
                overflow="hidden"
                zIndex={-1}
                >
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                    minWidth: "100%",
                    minHeight: "100%",
                    objectFit: "cover",
                    }}
                >
                    <source src="/home_cutted.mp4" type="video/mp4" />
                </video>
                <Box
                    bg="rgba(0,0,0,0.5)"
                    position="absolute"
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                /> */}
                {/* Your content goes here */}
                {/* </Box> */}

            
            {/* container */}
            {/* <Box style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)', backdropFilter: 'blur(10px)' }}> */}
            <Box>
                <Flex justifyContent={"center"} mb={3} color={"black"} fontSize="2xl">
                    <Heading as={"cite"}>"Je veux monter mon PC, mais je n'y connais rien"</Heading>
                </Flex>

                <Flex justifyContent={"center"} mb={3} color={"black"} fontSize="2xl">
                    <Text as={"b"}>On est là pour toi !</Text>
                </Flex>

                
                <Flex justifyContent={"center"} mb={3} color={"black"} fontSize="2xl">
                    <Text as={"b"}>Pas de technique ici, tu choisis tes composants selon notre système de notation</Text>
                </Flex>

            </Box>


            <Flex justifyContent={"center"}>
                    <Box flexBasis={"25%"} background="red">1</Box>
                    <Box flexBasis={"25%"} background="red">2</Box>
                    <Box flexBasis={"25%"} background="red">3</Box>
                    <Box flexBasis={"25%"} background="red">3</Box>
                </Flex>


                <Flex display={"flex"} justifyContent={"center"} flexWrap={"wrap"} >

                    <Box flexBasis={"25%"} m={1}>
                        <Text color="black">CPU</Text>
                        <Skeleton startColor='red.500' endColor='orange.500' height='15vh' rounded={"lg"}/>
                    </Box>

                    <Box flexBasis={"25%"} m={1}>
                        <Text color="black">CPU</Text>
                        <Skeleton startColor='red.500' endColor='orange.500' height='15vh' rounded={"lg"}/>
                    </Box>
                    
                    <Box flexBasis={"25%"} m={1}>
                        <Text color="black">CPU</Text>
                        <Skeleton startColor='red.500' endColor='orange.500' height='15vh' rounded={"lg"}/>
                    </Box>

                    <Box flexBasis={"25%"} m={1}>
                        <Text color="black">CPU</Text>
                        <Skeleton startColor='red.500' endColor='orange.500' height='15vh' rounded={"lg"}/>
                    </Box>

                </Flex>


            <Accordion allowMultiple onChange={handleAccordionChange}>
            {
                categories.map((category:string, index:number) => {

                return ( 
                <AccordionItem background={"green"}>

                    <h2>
                        <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            <Text fontSize='2xl' as="b">
                                {getProperCatName(category)}
                            </Text>
                        </Box>

                        <AccordionIcon />
                        </AccordionButton>
                    </h2>

                    <AccordionPanel pb={4}>
                    <Flex direction="row" flexWrap={"wrap"} justifyContent={"center"}>
                    {
                        cacheDataComponents.get(index) && cacheDataComponents.get(index).map((component:any) => {
                                return (
                                <Box flexBasis={flexBasis} p={4} mb={10} borderWidth={1}>
                                    <Box display="flex" justifyContent="center" p={4}>
                                        <Text as='b' fontSize="xl">{component.label}</Text>
                                    </Box>
                                    <Box display="flex" justifyContent="center">
                                        <Image src={`/medias/${component.hash}_${component.media_path.split("_")[component.media_path.split("_").length-1]}`} alt={`${component.label}`} width={160} height={160} />
                                    </Box>
                                    <Box display="flex" justifyContent="end" p={4}>
                                        {displayComponentLevel(component.price_market, component.category)}
                                    </Box>
                                    
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Text as='b'>Estimé à 
                                            <Box bgGradient="linear(to-l, #ff00cc,#333399)" 
                                            bgClip="text"
                                            fontSize="6xl"
                                            fontWeight="extrabold">
                                                {displayAsPrice(component.price_market)}
                                            </Box>
                                        </Text>
                                    </Box>

                                </Box>)
                            })
                    }
                    </Flex>
{/*                         <List spacing={3}>
                            
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color='green.500' />
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit
                            </ListItem>

                            <ListItem>
                                <ListIcon as={MdCheckCircle} color='green.500' />
                                Assumenda, quia temporibus eveniet a libero incidunt suscipit
                            </ListItem>

                            <ListItem>
                                <ListIcon as={MdCheckCircle} color='green.500' />
                                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                            </ListItem>

                            <ListItem>
                                <ListIcon as={MdSettings} color='green.500' />
                                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                            </ListItem>

                        </List> */}
                    </AccordionPanel>

                    </AccordionItem>
                )
            })
            }

            </Accordion>
        </>
    );
}


