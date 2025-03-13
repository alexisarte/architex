import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('organizations')
@ApiTags('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto & { userId: string },
  ) {
    const { userId, ...orgData } = createOrganizationDto;

    // Crear la organización
    const organization = await this.organizationsService.create(orgData);

    // Agregar la organización al usuario
    if (userId) {
      await this.organizationsService.addUserToOrganization(
        organization._id,
        userId,
      );
    }

    return organization;
  }

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.organizationsService.findByUser(userId);
  }
}
