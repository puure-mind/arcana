import { expect, test } from "@playwright/test";

test("main scene matches the approved desktop design", async ({ page }) => {
  await page.goto("/");

  const scene = page.getByTestId("main-scene");
  await expect(scene).toHaveAttribute("data-ready", "true", { timeout: 15_000 });
  await expect(page).toHaveScreenshot("desktop-main.png", {
    fullPage: true,
  });
});
