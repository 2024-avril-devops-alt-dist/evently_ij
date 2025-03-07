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
      // Définir la taille de l'écran avant de naviguer
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      await page.goto('http://localhost:3000/');
      
        // Utiliser des data-testid (recommandé)
    if (viewport.width <= 375) {
        await page.locator('[data-testid="mobile-menu-button"]').click();
        await page.locator('[data-testid="target-action-mobile"]').click();
    } else {
        await page.locator('[data-testid="target-action-desktop"]').click();
    }
      
      // Attendre que la page soit stable
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot(`screenshot-${viewport.name}.png`, {
        threshold: 0.1,
      });
    });
  }
});