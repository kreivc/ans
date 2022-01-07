import {
  Box,
  Circle,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const team = [
  {
    id: 1,
    name: "Ricky",
    nim: "2301860122",
    image:
      "https://res.cloudinary.com/dor0udr7t/image/upload/v1641521684/ans/team/sbzfsbwicvhcxz6rsfft.jpg",
  },
  {
    id: 2,
    name: "Kevin Nathanael Taufiek",
    nim: "2301907901",
    image:
      "https://res.cloudinary.com/dor0udr7t/image/upload/v1641521684/ans/team/az2wlg2y416ohce52sfr.jpg",
  },
  {
    id: 3,
    name: "Brian Karnadi Japar",
    nim: "2301869891",
    image:
      "https://res.cloudinary.com/dor0udr7t/image/upload/v1641521687/ans/team/duwmkqqmwkfrufjwh1qk.jpg",
  },
  {
    id: 4,
    name: "Andres Holivin",
    nim: "2301859505",
    image:
      "https://res.cloudinary.com/dor0udr7t/image/upload/v1641521684/ans/team/nte88ouzhlxmrznkadbg.jpg",
  },
  {
    id: 5,
    name: "Michael Dlone",
    nim: "2301960806",
    image:
      "https://res.cloudinary.com/dor0udr7t/image/upload/v1641521684/ans/team/bzi44aa73fjgprnce7cw.jpg",
  },
  {
    id: 6,
    name: "Raymon Vincent Soegihjanto",
    nim: "2301887572",
    image:
      "https://res.cloudinary.com/dor0udr7t/image/upload/v1641521684/ans/team/x9rduvrathjqxwk55lnd.jpg",
  },
];

const About = () => {
  const MotionBox = motion(Box);
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={5} mx={{ base: 0, md: 3 }}>
      {team.map((d) => (
        <MotionBox
          p="3"
          shadow="md"
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <VStack key={d.id}>
            <Image w="120px" rounded="full" src={d.image} alt={d.name} />
            <Heading textAlign="center">{d.name}</Heading>
            <Text>{d.nim}</Text>
          </VStack>
        </MotionBox>
      ))}
    </SimpleGrid>
  );
};

export default About;
