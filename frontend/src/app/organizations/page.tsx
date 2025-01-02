"use client";

import OrganizationCard from "@/components/OrganizationCard";
import { useEffect, useState } from "react";
import Loading from "../loading";

const page = () => {
  const [organizations, setOrganizations] = useState([]);
  const [updateOrganizations, setUpdateOrganizations] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching organizations");
    fetch("http://localhost:3000/organizations")
      .then((response) => response.json())
      .then((data) => {
        setOrganizations(data);
        setLoading(false);
        console.log(data);
      });
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
