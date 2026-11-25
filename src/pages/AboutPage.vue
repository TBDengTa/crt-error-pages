<script setup lang="ts">
import { useI18n } from '@/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
const repositoryUrl = 'https://github.com/TBDengTa/crt-error-pages'

const features = [
  'about.feature.crt',
  'about.feature.http',
  'about.feature.custom',
  'about.feature.i18n',
]

const routes = [
  { path: '/{code}', description: 'about.routes.http' },
  { path: '/custom?type={type}', description: 'about.routes.custom' },
  { path: '/about', description: 'about.routes.about' },
]
</script>

<template>
  <div class="crt-screen">
    <div class="crt-terminal about-terminal overflow-y-auto">
      <div class="space-y-8 sm:space-y-10 pb-32">
        <header class="space-y-4">
          <p class="crt-text-dim font-mono text-xs sm:text-sm">&gt; OPEN SOURCE / MIT LICENSE / V1.0.0</p>
          <h1 class="crt-text-bright font-mono font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight select-none">
            {{ t('about.title') }}
          </h1>
          <p class="crt-text font-mono text-sm sm:text-base leading-relaxed">
            <span class="crt-text-dim">&gt; </span>{{ t('about.intro') }}
          </p>
        </header>

        <section class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.features') }}</h2>
          <ul class="crt-text font-mono text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 space-y-2">
            <li v-for="feature in features" :key="feature">- {{ t(feature) }}</li>
          </ul>
        </section>

        <figure class="space-y-3">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.preview') }}</h2>
          <img
            src="/screenshots/desktop.png"
            :alt="t('about.preview.alt')"
            class="w-full border border-green-400/30 bg-black shadow-[0_0_30px_rgba(57,255,20,0.12)]"
          />
          <figcaption class="crt-text-dim font-mono text-xs sm:text-sm">&gt; {{ t('about.preview.caption') }}</figcaption>
        </figure>

        <section class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.quickstart') }}</h2>
          <p class="crt-text font-mono text-sm sm:text-base leading-relaxed">{{ t('about.quickstart.desc') }}</p>
          <pre class="crt-text bg-black/40 border border-green-400/20 p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">git clone https://github.com/TBDengTa/crt-error-pages.git
cd crt-error-pages
npm install
npm run dev</pre>
        </section>

        <section class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.routes') }}</h2>
          <div class="space-y-3 font-mono text-xs sm:text-sm">
            <div v-for="route in routes" :key="route.path" class="space-y-1">
              <p class="crt-link break-all">{{ route.path }}</p>
              <p class="crt-text-dim pl-4">{{ t(route.description) }}</p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.params') }}</h2>
          <p class="crt-text font-mono text-sm sm:text-base leading-relaxed">{{ t('about.params.desc') }}</p>
          <p class="crt-text-dim font-mono text-xs sm:text-sm break-all">?title=...&amp;message=...&amp;code=...&amp;home_url=...&amp;contact_url=...&amp;lang=zh-CN</p>
        </section>

        <section class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.config') }}</h2>
          <p class="crt-text font-mono text-sm sm:text-base leading-relaxed">{{ t('about.config.desc') }}</p>
          <pre class="crt-text bg-black/40 border border-green-400/20 p-4 overflow-x-auto font-mono text-xs sm:text-sm">VITE_ALLOWED_DOMAINS=example.com,www.example.com</pre>
        </section>

        <section class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.deploy') }}</h2>
          <p class="crt-text font-mono text-sm sm:text-base leading-relaxed">{{ t('about.deploy.desc') }}</p>
          <pre class="crt-text bg-black/40 border border-green-400/20 p-4 overflow-x-auto font-mono text-xs sm:text-sm">npm run build
# Deploy dist/ and configure SPA fallback to index.html</pre>
        </section>

        <section class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.license') }}</h2>
          <p class="crt-text font-mono text-sm sm:text-base leading-relaxed">{{ t('about.license.desc') }}</p>
        </section>

        <section id="support" class="space-y-4">
          <h2 class="crt-text-bright font-mono font-bold text-lg sm:text-xl">&gt; {{ t('about.support') }}</h2>
          <p class="crt-text font-mono text-sm sm:text-base leading-relaxed">{{ t('about.support.desc') }}</p>
          <a :href="`${repositoryUrl}/issues`" target="_blank" rel="noopener noreferrer" class="crt-link font-mono text-sm sm:text-lg break-all">
            &gt; {{ t('about.repository') }}
          </a>
        </section>

        <a href="/404" class="crt-link font-mono text-sm sm:text-base">&gt; [{{ t('about.return') }}]</a>
      </div>
    </div>

    <div class="crt-overlay"></div>
    <svg class="crt-noise" xmlns="http://www.w3.org/2000/svg">
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  </div>

  <div class="lang-bar">
    <LanguageSwitcher />
  </div>
</template>
