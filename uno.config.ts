import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      warn: true,
      extraProperties: {
        display: 'inline-block'
      }
    }),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        // sans: 'Roboto',
        // mono: ['Fira Code', 'Fira Mono:400,700'],
        // custom ones
        // lobster: 'Lobster',
        // lato: [
          // {
          //   name: 'Lato',
          //   weights: ['400', '700'],
          //   italic: true
          // },
          // {
          //   name: 'sans-serif',
          //   provider: 'none'
          // }
        // ]
      }
    })
  ]
})
