import { User as UserType } from "../../services/auth";
import {
  Box,
  Grid,
  GridItem,
  Button,
  Spinner,
  Text,
  Flex,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useFollowMutation, useUnfollowMutation } from "../../services/users";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState } from "react";
import { addFollower, removeFollower } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type UserProps = {
  user: Partial<UserType>;
};

export function User({ user }: UserProps): JSX.Element {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [follow, { isLoading: isFollowing }] = useFollowMutation();
  const [unfollow, { isLoading: isUnfollowing }] = useUnfollowMutation();
  const toast = useToast();

  const following = useAppSelector(
    (state) => state.auth.currentUser?.following
  );
  const handleFollowUnFollow = async () => {
    if (isFollowing || isUnfollowing) {
      return;
    }
    try {
      if (following?.some((entry) => entry.username === user.username)) {
        await unfollow(user.username as string).unwrap();
        dispatch(removeFollower({ username: user.username as string }));
        toast({
          description: "Unfollowed!",
          isClosable: true,
          status: "info",
          position: "bottom-right",
        });
      } else {
        await follow(user.username as string).unwrap();
        dispatch(
          addFollower({
            username: user.username as string,
            name: user.name as string,
            email: user.email as string,
          })
        );
        toast({
          description: "Followed!",
          isClosable: true,
          status: "success",
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const loggedUserFollows = following?.some(
    (entry) => entry.username === user.username
  );
  return (
    <Grid templateColumns={"repeat(3, 1fr)"} _hover={{ bgColor: "gray.900" }}>
      <GridItem
        colSpan={2}
        onClick={() => navigate(`/profile/${user.username}`)}
        cursor={"pointer"}
        my={"0.8rem"}
        mx={"0.4rem"}
      >
        <Flex gridGap={2} align={"center"}>
          <Avatar size={"sm"} />
          <Box>
            <Box
              borderBottom={"1px"}
              borderColor={"gray.900"}
              _hover={{
                borderColor: "gray.400",
              }}
              color={"gray.400"}
            >
              {user.name}
            </Box>
            <Box color={"gray.600"}>@{user.username}</Box>
          </Box>
        </Flex>
      </GridItem>
      <GridItem my={"0.8rem"} mx={"0.4rem"}>
        {loggedUserFollows ? (
          <Button
            w={"100%"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            _hover={{ bgColor: "red.600", color: "white" }}
            onClick={handleFollowUnFollow}
          >
            {hovered
              ? isUnfollowing
                ? "Unfollowing"
                : "Unfollow"
              : isUnfollowing
              ? "Unfollowing"
              : "Following"}
          </Button>
        ) : null}
        {!loggedUserFollows ? (
          <Button w={"100%"} onClick={handleFollowUnFollow}>
            {isFollowing ? (
              <Spinner
                thickness="3px"
                emptyColor={"gray.200"}
                color={"blue.400"}
              />
            ) : loggedUserFollows ? (
              "Following"
            ) : (
              "Follow"
            )}
          </Button>
        ) : null}
      </GridItem>
    </Grid>
  );
}
