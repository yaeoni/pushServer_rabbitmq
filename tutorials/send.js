var amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1", function (err, connection) {
  if (err) {
    throw err;
  }
  connection.createChannel(function (err1, channel) {
    if (err1) throw err1;

    var queue = "hello";
    var msg = {
      test: "hello~",
      yaewon: "cute",
    };

    channel.assertQueue(queue, {
      durable: false,
    });

    //JSON data 보내는 방법
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log("Sent %s to queue", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
