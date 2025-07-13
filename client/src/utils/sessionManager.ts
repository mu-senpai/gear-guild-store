export class SessionManager {
  private static readonly SESSION_KEY = 'sessionId'

  static getSessionId(): string {
    if (typeof window === 'undefined') return ''
    
    let sessionId = localStorage.getItem(this.SESSION_KEY)
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem(this.SESSION_KEY, sessionId)
    }
    return sessionId
  }

  static clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }
}