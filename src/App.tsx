import { useValidateTokenQuery } from "./app/services/auth";
import { Navbar, Router } from "./features/auth/";
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { SideNav } from "./features/auth/SideNav";
import { Users } from "./app/components/Users";
import { useAppSelector } from "./app/hooks";

function App() {
  useValidateTokenQuery();
  const logged = useAppSelector((state) => state.auth.logged);
  const [isSmallerThan748] = useMediaQuery("(max-width: 748px)");
  const thirdColumn =
    logged && !isSmallerThan748 ? (
      <GridItem>
        <Users />
      </GridItem>
    ) : null;
  return (
    <>
      <Navbar />
      <Grid templateColumns={`repeat(4, 1fr)`} bgColor="black">
        <GridItem p={0} mx={"auto"}>
          <SideNav />
        </GridItem>
        <GridItem
          colSpan={isSmallerThan748 ? 3 : 2}
          borderLeft="1px"
          borderRight="1px"
          borderColor="gray.700"
          height={"100vh"}
          overflowX={"scroll"}
        >
          <Router />
        </GridItem>
        {thirdColumn}
      </Grid>
    </>
  );
}

export default App;
