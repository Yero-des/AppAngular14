import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  angForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
    });
  };

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = this.angForm.get('password')?.value;
      const repeat_password = control.value;

      if (password !== repeat_password) {
        return { mismatch: true };
      }

      return null;
    };
  }

  onClickSubmit(formData : any) {
    console.log(this.angForm.value);
    alert("Your email is : " + formData.email);
  }

  ngOnInit(): void {

  }

}
