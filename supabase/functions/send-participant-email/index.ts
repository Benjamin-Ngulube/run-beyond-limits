
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("re_NjNTbr5D_4Vpu4f84aYQKbXy5gRmU9fCs"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  name: string;
  email: string;
  emailType: string;
  customData?: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, emailType, customData = {} }: EmailRequest = await req.json();

    // Email templates based on type
    const templates = {
      verification: {
        subject: "Your Marathon Registration is Confirmed!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #3b82f6; margin-top: 40px;">Registration Confirmed!</h1>
            <p>Dear ${name},</p>
            <p>Congratulations! Your registration for the marathon has been verified and confirmed.</p>
            <p>We're excited to have you join us for this amazing event. Here's what you need to know:</p>
            <ul>
              <li>Your registration is now complete</li>
              <li>You'll receive your race packet at the event</li>
              <li>Please arrive 1 hour before your race start time</li>
            </ul>
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
            <p>See you at the starting line!</p>
            <p style="margin-top: 40px;">Best regards,<br>The Marathon Team</p>
          </div>
        `,
      },
      welcome: {
        subject: "Welcome to Color Splash Run 2025!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #ec4899; margin-top: 40px;">Welcome to Color Splash Run 2025!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for registering for the Color Splash Run 2025! We're thrilled to have you join us for this vibrant and fun-filled event.</p>
            <p>Your registration details:</p>
            <ul>
              <li>Package: ${customData.package || 'Standard Package'}</li>
              <li>Distance: ${customData.distance || 'Standard Distance'}</li>
              <li>T-shirt Size: ${customData.tshirtSize || 'TBD'}</li>
            </ul>
            <p>We've received your registration information and payment. Our team will review your submission shortly.</p>
            <p>Keep an eye on your inbox for further updates and event information.</p>
            <p style="margin-top: 40px;">Colorful regards,<br>The Color Splash Run Team</p>
            <p style="font-size: 12px; color: #666; margin-top: 30px;">Contact us at: malaikashevents@gmail.com | +26 0968 608888</p>
          </div>
        `,
      },
      reminder: {
        subject: "Reminder: Color Splash Run is Almost Here!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #ec4899; margin-top: 40px;">Your Color Splash Run is Coming Soon!</h1>
            <p>Dear ${name},</p>
            <p>This is a friendly reminder that the Color Splash Run 2025 is just around the corner!</p>
            <p>Here are some important details to remember:</p>
            <ul>
              <li>Event Date: ${customData.eventDate || '[Event Date]'}</li>
              <li>Check-in Time: ${customData.checkInTime || '[Check-in Time]'}</li>
              <li>Location: ${customData.location || '[Event Location]'}</li>
              <li>What to Bring: ID, comfortable clothing, water bottle</li>
            </ul>
            <p>We're looking forward to seeing you there for a day full of color and fun!</p>
            <p style="margin-top: 40px;">Best regards,<br>The Color Splash Run Team</p>
          </div>
        `,
      }
    };

    // Select the appropriate template
    const template = templates[emailType as keyof typeof templates] || templates.welcome;

    const emailResponse = await resend.emails.send({
      from: "Color Splash Run <onboarding@resend.dev>",
      to: [email],
      subject: template.subject,
      html: template.html,
    });

    console.log(`${emailType} email sent successfully to ${email}:`, emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error(`Error in send-participant-email function:`, error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
