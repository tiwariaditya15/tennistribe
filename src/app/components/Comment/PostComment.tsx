import { Button, Flex, Input, Text, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

type PostCommentProps = {
  postId: string;
};

type InitialValues = {
  comment: string;
};

const initialValues: InitialValues = {
  comment: "",
};
export function PostComment({}: PostCommentProps): JSX.Element {
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      comment: yup.string().required("Comment can't be empty."),
    }),
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  return (
    <Flex
      flexDirection={"column"}
      borderBottom={"1px"}
      borderColor={"gray.100"}
      px={"0.4rem"}
      py={"0.4rem"}
      color={"gray.600"}
    >
      <Box>
        <Input
          type={"text"}
          id="comment"
          placeholder="Comment..."
          variant={"unstyled"}
          {...formik.getFieldProps("comment")}
        />
        <Text color="red.400">
          {formik.touched.comment &&
            formik.errors.comment &&
            formik.errors.comment}
        </Text>
      </Box>
      <Flex justify={"flex-end"}>
        <Button
          borderRadius={"4rem"}
          colorScheme={"twitter"}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Comment
        </Button>
      </Flex>
    </Flex>
  );
}
