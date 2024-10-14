import { Dropdown } from "flowbite-react";
import Link from "next/link";

const LogoutButton = () => {
  return (
    <Dropdown.Item as={Link} href="/api/auth/logout">Sign out</Dropdown.Item>
  );
};

export default LogoutButton;