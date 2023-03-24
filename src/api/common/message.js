export function sendToChatGPT(content) {
    return {
        toUser: {
            ip: 'konb',
            name: 'konb'
        },
        type: 0,
        mode: 1,
        message: content
    }
}