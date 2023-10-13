import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/_services';
import { User } from '@app/_models/user'; // Import the User model or interface
import { first } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  userId!: number;
  loading = false;
  user !: User;
  editForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      salary: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      department: ['', Validators.required],
      adhaarNumber: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      gender: ['', Validators.required],
      // Define other form controls and validators as needed
    });

    this.route.params.subscribe(params => {
      this.userId = params['id'];

      this.loading = true;
      this.userService.getById(this.userId).pipe(first()).subscribe(user => {
        this.loading = false;
        this.user = user;
        this.editForm.patchValue({
          id :user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username:user.username,
          password:user.password,
          role:user.role,
          salary:user.salary,
          dateOfBirth:user.dateOfBirth,
          department:user.department,
          adhaarNumber:user.adhaarNumber,
          address:user.address,
          mobileNumber: user.mobileNumber,
          gender:user.gender,
          // Patch values for other form controls
        });
      });
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;
    const formValues = this.editForm.value;
    formValues.userId = this.userId;

    this.userService.edit(formValues).subscribe(
      response => {
        console.log('User updated successfully:', response);
        this.router.navigate(['/profile', this.user.id]);
        this.loading = false;
        // Handle any further actions after successful user update
      },
      error => {
        console.error('Error updating user:', error);
        this.loading = false;
        // Handle error case
      }
    );
    this.router.navigate(['/profile', this.user.id]);
  }
}
