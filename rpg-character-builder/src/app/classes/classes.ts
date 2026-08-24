import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterClass } from '../models/character-class';

@Component({
  selector: 'classes-page',
  imports: [RouterLink],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class ClassesComponent {
  classes: CharacterClass[] = [
    {
      id: 'fighter',
      name: 'Fighter',
      description: 'A durable combat specialist suited to close-range encounter.'
    },
    {
      id: 'wizard',
      name: 'Wizard',
      description: 'A spellcaster who specializes in powerful arcane magic.'
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'A stealth character who relies on speed and precision.'
    }
  ];

}
