import { Component } from '@angular/core';
import { AppState, globals } from './shared/appState';
import { Store, select } from '@ngrx/store';

@Component({
    selector: 'app-root',
    template: 'TEST'
})
export class AppComponent {

    constructor(private store: Store<AppState>) {
        this.store.pipe(select(globals))
            .subscribe(console.log);
    }
}
