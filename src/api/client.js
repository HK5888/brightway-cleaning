// All data, sign-in and server logic run on the hosting platform.
import { createClient } from "@hosted-platform/sdk";

export const platform = createClient({ appId: "app_8f2c1e94b7", requiresAuth: false });
export const { Customer, QuoteRequest, Quote, Job, Cleaner } = platform.entities;
export const auth = platform.auth;
export const functions = platform.functions;
