import {API_ROUTES} from "@/api/routes.ts";
export async function unlock(password: string) {
    try {
        const res = await fetch(API_ROUTES.unlock, {
            method: "POST",
            body: JSON.stringify({password})
        });
        const json = await res.json();
        if (res.ok) {
            return { success: true}
        } else {
            return {success: false, error: json.error || "Failed to unlock"}
        }

    } catch (_error) {
        return {success: false, error: "Network error"}

    }
}