const { connect } = require("amqplib");
const { rabbitMQ } = require("../common/config");

class Producer {
  channel;

  async createChannel() {
    const connection = await connect(rabbitMQ.url);

    this.channel = await connection.createChannel();
  }

  async publishMessage(logType, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");

    const logDetails = {
      logType,
      message: message,
      dataTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      logType,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(``);
    console.log(`**Send Message**`);
    console.log(`[Exchange Name] : ${exchangeName}`);
    console.log(`[Log Type] : ${logType}`);
    console.log(`[Message] : ${JSON.stringify(message)}`);
  }
}

module.exports = Producer;
