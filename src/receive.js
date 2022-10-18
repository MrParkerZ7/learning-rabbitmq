import { connect } from "amqplib";
const connection = await connect("amqp://localhost");
const channel = await connection.createChannel();

const queue = "message";
const message = "**demo message**";

console.log("init receive");

await channel.assertQueue(queue, { durable: false });
channel.consume(queue, (msg) => {
  console.log(msg);
});

console.log("end receive");
