import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Text,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useRemovePostMutation } from "../../services/posts";
type PostMenuProps = {
  postId: string;
};

export function PostMenu({ postId }: PostMenuProps): JSX.Element {
  const navigate = useNavigate();
  const [removePost, { isLoading, isError, error }] = useRemovePostMutation();
  const handleRemovePost = async () => {
    try {
      await removePost(postId).unwrap();
      navigate("/");
    } catch (error: any) {}
  };

  return (
    <Popover>
      <PopoverTrigger>
        <span>
          <BsThreeDots />
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Menu</PopoverHeader>
        <PopoverBody>
          <Flex
            color={"red.500"}
            alignItems={"center"}
            onClick={() => {
              if (!isLoading) {
                handleRemovePost();
              }
            }}
          >
            <AiFillDelete /> <Text>Delete Post</Text>{" "}
            <Box color={"gray.500"}>{isLoading && <Spinner />}</Box>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
