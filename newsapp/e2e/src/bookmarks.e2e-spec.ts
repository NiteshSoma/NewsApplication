import { browser, logging } from 'protractor';
import { getMaxListeners } from 'cluster';
import { BookmarksPage } from './bookmarks.po';
describe('BOOKMARKS TEST', () => {
  let page: BookmarksPage;
  beforeEach(() => {
    page = new BookmarksPage();
    page.navigateToBookmarks();
  });

    // navbar in author page
    it('should check navbar in bookmarks page', () => {
        page.navigateToBookmarks();
        expect(page.isnavPresent()).toBeTruthy('<navbar> should exist in bookmarks.component.html');
      });
      // footer
      it('should check footer is present bookmarks page', () => {
        page.navigateToBookmarks();
        expect(page.isfooterPresent()).toBeTruthy('<footer> should exist in bookmarks.component.html');
       });
      //  div
       it('should check div is present bookmarks page', () => {
        page.navigateToBookmarks();
        expect(page.isdivpresent()).toBeTruthy('<div> should exist in bookmarks.component.html');
      });
});