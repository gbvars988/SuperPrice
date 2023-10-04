import React from "react";
import { Heading, VStack } from "@chakra-ui/react";
import PageContainer from "../../components/common/PageContainer";
import DeliveryCard from "./DeliveryCard";
import { LABEL } from "../../language";

const sampleDeliveries = [
  {
    orderId: "1",
    address: "123 Melb st",
    email: "johndoe@example.com",
    timeslotID: "1",
    deliveryStatus: "Delivered",
  },
];

const DeliveriesPage: React.FC = () => {
  return (
    <PageContainer>
      <VStack spacing={6}>
        <Heading size="xl" fontWeight={600}>
          {LABEL.DELIVERIES}
        </Heading>
        <VStack spacing={6} w="70%" mt={6}>
          {sampleDeliveries.map((delivery, idx) => (
            <DeliveryCard key={idx} {...delivery} />
          ))}
        </VStack>
      </VStack>
    </PageContainer>
  );
};

export default DeliveriesPage;
