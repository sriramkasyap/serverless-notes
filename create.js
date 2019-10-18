import uuid from "uuid";
import { success, failure } from "./libs/response";
import { dynamoCall } from "./libs/dynamodb-lib";

export async function main(event, context, callback) {
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

    try {
        await dynamoCall("put", params);
        return success(params.Item);
    } catch (error) {
        return failure({ status: false });
    }
}
