import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,                 // obligatorio para standalone components
  imports: [CommonModule, RouterModule, RouterOutlet], // importa módulos necesarios
  templateUrl: './app.html',
  styleUrls: ['./app.css']          // corregido: styleUrls en plural
})
export class App {
  protected readonly title = signal('gec');
}
