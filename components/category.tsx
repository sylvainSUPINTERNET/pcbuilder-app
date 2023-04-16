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
  SimpleGrid,
  DrawerCloseButton,
  Button} from '@chakra-ui/react';
import { GiAk47, GiPunch, GiBatteredAxe, GiElfHelmet, GiEvilTower, GiPointySword, GiSwordSmithing,GiTrashCan } from 'react-icons/gi';
import { useEffect, useRef, useState } from 'react';
import { componentsRepository } from '@/repositories/functions';
import Image from "next/image";
import {AiOutlinePlus} from 'react-icons/ai';

type FetchComponentsCategoryProps = {
    categories: Array<string>;
    supabaseClient: any;
};


const sortComponentsWithWeights = ( categories: string[] ) => {

    const weights = ["CPU", "MOTHERBOARD", "GPU", "VENTIRAD", "RAM", "BOX","POWER_SUPPLY", "TERMAL_PASTE", "M2", "SSD1", "HDD", "MOUSE","MONITOR", "KEYBOARD"];


    for ( const i in weights ) {
        const idxSwap = weights.indexOf(weights[i]);
      
      
        if ( idxSwap != -1 ) {
          
          const idxCurr = categories.indexOf(categories.filter(el => el === weights[idxSwap]).length > 0 ? categories.filter(el => el === weights[idxSwap])[0] : "")
      
          if ( idxCurr != -1 ) {
            
                const val1 = categories[idxCurr]; // ps
                const val2 = categories[idxSwap]; // cpu idx
                categories[idxCurr] = val2
                categories[idxSwap] = val1
              
          }
      
          
        }
        
      }

    return categories;
}

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
            return "HDD".toUpperCase();
        case "ssd1":
            return "SSD".toUpperCase();
        case "m2":
            return "SSD M.2".toUpperCase();
        case "termal_paste":
            return "Pâte thermique".toUpperCase();
        default:
            break;
    }

    return cat;

}



// TODO : for cache could consider redis instead ( with TTL key ) but since values are not changing often, it's not a big deal
export const FetchComponentsCategory = ({categories, supabaseClient}:FetchComponentsCategoryProps) => {

    const [isLargerThanTablet] = useMediaQuery("(min-width: 1280px)");
    const [isTablet] = useMediaQuery("(min-width: 700px) and (max-width: 1200px)");
    
    const flexBasis = isLargerThanTablet ? "25%" : "50%";

    const componentContainer: number = isLargerThanTablet ? 4 : isTablet ? 2 : 1;
    

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [placement, setPlacement] = useState('top')

    const [cacheDataComponents, setCacheDataComponents] = useState<any>(new Map());



    const [drawerComponentsClickedMap, setDrawerComponentsClickedMap] = useState<any>(new Map());

    const [drawerData, setDrawerData] = useState({
        "catName": "",
        "data": []
    });


    // TODO : reimplement cache !
    const handleOpen = async (cat:string, i:number) => {
        
        const {data, error} = await componentsRepository.getComponentsByCategory(supabaseClient, categories[i]);
        drawerData.catName = cat
        drawerData.data = data;

        setDrawerData(drawerData);
        onOpen();
    }


    const clickComponentInDrawer = async (component:any, catName: string) => {

        drawerComponentsClickedMap.set(catName, component);
        setDrawerComponentsClickedMap(drawerComponentsClickedMap);
        onClose();
    }


    const deleteComponent = (cat:string) => {
        const newClickedMap = new Map(drawerComponentsClickedMap);
        newClickedMap.delete(cat);
        setDrawerComponentsClickedMap(newClickedMap);
    }



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
            {
                    sortComponentsWithWeights(categories).map((category:string, index:number) => {
                        return ( 
                            <Flex justifyContent="center" width="100%" >
                                <Box bg="" w="500px" h="500px" rounded={"lg"} p={4}  border={"black solid 3px"} shadow="lg" mb="2">
                                    
                                    {
                                        drawerComponentsClickedMap.get(category) && drawerComponentsClickedMap.get(category).label && drawerComponentsClickedMap.get(category).label.length>0 &&
                                        (<Flex justifyContent={"center"}>
                                            <Button colorScheme="red" mb={5} onClick={ e => deleteComponent(category)}>
                                                <Icon as={GiTrashCan} w={8} h={8} mb={2} p={1}/>
                                                Supprimer
                                            </Button>
                                        </Flex>
                                        )
                                    }

                                    
                                    <Flex justifyContent={"center"}>
                                        <Text as={"b"} fontSize="xl" p={4}>{getProperCatName(category)}</Text>
                                    </Flex>

                                    {
                                        drawerComponentsClickedMap.get(category) && drawerComponentsClickedMap.get(category).label && drawerComponentsClickedMap.get(category).label.length>0 ?
                                        (
                                            <></>
                                        ):(
                                            <Flex cursor={"pointer"} justifyContent="center">
                                                <Button mb={3} onClick={ () => {handleOpen(category, index)}} >
                                                    <Icon as={AiOutlinePlus} w={8} h={8} mb={1} p={1}/>
                                                    Ajouter un composant
                                                </Button>
                                            </Flex>
                                        )
                                    }

                                    <Flex justifyContent={"center"}>
                                        <Text mt={4}>{drawerComponentsClickedMap.get(category) ? drawerComponentsClickedMap.get(category).label : ""}</Text>
                                    </Flex>
                                    {
                                        drawerComponentsClickedMap.get(category) && drawerComponentsClickedMap.get(category).hash && drawerComponentsClickedMap.get(category).price_market && drawerComponentsClickedMap.get(category).media_path && <Box>
                                            
                                            <Box onClick={ () => {handleOpen(category, index)}}>
                                                <Box display="flex" justifyContent="center" mt={10}>
                                                    <Image src={`/medias/${drawerComponentsClickedMap.get(category).hash}_${drawerComponentsClickedMap.get(category).media_path.split("_")[drawerComponentsClickedMap.get(category).media_path.split("_").length-1]}`} alt={`${drawerComponentsClickedMap.get(category).label}`} width={160} height={160} />
                                                </Box>

                                                <Box display="flex" justifyContent={"center"} mt={3} p={2}>
                                                    <Text as="b" fontSize={"2xl"}>
                                                        {displayAsPrice(drawerComponentsClickedMap.get(category).price_market)}
                                                    </Text>
                                                </Box>

                                            </Box>
 
                                            
                                        </Box>
                                    }
                                    
                                </Box>
                            </Flex>
                        )
                    })
                }
            </SimpleGrid>

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>{getProperCatName(drawerData.catName)}</DrawerHeader>
                <DrawerBody>
                    <Box>{drawerData.data.length} composants</Box>
                    <SimpleGrid columns={componentContainer} spacing={2} p={2}>
                    {
                        drawerData.data && drawerData.data.sort( (a:any,b:any) => a.price_market - b.price_market).map((component:any) => {
                                return (
                                <Box flexBasis={flexBasis} p={4} mb={10} borderWidth={1} cursor={"pointer"} onClick={ e => clickComponentInDrawer(component, drawerData.catName)}>
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
                    </SimpleGrid>

                </DrawerBody>
                </DrawerContent>
            </Drawer>

{/* 
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

            </Accordion> */}
        </>
    );
}


