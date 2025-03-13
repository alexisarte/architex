import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const createdOrganization = new this.organizationModel(
      createOrganizationDto,
    );
    return createdOrganization.save();
  }

  // async addUser(id: string, user: User): Promise<Organization> {
  //   console.log('id', id);
  //   const organization = await this.organizationModel
  //     .findById(id)
  //     .populate('users')
  //     .exec();
  //   organization.users.push(user);
  //   return organization.save();
  // }

  async addProject(id: string, project: Project): Promise<Organization> {
    console.log('id', id);
    const organization = await this.organizationModel
      .findById(id)
      .populate('projects')
      .exec();
    organization.projects.push(project);
    return organization.save();
  }

  findAll(): Promise<Organization[]> {
    return this.organizationModel.find().exec();
  }

  findOne(id: string): Promise<Organization> {
    return this.organizationModel.findById(id).populate('projects').exec();
  }

  findUsers(id: string): Promise<Organization> {
    return this.organizationModel.findById(id).populate('users').exec();
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationModel
      .findByIdAndUpdate(id, updateOrganizationDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.organizationModel.findByIdAndDelete(id).exec();
  }

  async addUserToOrganization(orgId: string, userSub: string) {
    return this.organizationModel.findByIdAndUpdate(
      orgId,
      { $addToSet: { userIds: userSub } }, // Evita duplicados
      { new: true }
    ).exec();
  }

  async findByUser(userId: string) {
    return this.organizationModel.find({ userIds: userId }).exec();
  }
  
}
