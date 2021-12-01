import {
  Box,
  Flex,
  Grid,
  GridItem,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { Params, useParams } from "react-router-dom";
import { SideNav } from "../../features/auth/SideNav";
import { Post as ViewPost } from "../components/Posts/Post";
import { Comment } from "../components/Comment";
import { useGetPostQuery } from "../services/posts";

export function Post(): JSX.Element {
  const [commenting, setCommenting] = useState<string>("");
  const { postId } = useParams();
  const { data, isLoading } = useGetPostQuery(postId!, {
    pollingInterval: 3000,
  });

  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");
  const thirdColumn = !isSmallerThan748 ? <GridItem></GridItem> : null;

  if (isLoading)
    return (
      <Flex justify={"center"} color={"gray.600"}>
        <Spinner />
      </Flex>
    );
  return (
    <Grid templateColumns={"repeat(4, 1fr)"}>
      <GridItem mx={"auto"}>
        <SideNav />
      </GridItem>
      <GridItem
        colSpan={isSmallerThan748 ? 3 : 2}
        borderLeft="1px"
        x
        borderRight="1px"
        borderColor="gray.100"
        height={"100%"}
      >
        {data?.post && (
          <ViewPost
            post={data?.post}
            commenting={commenting}
            setCommenting={setCommenting}
          />
        )}
        {data?.post && data?.post.comments.length ? (
          data?.post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))
        ) : (
          <Flex
            justify={"center"}
            py={"0.8rem"}
            color={"gray.400"}
            borderBottom={"1px"}
            borderColor={"gray.100"}
          >
            Pheww! No Comments!
          </Flex>
        )}
      </GridItem>
      {thirdColumn}
    </Grid>
  );
}
