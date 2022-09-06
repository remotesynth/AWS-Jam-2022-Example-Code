// The LaunchDarkly Node Server SDK
const LaunchDarkly = require("launchdarkly-node-server-sdk");
// The SDK add-on for DynamoDB support
const {
  DynamoDBFeatureStore,
} = require("launchdarkly-node-server-sdk-dynamodb");

exports.handler = async (event) => {
  // Replace MY_DYNAMO_TABLE_NAME with your table name
  const store = DynamoDBFeatureStore("MY_DYNAMO_TABLE_NAME", {
    cacheTTL: 30,
  });
  // useLdd launches the client in daemon mode where flag values come
  // from the data store (i.e. dynamodb)
  const options = {
    featureStore: store,
    useLdd: true,
  };
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY, options);
  await client.waitForInitialization();

  // we're just using an anonymous user for testing
  const user = {
    key: "anonymous",
  };

  const apiVersion = await client.variationDetail("api-version", user, false);

  const response = {
    statusCode: 200,
    body: JSON.stringify(apiVersion),
  };
  return response;
};
