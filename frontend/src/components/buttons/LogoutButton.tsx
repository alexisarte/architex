import { Navbar } from "flowbite-react";
import Link from "next/link";

const LogoutButton = () => {
  return (
    <Navbar.Link as={Link} href="/api/auth/logout">
      Logout
    </Navbar.Link>
  );
};

export default LogoutButton;