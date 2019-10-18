import AWS from "aws-sdk";

export function dynamoCall(action, params) {
    const client = new AWS.DynamoDB.DocumentClient();
    return client[action](params).promise();
}
