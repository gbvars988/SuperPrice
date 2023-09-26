import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaRegCreditCard, FaUserAlt } from "react-icons/fa";

const PaymentForm: React.FC = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validThru, setValidThru] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting payment form");
  };

  return (
    <Box w={"80%"}>
      <Progress colorScheme="teal" size="xs" isAnimated value={66} mb={5} />

      <Box borderWidth={1} borderRadius="md" p={10} minWidth={"450px"}>
        <FormControl onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="space-between" mb={7}>
            <Box w="48%">
              <FormLabel>Cardholder's Name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Box w="48%">
              <FormLabel>Card Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaRegCreditCard color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="1234 5678 9123 4567"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </InputGroup>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={7}>
            <Box w="24%">
              <FormLabel>Valid Thru (MM/YY)</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaCalendarAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="08/25"
                  value={validThru}
                  onChange={(e) => setValidThru(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Box w="24%">
              <FormLabel>CVV/CVC</FormLabel>
              <Input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Box>
            <Box w="48%" display="flex" alignItems="center">
              <Text fontSize="xs" color="gray.500">
                * CVV or CVC is the card security code on the back of your card
                separate from its number.
              </Text>
            </Box>
          </Box>

          <Button type="submit" onClick={handleSubmit}>
            Confirm Payment
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PaymentForm;
