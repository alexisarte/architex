import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
  _id: string; // <--- Agrega esta línea para que TypeScript reconozca el _id
  
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop([Object])
  contacts: [Object];

  @Prop()
  description: string;

  @Prop()
  identifier: string;

  // Lista de IDs de usuarios en Auth0
  @Prop({ type: [String], required: true, default: [] })
  userIds: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: Project[];

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
