export interface RuralProducerEntity {
  id: string;
  name: string;
  cpfCnpj: string;
  farm: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;

  crops: CropEntity[];

  createdAt: Date;
  updatedAt: Date;
}

export interface CropEntity {
  id: string;
  name: string;
  
  ruralProducers: RuralProducerEntity[];

  createdAt: Date;
  updatedAt: Date;
}
