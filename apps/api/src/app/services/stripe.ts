import Stripe from "stripe";
import config from "../config";

export const stripeInstance = new Stripe(config.stripe_api_secret);
