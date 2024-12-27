import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';

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
  projects: mongoose.Schema.Types.ObjectId[];

}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
