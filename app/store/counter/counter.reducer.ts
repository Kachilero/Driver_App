import { CounterTypeKeys, CounterTypes } from './counter.actions';

export default function counter(state: number = 0, action: CounterTypes) {
  switch (action.type) {
    case CounterTypeKeys.INCREMENT_COUNTER:
      return state + 1;
    case CounterTypeKeys.DECREMENT_COUNTER:
      return state - 1;
    case CounterTypeKeys.INCREMENT_BY_FIVE:
      console.log(`Increment Reducer`);
      return state + 5;
    default:
      return state;
  }
}
