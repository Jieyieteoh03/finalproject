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

import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookie, setCookie, removeCookies] = useCookies(["currentUser"]);

  const signupMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      notifications.show({
        title: "Welcome!",
        color: "green",
      });
      setCookie("currentUser", user);
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
    if (!name || !email || !password || !confirmPassword) {
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
      signupMutation.mutate(
        JSON.stringify({
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
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
        mt="10px"
        sx={{
          maxWidth: "500px",
        }}
        radius="20px"
      >
        <Space h="20px" />
        <Title align="center">Signup</Title>
        <Space h="40px" />
        <TextInput
          label="Username"
          placeholder="Enter username"
          onChange={(event) => setName(event.target.value)}
        />
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
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter confirmed password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Space h="30px" />
        <Button onClick={handleSubmit} fullWidth>
          Signup
        </Button>
        <Space h="30px" />
        <Button
          component={Link}
          to="/login"
          fullWidth
          rightIcon={<BsArrowRightCircle />}
          variant="subtle"
        >
          Already have a account? Just login!
        </Button>
      </Card>
    </Container>
  );
}
