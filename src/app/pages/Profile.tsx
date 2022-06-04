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

  return <>Profile</>;
}
