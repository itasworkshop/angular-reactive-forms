import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Address, Student, states } from '../data-model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent {

  @Input() student: Student;

  studentForm: FormGroup;
  nameChangeLog: string[] = [];
  states = states;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.studentForm = this.fb.group({
      name: '',
      secretLairs: this.fb.array([]),
      branch: '',
      extra: ''
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.studentForm.reset({
      name: this.student.name
    });
    this.setAddresses(this.student.addresses);
  }

  get secretLairs(): FormArray {
    return this.studentForm.get('secretLairs') as FormArray;
  };

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.studentForm.setControl('secretLairs', addressFormArray);
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }

  onSubmit() {
    this.student = this.prepareSaveStudent();
    this.studentService.updateStudent(this.student).subscribe(/* error handling */);
    this.rebuildForm();
  }

  prepareSaveStudent(): Student {
    const formModel = this.studentForm.value;

    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    const saveStudent: Student = {
      id: this.student.id,
      name: formModel.name as string,
      addresses: secretLairsDeepCopy
    };
    return saveStudent;
  }

  revert() { this.rebuildForm(); }

  logNameChange() {
    const nameControl = this.studentForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}