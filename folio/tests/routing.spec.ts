import { test, expect } from '@playwright/test'

test('should navigate to the dashboard (logged out) page', async ({ page }) => {
    // Start from the root page
    await page.goto('/')
    // The URL should be "/" (baseURL is used there)
    await expect(page).toHaveURL('http://localhost:3000')
    // The new page should contain an h1 with "FOLIO"
    await expect(page.locator('main > div > div > h1')).toContainText('FOLIO')
})

test('should see navbar (logged out)', async ({ page }) => {
    // Start from the root page
    await page.goto('/')
    // The URL should be "/" (baseURL is used there)
    await expect(page).toHaveURL('http://localhost:3000')
    // The new page should contain the "CREATE" button found in 
    await expect(page.locator('main > div > a')).toContainText('CREATE')
})

test('should be able to login and see dashboard page when logged in', async ({ page }) => {
    // Start from the root page
    await page.goto('/')
    // The URL should be "/" (baseURL is used there)
    await expect(page).toHaveURL('http://localhost:3000')
    // Should be able to click "CREATE" and go to next page
    await page.getByText('CREATE').click()
    // The new page should be the sign-in page
    await expect(page).toHaveURL('http://localhost:3000/login')
    // The new page should click Sign in button
    await page.getByPlaceholder('Email').fill('john.doe@gmail.com')
    await page.getByPlaceholder('Password').fill('12345')
    await page.getByText('Login').click()
    // The page should be the logged in dashboard
    await expect(page).toHaveURL('http://localhost:3000/dashboard')
    // Then page should show the sidebar with text "FOLIO"
    await expect(page.locator('main > div > div > h1')).toContainText('FOLIO')
})