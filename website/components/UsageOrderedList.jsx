import { Heading, Flex, Spacer, Text, Button, useToast } from "@chakra-ui/react";
import HeadingAndBox from "../components/HeadingAndBox";
import Layout from "../components/Layout";
import { useState } from "react";
import db from "../util/db";

// An item in the ordered list
function OrderedListItem({ data, idx }) {
    const [userData, setUserData] = useState(data); // User data state var
    const [sendingReq, setSendingReq] = useState(false); // Loading state var 
    const toast = useToast();

    const toggleRestricted = async () => {
        setSendingReq(true); // Switch the sending request switch

        // Toggle the restricted variable after 1.5s to simulate real-world conditions
        setTimeout(() => {
            // Set restricted toggle on Firebase
            db.collection("users").doc(userData.id).update({
                restricted: !userData.restricted
            });

            // Set state
            setUserData({
                ...userData,
                restricted: !userData.restricted
            });

            setSendingReq(false); // Stop showing the loading button

            // Show a toast to notify the user
            toast({
                title: !userData.restricted ? "Successfully restricted!" : "Successfully unrestricted!",
                description: !userData.restricted ? "The restriction has been applied successfully." : "The restriction has been removed successfully.",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        }, 500);
    }

    return (
        <Flex flexDirection="row" backgroundColor="gray.100" p={3} borderRadius={4} alignItems="center"> {/* This styling might be a bit weird, might remove this later */}
            <Flex flexDirection="column">
                {/* Person's name as well as their position in the list*/}
                <Flex flexDirection="row" mb={2}>
                    <Heading size="md" mr={3}>{idx + 1}.</Heading>
                    <Heading size="md">{data.name}</Heading>
                </Flex>

                {/* Statistics */}
                <Text>Weekly usage: {data.weeklyUsage}kWh</Text>
                <Text>Address: {data.address}</Text>
            </Flex>

            <Spacer />

            <Flex flexDirection="column">
                <Button colorScheme={userData.restricted ? "blue" : "red"} onClick={toggleRestricted} loadingText="Requesting..." isLoading={sendingReq}>{userData.restricted ? "Unrestrict" : "Restrict" }</Button>
            </Flex>
        </Flex>
    )
}

// List component that creates an ordered list based on data recieved
export default function UsageOrderedList({ data }) {
    return (
        <HeadingAndBox heading="Users" width="75vw">
            {
                data.map((data, idx) => <OrderedListItem data={data} idx={idx} key={idx} />)
            }
        </HeadingAndBox>
    )
}