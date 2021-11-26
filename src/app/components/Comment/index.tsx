import { Box, Text } from "@chakra-ui/react";
import { Comment as CommentType } from "../../services/posts";
type CommentProps = {
  comment: CommentType;
};
export function Comment({ comment }: CommentProps): JSX.Element {
  return (
    <Box px={"0.5rem"} py={"1rem"}>
      <Text>{comment}</Text>
    </Box>
  );
}
