'use client'
import { createContext, useState, useEffect } from "react";

export const OrganizationsContext = createContext();

export const OrganizationsProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    const response = await fetch("http://localhost:3000/organizations");
    const data = await response.json();
    setOrganizations(data);
    setLoading(false);
  };

  const addOrganization = async (newOrgData) => {
    const response = await fetch("http://localhost:3000/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrgData),
    });

    if (response.ok) {
      const newOrg = await response.json();
      setOrganizations((prev) => [...prev, newOrg]); // Agregar al estado
    }
  };

  return (
    <OrganizationsContext.Provider value={{ organizations, loading, addOrganization }}>
      {children}
    </OrganizationsContext.Provider>
  );
};
