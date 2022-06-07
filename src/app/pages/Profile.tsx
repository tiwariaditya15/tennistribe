import { Avatar, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "../services/users";
import { Posts } from "../../app/components/Posts";

export function Profile(): JSX.Element {
  const { username } = useParams();
  const { data, isLoading, isSuccess, isFetching } = useGetProfileQuery(
    username!
  );
  if (isLoading || isFetching) {
    return (
      <Flex w={"100%"} justify={"center"} mt={"1rem"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Box>
      <Flex
        flexDir={"column"}
        w={"100%"}
        px={"1rem"}
        py={"2rem"}
        borderBottom={"1px"}
        borderColor={"gray.100"}
      >
        <Avatar size={"xl"} />
        <Box my={"1rem"}>
          <Text>{data?.["user"]["name"]}</Text>
          <Text color={"gray.400"}>@{data?.["user"]["username"]}</Text>
        </Box>
        <Flex gridGap={4} color={"gray.500"}>
          <Text
            borderBottom={"1px"}
            borderColor={"white"}
            _hover={{
              borderBottom: "1px",
              borderColor: "gray.500",
              cursor: "pointer",
            }}
          >
            {data?.["user"]["following"].length} Following
          </Text>
          <Text
            borderBottom={"1px"}
            borderColor={"white"}
            _hover={{
              borderBottom: "1px",
              borderColor: "gray.500",
              cursor: "pointer",
            }}
          >
            {data?.["user"]["followedBy"].length} Followers
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection={"column"}>
        {isSuccess && data ? <Posts posts={data["posts"]} /> : null}
      </Flex>
    </Box>
  );
}
