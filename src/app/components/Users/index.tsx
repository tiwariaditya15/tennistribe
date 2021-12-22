import { Flex, Text } from "@chakra-ui/react";
import { useGetUsersQuery } from "../../services/users";
import { User } from "./User";
export function Users(): JSX.Element {
  const { data, isLoading, isError } = useGetUsersQuery();
  if (isLoading) {
    return (
      <Flex justify={"center"}>
        <Text color={"gray.500"} mt={"0.5rem"}>
          Loading users...
        </Text>
      </Flex>
    );
  }
  const usersList = data?.users.map((user) => (
    <User user={user} key={user.email} />
  ));
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      {usersList}
    </Flex>
  );
}
