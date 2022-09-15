const amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'hello';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(2);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            // console.log(msg)
            const seconds = msg.content.toString().split(".").length - 1;
            setTimeout(() => {
                console.log(" [x] Done")
                channel.ack(msg)
            }, seconds * 2 * 1000)
        }, {
            noAck: false
        });
    });
});
