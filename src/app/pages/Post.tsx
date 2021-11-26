import { Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SideNav } from "../../features/auth/SideNav";
import { selectPostById } from "../../features/posts/postsSlice";
import { useAppSelector } from "../hooks";
import { Post as ViewPost } from "../components/Posts/Post";
import { Comment } from "../components/Comment";

export function Post(): JSX.Element {
  const [commenting, setCommenting] = useState<string>("");
  const { postId } = useParams<"postId">();
  // @ts-ignore
  const post = useAppSelector((state) => selectPostById(state, postId));
  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");
  const thirdColumn = !isSmallerThan748 ? <GridItem></GridItem> : null;

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
        {post && (
          <ViewPost
            post={post}
            commenting={commenting}
            setCommenting={setCommenting}
          />
        )}
        {post && post.comments.map((comment) => <Comment comment={comment} />)}
      </GridItem>
      {thirdColumn}
    </Grid>
  );
}
