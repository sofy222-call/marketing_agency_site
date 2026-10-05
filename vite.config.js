import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({

  base: './',

  build: {
    rollupOptions: {
      input: {
        main: resolve(
          process.cwd(),
          'index.html'
        ),

        profile: resolve(
          process.cwd(),
          'profile.html'
        )
      }
    }
  }

})