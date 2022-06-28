import {
  Post as PostType,
  useToggleBookmarkMutation,
  useToggleReactionMutation,
} from "../../services/posts";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAppSelector } from "../../hooks";
import { PostComment } from "../../../features/posts/PostComment";
import { useToggle } from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { PostMenu } from "../PostMenu";
import {
  MaterialSymbolsBookmark,
  MaterialSymbolsBookmarkOutline,
} from "../icons";
import { LikedListModal } from "./LikedListModal";
import { User } from "../Users/User";

type PostProps = {
  post: PostType;
  commenting: string;
  setCommenting: (postId: string) => void;
};

export function Post({
  post,
  commenting,
  setCommenting,
}: PostProps): JSX.Element {
  const logged = useAppSelector((state) => state.auth.logged);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { setToggle, toggle } = useToggle();
  const currentUserEmail = useAppSelector(
    (state) => state.auth.currentUser?.email
  );

  const [toggleReaction, { isLoading: isReacting }] =
    useToggleReactionMutation();
  const [toggleBookmark, { isLoading: isBookmarking }] =
    useToggleBookmarkMutation();

  const date = formatDistanceToNow(new Date(post.timestamp));
  const heartIcon = isReacting ? (
    <Spinner
      thickness="3px"
      emptyColor={"gray.200"}
      color={"blue.400"}
      size={"sm"}
    />
  ) : post.likedBy.some((user) => user.email === currentUserEmail) ? (
    <AiFillHeart />
  ) : (
    <AiOutlineHeart />
  );
  const usersList = post.likedBy.length ? (
    post.likedBy.map((user) => <User user={user} key={user.username} />)
  ) : (
    <Text color={"gray.400"} textAlign={"center"} py={"1rem"}>
      No likes!
    </Text>
  );
  return (
    <>
      <Flex
        flexDirection={"column"}
        borderBottom={"1px"}
        borderColor={"gray.700"}
        px={"0.4rem"}
        py="0.4rem"
        onClick={() => navigate(`/post/${post.id}`)}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.900",
        }}
      >
        {/* card-header */}
        <Flex justify={"space-between"}>
          <Flex align={"center"} gridGap={1} p={"0.5rem"}>
            <Avatar size={"sm"} />
            <Box color={"gray.400"} pr="0.2rem">
              {post.author.name}
            </Box>
            <Box color={"gray.600"} pr="0.2rem">
              @{post.author.username}
            </Box>
            <Box color={"gray.600"}>&middot;&nbsp;{date} ago</Box>
          </Flex>
          <Box onClick={(e) => e.stopPropagation()} color={"gray.400"}>
            {logged && post.author.email === currentUserEmail ? (
              <PostMenu postId={post.id} />
            ) : null}
          </Box>
        </Flex>
        {/* card-content */}
        <Flex p={"0.5rem"} py="0.5rem" color={"gray.400"}>
          {post.content}
        </Flex>
        {/* card-actions */}
        <Grid
          py={"0.5rem"}
          fontSize={"1.5rem"}
          pl={"0.4rem"}
          alignItems={"center"}
          templateColumns={"repeat(3, 1fr)"}
          w={"40%"}
          p={"0.5rem"}
        >
          <GridItem
            cursor={"pointer"}
            color={"gray.500"}
            display={"flex"}
            alignItems={"center"}
            gridGap={2}
          >
            <Box
              color={"red.500"}
              onClick={async (e) => {
                e.stopPropagation();
                if (!logged) {
                  toast({
                    description: "Login required!",
                    isClosable: true,
                    status: "error",
                    position: "bottom-right",
                  });
                  return;
                }
                if (isReacting) return;
                try {
                  await toggleReaction(post.id).unwrap();
                } catch (error: any) {}
              }}
            >
              {heartIcon}
            </Box>

            <Text
              fontSize={"smaller"}
              _hover={{
                color: "gray.400",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!logged) {
                  toast({
                    description: "Login required!",
                    isClosable: true,
                    status: "error",
                    position: "bottom-right",
                  });
                  return;
                }
                onOpen();
              }}
            >
              {post.likedBy.length && post.likedBy.length}
            </Text>
          </GridItem>
          <GridItem display={"flex"} alignItems={"center"} gridGap={1}>
            <Box
              cursor={"pointer"}
              color={"gray.500"}
              onClick={(e) => {
                e.stopPropagation();
                if (!logged) {
                  toast({
                    description: "Login required!",
                    isClosable: true,
                    status: "error",
                    position: "bottom-right",
                  });
                  return;
                }
                setToggle((curToggle) => !curToggle);
                setCommenting(post.id);
              }}
            >
              <BiCommentDetail />
            </Box>
            <span style={{ fontSize: "1rem", color: "gray" }}>
              {post.comments.length ? post.comments.length : "0"}
            </span>
          </GridItem>
          <GridItem
            onClick={async (e) => {
              e.stopPropagation();
              if (!logged) {
                toast({
                  description: "Login required!",
                  isClosable: true,
                  status: "error",
                  position: "bottom-right",
                });
                return;
              }
              if (isBookmarking) {
                return;
              }
              try {
                const res = await toggleBookmark(post.id).unwrap();
                toast({
                  status: "success",
                  position: "bottom-right",
                  description: res.message,
                  isClosable: true,
                });
              } catch (error) {
                toast({
                  status: "error",
                  position: "bottom-right",
                  description: "Couldn't bookmark",
                  isClosable: true,
                });
              }
            }}
          >
            {post.bookmarkedBy.some(
              (user) => user.email === currentUserEmail
            ) ? (
              <MaterialSymbolsBookmark color="var(--gray-600)" />
            ) : (
              <MaterialSymbolsBookmarkOutline color="var(--gray-600)" />
            )}
          </GridItem>
        </Grid>
      </Flex>
      {commenting === post.id && toggle && (
        <PostComment
          postId={post.id}
          setCommenting={setCommenting}
          setToggle={setToggle}
        />
      )}
      {isOpen ? (
        <LikedListModal isOpen={isOpen} onClose={onClose}>
          {usersList}
        </LikedListModal>
      ) : null}
    </>
  );
}
