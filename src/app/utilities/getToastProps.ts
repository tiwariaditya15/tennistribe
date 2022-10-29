import { AlertStatus, UseToastOptions } from "@chakra-ui/react";

type ToastProps = {
  status: AlertStatus;
  description: string;
};

export function getToastProps({
  status,
  description,
}: ToastProps): UseToastOptions {
  return {
    isClosable: true,
    position: "bottom-right",
    status,
    description,
  };
}
