import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";

const Layout = ({ children }) => {
    return (
        <Flex height="100vh" width="100vw" direction="row" background="gray.100">
            <Sidebar />
            <Flex height="100vh" backgroundColor="blue.100" flex="1">
                <Box p={7}>
                    {children}
                </Box>
            </Flex>
        </Flex >
    );
}

export default Layout;