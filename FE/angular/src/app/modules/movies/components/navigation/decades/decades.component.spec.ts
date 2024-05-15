import { NavigationEnd, Router } from '@angular/router';
import { mockProvider, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { Subject, of } from 'rxjs';
import { DecadesComponent } from './decades.component';

const mockEvents = of([]);
const mockRouter = mockProvider(Router, {
  events: mockEvents as unknown as NavigationEnd
});

describe('DecadesComponent', () => {
  let spectator: Spectator<DecadesComponent>;
  let component: DecadesComponent;
  const createComponent = createComponentFactory({
    component: DecadesComponent,
    imports: [],
    declarations: [],
    providers: [mockRouter],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        currDecade: 2000,
        decades: [1980, 1990, 2000, 2010]
      }
    });
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    test('should define links', () => {
      expect(component.links?.length).toBeTruthy();
    });
    test('should set currDecade link to be active', () => {
      expect(component.links.find(({ isActive }) => !!isActive)?.label).toBe(`${component.currDecade}'s`);
    });
  });

  describe('passDecade', () => {
    let emitSpy: jest.SpyInstance;
    beforeEach(() => {
      emitSpy = jest.spyOn(component.updateDecade, 'emit');
      component.ngOnInit();
      component.passDecade({ label: "1990's", isActive: false, index: 2 });
    });
    test('should update which link is active', () => {
      expect(component.links.find(({ isActive }) => !!isActive)?.label).toBe("1990's");
    });
    test('should emit selected decade', () => {
      expect(emitSpy).toBeCalledWith(1990);
    });
    test('should emit `All` decade', () => {
      component.passDecade({ label: 'All', isActive: false, index: 0 });
      expect(emitSpy).toBeCalledWith(undefined);
    });
  });

  test('should check current url by subscribe to router events', () => {
    const mockRouter = spectator.inject(Router);
    const eventsSubject = new Subject<Event>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (mockRouter as any).events = eventsSubject.asObservable();
    spectator.component.ngOnInit();

    const expectedUrl = '/example-url';
    const navigationEndEvent = new NavigationEnd(1, expectedUrl, expectedUrl);
    eventsSubject.next(navigationEndEvent as unknown as Event);
    expect(spectator.component.currentUrl).toBe('/example-url');
  });
});
