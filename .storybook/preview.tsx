import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { KozueProvider, en, es } from '../src/i18n'
import '@fontsource-variable/outfit'
import '@fontsource-variable/geist'
import '../src/styles/preset.css'

const catalogs = { es, en }

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Idioma de los textos del sistema',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'es', title: 'Español' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { locale: 'es' },
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'centered',
  },
  decorators: [
    (Story, ctx) => (
      <KozueProvider messages={catalogs[(ctx.globals.locale as 'es' | 'en') ?? 'es']}>
        <div
          className="bg-background text-foreground"
          style={{
            minHeight: ctx.parameters.layout === 'fullscreen' ? '100vh' : undefined,
            padding: ctx.parameters.layout === 'fullscreen' ? 0 : 24,
          }}
        >
          <Story />
        </div>
      </KozueProvider>
    ),
    withThemeByClassName({
      themes: { dark: 'dark', light: 'light', paper: 'paper', violet: 'violet' },
      defaultTheme: 'dark',
    }),
  ],
}

export default preview
