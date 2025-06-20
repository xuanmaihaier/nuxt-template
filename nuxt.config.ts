// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-01-10",
  devtools: { enabled: false },
  features: {
    inlineStyles: false,
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  runtimeConfig: {
    apiSecret: "jjfa85093fjKFJ_42)(_",
    public: {
      baseUrl: "",
      deepseekApiKey: process.env.NUXT_PUBLIC_DEEPSEEK_API_KEY,
    },
  },
  imports: {
    dirs: ["composables/**"],
  },
  modules: [
    "@nuxt/ui",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@element-plus/nuxt",
  ],
  i18n: {
    vueI18n: "~/locales/i18n.config.ts",
    locales: ["en", "zh"],
    defaultLocale: "en",
  },
  css: ["~/assets/sass/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "NuxtTemplate营销网站",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          name: "keywords",
          content: "NuxtTemplate营销网站",
        },
        {
          name: "description",
          content:
            "NuxtTemplate 是适用于海外营销网站的入门模板。使用 Nuxt 和 TailwindCSS 构建。您可以使用此入门模板快速创建任何网站。",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/skunk.svg" }],
    },
  },
  nitro: {
    prerender: {
      routes: [],
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 3000,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/const/index.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: ["vueuc"], // 显式包含 vueuc
    },
    plugins: [AutoImport({}), Components({})],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        module: "esnext", // 支持 import.meta
        target: "esnext", // 目标 ES 版本
        moduleResolution: "node",
      },
    },
  },
});
