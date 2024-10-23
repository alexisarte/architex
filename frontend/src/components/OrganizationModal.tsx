"use client";

import { Button, FloatingLabel, Modal } from "flowbite-react";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { organizationSchema } from "@/validations/organizationSchema";

type Inputs = {
  name: string;
  description: string;
  address: string;
  contacts: string;
  letter: string;
  number: number;
  year: string;
  item: string;
};

const OrganizationModal = ({ title, openModal, setOpenModal, initialOrganization = {}}) => {
  const organization = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(organizationSchema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (title === "Crear organización") {
      await fetch("http://localhost:3000/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch(`http://localhost:3000/organizations/${initialOrganization._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    setOpenModal(false);
  };
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <form
          ref={organization}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <FloatingLabel
            defaultValue={initialOrganization.name}
            variant="outlined"
            label="Nombre"
            name="name"
            {...register("name")}
            helperText={errors.name && <span>{errors.name.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialOrganization.description}
            variant="outlined"
            label="Descripción"
            name="description"
            {...register("description")}
            helperText={
              errors.description && <span>{errors.description.message}</span>
            }
          />
          <FloatingLabel
            defaultValue={initialOrganization.address}
            variant="outlined"
            label="Dirección"
            name="address"
            {...register("address")}
            helperText={errors.address && <span>{errors.address.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialOrganization.contacts}
            variant="outlined"
            label="Contactos"
            name="contacts"
            {...register("contacts")}
            helperText={
              errors.contacts && <span>{errors.contacts.message}</span>
            }
          />
          <FloatingLabel
            defaultValue={initialOrganization.letter}
            variant="outlined"
            label="Letra"
            name="letter"
            {...register("letter")}
            helperText={errors.letter && <span>{errors.letter.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialOrganization.number}
            variant="outlined"
            label="Número"
            name="number"
            type="number"
            {...register("number")}
            helperText={errors.number && <span>{errors.number.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialOrganization.year}
            variant="outlined"
            label="Año"
            name="year"
            {...register("year")}
            helperText={errors.year && <span>{errors.year.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialOrganization.item}
            variant="outlined"
            label="Partida"
            name="item"
            {...register("item")}
            helperText={errors.item && <span>{errors.item.message}</span>}
          />

          <div className="flex justify-center w-full">
            <Button className="w-1/2" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OrganizationModal;