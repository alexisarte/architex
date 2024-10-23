"use client";

import OrganizationCard from "@/components/OrganizationCard";
import { useEffect, useState } from "react";

const page = () => {
  const [organizations, setOrganizations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateOrganizations, setUpdateOrganizations] = useState(false);

  useEffect(() => {
    console.log("fetching organizations");
    fetch("http://localhost:3000/organizations")
      .then((response) => response.json())
      .then((data) => setOrganizations(data));
  }, [updateOrganizations]);

  const handleAccept = async (idOrg: string) => {
    const response = await fetch(
      `http://localhost:3000/organizations/${idOrg}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      // setOrganizations(organizations.filter((org) => org._id !== idOrg));
      setUpdateOrganizations(true);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-semibold text-center p-4">Organizaciones</h1>
      <div className="grid grid-cols-3 gap-4 place-items-center p-4">
        {organizations.map((organization) => (
          <OrganizationCard
            key={organization._id}
            organization={organization}
            handleAccept={handleAccept}
          />
        ))}

        {/* <OrganizationDropdown handleClick={() => setOpenModal(true)} /> */}

        {/* {openModal && (
        <OrganizationModal title="Crear organización" openModal={openModal} setOpenModal={setOpenModal} />
      )} */}
      </div>
    </>
  );
};

export default page;
