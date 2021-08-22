import { message } from "antd"

export const success = (msg) => {
  message.success(msg);
};

export const errorMsg = (err) => {
  message.error(err);
};