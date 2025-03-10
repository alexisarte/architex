import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationsService } from '../organizations/organizations.service';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const createdProject = await this.projectsService.create(createProjectDto);
    this.organizationsService.addProject(
      createProjectDto.organization,
      createdProject,
    );
    return createdProject;
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id/image')
  async addImage(@Param('id') id: string, @Body() body: { image: string }) {
    console.log('id', id);
    console.log('body', body);
    return this.projectsService.addImage(id, body.image);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
