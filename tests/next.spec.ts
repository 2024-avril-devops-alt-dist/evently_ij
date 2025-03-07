import { test, expect } from '@playwright/test';

test.describe('Responsive Visual Regression', () => {
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 1366, height: 768, name: 'laptop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ];

  for (const viewport of viewports) {
    test(`Test visuel sur ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // Ouvre la page et navigue vers l'image
      await page.goto('https://github.com/i-jni/evently_ij');
      await page.getByRole('link', { name: 'public, (Directory)' }).click();
      await page.getByRole('link', { name: 'images, (Directory)' }).click();
      await page.getByRole('link', { name: 'qrcode.avif, (File)' }).click();

      // Capture et vérifie le screenshot
      await expect(page).toHaveScreenshot(`screenshot-${viewport.name}.png`, {
        threshold: 1, // Tolérance de 100% (trop élevé, essaye 0.1)
      });
    });
  }
});
