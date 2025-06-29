import { resend } from "@/lib/resend";
import { ApiResponseDto } from "@/types/apiResponse";
import VerificationEmail from "../../emails/VerificationEmail";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponseDto> {
    try {

        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Next js Project | Verification Code',
            react: VerificationEmail({ username, verifyCode }),
        });

        console.error("Verification email sent successfully")
        return { success: true, message: "Verification email sent successfully" }

    } catch (error) {
        console.error("Unable to send the verification email", error)
        return { success: false, message: "Failed to send verification email " }
    }
}