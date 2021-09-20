import { browser, by, element, promise, ElementFinder } from 'protractor';
export class LoginPage {
  
  getloginComponent(): ElementFinder {
    return element(by.tagName('app-login'));
  }
  navigateToLogin() {
    return browser.get('/login');
  }
  getEmailTextBox(){
    return element(by.name('email'));
  }
  getPasswordTextBox(){
    return element(by.name('password'));
  }
  
  getSubmitButton(): ElementFinder {
    return this.getloginComponent().element(by.buttonText('Login'));
  }
  
  isSubmitButtonPresent(): promise.Promise<boolean> {
    return this.getSubmitButton().isPresent();
  }

  clickSubmitButton(): promise.Promise<void> {
    return this.getSubmitButton().click();
  }
}





