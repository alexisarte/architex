"use client";

import { useEffect, useRef, useState } from "react";

import { person } from "@jsonforms/examples";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import { JsonForms } from "@jsonforms/react";

const OrganizationForm = () => {
  const [organizations, setOrganizations] = useState([]);
  const organization = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const schema = person.schema;
  const uischema = person.uischema;
  const initialData = person.data;
  const [data, setData] = useState(initialData);

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  useEffect(() => {
    fetch("http://localhost:3000/organizations")
      .then((response) => response.json())
      .then((data) => setOrganizations(data));
  }, []);

  return (
    <div className="bg-black">
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => setData(data)}
      />
    </div>
  );
};

export default OrganizationForm;
