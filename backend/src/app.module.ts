import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsUsersModule } from './organizationsUsers/organizationUsers.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrganizationsModule,
    UsersModule,
    OrganizationsUsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5bgrs.mongodb.net/architex?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
