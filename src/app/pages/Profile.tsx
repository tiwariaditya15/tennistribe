import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "../services/users";
import { Posts } from "../../app/components/Posts";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { User } from "../components/Users/User";

export function Profile(): JSX.Element {
  const [list, setList] = useState<"following" | "followers" | "">("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { username } = useParams();
  const { data, isLoading, isSuccess, isFetching } = useGetProfileQuery(
    username!
  );

  const userlist =
    list !== "" && data ? (
      list === "followers" ? (
        data?.["user"]["followedBy"].map((user) => (
          <User user={user} key={user.email} />
        ))
      ) : (
        data?.["user"]["following"].map((user) => (
          <User user={user} key={user.email} />
        ))
      )
    ) : (
      <Text>No followers!</Text>
    );
  if (isLoading || isFetching) {
    return (
      <Flex w={"100%"} justify={"center"} mt={"1rem"}>
        <Spinner thickness="3px" emptyColor={"gray.200"} color={"blue.400"} />
      </Flex>
    );
  }

  return (
    <>
      <Box>
        <Flex
          flexDir={"column"}
          w={"100%"}
          px={"1rem"}
          py={"2rem"}
          borderBottom={"1px"}
          borderColor={"gray.700"}
        >
          <Avatar size={"xl"} />
          <Box my={"1rem"}>
            <Text color={"gray.400"}>{data?.["user"]["name"]}</Text>
            <Text color={"gray.600"}>@{data?.["user"]["username"]}</Text>
          </Box>
          <Flex gridGap={4} color={"gray.500"}>
            <Text
              borderBottom={"1px"}
              borderColor={"gray.600"}
              _hover={{
                borderBottom: "1px",
                borderColor: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setList("following");
                onOpen();
              }}
            >
              {data?.["user"]["following"].length} Following
            </Text>
            <Text
              borderBottom={"1px"}
              borderColor={"gray.600"}
              _hover={{
                borderBottom: "1px",
                borderColor: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setList("followers");
                onOpen();
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
      {list !== "" ? (
        <Modal list={list} isOpen={isOpen} onClose={onClose} setList={setList}>
          {userlist}
        </Modal>
      ) : null}
    </>
  );
}
