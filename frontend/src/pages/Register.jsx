import styled from "styled-components";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { authApiCall } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  user && history.push("/");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch(null);

  const inputValues = [
    { value: name, setValue: setName, placeholder: "name" },
    {
      value: lastName,
      setValue: setLastName,
      placeholder: "last name",
    },
    {
      value: username,
      setValue: setUsername,
      placeholder: "username",
    },
    {
      value: email,
      setValue: setEmail,
      placeholder: "email",
      type: "email",
    },
    {
      value: password,
      setValue: setPassword,
      placeholder: "password",
      type: "password",
    },
    {
      value: confirmPassword,
      setValue: setConfirmPassword,
      placeholder: "confirm password",
      type: "password",
    },
  ];

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await authApiCall(
      dispatch,
      {
        name,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      },
      "register"
    );
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {inputValues.map(({ setValue, ...item }) => (
            <Input
              {...item}
              onChange={(e) => setValue(e.target.value)}
            />
          ))}
          <Agreement>
            By creating an account, I consent to the processing of
            my personal data in accordance with the{" "}
            <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleCreateUser}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
