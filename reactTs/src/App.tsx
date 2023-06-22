import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { RootState, increase } from './index';
import { Dispatch } from 'redux';


// JSX 도 변수로 담아 사용 가능
let box :JSX.Element = <div></div>;

function App() {
  // useState 타입 지정
  let [user, setUser] = useState<string | number>('kim');

  const testCount = useSelector( (state :RootState) => state );
  const dispatch :Dispatch = useDispatch();

  return (
    <div className="App">
      <h4>Hello</h4>
      <Profile name="CheolSu" age="20"></Profile>
      {/* ${testCount.count} */}
      {testCount.counter1.user}
      {/* <button onClick={ ()=> { dispatch({type : '증가'})} }>button</button> */}
      <button onClick={ ()=> { dispatch(increase())} }>button</button>
    </div>
  );
}

// component 만들 때 타입 지정 가능
// component props 타입 지정 가능
function Profile(props :{name :string, age: string}) :JSX.Element {
  return (
    <div>${props.name}'s Profile</div>
  )
};

export default App;
