import React from "react";
import { Heading, VStack } from "@chakra-ui/react";
import CheckoutForm from "./CheckoutForm";
import PageContainer from "../../components/common/PageContainer";
import { LABEL } from "../../language";

const CheckoutPage: React.FC = () => {
  return (
    <PageContainer>
      <VStack spacing={8} align={"center"}>
        <Heading size="2xl" mb={4}>
          {LABEL.CHECKOUT}
        </Heading>
        <CheckoutForm />
      </VStack>
    </PageContainer>
  );
};

export default CheckoutPage;
