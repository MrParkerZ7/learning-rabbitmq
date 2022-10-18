import { connect } from "amqplib";
const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();

const queue = "message";
const message = "**demo message**";

console.log("init send");

await channel.assertQueue(queue, { durable: false });
channel.assertQueue(queue, Buffer.from(message));

console.log("end send");
