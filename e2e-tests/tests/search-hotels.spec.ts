import {test,expect} from "@playwright/test"
 
const UI_URL = "http://localhost:5173/"
 test.beforeEach(async ({page}) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign-in" }).click();
  
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Sign In Successfully")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign Out" })).toBeVisible();
 })

 test("should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL);
  
    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button", { name: "Search" }).click();
  
    await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
    await expect(page.getByText("Dublin Getaways")).toBeVisible();
  });
  
  test("should show hotel detail", async ({ page }) => {
   await page.goto(UI_URL);
 
   await page.getByPlaceholder("Where are you going?").fill("Dublin");
   await page.getByRole("button", { name: "Search" }).click();
 
   await page.getByText("Dublin Getaways").click();
   await expect(page).toHaveURL(/detail/);
   await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
 });
 