import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "./authSlice";

export function SideNav(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logged = useAppSelector((state) => state.auth.logged);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const logoutPopover = (
    <Popover>
      <PopoverTrigger>
        <Box cursor={"pointer"}>
          <Text>{currentUser?.name}</Text>
          <Text color={"gray.400"}>{currentUser?.username}</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent width={"max-content"}>
        <Button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
  return (
    <Flex flexDirection={"column"} h={"100%"}>
      <Box
        py={"1.2rem"}
        color={"gray.600"}
        cursor={"pointer"}
        fontWeight={"medium"}
        fontSize={"1.2rem"}
        onClick={() => navigate("/")}
      >
        Home
      </Box>
      <Box
        py={"1.2rem"}
        color={"gray.600"}
        cursor={"pointer"}
        fontWeight={"medium"}
        fontSize={"1.2rem"}
        onClick={() => {
          if (currentUser) {
            navigate(`/profile/${currentUser?.username}`);
          } else {
            navigate("/");
          }
        }}
      >
        Profile
      </Box>
      <Box color={"gray.600"} py={"1.2rem"}>
        {logged ? (
          <>{logoutPopover}</>
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
