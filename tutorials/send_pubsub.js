var amqp = require("amqplib/callback_api");

amqp.connect("amqp://127.0.0.1", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err1, channel) => {
    if (err1) throw err1;

    var exchange = "log";
    var msg = process.argv.slice(2).join(" ") || "Hello World!";

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });

    channel.publish(exchange, "", Buffer.from(msg));
    console.log("Send: %s", msg);
  });

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
