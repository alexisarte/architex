'use client'
import { createContext, useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const OrganizationsContext = createContext();

export const OrganizationsProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchOrganizations();
    }
  }, [user]); // Se ejecuta solo cuando `user` cambia

  const fetchOrganizations = async () => {
    if (!user) return; // Evita que se ejecute si user es undefined
    try {
      console.log("USERRRRRRRRRRRRRR", user);
      const response = await fetch(`http://localhost:3000/organizations/user/${user.sub}`);
      if (!response.ok) throw new Error("Error fetching organizations");

      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOrganization = async (newOrgData) => {
    try {
      const response = await fetch("http://localhost:3000/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrgData),
      });

      if (!response.ok) throw new Error("Error adding organization");

      const newOrg = await response.json();
      setOrganizations((prev) => [...prev, newOrg]);
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };

  const deleteOrganization = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/organizations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error deleting organization");

      setOrganizations((prev) => prev.filter((org) => org._id !== id));
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  return (
    <OrganizationsContext.Provider value={{ organizations, loading, addOrganization, deleteOrganization }}>
      {children}
    </OrganizationsContext.Provider>
  );
};
