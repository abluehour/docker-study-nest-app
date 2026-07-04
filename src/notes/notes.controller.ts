import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import type { CreateNoteDto, UpdateNoteDto } from './note.dto';
import { NotesService } from './notes.service';

@Controller('api/v1/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllNotes() {
    return this.notesService.findAll();
  }

  @Get(':id')
  getNoteById(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNote(@Body() dto: CreateNoteDto) {
    return this.notesService.create(dto);
  }

  @Patch(':id')
  updateNote(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteNote(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.delete(id);
  }
}
