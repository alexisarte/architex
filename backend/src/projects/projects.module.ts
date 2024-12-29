import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './entities/project.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { OrganizationSchema } from 'src/organizations/entities/organization.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'Organization', schema: OrganizationSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [OrganizationsService, ProjectsService],
})
export class ProjectsModule {}
