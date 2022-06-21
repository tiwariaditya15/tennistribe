import { Button, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { Post } from "./Post";
import { Post as PostType } from "../../services/posts";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
import { IconoirStarOutline, MaterialSymbolsTrendingUpRounded } from "../icons";
import { sortByLatestPosts, sortByTopPosts } from "../../utilities";

type PostsProps = {
  posts?: PostType[];
};

export function Posts({ posts }: PostsProps): JSX.Element {
  const logged = useAppSelector((state) => state.auth.logged);
  const [commenting, setCommenting] = useState<string>("");
  const [sort, setSort] = useState<"NEW" | "TOP" | "">("");

  if (!posts)
    return (
      <Flex justify={"center"} mt={"1rem"} color={"gray.600"}>
        {logged ? <Text>No posts!</Text> : <Text>SignIn to explore</Text>}
      </Flex>
    );
  const sorted =
    sort === ""
      ? posts
      : sort === "NEW"
      ? sortByLatestPosts(posts)
      : sortByTopPosts(posts);
  return (
    <>
      <Grid
        templateColumns={"repeat(2, 1fr)"}
        color={"gray.500"}
        borderBottom={"1px"}
        borderColor={"gray.700"}
      >
        <GridItem mx={"auto"}>
          <Button
            onClick={() => {
              setSort("TOP");
            }}
            color={sort === "TOP" ? "blue.300" : "inherit"}
            fontWeight={sort === "TOP" ? "800" : "inherit"}
            variant={"unstyled"}
          >
            <HStack>
              <MaterialSymbolsTrendingUpRounded />
              <Text>Top</Text>
            </HStack>
          </Button>
        </GridItem>
        <GridItem mx={"auto"}>
          <Button
            onClick={() => {
              setSort("NEW");
            }}
            color={sort === "NEW" ? "blue.300" : "inherit"}
            fontWeight={sort === "NEW" ? "800" : "inherit"}
            variant={"unstyled"}
          >
            <HStack>
              <IconoirStarOutline />
              <Text>New</Text>
            </HStack>
          </Button>
        </GridItem>
      </Grid>
      {sorted.length ? (
        sorted.map((post) => (
          <Post
            post={post}
            commenting={commenting}
            setCommenting={setCommenting}
            key={post.id}
          />
        ))
      ) : (
        <Text textAlign={"center"} color={"gray.400"} mt={"1rem"}>
          No posts!
        </Text>
      )}
    </>
  );
}
