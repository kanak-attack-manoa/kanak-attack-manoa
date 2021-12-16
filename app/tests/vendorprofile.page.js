import { Selector } from 'testcafe';

class MakeProfilePage {
  constructor() {
    this.pageId = '#vendor-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new MenuItem */
  async addProfile(testController) {
    const name = 'Al Tepeyac';
    const picture = 'https://media-cdn.tripadvisor.com/media/photo-s/02/72/40/f4/filename-img-6789-jpg.jpg';
    // eslint-disable-next-line max-len
    const description = 'Before opening El Tepeyac Café, the Rojas family founded a restaurant in downtown Los Angeles in 1942 called El Tupinamba Café – the familys first venture into the restaurant business. The Rojas family would end up relocating to Lincoln Heights, however, where it opened another restaurant known as La Villa Café. Several years later, the family once again relocated, this time to Boyle Heights, and El Tepeyac Café was born. After the untimely death of grandfather Salvador Rojas, Manuel Rojas stepped in and, along with his mother Rebecca, developed El Tepeyac into a neighborhood favorite in East Los Angeles. In 2013, father and founder, Manuel Rojas passed away leaving his daughter Elena Rojas to carry on the El Tepeyac name. Today, Elena continues the Rojas family tradition, now a 3rd generation legacy (and soon to be 4th generation with Carlos “Chuck” Thome, who is Manuel’s grandson).';
    await this.isDisplayed(testController);
    // Define the new Vendor
    await testController.typeText('#vendor-profile-name', name);
    await testController.typeText('#vendor-profile-image', picture);
    await testController.typeText('#vendor-profile-description', description);

    await testController.click('#vendor-profile-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const makeProfilePage = new MakeProfilePage();
