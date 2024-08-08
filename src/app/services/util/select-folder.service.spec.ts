import { TestBed } from '@angular/core/testing';

import { SelectFolderService } from './select-folder.service';

describe('SelectFolderService', () => {
  let service: SelectFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
