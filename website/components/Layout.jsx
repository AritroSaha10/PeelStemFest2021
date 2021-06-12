import { Flex, Box, Heading } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Layout = ({ children, name }) => {
    return (
        <Flex height="100vh" width="100vw" direction="row" background="gray.300">
            <Sidebar />
            <Flex height="100vh" flex="1">
                <Box pt={5} pl={10}>
                    <Heading size="xl" mb={10}>{name}</Heading>
                    {children}
                </Box>
            </Flex>
        </Flex >
    );
}

export default Layout;