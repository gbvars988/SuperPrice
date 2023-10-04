import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaRegCreditCard, FaUserAlt } from "react-icons/fa";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false); // add 3 sec delay

  const [state, setState] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const { cartItems } = useContext(CartContext);

  const toast = useToast();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleInputChange = (evt: any) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const cardNumberRegex = /^[0-9]{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    const cvvRegex = /^[0-9]{3}$/;

    if (!nameRegex.test(state.name)) {
      setError("Cardholder's Name should contain only alphabetic characters.");
      return false;
    }
    if (!cardNumberRegex.test(state.number)) {
      setError("Card Number should be exactly 16 numeric digits.");
      return false;
    }
    if (!expiryRegex.test(state.expiry)) {
      setError("Valid Thru should be in MM/YY format.");
      return false;
    }
    if (!cvvRegex.test(state.cvc)) {
      setError("CVV should be exactly 3 numeric digits.");
      return false;
    }
    setError(null);
    return true;
  };

  // get checkout info
  const { checkoutInfo } = useContext(CartContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    console.log("submitting payment form to backend");

    console.log("Payment info is: ");
    console.table(state);
    console.log("Checkout info is: ");
    console.table(checkoutInfo);

    setSubmitted(true);

    try {
      const orderResponse = await axios.post(
        "http://localhost:8082/delivery-service/delivery/createorder",
        {
          userId: null,
          orderItems: cartItems.map((item) => ({
            productId: item.productID,
            quantity: item.quantity,
          })),
        },
      );

      if (orderResponse.status === 201) {
        const deliveryResponse = await axios.post(
          "http://localhost:8082/delivery-service/delivery/requestdelivery",
          {
            orderId: orderResponse.data.orderId,
            address: checkoutInfo!.address,
            email: checkoutInfo!.email,
            timeSlotId: 2, // TODO: grab this from checkout context
            deliveryStatus: "Scheduled",
          },
        );

        if (deliveryResponse.status === 201) {
          toast({
            title: "Payment Successful",
            description:
              "Your payment has been processed successfully and your delivery will soon be on its way!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/");
        } else {
          throw new Error("Failed to request delivery");
        }
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message || "An error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.log("An error occurred.");
      }
    }
  };

  const allFieldsFilled =
    state.name && state.number && state.expiry && state.cvc;

  return (
    <Box w={"70%"}>
      <Progress colorScheme="teal" size="xs" isAnimated value={99} mb={5} />

      <Box borderWidth={1} borderRadius="md" p={10} minWidth={"450px"}>
        <FormControl onSubmit={handleSubmit} isInvalid={!!error}>
          <Grid templateColumns="1fr 1fr" gap={6} mb={7}>
            <Box>
              <FormLabel>Cardholder's Name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </InputGroup>

              <FormLabel mt={5}>Card Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaRegCreditCard color="gray.300" />}
                />
                <Input
                  type="text"
                  name="number"
                  placeholder="1234 5678 9123 4567"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </InputGroup>

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={3} mt={7}>
                <Box>
                  <FormLabel>Valid Thru</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaCalendarAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="08/25"
                      value={state.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel>CVV/CVC</FormLabel>
                  <Input
                    type="text"
                    name="cvc"
                    placeholder="123"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Box>
              </Grid>

              <Box display="flex" alignItems="center">
                <Text fontSize="xs" color="gray.500">
                  * CVV or CVC is the card security code on the back of your
                  card, separate from its number.
                </Text>
              </Box>

              {error && <FormErrorMessage mt={5}>{error}</FormErrorMessage>}
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
              <VStack spacing={5}>
                <Cards
                  number={state.number}
                  expiry={state.expiry}
                  cvc={state.cvc}
                  name={state.name}
                  focused={state.focus as Focused}
                />
                <Text fontSize="lg" fontWeight={500}>
                  Total Amount: ${calculateTotal()}
                </Text>
              </VStack>
            </Box>
          </Grid>

          <Box display="flex" justifyContent="center" mt={10}>
            <Button
              isLoading={submitted}
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
              isDisabled={!allFieldsFilled}
            >
              Confirm Payment
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PaymentForm;
