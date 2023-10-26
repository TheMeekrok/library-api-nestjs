import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { BookService } from 'src/book/book.service';
import { BookDto } from './dto/book.dto';

export interface User {
  id: number;
  name: string;
  password: string;
  books: number[];
}

@Injectable()
export class UserService {
  constructor(private readonly bookService: BookService) {}

  users: User[] = [];

  getAll() {
    return this.users;
  }

  create(createUserDto: CreateUserDto) {
    const id = Date.now();

    this.users.push({
      ...createUserDto,
      id: id,
      books: [],
    });

    return id;
  }

  pickBook(bookDto: BookDto, userId: number) {
    const book = this.bookService.getById(bookDto.id);
    if (!book || book.inUse === true) {
      throw new HttpException(
        'Bad Request (Wrong book id)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.users.find((u) => u.id == userId);
    if (!user) {
      throw new HttpException(
        'Bad Request (Wrong user id)',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.books.push(book.id);

    this.bookService.setPicked(book.id);
  }

  returnBook(bookDto: BookDto, userId: number) {
    const book = this.bookService.getById(bookDto.id);
    if (!book || book.inUse === false) {
      throw new HttpException(
        'Bad Request (Wrong book id)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.users.find((u) => u.id == userId);
    if (!user) {
      throw new HttpException(
        'Bad Request (Wrong user id)',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.books = user.books.filter((b) => b !== book.id);
    this.bookService.setUnpicked(book.id);
  }
}
