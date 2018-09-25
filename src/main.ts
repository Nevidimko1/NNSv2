import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const location = window.location.href.match(/view\/(\d+)(\/[a-zA-Z_]+)?(\/[a-zA-Z_]+)?/),
  unitListMain = location && (!location[2] || location[2] === '/unit_list'),
  nns = unitListMain && location[3] === '/nns';

if (unitListMain) {
  const tabs = document.querySelectorAll('.tabu li') as any as HTMLElement[];
  const nnsTab = tabs[0].cloneNode(true) as HTMLElement;
  nnsTab.querySelector('a').href += '/nns';
  nnsTab.querySelector('a').textContent = 'NNS';
  nnsTab.classList.add('nns-tab');
  nnsTab.classList.remove('sel');
  document.querySelector('.tabu').appendChild(nnsTab);

  if (nns) {
    // remove selected tab classes
    tabs.forEach(el => el.classList.remove('sel'));
    // keep nns tab selected
    nnsTab.classList.add('sel');
  }
}

function r(f) {
  /in/.test(document.readyState) ? setTimeout(() => r(f), 9) : f();
}

r(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
