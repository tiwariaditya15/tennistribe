import { Post as PostType } from "../../services/posts";
import { Box, Flex } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import moment from "moment";
import { useAppSelector } from "../../hooks";

type PostProps = {
  post: PostType;
};

export function Post({ post }: PostProps): JSX.Element {
  const isAuthor = useAppSelector((state) => state.auth.currentUser?.username);
  const date = moment(post.timestamp, "YYYYMMDD").fromNow();
  return (
    <Flex
      flexDirection={"column"}
      borderBottom={"1px"}
      borderColor={"gray.100"}
      px={"0.4rem"}
      py="0.4rem"
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
      <Flex py={"0.5rem"} fontSize={"1.5rem"}>
        <Box color={"red.500"} cursor={"pointer"}>
          {isAuthor ? <AiFillHeart /> : <AiOutlineHeart />}
        </Box>
        <Box pl="1rem" cursor={"pointer"} color={"gray.500"}>
          <BiCommentDetail />
        </Box>
      </Flex>
    </Flex>
  );
}
