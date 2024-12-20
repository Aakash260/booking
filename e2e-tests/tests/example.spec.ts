import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow user to sign in", async ({ page }) => {
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
}); 

test("should allow user to register", async ({ page }) => {

  const testEmail=`test_register_${Math.floor(Math.random() * 9000)+1000}@test.com`
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign-in" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  await page.locator("[name=firstName]").fill("firstnametest")
  await page.locator("[name=lastName]").fill("lastnametest")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("password123@")
  await page.locator("[name=confirmPassword]").fill("password123@")
  await page.getByRole("button",{name:"Create Account"}).click();

  await expect(page.getByText("Register Successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign Out" })).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign-in" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign In Successfully")).toBeVisible();
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("£119 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});