import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { DB_CONNECTION } from '../db/database.provider';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: DB_CONNECTION,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
