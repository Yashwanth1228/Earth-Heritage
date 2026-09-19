const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_1024', width: 1024, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 }
  ];

  const artifactDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait 1 second for animations/rendering
    await page.waitForTimeout(1000);

    // Scroll to #field-stories
    const storiesLoc = page.locator('#field-stories');
    await storiesLoc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // Screenshot Stories Section
    const storiesPath = path.join(artifactDir, `stories_section_${vp.name}.png`);
    await storiesLoc.screenshot({ path: storiesPath });
    console.log(`Saved stories screenshot: ${storiesPath}`);

    // Scroll to #community-events
    const eventsLoc = page.locator('#community-events');
    await eventsLoc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // Screenshot Events Section
    const eventsPath = path.join(artifactDir, `events_section_${vp.name}.png`);
    await eventsLoc.screenshot({ path: eventsPath });
    console.log(`Saved events screenshot: ${eventsPath}`);

    // Verify Horizontal Overflow
    const overflowInfo = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      return {
        clientWidth: docWidth,
        scrollWidth: scrollWidth,
        bodyScrollWidth: bodyScrollWidth,
        hasOverflow: scrollWidth > docWidth || bodyScrollWidth > docWidth
      };
    });
    console.log(`Viewport ${vp.name} overflow check:`, overflowInfo);

    await context.close();
  }

  await browser.close();
  console.log('All verifications complete.');
})();
