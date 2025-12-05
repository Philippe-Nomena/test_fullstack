import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() body: { username: string; mdp: string }): User {
    return this.userService.create(body.username, body.mdp);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): User | undefined {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(Number(id));
  }
  @Post('login')
  login(@Body() body: { username: string; mdp: string }): User {
    return this.userService.login(body.username, body.mdp);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { username?: string; mdp?: string },
  ): User {
    return this.userService.update(Number(id), body);
  }
}
