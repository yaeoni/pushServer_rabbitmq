/*
- listener 역할
- 현재는 직접 실행시킬 때 입력받지만, 이후 활용 시에는 직접 넣어줘도 될 것같다(args 수정)
*/
import amqp from "amqplib/callback_api";

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

amqp.connect("amqp://127.0.0.1", function (err, conn) {
  if (err) {
    throw err;
  }
  conn.createChannel(function (err1, channel) {
    if (err1) {
      throw err1;
    }
    var exchange = "direct_logs";

    channel.assertExchange(exchange, "direct", {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      function (err2, q) {
        if (err2) {
          throw err2;
        }
        console.log(" [*] Waiting for logs. To exit press CTRL+C");

        // severity -> key
        args.forEach(function (key) {
          channel.bindQueue(q.queue, exchange, key);
        });

        channel.consume(
          q.queue,
          function (msg) {
            console.log(
              " [x] %s: '%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
