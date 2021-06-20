import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let apolloSpy: any;
  let valueChanges$ = new Subject<{ data: {
    menu: { id:string, name:string, items: { name: string, price: number }[] }[]
  } }>();

  beforeEach(waitForAsync(() => {
    apolloSpy = jasmine.createSpyObj('Apollo', ['watchQuery']);
    apolloSpy.watchQuery.and.returnValue({
      valueChanges: valueChanges$.asObservable()
    });
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        {
          provide: Apollo,
          useValue: apolloSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should show items from api', fakeAsync(()=> {
    valueChanges$.next({
      data: {
        menu: [
          {
            id: '1',
            name: 'Chicken Starters',
            items: [
              {
                name: 'Pahari Chicken',
                price: 150
              },
              {
                name: 'Tandoori Chicken',
                price: 100
              },
              {
                name: 'Malai Tikka',
                price: 20
              } 
            ]
          }
        ]
      }
    });
    fixture.detectChanges();
    flush();
    const firstMenuName = fixture.debugElement.queryAll(By.css('h1'))[0];
    const nativeElement = firstMenuName.nativeElement as HTMLElement;
    expect(nativeElement.innerText).toEqual('Chicken Starters');
    
    const firstItemName = fixture.debugElement.queryAll(By.css('.item'))[0];
    const nativeElementItem = firstItemName.nativeElement as HTMLElement;
    expect(nativeElementItem.innerText).toEqual('Pahari Chicken - 150');
  }));


  it('should change when data changes after a while', fakeAsync(()=> {
    valueChanges$.next({
      data: {
        menu: [
          {
            id: '1',
            name: 'Chicken Starters',
            items: [
              {
                name: 'Pahari Chicken',
                price: 150
              },
              {
                name: 'Tandoori Chicken',
                price: 100
              },
              {
                name: 'Malai Tikka',
                price: 20
              } 
            ]
          }
        ]
      }
    });
    fixture.detectChanges();

    const firstMenuName = fixture.debugElement.queryAll(By.css('h1'))[0];
    const nativeElement = firstMenuName.nativeElement as HTMLElement;
    expect(nativeElement.innerText).toEqual('Chicken Starters');
    
    const itemElements = fixture.debugElement.queryAll(By.css('.item'));
    expect(itemElements.length).toEqual(3);

    setTimeout(()=> {
      valueChanges$.next({
        data: {
          menu: [
            {
              id: '1',
              name: 'Chicken Starters',
              items: [
                {
                  name: 'Pahari Chicken',
                  price: 150
                },
                {
                  name: 'Tandoori Chicken',
                  price: 100
                }
              ]
            }
          ]
        }
      });
    }, 3000);
    
    tick(1000);

    const itemElements3 = fixture.debugElement.queryAll(By.css('.item'));
    expect(itemElements3.length).toEqual(3);


    tick(4000);
    fixture.detectChanges();

    const itemElements2 = fixture.debugElement.queryAll(By.css('.item'));
    expect(itemElements2.length).toEqual(2);
  }));
});
