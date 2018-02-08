import { TestBed, inject } from '@angular/core/testing';

import { NewBotService } from './new-bot.service';

describe('NewBotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewBotService]
    });
  });

  it('should be created', inject([NewBotService], (service: NewBotService) => {
    expect(service).toBeTruthy();
  }));
});
