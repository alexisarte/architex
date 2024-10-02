import { Module } from '@nestjs/common';
import { OrganizationsUsersController } from './organizationsUsers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { UsersService } from 'src/users/users.service';
import { OrganizationSchema } from 'src/organizations/entities/organization.entity';
import { UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organization', schema: OrganizationSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [OrganizationsUsersController],
  providers: [OrganizationsService, UsersService],
})
export class OrganizationsUsersModule {}
