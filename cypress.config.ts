import { defineConfig } from "cypress";

export default defineConfig({
  env: { 
    test_user_username: 'test_user',
    test_user_password: 'BonerFart99',
    test_user_email:    'test_user@example.com'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});