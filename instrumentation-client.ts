import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_TOKEN!, {
  api_host: '/ingest',
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
  capture_pageview: 'history_change', // Auto-capture SPA page views
  capture_pageleave: true,            // Track when users leave the page
})
