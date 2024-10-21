import { z } from "zod";

export const organizationSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(200, {
      message: "Name must be at most 200 characters long",
    }),
  address: z
    .string()
    .min(3, {
      message: "Address must be at least 3 characters long",
    })
    .max(200, {
      message: "Address must be at most 200 characters long",
    }),
  contacts: z.string().min(3, {
    message: "Contacts must be at least 3 characters long",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters long",
    })
    .max(200, {
      message: "Description must be at most 200 characters long",
    }),
  letter: z.string().min(3, {
    message: "Letter must be at least 3 characters long",
  }),
  number: z.string().refine((number) => !isNaN(parseFloat(number)), {
    message: "Must be a number",
  }),
  year: z.string().min(4, {
    message: "Year must be at least 4 characters long",
  }),
  item: z.string().min(3, {
    message: "Item must be at least 3 characters long",
  }),
});
