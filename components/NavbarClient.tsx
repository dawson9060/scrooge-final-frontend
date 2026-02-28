"use client";

import { useAuth } from "@/hooks/auth";
import { ActionIcon, Box, Group, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { TbMoon, TbSun } from "react-icons/tb";
import classes from "./Navbar.module.css";

const NavbarClient = () => {
  const { user } = useAuth();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === "dark";

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
              <ActionIcon
                size="sm"
                variant="transparent"
                onClick={() => toggleColorScheme()}
              >
                {isDarkMode ? (
                  <TbSun size="1.25rem" />
                ) : (
                  <TbMoon size="1.25rem" />
                )}
              </ActionIcon>
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
