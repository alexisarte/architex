"use client";

import { Button, FloatingLabel, Modal } from "flowbite-react";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/validations/projectSchema";

type Inputs = {
  name: string;
  GUID: string;
  expedient: string;
  type: string;
  destination: string;
  location: string;
  scale: string;
  approval: boolean;
};

const ProjectModal = ({ title, openModal, setOpenModal, initialProject = {}}) => {
  const project = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(projectSchema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (title === "Crear proyecto") {
      await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch(`http://localhost:3000/projects/${initialProject._id}`, {
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
          ref={project}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <FloatingLabel
            defaultValue={initialProject.GUID}
            variant="outlined"
            label="GUID"
            name="GUID"
            {...register("GUID")}
            helperText={
              errors.GUID && <span>{errors.GUID.message}</span>
            }
          />
          <FloatingLabel
            defaultValue={initialProject.name}
            variant="outlined"
            label="Nombre"
            name="name"
            {...register("name")}
            helperText={errors.name && <span>{errors.name.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialProject.expedient}
            variant="outlined"
            label="Expediente"
            name="expedient"
            {...register("expedient")}
            helperText={errors.expedient && <span>{errors.expedient.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialProject.type}
            variant="outlined"
            label="Tipo"
            name="type"
            {...register("type")}
            helperText={errors.type && <span>{errors.type.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialProject.destination}
            variant="outlined"
            label="Destino"
            name="destination"
            {...register("destination")}
            helperText={
              errors.destination && <span>{errors.destination.message}</span>
            }
          />
          <FloatingLabel
            defaultValue={initialProject.location}
            variant="outlined"
            label="Ubicación"
            name="location"
            {...register("location")}
            helperText={
              errors.location && <span>{errors.location.message}</span>
            }
          />
          <FloatingLabel
            defaultValue={initialProject.scale}
            variant="outlined"
            label="Escala"
            name="scale"
            {...register("scale")}
            helperText={errors.scale && <span>{errors.scale.message}</span>}
          />
          <FloatingLabel
            defaultValue={initialProject.approval}
            variant="outlined"
            label="Aprobado"
            name="approval"
            {...register("approval")}
            helperText={errors.approval && <span>{errors.approval.message}</span>}
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

export default ProjectModal;
