import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Posts } from "../components/Posts";
import { useGetExploreFeedQuery } from "../services/posts";

export function Explore(): JSX.Element {
  const { data, isLoading } = useGetExploreFeedQuery();
  if (isLoading) {
    return (
      <Flex justify={"center"} w={"100%"} mt={"1rem"}>
        <Spinner thickness="3px" emptyColor={"gray.200"} color={"blue.400"} />
      </Flex>
    );
  }
  if (data && !data.posts.length) {
    return (
      <Flex justify={"center"} w={"100%"} mt={"1rem"}>
        <Text>No Posts!</Text>
      </Flex>
    );
  }
  return <Posts posts={data?.["posts"]} />;
}
