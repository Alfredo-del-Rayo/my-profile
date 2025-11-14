import {JWTPayload, jwtVerify} from 'jose';

const secret = new TextEncoder().encode('hello'); 

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

        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            authenticated: true,
            expiresAt: expiry,
          }),
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