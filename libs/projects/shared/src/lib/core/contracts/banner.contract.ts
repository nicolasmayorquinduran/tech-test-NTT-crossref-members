import { EventEmitter } from '@angular/core';

export interface BannerComponentContract {
  memberName?: string;
  isAuthenticated: boolean;
  viewWorks: EventEmitter<void>;
}
