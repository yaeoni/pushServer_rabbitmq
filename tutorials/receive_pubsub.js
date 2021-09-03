var amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err1, channel) => {
    if (err1) throw err1;

    var exchange = "log";

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      (err2, q) => {
        if (err2) throw err2;
        console.log("Waiting~ in %s", q.queue);
        channel.bindQueue(q.queue, exchange, "");

        channel.consume(
          q.queue,
          (msg) => {
            if (msg.content)
              console.log("Receive : %s", msg.content.toString());
          },
          { noAck: true }
        );
      }
    );
  });

  conn.createChannel((err1, channel) => {
    if (err1) throw err1;

    var exchange = "test";

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      (err2, q) => {
        if (err2) throw err2;
        console.log("Waiting~ in %s", q.queue);
        channel.bindQueue(q.queue, exchange, "");

        channel.consume(
          q.queue,
          (msg) => {
            if (msg.content)
              console.log("Receive : %s", msg.content.toString());
          },
          { noAck: true }
        );
      }
    );
  });
});
