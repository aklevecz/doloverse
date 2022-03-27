import aws from "./aws";
var docClient = new aws.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

// var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
export default docClient;
