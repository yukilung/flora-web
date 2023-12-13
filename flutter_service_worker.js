'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "de93df0098d7476f42c54ecb4e2c66a5",
"assets/assets/fonts/averia_libre/averialibre_bold.ttf": "378a11f21e81afc740d5fc05a95b8fcc",
"assets/assets/fonts/averia_libre/averialibre_regular.ttf": "397fb17d4f0bb66d2d249c6768071164",
"assets/assets/fonts/bree_serif/breeserif_regular.ttf": "14aaff013398c35430cc935d1e4dcd99",
"assets/assets/icons/app_logo.png": "1e54f158af061971ed6f91c8114aabd8",
"assets/assets/icons/app_logo_dark.png": "78c68fa800edc4b27d4a62ca66414f4a",
"assets/assets/icons/menu_logo.png": "1d0e2f8abff45fc38f9efea4a720f595",
"assets/assets/icons/navbar_icons/ic_home.svg": "a5566c420e7f1d5da0c8019d4ccb84a8",
"assets/assets/icons/navbar_icons/ic_home_active.svg": "4e611acc23b9f775f8d12c6999cb94c1",
"assets/assets/icons/navbar_icons/ic_mark.svg": "fc0432d5aaf9ed7e1b9839122464cd1e",
"assets/assets/icons/navbar_icons/ic_mark_active.svg": "46ecafff5efcd4aedddb8a8b473075f9",
"assets/assets/icons/navbar_icons/ic_message.svg": "7eb31e8d13031a1662cf7e8830f6702f",
"assets/assets/icons/navbar_icons/ic_message_active.svg": "36232beecb204f2a14f1a050b7f06ba2",
"assets/assets/icons/navbar_icons/ic_profile.svg": "b66225ca19862fe7dedfd639938827dc",
"assets/assets/icons/navbar_icons/ic_profile_active.svg": "a273faf0ce80b4ca99b35733db3e8703",
"assets/assets/icons/navbar_icons/ic_search.svg": "fa7436caaa60e6c65a3cdf1f965d3407",
"assets/assets/icons/navbar_icons/ic_search_active.svg": "7c39660d5f965227d812e67c793bb3cb",
"assets/assets/images/About_background.png": "77cdb3ebec7c5e613dae1243e303d222",
"assets/assets/images/AI_background.png": "17aef830e221656ed5716e5c26885659",
"assets/assets/images/apple_pay.png": "b05fa86de6799389f778801c3b1a9d18",
"assets/assets/images/facebook_login_button.png": "f00ee651553f4b307da508107be0c9d1",
"assets/assets/images/google_login_button.png": "24f9919b0d00a905de12313c61392e3c",
"assets/assets/images/google_pay.png": "93b78f6c75fa952fb651bd3aec2df4fa",
"assets/assets/images/home_background.png": "67b3f7578816de80bbc7d705e7d72880",
"assets/assets/images/Location_background.png": "0bbb92b6341d7a2f1e4e4fd0c16dd1bd",
"assets/assets/images/login_with.svg": "30a8bf6ccc6daf265ca436e05e280254",
"assets/assets/images/status_login.svg": "08add45c957ce75409d3e8d8cf8270b5",
"assets/assets/images/status_register.svg": "de3429eecaffaad6ae93a43f235c8a43",
"assets/assets/images/sub_background.png": "950c4e6de020c010750ac0318282be18",
"assets/assets/images/teamwork.jpg": "317a06576deee88232190bb3f2e04810",
"assets/assets/images/vrilustration.png": "ea7d516fc55aee1afbd7a73fad128a92",
"assets/FontManifest.json": "10d438080d51af26e0b53d40c6376366",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "a17c6cfed0cdd880e397a2589865e889",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "965e851404244d86ccd89f05187cd8c8",
"/": "965e851404244d86ccd89f05187cd8c8",
"main.dart.js": "b890c01e33cea96f7c97cb4b429c51b9",
"manifest.json": "0ceccd831badde5b973e7af798d27ec1",
"version.json": "fb800d37cb51ce25f91a8114a375508b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
