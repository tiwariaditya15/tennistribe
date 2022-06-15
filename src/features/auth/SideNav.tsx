import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "./authSlice";
import {
  IconoirHome,
  IconoirMoreHorizCircledOutline,
  IconoirProfileCircled,
} from "../../app/components/icons";

export function SideNav(): JSX.Element {
  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logged = useAppSelector((state) => state.auth.logged);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const logoutPopover = (
    <Popover>
      <PopoverTrigger>
        <Flex
          align={"center"}
          gridGap={1}
          fontWeight={"medium"}
          fontSize={"1.2rem"}
          cursor={"pointer"}
        >
          <IconoirMoreHorizCircledOutline />
          <VStack gridGap={0}>
            {!isSmallerThan748 ? <Text>More</Text> : null}
          </VStack>
        </Flex>
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
        <Flex align={"center"} gridGap={1}>
          <IconoirHome />
          {!isSmallerThan748 ? <Text>Home</Text> : null}
        </Flex>
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
        <Flex align={"center"} gridGap={1}>
          <IconoirProfileCircled />
          {!isSmallerThan748 ? <Text>Profile</Text> : null}
        </Flex>
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
