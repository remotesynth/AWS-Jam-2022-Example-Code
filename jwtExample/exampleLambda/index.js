// The LaunchDarkly Node Server SDK
const LaunchDarkly = require("launchdarkly-node-server-sdk");
// for decrypting JWT tokens
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);
  await client.waitForInitialization();

  const header = await jwt.verify(
    event.headers.Authorization,
    process.env.SECRET_KEY
  );

  // we're just using an anonymous context for testing
  const context = {
    kind: "user",
    key: header.key,
  };

  const exampleLDCall = await client.variation("example-flag", context, false);

  const response = {
    statusCode: 200,
    body: JSON.stringify(exampleLDCall),
  };
  return response;
};
