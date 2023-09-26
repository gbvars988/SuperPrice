import React from "react";
import { Heading, VStack } from "@chakra-ui/react";
import CheckoutForm from "./CheckoutForm";
import PageContainer from "../../components/common/PageContainer";
import { LABEL } from "../../language";

const CheckoutPage: React.FC = () => {
  return (
    <PageContainer>
      <VStack spacing={8} align={"center"}>
        <Heading size="xl" fontWeight={600}>
          {LABEL.CHECKOUT}: step 2 of 3
        </Heading>
        <CheckoutForm />
      </VStack>
    </PageContainer>
  );
};

export default CheckoutPage;
