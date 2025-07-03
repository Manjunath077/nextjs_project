import { DefaultSession, Session } from './../../node_modules/next-auth/core/types.d';
import { User } from './../model/User';
import "next-auth"


declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        username?: string;
    }

    interface Session {
        user: {
            _id?: string;
            username?: string;
            isVerified?: boolean;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        username?: string;
        isVerified?: boolean;
    }
}