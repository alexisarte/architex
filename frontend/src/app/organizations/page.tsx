"use client";

import { Button, FloatingLabel, Modal } from "flowbite-react";
import OrganizationCard from "@/components/OrganizationCard";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zod } from "zod";
import { organizationSchema } from "@/validations/organizationSchema";

type Inputs = {
  name: string;
  description: string;
  address: string;
  contacts: string;
  letter: string;
  year: string;
  item: string;
  number: number;
  code: string;
};

const page = () => {
  const [organizations, setOrganizations] = useState([]);
  const organization = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(organizationSchema),
  });

  console.log(errors);

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  useEffect(() => {
    fetch("http://localhost:3000/organizations")
      .then((response) => response.json())
      .then((data) => setOrganizations(data));
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
     await fetch("http://localhost:3000/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="flex justify-center items-center m-7">
      {organizations.map((organization) => (
        <OrganizationCard key={organization._id} organization={organization} />
      ))}
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form
            ref={organization}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Crear Organización
            </h3>
            <FloatingLabel
              variant="outlined"
              label="Nombre"
              name="name"
              {...register("name")}
              helperText={errors.name && <span>{errors.name.message}</span>}
            />
            <FloatingLabel
              variant="outlined"
              label="Descripción"
              name="description"
              {...register("description")}
              helperText={
                errors.description && <span>{errors.description.message}</span>
              }
            />
            <FloatingLabel
              variant="outlined"
              label="Dirección"
              name="address"
              {...register("address")}
              helperText={
                errors.address && <span>{errors.address.message}</span>
              }
            />
            <FloatingLabel
              variant="outlined"
              label="Contactos"
              name="contacts"
              {...register("contacts")}
              helperText={
                errors.contacts && <span>{errors.contacts.message}</span>
              }
            />
            <FloatingLabel
              variant="outlined"
              label="Letra"
              name="letter"
              {...register("letter")}
              helperText={errors.letter && <span>{errors.letter.message}</span>}
            />
            <FloatingLabel
              variant="outlined"
              label="Número"
              name="number"
              type="number"
              {...register("number")}
              helperText={errors.number && <span>{errors.number.message}</span>}
            />
            <FloatingLabel
              variant="outlined"
              label="Año"
              name="year"
              {...register("year")}
              helperText={errors.year && <span>{errors.year.message}</span>}
            />
            <FloatingLabel
              variant="outlined"
              label="Partida"
              name="item"
              {...register("item")}
              helperText={errors.item && <span>{errors.item.message}</span>}
            />

            <div className="flex justify-center w-full">
              <Button className="w-1/2" type="submit">
                Crear
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default page;
