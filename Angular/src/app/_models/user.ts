import { Role } from "./role";

export interface User {
  emp(emp: any): unknown;
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password:string;
    email :string;
    salary :string;
    dateOfBirth :string;
    department :string;
     adhaarNumber :string;
     address :string;
     mobileNumber :string;
     gender :string;
    role: Role;
    token?: string;
}
