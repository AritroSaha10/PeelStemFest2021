import { Box, Heading, Flex } from "@chakra-ui/react";

export default function HeadingAndBox({ heading, children, width }) {
    return (
        <Box mb={8}>
            <Heading size="lg" color="gray.600" mb={3}>{heading}</Heading>
            <Flex flexDirection="column" backgroundColor="gray.200" width={!width ? "" : width} p={5} borderRadius={8}>
                {children}
            </Flex>
        </Box>
    );
}