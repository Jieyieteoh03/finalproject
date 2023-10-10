import {
  Container,
  Title,
  Button,
  Space,
  TextInput,
  Card,
  PasswordInput,
} from "@mantine/core";
import { BsArrowRightCircle } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { notifications } from "@mantine/notifications";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["currentUser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      //store user data into cookies
      setCookie("currentUser", user, {
        maxAge: 60 * 60 * 24 * 30, //will logout after 30 days (seconds, mins, hrs, days)
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleSubmit = () => {
    let error = false;
    // make sure email & password are not empty.
    if (!email || !password) {
      error = "Please fill out all the required fields.";
    }

    if (error) {
      // if empty show error message
      notifications.show({
        title: error,
        color: "red",
      });
    } else {
      // make api call
      loginMutation.mutate(
        JSON.stringify({
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <Container>
      <Space h="50px" />
      <Card
        withBorder
        shadow="xl"
        mx="auto"
        mt="100px"
        sx={{
          maxWidth: "500px",
        }}
        radius="20px"
      >
        <Space h="20px" />
        <Title align="center">Login</Title>
        <Space h="40px" />
        <TextInput
          label="Email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Space h="30px" />
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Space h="30px" />
        <Button fullWidth onClick={handleSubmit}>
          Login
        </Button>
        <Space h="30px" />
        <Button
          component={Link}
          to="/signup"
          fullWidth
          rightIcon={<BsArrowRightCircle />}
          variant="subtle"
        >
          Don't have an account? Sign up for free!
        </Button>
      </Card>
    </Container>
  );
}
