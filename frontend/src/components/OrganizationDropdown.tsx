"use client";

import { Dropdown } from "flowbite-react";

const OrganizationDropdown = ({handleClick}) => {
  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span className="cursor-pointer dark:text-white">Crear organización o unirse</span>}>
      <Dropdown.Item onClick={handleClick}>Crear una organización</Dropdown.Item>
      <Dropdown.Item>Unirse a una organización</Dropdown.Item>
    </Dropdown>
  )
}

export default OrganizationDropdown
