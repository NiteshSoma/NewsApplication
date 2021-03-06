import { browser, by, element, promise, ElementFinder } from 'protractor';
export class BookmarksPage {
    navigateToBookmarks() {
        return browser.get('/bookmarks');
    }
    // navbar
    getnav(): ElementFinder {
        return element(by.css('nav'));
      }
      isnavPresent(): promise.Promise<boolean>{
        return this.getnav().isPresent();
      }
      
    // footer
    getfooter(): ElementFinder {
      return element(by.css('section'));
    }
    isfooterPresent(): promise.Promise<boolean> {
      return this.getfooter().isPresent();
    }
    getdiv(): ElementFinder {
        return element(by.css('div'));
      }
    // div
    isdivpresent(): promise.Promise<boolean> {
      return this.getdiv().isPresent();
    }
}