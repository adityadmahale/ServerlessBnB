const dynamoose = require("dynamoose");

module.exports = function () {
  // Create new DynamoDB instance
  const ddb = new dynamoose.aws.sdk.DynamoDB({
    accessKeyId: "ASIAX44UYYXBUM7MKAEB",
    secretAccessKey: "FrcFJxIeM/69an0PVvkdK0wEUeOeB7faOdhdoq76",
    sessionToken:
      "FwoGZXIvYXdzEH8aDDK7oMMSg0pZX15+PiLAAZFj3tCjKumu4R/gOA+mudA8hH8yDWQ6KRhRrLMmXk1ZS59xsBMjyKtri96KzE/dAcqm2V7x0wKQOo8RCUgK1Tk16Q/6vRL+tI00x6+HLvEXJJW7yDbnr5cugJ3LK8FoyDnplYfs/TcrKmQraa9t53O3ZhJ/Tmp4WiAJHXMBS3qUk5M5whvghXaPgrrHVGRZXj4isUXHfVOLEhH+Epfj5gsO5bNKrM+/09AXuL5iNhaEN5jI5eOIxeEKdrjdP1AOPiiE3sWWBjItjTWKU9+SewamHmuJfJNEuT1JZxoyvsK6+rTCPuZ4CdRGzaZcpmls80hPcIX3",
    region: "us-east-1",
  });

  // Set DynamoDB instance to the Dynamoose DDB instance
  dynamoose.aws.ddb.set(ddb);
};
