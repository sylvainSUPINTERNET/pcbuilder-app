import { MdCheckCircle, MdSettings } from 'react-icons/md';
import { Box, Flex, Accordion,
    Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Img,
  List,
  ListItem,
  ListIcon} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { componentsRepository } from '@/repositories/functions';

type FetchComponentsCategoryProps = {
    categories: Array<string>;
    supabaseClient: any;
};


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
            <Accordion allowMultiple onChange={handleAccordionChange}>

            {
            categories.map((category:string) => {

                return ( 
                <AccordionItem>

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
                        <Box flexBasis="25%" p={2}>
                            Item 1
                        </Box>
                        <Box flexBasis="25%" p={2}>
                            Item 1
                        </Box>
                        <Box flexBasis="25%" p={2}>
                            Item 1
                        </Box>
                        <Box flexBasis="25%" p={2}>
                            Item 1
                        </Box>
                        <Box flexBasis="25%" p={2}>
                            Item 2
                        </Box>
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


