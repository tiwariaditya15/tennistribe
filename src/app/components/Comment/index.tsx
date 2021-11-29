import { Box, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import {
  Comment as CommentType,
  useRemoveCommentMutation,
} from "../../services/posts";
import { AiFillDelete } from "react-icons/ai";

type CommentProps = {
  comment: CommentType;
};
export function Comment({ comment }: CommentProps): JSX.Element {
  const toast = useToast();
  const [removeComment, { isLoading }] = useRemoveCommentMutation();
  const handleRemoveComment = async () => {
    try {
      await removeComment({
        postId: comment.post.id,
        id: comment.id,
      }).unwrap();
      toast({
        title: "Deleted!",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {}
  };
  return (
    <Flex
      flexDirection={"column"}
      borderBottom={"1px"}
      borderColor={"gray.100"}
    >
      <Flex px={"0.5rem"} py={"0.4rem"} color={"gray.600"}>
        <Text>{comment.author.name}</Text>
        <Text color={"gray.400"}>@{comment.author.username}</Text>
      </Flex>
      <Flex
        justify={"space-between"}
        px={"0.5rem"}
        py={"0.4rem"}
        color={"gray.600"}
      >
        <Text>{comment.comment}</Text>
        <Box
          cursor={"pointer"}
          onClick={() => {
            if (!isLoading) {
              handleRemoveComment();
            }
          }}
        >
          {isLoading ? <Spinner /> : <AiFillDelete />}
        </Box>
      </Flex>
    </Flex>
  );
}
