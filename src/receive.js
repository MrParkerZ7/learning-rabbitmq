import { connect } from "amqplib";
const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();

const queue = "message";

await channel.assertQueue(queue, { durable: true });
channel.consume(queue, (msg) => {
  console.log(`Receive Message: ${msg.content.toString()}`);
});
