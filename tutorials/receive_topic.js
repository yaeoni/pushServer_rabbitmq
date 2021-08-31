/*
 * process.argv 종류에 따라 메시지 선택적으로 받는다. // 여러개 받을 수 있음
 * => 내 서비스에 있어서는 특정 key를 정해두고 forEach에서 해당 키를 받았을 때 queue message처리를 다르게,,?!
 * "#" = receive all logs
 * "특정 문자열 + regex" = 특정하게 정할 수 있음("test.*", "*.123" ...)
 */

var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

amqp.connect("amqp://127.0.0.1", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err1, channel) => {
    if (err1) throw err1;

    var exchange = "topic_test";

    channel.assertExchange(exchange, "topic", {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      (err2, q) => {
        if (err2) throw err2;

        console.log("Waiting for logs~");

        args.forEach((key) => {
          channel.bindQueue(q.queue, exchange, key);
        });

        channel.consume(
          q.queue,
          (msg) => {
            console.log(
              "Receive %s:%s",
              msg.fields.routingKey,
              msg.content.toString()
            );
          },
          { noAck: true }
        );
      }
    );
  });
});
