
export class EventEmitter {

  protected listenerMap: Map<string, Function[]> = new Map();

  constructor () {

  }

  on (event: string, listener: Function): void {
    const arr: Function[] | undefined = this.listenerMap.get(event);
    if (arr) {
      arr.push(listener);
    } else {
      this.listenerMap.set(event, [listener]);
    }
  }

  off (event: string, listener: Function): void {
    const arr: Function[] | undefined = this.listenerMap.get(event);
    if (arr) {
      for (let i = 0; i < arr.length; ++i) {
        if (arr[i] === listener) {
          arr.splice(i, 1);
          break;
        }
      }
    }
  }

  emit (event: string, ... args: any[]): void {
    const arr: Function[] | undefined = this.listenerMap.get(event);
    if (arr) {
      arr.forEach((listener: Function) => {
        listener(... args);
      })
    }
  }
}