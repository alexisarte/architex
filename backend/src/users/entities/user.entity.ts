import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;
  
  @Prop()
  name: string;
  
  @Prop()
  email: string;
  
  @Prop()
  password: string;
  
  @Prop()
  role: string;
  
  @Prop()
  organization: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
