"use client";

import { Card } from "flowbite-react";
import Image from "next/image";

const OrganizationCard = ({ organization }) => {
  return (
    <Card
      className="max-w-sm"
      renderImage={() => (
        <Image width={500} height={500} src="/organization.png" alt="image 1" />
      )}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {organization.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {organization.description}
      </p>
    </Card>
  );
};

export default OrganizationCard;
