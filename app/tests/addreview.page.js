import { Selector } from 'testcafe';

class AddReviewPage {
  constructor() {
    this.pageId = '#add-review';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new review */
  async addReview(testController) {
    const name = 'Chuck Norris';
    const description = 'I been roundhousing fools since early this a.m.... these grinds really broke da mouth!!!';
    await this.isDisplayed(testController);
    // Define the new Review
    await testController.typeText('#name', name);
    await testController.typeText('#description', description);
    await testController.click('#add-review-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addReview = new AddReviewPage();
