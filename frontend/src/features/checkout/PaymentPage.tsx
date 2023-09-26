import React from "react";
import { Heading, VStack } from "@chakra-ui/react";
import PageContainer from "../../components/common/PageContainer";
import PaymentForm from "./PaymentForm";

const PaymentPage: React.FC = () => {
  return (
    <PageContainer>
      <VStack spacing={8} align={"center"}>
        <Heading size="2xl" mb={4}>
          Payment
        </Heading>
        <PaymentForm />
      </VStack>
    </PageContainer>
  );
};

export default PaymentPage;
