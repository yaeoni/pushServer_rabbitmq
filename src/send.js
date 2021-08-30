var amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1", function (err, connection) {
  if (err) {
    throw err;
  }
  connection.createChannel(function (err1, channel) {
    if (err1) throw err1;

    var queue = "hello";
    var msg = "hello world!";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log("Sent %s to queue", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
