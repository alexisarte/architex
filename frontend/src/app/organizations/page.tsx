"use client";

import OrganizationCard from "@/components/OrganizationCard";
import { useContext, useEffect, useState } from "react";
import Loading from "../loading";
import { OrganizationsContext } from "@/context/OrganizationsContext";

const page = () => {
  const { organizations } = useContext(OrganizationsContext);
  const [updateOrganizations, setUpdateOrganizations] = useState(false);
  const [loading, setLoading] = useState(true);
  const {deleteOrganization} = useContext(OrganizationsContext);

  const fetchOrganizations = async () => {
    setUpdateOrganizations(false);
    setLoading(false);
  };

  useEffect(() => {
    console.log("fetching organizations");
    fetchOrganizations();
  }, [updateOrganizations]);

  const handleAccept = async (idOrg: string) => {
    deleteOrganization(idOrg);
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
