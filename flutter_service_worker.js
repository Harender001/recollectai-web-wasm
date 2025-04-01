'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "f7a28fa75d59abd0713998e34555be45",
"version.json": "2c43cb73335594b8bfcab9f2043503ee",
"index.html": "bfb720076b83e4ed340ee15c6c66c447",
"/": "bfb720076b83e4ed340ee15c6c66c447",
"main.dart.js": "6dace157354a32192a9f5640762e42e7",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"favicon1.png": "3adacaaf4b2ed030466292a34c6951df",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.mjs": "1d144f1b5358c2e27f24a9f13a139442",
"icons/android-chrome-192x192.png": "481e2990a84600bae3a7484aa8b88df9",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/android-chrome-512x512.png": "5e7070d25e2a43bb90d281e5f6fe1e85",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "69da959c18c0d724d1a4763886935379",
"main.dart.wasm": "bd9a57a048cf516de7904854e630dc3f",
".git/config": "f4d8c743a775be69c0b059f62ca25c0d",
".git/objects/50/08ddfcf53c02e82d7eee2e57c38e5672ef89f6": "d18c553584a7393b594e374cfe29b727",
".git/objects/57/7946daf6467a3f0a883583abfb8f1e57c86b54": "846aff8094feabe0db132052fd10f62a",
".git/objects/32/5be300965fcd42f0f90b1f8acf274b81116de9": "217f2b831326de7a6396f92b58d41a43",
".git/objects/35/96d08a5b8c249a9ff1eb36682aee2a23e61bac": "e931dda039902c600d4ba7d954ff090f",
".git/objects/5f/bf1f5ee49ba64ffa8e24e19c0231e22add1631": "f19d414bb2afb15ab9eb762fd11311d6",
".git/objects/9c/b0b83f8c45711b344d6c45d1573a453b2eced7": "4df738cd8feb28b987c28f27ccd3d4c3",
".git/objects/a4/1c77760ff4e72eda433d9683eac67c8f0a6628": "fc8eed42c740812f38428bad286f5540",
".git/objects/a4/4291eab53d231bbe3031d5d4f07a45fb23b23c": "94db609e87a7f61a383333d0fe96c4d1",
".git/objects/a3/3c6215a41c1a7890ce26b5deb8b90902b00597": "b2395d0b7c042edeb3cb5a79058fb3e7",
".git/objects/b5/20cac3eea1ff8eb4e36f5a1bae116c84ad5a8a": "0e771048a657567e9482b83faf9b3a5e",
".git/objects/b5/72cfbb7f7ad0d855c157c118b6ccf3c62a8456": "5789ca51b738b520f0377af0b32359c5",
".git/objects/d9/3952e90f26e65356f31c60fc394efb26313167": "1401847c6f090e48e83740a00be1c303",
".git/objects/ac/dd2d9b87775864996a0cf09624fd52e71141c4": "4ea719f42e32fcbf3e55648636dae516",
".git/objects/d7/7cfefdbe249b8bf90ce8244ed8fc1732fe8f73": "9c0876641083076714600718b0dab097",
".git/objects/b4/81750b3c80853c9658f65bea971d61c23348d5": "b7cf0ede495b4b15207fc826641255b2",
".git/objects/b4/3ac60072883e0e65b94f57f838db2366654213": "f1f7fd3cc56a763ef1c9d6b5380d6815",
".git/objects/a5/de584f4d25ef8aace1c5a0c190c3b31639895b": "9fbbb0db1824af504c56e5d959e1cdff",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/ae/1da8861ab176737686692a261d1599f1cda76b": "8d00832e9b92c89d009fbc6929b38796",
".git/objects/f3/709a83aedf1f03d6e04459831b12355a9b9ef1": "538d2edfa707ca92ed0b867d6c3903d1",
".git/objects/f3/1548aa0ecb61e056eca383398efab644b9e6ca": "4910393e1542f74ef3bb67a7e03014c5",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/eb/44c8d52bf76d1b2bf6a78943c5a3aafe0bc957": "070304df8fbe8ef794f3c0e00243e97d",
".git/objects/ee/454670e51b33949bb64552a182ce707bcd34fa": "579a5e7de838cc743068a1e8e85e87a2",
".git/objects/ee/0d44702d0f1cdf108f1f930a8d4e47482b0df4": "6928913241447d86696a16e6b5b01542",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f5/72b90ef57ee79b82dd846c6871359a7cb10404": "e68f5265f0bb82d792ff536dcb99d803",
".git/objects/ed/cccbcb27fa8f142070c5d2a9eba264250b1da4": "eebda556ed268076e08904b01b7415ad",
".git/objects/7d/3d424d9181ad03a3e37ef66fb826a60c6f6b70": "f27abdff9734ac9195c371b43af21d5b",
".git/objects/16/06b051cb3c69751c577aad1e421c192224adc8": "274b89cc18b5d29cca62493247c0f5dc",
".git/objects/42/f170c84911cd9fc39272a86abd82ce6094f4fc": "3609ec2803a861362ec1be353627ed32",
".git/objects/74/c726e32781bc2c0a83170f6800c0ef4cb9ddcf": "69a43282cb8038fd0577dc0529e5d6cb",
".git/objects/8f/c8be62f202c40e7d3e2e16242fb065cfc4e1a7": "6fda1b80da67a8d96186cf8ab8b24087",
".git/objects/8a/f19bfe860aab7a8b65a3c22f1903e62218231b": "8bfbd8e4f61d2e8559fefbf30e226ef7",
".git/objects/8a/51a9b155d31c44b148d7e287fc2872e0cafd42": "9f785032380d7569e69b3d17172f64e8",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/4c/8de196b783ce679942398645423d76e94be848": "1536233c2e95a83473411d30b56d5080",
".git/objects/4d/f10e5dd3f86f52d5b5f970999a270d26876e23": "b9be2a01aeaa5b8499d4551066f027f8",
".git/objects/75/24c04c629248a7e7e2a3b33db1be01ddc2365f": "41ac83b22f1527d7e0e4c15f5a581264",
".git/objects/44/4002bb6d165d34fd75cd608466d54d79afed2f": "d302657ed706c30e46157d3af72b317f",
".git/objects/2a/380a55d1908cd4eb52ee84847a9634a0c33f61": "f3e906778c869711f024d2aad320cbf5",
".git/objects/88/9ec250de9646b0eb6db2653c021de6a6cf28fe": "4aa19d672e07957824dd9b093ccf9da4",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/88/c1bbc0eb5112681b2a83a18644f2743544ecf9": "a3403aeca99f780539358b7cdf4caf36",
".git/objects/9f/0c71b70a49664ced448c63edc9c4ff2bf8cf4a": "bfe12b0c8078a4f477699ecebf5fd96c",
".git/objects/6b/cdcc27f22e001e46defdfd9e23f224ff65dd67": "624b5324c1f5198f7f6ede95410d5b7b",
".git/objects/6b/9862a1351012dc0f337c9ee5067ed3dbfbb439": "85896cd5fba127825eb58df13dfac82b",
".git/objects/38/81d31681336881fd285f76d35f019bf289c0e8": "fd3f3b211ab0bc58087b3b685f566284",
".git/objects/00/559eeb290fb8036f10633ff0640447d827b27c": "7fbd4486d5ea862eb2c1d2a07b06b395",
".git/objects/09/92ebd0bda5679ac18558cf7ce670dfdc66a364": "d9c7f5304b2d246573821bc8983380ab",
".git/objects/91/4a40ccb508c126fa995820d01ea15c69bb95f7": "8963a99a625c47f6cd41ba314ebd2488",
".git/objects/65/e0cab04677408dce0ecf45a42f37f31b32d73b": "aff22c9284ce26232c1b2e7c9dfaf0d5",
".git/objects/98/001f8429113eeb6b474640d286fcdac3e6d09a": "b0cef4b6ce642b182032b96bf952b19e",
".git/objects/5e/f2bbc9e5cb4e4544ce67f5ac70795d53012f47": "8dd2c24a43c84336d16e4b63132f5776",
".git/objects/6d/fd80bd3fb5220c95a2d25a779604abd644b464": "5cbcb908e428510e48e596ca0a8c92a7",
".git/objects/06/46d9f417f1c647a95357e8cc4ae33d7c382639": "3f21b760be8f28ad73dad00e6cf2a724",
".git/objects/39/69f24bc93f71bc9545209a74def43469ef0b7f": "17edcc8365ddac84c1d75f115a6aee61",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/b1/fd8fb3c39dee5e35d62afce4b74a0b8155fdb0": "3fa6146b3762d03df83c822bfd91d2ae",
".git/objects/dd/6a3b30e4a46fc05425a0992143150a997b2cad": "305050f95a8d876bf835e7e5d6352344",
".git/objects/d2/7cda69c7f51205e6bc2d1f72949ec46751bef9": "7ca84804bfac09569601520d824c6e4c",
".git/objects/d2/8fc654a9173cc73856b46bb97be1c68b47e383": "0b39eb7151027fab5c186e308ef766a9",
".git/objects/af/bf00c55e9ba8d8617b2c390a0fc59841f18578": "a6bc8f9f40d2b3787750e7e65935c530",
".git/objects/b7/da216c89009ceb5fa7f1b4ccb9e5ea584fa5b6": "87b0c4cbc0d8b799df3a50cce3dd305e",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/db/82464844be9694d526070c6deb8f7e9e32be87": "a0f2a5da589b180eaedf7e1f6ea66428",
".git/objects/a8/fb43bb1e522fb4308eda417259cafe05f8ff6b": "c532c42164ff312b165e5aebbc654205",
".git/objects/a8/136cd8d4ba47cb44e9ef35a3490e9357503398": "dcbed254598efdea474983cc622abe64",
".git/objects/a8/8c9340e408fca6e68e2d6cd8363dccc2bd8642": "11e9d76ebfeb0c92c8dff256819c0796",
".git/objects/a6/3a679f0260b598a3490827be6507005569264f": "c1cf9a6487b0e27bf9c2200cd6667b60",
".git/objects/a1/5ca1a3da8ccdabfdc203bf77a9829dd0f2aa09": "ccaf5887f62b78f1b0330041866756f3",
".git/objects/a1/5c44f500b7e95f8ee1eb970758c2e76a02e9a9": "a63132107a9053ff80141ff6e0a7cfd9",
".git/objects/ef/b875788e4094f6091d9caa43e35c77640aaf21": "27e32738aea45acd66b98d36fc9fc9e0",
".git/objects/e1/c7d0f29cf4afe2cc18eec8d9dabb388bf27a28": "4154d171d1cb4ee1fd9a5cd85b2eeb42",
".git/objects/cd/876308d67da689fb9665fd886535540b0d2d90": "57632f54ca4f4b22d1fcafcf5f927e63",
".git/objects/e6/15946766e2cab4d283f64471a47fb403bf01d4": "2d8eb0eaba95a2a50abe96b22cce132f",
".git/objects/e6/cc1238dbc0b7ccf7f9688c5ed49177fcfbf8c9": "9cc5a5efdd3c45e2b3243d052fb3b9f1",
".git/objects/f0/d9ec2f6c62b57bb1cabc2ec059139b63f19837": "19f5fdbaa44176d7d694baad03680f4a",
".git/objects/f6/d168f999019488f250f23a7727880368544a71": "e41470c09b4f22e306ebc3fd49579d20",
".git/objects/e9/48f47391d1f90907c4ed3f6d08754e7710877c": "0940774a6770fb32628aeaabe970fe9c",
".git/objects/e9/94225c71c957162e2dcc06abe8295e482f93a2": "2eed33506ed70a5848a0b06f5b754f2c",
".git/objects/e9/19d86d5129c3607c972975b678f8ee581f6210": "91ddff0af957ada51baaa0bf210f8b22",
".git/objects/f1/df5296e923772006aa93324381d6ceadd73c0e": "ca9343f6cbdef75a68aec07b434d4fa8",
".git/objects/41/0081d1845e9eadee9b3676b623b12c15cb3646": "88846cccba632ba7642e53374396cb3c",
".git/objects/41/63e4350de7f537e00fe1d960588ddaedd16839": "f743aa427f9484b8deb696add7decfad",
".git/objects/1b/41489df571034ba56c29355474b606dd0513c9": "50b7625caff6e41d2ae8490a6533d79e",
".git/objects/1d/468b85698a60041b450286f31b3264b3bbd6f7": "5c8c497111befde32ac151f14cf92f85",
".git/objects/49/c08556402d054d55d934474085c041e9849cb1": "44e28a6cc182c20e1a6653166ed818b2",
".git/objects/40/1184f2840fcfb39ffde5f2f82fe5957c37d6fa": "1ea653b99fd29cd15fcc068857a1dbb2",
".git/objects/13/ff438f05b14e2570c7a7b04297f4372360b34f": "338c2b8f8204d232c8dd90aad507de44",
".git/objects/14/115254d3324bdb07b17351d7ea5098f7d0e92d": "bb647382e12c1b157a88a6151b085775",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "49907d05bb9bf0799c9f019799404586",
".git/logs/refs/heads/main": "ee5b0df66e94f99293ad7e74d9f342f3",
".git/logs/refs/remotes/origin/main": "b36b3f6f8c343e1c1cba24b15c8134c9",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/main": "3b94cd5d918a97c9215015582d6fab2b",
".git/refs/remotes/origin/main": "3b94cd5d918a97c9215015582d6fab2b",
".git/index": "f76ee68a1b3c46eafa46d3e8c82890c9",
".git/packed-refs": "a891e6bb26eb0d480aef486a7e8ea166",
".git/COMMIT_EDITMSG": "a8297d555dd34879e8e48e1cf12acefa",
"assets/AssetManifest.json": "2dfd66b17f7b5c41c3f5398bde984010",
"assets/NOTICES": "9197e08c1c2dd277ef9bb909a4911129",
"assets/FontManifest.json": "b1b1c9a23c41e5b600a9e1e8b980bae5",
"assets/AssetManifest.bin.json": "bff1083431b324955a55f6aede0d68a8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "a8a981ac7976d7af8a3ade4292ad660d",
"assets/fonts/MaterialIcons-Regular.otf": "0af684eb636a7f764f9c85616d4f9243",
"assets/assets/images/team/vanshika.jpg": "cac99b857af3bd7d3dc82073f240c2db",
"assets/assets/images/team/prince.jpeg": "e3c081900803f60de00c6bec5f55971b",
"assets/assets/images/team/prashant.jpg": "1547eb1774dfdf1b98720a2ed8d12dab",
"assets/assets/images/team/harender.jpeg": "61ef5a91d978d646683baa50be8ec1eb",
"assets/assets/images/team/user.png": "2dfbc4f37ea60308c28b9216489a5570",
"assets/assets/images/team/abhishek.png": "e6d3382ad4b20b96bcb2cff425589a8f",
"assets/assets/images/team/rishika.jpeg": "1c3cbf88a634c771d60cb6ef90de2c84",
"assets/assets/images/team/shruti.jpg": "bb49e5cdacf2232bbc55ba08394be061",
"assets/assets/images/team/vikas.jpeg": "e3505409e19649d452ba290271e06179",
"assets/assets/images/team/shudhanshu.png": "e06bef47b0fbc25cc06020b014649069",
"assets/assets/images/team/logo.svg": "fed761775636b2e46e3b3936611c646f",
"assets/assets/images/team/appl.png": "2937394338f0a2a5e18c77f04de7c9d7",
"assets/assets/images/hero_image.png": "ad7c80128da4b9ea9ff020b3c01cc434",
"assets/assets/fonts/Poppins-Medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/fonts/icons.ttf": "e51f6f4d6cea7ca515d6f12699b24fd8",
"assets/assets/fonts/Poppins-Regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/assets/fonts/Poppins-Bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/assets/fonts/Poppins-SemiBold.ttf": "6f1520d107205975713ba09df778f93f",
"assets/assets/logo.svg": "fed761775636b2e46e3b3936611c646f",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
