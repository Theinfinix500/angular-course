import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
})
export class ReactiveFormsComponent implements OnInit {
  postReactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get titleControl() {
    return this.postReactiveForm.get('title');
  }

  get bodyControl() {
    return this.postReactiveForm.get('body');
  }
  get titleRequired() {
    const errors = this.postReactiveForm.get('title')?.errors;
    return errors ? errors['required'] : null;
  }

  get bodyRequired() {
    const errors = this.postReactiveForm.get('body')?.errors;
    return errors ? errors['required'] : null;
  }

  get submittedForm() {
    return this.postReactiveForm['submitted'];
  }

  ngOnInit() {
    this.postReactiveForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });

    this.postReactiveForm.get('title').valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  handleReactiveSubmit() {
    console.log(this.postReactiveForm.value);
    console.log(this.postReactiveForm);
  }
}
