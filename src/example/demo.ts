import { createStore } from '../index';

enum StateActionType {
    pressDown = 'pressDown',
    releaseDown = 'releaseDown',
    pressSpace = 'pressSpace',
    reset = 'reset',
}

enum PlayerState {
    dodge = 'dodge',
    standUp = 'stand up',
    jumping = 'jumping',
    dash = 'dash',
}

function reducer(state:PlayerState, action:StateActionType) : PlayerState {
    switch (action) {
        case StateActionType.pressDown:
            if (state === PlayerState.standUp) {
                return PlayerState.dodge;
            }
            if (state === PlayerState.jumping) {
                return PlayerState.dash;
            }
            return state;
        case StateActionType.pressSpace:
            if (state === PlayerState.standUp) {
                return PlayerState.jumping;
            }
            return state;
        case StateActionType.releaseDown: 
            if (state === PlayerState.dodge) {
                return PlayerState.standUp;
            }
            return state;
        case StateActionType.reset:
            if (state === PlayerState.dash) {
                return PlayerState.standUp;
            }
            return state;
        default:
            return state;
    }
}

function main() {
    let timer = -1;
    const initStata = PlayerState.standUp;
    let store = createStore(initStata, reducer);
    store.subscribe(() => {
        const state = store.getState();
        if (state == PlayerState.dash) {
            if (timer > 0) {
                clearTimeout(timer);
            } else {
                (timer as any) = setTimeout(() => {
                    console.log('reset');
                    store.dispatch(() => StateActionType.reset);
                }, 500);
            }
        }
    });
    store.subscribe(() => {
        const state = store.getState();
        console.log('>>', state);
    });
    console.log('pressDown');
    store.dispatch(() => StateActionType.pressDown);
    console.log('releaseDown');
    store.dispatch(() => StateActionType.releaseDown);
    console.log('pressSpace');
    store.dispatch(() => StateActionType.pressSpace);
    console.log('pressDown');
    store.dispatch(() => StateActionType.pressDown);
}
 
main();