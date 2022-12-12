import { toast } from "react-toastify";

export const showError = (error: any) => {
  const message = error?.message || "Something went wrong";
  toast(message, { type: "error" });
};
