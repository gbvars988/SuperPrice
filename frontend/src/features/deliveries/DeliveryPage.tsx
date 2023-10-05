import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import PageContainer from "../../components/common/PageContainer";
import DeliveryCard from "./DeliveryCard";
import { LABEL } from "../../language";
import { UserContext } from "../../context/UserContext";

const DeliveriesPage: React.FC = () => {
  const [deliveryIds, setDeliveryIds] = useState<number[]>([]);
  const { user } = useContext(UserContext);
  const userEmail = user?.email;

  useEffect(() => {
    console.log("Fetching deliveries for user", userEmail);
    const fetchDeliveryIds = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/delivery-service/delivery/getdeliveriesbyemail/${userEmail}`,
        );
        setDeliveryIds(response.data);
      } catch (error) {
        console.error("Error fetching delivery IDs", error);
      }
    };

    fetchDeliveryIds();
  }, [userEmail]);

  return (
    <PageContainer>
      <VStack spacing={6}>
        <Heading size="xl" fontWeight={600}>
          {LABEL.YOUR_DELIVERIES}
        </Heading>
        <VStack spacing={6} w="60%" mt={6}>
          {deliveryIds.length > 0 ? (
            deliveryIds.map((id, idx) => (
              <DeliveryCard key={idx} orderId={id} />
            ))
          ) : (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              padding="6"
              width="full"
              textAlign="center"
            >
              <Text>You have no pending deliveries.</Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </PageContainer>
  );
};

export default DeliveriesPage;
