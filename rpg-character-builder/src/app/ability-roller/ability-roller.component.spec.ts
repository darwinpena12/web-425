import { ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute } from '@angular/router';
import { AbilityRollerComponent } from './ability-roller.component';
import { DiceService } from '../dice.service';

describe('AbilityRollerComponent', ()=> {
  let component: AbilityRollerComponent;
  let fixture: ComponentFixture<AbilityRollerComponent>;
  let diceService: jasmine.SpyObj<DiceService>;

  beforeEach(async ()=> {
    diceService = jasmine.createSpyObj('DiceService', ['roll']);
    diceService.roll.and.returnValue(4);

    await TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        {
          provide: DiceService,
          useValue: diceService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '6'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbilityRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', ()=>{
    expect(component).toBeTruthy();
  });

  it('should call DiceService when rolling an ability', () => {
    component.rollAbility();
    expect(diceService.roll).toHaveBeenCalledWith(6);
  });

  it('should use 6 and warn when the route value is invalid', ()=> {
    const warnSpy = spyOn(console, 'warn');

    TestBed.resetTestingModule();

    const invalidDiceService = jasmine.createSpyObj('DiceService', ['roll']);
    invalidDiceService.roll.and.returnValue(4);

    TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        {
          provide: DiceService,
          useValue: invalidDiceService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'banana'
              }
            }
          }
        }
      ]
    });

    const invalidFixture =
      TestBed.createComponent(AbilityRollerComponent);
    const invalidComponent = invalidFixture.componentInstance;

    invalidComponent.rollAbility();

    expect(invalidDiceService.roll).toHaveBeenCalledWith(6);
    expect(warnSpy).toHaveBeenCalledTimes(1);

    warnSpy.and.callThrough();
  });


});
