/**
 * Cloudflare Pages Function — Contact form handler
 * Route: POST /api/contact
 *
 * Sends an email to the business via the Resend API.
 *
 * Required environment variables (set in Cloudflare Pages → Settings → Variables):
 *   RESEND_API_KEY   (secret)  — your Resend API key
 *   CONTACT_TO       (var)     — where submissions are sent (e.g. nate@ironguardsafes.com)
 *   CONTACT_FROM     (var)     — verified sender (e.g. "Ironguard Website <noreply@ironguardsafes.com>")
 */

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[c]);

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const honeypot = (body.company || "").trim(); // spam trap

  // Bot filled the hidden field — pretend success, send nothing.
  if (honeypot) return json({ ok: true });

  // Basic validation
  if (!name || !phone || !email || !message) {
    return json({ ok: false, error: "Please fill in all fields." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  // Make sure the function is configured before trying to send.
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json(
      { ok: false, error: "The contact form isn't configured yet. Please call 848-222-3606." },
      500
    );
  }

  const html = `
    <h2 style="font-family:Georgia,serif;color:#1a2233;">New quote request — Ironguard Safes</h2>
    <table style="font-family:Arial,sans-serif;font-size:15px;color:#1c2230;border-collapse:collapse;">
      <tr><td style="padding:6px 14px 6px 0;color:#8a90a0;">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#8a90a0;">Phone</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#8a90a0;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#8a90a0;vertical-align:top;">Message</td><td>${escapeHtml(message).replace(/\n/g, "<br>")}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#8a90a0;margin-top:18px;">
      Sent from the Ironguard Safes website contact form.
    </p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `New quote request from ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend error:", res.status, detail);
    return json(
      { ok: false, error: "Sorry, something went wrong sending your message. Please call 848-222-3606." },
      502
    );
  }

  return json({ ok: true });
}
