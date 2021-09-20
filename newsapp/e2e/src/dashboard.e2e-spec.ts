import { browser, logging } from 'protractor';
import { getMaxListeners } from 'cluster';
import { DashboardPage } from './dashboard.po';
describe('Dashboard TEST', () => {
  let page: DashboardPage;
  beforeEach(() => {
    page = new DashboardPage();
    page.navigateToDashboard();
  });

    // navbar
it('should check navbar in dashboard page', () => {
    page.navigateToDashboard();
    expect(page.isnavPresent()).toBeTruthy('<navbar> should exist in dashboard.component.html');
  });

    // footer
    it('should check footer is present dashboard page', () => {
        page.navigateToDashboard();
        expect(page.isfooterPresent()).toBeTruthy('<footer> should exist in  dashboard.component.html');
       });
      // div
       it('should check div is present dashboard page', () => {
        page.navigateToDashboard();
        expect(page.isdivpresent()).toBeTruthy('<div> should exist in  dashboard.component.html');
      });
});