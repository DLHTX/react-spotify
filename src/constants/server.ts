const LOCAL_ORIGIN = 'http://localhost'
const REMOTE_ORIGIN = 'http://192.168.50.200:3001'

export const PORT = 8080

export const SERVER = false ? `${LOCAL_ORIGIN}:${PORT}/api` : `${REMOTE_ORIGIN}`
