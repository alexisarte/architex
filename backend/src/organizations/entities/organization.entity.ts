import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop([Object])
  contactos: [Object];

  @Prop()
  description: string;

  @Prop()
  letter: string;

  @Prop()
  number: number;

  @Prop()
  year: string;

  @Prop()
  item: string;

  // inside the class definition
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}


export const OrganizationSchema = SchemaFactory.createForClass(Organization);
