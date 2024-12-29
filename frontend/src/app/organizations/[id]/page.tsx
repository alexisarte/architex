"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectModal from "@/components/ProjectModal";
import OrganizationCard from "@/components/OrganizationCard";

const Page = () => {
  const [organization, setOrganization] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`http://localhost:3000/organizations/${params.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const org = await response.json();
      console.log(org);
        setOrganization(org);
      } catch (error) {
        console.error('Failed to fetch organization:', error);
      }
    };

    if (params.id) {
      fetchOrganization();
    }
  }, [params.id]);

  const handleAddProject = () => {
    setOpenModal(openModal => !openModal);
  };

  return (
    <div>
      {organization ? (
        <div className="container mx-auto p-4">
          <OrganizationCard organization={organization} />
          <button onClick={handleAddProject} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Agregar proyecto
          </button>
          {
            openModal && (
              <ProjectModal
                title="Crear proyecto"
                organizationId={organization._id}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )
          }
          {/* {
            organization.projects.map((project) => (
              <div key={project._id}>
                <h2>{project.name}</h2>
                <p>{project.expedient}</p>
                <p>{project.type}</p>
                <p>{project.destination}</p>
                <p>{project.location}</p>
                <p>{project.scale}</p>
              </div>
            ))
          } */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;