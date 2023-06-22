import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

export default function Main() {
    const movePage = useNavigate();

    useEffect(() => {
      console.log("페이지 로드 후 refresh 함수 호출");
      refresh();
    });

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

          const expireTime = expireAt - new Date().getTime();

          setTimeout(refresh, expireTime - 60000);
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
            
        </>
    );
}