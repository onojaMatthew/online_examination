import path from "path";
import sgMail from '@sendgrid/mail';

require("dotenv").config({ path: path.resolve(__dirname, "/../../.env")});

export const sendEmail = async (data) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    // return res.status(400).json(error("Internal Server Error. Please try again", res.statusCode));
  }

}