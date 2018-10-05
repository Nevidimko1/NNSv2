import { AppState } from '../../../shared/appState';
import { Store } from '@ngrx/store';

export class SectionComponent {
    constructor(
        protected store: Store<AppState>,
        private actions: any
    ) { }

    toggle = (expand: boolean): void => this.store.dispatch({ type: this.actions.UPDATE_EXPAND, payload: expand });
}
