"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectModal from "@/components/ProjectModal";
import OrganizationCard from "@/components/OrganizationCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "flowbite-react";
import Loading from "@/app/loading";

const Page = () => {
  const [organization, setOrganization] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/organizations/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const org = await response.json();
        console.log(org);
        setOrganization(org);
      } catch (error) {
        console.error("Failed to fetch organization:", error);
      }
    };

    if (params.id) {
      fetchOrganization();
    }
  }, [params.id]);

  const handleAddProject = () => {
    setOpenModal((openModal) => !openModal);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleAddProject}>Agregar proyecto</Button>
      {organization ? (
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-semibold text-center p-4">
            {organization.name}
          </h1>
          <p className="text-lg font-semibold text-center p-4">
            {organization.description}
          </p>
          {openModal && (
            <ProjectModal
              title="Crear proyecto"
              organizationId={organization._id}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">Proyectos</h2>
            <div className="grid grid-cols-3 gap-4">
              {organization.projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
