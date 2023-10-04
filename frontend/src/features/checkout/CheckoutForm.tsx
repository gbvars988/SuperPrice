import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Progress,
  RadioGroup,
  Select,
  useRadioGroup,
} from "@chakra-ui/react";
import { LABEL, PATH } from "../../language";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import RadioCard from "../../components/common/RadioCard";
import axios from "axios";

interface TimeSlot {
  timeSlotId: number;
  startTime: string;
  endTime: string;
}

const CheckoutForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get<TimeSlot[]>(
        "http://localhost:8082/delivery-service/delivery/timeslots",
      );
      setTimeSlots(response.data);
    } catch (error) {
      console.error("An error occurred while fetching time slots:", error);
    }
  };

  const allFieldsFilled =
    fullName && email && address && phone && deliveryOption;

  const deliveryOptions = ["Standard", "Express", "Overnight"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: setDeliveryOption,
  });

  const group = getRootProps();

  const { setCheckoutInfo } = useContext(CartContext);

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/; // allow optional + at the start

    if (!nameRegex.test(fullName)) {
      setError(
        "Full Name should have a first and last name with alphabetic characters.",
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return false;
    }
    if (!address) {
      setError("Address is required.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setError("Phone Number should be between 10 to 15 numeric digits.");
      return false;
    }
    setError(null);
    return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const info = {
      fullName,
      email,
      address,
      phone,
      deliveryOption,
      deliveryTime,
    };

    setCheckoutInfo(info);
    console.log("Checkout info is: ");
    console.table(info);

    navigate(PATH.PAYMENT);
  };

  return (
    <Box w={"70%"}>
      <Progress colorScheme="teal" size="xs" isAnimated value={66} mb={5} />

      <Box borderWidth={1} borderRadius="md" p={10} minWidth={"450px"}>
        <FormControl onSubmit={handleSubmit} isInvalid={!!error}>
          <Box display="flex" justifyContent="space-between" mb={7}>
            <Box w="48%">
              <FormLabel>{LABEL.FIRST_NAME}</FormLabel>
              <Input
                placeholder="John"
                value={fullName.split(" ")[0]}
                onChange={(e) =>
                  setFullName(
                    `${e.target.value} ${fullName.split(" ")[1] || ""}`,
                  )
                }
              />
            </Box>
            <Box w="48%">
              <FormLabel>{LABEL.LAST_NAME}</FormLabel>
              <Input
                placeholder="Doe"
                value={fullName.split(" ")[1] || ""}
                onChange={(e) =>
                  setFullName(
                    `${fullName.split(" ")[0] || ""} ${e.target.value}`,
                  )
                }
              />
            </Box>
          </Box>
          <Box h="100px">
            <FormLabel>{LABEL.EMAIL}</FormLabel>
            <Input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box h="100px">
            <FormLabel>{LABEL.ADDRESS}</FormLabel>
            <Input
              placeholder="1 Bourke St, Melbourne VIC 3000"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box h="100px">
            <FormLabel>{LABEL.PHONE_NUMBER}</FormLabel>
            <Input
              placeholder="+61 463 872 474"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={7}>
            <Box w="48%">
              <FormLabel>{LABEL.DELIVERY_OPTIONS}</FormLabel>
              <RadioGroup onChange={setDeliveryOption} value={deliveryOption}>
                <HStack {...group}>
                  {deliveryOptions.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    );
                  })}
                </HStack>
              </RadioGroup>
            </Box>
            <Box w="48%">
              <FormLabel>{LABEL.DELIVERY_TIME_SLOT}</FormLabel>
              <Select
                placeholder="Select time slot"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                h={"50px"}
              >
                {timeSlots.map((slot) => (
                  <option key={slot.timeSlotId} value={slot.timeSlotId}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>

          {error && (
            <FormErrorMessage mt={5} mb={5}>
              {error}
            </FormErrorMessage>
          )}
          <Box display="flex" justifyContent="center" mt={10}>
            <Button
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
              isDisabled={!allFieldsFilled}
            >
              {LABEL.PROCEED_TO_PAYMENT}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
