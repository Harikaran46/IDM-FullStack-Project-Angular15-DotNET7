import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit{

    Userary : User[] = [];
    Userformgroup : FormGroup;
    user?: User;
    loading = false;
    submitted = false;
    error = '';
  successMessage?: string;

      constructor(private empservice : UserService,private fb : FormBuilder,private router: Router){
        this.Userformgroup = this.fb.group({
          //id: [""],
          firstName: ['',Validators.required,Validators.pattern(/^[A-Z][a-z]+$/)],
          lastName: ['',Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)],
          email: ['',Validators.required,Validators.email],
          username:['',Validators.required,Validators.pattern(/^[A-Za-z]*$/)],
          password: ['',Validators.required],
          role :['',Validators.required],
          salary: ['',Validators.required],
          dateOfBirth: ['',Validators.required],
          department: ['',Validators.required],
          adhaarNumber: ['',Validators.required,Validators.pattern(/^\d{12}$/)],
          address: ['',Validators.required],
          mobileNumber: ['',Validators.required,Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)],
          gender: ['',Validators.required],

        })
      }
  ngOnInit(): void {

  }

      OnSubmit(){
        if(this.Userformgroup.invalid) {
          return;
        }

        this.loading = true;
        this.submitted = true;
        console.log(this.Userformgroup.value);
        this.empservice.create(this.Userformgroup.value).subscribe(response => {
          this.successMessage = 'Form submitted successfully';
          console.log(response);
          this.router.navigate(['/admin']);
        },
        error => {
          this.loading=false;
        });
      }

    }

