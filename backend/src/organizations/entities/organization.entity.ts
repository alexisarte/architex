import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: Project[];

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
