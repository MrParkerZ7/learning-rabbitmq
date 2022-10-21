import { connect } from "amqplib";
const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();

const queue = "RabbitMQ_Queue_Basic";

await channel.assertQueue(queue, { durable: true });
channel.consume(queue, (msg) => {
  console.log(`Receive Message: ${msg.content.toString()}`);
  channel.ack(msg);
});
