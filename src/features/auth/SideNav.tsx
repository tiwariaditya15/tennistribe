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

type NavigationConfig = {
  title: string;
  path: string | null;
  isProtected: boolean;
  icon: () => JSX.Element;
}[];

export function SideNav(): JSX.Element {
  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logged = useAppSelector((state) => state.auth.logged);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const navigationConfig: NavigationConfig = [
    {
      title: "Home",
      icon: () => <IconoirHome />,
      path: "/",
      isProtected: false,
    },
    {
      title: "Explore",
      icon: () => <IcOutlineExplore />,
      path: "/explore",
      isProtected: false,
    },
    {
      title: "Bookmarks",
      icon: () => <MaterialSymbolsBookmarkOutline />,
      path: "/bookmarks",
      isProtected: true,
    },
    {
      title: "Profile",
      icon: () => <IconoirProfileCircled />,
      path: currentUser ? `/profile/${currentUser.username}` : null,
      isProtected: true,
    },
  ];

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
      color={"gray.500"}
      alignItems={"flex-start"}
    >
      {navigationConfig.map(({ title, path, icon, isProtected }, idx) => (
        <Box
          py={"1.2rem"}
          cursor={"pointer"}
          fontWeight={"medium"}
          fontSize={"1.2rem"}
          onClick={() => {
            if (isProtected) {
              currentUser ? navigate(path ? path : "/") : navigate("/");
              return;
            }
            navigate(path ? path : "/");
          }}
          key={idx}
        >
          <Flex
            align={"center"}
            gridGap={1}
            color={location.pathname === path ? "blue.300" : "inherit"}
            _hover={{ color: "blue.300" }}
          >
            {icon()}
            {!isSmallerThan748 ? <Text>{title}</Text> : null}
          </Flex>
        </Box>
      ))}
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
