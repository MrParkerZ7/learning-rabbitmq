const { connect } = require("amqplib");
const { rabbitMQ } = require("../common/config");

async function consumeMessage() {
  const connection = await connect(rabbitMQ.URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(rabbitMQ.ExchangeName, "direct");

  const q = await channel.assertQueue(rabbitMQ.QueueInfo);

  await channel.bindQueue(q.queue, rabbitMQ.ExchangeName, "Info");

  channel.consume(q.queue, (msg) => {
    console.log(``);
    console.log(`**Consume_2 Message**`);
    console.log(`[Exchange Name] : ${rabbitMQ.ExchangeName}`);
    console.log(`[Message] : ${msg.content.toString()}`);
    channel.ack(msg);
  });
}

consumeMessage();
