var AWS = require("aws-sdk");
var lambda = new AWS.Lambda();

exports.handler = async (event, context) => {
  const {
    eventTitle = null,
    challengeTitle = null,
    taskTitle = null,
    teamDisplayName = null,
    userInput = null, // <-- userInput only available if using the Lambda With Input validation type
    stackOutputParams = {}, // <-- a key/value map of the output params from the CloudFormation stack
  } = event;

  let completed = false;
  let message = "Not yet completed";

  var params = {
    FunctionName: "getFlagsStarter",
  };

  try {
    const results = await lambda.getFunction(params).promise();
    if (results) {
      completed = true;
      message = "The function exists! Lets go!";
    }
  } catch {
    return {
      completed, // required: whether this task is completed
      message, // required: a message to display to the team indicating progress or next steps
      progressPercent: 0, // optional: any whole number between 0 and 100
      metadata: {}, // optional: a map of key:value attributes to display to the team
    };
  }

  return {
    completed, // required: whether this task is completed
    message, // required: a message to display to the team indicating progress or next steps
    progressPercent: 0, // optional: any whole number between 0 and 100
    metadata: {}, // optional: a map of key:value attributes to display to the team
  };
};
