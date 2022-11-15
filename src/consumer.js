const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");

module.exports = (callback => {
  AWS.config.update({
    region: process.env.AWS_REGION
  });
  
  const app = Consumer.create({
    batchSize: 1,
    queueUrl: process.env.QUEUE_URL,
    handleMessage: (event) => {
      try {
        event.Body = JSON.parse(event.Body);
      } catch(err) {}
      callback(event.Body)
    },
  });
  
  app.on("error", (err) => {
    console.error(err.message);
  });
  
  app.on("processing_error", (err) => {
    console.error(err.message);
  });
  
  console.log("Receives Messages...");
  app.start();
  return app
});

