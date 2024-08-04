import type { PlaywrightTestConfig } from '@playwright/test';
import { on } from 'events';
const config : PlaywrightTestConfig={
    testDir:'./tests',
    use:{
        browserName:"chromium",
        viewport:{width: 1280, height: 720},
        screenshot:"only-on-failure",
        headless:true,
        video: "retain-on-failure", 
        actionTimeout: 15000,
        navigationTimeout:20000
    },
    reporter:[["dot"],["json",{
        outputFile:"jsonReports/jsonReports.json"
    }],["html",{
        open: "always"
    }]],
   
};
export default config