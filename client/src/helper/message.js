import { message } from "antd"

export const success = (msg) => {
  return message.success(msg);
};

export const errorMsg = (err) => {
  return message.error(err);
};