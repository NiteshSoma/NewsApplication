import { browser, logging } from 'protractor';
import { getMaxListeners } from 'cluster';
import { EverythingPage } from './everything.po';;
describe('EVERYTHING TEST', () => {
  let page:  EverythingPage;
  beforeEach(() => {
    page = new  EverythingPage();
    page.navigateToEverything();
  });
    // navbar
it('should check navbar in everything page', () => {
    page.navigateToEverything();
    expect(page.isnavPresent()).toBeTruthy('<navbar> should exist everything.component.html');
  });
//   div
it('should check div in everything page', () => {
    page.navigateToEverything();
    expect(page.isdivPresent()).toBeTruthy('<div> should exist everything.component.html');
  });
//   h1
it('should check h1 in everything page', () => {
    page.navigateToEverything();
    expect(page.ishPresent()).toBeTruthy('<h1> should exist everything.component.html');
  });


});