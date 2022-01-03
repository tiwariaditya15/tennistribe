import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { Users } from "../components/Users";
import { SideNav } from "../../features/auth/SideNav";
export function Profile(): JSX.Element {
  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");

  const thirdColumn = !isSmallerThan748 ? (
    <GridItem>
      <Users />
    </GridItem>
  ) : null;

  return (
    <Grid templateColumns={"repeat(4, 1fr)"}>
      <GridItem mx={"auto"}>
        <SideNav />
      </GridItem>
      <GridItem
        colSpan={isSmallerThan748 ? 3 : 2}
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.100"
        height={"100vh"}
      ></GridItem>
      {thirdColumn}
    </Grid>
  );
}
