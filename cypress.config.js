module.exports = {
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {

    },
      "reporter": "mochawesome",
      "reporterOptions": {
          "reportDir": "mochawesome-report",
          "overwrite": true,
          "html": true,
          "json": false
      }
  },
  
}
