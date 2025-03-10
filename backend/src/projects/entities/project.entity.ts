import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

enum ProjectType {
  Construccion = 'A CONSTRUIR',
  Ampliacion = 'A AMPLIAR',
  Refaccion = 'A REFACCIONAR',
  Demolicion = 'A DEMOLER',
  Documentacion = 'A DOCUMENTAR',
  DemolicionConstruccion = 'A DEMOLER Y CONSTRUIR',
}

enum Destination {
  ViviendaUnifamiliar = 'Vivienda unifamiliar',
  ViviendaMultifamiliar = 'Vivienda multifamiliar',
  ViviendaUnifamiliarAgrupada = 'Vivienda Unifamiliar Agrupada',
  Oficina = 'Oficina',
  LocalComercial = 'Local comercial',
  Industria = 'Industria',
}

interface Professional {
  fullName: string;
  provincialRegistration: string;
  municipalRegistration: string;
  dni?: string;
  location?: string;
}

@Schema()
export class Project {
  @Prop({ required: false })
  name: string;

  @Prop({ required: true })
  expedient: string;

  @Prop({ required: true })
  type: ProjectType;

  @Prop({ required: true })
  destination: Destination;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  scale: string;

  @Prop({ required: false })
  requirements?: string;

  @Prop({ required: false })
  references?: string;

  @Prop({ required: false })
  antecedent?: string;

  @Prop({ required: true })
  approval: string;

  @Prop({ required: true })
  planners: Professional[];

  @Prop({ required: true })
  contractors: Professional[];

  // @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  // owner: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Types.ObjectId;

  @Prop({ type: [String], required: false })
  planos: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
