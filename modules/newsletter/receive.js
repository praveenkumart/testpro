const amqp = require("amqplib/callback_api");
var models = require('../../models')
amqp.connect("amqp://" + "0.0.0.0", function (err, conn) {
    conn.createChannel(function (err, ch) {
        var ex = "news";

        ch.assertExchange(ex, "fanout", { durable: false });

        ch.assertQueue("", { exclusive: true }, function (err, q) {
            ch.bindQueue(q.queue, ex, "");

            ch.consume(q.queue, function (msg) {
                ch.ack(msg);
                console.log(" [x] %s", msg.content.toString());
                var data = msg.content.toString();
                if (data) {
                    console.log(JSON.parse(data)[1][0])
                }
                models.users.findOne({
                    where: {
                        email: JSON.parse(data)[1][0]
                    }
                })
                    .then(result => {
                        console.log('========================================= EMAIL CONTENT ================================================')
                        var emailContent = ` Hey , ${result['dataValues'].firstname}  ${result['dataValues'].lastname}
                    ${JSON.parse(data)[1][1]}
                         `;
                        console.log(emailContent)

                        console.log('========================================= EMAIL SENT SUCCESS FULLY ================================================')
                        models.logs.create({
                            newsletter_name: JSON.parse(data)[1][0],
                            email: JSON.parse(data)[1][1],
                            status:'success'
                        })

                    })
            });
        });
    });
});