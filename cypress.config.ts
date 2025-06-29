import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: false,
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    chromeWebSecurity: false,
    supportFile: false,
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--disable-features=VizDisplayCompositor");
          
        }
        return launchOptions;
      });
    },
  },
});
