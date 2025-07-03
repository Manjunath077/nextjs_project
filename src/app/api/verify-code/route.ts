import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request) {
    await dbConnect();

    try {

        const {userName,code} = await request.json()
        
        const user = await UserModel.findOne({
            userName:userName
        })

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{
                status:401
            })
        }

        const isCodeValid = user.verifyCode === code
        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeExpired){
            user.isVerified = true
            await user.save();
            return Response.json({
                success:true,
                message:"Account verified successfully"
            },{
                status:200
            })
        }else if(!isCodeExpired){
            return Response.json({
                success:false,
                message:"Verification code has expired please up again to get a new code"
            },{
                status:400
            })
        }else{
            return Response.json({
                success:false,
                message:"Incorrect verification code"
            },{
                status:400
            })
        }

        
    } catch (error) {
        console.error("Error verifying user",error)
        return Response.json({
            success:false,
            message:"Error Verifying user"
        },{
            status:500
        })
    }
}