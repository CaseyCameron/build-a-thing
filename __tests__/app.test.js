import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

describe.skip('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('creates a new order and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({ id: '1', quantity: 10 });
  });

  it('creates a GET request for an order by id', async () => {
    const order = await Order.insert({ quantity: 3 });
    return request(app)
      .get(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).toEqual(order);
      });
  });

  it('creates a GET request for all orders', async () => {
    const order1 = await Order.insert({ quantity: 3 });
    const order2 = await Order.insert({ quantity: 4 });
    const order3 = await Order.insert({ quantity: 5 });
    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([order1, order2, order3]);
      });
  });

  it.skip('updates a PUT request for an order by id', async () => {
    const order = await Order.insert({ quantity: 3 });
    order.quantity = 4;

    const res = await request(app).put(`/api/v1/orders/${order.id}`)
      .send(order);
    expect(res.body).toEqual(order);
    // return request(app)
    //   .put(`/api/v1/orders/${order.id}`)
    //   .then((res) => {
    //     expect(res.body).toEqual(order);
    //   });
  });

  it('deletes an ORDER by id', async () => {
    const order = await Order.insert({ quantity: 3 });

    const res = await request(app).delete(`/api/v1/orders/${order.id}`)
      .send(order);
    expect(res.body).toEqual(order);
  });
});
