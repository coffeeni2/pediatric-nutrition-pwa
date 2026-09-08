# Pediatric Nutrition PWA 0.4.1

Hotfix over 0.4.

- Fixes Safari/GitHub Pages stale 0.3 cache by using a new service-worker cache key, network-first loading for app shell, cache-busted JS/CSS URLs, skipWaiting + clients.claim, and controller-change reload.
- App footer visibly reports PWA 0.4.1 so deployed version can be verified.
- Keeps patient/case data separate from service-worker caches.

Thai FCD online connector note: the INMU site exposes interactive web search and per-food result pages, but no documented public JSON API was identified. A static GitHub Pages PWA should not scrape/circumvent the site or depend on an undocumented cross-origin endpoint. Implement the connector only through an authorised API/endpoint or a permitted server-side adapter.
