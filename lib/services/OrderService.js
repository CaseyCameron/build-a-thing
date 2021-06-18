import Order from '../models/Order';
import { sendSms } from '../utils/twilio.js';

export default class OrderService {
  static async create({ quantity }) {
    const order = await Order.insert({ quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New order received for ${quantity} items.`
    );
    return order;
  }
}
