import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    OrganizationsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://alexisrodriguez180992:h5M445YXlE4sfzyl@cluster0.5bgrs.mongodb.net/architex?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
