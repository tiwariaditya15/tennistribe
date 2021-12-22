import { User as UserType } from "../../services/auth";
import { Box, Grid, GridItem, Button, Spinner } from "@chakra-ui/react";
import { useFollowMutation } from "../../services/users";

type UserProps = {
  user: Partial<UserType>;
};

export function User({ user }: UserProps): JSX.Element {
  const [follow, { isLoading }] = useFollowMutation();
  const handleFollow = async () => {
    try {
      // @ts-ignore
      await follow(user.username).unwrap();
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Grid templateColumns={"repeat(3, 1fr)"} my={"0.8rem"} mx={"0.4rem"}>
      <GridItem colSpan={2}>
        <Box color={"gray.600"}>{user.name}</Box>
        <Box color={"gray.400"}>@{user.username}</Box>
      </GridItem>
      <GridItem>
        <Button onClick={handleFollow}>
          {isLoading ? <Spinner /> : "Follow"}
        </Button>
      </GridItem>
    </Grid>
  );
}
