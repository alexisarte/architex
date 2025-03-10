"use client";

import OrganizationCard from "@/components/OrganizationCard";
import { useContext, useEffect, useState } from "react";
import Loading from "../loading";
import { OrganizationsContext } from "@/context/OrganizationsContext";

const page = () => {
  const { organizations } = useContext(OrganizationsContext);
  const [updateOrganizations, setUpdateOrganizations] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOrganizations = async () => {
    const response = await fetch("http://localhost:3000/organizations");
    const data = await response.json();
    setUpdateOrganizations(false);
    setLoading(false);
  };

  useEffect(() => {
    console.log("fetching organizations");
    fetchOrganizations();
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
      {!loading ? (
        <div className="grid grid-cols-3 gap-4 place-items-center p-4">
          {organizations.map((organization) => (
            <OrganizationCard
              key={organization._id}
              organization={organization}
              handleAccept={handleAccept}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default page;
