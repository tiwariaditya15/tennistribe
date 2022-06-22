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
};

export function LikedListModal({
  isOpen,
  onClose,
  children,
}: ModalProps): JSX.Element {
  return (
    <ChakraModal
      onOverlayClick={() => {
        onClose();
      }}
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent bgColor={"gray.900"}>
        <ModalHeader textTransform={"capitalize"} color={"gray.400"}>
          Liked By
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
