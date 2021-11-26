import { Box, Flex, Text } from "@chakra-ui/react";
import { Post } from "./Post";
import { Post as PostType } from "../../services/posts";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type PostsProps = {
  posts?: PostType[];
};

export function Posts({ posts }: PostsProps): JSX.Element {
  const navigate = useNavigate();
  const logged = useAppSelector((state) => state.auth.logged);
  const [commenting, setCommenting] = useState<string>("");

  if (!posts)
    return (
      <Flex justify={"center"} mt={"1rem"} color={"gray.600"}>
        <Text>No posts!</Text>
      </Flex>
    );
  return (
    <>
      {posts.map((post) => (
        <Post
          post={post}
          commenting={commenting}
          setCommenting={setCommenting}
        />
      ))}
    </>
  );
}
