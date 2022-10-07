// The LaunchDarkly Node Server SDK
const LaunchDarkly = require("launchdarkly-node-server-sdk");
const fetch = require("node-fetch");
// The SDK add-on for DynamoDB support
const {
  DynamoDBFeatureStore,
} = require("launchdarkly-node-server-sdk-dynamodb");

exports.handler = async (event) => {
  const store = DynamoDBFeatureStore(process.env.DYNAMODB_TABLE, {
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

  const apiVersion = await client.variation("api-version", user, "");
  const apiURL = "https://aws-jam.netlify.app/" + apiVersion + "/index.json";
  const apiResults = await fetch(apiURL);
  const apiResponse = await apiResults.json();

  const response = {
    statusCode: 200,
    body: JSON.stringify(apiResponse),
  };
  return response;
};
