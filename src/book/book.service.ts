import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export interface Book {
  title: string;
  id: number;
  inUse: boolean;
}

@Injectable()
export class BookService {
  books: Book[] = [];

  getAll() {
    return this.books;
  }

  getById(id: number) {
    return this.books.find((b) => b.id === id);
  }

  create(createBookDto: CreateBookDto) {
    const id = Date.now();

    this.books.push({
      ...createBookDto,
      id: id,
      inUse: false,
    });

    return id;
  }

  remove(id: number) {
    this.books = this.books.filter((b) => b.id != id);

    return id;
  }

  update(updateBookDto: UpdateBookDto, id: number) {
    const book = this.books.find((b) => b.id == id);
    if (!book) {
      throw new HttpException(
        'Bad Request (Wrong book id)',
        HttpStatus.BAD_REQUEST,
      );
    }

    book.title = updateBookDto.title;

    return id;
  }

  setPicked(id: number) {
    const book = this.books.find((b) => b.id === id);
    book.inUse = true;

    return id;
  }

  setUnpicked(id: number) {
    const book = this.books.find((b) => b.id === id);
    book.inUse = false;

    return id;
  }
}
