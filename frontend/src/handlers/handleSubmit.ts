import React from 'react';

export async function handleSubmitUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    console.log(password)

    try {
        await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        });
    } catch (err) {
        console.error(err);
    }
};