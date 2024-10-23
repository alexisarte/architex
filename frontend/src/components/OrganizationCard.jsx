"use client";

import { Button, Card } from "flowbite-react";
import Image from "next/image";
import OrganizationModal from "./OrganizationModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OrganizationCard = ({ organization }) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleRedirect = () => {
    router.push(`/organizations/${organization._id}`);
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3000/organizations/${organization._id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      router.reload();
    }
  };

  return (
    <Card
      className="max-w-sm cursor-pointer"
      renderImage={() => (
        <Image
          width={500}
          height={500}
          src="/organization.png"
          alt="organization image"
        />
      )}
      onClick={handleRedirect}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {organization.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {organization.description}
      </p>

      <div className="flex flex-row">
        <Button onClick={handleClick}>Editar</Button>
        <Button onClick={handleDelete}>Eliminar</Button>
      </div>
      {openModal && (
        <OrganizationModal
          title={"Actualizar datos"}
          openModal={openModal}
          setOpenModal={setOpenModal}
          initialOrganization={organization}
        />
      )}
    </Card>
  );
};

export default OrganizationCard;
