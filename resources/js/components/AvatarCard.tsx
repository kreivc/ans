import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function AvatarCard({ data }: { data: any }) {
  return (
    <Flex my="1">
      <Image borderRadius="full" boxSize="30px" src={data.image} alt="image" />
      <Flex mx="3" direction="column">
        <Heading fontSize="md" color="gray.800">
          {data.name}
        </Heading>
        <Text fontSize="xx-small" color="GrayText">
          {new Date(data.date).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </Flex>
    </Flex>
  );
}
