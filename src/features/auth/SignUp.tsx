import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

type InitialValues = {
  name: string;
  email: string;
  username: string;
  password: string;
};
const initialValues: InitialValues = {
  name: "",
  email: "",
  username: "",
  password: "",
};

export function SignUp(): JSX.Element {
  const [hidden, setHidden] = useState(false);
  const width = useBreakpointValue({ base: "95%", md: "50%", lg: "25%" });
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup.string().required("Enter name"),
      email: yup.string().email().required("Enter email"),
      username: yup.string().required("Enter username"),
      password: yup.string().required("Enter password"),
    }),
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return (
    <Flex
      flexDirection={"column"}
      justify={"center"}
      align={"center"}
      mt="2rem"
      p={"2rem"}
      mx={"auto"}
      width={width}
    >
      <Box mt="0.6rem">
        <FormControl id="name" color={"gray.700"} isRequired>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            {...formik.getFieldProps("name")}
          />
        </FormControl>
      </Box>
      <Box mt="0.6rem">
        <FormControl id="email" color={"gray.700"} isRequired>
          <Input
            type="text"
            id="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
        </FormControl>
      </Box>
      <Box mt="0.6rem">
        <FormControl id="username" color={"gray.700"} isRequired>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            {...formik.getFieldProps("username")}
          />
        </FormControl>
      </Box>
      <Box mt="0.6rem">
        <Box pos={"relative"}>
          <FormControl id="Password" color={"gray.700"} isRequired>
            <Input
              type={hidden ? "password" : "text"}
              id="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
          </FormControl>
          <Box
            color={"gray.500"}
            pos={"absolute"}
            top={"10px"}
            left={"12rem"}
            fontSize={"0.8rem"}
            cursor={"pointer"}
            onClick={() => setHidden((hidden) => !hidden)}
            zIndex={10}
          >
            {hidden ? "SHOW" : "HIDE"}
          </Box>
        </Box>
      </Box>
      <Box>
        <Button colorScheme={"twitter"} mt="1rem">
          SignUp
        </Button>
      </Box>
      <Box mt="1rem">
        <Text color="twitter.400">
          <span style={{ color: "black" }}>Already have an account?</span>
          &nbsp;&nbsp;
          <NavLink to="/signin">SignIn</NavLink>
        </Text>
      </Box>
    </Flex>
  );
}
