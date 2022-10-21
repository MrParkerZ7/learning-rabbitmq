const { connect } = require("amqplib");
const { rabbitMQ } = require("./config");

class Producer {
  channel;

  async createChannel() {
    const connection = await connect(rabbitMQ.url);

    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");

    const logDetails = {
      logType: routingKey,
      message: message,
      dataTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`Send message '${message}' to exchange '${exchangeName}'`);
  }
}

module.exports = Producer;
