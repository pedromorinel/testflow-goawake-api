const amqp = require('amqplib/callback_api');
const QUEUE_NAME = 'alarm-response';
function publishMessage(obj, QUEUE_NAME) {
  const payload = JSON.stringify(obj, null, 4);
  try {
    console.log('Publishing message:', payload);
    console.log('QUEUE_NAME:', QUEUE_NAME);

    const connection = {
      protocol: 'amqp',
      hostname: '10.1.2.25',
      port: '30089',
      username: 'rabbitmq',
      password: 'rabbitmqadmin',
      vhost: '/',
    };

    amqp.connect(connection, function (error0, connection) {
      if (error0) {
        console.error('Couldn\'t establish connection with RabbitMQ', error0);
        return;
      }

      console.log('Connection established successfully.');

      connection.createChannel(function (error1, channel) {
        if (error1) {
          console.error('Couldn\'t create channel', error1);
          return;
        }

        channel.assertQueue('alarm-response', { durable: true });

        if (payload !== undefined) {
          channel.sendToQueue('alarm-response', Buffer.from(payload), { persistent: true });
          console.log('Message published successfully.');
        } 

        setTimeout(function () {
          channel.close();
          connection.close();
        }, 500);
      });
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

publishMessage();


module.exports = {
  publishMessage,
};
