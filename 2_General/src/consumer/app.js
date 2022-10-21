const { connect } = require("amqplib");
const { rabbitMQ } = require("../common/config");

async function consumeMessage() {
  const connection = await connect(rabbitMQ.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(rabbitMQ.exchangeName, "direct");

  const q = await channel.assertQueue(rabbitMQ.sourceQueue);

  await channel.bindQueue(q.queue, rabbitMQ.exchangeName, "Info");

  channel.consume(q.queue, (msg) => {
    console.log(``);
    console.log(`**Consume Message**`);
    console.log(`[Exchange Name] : ${rabbitMQ.exchangeName}`);
    console.log(`[Message] : ${msg.content.toString()}`);
    channel.ack(msg);
  });
}

consumeMessage();
