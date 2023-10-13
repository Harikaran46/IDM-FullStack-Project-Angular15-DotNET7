import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';
import { AuthenticationService, UserService } from '@app/_services';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading = false;
  user: User;
  userId!:number
  userFromApi?: User;
  users: User[] = [];


  constructor( private route: ActivatedRoute,
      private userService: UserService,
      private authenticationService: AuthenticationService
  ) {
      this.user = <User>this.authenticationService.userValue;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userId = params['id'];

      this.loading = true;
      this.userService.getById(this.userId).pipe(first()).subscribe(user => {
          this.loading = false;
          this.userFromApi = user;
      });
    });
  }

  delete(id: number) {

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe(() => {
        // Optional: Perform any additional actions after successful deletion
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }
}

