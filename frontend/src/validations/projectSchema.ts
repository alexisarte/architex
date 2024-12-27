import {z} from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(200, {
      message: "Name must be at most 200 characters long",
    }),
  GUID: z
    .string()
    .min(3, {
      message: "GUID must be at least 3 characters long",
    })
    .max(200, {
      message: "GUID must be at most 200 characters long",
    }),
  expedient: z
    .string()
    .min(3, {
      message: "Expediente must be at least 3 characters long",
    })
    .max(200, {
      message: "Expediente must be at most 200 characters long",
    }),
  type: z
    .string()
    .min(3, {
      message: "Type must be at least 3 characters long",
    })
    .max(200, {
      message: "Type must be at most 200 characters long",
    })
    .refine(value => value !== "Seleccione el tipo de obra", {
      message: "Debe seleccionar un tipo de obra válido",
    }),
  destination: z
    .string()
    .min(3, {
      message: "Destination must be at least 3 characters long",
    })
    .max(200, {
      message: "Destination must be at most 200 characters long",
    })
    .refine(value => value !== "Seleccione el destino funcional", {
      message: "Debe seleccionar un destino funcional válido",
    }),
  location: z
    .string()
    .min(3, {
      message: "Location must be at least 3 characters long",
    })
    .max(200, {
      message: "Location must be at most 200 characters long",
    }),
  scale: z
    .string()
    .min(3, {
      message: "Scale must be at least 3 characters long",
    })
    .max(200, {
      message: "Scale must be at most 200 characters long",
    }),
  approval: z
    .string()
    .min(3, {
      message: "Approval must be at least 3 characters long",
    })
    .max(200, {
      message: "Approval must be at most 200 characters long",
    })
    .refine(value => value !== "Seleccione el estado del proyecto", {
      message: "Debe seleccionar una aprobación válida",
    }),
});

// JSON para crear un proyecto
// {
//   "name": "Proyecto 1",
//   "GUID": "123",
//   "expedient": "123",
//   "type": "type",
//   "destination": "destination",
//   "location": "location",
//   "scale": "scale",
//   "approval" : true,
//   "professionals": [
//     {
//       "fullName": "Juan Perez",
//       "provincialRegistration": "123",
//       "municipalRegistration": "123",
//       "dni": "123",
//       "location": "location"
//     }
//   ],
//   "owner": "123",
//   "organization": "123"  
// }