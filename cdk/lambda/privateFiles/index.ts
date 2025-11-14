import {JWTPayload, jwtVerify} from 'jose';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const secret = new TextEncoder().encode('hello'); 

const s3 = new S3Client({});
const BUCKET_NAME = process.env.BUCKET_NAME!;

async function verifyJWT(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        console.log("JWT verified successfully:", payload);
        return payload;

    } catch (error) {
        console.log("JWT verification failed:", error);
        return null;
    }
}

export const handler = async (event: any) => {
  try {

    let token: string | null = null;

    if (Array.isArray(event.cookies)) {
      console.log("cookies", event.cookies);
      for (const cookie of event.cookies) {
        const match = cookie.match(/^jwt=([\s\S]+)/);
        if (match) {
          token = decodeURIComponent(match[1]);
          break;
        }
      }
    }

    console.log("token", token);

    if (token) {
      const payload = await verifyJWT(token);
      console.log("payload", payload);
      if (payload) {
        const expiry = payload.exp ? new Date(payload.exp * 1000) : null;
        console.log("expiry", expiry);

        const path = event?.rawPath || "";
        console.log("path", path);
        const filePath = path.split("/files/")[1];
        if (!filePath) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "File path required" }),
        };
        }

        console.log("filepath", filePath);

        const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: filePath });
        const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); 

        return {
            statusCode: 302,
            headers: {
            Location: url
            }
        };
      } else {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            authenticated: false,
            error: "Invalid or expired token",
            expiresAt: null,
          }),
        };
      }
    } else {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authenticated: false,
          error: "No token provided",
          expiresAt: null,
        }),
      };
    }
  } catch (err: any) {
    console.error("Error verifying session:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};