export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
  }

  subscribeComponents(components) {
    this.sub = this.store.subscribe((state) => {});
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
