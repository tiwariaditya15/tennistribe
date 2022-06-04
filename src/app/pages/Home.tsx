import { Grid, GridItem, Flex, useMediaQuery, Spinner } from "@chakra-ui/react";
import { Posts } from "../components/Posts";
import { Users } from "../components/Users";
import { CreatePost } from "../../features/posts";
import { useAppSelector } from "../hooks";
import { useGetFeedQuery } from "../services/posts";

export function Home(): JSX.Element {
  const { data, isLoading, isError, error } = useGetFeedQuery(undefined, {});
  const logged = useAppSelector((state) => state.auth.logged);
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
