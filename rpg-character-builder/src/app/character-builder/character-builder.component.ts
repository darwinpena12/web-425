import { Component } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Character } from '../models/character';

@Component({
    selector: 'app-character-builder',
    standalone: true,
    imports: [FormsModule],
    template:`
      <h1>Character Builder</h1>

      <form 
        #characterForm="ngForm"
        (ngSubmit)="addCharacter(characterForm)"
        data-testid="character-form"
      >
        <label for="character-name">Character Name:</label>
        <input
          id="character-name"
          type="text"
          name="name"
          [(ngModel)]="character.name"
          required
          data-testid="character-name"
          />
        <label for="character-class">Character Class:</label>
        <select
          id="character-class"
          name="characterClass"
          [(ngModel)]="character.characterClass"
          required
          data-testid="character-class"
        >
          <option value="">Select a class</option>
          <option value="Warrior">Warrior</option>
          <option value="Wizard">Wizard</option>
          <option value="Rogue">Rogue</option>
          <option value="Cleric">Cleric</option>
        </select>

        <label for="character-level">Character Level:</label>

        <input
          id="character-level"
          type="number"
          name="level"
          [(ngModel)]="character.level"
          required
          min="1"
          max="20"
          step="1"
          data-testid="character-level"
        />

        <label for="character-veteran">Veteran:</label>
        <input
          id="character-veteran"
          type="checkbox"
          name="veteran"
          [(ngModel)]="character.veteran"
          data-testid="character-veteran"
        />

        <button
          type="submit"
          [disabled]="characterForm.invalid"
          data-testid="character-submit"
        >
          Create Character
        </button>
      </form>

      <section data-testid="character-list">
        <h2>Created Characters</h2>

        @for (createdCharacter of characters; track $index) {
          <article>
            <h3>{{ createdCharacter.name }}</h3>
            <p>Class: {{ createdCharacter.characterClass }}</p>
            <p>Level: {{ createdCharacter.level }}</p>
            <p>Veteran: {{ createdCharacter.veteran ? 'Yes' : 'No' }}</p>
            <p>Starting Hit Points: {{ createdCharacter.startingHitPoints }}</p>
          </article>
        } @empty {
          <p>No characters created yet.</p>
        }
      </section>
      `
})

export class CharacterBuilderComponent {
  character: Character = {
    name: '',
    characterClass: '',
    level: 1,
    veteran: false,
    startingHitPoints: 11
  };

  characters: Character[] = [];

  addCharacter(form: NgForm): void {
    if (form.invalid || !Number.isInteger(this.character.level) || this.character.level <1 || this.character.level > 20){
      return;
    }
    this.character.startingHitPoints = 10 + this.character.level;
    this.characters.push({ ...this.character });

    this.resetCharacter();

    form.resetForm(this.character);
  }

  resetCharacter(): void{
    this.character = {
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
      startingHitPoints: 11
    };
  }
}