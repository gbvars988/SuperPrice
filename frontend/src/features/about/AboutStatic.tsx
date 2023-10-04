// src/StaticFile.tsx
import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../../components/common/PageContainer";

const AboutStatic: React.FC = () => {
  return (
    <PageContainer>
      <Box p={4}>
        <Heading as="h1" size="xl">
          Welcome to the SuperPrice Project
        </Heading>
        <Text mt={4}>
          Your go-to destination for an exceptional grocery shopping experience.
          SuperPrice is a collaborative effort dedicated to developing an
          all-encompassing price-matching and delivery application designed with
          you, the customer, in mind.
        </Text>
        <Heading as="h2" size="lg" mt={8}>
          Our Mission
        </Heading>
        <Text mt={4}>
          At the heart of SuperPrice lies a clear and unwavering mission: to
          revolutionize your grocery shopping experience. We aim to empower you
          with the tools and information you need to make informed decisions,
          find the lowest prices, and enjoy hassle-free delivery, all while
          saving your precious time and hard-earned money.
        </Text>
        <Heading as="h2" size="lg" mt={8}>
          What We Offer
        </Heading>
        <Text mt={4}>
          SuperPrice is more than just an app; it's a shopping companion that
          brings convenience and savings to your fingertips.
        </Text>
        <Text mt={2}>
          - <strong>Price Comparison:</strong> With SuperPrice, you can
          effortlessly compare prices from various local supermarkets and
          stores. No more hunting for the best deals; we've got you covered.
        </Text>
        <Text mt={2}>
          - <strong>Extensive Product Database:</strong> Gain access to a vast
          database of products, ensuring you have a comprehensive selection to
          choose from. Whether you're searching for daily essentials, gourmet
          treats, or specialty items, SuperPrice has it all.
        </Text>
        <Text mt={2}>
          - <strong>Real-Time Data:</strong> We pride ourselves on providing
          accurate and up-to-the-minute information. SuperPrice constantly
          updates product prices and availability, guaranteeing you the most
          current data for an informed shopping experience.
        </Text>
        <Text mt={2}>
          - <strong>Seamless Delivery:</strong> Say goodbye to long queues and
          heavy grocery bags. SuperPrice offers seamless delivery arrangements,
          ensuring your purchases arrive at your doorstep at your convenience.
        </Text>
        <Heading as="h2" size="lg" mt={8}>
          Our Vision
        </Heading>
        <Text mt={4}>
          Our vision is to transform the way you shop for groceries, making it
          not only efficient but enjoyable. SuperPrice envisions a world where
          you can make smart shopping decisions effortlessly, where you never
          overpay for your groceries, and where your time is valued and
          respected.
        </Text>
        <Heading as="h2" size="lg" mt={8}>
          Join Us in this Exciting Journey
        </Heading>
        <Text mt={4}>
          We invite you to be a part of the SuperPrice community. Together, we
          can shape the future of grocery shopping, simplify your life, and
          create a more efficient and enjoyable way to stock your pantry.
          Download the SuperPrice app today and embark on a journey toward
          smarter, more cost-effective grocery shopping.
        </Text>
        <Text mt={4}>
          Thank you for choosing SuperPrice - where savings, convenience, and
          quality converge.
        </Text>
        <Text mt={4}>
          For any inquiries, suggestions, or partnerships, please don't hesitate
          to reach out to us. Your feedback is invaluable as we continue to
          refine and enhance your SuperPrice experience.
        </Text>
        <Text mt={4}>SuperPrice Team</Text>
      </Box>
    </PageContainer>
  );
};

export default AboutStatic;
