import {
  Button,
  Flex,
  Input,
  Text,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useAddCommentMutation } from "../../app/services/posts";
import { useFormik } from "formik";
import * as yup from "yup";
import { useError } from "../../app/hooks/useError";

type PostCommentProps = {
  postId: string;
  setCommenting: (postId: string) => void;
  setToggle: (toggle: boolean) => void;
};

type InitialValues = {
  comment: string;
};

const initialValues: InitialValues = {
  comment: "",
};

export function PostComment({
  postId,
  setCommenting,
  setToggle,
}: PostCommentProps): JSX.Element {
  const toast = useToast();
  const { error, setError } = useError(null);
  const [addComment, { isLoading }] = useAddCommentMutation();
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      comment: yup.string().required("Comment can't be empty."),
    }),
    onSubmit: async (values) => {
      try {
        await addComment({ comment: values.comment, postId }).unwrap();
        setCommenting("");
        setError(null);
        setToggle(false);
        toast({
          title: "Replied!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } catch (error: any) {
        setError(error.data.error);
      }
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
        <Text color="red.400">{error && error}</Text>
      </Box>
      <Flex justify={"flex-end"}>
        <Button
          borderRadius={"4rem"}
          colorScheme={"twitter"}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          {isLoading ? <Spinner /> : "Comment"}
        </Button>
      </Flex>
    </Flex>
  );
}
