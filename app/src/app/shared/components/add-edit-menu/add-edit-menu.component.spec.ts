import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Apollo } from 'apollo-angular';

import { AddEditMenuComponent } from './add-edit-menu.component';

fdescribe('AddEditMenuComponent', () => {
  let component: AddEditMenuComponent;
  let fixture: ComponentFixture<AddEditMenuComponent>;

  beforeEach(waitForAsync(() => {
    const apolloSpy = jasmine.createSpyObj('Apollo', ['watchQuery']);

    TestBed.configureTestingModule({
      declarations: [AddEditMenuComponent],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: Apollo,
          useValue: apolloSpy
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(AddEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show add when menu id is not present', ()=> {
    const el = fixture.debugElement;
    const title = el.queryAll(By.css('ion-title'));
    expect(title[0].nativeElement.textContent).toEqual('Add Menu');
  });

  it('should show add when menu id is present', ()=> {
    component.menuId = '1234';
    fixture.detectChanges();
    const el = fixture.debugElement;
    const title = el.queryAll(By.css('ion-title'));
    expect(title[0].nativeElement.textContent).toEqual('Edit Menu');
  });
});
