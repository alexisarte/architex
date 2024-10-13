import { Navbar } from "flowbite-react";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Navbar.Link as={Link} href="/api/auth/login">
      Login
    </Navbar.Link>
  );
};

export default LoginButton;
