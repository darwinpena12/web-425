import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterBuilderComponent } from './character-builder.component';
import { NgForm } from '@angular/forms';

describe('CharacterBuilderComponent', () => {
  let component: CharacterBuilderComponent;
  let fixture: ComponentFixture<CharacterBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterBuilderComponent]
  }).compileComponents();

    fixture = TestBed.createComponent(CharacterBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update character name through two-way binding', () => {
    const nameInput: HTMLInputElement = 
      fixture.nativeElement.querySelector('[data-testid="character-name"]');
    nameInput.value = 'Pepe';
    nameInput.dispatchEvent(new Event('input'));

    expect(component.character.name).toBe('Pepe');
  });

  it('should not add a character when the form is invalid', () => {
    const invalidForm = {
      invalid: true
    } as NgForm;

    component.addCharacter(invalidForm);

    expect(component.characters.length).toBe(0);
  });

  it('should add a character with calculated starting hit points', () => {
    component.character = {
      name: 'Pepe',
      characterClass: 'Warrior',
      level: 10,
      veteran: true,
      startingHitPoints: 50
    };

    const validForm = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm')
    } as unknown as NgForm;

    component.addCharacter(validForm);

    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Pepe');
    expect(component.characters[0].characterClass).toBe('Warrior');
    expect(component.characters[0].level).toBe(10);
    expect(component.characters[0].veteran).toBe(true);
    expect(component.characters[0].startingHitPoints).toBe(20);
  });

  it('should reset the character model and form after succesful submission', () => {
    component.character = {
      name: 'Pepe',
      characterClass: 'Warrior',
      level: 10,
      veteran: true,
      startingHitPoints: 50
    };

    const resetForm = jasmine.createSpy('resetForm');
    const validForm = {
      invalid: false,
      resetForm
    } as unknown as NgForm;

    component.addCharacter(validForm);

    expect(component.character).toEqual({
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
      startingHitPoints: 11
    });

    expect(resetForm).toHaveBeenCalledWith(component.character);
    expect(component.characters.length).toBe(1);
  });
});


