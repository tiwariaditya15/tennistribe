import { Flex, Spinner } from "@chakra-ui/react";
import { Posts } from "../components/Posts";
import { CreatePost } from "../../features/posts";
import { useAppSelector } from "../hooks";
import { useGetFeedQuery } from "../services/posts";
import { Helmet } from "react-helmet";

export function Home(): JSX.Element {
  const logged = useAppSelector((state) => state.auth.logged);
  const { data, isLoading, isError, error } = useGetFeedQuery(undefined, {
    refetchOnFocus: true,
    skip: !logged,
  });
  return (
    <>
      <Helmet>
        <title>Home / TennisTribe</title>
      </Helmet>
      {logged ? <CreatePost /> : null}
      {isLoading ? (
        <Flex justify="center" mt="1rem">
          <Spinner thickness="3px" emptyColor={"gray.200"} color={"blue.400"} />
        </Flex>
      ) : (
        <Posts posts={data?.posts} />
      )}
    </>
  );
}
