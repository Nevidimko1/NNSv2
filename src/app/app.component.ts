import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-units-table class="d-flex flex-column"></app-units-table>
    `,
    styles: [`
        :host {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
    `]
})
export class AppComponent {

}
