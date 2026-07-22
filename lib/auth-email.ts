type PasswordResetEmailInput = {
  name?: string | null;
  to: string;
  url: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const authEmailFrom = process.env.AUTH_EMAIL_FROM;
const authEmailSiteName = process.env.AUTH_EMAIL_SITE_NAME ?? "NextMaster";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildPasswordResetHtml({ name, url }: { name?: string | null; url: string }) {
  const safeName = name?.trim() ? escapeHtml(name.trim()) : "there";
  const safeUrl = escapeHtml(url);
  const safeSiteName = escapeHtml(authEmailSiteName);

  return `
    <div style="background:#f5f5f4;padding:32px 16px;font-family:Arial,sans-serif;color:#18181b;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;padding:32px;">
        <p style="margin:0 0 12px;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">${safeSiteName}</p>
        <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#09090b;">Reset your password</h1>
        <p style="margin:0 0 12px;font-size:16px;line-height:1.6;">Hi ${safeName},</p>
        <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">
          Click the button below to choose a new password for your account.
        </p>
        <a
          href="${safeUrl}"
          style="display:inline-block;border-radius:999px;background:#18181b;color:#ffffff;padding:14px 22px;text-decoration:none;font-weight:700;"
        >
          Reset Password
        </a>
        <p style="margin:24px 0 8px;font-size:14px;line-height:1.6;color:#52525b;">
          If the button does not work, copy and paste this link into your browser:
        </p>
        <p style="margin:0;word-break:break-all;font-size:14px;line-height:1.6;color:#18181b;">${safeUrl}</p>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#71717a;">
          If you did not request this change, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;
}

function buildPasswordResetText({ name, url }: { name?: string | null; url: string }) {
  const greetingName = name?.trim() || "there";
  return [
    `Hi ${greetingName},`,
    "",
    "Use the link below to reset your password:",
    url,
    "",
    "If you did not request this change, you can ignore this email.",
  ].join("\n");
}

export async function sendPasswordResetEmail({ name, to, url }: PasswordResetEmailInput) {
  if (!resendApiKey || !authEmailFrom) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[auth-email] Missing RESEND_API_KEY or AUTH_EMAIL_FROM. Password reset link:");
      console.warn(url);
      return;
    }

    throw new Error("Missing RESEND_API_KEY or AUTH_EMAIL_FROM for password reset emails.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: authEmailFrom,
      to: [to],
      subject: `${authEmailSiteName} password reset`,
      html: buildPasswordResetHtml({ name, url }),
      text: buildPasswordResetText({ name, url }),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to send password reset email: ${response.status} ${errorBody}`);
  }
}
