const { connect } = require("amqplib");
const { rabbitMQ } = require("../common/config");

class Producer {
  channel;

  async createChannel() {
    const connection = await connect(rabbitMQ.URL);

    this.channel = await connection.createChannel();
  }

  async publishMessage(keyName, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const ExchangeName = rabbitMQ.ExchangeName;
    await this.channel.assertExchange(ExchangeName, "direct");

    const logDetails = {
      keyName,
      message: message,
      dataTime: new Date(),
    };
    await this.channel.publish(
      ExchangeName,
      keyName,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(``);
    console.log(`**Publish Message**`);
    console.log(`[Exchange Name] : ${ExchangeName}`);
    console.log(`[Key Name] : ${keyName}`);
    console.log(`[Message] : ${JSON.stringify(message)}`);
  }
}

module.exports = Producer;
