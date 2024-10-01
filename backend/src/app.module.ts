import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [OrganizationsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
