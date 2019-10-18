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
        const result = await dynamoCall("get", params);
        if (result.Item) {
            return success(result.Item);
        } else {
            return failure({ status: false, message: "Item not found" });
        }
    } catch (error) {
        return failure({ status: false });
    }
}
