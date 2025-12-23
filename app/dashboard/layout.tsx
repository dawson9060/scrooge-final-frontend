import Navbar from "@/components/Navbar";
import { Stack } from "@mantine/core";

export default function DasbboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack px="2rem" gap="0">
      <Navbar />
      {children}
    </Stack>
  );
}
