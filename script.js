const paragraph = document.getElementById("message");

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

paragraph.textContent = getCentralTimeString();