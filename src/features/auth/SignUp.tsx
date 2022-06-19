import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  Input,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { Navigate, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useSignupMutation } from "../../app/services/auth";
import { setError } from "./authSlice";
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
  const [hidden, setHidden] = useState(true);

  const dispatch = useAppDispatch();
  const width = useBreakpointValue({ base: "95%", md: "95%", lg: "95%" });
  const logged = useAppSelector((state) => state.auth.logged);
  const [signup, { isLoading }] = useSignupMutation();

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup.string().required("Enter name"),
      email: yup.string().email().required("Enter email"),
      username: yup.string().required("Enter username"),
      password: yup.string().required("Enter password"),
    }),
    onSubmit: async (values) => {
      try {
        await signup(values).unwrap();
      } catch (error: any) {
        dispatch(error.data.error);
      }
    },
  });
  if (logged) {
    return <Navigate to="/" replace={true} />;
  }
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
        <FormControl id="name" color={"gray.400"} isRequired>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            {...formik.getFieldProps("name")}
          />
          <Text color="red.400">
            {formik.touched.name && formik.errors.name && formik.errors.name}
          </Text>
        </FormControl>
      </Box>
      <Box mt="0.6rem">
        <FormControl id="email" color={"gray.400"} isRequired>
          <Input
            type="text"
            id="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          <Text color="red.400">
            {formik.touched.email && formik.errors.email && formik.errors.email}
          </Text>
        </FormControl>
      </Box>
      <Box mt="0.6rem">
        <FormControl id="username" color={"gray.400"} isRequired>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            {...formik.getFieldProps("username")}
          />
          <Text color="red.400">
            {formik.touched.username &&
              formik.errors.username &&
              formik.errors.username}
          </Text>
        </FormControl>
      </Box>
      <Box mt="0.6rem">
        <Box pos={"relative"}>
          <FormControl id="Password" color={"gray.400"} isRequired>
            <Input
              type={hidden ? "password" : "text"}
              id="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <Text color="red.400">
              {formik.touched.password &&
                formik.errors.password &&
                formik.errors.password}
            </Text>
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
        <Button
          colorScheme={"twitter"}
          mt="1rem"
          onClick={() => formik.handleSubmit()}
        >
          {isLoading ? (
            <Spinner
              thickness="3px"
              emptyColor={"gray.200"}
              color={"blue.400"}
            />
          ) : (
            "SignUp"
          )}
        </Button>
      </Box>
      <Box mt="1rem">
        <Text color="twitter.400">
          <span style={{ color: "#718096" }}>Already have an account?</span>
          &nbsp;&nbsp;
          <NavLink to="/signin">SignIn</NavLink>
        </Text>
      </Box>
    </Flex>
  );
}
