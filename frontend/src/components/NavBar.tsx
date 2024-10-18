"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { DarkThemeToggle } from "flowbite-react";
import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";
import { useUser } from "@auth0/nextjs-auth0/client";

const NavBar = () => {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        {/* <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Architex
        </span>
      </Navbar.Brand>
      {!isLoading && user ? (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              user.picture && (
                <Avatar alt="User settings" img={user.picture} rounded />
              )
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <LogoutButton />
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : null}
      <DarkThemeToggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="organizations">
          Organizations
        </Navbar.Link>
        <Navbar.Link as={Link} href="projects">
          Projects
        </Navbar.Link>
        {!user && <LoginButton />}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
