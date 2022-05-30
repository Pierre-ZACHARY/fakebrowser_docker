const {FakeBrowser} = require('fakebrowser');
const asleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const express = require('express')
const app = express()
const port = 3000

!(async () => {
    const windowsDD = require('fakebrowser/device-hub-demo/Windows.json');
    const builder = new FakeBrowser.Builder()
        .deviceDescriptor(windowsDD)
        .displayUserActionLayer(true)
        .vanillaLaunchOptions({
            headless: false,
            executablePath: '/usr/bin/google-chrome-stable',
        })
        .userDataDir('./fakeBrowserUserData');

    const fakeBrowser = await builder.launch()
    app.get('/', async (req, res) => {
        if('pageUrl' in req.query){
            const page = await fakeBrowser.vanillaBrowser.newPage();
            const pageUrl = req.query.pageUrl;
            let customSleep = 1000;
            if('customSleep' in req.query){
                customSleep = req.query.customSleep;
            }
            await page.goto(pageUrl);
            await asleep(customSleep);
            let content = await page.content();
            res.send(content)
            await page.close();
        }
        else{
            res.send("Missing pageUrl query param")
        }
    })
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})();