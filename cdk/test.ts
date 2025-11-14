import { compare } from "bcryptjs";
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



const secretHash = "$2a$12$IPvf5KzIVufRNoRT0bWfy.lxpMKzwRtou24TvW5L4XtxprB/vk3rO";

const password = "hello"

try {
    async() => {
        const ok = await compare(password, secretHash)
        console.log(ok)
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
        console.log(cookieHeader);
        }
    } 
}catch (err: any) {
    console.log("error", err)
}