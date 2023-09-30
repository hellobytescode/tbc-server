import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/common/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);

    const user = await createUser.save();
    return user;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(query: any) {
    return await this.userModel.findOne(query);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await '';
  }

  async updateLoginCount(userId: string, loginCount: number) {
    return await this.userModel.updateOne(
      { _id: userId },
      { loginCount: loginCount + 1 },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
