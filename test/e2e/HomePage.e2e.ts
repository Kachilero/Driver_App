import { ClientFunction, Selector } from 'testcafe';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';
import { getPageUrl } from './helpers';

const getPageTitle = ClientFunction(() => document.title);
const counterSelector = Selector('[data-tid="counter"]');
const buttonsSelector = Selector('[data-tclass="btn"]');
const clickToCounterLink = t =>
  t
    .click('#header-nav-dropdown')
    .click('a[href="#/counter/counter"]');
const byFiveButton = buttonsSelector.nth(0);
const incrementButton = buttonsSelector.nth(1);
const decrementButton = buttonsSelector.nth(2);
const oddButton = buttonsSelector.nth(3);
const asyncButton = buttonsSelector.nth(4);
const getCounterText = () => counterSelector().innerText;
const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  // I only want ACTUAL errors
  if (error) {
    error.map((currVal, key) => {
      if (currVal.indexOf('error') !== -1) {
        return;
      } else {
        error.splice(key, 1);
      }
    });
  }
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('Electron React Typescript Boilerplate');
});

test('should open window', async t => {
  await t.expect(getPageTitle()).eql('Electron React Typescript Boilerplate');
});

test(
  "should haven't any logs in console of main window",
  assertNoConsoleErrors
);

test('should to Counter with click "to Counter" link', async t => {
  await waitForReact();
  await t
    .click('#header-nav-dropdown')
    .click('a[href="#/counter/counter"]')
    .expect(getCounterText())
    .eql('0');
});

test('should navigate to /counter', async t => {
  await waitForReact();
  await t
    .click('#header-nav-dropdown')
    .click('a[href="#/counter/counter"]')
    .expect(getPageUrl())
    .contains('#/counter/counter');
});


fixture`Counter Tests`
  .page('../../app/app.html')
  .beforeEach(clickToCounterLink)
  .afterEach(assertNoConsoleErrors);

test('should increment by five when By Five button is clicked', async t => {
  await t
    .click(byFiveButton)
    .expect(getCounterText())
    .eql('5');
})

test('should display updated count after increment button click', async t => {
  await t
    .click(incrementButton)
    .expect(getCounterText())
    .eql('1');
});

test('should display updated count after decrement button click', async t => {
  await t
    .click(decrementButton)
    .expect(getCounterText())
    .eql('-1');
});

test('should not change if even and if odd button clicked', async t => {
  await t
    .click(oddButton)
    .expect(getCounterText())
    .eql('0');
});

test('should change if odd and if odd button clicked', async t => {
  await t
    .click(incrementButton)
    .click(oddButton)
    .expect(getCounterText())
    .eql('2');
});

test('should change if async button clicked and a second later', async t => {
  await t
    .click(asyncButton)
    .expect(getCounterText())
    .eql('0')
    .expect(getCounterText())
    .eql('1');
});

test('should back to home if back button clicked', async t => {
  await t
    .click('[data-tid="backButton"] > a')
    .expect(getPageUrl())
    .contains('#/home/home');
});
