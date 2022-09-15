const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        const exchange = 'direct_logs';
        const msg = process.argv.slice(3).join(' ') || 'Hello World!';
        const severity = process.argv?.[2] ?? 'info';
        channel.assertExchange(exchange, 'direct', {
            durable: false
        });
        channel.publish(exchange, severity, Buffer.from(msg));
        console.log(" [x] - [ %s ]: Sent %s", severity, msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
