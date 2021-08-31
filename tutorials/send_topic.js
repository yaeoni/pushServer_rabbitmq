var amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err1, channel) => {
    if (err1) throw err1;

    var exchange = "topic_test";

    // key 설정 -> recevie에서 받을 key값 기준
    var args = process.argv.slice(2);
    var key = args[0];
    var msg = key + " - msg";

    channel.assertExchange(exchange, "topic", {
      durable: false,
    });

    channel.publish(exchange, key, Buffer.from(msg));
    console.log("Send %s : %s", key, msg);
  });

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
