import { expect, test, type Page } from "@playwright/test";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.palaycheck.com";
const isLive = process.env.NEXT_PUBLIC_APP_STATUS === "live";
const SECTION_HEADINGS = [
  "Everything a farmer needs, in one scan.",
  "From leaf to answer in three steps.",
  "Six leaf conditions, recognised on the spot.",
  "See outbreaks forming before they spread.",
  "Made for the paddy, not the office.",
  "Questions farmers ask us.",
  "Check your rice before it spreads.",
];

/** Collects console errors and page errors, which also surfaces CSP violations. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

async function scrollThroughPage(page: Page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(50);
  }
}

test("renders every section without console errors", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/");

  await expect(page).toHaveTitle(/PalayCheck/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Spot rice disease in seconds, right in the field.",
  );
  await scrollThroughPage(page);
  for (const name of SECTION_HEADINGS) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test.describe("Play Store CTA", () => {
  test.skip(!isLive, "Runs when NEXT_PUBLIC_APP_STATUS=live");

  test("links safely to the Play Store listing", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('a[href*="play.google.com"]');
    // Hero, navbar, final CTA and footer (the navbar copy is hidden on phones).
    expect(await links.count()).toBeGreaterThanOrEqual(4);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", PLAY_STORE_URL);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
    await expect(
      page.getByRole("main").getByRole("img", { name: "Get it on Google Play" }).first(),
    ).toBeVisible();
  });
});

test.describe("Coming soon CTA", () => {
  test.skip(isLive, "Runs while the app is not yet on Google Play");

  test("shows a coming-soon state and never links to the unpublished listing", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href*="play.google.com"]')).toHaveCount(0);
    await expect(page.getByText("Coming soon on Google Play").first()).toBeVisible();
  });
});

test("has no horizontal scroll", async ({ page }) => {
  await page.goto("/");
  await scrollThroughPage(page);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});

test("reveals all content when the user prefers reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await scrollThroughPage(page);
  for (const name of SECTION_HEADINGS) {
    const heading = page.getByRole("heading", { level: 2, name });
    await heading.scrollIntoViewIfNeeded();
    await expect
      .poll(() => heading.evaluate((el) => getComputedStyle(el.closest("div")!).opacity))
      .toBe("1");
  }
});

test("FAQ items expand and collapse", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText("Do I need internet to use PalayCheck?");
  const answer = page.getByText(/Scanning and diagnosis run entirely on your phone/);
  await question.scrollIntoViewIfNeeded();
  await expect(answer).toBeHidden();
  await question.click();
  await expect(answer).toBeVisible();
  await question.click();
  await expect(answer).toBeHidden();
});

test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only navigation");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "FAQ" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#faq$/);
});
