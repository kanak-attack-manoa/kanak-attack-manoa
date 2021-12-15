import { Selector } from 'testcafe';

class AddMenuItemPage {
  constructor() {
    this.pageId = '#add-menu-item';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new MenuItem */
  async addMenuItem(testController) {
    const name = 'Beefy Cheese';
    const picture = 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2020/05/landl_big.jpg';
    const ingredients = 'Beef, Cheese, Fish Sauce';
    const price = 4;
    const vendor = 'Grandma Kitchen';
    await this.isDisplayed(testController);
    // Define the new MenuItem
    await testController.typeText('#name', name);
    await testController.typeText('#image', picture);
    await testController.typeText('#price', price);
    await testController.typeText('#vendor', vendor);
    await testController.typeText('#description', ingredients);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addMenuItem = new AddMenuItemPage();
