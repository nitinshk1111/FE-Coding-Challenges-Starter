import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GoImdbComponent } from './go-imdb.component';

describe('GoImdbComponent', () => {
  let spectator: Spectator<GoImdbComponent>;
  let component: GoImdbComponent;

  const createComponent = createComponentFactory({
    component: GoImdbComponent,
    imports: [],
    declarations: [],
    providers: [],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks;
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
