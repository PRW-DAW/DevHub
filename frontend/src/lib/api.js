const BASE_URL = 'http://api.devhub.com'

export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    })

    if (!res.ok) {
        const error = await res.json()
        throw error
    }

    return res.json()
}
