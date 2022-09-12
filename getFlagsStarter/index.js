// The LaunchDarkly Node Server SDK
const LaunchDarkly = require("launchdarkly-node-server-sdk");

exports.handler = async (event) => {
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);
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
