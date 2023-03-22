export async function revokeApiKey({keyId}: {keyId: string}){
    const res = await fetch('/api/api-key/revoke', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({keyId})
    })

    // Receive data back as error or not
    const data = (await res.json()) as {error?: string}
    if(data.error) {
        throw new Error(data.error)
    }
}