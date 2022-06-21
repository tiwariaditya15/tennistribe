import { Box, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import {
  Comment as CommentType,
  useRemoveCommentMutation,
} from "../../services/posts";
import { AiFillDelete } from "react-icons/ai";
import { useAppSelector } from "../../hooks";

type CommentProps = {
  comment: CommentType;
};
export function Comment({ comment }: CommentProps): JSX.Element {
  const toast = useToast();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
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
        position: "bottom-right",
      });
    } catch (error) {}
  };
  const deleteIcon =
    comment.author.username === currentUser?.username ? (
      <Box
        cursor={"pointer"}
        onClick={() => {
          if (!isLoading) {
            handleRemoveComment();
          }
        }}
      >
        {isLoading ? (
          <Spinner
            thickness="3px"
            emptyColor={"gray.200"}
            color={"blue.400"}
            size={"sm"}
          />
        ) : (
          <AiFillDelete />
        )}
      </Box>
    ) : null;
  return (
    <Flex
      flexDirection={"column"}
      borderBottom={"1px"}
      borderColor={"gray.700"}
    >
      <Flex px={"0.5rem"} py={"0.4rem"} color={"gray.600"}>
        <Text color={"gray.400"}>{comment.author.name}</Text>
        <Text color={"gray.600"}>@{comment.author.username}</Text>
      </Flex>
      <Flex
        justify={"space-between"}
        px={"0.5rem"}
        py={"0.4rem"}
        color={"gray.400"}
      >
        <Text>{comment.comment}</Text>
        {deleteIcon}
      </Flex>
    </Flex>
  );
}
