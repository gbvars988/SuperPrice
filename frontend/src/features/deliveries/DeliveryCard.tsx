import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

interface DeliveryCardProps {
  orderId: string;
  address: string;
  email: string;
  timeslotID: string;
  deliveryStatus: string;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  orderId,
  address,
  email,
  timeslotID,
  deliveryStatus,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" padding="6" width="full">
      <VStack spacing={4} align="start">
        <Text>Order ID: {orderId}</Text>
        <Text>Address: {address}</Text>
        <Text>Email: {email}</Text>
        <Text>Timeslot ID: {timeslotID}</Text>
        <Text>Delivery Status: {deliveryStatus}</Text>
      </VStack>
    </Box>
  );
};

export default DeliveryCard;
