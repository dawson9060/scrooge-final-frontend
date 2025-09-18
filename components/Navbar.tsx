import { Text } from "@mantine/core";
import Link from "next/link";
import classes from "./Navbar.module.css";
import NavbarClient from "./NavbarClient";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERY_USER } from "@/data/queryKeys";
import { fetchUserServer } from "@/utilities/fetchUserServer";

const Navbar = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [QUERY_USER],
    queryFn: fetchUserServer,
  });

  return (
    <nav className={classes.nav}>
      <Link href="/">
        <Text>Site Name</Text>
      </Link>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarClient />
      </HydrationBoundary>
    </nav>
  );
};

export default Navbar;
