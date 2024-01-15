import { z } from 'zod';

export const createRuralProducerBodySchema = z.object({
  cpfCnpj: z.string(),
  name: z.string(),
  farm: z.string(),
  city: z.string(),
  state: z.string(),
  totalArea: z.number(),
  arableArea: z.number(),
  vegetationArea: z.number(),
  cropIds: z.array(z.string()),
});

export type CreateRuralProducerBodySchema = z.infer<
  typeof createRuralProducerBodySchema
>;
