import { Flex, Spinner } from "@chakra-ui/react";
import { Posts } from "../components/Posts";
import { CreatePost } from "../../features/posts";
import { useAppSelector } from "../hooks";
import { useGetFeedQuery } from "../services/posts";

export function Home(): JSX.Element {
  const logged = useAppSelector((state) => state.auth.logged);
  const { data, isLoading, isError, error } = useGetFeedQuery(undefined, {
    refetchOnFocus: true,
    skip: !logged,
  });
  return (
    <>
      {logged ? <CreatePost /> : null}
      {isLoading ? (
        <Flex justify="center" mt="1rem">
          <Spinner />
        </Flex>
      ) : (
        <Posts posts={data?.posts} />
      )}
    </>
  );
}
