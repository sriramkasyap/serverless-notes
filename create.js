import AWS from "aws-sdk";
import uuid from "uuid";
import { success, failure } from "./libs/response";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            user_id: event.requestContext.identity.cognitoIdentityId,
            content: data.content,
            attachment: data.attachment,
            note_id: uuid.v1(),
            createdAt: Date.now()
        }
    };

    dynamoDb.put(params, (error, data) => {
        if (error) {
            callback(null, failure({ status: false }));
            return;
        }

        callback(null, success(params.Item));
    });
}
