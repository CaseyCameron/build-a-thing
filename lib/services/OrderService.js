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

  static async updateOrder({ quantity, id }) {
    const order = await Order.update({ quantity, id });

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order updated to ${quantity} items.`
    );
    return order;
  }
}
