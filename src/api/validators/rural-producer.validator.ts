import { z } from 'zod';

const validateCpfCnpj = (cpfCnpj: string) => {
  const cpfCnpjRegex =
    /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;
  return cpfCnpjRegex.test(cpfCnpj);
};

export const createRuralProducerBodySchema = z.object({
  cpfCnpj: z.string().refine(validateCpfCnpj, 'Invalid CPF/CNPJ'),
  name: z.string(),
  farm: z.string(),
  city: z.string(),
  state: z.string(),
  totalArea: z.number(),
  arableArea: z.number(),
  vegetationArea: z.number(),
  cropIds: z.array(z.string()),
});

export type CreateRuralProducerBodySchema = Required<
  z.infer<typeof createRuralProducerBodySchema>
>;

export const pageQueryParamSchema = z.coerce
  .number()
  .min(1)
  .optional()
  .default(1);

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

export const updateRuralProducerBodySchema = z.object({
  cpfCnpj: z.string().refine(validateCpfCnpj, 'Invalid CPF/CNPJ').optional(),
  name: z.string().optional(),
  farm: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  totalArea: z.number().optional(),
  arableArea: z.number().optional(),
  vegetationArea: z.number().optional(),
  cropIds: z.array(z.string()).optional(),
});

export type UpdateRuralProducerBodySchema = z.infer<
  typeof updateRuralProducerBodySchema
>;
