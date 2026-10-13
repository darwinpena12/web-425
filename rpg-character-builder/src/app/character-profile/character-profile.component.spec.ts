import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterProfileComponent } from './character-profile.component';

describe('CharacterProfileComponent', () => {
  let component: CharacterProfileComponent;
  let fixture: ComponentFixture<CharacterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.profileForm.invalid).toBeTrue();
  });

  it('should be invalid when no skills are selected', () => {
    component.profileForm.patchValue({
      backstory: 'A brave warrior coming from Venezuela',
      alignment: 'Lawful Good',
      homeland: 'Northreach'
    });
    expect(component.profileForm.valid).toBeFalse();
    expect(component.skillsArray.hasError('required')).toBeTrue();
  });

  it('should be valid when all required fields are completed and at least one skill is selected', () => {
    component.profileForm.patchValue({
      backstory: 'A brave warrior coming from Venezuela',
      alignment: 'Lawful Good',
      homeland: 'Northreach'
    });
    component.skillsArray.at(0).setValue(true);
    expect(component.profileForm.valid).toBeTrue();
    expect(component.skillsArray.hasError('required')).toBeFalse();
  });

  it('should save a profile with selected skill names and reset the form', () => {
    component.profileForm.patchValue({
      backstory: 'A brave warrior coming from Venezuela',
      alignment: 'Lawful Good',
      homeland: 'Northreach'
    });
    component.skillsArray.at(0).setValue(true);
    component.skillsArray.at(2).setValue(true);

    component.saveProfile();

    expect(component.profiles.length).toBe(1);
    expect(component.profiles[0]).toEqual({
      backstory: 'A brave warrior coming from Venezuela',
      alignment: 'Lawful Good',
      skills: ['Arcana', 'Survival'],
      homeland: 'Northreach'
    });

    expect(component.profileForm.value).toEqual({
      backstory: '',
      alignment: '',
      skills: [false, false, false, false],
      homeland: ''
    });
  });

  it('should display the saved profile details', () => {
    component.profileForm.patchValue({
      backstory: 'A brave warrior coming from Venezuela',
      alignment: 'Lawful Good',
      homeland: 'Northreach'
    });
    component.skillsArray.at(0).setValue(true);
    component.skillsArray.at(2).setValue(true);

    component.saveProfile();

    fixture.detectChanges();

    const profileList: HTMLElement = 
    fixture.nativeElement.querySelector('[data-testid="profile-list"]');
    expect(profileList.textContent).toContain('Lawful Good - Northreach');
    expect(profileList.textContent).toContain('Skills: Arcana, Survival');
    expect(profileList.textContent).toContain('Backstory: A brave warrior coming from Venezuela');
  });

});