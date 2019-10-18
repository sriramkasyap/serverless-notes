import { success, failure } from "./libs/response";
import { dynamoCall } from "./libs/dynamodb-lib";

export async function main(event, context, callback) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            user_id: event.requestContext.identity.cognitoIdentityId,
            note_id: event.pathParameters.id
        }
    };

    try {
        await dynamoCall("delete", params);
        return success({ status: true });
    } catch (error) {
        return failure({ status: false });
    }
}
