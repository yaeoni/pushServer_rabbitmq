import amqp from "amqplib/callback_api";

// push 가 필요한 API 에서 해당 함수를 call 할 수 있게 한다.
// exchange : fanout key
function sendMsg(key: string, msg: string) {
  amqp.connect("amqp://127.0.0.1", (err, conn) => {
    if (err) throw err;

    let exchange = "direct_logs"; // exchange의 이름이라고 생각!
    conn.createChannel((err1, channel) => {
      if (err1) throw err1;

      channel.assertExchange(exchange, "direct", {
        durable: false,
      });

      channel.publish(exchange, key, Buffer.from(msg));
      console.log("Send: %s", msg);
    });

    setTimeout(function () {
      conn.close();
    }, 500);
  });
}
