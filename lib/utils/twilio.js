import dotenv from 'dotenv';
dotenv.config();
//require('dotenv').config();

import twilio from 'twilio';

const username = process.env.TWILIO_ACCOUNT_SID;

const twilioClient = twilio(
  username,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_ORDER_HANDLER_NUMBER
);
console.log(twilioClient);
export const sendSms = (to, message) => {
  return twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to
  });
};
