import { Selector } from 'testcafe';

class EditVendorPage {
  constructor() {
    this.pageId = '#edit-vendor';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then edits a vendor */
  async editVendor(testController) {
    const name = `Test${new Date().getTime()}`;
    const image = 'https://manoa.hawaii.edu/food/wp-content/uploads/sites/37/2020/05/landl_big.jpg';
    const description = 'Testing';
    await this.isDisplayed(testController);
    // Define the edited vendor
    await testController.typeText('#name', name);
    await testController.typeText('#image', image);
    await testController.typeText('#description', description);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editVendor = new EditVendorPage();
