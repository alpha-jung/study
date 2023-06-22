import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initValue :{count :number, user :string} = { count: 0, user : 'kim' };

const counterSlice = createSlice({
  name: 'counter',
  initialState : initValue,
  reducers: {
    increase (state) {
      state.count += 1;
    },
    decrease (state) {
      state.count -= 1;
    },
    increaseRandom(state, action :PayloadAction<number>) {
      state.count += action.payload;
    }
  }
});

let store = configureStore({
  reducer: {
    counter1 : counterSlice.reducer
  }
});

export let { increase, decrease, increaseRandom } = counterSlice.actions;

// function reducer(state = initValue, action :any) {
//   if(action.type === '증가') {
//     return { ...state, count : state.count + 1 };
//   } else if(action.type === '감소') {
//     return { ...state, count : state.count - 1 };
//   } else {
//     return initValue;
//   }
// }

// const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
