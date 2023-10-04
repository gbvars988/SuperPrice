import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Heading, VStack } from "@chakra-ui/react";
import PageContainer from "../../components/common/PageContainer";
import DeliveryCard from "./DeliveryCard";
import { LABEL } from "../../language";
import { UserContext } from "../../context/UserContext";

const DeliveriesPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const { user } = useContext(UserContext);
  const userEmail = user?.email;

  useEffect(() => {
    console.log("Fetching deliveries for user", userEmail);
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/delivery-service/delivery/getdeliveriesbyemail/${userEmail}`,
        );
        const deliveryIds = response.data;
        const deliveryPromises = deliveryIds.map((id: number) =>
          axios.get(
            `http://localhost:8082/delivery-service/delivery/getdeliverybyid/${id}`,
          ),
        );
        const deliveryResponses = await Promise.all(deliveryPromises);
        setDeliveries(deliveryResponses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching deliveries", error);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <PageContainer>
      <VStack spacing={6}>
        <Heading size="xl" fontWeight={600}>
          {LABEL.DELIVERIES}
        </Heading>
        <VStack spacing={6} w="70%" mt={6}>
          {deliveries.map((delivery, idx) => (
            <DeliveryCard key={idx} {...delivery} />
          ))}
        </VStack>
      </VStack>
    </PageContainer>
  );
};

export default DeliveriesPage;
