import { Flex, Spacer, Box } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/react";
import { SunIcon, InfoOutlineIcon, DownloadIcon } from '@chakra-ui/icons'

import Link from "next/link";
import { useRouter } from "next/router";

// All the items that will be in the sidebar
const items = [
    {
        name: "Overview",
        link: "/",
        icon: <InfoOutlineIcon color="green.500" w={6} h={6} />,
    },
    {
        name: "Usage",
        link: "/usage",
        icon: <DownloadIcon color="green.500" w={6} h={6} />,
    },
    {
        name: "Generation",
        link: "/generation",
        icon: <SunIcon color="green.500" w={6} h={6} />,
    }
]

export default function Sidebar() {
    const router = useRouter();

    return (
        <Flex height="100vh" width="300px" backgroundColor="gray.200" alignItems="center" flexDirection="column" p={5}>
            <Link href="/">
                <Box textAlign="center" as="button" mb={8}>
                    <Heading color="green.700">GridConnect</Heading>
                </Box>
            </Link>

            <Flex flexDirection="column" justifyContent="flex-start" w="270px">
                {
                    items.map(({ name, link, icon }) =>
                        <Link href={link} key={name}>
                            <Flex 
                                flexDirection="row" 
                                alignItems="center" 
                                p={2} 
                                mb={2} 
                                as="button" 
                                backgroundColor={router.pathname === link ? "gray.300" : ""} 
                                borderRadius="10px"
                            >
                                {icon}
                                <Text fontSize="xl" color="gray.700" ml={5} alignSelf="center">{name}</Text>
                            </Flex>
                        </Link>
                    )
                }
            </Flex>

            <Spacer />
        </Flex>
    )
};