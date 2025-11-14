import {compare} from "bcryptjs";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode('hello'); 

async function createJWT(): Promise<string> {
    const jwt = await new SignJWT({sessionId: crypto.randomUUID() })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secret)

    return jwt;
}

const secretHash: string = "$2a$12$IPvf5KzIVufRNoRT0bWfy.lxpMKzwRtou24TvW5L4XtxprB/vk3rO";

export const handler = async (event: any) => {
  try {
    console.log("lambda called")
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Request body is required" }),
      };
    }

    const jsonBody = JSON.parse(event.body);
    const password = jsonBody?.password;

    if (!password || !(typeof password === "string")) {
       return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Password Required" }),
      };

    }
    console.log("password", password);
    
    const ok = await compare(password, secretHash);
    console.log("ok", ok);
    
    if (ok) {
      const token = await createJWT();

      // Create an HTTP-only cookie header
      const cookieHeader = [
        `jwt=${encodeURIComponent(token)}`,
        "HttpOnly",
        "Path=/",
        "SameSite=Strict",
        "Secure", 
        "Max-Age=7200", // 2 hours
      ].join("; ");

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieHeader,
        },
        body: JSON.stringify({ message: "Login successful" }),
      };
    } else {
      return {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid password" }),
      };
    }
  } catch (err: any) {
    console.error("Error unlocking session:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};