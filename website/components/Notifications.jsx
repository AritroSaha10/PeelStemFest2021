import { Box, Heading, Flex, Text, Spacer, IconButton } from "@chakra-ui/react";
import { WarningIcon, WarningTwoIcon, InfoIcon, CloseIcon } from "@chakra-ui/icons";
import HeadingAndBox from "./HeaderAndBox";
import { useState } from "react";

// Enum to represent how urgent a notification is
// Used to display an icon as well as sort it
const notificationUrgency = {
    ERROR: 1,
    WARN: 2,
    INFO: 3
}

export default function Notifications({ pNotifications }) {
    // Freeze the enum to make sure it isn't changed
    Object.freeze(notificationUrgency);

    // State vars
    const [notifications, setNotifications] = useState(pNotifications);

    return (
        <HeadingAndBox heading="Notifications" width="70vw">
            {notifications.map(({ content, urgency }, idx) => (
                <Flex flexDirection="row" alignItems="center" mb={4} key={content}>
                    {urgency === notificationUrgency.ERROR && <WarningIcon color="red.500" w={10} h={10} />}
                    {urgency === notificationUrgency.WARN && <WarningTwoIcon color="yellow.500" w={10} h={10} />}
                    {urgency === notificationUrgency.INFO && <InfoIcon color="blue.500" w={10} h={10} />}
                    <Text fontSize="lg" ml={5} fontWeight="semibold">{content}</Text>

                    <Spacer />

                    <IconButton aria-label="Close notification" icon={<CloseIcon />} variant="outline" onClick={
                        () => { 
                            console.log(idx);
                            setNotifications(
                                notifications.filter((obj, idxIter) => idxIter !== idx)
                            )
                        }
                    } 
                    />
                </Flex>
            ))}

            {!notifications.length && <Text alignSelf="center">No new notifications...</Text>}
        </HeadingAndBox>
    );
}

export { notificationUrgency };