export enum CounterTypeKeys {
  INCREMENT_COUNTER = 'INCREMENT_COUNTER',
  DECREMENT_COUNTER = 'DECREMENT_COUNTER',
  INCREMENT_BY_FIVE = 'INCREMENT_BY_FIVE'
}

interface IncrementAction {
  type: CounterTypeKeys.INCREMENT_COUNTER;
}

interface DecrementAction {
  type: CounterTypeKeys.DECREMENT_COUNTER;
}

interface IncrementByFive {
  type: CounterTypeKeys.INCREMENT_BY_FIVE;
}

export type CounterTypes = IncrementAction | DecrementAction | IncrementByFive;

export function increment() {
  return {
    type: CounterTypeKeys.INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: CounterTypeKeys.DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export function incrementByFive() {
  console.log('Increment By 5 Action');
  return {
    type: CounterTypeKeys.INCREMENT_BY_FIVE
  };
}

export default {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
  incrementByFive
};
