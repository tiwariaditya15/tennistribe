import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useAppSelector } from "../../app/hooks";

export function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const logged = useAppSelector((state) => state.auth.logged);
  const signIn =
    !logged &&
    location.pathname !== "/signin" &&
    location.pathname !== "/signup" ? (
      <Box
        color="gray.600"
        onClick={() => navigate("/signin")}
        cursor={"pointer"}
      >
        <FaSignInAlt />
      </Box>
    ) : null;
  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      color={"twitter.400"}
      bgColor={"black"}
      fontSize={"1.6rem"}
      p={"1rem"}
      borderBottom="1px"
      borderColor={"gray.700"}
    >
      <Text fontWeight={"600"}>
        <NavLink to="/">
          <em>TennisTribe</em>
        </NavLink>
      </Text>
    </Flex>
  );
}
