
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTacosComponent } from './featured-tacos.component';

describe('FeaturedTacosComponent', () => {
  let component: FeaturedTacosComponent;
  let fixture: ComponentFixture<FeaturedTacosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedTacosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedTacosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display four featured tacos with their information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tacoCards = compiled.querySelectorAll('.w4-grid article');

    expect(tacoCards.length).toBe(4);

    component.tacos.forEach((taco) => {
      const card = Array.from(tacoCards).find((element) =>
        element.querySelector('h2')?.textContent?.trim() === taco.name
      );

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(taco.description);
      expect(card?.textContent).toContain(taco.label);
      expect(card?.textContent).toContain(
        taco.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      );
    });
  });

  it('should display Carne Asada as the Chef\'s Pick', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chefPick = compiled.querySelector('aside[aria-labelledby="chef-pick-heading"]');

    expect(component.chefPick?.name).toBe('Carne Asada');
    expect(chefPick).toBeTruthy();
    expect(chefPick?.textContent).toContain('Chef\'s Pick');
    expect(chefPick?.textContent).toContain('Carne Asada');
  });
});
