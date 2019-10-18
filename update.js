import { success, failure } from "./libs/response";
import { dynamoCall } from "./libs/dynamodb-lib";

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Key: {
            user_id: event.requestContext.identity.cognitoIdentityId,
            note_id: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content": data.content || null,
            ":attachment": data.attachment || null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        await dynamoCall("update", params);
        return success({ status: true });
    } catch (error) {
        return failure({ status: false });
    }
}
