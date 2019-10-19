import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response";

export async function main(event, context, callback) {
    const stripe = stripePackage(process.env.stripeSecretKey);

    const { source, storage } = JSON.parse(event.body);
    const description = "Charge for Notes Storage";
    const amount = calculateCost(storage);
    try {
        await stripe.charges.create({
            source,
            amount,
            description
        });
        return success({ status: true });
    } catch (error) {
        return failure({ status: false, message: error.message });
    }
}
