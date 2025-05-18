
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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: EmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Marathon Registration <onboarding@resend.dev>",
      to: [email],
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
    });

    console.log("Verification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-verification-email function:", error);
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
