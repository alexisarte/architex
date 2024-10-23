"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const [organization, setOrganization] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organizations/${params.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const org = await response.json();
        setOrganization(org);
      } catch (error) {
        console.error('Failed to fetch organization:', error);
      }
    };

    if (params.id) {
      fetchOrganization();
    }
  }, [params.id]);

  return (
    <div>
      {organization ? (
        <div>
          <h1>{organization.name}</h1>
          <p>{organization.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;