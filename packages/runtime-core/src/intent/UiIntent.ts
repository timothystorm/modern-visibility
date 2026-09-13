export class UiIntent {
  private readonly _subscribers: Array<(intent: string) => void> = []

  subscribe(callback: (intent: string) => void): void {
    this._subscribers.push(callback)
  }

  publish(intent: string): void {
    this._subscribers.forEach(callback => callback(intent))
  }
}