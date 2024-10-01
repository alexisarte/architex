import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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

  findAll(): Promise<Organization[]> {
    return this.organizationModel.find().exec();
  }

  findOne(id: string): Promise<Organization> {
    return this.organizationModel.findById(id).exec();
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationModel
      .findByIdAndUpdate(id, updateOrganizationDto)
      .exec();
  }

  remove(id: string) {
    return this.organizationModel.findByIdAndDelete(id).exec();
  }
}
