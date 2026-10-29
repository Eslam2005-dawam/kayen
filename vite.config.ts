import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

declare const process: { env: Record<string, string | undefined> }

const isVercelBuild = process.env.VERCEL === '1'

export default defineConfig(({ command }) => ({
  base: command === 'serve' || isVercelBuild ? '/' : '/kayen/',
  plugins: [react(), tailwindcss()],
}))
