const paragraph = document.getElementById("message");
const copyButton = document.getElementById("copyButton");
const copyStatus = document.getElementById("copyStatus");

let currentCode = "";

function getCentralTimeString() {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).formatToParts(new Date());

    const values = {};

    for (const part of parts) {
        values[part.type] = part.value;
    }

    return `${values.month}/${values.day}/${values.year} ${values.hour}:${values.minute}`;
}

async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        copyStatus.textContent = "Copied!";
    } catch (err) {
        copyStatus.textContent = "Could not copy automatically. Tap the button or copy manually.";
        console.error("Clipboard copy failed:", err);
    }
}

async function main() {
    const timeString = getCentralTimeString();
    const hash = await sha256(timeString);

    currentCode = hash;
    paragraph.textContent = currentCode;
}

copyButton.addEventListener("click", async () => {
    await copyToClipboard(currentCode);
});

main();