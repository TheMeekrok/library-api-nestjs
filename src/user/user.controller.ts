import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BookDto } from './dto/book.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('pick/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  pickBook(@Body() bookDto: BookDto, @Param('id') userId: number) {
    return this.userService.pickBook(bookDto, userId);
  }

  @Post('return/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  returnBook(@Body() bookDto: BookDto, @Param('id') userId: number) {
    return this.userService.returnBook(bookDto, userId);
  }
}
