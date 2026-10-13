import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FeedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.feedbackForm.valid).toBeFalsy();
  });

  it('form should be valid when filled correctly', () => {
    component.feedbackForm.controls['rating'].setValue('5');
    component.feedbackForm.controls['recommend'].setValue('Yes');
    component.feedbackForm.controls['comments'].setValue('Great service!');
    expect(component.feedbackForm.valid).toBeTruthy();
  });

  it('should call leaveFeedback method on form submit', () => {
    spyOn(component, 'leaveFeedback');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.leaveFeedback).toHaveBeenCalled();
  });
});
