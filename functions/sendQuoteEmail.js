// Runs on the platform's servers.
export default async function sendQuoteEmail({ quote_id }, { entities, integrations }) {
  const quote = await entities.Quote.get(quote_id);
  const request = await entities.QuoteRequest.get(quote.request_id);
  await integrations.Core.SendEmail({
    to: request.email,
    subject: "Your Brightway Cleaning quote",
    body: `Hi ${request.customer_name}, your quote is $${quote.price}. Accept it here: ${process.env.APP_URL}/quote/${quote.id}`,
  });
  return { ok: true };
}
