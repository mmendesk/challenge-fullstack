import {
    Controller,
    Post,
    Res,
    HttpStatus,
    Body,
    Get,
    Param,
    NotFoundException,
    Delete,
    Query,
    Put
} from '@nestjs/common';
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/user.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/create')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully Created',
            user
        });
    }

    @Get('/')
    async getUsers(@Res() res) {
        const products = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(products);
    }

    @Get('/:userID')
    async getUser(@Res() res, @Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const productDeleted = await this.userService.deleteUser(userID);
        if (!productDeleted) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Deleted Successfully',
            productDeleted
        });
    }

    @Put('/update')
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Query('userID') userID) {
        const updatedUser = await this.userService.updateUser(userID, createUserDTO);
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
            updatedUser
        });
    }

}