import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

export function SideNav(): JSX.Element {
  const navigate = useNavigate();
  const logged = useAppSelector((state) => state.auth.logged);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <Flex flexDirection={"column"} h={"100%"}>
      <Box
        py={"1.5rem"}
        color={"gray.600"}
        cursor={"pointer"}
        fontWeight={"medium"}
        fontSize={"1.2rem"}
        onClick={() => navigate("/")}
      >
        Home
      </Box>
      <Box
        py={"1.5rem"}
        color={"gray.600"}
        cursor={"pointer"}
        fontWeight={"medium"}
        fontSize={"1.2rem"}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Box>
      <Box color={"gray.600"} py={"1.5rem"}>
        {logged ? (
          <Box cursor={"pointer"}>
            <Text>{currentUser?.name}</Text>
            <Text color={"gray.400"}>@{currentUser?.username}</Text>
          </Box>
        ) : (
          <Button
            colorScheme={"twitter"}
            borderRadius={"4rem"}
            onClick={() => navigate("/signin")}
          >
            SignIn
          </Button>
        )}
      </Box>
    </Flex>
  );
}
