import { Observable, type Observer, type Subscriber } from 'rxjs'


class RxObservableMaster<T> {
  observer: Subscriber<T> | null = null
  observable: Observable<T> | null = null
  constructor() {
    this.observable = new Observable((observer) => {
      this.observer = observer
    })
  }

  subscribe(subscribe: Partial<Observer<T>> | ((value: T) => void)) {
    return this.observable?.subscribe(subscribe)
  }

  notifyListener(message: T) {
    this.observer?.next(message)
  }

  remove() {
    this.observable = null
    this.observer = null
  }
}

export default RxObservableMaster