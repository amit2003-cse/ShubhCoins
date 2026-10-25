import nodemailer from "nodemailer";

interface OrderEmailItem {
  name: string;
  finish?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  giftMessage?: string;
  paymentMethod: string;
  amount: number;
  items: OrderEmailItem[];
  orderDate?: string;
}

// Brevo SMTP Transporter instance
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp-relay.brevo.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
    // Brevo TLS optimization
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Generate a luxury, modern responsive HTML email for ShubhCoins order confirmation
 */
function generateOrderConfirmationHTML(data: OrderEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shubhcoins.in";
  const trackingUrl = `${baseUrl}/track-order?orderId=${encodeURIComponent(data.orderId)}`;
  const whatsappUrl = `https://wa.me/917488574616?text=${encodeURIComponent(
    `Namaste ShubhCoins Team, I have a query regarding my Order #${data.orderId}`
  )}`;

  const formattedDate = data.orderDate
    ? new Date(data.orderDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  const isCOD =
    data.paymentMethod.toLowerCase().includes("cod") ||
    data.paymentMethod.toLowerCase().includes("cash");

  const itemsRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 16px 12px; border-bottom: 1px solid #F0EBE2;">
          <div style="font-family: 'Cinzel', Georgia, serif; font-weight: 700; color: #1A1817; font-size: 14px; line-height: 1.4;">
            ${item.name}
          </div>
          <div style="font-size: 11px; color: #9A7D3E; font-weight: 600; margin-top: 2px;">
            ${item.finish ? `${item.finish.toUpperCase()} FINISH • ` : ""}LAKSHMI EMBOSSED
          </div>
        </td>
        <td style="padding: 16px 12px; text-align: center; border-bottom: 1px solid #F0EBE2; font-size: 13px; color: #6B6661; font-weight: 600;">
          × ${item.quantity}
        </td>
        <td style="padding: 16px 12px; text-align: right; border-bottom: 1px solid #F0EBE2; font-family: 'Courier New', monospace; font-size: 14px; font-weight: 700; color: #4A0D17;">
          ₹${(item.price * item.quantity).toLocaleString("en-IN")}
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed #${data.orderId} - ShubhCoins</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 12px !important; }
      .content { padding: 20px 16px !important; }
      .col { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1A1817;">
  
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; padding: 24px 0;">
    <tr>
      <td align="center">
        
        <!-- Main Card Container -->
        <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 20px; border: 1px solid #EAE4D9; overflow: hidden; box-shadow: 0 10px 30px rgba(74, 13, 23, 0.06); width: 600px;">
          
          <!-- Brand Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3D0A12 0%, #4A0D17 60%, #2D060D 100%); padding: 36px 32px; text-align: center; border-bottom: 3px solid #C5A869;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <!-- Gold ShubhCoins Logo Mark -->
                    <div style="width: 54px; height: 54px; border-radius: 50%; background: #FAF8F5; border: 2px solid #C5A869; display: inline-block; line-height: 54px; text-align: center; margin-bottom: 12px; box-shadow: 0 4px 15px rgba(197, 168, 105, 0.3);">
                      <span style="font-family: Georgia, serif; font-size: 22px; font-weight: bold; color: #4A0D17;">SC</span>
                    </div>
                    <h1 style="margin: 0; font-family: 'Cinzel', Georgia, serif; font-size: 26px; font-weight: 700; color: #DFC278; letter-spacing: 1px;">
                      SHUBHCOINS
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #E8D9B5; letter-spacing: 2px; text-transform: uppercase;">
                      Gift Happiness • Gift Prosperity
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confirmation Hero Banner -->
          <tr>
            <td style="padding: 28px 32px 10px 32px; text-align: center; background-color: #FCFBF9;">
              <div style="display: inline-block; background-color: #ECFDF5; border: 1px solid #A7F3D0; padding: 6px 16px; border-radius: 20px; margin-bottom: 14px;">
                <span style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 1px;">
                  ✓ Order Placed & Confirmed
                </span>
              </div>
              <h2 style="margin: 0 0 8px 0; font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #1A1817;">
                Namaste, ${data.customerName}! 🙏
              </h2>
              <p style="margin: 0; font-size: 13px; color: #6B6661; line-height: 1.6;">
                Thank you for choosing ShubhCoins. Your sacred order for divine Goddess Lakshmi keepsake coins has been safely received and is being prepared with utmost devotion.
              </p>
            </td>
          </tr>

          <!-- Order Summary Meta Card -->
          <tr>
            <td style="padding: 18px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; border: 1px solid #EAE4D9; border-radius: 14px; padding: 16px;">
                <tr>
                  <td width="50%" style="vertical-align: top; padding: 4px 12px; border-right: 1px solid #EAE4D9;">
                    <span style="font-size: 11px; color: #9A7D3E; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Order Reference</span>
                    <div style="font-family: 'Courier New', monospace; font-size: 14px; font-weight: bold; color: #1A1817; margin-top: 4px;">
                      #${data.orderId}
                    </div>
                    <div style="font-size: 11px; color: #6B6661; margin-top: 2px;">
                      ${formattedDate}
                    </div>
                  </td>
                  <td width="50%" style="vertical-align: top; padding: 4px 12px;">
                    <span style="font-size: 11px; color: #9A7D3E; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Payment Mode</span>
                    <div style="font-size: 13px; font-weight: bold; color: #1A1817; margin-top: 4px;">
                      ${
                        isCOD
                          ? `<span style="color: #B45309;">Cash on Delivery (COD)</span>`
                          : `<span style="color: #047857;">Prepaid Online (Verified)</span>`
                      }
                    </div>
                    <div style="font-size: 11px; color: #6B6661; margin-top: 2px;">
                      Status: ${isCOD ? "Pay on delivery" : "Payment Confirmed"}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Items Table -->
          <tr>
            <td style="padding: 10px 32px 20px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 2px solid #C5A869;">
                    <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 700; color: #9A7D3E; text-transform: uppercase;">
                      Item Description
                    </th>
                    <th style="padding: 10px 12px; text-align: center; font-size: 11px; font-weight: 700; color: #9A7D3E; text-transform: uppercase;">
                      Qty
                    </th>
                    <th style="padding: 10px 12px; text-align: right; font-size: 11px; font-weight: 700; color: #9A7D3E; text-transform: uppercase;">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>

              <!-- Pricing Totals -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 14px;">
                <tr>
                  <td align="right" style="padding: 4px 12px; font-size: 12px; color: #6B6661;">Pan-India Insured Express Delivery:</td>
                  <td width="90" align="right" style="padding: 4px 12px; font-size: 12px; font-weight: bold; color: #047857;">FREE</td>
                </tr>
                <tr>
                  <td align="right" style="padding: 4px 12px; font-size: 12px; color: #6B6661;">Royal Velvet Hardcase Box & Capsule:</td>
                  <td width="90" align="right" style="padding: 4px 12px; font-size: 12px; font-weight: bold; color: #047857;">INCLUDED</td>
                </tr>
                <tr>
                  <td align="right" style="padding: 12px 12px 6px 12px; font-family: Georgia, serif; font-size: 16px; font-weight: bold; color: #1A1817; border-top: 1px solid #EAE4D9;">
                    Total Payable Amount:
                  </td>
                  <td width="100" align="right" style="padding: 12px 12px 6px 12px; font-family: 'Courier New', monospace; font-size: 18px; font-weight: 800; color: #4A0D17; border-top: 1px solid #EAE4D9;">
                    ₹${data.amount.toLocaleString("en-IN")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address & Gift Message -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; border: 1px solid #EAE4D9; border-radius: 14px; padding: 18px;">
                <tr>
                  <td>
                    <span style="font-size: 11px; color: #9A7D3E; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Delivery Address</span>
                    <div style="font-size: 14px; font-weight: 700; color: #1A1817; margin-top: 4px;">
                      ${data.customerName}
                    </div>
                    <div style="font-size: 12px; color: #4A4540; line-height: 1.5; margin-top: 4px;">
                      ${data.shippingAddress}
                    </div>
                    ${
                      data.customerPhone
                        ? `<div style="font-size: 12px; color: #6B6661; margin-top: 4px;">Contact: +91 ${data.customerPhone}</div>`
                        : ""
                    }
                    ${
                      data.giftMessage
                        ? `
                        <div style="margin-top: 12px; padding: 10px 12px; background-color: #FFFDF9; border-left: 3px solid #C5A869; border-radius: 6px; font-size: 12px; font-style: italic; color: #4A0D17;">
                          <strong>Gift Greeting Note:</strong> "${data.giftMessage}"
                        </div>
                      `
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Direct CTAs (Track Order & WhatsApp) -->
          <tr>
            <td style="padding: 0 32px 30px 32px; text-align: center;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${trackingUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #4A0D17 0%, #32080F 100%); color: #DFC278; font-family: -apple-system, sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 12px; border: 1px solid #C5A869; box-shadow: 0 4px 12px rgba(74, 13, 23, 0.2); margin: 6px;">
                      📍 Track Live Delivery Status
                    </a>
                    <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-family: -apple-system, sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; padding: 14px 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25); margin: 6px;">
                      💬 Help on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Security & Packaging Guarantees -->
          <tr>
            <td style="background-color: #FCFBF9; padding: 20px 32px; border-top: 1px solid #EAE4D9; text-align: center;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="33%" align="center" style="font-size: 11px; color: #6B6661; line-height: 1.4;">
                    🛡️ <strong>Insured Transit</strong><br>BlueDart & Delhivery
                  </td>
                  <td width="33%" align="center" style="font-size: 11px; color: #6B6661; line-height: 1.4;">
                    🎁 <strong>Velvet Box</strong><br>Ready for Gifting
                  </td>
                  <td width="33%" align="center" style="font-size: 11px; color: #6B6661; line-height: 1.4;">
                    ⚡ <strong>Fast Dispatch</strong><br>Dispatched in 24 Hrs
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF8F5; padding: 24px 32px; text-align: center; border-top: 1px solid #EAE4D9; font-size: 11px; color: #8C827A;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #4A0D17;">
                ShubhCoins — Gift Happiness, Gift Prosperity
              </p>
              <p style="margin: 0 0 6px 0;">
                Support Hotline: +91 74885 74616 (10 AM - 8 PM IST) | Email: support@shubhcoins.in
              </p>
              <p style="margin: 0; font-size: 10px; color: #A89E94;">
                This is an automated order confirmation email sent via Brevo SMTP.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

/**
 * Plain text fallback version for maximum deliverability
 */
function generateOrderConfirmationText(data: OrderEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shubhcoins.in";
  const itemsText = data.items
    .map(
      (item) =>
        `- ${item.name} (${item.finish || "standard"}) x ${item.quantity} = ₹${(
          item.price * item.quantity
        ).toLocaleString("en-IN")}`
    )
    .join("\n");

  return `
SHUBHCOINS - ORDER CONFIRMATION
===========================================
Namaste ${data.customerName}!

Thank you for your order with ShubhCoins. Your sacred order for Goddess Lakshmi decorative keepsake coins has been successfully confirmed.

ORDER DETAILS:
-------------------------------------------
Order ID: #${data.orderId}
Payment Method: ${data.paymentMethod}
Total Amount: ₹${data.amount.toLocaleString("en-IN")}
Status: Confirmed

ITEMS ORDERED:
-------------------------------------------
${itemsText}

SHIPPING ADDRESS:
-------------------------------------------
${data.customerName}
${data.shippingAddress}
${data.customerPhone ? `Phone: +91 ${data.customerPhone}` : ""}
${data.giftMessage ? `Gift Note: "${data.giftMessage}"` : ""}

TRACK YOUR ORDER:
-------------------------------------------
Track live delivery status at:
${baseUrl}/track-order?orderId=${encodeURIComponent(data.orderId)}

NEED HELP?
-------------------------------------------
WhatsApp Support: +91 74885 74616
Email: support@shubhcoins.in

Warm regards,
Team ShubhCoins
Gift Happiness, Gift Prosperity
  `;
}

/**
 * Send order confirmation email via Brevo SMTP
 */
export async function sendOrderConfirmationEmail(
  data: OrderEmailData
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!data.customerEmail || !data.customerEmail.includes("@")) {
      console.warn("Skipping email send: Invalid customer email:", data.customerEmail);
      return { success: false, error: "Invalid customer email address" };
    }

    const transporter = getTransporter();
    const fromAddress =
      process.env.SMTP_FROM || '"ShubhCoins" <abhishek1973kr@gmail.com>';

    const info = await transporter.sendMail({
      from: fromAddress,
      to: data.customerEmail,
      subject: `✨ Order Confirmed #${data.orderId} - ShubhCoins`,
      text: generateOrderConfirmationText(data),
      html: generateOrderConfirmationHTML(data),
    });

    console.log("Order confirmation email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Failed to send order confirmation email via Brevo:", error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}
