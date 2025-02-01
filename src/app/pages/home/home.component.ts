import { Component, inject, signal } from '@angular/core';
import { CommentFormComponent } from "../../components/comment-form/comment-form.component";
import { CommentComponent } from "../../components/comment/comment.component";
import { CommentService } from '../../service/comment.service';
import { UserService } from '../../service/user.service';
import { Comment } from '../../interface/comment.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommentFormComponent, CommentComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  userService = inject(UserService);
  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService
      .createComment({
        text,
        userId: user._id,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }

  commentTrackBy(_index: number, comment: Comment) {
    return comment._id;
  }
}
