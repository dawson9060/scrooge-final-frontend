"use client";

import { STATUS_OK } from "@/Enums/status-enums";
import { useAuth } from "@/hooks/auth";
import useToast from "@/hooks/toast";
import { Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <Group>
      {user ? (
        <Group>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="#" onClick={handleLogout}>
            Logout
          </Link>
        </Group>
      ) : (
        <Link href="/auth">Login / Register</Link>
      )}
    </Group>
  );
};

export default NavbarClient;
