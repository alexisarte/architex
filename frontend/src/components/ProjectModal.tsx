"use client";

import { Button, FloatingLabel, Modal, Select } from "flowbite-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/validations/projectSchema";
import SelectInput from "./SelectInput";

type Inputs = {
  name: string;
  GUID: string;
  expedient: string;
  type: string;
  destination: string;
  location: string;
  scale: string;
  approval: boolean;
  owner: object;
  proyectistas: object[];
  constructores: object[];
};

enum ProjectType {
  Construccion = "A CONSTRUIR",
  Ampliacion = "A AMPLIAR",
  Refaccion = "A REFACCIONAR",
  Demolicion = "A DEMOLER",
  Documentacion = "A DOCUMENTAR",
  DemolicionConstruccion = "A DEMOLER Y CONSTRUIR",
}

enum Destination {
  ViviendaUnifamiliar = "Vivienda unifamiliar",
  ViviendaMultifamiliar = "Vivienda multifamiliar",
  ViviendaUnifamiliarAgrupada = "Vivienda Unifamiliar Agrupada",
  Oficina = "Oficina",
  LocalComercial = "Local comercial",
  Industria = "Industria",
}

const projectTypesArray = Object.values(ProjectType);
const destinationsArray = Object.values(Destination);

const ProjectModal = ({
  title,
  openModal,
  setOpenModal,
  initialProject = {},
}) => {
  const project = useRef();
  const [proyectistas, setProyectistas] = useState([
    { name: "", registration: "" },
  ]);
  const [constructores, setConstructores] = useState([
    { name: "", registration: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(projectSchema),
  });

  const addProyectista = () => {
    setProyectistas([...proyectistas, { name: "", registration: "" }]);
  };

  const addConstructor = () => {
    setConstructores([...constructores, { name: "", registration: "" }]);
  };

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
            helperText={errors.GUID && <span>{errors.GUID.message}</span>}
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
            helperText={
              errors.expedient && <span>{errors.expedient.message}</span>
            }
          />

          <Select
            id="type"
            name="type"
            {...register("type", {
              validate: (value) =>
                value !== "Seleccione el tipo de obra" ||
                "Debe seleccionar un tipo de obra válido",
            })}
            helperText={errors.type && <span>{errors.type.message}</span>}
            required
          >
            <option>Seleccione el tipo de obra</option>
            {projectTypesArray.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>

          <Select
            id="countries"
            name="destination"
            {...register("destination")}
            helperText={
              errors.destination && <span>{errors.destination.message}</span>
            }
            required
          >
            <option>Seleccione el destino funcional</option>
            {destinationsArray.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </Select>

          <Select
            id="countries"
            name="approval"
            {...register("approval")}
            helperText={
              errors.approval && <span>{errors.approval.message}</span>
            }
            required
          >
            <option>Seleccione el estado del proyecto</option>
            <option>Aprobado</option>
            <option>No aprobado</option>
          </Select>

          {/* <SelectInput value="Seleccione el tipo de obra" id="options" options={Object.values(ProjectType)} />
          <SelectInput value="Seleccione el destino funcional" id="options" options={Object.values(Destination)} /> */}

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
          {/* <SelectInput value="Seleccione el estado del proyecto" id="options" options={["Aprobado", "No aprobado"]} /> */}
          <section className="flex justify-center flex-col space-y-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Propietario
            </h4>
            <FloatingLabel
              defaultValue={initialProject.owner}
              variant="outlined"
              label="Nombre"
              name="owner"
              {...register("owner")}
              helperText={errors.owner && <span>{errors.owner.message}</span>}
            />
            {/* DNI */}
            <FloatingLabel
              defaultValue={initialProject.ownerDNI}
              variant="outlined"
              label="DNI"
              name="ownerDNI"
              {...register("ownerDNI")}
              helperText={
                errors.ownerDNI && <span>{errors.ownerDNI.message}</span>
              }
            />

            {/* DOMICILIO */}
            <FloatingLabel
              defaultValue={initialProject.ownerAddress}
              variant="outlined"
              label="Domicilio"
              name="ownerAddress"
              {...register("ownerAddress")}
              helperText={
                errors.ownerAddress && (
                  <span>{errors.ownerAddress.message}</span>
                )
              }
            />
          </section>

          <section className="flex justify-center flex-col space-y-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Proyectistas
            </h4>
            <FloatingLabel
              defaultValue={initialProject.professional}
              variant="outlined"
              label="Nombre"
              name="professional"
              {...register("professional")}
              helperText={
                errors.professional && (
                  <span>{errors.professional.message}</span>
                )
              }
            />
            {/* DNI */}
            <FloatingLabel
              defaultValue={initialProject.professionalDNI}
              variant="outlined"
              label="DNI"
              name="professionalDNI"
              {...register("professionalDNI")}
              helperText={
                errors.professionalDNI && (
                  <span>{errors.professionalDNI.message}</span>
                )
              }
            />
            {/* DOMICILIO */}
            <FloatingLabel
              defaultValue={initialProject.professionalAddress}
              variant="outlined"
              label="Domicilio"
              name="professionalAddress"
              {...register("professionalAddress")}
              helperText={
                errors.professionalAddress && (
                  <span>{errors.professionalAddress.message}</span>
                )
              }
            />

            {/* MATRICULA Provincial */}
            <FloatingLabel
              defaultValue={initialProject.professionalRegistration}
              variant="outlined"
              label="Matrícula Provincial"
              name="professionalRegistration"
              {...register("professionalRegistration")}
              helperText={
                errors.professionalRegistration && (
                  <span>{errors.professionalRegistration.message}</span>
                )
              }
            />

            {/* MATRICULA MUNICIPAL */}
            <FloatingLabel
              defaultValue={initialProject.professionalMunicipalRegistration}
              variant="outlined"
              label="Matrícula Municipal"
              name="professionalMunicipalRegistration"
              {...register("professionalMunicipalRegistration")}
              helperText={
                errors.professionalMunicipalRegistration && (
                  <span>
                    {errors.professionalMunicipalRegistration.message}
                  </span>
                )
              }
            />

            {/* AGREGAR OTRO PROYECTISTA */}
            {proyectistas.map((proyectista, index) => (
              <div
                key={index}
                className="flex justify-center flex-col space-y-4"
              >
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  Otro Proyectista
                </h4>
                <FloatingLabel
                  defaultValue={initialProject.professional}
                  variant="outlined"
                  label="Nombre"
                  name="professional"
                  {...register("professional")}
                  helperText={
                    errors.professional && (
                      <span>{errors.professional.message}</span>
                    )
                  }
                />
                {/* DNI */}
                <FloatingLabel
                  defaultValue={initialProject.professionalDNI}
                  variant="outlined"
                  label="DNI"
                  name="professionalDNI"
                  {...register("professionalDNI")}
                  helperText={
                    errors.professionalDNI && (
                      <span>{errors.professionalDNI.message}</span>
                    )
                  }
                />
                {/* DOMICILIO */}
                <FloatingLabel
                  defaultValue={initialProject.professionalAddress}
                  variant="outlined"
                  label="Domicilio"
                  name="professionalAddress"
                  {...register("professionalAddress")}
                  helperText={
                    errors.professionalAddress && (
                      <span>{errors.professionalAddress.message}</span>
                    )
                  }
                />

                {/* MATRICULA Provincial */}
                <FloatingLabel
                  defaultValue={initialProject.professionalRegistration}
                  variant="outlined"
                  label="Matrícula Provincial"
                  name="professionalRegistration"
                  {...register("professionalRegistration")}
                  helperText={
                    errors.professionalRegistration && (
                      <span>{errors.professionalRegistration.message}</span>
                    )
                  }
                />

                {/* MATRICULA MUNICIPAL */}
                <FloatingLabel
                  defaultValue={
                    initialProject.professionalMunicipalRegistration
                  }
                  variant="outlined"
                  label="Matrícula Municipal"
                  name="professionalMunicipalRegistration"
                  {...register("professionalMunicipalRegistration")}
                  helperText={
                    errors.professionalMunicipalRegistration && (
                      <span>
                        {errors.professionalMunicipalRegistration.message}
                      </span>
                    )
                  }
                />
              </div>
            ))}
            <div className="flex w-full">
              <Button className="w-1/2" onClick={addProyectista}>
                Agregar proyectista
              </Button>
            </div>
          </section>

          <section className="flex justify-center flex-col space-y-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Constructores
            </h4>
            {/* Hace referencia a los profesionales a cargo de la construcción de la obra. Incluye datos similares a Proyectistas. Puede ser una persona jurídica la Contratista que ejecute la obra. */}
            <FloatingLabel
              defaultValue={initialProject.builder}
              variant="outlined"
              label="Nombre"
              name="builder"
              {...register("builder")}
              helperText={errors.builder && <span>{errors.builder.message}</span>}
            />
            {/* DNI */}
            <FloatingLabel
              defaultValue={initialProject.builderDNI}
              variant="outlined"
              label="DNI"
              name="builderDNI"
              {...register("builderDNI")}
              helperText={
                errors.builderDNI && <span>{errors.builderDNI.message}</span>
              }
            />
            {/* DOMICILIO */}
            <FloatingLabel
              defaultValue={initialProject.builderAddress}
              variant="outlined"
              label="Domicilio"
              name="builderAddress"
              {...register("builderAddress")}
              helperText={
                errors.builderAddress && <span>{errors.builderAddress.message}</span>
              }
            />
            {
              constructores.map((constructor, index) => (
                <div key={index} className="flex justify-center flex-col space-y-4">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    Otro Constructor
                  </h4>
                  <FloatingLabel
                    defaultValue={initialProject.builder}
                    variant="outlined"
                    label="Nombre"
                    name="builder"
                    {...register("builder")}
                    helperText={errors.builder && <span>{errors.builder.message}</span>}
                  />
                  {/* DNI */}
                  <FloatingLabel
                    defaultValue={initialProject.builderDNI}
                    variant="outlined"
                    label="DNI"
                    name="builderDNI"
                    {...register("builderDNI")}
                    helperText={
                      errors.builderDNI && <span>{errors.builderDNI.message}</span>
                    }
                  />
                  {/* DOMICILIO */}
                  <FloatingLabel
                    defaultValue={initialProject.builderAddress}
                    variant="outlined"
                    label="Domicilio"
                    name="builderAddress"
                    {...register("builderAddress")}
                    helperText={
                      errors.builderAddress && <span>{errors.builderAddress.message}</span>
                    }
                  />
                </div>
              ))
            }
            <div className="flex w-full">
              <Button className="w-1/2" onClick={addConstructor}>
                Agregar constructor
              </Button>
            </div>
          </section>

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
