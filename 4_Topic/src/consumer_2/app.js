const { connect } = require("amqplib");
const { rabbitMQ } = require("../common/config");

async function consumeMessage() {
  const connection = await connect(rabbitMQ.URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(
    rabbitMQ.ExchangeName,
    "topic",
    rabbitMQ.AssertConfig
  );

  const q = await channel.assertQueue(rabbitMQ.QueueInfo);

  channel.consume(q.queue, (msg) => {
    console.log(``);
    console.log(`**Consume_2 Topic Message**`);
    console.log(`[Exchange Name] : ${rabbitMQ.ExchangeName}`);
    console.log(`[Message] : ${msg.content.toString()}`);
    channel.ack(msg);
  });
}

consumeMessage();
