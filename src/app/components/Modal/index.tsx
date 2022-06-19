import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
  list: "following" | "followers";
  setList: Dispatch<SetStateAction<"" | "following" | "followers">>;
};

export function Modal({
  isOpen,
  onClose,
  children,
  list,
  setList,
}: ModalProps): JSX.Element {
  return (
    <ChakraModal
      onOverlayClick={() => {
        onClose();
        setList("");
      }}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setList("");
      }}
    >
      <ModalOverlay />
      <ModalContent bgColor={"gray.900"}>
        <ModalHeader textTransform={"capitalize"} color={"gray.400"}>
          {list}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
