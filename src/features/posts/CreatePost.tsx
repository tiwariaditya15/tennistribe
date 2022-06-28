import {
  Box,
  Textarea,
  Input,
  FormLabel,
  Flex,
  Button,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { BsImage } from "react-icons/bs";
import * as yup from "yup";
import { useAddPostMutation } from "../../app/services/posts";

type InitialValues = {
  content: string;
  media?: string | null;
};

const initialValues: InitialValues = {
  content: "",
  media: null,
};

export function CreatePost(): JSX.Element {
  const [addPost, { isLoading }] = useAddPostMutation();
  const toast = useToast();
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      content: yup.string().required("Tweet can't be empty."),
      // media: yup.f
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addPost({ content: values.content }).unwrap();
        toast({
          title: "Tweeted!",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom-right",
        });
        resetForm();
      } catch (error) {
        console.log({ error });
      } finally {
      }
    },
  });
  return (
    <Box
      color={"gray.400"}
      borderBottom={"1px"}
      borderColor={"gray.700"}
      py={"1rem"}
      px="1.5rem"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading) {
            formik.handleSubmit();
          }
        }}
      >
        <Textarea
          type="text"
          placeholder="What's popping tennis jocks?"
          id="content"
          variant={"unstyled"}
          {...formik.getFieldProps("content")}
        />
        {formik.touched.content && (
          <Text color={"red.400"}>
            {formik.errors.content ? formik.errors.content : null}
          </Text>
        )}

        <Flex justify={"space-between"} mt="1rem">
          <Box
            color={"gray.600"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FormLabel htmlFor="img" cursor={"pointer"}>
              {/* <BsImage /> */}
            </FormLabel>
            <Input
              type={"file"}
              id="img"
              name="img"
              w={"5%"}
              display={"none"}
            />
          </Box>
          <Button
            type="submit"
            colorScheme={"twitter"}
            bgColor={"twitter.500"}
            borderRadius={"4rem"}
            px="2rem"
          >
            {isLoading ? (
              <Spinner
                thickness="3px"
                emptyColor={"gray.200"}
                color={"blue.400"}
              />
            ) : (
              "Post"
            )}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
