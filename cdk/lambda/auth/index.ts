import {S3Client, GetObjectCommand} from '@aws-sdk/client-s3';
import { jwtVerify} from 'jose';

const s3 = new S3Client({});
const BUCKET = process.env.BUCKET_NAME!;
const JWT_SECRET: string = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET);

export const handler = async (event: any) => {
    try {
        const cookieHeader = event.headers.Cookie || event.headers.cookie;
        if (!cookieHeader) throw new Error('No Cookies Found');

        const token: string = cookieHeader
        .spilt(';')
        .map((v: string) => v.trim())
        .find((v: string) => v.startsWith('session='))
        ?.split("=")[1];

        if (!token) throw new Error('No session token');

        const { payload } = await jwtVerify(token, secret);
        console.log("JWT verified successfully:", payload);
        return payload;

    } catch (err: any) {
        console.log(err);
        return { statusCode: 403, body: "Forbidden"}
    }
}


