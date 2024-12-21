"use client";

import { Dropdown } from "flowbite-react";
import AddIcon from "./icons/AddIcon";

const OrganizationDropdown = ({handleClick}) => {
  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span className="cursor-pointer dark:text-white bg-slate-600">{<AddIcon />}</span>}>
      <Dropdown.Item onClick={handleClick}>Crear una organización</Dropdown.Item>
      <Dropdown.Item>Unirse a una organización</Dropdown.Item>
    </Dropdown>
  )
}

export default OrganizationDropdown
