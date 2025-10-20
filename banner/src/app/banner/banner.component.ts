import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BannerComponentContract } from 'shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements BannerComponentContract {
  @Input() memberName?: string;
  @Input() isAuthenticated = false;
  @Output() viewWorks = new EventEmitter<void>();

  get bannerTitle(): string {
    return this.memberName && this.memberName.trim().length > 0
      ? `Bienvenido ${this.memberName}`
      : 'Bienvenido a las organizaciones miembro de Crossref';
  }

  get bannerMessage(): string {
    return this.isAuthenticated
      ? 'Explora tus investigaciones como organización de investigación miembro'
      : 'Inicia sesión primero para ver tus artículos de investigación';
  }

  onViewWorks(event: Event): void {
    event.preventDefault();
    this.viewWorks.emit();
  }
}
