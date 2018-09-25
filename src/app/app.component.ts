import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NNSv2';

  constructor() {
    const tabEl = document.querySelector('.tabu li').cloneNode(true) as HTMLElement;
    tabEl.querySelector('a').href += '/nns';
    tabEl.querySelector('a').textContent = 'NNS';

    document.querySelector('.tabu').appendChild(tabEl);

    console.log(tabEl);
  }
}
