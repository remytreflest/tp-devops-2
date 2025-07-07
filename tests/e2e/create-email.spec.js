const { test, expect } = require('@playwright/test');

test.describe('Création d\'email', () => {
  test('Soumission du formulaire email', async ({ page }) => {
    // Démarre ton serveur localement avant le test (ex: npm start)
    await page.goto('http://localhost:3000/');

    // Remplis le champ email et soumets le formulaire
    await page.fill('input[name="email"]', 'playwright-test@example.com');
    await page.click('button[type="submit"]');

    // Attend la redirection et vérifie la présence de l’email dans la liste
    await expect(page).toHaveURL(/.*submissions/);
    await expect(page.locator('ul')).toContainText('playwright-test@example.com');
  });
});
