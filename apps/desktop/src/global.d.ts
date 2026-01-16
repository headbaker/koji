export {}

declare global {
  interface Window {
    api: {
      app: {
        ping: () => Promise<string>
        onMainProcessMessage: (callback: (message: string) => void) => void
      }
      recipes: {
        getAll: () => Promise<unknown[]>
      }
    }
  }
}
