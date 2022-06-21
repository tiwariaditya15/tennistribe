import { Flex, Spinner } from "@chakra-ui/react";
import { Posts } from "../components/Posts";
import { useGetBookmarksFeedQuery } from "../services/posts";

export function Bookmarks() {
  const { data, isLoading } = useGetBookmarksFeedQuery();
  if (isLoading) {
    return (
      <Flex justify={"center"} mt={"1rem"}>
        <Spinner thickness="3px" emptyColor={"gray.200"} color={"blue.400"} />
      </Flex>
    );
  }
  return <Posts posts={data?.posts} />;
}
