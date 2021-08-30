var amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1", function (err, connection) {
  if (err) throw err;

  connection.createChannel(function (err1, channel) {
    if (err1) throw err1;

    var queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log("Waiting for message!");

    channel.consume(
      queue,
      function (msg) {
        console.log("Receive! : %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
