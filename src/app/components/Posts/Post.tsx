import {
  Post as PostType,
  useToggleReactionMutation,
} from "../../services/posts";
import { Box, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAppSelector } from "../../hooks";
import { PostComment } from "../../../features/posts/PostComment";
import { useToggle } from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { PostMenu } from "../PostMenu";
import { MaterialSymbolsBookmark } from "../icons";

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
  const navigate = useNavigate();
  const { setToggle, toggle } = useToggle();
  const currentUserEmail = useAppSelector(
    (state) => state.auth.currentUser?.email
  );

  const [toggleReaction, { isLoading: isReacting }] =
    useToggleReactionMutation();
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
      >
        {/* card-header */}
        <Flex justify={"space-between"}>
          <Flex>
            <Box color={"gray.400"} pr="0.2rem">
              {post.author.name}
            </Box>
            <Box color={"gray.600"} pr="0.2rem">
              @{post.author.username}
            </Box>
            <Box color={"gray.600"}>&middot;{date} ago</Box>
          </Flex>
          <Box onClick={(e) => e.stopPropagation()} color={"gray.400"}>
            {post.author.email === currentUserEmail && (
              <PostMenu postId={post.id} />
            )}
          </Box>
        </Flex>
        {/* card-content */}
        <Flex py="0.5rem" color={"gray.400"}>
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
                if (isReacting) return;
                try {
                  await toggleReaction(post.id).unwrap();
                } catch (error: any) {}
              }}
            >
              {heartIcon}
            </Box>
            <Box fontSize={"smaller"}>
              {post.likedBy.length && post.likedBy.length}
            </Box>
          </GridItem>
          <GridItem display={"flex"} alignItems={"center"} gridGap={1}>
            <Box
              cursor={"pointer"}
              color={"gray.500"}
              onClick={(e) => {
                e.stopPropagation();
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
          <GridItem onClick={(e) => e.stopPropagation()}>
            <MaterialSymbolsBookmark color="var(--gray-600)" />
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
    </>
  );
}
