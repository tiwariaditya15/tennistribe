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
import { useFormik } from "formik";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { signIn } from "./authSlice";
import * as yup from "yup";

type InitialValues = {
  username: string;
  password: string;
};
const initialValues: InitialValues = {
  username: "",
  password: "",
};

export function SignIn(): JSX.Element {
  const [hidden, setHidden] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.auth.logged);
  const authError = useAppSelector((state) => state.auth.error);
  const width = useBreakpointValue({ base: "95%", md: "50%", lg: "25%" });
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      username: yup.string().required("Enter username"),
      password: yup.string().required("Enter password"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      dispatch(signIn(values)).then(() => {
        setLoading(false);
      });
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
      <Box>
        <FormControl id="Username" color={"gray.700"} isRequired>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            {...formik.getFieldProps("username")}
          />
          <Text color="red.400" mt="0.4rem">
            {formik.errors.username && formik.errors.username}
          </Text>
        </FormControl>
      </Box>
      <Box mt="2rem">
        <Box pos={"relative"}>
          <FormControl id="Password" color={"gray.700"} isRequired>
            <Input
              type={hidden ? "password" : "text"}
              id="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <Text color="red.400" mt="0.4rem">
              {formik.errors.password && formik.errors.password}
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
          {isLoading ? <Spinner /> : "SignIn"}
        </Button>
      </Box>
      <Box>
        <Button
          mt="1rem"
          onClick={() => {
            formik.setFieldValue("username", "tiwsadi");
            formik.setFieldValue("password", "tiwsadi@123");
          }}
        >
          Fill Credentials
        </Button>
      </Box>
      <Box mt="0.5rem">
        <Text color="red.400">{authError && authError}</Text>
      </Box>
      <Box mt="0.8rem">
        <Text color="twitter.400">
          <span style={{ color: "black" }}>Don't have an account?</span>
          &nbsp;&nbsp;
          <NavLink to="/signup">SignUp</NavLink>
        </Text>
      </Box>
    </Flex>
  );
}
