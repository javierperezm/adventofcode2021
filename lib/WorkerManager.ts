interface IProcess {
  (data: any): void
}

export default class WorkerManager {
  private worker: Worker
  private actions: { [key: string]: IProcess } = {}

  constructor(filename: string) {
    this.worker = new Worker(filename)
    this.worker.onmessage = (message) => {
      const process: IProcess = this.actions[message.data.action]
      if (process) process(message.data)
    }
  }

  post(data: any, onMessage: IProcess) {
    this.registerAction(data.action, onMessage)
    this.worker.postMessage(data)
  }

  terminate() {
    this.worker.terminate()
  }

  private registerAction = (action: string, process: IProcess) => {
    this.actions[action] = process
  }
}
