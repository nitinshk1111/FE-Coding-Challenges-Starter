import { mockProvider } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { GoBackComponent } from './go-back.component';

const mockGoTo = jest.fn();

describe('GoBackComponent', () => {
  let spectator: Spectator<GoBackComponent>;
  let component: GoBackComponent;

  const createComponent = createComponentFactory({
    component: GoBackComponent,
    imports: [],
    declarations: [],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
