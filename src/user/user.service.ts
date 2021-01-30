import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./interfaces/user.interface";
import { CreateUserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // Get all users
    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    // Get a single User
    async getUser(userID: string): Promise<User> {
        const user = await this.userModel.findById(userID);
        return user;
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }

    // Post a single user
    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        return newUser.save();
    }

    // Delete User
    async deleteUser(userID: string): Promise<any> {
        const deletedUser = await this.userModel.findById(userID);
        return deletedUser;
    }

    // Put a single user
    async updateUser(userID: string, createUserDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDTO, { new: true });
        return updatedUser;
    }

}