import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Box, Text, VStack } from "@chakra-ui/react";

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
      } catch (error) {
        console.error("Error fetching delivery details", error);
      }
    };

    fetchDeliveryDetails();
  }, [orderId]);

  useEffect(() => {
    const fetchTimeslot = async () => {
      if (!delivery.timeSlotId) return;
      try {
        const response = await axios.get(
          `http://localhost:8082/delivery-service/delivery/timeslots/${delivery.timeSlotId}`,
        );
        setTimeslot(response.data);
      } catch (error) {
        console.error("Error fetching timeslot", error);
      }
    };

    fetchTimeslot();
  }, [delivery]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      padding="6"
      width="full"
      boxShadow="md"
    >
      <VStack spacing={3} align="start">
        <Text>
          <Text as="span" fontWeight="semibold">
            Order ID:
          </Text>{" "}
          {delivery.orderId}
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold">
            Address:
          </Text>{" "}
          {delivery.address}
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold">
            Email:
          </Text>{" "}
          {delivery.email}
        </Text>
        <Text>
          <Text as="span" fontWeight="semibold">
            Timeslot:
          </Text>{" "}
          {timeslot.startTime} - {timeslot.endTime}
        </Text>
        <Badge
          colorScheme={
            delivery.deliveryStatus === "Delivered" ? "green" : "orange"
          }
        >
          {delivery.deliveryStatus}
        </Badge>
      </VStack>
    </Box>
  );
};

export default DeliveryCard;
