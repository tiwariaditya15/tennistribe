import {
  Post as PostType,
  useToggleReactionMutation,
} from "../../services/posts";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAppSelector } from "../../hooks";
import { PostComment } from "../../../features/posts/PostComment";
import { useToggle } from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { PostMenu } from "../PostMenu";

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
  const icon = isReacting ? (
    <Spinner thickness="3px" emptyColor={"gray.200"} color={"blue.400"} />
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
        <Flex
          py={"0.5rem"}
          fontSize={"1.5rem"}
          pl={"0.4rem"}
          alignItems={"center"}
        >
          <Box
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
              {icon}
            </Box>
            <Box fontSize={"smaller"}>
              {post.likedBy.length && post.likedBy.length}
            </Box>
          </Box>
          <Flex alignItems={"center"} gridGap={1}>
            <Box
              pl="3rem"
              pr={"0.4rem"}
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
              {post.comments.length ? post.comments.length : null}
            </span>
          </Flex>
        </Flex>
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
