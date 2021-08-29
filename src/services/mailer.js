import path from "path";
import sgMail from '@sendgrid/mail';
import key from "../config/key";

export const sendEmail = async (data) => {
  sgMail.setApiKey(key.sendGridApiKey);

  var msg = {
    from: data.sender,
    to: data.receiver,
    subject: data.subject,
    text: 'Hello world',
    html: data.message
  };
  
  try {
    const result = await sgMail.send(msg);
    return result;
  } catch (err) {
    console.log(err.message);
  }

}