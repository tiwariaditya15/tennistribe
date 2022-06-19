import { Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Post as ViewPost } from "../components/Posts/Post";
import { Comment } from "../components/Comment";
import { useGetPostQuery } from "../services/posts";

export function Post(): JSX.Element {
  const [commenting, setCommenting] = useState<string>("");
  const { postId } = useParams();
  const { data, isLoading } = useGetPostQuery(postId!, {
    pollingInterval: 3000,
  });

  if (isLoading)
    return (
      <Flex justify={"center"} mt={"1rem"} color={"gray.600"}>
        <Spinner thickness="3px" emptyColor={"gray.200"} color={"blue.400"} />
      </Flex>
    );
  return (
    <>
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
          borderColor={"gray.700"}
        >
          Pheww! No Comments!
        </Flex>
      )}
    </>
  );
}
