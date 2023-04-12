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
  Heading,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  useDisclosure,
  Grid,
  GridItem,
  SimpleGrid} from '@chakra-ui/react';
import { GiAk47, GiPunch, GiBatteredAxe, GiElfHelmet, GiEvilTower, GiPointySword, GiSwordSmithing } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { componentsRepository } from '@/repositories/functions';
import Image from "next/image";
import {RiSeparator} from 'react-icons/ri';

type FetchComponentsCategoryProps = {
    categories: Array<string>;
    supabaseClient: any;
};


const lowLevel = (iconSize:number=6, iconContainerSize:number=10) => {
    return ( 
        <Box>
            <Box
                mb={5} 
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Box background={"black"} p={4} rounded="lg">
                    <Text as="b" fontSize={24} color="white">Commun</Text>
                </Box>
            </Box>
            <Box
                w={iconContainerSize}
                h={iconContainerSize}
                border="2px solid black"
                bgGradient="radial-gradient(circle, rgba(203, 203, 207, 0.84) 0%, rgba(89, 93, 140, 0) 100%)"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backdropFilter="blur(10px) brightness(150%) saturate(120%)"
                shadow="dark-lg">
                <Icon as={GiPunch} w={iconSize} h={iconSize} color="black" />
            </Box>
        </Box>
    )
}

const mediumLevel = (iconSize:number=6, iconContainerSize:number=10) => {
    return ( 
        <Box>
            <Box
                mb={5} 
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Box background={"black"} p={4} rounded="lg">
                    <Text as="b" fontSize={24} color="blue.400">Rare</Text>
                </Box>
                </Box>
            <Box
                w={iconContainerSize}
                h={iconContainerSize}
                border="2px solid black"
                bgGradient="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(0, 20, 239, 0.06) 100%)"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backdropFilter="blur(10px) brightness(150%) saturate(120%)"
                shadow="dark-lg">
                <Icon as={GiBatteredAxe} w={iconSize} h={iconSize} color="black" />
            </Box>
        </Box>
    )
}

const highLevel = (iconSize:number=6, iconContainerSize:number=10) => {
    return (
        <Box>
            <Box
                mb={5} 
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Box background={"black"} p={4} rounded="lg">
                    <Text as="b" fontSize={24} color="purple.500">Epique</Text>
                </Box>
                </Box>
            <Box
                w={iconContainerSize}
                h={iconContainerSize}
                border="2px solid black"
                bgGradient="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backdropFilter="blur(10px) brightness(150%) saturate(120%)"
                shadow="dark-lg">
                <Icon as={GiAk47} w={iconSize} h={iconSize} color="black" />
            </Box>
        </Box> 

    )
}

const veryHighLevel = (iconSize:number=6, iconContainerSize:number=10) => {
    return ( 
        <Box >
            <Box
                mb={5} 
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Box background={"black"} p={4} rounded="lg">
                    <Text as="b" fontSize={24} color="orange.500">Légendaire</Text>
                </Box>
                </Box>
            <Box
                w={iconContainerSize}
                h={iconContainerSize}
                border="2px solid black"
                bgGradient="radial-gradient(circle, rgba(255, 244, 1, 1) 0%, rgba(252,70,107,1) 100%)"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backdropFilter="blur(10px) brightness(150%) saturate(120%)"
                shadow="dark-lg">
                <Icon as={GiEvilTower} w={iconSize} h={iconSize} color="black" />
            </Box>
        </Box>

    )
}



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

    const componentContainer = isLargerThanTablet ? "4" : "2";

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [placement, setPlacement] = useState('top')


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



            <Box mt={20} display="flex" justifyContent={"center"} p={5}>
                <Box>

                <Text as="span" fontSize="26" fontWeight="bold" background="black" p={3} rounded="lg" color="white">
                    On 
                    <Box as="span" >
                        <Box color="white" as="span"> N</Box>
                        <Box color="blue" as="span">o</Box>
                        <Box color="purple" as="span">t</Box>
                        <Box color="orange" as="span">e </Box>
                    </Box>

                    <Box as="span">
                        les composants, tu fais ta machine et c'est tout !
                    </Box>
                </Text>
                </Box>
            </Box>



            <Flex justifyContent={"center"} mt={20} mb={20} flexWrap="wrap">
                <Box flexBasis="25%"  display="flex" alignItems="center" justifyContent="center" p={"2"}>
                    {lowLevel(40, 40)}
                </Box>
                <Box  flexBasis="25%"  display="flex" alignItems="center" justifyContent="center" p={"2"}>
                    {mediumLevel(40,40)}
                </Box>
                <Box flexBasis="25%"  display="flex" alignItems="center" justifyContent="center" p={"2"}>
                    {highLevel(40,40)}
                </Box>
                <Box flexBasis="25%" display="flex" alignItems="center" justifyContent="center" p={"2"}>
                    {veryHighLevel(40,40)}
                </Box>
            </Flex>

            <SimpleGrid columns={componentContainer} spacing={2} p={2}>
                <Flex justifyContent="center" width="100%">
                    <Box bg="tomato" w="240px" h="240px"/>
                </Flex>
                <Flex justifyContent="center" width="100%">
                    <Box bg="tomato" w="240px" h="240px" />
                </Flex>
                <Flex justifyContent="center" width="100%">
                    <Box bg="tomato" w="240px" h="240px" />
                </Flex>
                <Flex justifyContent="center" width="100%">
                    <Box bg="tomato" w="240px" h="240px"/>
                </Flex>
            </SimpleGrid>

            <Flex display={"flex"} justifyContent={"center"} flexWrap={"wrap"} mt={10}>
                {
                    categories.map((category:string, index:number) => {
                        return ( 
                            <Box flexBasis={"25%"} m={1} onClick={onOpen}>
                                <Text color="black">{getProperCatName(category)}</Text>
                                <Skeleton startColor='red.500' endColor='orange.500' height='15vh' rounded={"lg"}/>
                            </Box>
                        )
                    })
                }
            </Flex>

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>CPU</DrawerHeader>
                <DrawerBody>
                    <Box onClick={e => console.log(e)}>Some contents...</Box>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </DrawerBody>
                </DrawerContent>
            </Drawer>


            <Accordion allowMultiple onChange={handleAccordionChange} mt={10}>
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

                    </AccordionPanel>

                    </AccordionItem>
                )
            })
            }

            </Accordion>
        </>
    );
}


