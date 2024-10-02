import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrganizationDto } from 'src/organizations/dto/update-organization.dto';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('organizationsUsers')
@ApiTags('organizationsUsers')
export class OrganizationsUsersController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly usersService: UsersService,
  ) {}

  @Post(':id')
  async create(
    @Param('id') idOrg: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    const createdUser = await this.usersService.create(createUserDto);
    return this.organizationsService.addUser(idOrg, createdUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    const users = this.organizationsService.findUsers(id).then((org) => {
      return org.users;
    });
    return users;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationsUserDto: any) {
    return `This action updates a #${id} organizationsUser`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} organizationsUser`;
  }
}
