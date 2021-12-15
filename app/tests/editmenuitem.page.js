import { Selector } from 'testcafe';

class EditMenuItemPage {
  constructor() {
    this.pageId = '#edit-menu-item';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then edits a menuItem */
  async editMenuItem(testController) {
    const name = 'Cheesy Beef';
    const picture = 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2020/05/landl_big.jpg';
    const ingredients = 'Cheese, Beef, Fish Sauce';
    const price = 5;
    const vendor = 'Sam Choy Kitchen';
    await this.isDisplayed(testController);
    // Define the edited menuItem
    await testController.typeText('#name', name);
    await testController.typeText('#image', picture);
    await testController.typeText('#price', price);
    await testController.typeText('#vendor', vendor);
    await testController.typeText('#description', ingredients);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editMenuItem = new EditMenuItemPage();
