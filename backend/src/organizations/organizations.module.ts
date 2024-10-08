import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './entities/organization.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
