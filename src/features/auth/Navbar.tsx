import { Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function Navbar(): JSX.Element {
  return (
    <Flex
      justify={"space-between"}
      color={"twitter.400"}
      fontSize={"1.6rem"}
      p={"1rem"}
    >
      <Text fontWeight={"600"}>
        <NavLink to="/">TennisTribe</NavLink>
      </Text>
    </Flex>
  );
}
