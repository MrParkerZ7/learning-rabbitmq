module.exports = {
  rabbitMQ: {
    URL: "amqp://localhost",
    ExchangeName: "RabbitMQ_Exchange_Topic",
    QueueInfo: "RabbitMQ_Queue_Info_Topic",
    AssertConfig: {
      durable: false,
      exclusive: true,
    },
  },
};
