export function success(response) {
    return buildResponse(200, response);
}

export function failure(response) {
    return buildResponse(500, response);
}

function buildResponse(statusCode, response) {
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(response)
    };
}
