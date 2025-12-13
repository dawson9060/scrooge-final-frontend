"use client";

import { STATUS_OK } from "@/enums/status-enums";
import { useAuth } from "@/hooks/auth";
import useToast from "@/hooks/toast";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbSun } from "react-icons/tb";

import classes from "./Navbar.module.css";

const NavbarClient = () => {
  const { user, logout } = useAuth();

  const router = useRouter();

  const { showToast } = useToast();

  const handleLogout = async () => {
    const response = await logout();

    if (response.status === STATUS_OK) {
      showToast({ message: "Logout successful", color: "green" });

      router.push("/");
    } else {
      showToast({ message: "Logout failed", color: "red" });
    }
  };

  return (
    <Group w="100%">
      <Box className={classes.container}>
        <Link
          href="/dashboard"
          style={{
            fontSize: "2rem",
            textDecoration: "none",
            color: "var(--mantine-color-gold-5)",
            fontWeight: "700",
          }}
        >
          Scrooge
        </Link>
        {user ? (
          <>
            <Group className={classes.links}>
              <ActionIcon size="sm" variant="transparent">
                <TbSun />
              </ActionIcon>
              <Text variant="link">Settings</Text>
              <Text variant="link" onClick={handleLogout}>
                Logout
              </Text>
            </Group>
          </>
        ) : (
          <Link href="/auth">Login / Register</Link>
        )}
      </Box>
    </Group>
  );
};

export default NavbarClient;
