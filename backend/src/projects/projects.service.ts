import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  findAll() {
    return this.projectModel.find().exec();
  }

  findOne(id: string) {
    return this.projectModel.findById(id).exec();
  }

  async addImage(id: string, image: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .exec();
    project.planos.push(image);
    return project.save();
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
