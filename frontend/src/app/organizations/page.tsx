"use client";

import OrganizationCard from "@/components/OrganizationCard";
import { useEffect, useState } from "react";
import OrganizationDropdown from "@/components/OrganizationDropdown";
import OrganizationModal from "@/components/OrganizationModal";

const page = () => {
  const [organizations, setOrganizations] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/organizations")
      .then((response) => response.json())
      .then((data) => setOrganizations(data));
  }, []);

  return (
    <>
      <h1 className="text-4xl font-semibold text-center p-4">Organizaciones</h1>
      <div className="grid grid-cols-3 gap-4 place-items-center p-4">
        {organizations.map((organization) => (
          <OrganizationCard
            key={organization._id}
            organization={organization}
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
