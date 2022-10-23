const { connect } = require("amqplib");
const { rabbitMQ } = require("../common/config");

class Producer {
  channel;

  async createChannel() {
    const connection = await connect(rabbitMQ.URL);

    this.channel = await connection.createChannel();
  }

  async publishMessage(logType, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const ExchangeName = rabbitMQ.ExchangeName;
    await this.channel.assertExchange(
      ExchangeName,
      "topic",
      rabbitMQ.AssertConfig
    );

    const logDetails = {
      logType,
      message: message,
      dataTime: new Date(),
    };
    await this.channel.publish(
      ExchangeName,
      logType,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(``);
    console.log(`**Send Message**`);
    console.log(`[Exchange Name] : ${ExchangeName}`);
    console.log(`[Log Type] : ${logType}`);
    console.log(`[Message] : ${JSON.stringify(message)}`);
  }
}

module.exports = Producer;
