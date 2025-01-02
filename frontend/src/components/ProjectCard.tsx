"use client";

import { Card } from "flowbite-react";

const ProjectCard = ({ project }) => {
  return (
    <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {project.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Tipo de obra: {project.type}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Destino funcional: {project.destination}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Ubicación: {project.location}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Escala: {project.scale}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Aprobación: {project.approval}
      </p>
    </Card>
  );
};

export default ProjectCard;
