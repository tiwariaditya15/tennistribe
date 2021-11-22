import { Grid, GridItem, Box } from "@chakra-ui/react";
import { CreatePost } from "../../features/posts";
import { useAppSelector } from "../hooks";
import { useGetPostsQuery } from "../services/posts";

export function Home(): JSX.Element {
  const { data, isLoading, isError, error } = useGetPostsQuery();
  const token = useAppSelector((state) => state.auth.token);

  console.log({ data });
  return (
    <Grid templateColumns={"repeat(4, 1fr)"}>
      <GridItem></GridItem>
      <GridItem
        colSpan={2}
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.100"
        height={"100rem"}
      >
        <CreatePost />
      </GridItem>
      <GridItem></GridItem>
    </Grid>
  );
}
