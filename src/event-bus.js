let handlerRegistry = Object.create(null);

let EventBus = {
    $emit(event, ...args) {
        let handlers = handlerRegistry[event];
        if (handlers) {
            handlers.forEach(handler => handler(...args));
        }
    },

    $on(event, handler) {
        let handlers = handlerRegistry[event];
        if (!handlers) {
            handlers = [];
            handlerRegistry[event] = handlers;
        }
        handlers.push(handler);
    },

    $off(event, handler) {
        let handlers = handlerRegistry[event];
        if (handlers) {
            let index = handlers.indexOf(handler);
            if (index >= 0) {
                handlers.splice(index, 1);
                if (!handlers.length) {
                    delete handlerRegistry[event];
                }
            }
        }
    }
};

export default EventBus;
