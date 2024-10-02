import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsUsersModule } from './organizationsUsers/organizationUsers.module';

@Module({
  imports: [
    OrganizationsModule,
    UsersModule,
    OrganizationsUsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://alexisrodriguez180992:h5M445YXlE4sfzyl@cluster0.5bgrs.mongodb.net/architex?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
