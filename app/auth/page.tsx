"use client";

import { STATUS_OK } from "@/Enums/status-enums";
import { useAuth } from "@/hooks/auth";
import useToast from "@/hooks/toast";
import {
  Box,
  Button,
  Center,
  Divider,
  Input,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = ({ setIsLogin }: { setIsLogin: Function }) => {
  const { login } = useAuth();

  const router = useRouter();

  const { showToast, clearToasts } = useToast();

  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    // validate: {
    //   email: (value) => (value.includes("@") ? null : "Invalid email"),
    // },
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
    <Stack>
      <form onSubmit={loginForm.onSubmit(handleLogin)}>
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
        <Stack mt="1rem">
          <Button type="submit">Login</Button>
          <Link href="#" onClick={() => setIsLogin(false)}>
            Don't have an account? Register here
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

const RegistrationForm = ({ setIsLogin }: { setIsLogin: Function }) => {
  const { register } = useAuth();

  const { showToast } = useToast();

  const registrationForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: (value) =>
        value.length > 0 ? null : "First name is required",
      lastName: (value) => (value.length > 0 ? null : "Last name is required"),
      city: (value) => (value.length > 0 ? null : "City is required"),
      state: (value) => (value.length > 0 ? null : "State is required"),
      zip: (value) =>
        value.length !== 5 ? null : "5 Digit Zip Code is required",
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
    } catch (err) {
      showToast({ message: "Failed to Register", color: "red" });
    }
  };

  return (
    <Stack>
      <form onSubmit={registrationForm.onSubmit(handleRegistration)}>
        <TextInput
          required
          label="Name"
          placeholder="First Name"
          key={registrationForm.key("firstName")}
          {...registrationForm.getInputProps("firstName")}
        />
        <TextInput
          required
          label="Last Name"
          placeholder="Last Name"
          key={registrationForm.key("lastName")}
          {...registrationForm.getInputProps("lastName")}
        />
        <TextInput
          required
          label="City"
          placeholder="City"
          key={registrationForm.key("city")}
          {...registrationForm.getInputProps("city")}
        />
        <TextInput
          withAsterisk
          label="State"
          placeholder="State"
          key={registrationForm.key("state")}
          {...registrationForm.getInputProps("state")}
        />
        <NumberInput
          withAsterisk
          label="Zip Code"
          placeholder="Zip Code"
          key={registrationForm.key("zip")}
          {...registrationForm.getInputProps("zip")}
        />
        <TextInput
          label="Optional - Phone"
          placeholder="Phone"
          key={registrationForm.key("phone")}
          {...registrationForm.getInputProps("phone")}
        />
        <Divider />
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
        <Stack mt="1rem">
          <Button type="submit">Register</Button>
          <Link href="#" onClick={() => setIsLogin(true)}>
            Already have an account? Go to login
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box w="100vw" h="100vh">
      <Center h="100%">
        <Stack>
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
