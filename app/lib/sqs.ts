import aws from "./aws";
var sqs = new aws.SQS({ apiVersion: "2012-11-05" });
export default sqs;
