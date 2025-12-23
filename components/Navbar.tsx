import { QUERY_USER } from "@/data/queryKeys";
import { fetchUserServer } from "@/utilities/fetchUserServer";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import classes from "./Navbar.module.css";
import NavbarClient from "./NavbarClient";

const Navbar = () => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [QUERY_USER],
    queryFn: fetchUserServer,
  });

  return (
    <nav className={classes.nav}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarClient />
      </HydrationBoundary>
    </nav>
  );
};

export default Navbar;
