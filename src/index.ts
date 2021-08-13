
export function createStore<T>(initState:T, reducer:(s:T, action:any) => T) {
    let state = initState;
    let listeners:(() => void)[] = [];

    function subscribe(listener:(() => void)) {
        if (typeof listener == 'function') {
            listeners.push(listener);
        }
    }

    function dispatch(action:() => any) {
        state = reducer(state, action());
        listeners.forEach(fnc => fnc());
    }

    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState,
    }
}

