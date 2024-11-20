
/*
 * eventbus helper class, this is a just implementing a container
 * for event listeners and supporting  .off(), .on() syntax
 * for registering and unregistering event handlers
 */

export type EventHandler = (arg: any) => void;

/* internal helper  */
class HandlerArray {
    l = new Array<EventHandler>() 
}

/*
 * Eventbus is a class that helps in emitting and subscribing to events.
 */
export class EventBus {

    static instance = new EventBus()

    static getInstance() {
        return this.instance
    }

    handlers = new Map<string,HandlerArray>()

    clear() {
        this.handlers.clear()
    }

    emit(eventKey: string, arg?: any) {
        const list = this.handlers.get(eventKey)
        if (list) {
            const clone = Array.from(list.l)
            for (const handler of clone) {
                handler(arg)
            }
        }
    }

    on(eventKey: string, eventHandler: EventHandler) {
        let list = this.handlers.get(eventKey)
        if (!list) {
            this.handlers.set(eventKey, list = new HandlerArray())
        }
        if (list.l.indexOf(eventHandler) < 0) {
            list.l.push(eventHandler)
        }
        return this
    }

    off(eventKey: string, eventHandler?: EventHandler) {
        const list = this.handlers.get(eventKey)
        if (list) {
            if (eventHandler) {
                const index = list.l.indexOf(eventHandler)
                if (index >= 0) {
                    list.l.splice(index, 1)
                    if (list.l.length == 0) {
                        this.handlers.delete(eventKey)
                    }
                }
            } else {
                this.handlers.delete(eventKey)
            }
        }
        return this
    }
}

