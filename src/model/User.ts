import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    userName: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email']
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        userName: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true
        },
        verifyCode: {
            type: String,
            required: [true, "Verify code is required"]
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verify code is required"]
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)


const UserModel =
// check if the user model exists or not 
    (
        // if user model exist then simply return it 
        mongoose.models.User as mongoose.Model<User>
    ) || (
        // else create a new user model and return it 
        mongoose.model<User>('User', UserSchema)
    )

export default UserModel;