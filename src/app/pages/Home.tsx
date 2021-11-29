import { Grid, GridItem, Flex, useMediaQuery, Spinner } from "@chakra-ui/react";
import { Posts } from "../components/Posts";
import { CreatePost } from "../../features/posts";
import { useAppSelector } from "../hooks";
import { useGetPostsQuery } from "../services/posts";
import { SideNav } from "../../features/auth/SideNav";

export function Home(): JSX.Element {
  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");
  const { data, isLoading, isError, error } = useGetPostsQuery(undefined, {
    pollingInterval: 3000,
  });
  const logged = useAppSelector((state) => state.auth.logged);
  const thirdColumn = !isSmallerThan748 ? <GridItem></GridItem> : null;

  return (
    <Grid templateColumns={"repeat(4, 1fr)"}>
      <GridItem mx={"auto"}>
        <SideNav />
      </GridItem>
      <GridItem
        colSpan={isSmallerThan748 ? 3 : 2}
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.100"
        height={"100%"}
      >
        {logged ? <CreatePost /> : null}
        {isLoading ? (
          <Flex justify="center" mt="1rem">
            <Spinner />
          </Flex>
        ) : (
          <Posts posts={data?.posts} />
        )}
      </GridItem>
      {thirdColumn}
    </Grid>
  );
}
