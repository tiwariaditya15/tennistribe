import { Post as PostType } from "../../services/posts";
import { Box, Flex } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import moment from "moment";
import { useAppSelector } from "../../hooks";
import { PostComment } from "../../../features/posts/PostComment";
import { useToggle } from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";

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
  const currentUser = useAppSelector((state) => state.auth.currentUser?.email);
  const isAuthor = currentUser === post.author.email ? true : false;
  const date = moment(post.timestamp, "YYYYMMDD").fromNow();
  return (
    <>
      <Flex
        flexDirection={"column"}
        borderBottom={"1px"}
        borderColor={"gray.100"}
        px={"0.4rem"}
        py="0.4rem"
        onClick={() => navigate(`/post/${post.id}`)}
        cursor={"pointer"}
      >
        {/* card-header */}
        <Flex justify={"flex-start"}>
          <Flex>
            <Box color={"gray.600"} pr="0.2rem">
              {post.author.name}
            </Box>
            <Box color={"gray.400"} pr="0.2rem">
              @{post.author.username}
            </Box>
          </Flex>
          <Box color={"gray.400"}>&middot;{date}</Box>
        </Flex>
        {/* card-content */}
        <Flex py="0.5rem" color={"gray.600"}>
          {post.content}
        </Flex>
        {/* card-actions */}
        <Flex
          py={"0.5rem"}
          fontSize={"1.5rem"}
          pl={"0.4rem"}
          alignItems={"center"}
        >
          <Box color={"red.500"} cursor={"pointer"}>
            {isAuthor ? <AiFillHeart /> : <AiOutlineHeart />}
          </Box>
          <Flex alignItems={"center"}>
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
