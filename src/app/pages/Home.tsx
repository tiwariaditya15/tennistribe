import { Grid, GridItem, Box, useMediaQuery } from "@chakra-ui/react";
import { Posts } from "../components/Posts";
import { CreatePost } from "../../features/posts";
import { useAppSelector } from "../hooks";
import { useGetPostsQuery } from "../services/posts";

export function Home(): JSX.Element {
  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");
  const { data, isLoading, isError, error } = useGetPostsQuery();
  const logged = useAppSelector((state) => state.auth.logged);
  const thirdColumn = !isSmallerThan748 ? <GridItem></GridItem> : null;

  return (
    <Grid templateColumns={"repeat(4, 1fr)"}>
      <GridItem></GridItem>
      <GridItem
        colSpan={isSmallerThan748 ? 3 : 2}
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.100"
        height={"100%"}
      >
        {logged ? <CreatePost /> : null}
        <Posts posts={data?.posts} />
      </GridItem>
      {thirdColumn}
    </Grid>
  );
}
