import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CharacterProfile } from '../models/character-profile';
import { ProfileOption } from '../models/character-profile';

@Component({
  selector: 'app-character-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Character Profile</h1>

    <form
      [formGroup]="profileForm"
      (ngSubmit)="saveProfile()"
      data-testid="profile-form"
    >
      <div>
        <label for="backstory">Character Backstory:</label>
        <textarea
          id="backstory"
          formControlName="backstory"
          data-testid="backstory"
          placeholder="Describe your character's story..."
        ></textarea>
      </div>
      <fieldset data-testid="alignment-group">
        <legend>Alignment:</legend>

        @for (option of alignments; track option.id) {
          <div>
            <input
              type="radio"
              [id]="option.id"
              name="alignment"
              formControlName="alignment"
              [value]="option.label"
            />
            <label [for]="option.id">{{ option.label }}</label>
          </div>
        }
      </fieldset>

      <fieldset data-testid="skill-options" formArrayName="skills">
        <legend>Skills:</legend>

        @for (skill of skills; track skill.id; let i = $index) {
          <div>
            <input
              type="checkbox"
              [id]="skill.id"
              [formControlName]="i"
            />
            <label [for]="skill.id">{{ skill.label }}</label>
          </div>
        }
      </fieldset>

      <div>
        <label for="homeland">Homeland:</label>
        <select
          id="homeland"
          formControlName="homeland"
          data-testid="homeland"
        >
          <option value="">Select a homeland</option>
          @for (homeland of homelands; track homeland.id) {
            <option [value]="homeland.label">{{ homeland.label }}</option>
          }
        </select>
      </div>

      <button
        type="submit"
        [disabled]="profileForm.invalid"
        data-testid="profile-submit"
      >
        Save Profile
      </button>
    </form>

    <section data-testid="profile-list">
      <h2>Saved Character Profiles</h2>

      @for (profile of profiles; track $index) {
        <article>
          <h3>{{ profile.alignment }} - {{ profile.homeland }}</h3>
          <p>Skills: {{ profile.skills.join(', ') }}</p>
          <p>Backstory: {{ profile.backstory }}</p>
        </article>
      } @empty {
        <p>No profiles saved yet.</p>
      }
    </section>
    
  `
})
export class CharacterProfileComponent {
  private fb = inject(FormBuilder);
  
  alignments: ProfileOption[] = [
    { id: 'lawful-good', label: 'Lawful Good' },
    { id: 'neutral-good', label: 'Neutral Good' },
    { id: 'chaotic-good', label: 'Chaotic Good' }
  ];

  skills: ProfileOption[] = [
    { id: 'arcana', label: 'Arcana' },
    { id: 'athletics', label: 'Athletics' },
    { id: 'survival', label: 'Survival' },
    { id: 'stealth', label: 'Stealth' }
  ];

  homelands: ProfileOption[] = [
    { id: 'northreach', label: 'Northreach' }
  ];

  profileForm: FormGroup<{
    backstory: FormControl<string | null>;
    alignment: FormControl<string | null>;
    skills: FormArray<FormControl<boolean | null>>;
    homeland: FormControl<string | null>;
  }> = this.fb.group({
    backstory: ['', Validators.required],
    alignment: ['', Validators.required],
    skills: this.fb.array(
      this.skills.map(() => this.fb.control(false)),
      this.requireAtLeastOneSkill
    ),
    homeland: ['', Validators.required]
  });
  profiles: CharacterProfile[] = [];

  requireAtLeastOneSkill(control: AbstractControl): { [key: string]: boolean } | null {
    const skillsArray = control as FormArray<FormControl<boolean | null>>;
    
    const hasSelectedSkill = skillsArray.controls.some(
      skill => skill.value === true
    );
    return hasSelectedSkill ? null : { required: true };
  }

  get skillsArray(): FormArray<FormControl<boolean | null>> {
    return this.profileForm.controls.skills;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const selectedSkills = this.skills
      .filter((skill, index) => this.skillsArray.at(index).value === true)
      .map(skill => skill.label);

    const formValue = this.profileForm.getRawValue();
    const profile: CharacterProfile = {
      backstory: formValue.backstory!,
      alignment: formValue.alignment!,
      skills: selectedSkills,
      homeland: formValue.homeland!
    };

    this.profiles.push(profile);

    this.profileForm.reset({
      backstory: '',
      alignment: '',
      skills: this.skills.map(() => false),
      homeland: ''
    });
  }
}