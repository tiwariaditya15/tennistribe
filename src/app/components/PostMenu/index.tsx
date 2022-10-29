import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Spinner,
  Box,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useRemovePostMutation } from "../../services/posts";
import { getToastProps } from "../../utilities";
type PostMenuProps = {
  postId: string;
};

export function PostMenu({ postId }: PostMenuProps): JSX.Element {
  const navigate = useNavigate();
  const toast = useToast();
  const [removePost, { isLoading, isError, error }] = useRemovePostMutation();
  const handleRemovePost = async () => {
    try {
      await removePost(postId).unwrap();
      toast(
        getToastProps({
          description: "Deleted post!",
          status: "info",
        })
      );
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
        <PopoverHeader color={"gray.600"}>Menu</PopoverHeader>
        <PopoverBody>
          <HStack
            color={"red.500"}
            alignItems={"center"}
            onClick={() => {
              if (!isLoading) {
                handleRemovePost();
              }
            }}
          >
            <AiFillDelete /> <Text>Delete Post</Text>{" "}
            <Box color={"gray.500"}>
              {isLoading && (
                <Spinner
                  thickness="3px"
                  emptyColor={"gray.200"}
                  color={"blue.400"}
                  size={"sm"}
                />
              )}
            </Box>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
