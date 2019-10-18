import { success, failure } from "./libs/response";
import { dynamoCall } from "./libs/dynamodb-lib";

export async function main(event, context, callback) {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await dynamoCall("query", params);
        if (result.Items) {
            return success(result.Items);
        } else {
            return failure({ status: false, message: "No Items found" });
        }
    } catch (error) {
        console.log(error);

        return failure({ status: false });
    }
}
