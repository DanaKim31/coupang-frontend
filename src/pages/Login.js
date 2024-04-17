import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { asyncLogin } from "../store/user";
import { useDispatch, useSelector } from "react-redux"; // useSelector : state 값 가져오기
import { Navigate, useNavigate } from "react-router-dom"; // 로그인 성공 후 바로 메인으로 이동하기 위해 필요

const H1 = styled.h1`
  font-size: 3rem;
  margin-top: 30px;
`;

const Login = () => {
  const [user, setUser] = useState({ id: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const info = useSelector((state) => {
  //     return state.user;
  //   });

  const submit = () => {
    dispatch(asyncLogin(user)); // dispatch : redux에 있는 액션함수 실행하기 위해 쓰임
    navigate("/"); // 새로고침과 같음
  };

  return (
    <Container>
      <H1>로그인</H1>
      <Form.Control
        type="text"
        placeholder="아이디"
        style={{ marginBottom: "10px" }}
        value={user.id}
        onChange={(e) => setUser((prev) => ({ ...prev, id: e.target.value }))}
      />
      <Form.Control
        type="password"
        placeholder="비밀번호"
        value={user.password}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        variant="dark"
        style={{ width: "100%", marginBottom: "10px" }}
        onClick={submit}
      >
        로그인
      </Button>
    </Container>
  );
};

export default Login;
