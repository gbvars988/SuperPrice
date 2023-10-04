import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, VStack } from "@chakra-ui/react";

interface DeliveryCardProps {
  orderId: number;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ orderId }) => {
  const [delivery, setDelivery] = useState<any>({});
  const [timeslot, setTimeslot] = useState<any>({});

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/delivery-service/delivery/getdeliverybyid/${orderId}`,
        );
        setDelivery(response.data);
        console.log("Delivery", response.data);
      } catch (error) {
        console.error("Error fetching delivery details", error);
      }
    };

    fetchDeliveryDetails();
  }, [orderId]);

  useEffect(() => {
    console.log("Fetching timeslot", delivery.timeSlotId);
    const fetchTimeslot = async () => {
      if (!delivery.timeSlotId) return;
      try {
        const response = await axios.get(
          `http://localhost:8082/delivery-service/delivery/timeslots/${delivery.timeSlotId}`,
        );
        console.log("Timeslot", response.data);
        setTimeslot(response.data);
      } catch (error) {
        console.error("Error fetching timeslot", error);
      }
    };

    fetchTimeslot();
  }, [delivery]);

  return (
    <Box borderWidth="1px" borderRadius="lg" padding="6" width="full">
      <VStack spacing={4} align="start">
        <Text>Order ID: {delivery.orderId}</Text>
        <Text>Address: {delivery.address}</Text>
        <Text>Email: {delivery.email}</Text>
        <Text>
          Timeslot: {timeslot.startTime} - {timeslot.endTime}
        </Text>
        <Text>Delivery Status: {delivery.deliveryStatus}</Text>
      </VStack>
    </Box>
  );
};

export default DeliveryCard;
