const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.iplt20.com/stats/');

    // Example: Scraping Orange Cap data
    await page.waitForSelector('.orange-cap-section');
    const orangeCapPlayers = await page.evaluate(() => {
        const players = [];
        document.querySelectorAll('.orange-cap-section .player-card').forEach(player => {
            players.push({
                name: player.querySelector('.player-name').innerText,
                runs: player.querySelector('.runs').innerText
            });
        });
        return players;
    });

    console.log(orangeCapPlayers);

    await browser.close();
})();
