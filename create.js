import AWS from "aws-sdk";
import uuid from "uuid";

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
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };

        if (error) {
            const response = {
                statusCode: 500,
                headers,
                body: JSON.stringify({ status: false })
            };
            callback(null, response);
            return;
        }

        const response = {
            statusCode: 200,
            headers,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
}
