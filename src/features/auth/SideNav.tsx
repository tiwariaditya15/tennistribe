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
  IcOutlineExplore,
  MaterialSymbolsBookmarkOutline,
} from "../../app/components/icons";
import { removeAllPosts } from "../posts/postsSlice";

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
            dispatch(removeAllPosts());
            navigate("/");
          }}
          color={"black"}
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
  return (
    <Flex
      flexDirection={"column"}
      h={"100%"}
      color={"gray.400"}
      alignItems={"flex-start"}
    >
      <Box
        py={"1.2rem"}
        cursor={"pointer"}
        fontWeight={"medium"}
        fontSize={"1.2rem"}
        onClick={() => navigate("/")}
      >
        <Flex
          align={"center"}
          gridGap={1}
          color={location.pathname === "/" ? "blue.300" : "inherit"}
          _hover={{ color: "blue.300" }}
        >
          <IconoirHome />
          {!isSmallerThan748 ? <Text>Home</Text> : null}
        </Flex>
      </Box>
      <Box
        py={"1.2rem"}
        cursor={"pointer"}
        fontWeight={"medium"}
        fontSize={"1.2rem"}
        onClick={() => {
          navigate("/explore");
        }}
      >
        <Flex
          align={"center"}
          gridGap={1}
          color={location.pathname.includes("explore") ? "blue.300" : "inherit"}
          _hover={{ color: "blue.300" }}
        >
          <IcOutlineExplore />
          {!isSmallerThan748 ? <Text>Explore</Text> : null}
        </Flex>
      </Box>
      <Box
        py={"1.2rem"}
        cursor={"pointer"}
        fontWeight={"medium"}
        fontSize={"1.2rem"}
        onClick={() => {
          if (currentUser) {
            navigate(`/bookmarks`);
          } else {
            navigate("/");
          }
        }}
      >
        <Flex
          align={"center"}
          gridGap={1}
          color={
            location.pathname.includes("bookmarks") ? "blue.300" : "inherit"
          }
          _hover={{ color: "blue.300" }}
        >
          <MaterialSymbolsBookmarkOutline />
          {!isSmallerThan748 ? <Text>Bookmarks</Text> : null}
        </Flex>
      </Box>
      <Box
        py={"1.2rem"}
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
        <Flex
          align={"center"}
          gridGap={1}
          color={location.pathname.includes("profile") ? "blue.300" : "inherit"}
          _hover={{ color: "blue.300" }}
        >
          <IconoirProfileCircled />
          {!isSmallerThan748 ? <Text>Profile</Text> : null}
        </Flex>
      </Box>
      <Box py={"1.2rem"}>
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
