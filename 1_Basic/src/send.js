import { connect } from "amqplib";
const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();

const queue = "RabbitMQ_Queue_Basic";
const message = `**demo message** ${Date().toString()}`;

await channel.assertQueue(queue, { durable: true });
channel.sendToQueue(queue, Buffer.from(message));

console.log(`Send Message: ${message}`);
