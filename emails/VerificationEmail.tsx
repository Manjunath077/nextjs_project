import * as React from 'react';

interface EmailTemplateProps {
    username: string;
    verifyCode: string;
}

export default function VerificationEmail({ username, verifyCode }: EmailTemplateProps) {
    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                maxWidth: '600px',
                margin: '0 auto',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <h2 style={{ color: '#333' }}>Hello, {username}!</h2>
            <p style={{ fontSize: '16px', color: '#555' }}>
                Thank you for signing in. Use the one-time password (OTP) below to complete your login:
            </p>
            <div
                style={{
                    margin: '20px 0',
                    padding: '15px',
                    backgroundColor: '#ffffff',
                    border: '1px dashed #333',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    letterSpacing: '4px',
                    color: '#2c3e50',
                }}
            >
                {verifyCode}
            </div>
            <p style={{ fontSize: '14px', color: '#888' }}>
                This OTP is valid for the next 10 minutes. Please do not share it with anyone.
            </p>
            <p style={{ fontSize: '14px', color: '#888' }}>
                If you didn't request this, please ignore this email.
            </p>
            <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #ddd' }} />
            <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
        </div>
    );
}
