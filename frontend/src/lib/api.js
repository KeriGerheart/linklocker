const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

async function jsonFetch(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options,
    });
    let data = null;
    try {
        data = await res.json();
    } catch {}
    if (!res.ok) {
        const msg = (data && (data.error || data.message)) || "Request failed";
        throw new Error(msg);
    }
    return data;
}

//create locker
export async function createLocker({ title, destinationUrl, password, expirationDays, ownerId }) {
    return jsonFetch(`/api/lockers`, {
        method: "POST",
        body: JSON.stringify({ title, destinationUrl, password, expirationDays, ownerId }),
    });
}

export async function getUserLockers(ownerId) {
    return jsonFetch(`/api/lockers?ownerId=${encodeURIComponent(ownerId)}`);
}

export async function updateLocker(shortCode, updates) {
    return jsonFetch(`/api/lockers/${encodeURIComponent(shortCode)}`, {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}

export async function deleteLocker(shortCode) {
    return jsonFetch(`/api/lockers/${encodeURIComponent(shortCode)}`, { method: "DELETE" });
}

//view locker
export async function getPublicLocker(shortCode) {
    return jsonFetch(`/api/lockers/view/${encodeURIComponent(shortCode)}`);
}

export async function unlockLocker(shortCode, password = "") {
    return jsonFetch(`/api/lockers/view/${encodeURIComponent(shortCode)}/unlock`, {
        method: "POST",
        body: JSON.stringify({ password }),
    });
}
