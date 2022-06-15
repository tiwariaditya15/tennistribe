import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useGetUsersQuery } from "../../services/users";
import { User } from "./User";
export function Users(): JSX.Element {
  const { data, isLoading, isError } = useGetUsersQuery();
  if (isLoading) {
    return (
      <Flex justify={"center"} mt={"1rem"}>
        <Spinner thickness="3px" emptyColor={"gray.200"} color={"blue.400"} />
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
