import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const { userName, email, password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            userName,
            isVerified: true
        })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "User name is already taken"
            }, {
                status: 400
            })
        }

        const existingUserByEmail = await UserModel.findOne({ email })

        const verifyCode = Math.floor(100000 + Math.random() * 9000000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                },
                    {
                        status: 400
                    }
                )
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                userName,
                email,
                password: hashedPassword,
                verifyCodeExpiry: expiryDate,
                verifyCode,
                isVerified: false,
            })
            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, userName, verifyCode)

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 500
            })
        }

        return Response.json({
            success: true,
            message: "User Registered Successfully, Please verify your email"
        }, {
            status: 201
        })

    } catch (error) {
        console.error("Error Registering the user", error)
        return Response.json({
            success: false,
            message: "Error Registering the user"
        },
            {
                status: 500
            }
        )
    }

}