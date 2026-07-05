/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/Fifty_assistant/precache-manifest.e1a5f397850544a16337d5c1a9e37115.js"
);

workbox.core.setCacheNameDetails({prefix: "gojuuon_helper"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/Fifty_assistant/index.html"));

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|gif)$/, new workbox.strategies.CacheFirst({ "cacheName":"gojuuon-images", plugins: [new workbox.expiration.Plugin({ maxEntries: 100, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:m4a|mp3|wav)$/, new workbox.strategies.CacheFirst({ "cacheName":"gojuuon-audio", plugins: [new workbox.expiration.Plugin({ maxEntries: 50, maxAgeSeconds: 5184000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:woff|woff2|ttf)$/, new workbox.strategies.CacheFirst({ "cacheName":"gojuuon-fonts", plugins: [new workbox.expiration.Plugin({ maxEntries: 30, maxAgeSeconds: 7776000, purgeOnQuotaError: false })] }), 'GET');
