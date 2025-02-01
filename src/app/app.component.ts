import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userService = inject(UserService);
  constructor() {
    const user = this.userService.getUserFromStorage();
    if (!user) {
      const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
      const randomName = `user_${randomNumber}`;
      this.userService.createUser(randomName).subscribe((user) => {
        console.log('user created', user);
        this.userService.saveUserToStorage(user);
      });
    }
  }
}
