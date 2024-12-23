"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectModal from "@/components/ProjectModal";

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
        <>
          <h1 className="text-3xl font-semibold text-center">{organization.name}</h1>
          <p>{organization.description}</p>
          <button onClick={handleAddProject} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Agregar proyecto
          </button>
          {
            openModal && (
              <ProjectModal
                title="Crear proyecto"
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;