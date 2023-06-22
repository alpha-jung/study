import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Input() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const movePage = useNavigate();

    const changeUserIdHandler = (e) => {
        setUserId(e.target.value);
    };

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const goMain = () => {
      movePage("/main");
    };

    /*const login = () => {
        fetch("http://localhost:7080/szs/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({
            'userId': userId,
            'password': password
          })
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
        })
      };*/

      const login = () => {
          axios.post("http://localhost:7080/szs/login",
          {
            userId: userId,
            password: password
          },
          {
            withCredentials: true
          }
          ).then(function(res) {
          console.log(res);
          console.log(res.data.accessToken);
          console.log(res.data.expireAt);

          const accessToken = res.data.accessToken;
          const expireAt = res.data.expireAt;

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          axios.defaults.headers.common['expireAt'] = expireAt;
        }).catch(function(err) {
          console.log(err);
        });
      }

      const refresh = () => {
        axios.post("http://localhost:7080/szs/refresh", 
        {},
        {
          withCredentials: true
        }).then(function(res) {
          console.log(res);
          console.log(res.data.accessToken);
          console.log(res.data.expireAt);

          const accessToken = res.data.accessToken;
          const expireAt = res.data.expireAt;

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          axios.defaults.headers.common['expireAt'] = expireAt;
        }).catch(function(err) {
          console.log(err);
        });
      }

    const me = () => {
      axios.get("http://localhost:7080/szs/me",
      {
        params: {},
        withCredentials: true
    }).then(function(res) {
      console.log(res);
    }).catch(function(err) {
      console.log(err);
    });
  }

    return (
        <>
            ID : <input type="text" value={userId} onChange={changeUserIdHandler} />
            <br />
            비밀번호 : <input type="text" value={password} onChange={changePasswordHandler} />
            <br />
            <button onClick={ login }>로그인</button>
            <button onClick={ refresh }>재로그인</button>
            <button onClick={ me }>내 정보</button>
            <button onClick={ goMain }>메인페이지 이동</button>
        </>
    );
}