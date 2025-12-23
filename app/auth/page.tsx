"use client";

import { STATUS_OK } from "@/enums/status-enums";
import { useAuth } from "@/hooks/auth";
import useToast from "@/hooks/toast";
import {
  Box,
  Button,
  Center,
  Divider,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = ({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) => {
  const { login } = useAuth();

  const router = useRouter();

  const { showToast } = useToast();

  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (value.includes("@") ? null : "Invalid email"),
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    const results = await login(values);

    if (results.status === STATUS_OK) {
      showToast({ message: "Login successful", color: "green" });

      router.push("/dashboard");
    } else {
      showToast({ message: "Invalid Credentials", color: "red" });
    }
  };

  return (
    <form onSubmit={loginForm.onSubmit(handleLogin)}>
      <Stack gap="1rem">
        <Stack gap="0.5rem">
          <Title c="gold.5" order={1}>
            Scrooge
          </Title>
          <Text>Come to track your expenses, stay to feel bad about them</Text>
        </Stack>
        <Divider />
        <Stack gap="0.5rem">
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Email"
            key={loginForm.key("email")}
            {...loginForm.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            type="password"
            label="Password"
            placeholder="Password"
            key={loginForm.key("password")}
            {...loginForm.getInputProps("password")}
          />
        </Stack>
        <Stack mt="1rem" gap="1rem">
          <Button type="submit" fz="1rem">
            Login
          </Button>
          <Text
            ta="center"
            c="blue.9"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(false)}
          >
            Don&apos;t have an account? Register here
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};

const RegistrationForm = ({
  setIsLogin,
}: {
  setIsLogin: (value: boolean) => void;
}) => {
  const { register } = useAuth();

  const { showToast } = useToast();

  const registrationForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 8
          ? null
          : "Password must be at least 8 characters long",
      password_confirmation: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleRegistration = async (values: RegistrationFormValues) => {
    try {
      const res = await register(values);

      if (res.data.status === 200) {
        showToast({ message: "Registration Successful", color: "green" });

        setIsLogin(true);
      } else {
        // Handle login error
        showToast({ message: "Error Registering", color: "red" });
      }
    } catch {
      showToast({ message: "Failed to Register", color: "red" });
    }
  };

  return (
    <form onSubmit={registrationForm.onSubmit(handleRegistration)}>
      <Stack gap="1rem">
        <Stack gap="0.5rem">
          <Title c="gold.5" order={1}>
            Scrooge
          </Title>
          <Text>Come to track your expenses, stay to feel bad about them</Text>
        </Stack>
        <Divider />
        <Stack gap="0.5rem">
          <TextInput
            label="Optional - Name"
            placeholder="Name"
            key={registrationForm.key("name")}
            {...registrationForm.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Email"
            key={registrationForm.key("email")}
            {...registrationForm.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            type="password"
            label="Password"
            placeholder="Password"
            key={registrationForm.key("password")}
            {...registrationForm.getInputProps("password")}
          />
          <TextInput
            withAsterisk
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            key={registrationForm.key("password_confirmation")}
            {...registrationForm.getInputProps("password_confirmation")}
          />
        </Stack>
        <Stack mt="1rem" gap="1rem">
          <Button type="submit" fz="1rem">
            Login
          </Button>
          <Text
            ta="center"
            c="blue.9"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(true)}
          >
            Already have an account? Login here
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box w="100%" h="100vh" bg="ghostwhite">
      <Center h="100%">
        <Stack
          bg="white"
          p="1.5rem"
          bdrs="sm"
          maw="80vw"
          style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            <RegistrationForm setIsLogin={setIsLogin} />
          )}
        </Stack>
      </Center>
    </Box>
  );
};

export default AuthPage;
