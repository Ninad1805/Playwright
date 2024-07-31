import type { PlaywrightTestConfig } from '@playwright/test';
import { on } from 'events';
const config : PlaywrightTestConfig={
    testMatch:["tests/recorded.test.ts"],
    use:{
        screenshot:"only-on-failure",
        headless:false,
        video: "retain-on-failure"   
    },
    reporter:[["dot"],["json",{
        outputFile:"jsonReports/jsonReports.json"
    }],["html",{
        open: "always"
    }]]
};
export default config