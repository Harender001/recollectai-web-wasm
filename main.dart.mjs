
// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredWasm` is a JS function that takes a module name matching a
  //   wasm file produced by the dart2wasm compiler and returns the bytes to
  //   load the module. These bytes can be in either a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  async instantiate(additionalImports, {loadDeferredWasm} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

      _1: (x0,x1,x2) => x0.set(x1,x2),
      _2: (x0,x1,x2) => x0.set(x1,x2),
      _6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
      _7: x0 => new window.FinalizationRegistry(x0),
      _8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _9: (x0,x1) => x0.unregister(x1),
      _10: (x0,x1,x2) => x0.slice(x1,x2),
      _11: (x0,x1) => x0.decode(x1),
      _12: (x0,x1) => x0.segment(x1),
      _13: () => new TextDecoder(),
      _14: x0 => x0.buffer,
      _15: x0 => x0.wasmMemory,
      _16: () => globalThis.window._flutter_skwasmInstance,
      _17: x0 => x0.rasterStartMilliseconds,
      _18: x0 => x0.rasterEndMilliseconds,
      _19: x0 => x0.imageBitmaps,
      _192: x0 => x0.select(),
      _193: (x0,x1) => x0.append(x1),
      _194: x0 => x0.remove(),
      _197: x0 => x0.unlock(),
      _202: x0 => x0.getReader(),
      _211: x0 => new MutationObserver(x0),
      _222: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _223: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      _226: x0 => new ResizeObserver(x0),
      _229: (x0,x1) => new Intl.Segmenter(x0,x1),
      _230: x0 => x0.next(),
      _231: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      _308: x0 => x0.close(),
      _309: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
      _310: x0 => new window.ImageDecoder(x0),
      _311: x0 => x0.close(),
      _312: x0 => ({frameIndex: x0}),
      _313: (x0,x1) => x0.decode(x1),
      _316: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._316(f,arguments.length,x0) }),
      _317: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._317(f,arguments.length,x0) }),
      _318: (x0,x1) => ({addView: x0,removeView: x1}),
      _319: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._319(f,arguments.length,x0) }),
      _320: f => finalizeWrapper(f, function() { return dartInstance.exports._320(f,arguments.length) }),
      _321: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      _322: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._322(f,arguments.length,x0) }),
      _323: x0 => ({runApp: x0}),
      _324: x0 => new Uint8Array(x0),
      _326: x0 => x0.preventDefault(),
      _327: x0 => x0.stopPropagation(),
      _328: (x0,x1) => x0.addListener(x1),
      _329: (x0,x1) => x0.removeListener(x1),
      _330: (x0,x1) => x0.prepend(x1),
      _331: x0 => x0.remove(),
      _332: x0 => x0.disconnect(),
      _333: (x0,x1) => x0.addListener(x1),
      _334: (x0,x1) => x0.removeListener(x1),
      _335: x0 => x0.blur(),
      _336: (x0,x1) => x0.append(x1),
      _337: x0 => x0.remove(),
      _338: x0 => x0.stopPropagation(),
      _342: x0 => x0.preventDefault(),
      _343: (x0,x1) => x0.append(x1),
      _344: x0 => x0.remove(),
      _345: x0 => x0.preventDefault(),
      _350: (x0,x1) => x0.removeChild(x1),
      _351: (x0,x1) => x0.appendChild(x1),
      _352: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _353: (x0,x1) => x0.appendChild(x1),
      _354: (x0,x1) => x0.transferFromImageBitmap(x1),
      _355: (x0,x1) => x0.appendChild(x1),
      _356: (x0,x1) => x0.append(x1),
      _357: (x0,x1) => x0.append(x1),
      _358: (x0,x1) => x0.append(x1),
      _359: x0 => x0.remove(),
      _360: x0 => x0.remove(),
      _361: x0 => x0.remove(),
      _362: (x0,x1) => x0.appendChild(x1),
      _363: (x0,x1) => x0.appendChild(x1),
      _364: x0 => x0.remove(),
      _365: (x0,x1) => x0.append(x1),
      _366: (x0,x1) => x0.append(x1),
      _367: x0 => x0.remove(),
      _368: (x0,x1) => x0.append(x1),
      _369: (x0,x1) => x0.append(x1),
      _370: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _371: (x0,x1) => x0.append(x1),
      _372: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _373: x0 => x0.remove(),
      _374: (x0,x1) => x0.append(x1),
      _375: x0 => x0.remove(),
      _376: (x0,x1) => x0.append(x1),
      _377: x0 => x0.remove(),
      _378: x0 => x0.remove(),
      _379: x0 => x0.getBoundingClientRect(),
      _380: x0 => x0.remove(),
      _393: (x0,x1) => x0.append(x1),
      _394: x0 => x0.remove(),
      _395: (x0,x1) => x0.append(x1),
      _396: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _397: x0 => x0.preventDefault(),
      _398: x0 => x0.preventDefault(),
      _399: x0 => x0.preventDefault(),
      _400: x0 => x0.preventDefault(),
      _401: (x0,x1) => x0.observe(x1),
      _402: x0 => x0.disconnect(),
      _403: (x0,x1) => x0.appendChild(x1),
      _404: (x0,x1) => x0.appendChild(x1),
      _405: (x0,x1) => x0.appendChild(x1),
      _406: (x0,x1) => x0.append(x1),
      _407: x0 => x0.remove(),
      _408: (x0,x1) => x0.append(x1),
      _409: (x0,x1) => x0.append(x1),
      _410: (x0,x1) => x0.appendChild(x1),
      _411: (x0,x1) => x0.append(x1),
      _412: x0 => x0.remove(),
      _413: (x0,x1) => x0.append(x1),
      _414: x0 => x0.remove(),
      _418: (x0,x1) => x0.appendChild(x1),
      _419: x0 => x0.remove(),
      _978: () => globalThis.window.flutterConfiguration,
      _979: x0 => x0.assetBase,
      _984: x0 => x0.debugShowSemanticsNodes,
      _985: x0 => x0.hostElement,
      _986: x0 => x0.multiViewEnabled,
      _987: x0 => x0.nonce,
      _989: x0 => x0.fontFallbackBaseUrl,
      _995: x0 => x0.console,
      _996: x0 => x0.devicePixelRatio,
      _997: x0 => x0.document,
      _998: x0 => x0.history,
      _999: x0 => x0.innerHeight,
      _1000: x0 => x0.innerWidth,
      _1001: x0 => x0.location,
      _1002: x0 => x0.navigator,
      _1003: x0 => x0.visualViewport,
      _1004: x0 => x0.performance,
      _1007: (x0,x1) => x0.dispatchEvent(x1),
      _1008: (x0,x1) => x0.matchMedia(x1),
      _1010: (x0,x1) => x0.getComputedStyle(x1),
      _1011: x0 => x0.screen,
      _1012: (x0,x1) => x0.requestAnimationFrame(x1),
      _1013: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1013(f,arguments.length,x0) }),
      _1018: (x0,x1) => x0.warn(x1),
      _1020: (x0,x1) => x0.debug(x1),
      _1021: () => globalThis.window,
      _1022: () => globalThis.Intl,
      _1023: () => globalThis.Symbol,
      _1026: x0 => x0.clipboard,
      _1027: x0 => x0.maxTouchPoints,
      _1028: x0 => x0.vendor,
      _1029: x0 => x0.language,
      _1030: x0 => x0.platform,
      _1031: x0 => x0.userAgent,
      _1032: x0 => x0.languages,
      _1033: x0 => x0.documentElement,
      _1034: (x0,x1) => x0.querySelector(x1),
      _1038: (x0,x1) => x0.createElement(x1),
      _1039: (x0,x1) => x0.execCommand(x1),
      _1042: (x0,x1) => x0.createTextNode(x1),
      _1043: (x0,x1) => x0.createEvent(x1),
      _1047: x0 => x0.head,
      _1048: x0 => x0.body,
      _1049: (x0,x1) => x0.title = x1,
      _1052: x0 => x0.activeElement,
      _1054: x0 => x0.visibilityState,
      _1056: x0 => x0.hasFocus(),
      _1057: () => globalThis.document,
      _1058: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1059: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1062: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1062(f,arguments.length,x0) }),
      _1063: x0 => x0.target,
      _1065: x0 => x0.timeStamp,
      _1066: x0 => x0.type,
      _1068: x0 => x0.preventDefault(),
      _1070: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      _1077: x0 => x0.firstChild,
      _1082: x0 => x0.parentElement,
      _1084: x0 => x0.parentNode,
      _1088: (x0,x1) => x0.removeChild(x1),
      _1089: (x0,x1) => x0.removeChild(x1),
      _1090: x0 => x0.isConnected,
      _1091: (x0,x1) => x0.textContent = x1,
      _1095: (x0,x1) => x0.contains(x1),
      _1101: x0 => x0.firstElementChild,
      _1103: x0 => x0.nextElementSibling,
      _1104: x0 => x0.clientHeight,
      _1105: x0 => x0.clientWidth,
      _1106: x0 => x0.offsetHeight,
      _1107: x0 => x0.offsetWidth,
      _1108: x0 => x0.id,
      _1109: (x0,x1) => x0.id = x1,
      _1112: (x0,x1) => x0.spellcheck = x1,
      _1113: x0 => x0.tagName,
      _1114: x0 => x0.style,
      _1115: (x0,x1) => x0.append(x1),
      _1117: (x0,x1) => x0.getAttribute(x1),
      _1118: x0 => x0.getBoundingClientRect(),
      _1121: (x0,x1) => x0.closest(x1),
      _1124: (x0,x1) => x0.querySelectorAll(x1),
      _1126: x0 => x0.remove(),
      _1127: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1128: (x0,x1) => x0.removeAttribute(x1),
      _1129: (x0,x1) => x0.tabIndex = x1,
      _1132: (x0,x1) => x0.focus(x1),
      _1133: x0 => x0.scrollTop,
      _1134: (x0,x1) => x0.scrollTop = x1,
      _1135: x0 => x0.scrollLeft,
      _1136: (x0,x1) => x0.scrollLeft = x1,
      _1137: x0 => x0.classList,
      _1138: (x0,x1) => x0.className = x1,
      _1144: (x0,x1) => x0.getElementsByClassName(x1),
      _1146: x0 => x0.click(),
      _1147: (x0,x1) => x0.hasAttribute(x1),
      _1150: (x0,x1) => x0.attachShadow(x1),
      _1155: (x0,x1) => x0.getPropertyValue(x1),
      _1157: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      _1159: (x0,x1) => x0.removeProperty(x1),
      _1161: x0 => x0.offsetLeft,
      _1162: x0 => x0.offsetTop,
      _1163: x0 => x0.offsetParent,
      _1165: (x0,x1) => x0.name = x1,
      _1166: x0 => x0.content,
      _1167: (x0,x1) => x0.content = x1,
      _1185: (x0,x1) => x0.nonce = x1,
      _1191: x0 => x0.now(),
      _1193: (x0,x1) => x0.width = x1,
      _1195: (x0,x1) => x0.height = x1,
      _1199: (x0,x1) => x0.getContext(x1),
      _1275: (x0,x1) => x0.fetch(x1),
      _1276: x0 => x0.status,
      _1277: x0 => x0.headers,
      _1278: x0 => x0.body,
      _1279: x0 => x0.arrayBuffer(),
      _1282: (x0,x1) => x0.get(x1),
      _1285: x0 => x0.read(),
      _1286: x0 => x0.value,
      _1287: x0 => x0.done,
      _1289: x0 => x0.name,
      _1290: x0 => x0.x,
      _1291: x0 => x0.y,
      _1294: x0 => x0.top,
      _1295: x0 => x0.right,
      _1296: x0 => x0.bottom,
      _1297: x0 => x0.left,
      _1306: x0 => x0.height,
      _1307: x0 => x0.width,
      _1308: (x0,x1) => x0.value = x1,
      _1310: (x0,x1) => x0.placeholder = x1,
      _1311: (x0,x1) => x0.name = x1,
      _1312: x0 => x0.selectionDirection,
      _1313: x0 => x0.selectionStart,
      _1314: x0 => x0.selectionEnd,
      _1317: x0 => x0.value,
      _1319: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1322: x0 => x0.readText(),
      _1323: (x0,x1) => x0.writeText(x1),
      _1324: x0 => x0.altKey,
      _1325: x0 => x0.code,
      _1326: x0 => x0.ctrlKey,
      _1327: x0 => x0.key,
      _1328: x0 => x0.keyCode,
      _1329: x0 => x0.location,
      _1330: x0 => x0.metaKey,
      _1331: x0 => x0.repeat,
      _1332: x0 => x0.shiftKey,
      _1333: x0 => x0.isComposing,
      _1334: (x0,x1) => x0.getModifierState(x1),
      _1336: x0 => x0.state,
      _1337: (x0,x1) => x0.go(x1),
      _1339: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      _1341: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      _1342: x0 => x0.pathname,
      _1343: x0 => x0.search,
      _1344: x0 => x0.hash,
      _1348: x0 => x0.state,
      _1356: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1356(f,arguments.length,x0,x1) }),
      _1358: (x0,x1,x2) => x0.observe(x1,x2),
      _1361: x0 => x0.attributeName,
      _1362: x0 => x0.type,
      _1363: x0 => x0.matches,
      _1366: x0 => x0.matches,
      _1368: x0 => x0.relatedTarget,
      _1369: x0 => x0.clientX,
      _1370: x0 => x0.clientY,
      _1371: x0 => x0.offsetX,
      _1372: x0 => x0.offsetY,
      _1375: x0 => x0.button,
      _1376: x0 => x0.buttons,
      _1377: x0 => x0.ctrlKey,
      _1378: (x0,x1) => x0.getModifierState(x1),
      _1381: x0 => x0.pointerId,
      _1382: x0 => x0.pointerType,
      _1383: x0 => x0.pressure,
      _1384: x0 => x0.tiltX,
      _1385: x0 => x0.tiltY,
      _1386: x0 => x0.getCoalescedEvents(),
      _1388: x0 => x0.deltaX,
      _1389: x0 => x0.deltaY,
      _1390: x0 => x0.wheelDeltaX,
      _1391: x0 => x0.wheelDeltaY,
      _1392: x0 => x0.deltaMode,
      _1398: x0 => x0.changedTouches,
      _1400: x0 => x0.clientX,
      _1401: x0 => x0.clientY,
      _1403: x0 => x0.data,
      _1406: (x0,x1) => x0.disabled = x1,
      _1407: (x0,x1) => x0.type = x1,
      _1408: (x0,x1) => x0.max = x1,
      _1409: (x0,x1) => x0.min = x1,
      _1410: (x0,x1) => x0.value = x1,
      _1411: x0 => x0.value,
      _1412: x0 => x0.disabled,
      _1413: (x0,x1) => x0.disabled = x1,
      _1414: (x0,x1) => x0.placeholder = x1,
      _1415: (x0,x1) => x0.name = x1,
      _1416: (x0,x1) => x0.autocomplete = x1,
      _1417: x0 => x0.selectionDirection,
      _1418: x0 => x0.selectionStart,
      _1419: x0 => x0.selectionEnd,
      _1423: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1428: (x0,x1) => x0.add(x1),
      _1432: (x0,x1) => x0.noValidate = x1,
      _1433: (x0,x1) => x0.method = x1,
      _1434: (x0,x1) => x0.action = x1,
      _1459: x0 => x0.orientation,
      _1460: x0 => x0.width,
      _1461: x0 => x0.height,
      _1462: (x0,x1) => x0.lock(x1),
      _1478: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1478(f,arguments.length,x0,x1) }),
      _1489: x0 => x0.length,
      _1491: (x0,x1) => x0.item(x1),
      _1492: x0 => x0.length,
      _1493: (x0,x1) => x0.item(x1),
      _1494: x0 => x0.iterator,
      _1495: x0 => x0.Segmenter,
      _1496: x0 => x0.v8BreakIterator,
      _1499: x0 => x0.done,
      _1500: x0 => x0.value,
      _1501: x0 => x0.index,
      _1505: (x0,x1) => x0.adoptText(x1),
      _1506: x0 => x0.first(),
      _1507: x0 => x0.next(),
      _1508: x0 => x0.current(),
      _1522: x0 => x0.hostElement,
      _1523: x0 => x0.viewConstraints,
      _1525: x0 => x0.maxHeight,
      _1526: x0 => x0.maxWidth,
      _1527: x0 => x0.minHeight,
      _1528: x0 => x0.minWidth,
      _1529: x0 => x0.loader,
      _1530: () => globalThis._flutter,
      _1531: (x0,x1) => x0.didCreateEngineInitializer(x1),
      _1532: (x0,x1,x2) => x0.call(x1,x2),
      _1533: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1533(f,arguments.length,x0,x1) }),
      _1534: x0 => new Promise(x0),
      _1537: x0 => x0.length,
      _1540: x0 => x0.tracks,
      _1544: x0 => x0.image,
      _1551: x0 => x0.displayWidth,
      _1552: x0 => x0.displayHeight,
      _1553: x0 => x0.duration,
      _1556: x0 => x0.ready,
      _1557: x0 => x0.selectedTrack,
      _1558: x0 => x0.repetitionCount,
      _1559: x0 => x0.frameCount,
      _1604: x0 => x0.decode(),
      _1605: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1606: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      _1607: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1607(f,arguments.length,x0) }),
      _1608: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _1609: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1609(f,arguments.length,x0) }),
      _1610: x0 => x0.send(),
      _1611: () => new XMLHttpRequest(),
      _1612: (x0,x1) => x0.createElement(x1),
      _1613: () => globalThis.window.navigator.userAgent,
      _1630: x0 => x0.toArray(),
      _1631: x0 => x0.toUint8Array(),
      _1632: x0 => ({serverTimestamps: x0}),
      _1633: x0 => ({source: x0}),
      _1636: x0 => new firebase_firestore.FieldPath(x0),
      _1637: (x0,x1) => new firebase_firestore.FieldPath(x0,x1),
      _1638: (x0,x1,x2) => new firebase_firestore.FieldPath(x0,x1,x2),
      _1639: (x0,x1,x2,x3) => new firebase_firestore.FieldPath(x0,x1,x2,x3),
      _1640: (x0,x1,x2,x3,x4) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4),
      _1641: (x0,x1,x2,x3,x4,x5) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5),
      _1642: (x0,x1,x2,x3,x4,x5,x6) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6),
      _1643: (x0,x1,x2,x3,x4,x5,x6,x7) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7),
      _1644: (x0,x1,x2,x3,x4,x5,x6,x7,x8) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8),
      _1645: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8,x9),
      _1646: () => globalThis.firebase_firestore.documentId(),
      _1647: (x0,x1) => new firebase_firestore.GeoPoint(x0,x1),
      _1648: x0 => globalThis.firebase_firestore.vector(x0),
      _1649: x0 => globalThis.firebase_firestore.Bytes.fromUint8Array(x0),
      _1650: x0 => globalThis.firebase_firestore.writeBatch(x0),
      _1651: (x0,x1) => globalThis.firebase_firestore.collection(x0,x1),
      _1653: (x0,x1) => globalThis.firebase_firestore.doc(x0,x1),
      _1658: x0 => x0.call(),
      _1682: x0 => x0.commit(),
      _1683: (x0,x1) => x0.delete(x1),
      _1689: x0 => globalThis.firebase_firestore.getDoc(x0),
      _1690: x0 => globalThis.firebase_firestore.getDocFromServer(x0),
      _1691: x0 => globalThis.firebase_firestore.getDocFromCache(x0),
      _1692: (x0,x1) => ({includeMetadataChanges: x0,source: x1}),
      _1695: (x0,x1,x2,x3) => globalThis.firebase_firestore.onSnapshot(x0,x1,x2,x3),
      _1698: (x0,x1) => globalThis.firebase_firestore.setDoc(x0,x1),
      _1699: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1700: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1701: x0 => globalThis.firebase_firestore.getDocs(x0),
      _1702: x0 => globalThis.firebase_firestore.getDocsFromServer(x0),
      _1703: x0 => globalThis.firebase_firestore.getDocsFromCache(x0),
      _1704: x0 => globalThis.firebase_firestore.limit(x0),
      _1705: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1706: x0 => globalThis.firebase_firestore.limitToLast(x0),
      _1707: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1708: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1708(f,arguments.length,x0) }),
      _1709: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1709(f,arguments.length,x0) }),
      _1710: (x0,x1) => globalThis.firebase_firestore.orderBy(x0,x1),
      _1712: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1713: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1714: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1715: (x0,x1,x2) => globalThis.firebase_firestore.where(x0,x1,x2),
      _1716: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1717: (x0,x1,x2) => globalThis.firebase_firestore.where(x0,x1,x2),
      _1718: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
      _1721: x0 => globalThis.firebase_firestore.doc(x0),
      _1724: (x0,x1) => x0.data(x1),
      _1728: x0 => x0.docChanges(),
      _1746: (x0,x1) => globalThis.firebase_firestore.getFirestore(x0,x1),
      _1748: x0 => globalThis.firebase_firestore.Timestamp.fromMillis(x0),
      _1749: x0 => globalThis.firebase_firestore.Timestamp.fromMillis(x0),
      _1750: f => finalizeWrapper(f, function() { return dartInstance.exports._1750(f,arguments.length) }),
      _1807: () => globalThis.firebase_firestore.updateDoc,
      _1810: () => globalThis.firebase_firestore.or,
      _1811: () => globalThis.firebase_firestore.and,
      _1820: x0 => x0.path,
      _1824: () => globalThis.firebase_firestore.GeoPoint,
      _1825: x0 => x0.latitude,
      _1826: x0 => x0.longitude,
      _1828: () => globalThis.firebase_firestore.VectorValue,
      _1831: () => globalThis.firebase_firestore.Bytes,
      _1835: x0 => x0.type,
      _1837: x0 => x0.doc,
      _1839: x0 => x0.oldIndex,
      _1841: x0 => x0.newIndex,
      _1843: () => globalThis.firebase_firestore.DocumentReference,
      _1847: x0 => x0.path,
      _1857: x0 => x0.metadata,
      _1858: x0 => x0.ref,
      _1866: x0 => x0.docs,
      _1868: x0 => x0.metadata,
      _1876: () => globalThis.firebase_firestore.Timestamp,
      _1877: x0 => x0.seconds,
      _1878: x0 => x0.nanoseconds,
      _1915: x0 => x0.hasPendingWrites,
      _1917: x0 => x0.fromCache,
      _1924: x0 => x0.source,
      _1929: () => globalThis.firebase_firestore.startAfter,
      _1930: () => globalThis.firebase_firestore.startAt,
      _1931: () => globalThis.firebase_firestore.endBefore,
      _1932: () => globalThis.firebase_firestore.endAt,
      _1942: () => new webkitSpeechRecognition(),
      _1943: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1943(f,arguments.length,x0) }),
      _1944: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1944(f,arguments.length,x0) }),
      _1945: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1945(f,arguments.length,x0) }),
      _1946: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1946(f,arguments.length,x0) }),
      _1947: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1947(f,arguments.length,x0) }),
      _1948: x0 => x0.stop(),
      _1949: x0 => x0.abort(),
      _1950: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1950(f,arguments.length,x0) }),
      _1951: x0 => x0.start(),
      _1952: (x0,x1) => x0.item(x1),
      _1953: (x0,x1) => x0.item(x1),
      _1958: (x0,x1) => x0.createElement(x1),
      _1972: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1993: x0 => x0.toJSON(),
      _1994: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1994(f,arguments.length,x0) }),
      _1995: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1995(f,arguments.length,x0) }),
      _1996: (x0,x1,x2) => x0.onAuthStateChanged(x1,x2),
      _1997: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1997(f,arguments.length,x0) }),
      _1998: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1998(f,arguments.length,x0) }),
      _1999: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1999(f,arguments.length,x0) }),
      _2000: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2000(f,arguments.length,x0) }),
      _2001: (x0,x1,x2) => x0.onIdTokenChanged(x1,x2),
      _2005: (x0,x1,x2) => globalThis.firebase_auth.createUserWithEmailAndPassword(x0,x1,x2),
      _2011: (x0,x1,x2) => globalThis.firebase_auth.sendPasswordResetEmail(x0,x1,x2),
      _2015: (x0,x1,x2) => globalThis.firebase_auth.signInWithEmailAndPassword(x0,x1,x2),
      _2020: x0 => x0.signOut(),
      _2021: (x0,x1) => globalThis.firebase_auth.connectAuthEmulator(x0,x1),
      _2043: x0 => globalThis.firebase_auth.OAuthProvider.credentialFromResult(x0),
      _2058: x0 => globalThis.firebase_auth.getAdditionalUserInfo(x0),
      _2059: (x0,x1,x2) => ({errorMap: x0,persistence: x1,popupRedirectResolver: x2}),
      _2060: (x0,x1) => globalThis.firebase_auth.initializeAuth(x0,x1),
      _2076: x0 => globalThis.firebase_auth.OAuthProvider.credentialFromError(x0),
      _2098: () => globalThis.firebase_auth.debugErrorMap,
      _2102: () => globalThis.firebase_auth.browserSessionPersistence,
      _2104: () => globalThis.firebase_auth.browserLocalPersistence,
      _2106: () => globalThis.firebase_auth.indexedDBLocalPersistence,
      _2141: x0 => globalThis.firebase_auth.multiFactor(x0),
      _2142: (x0,x1) => globalThis.firebase_auth.getMultiFactorResolver(x0,x1),
      _2144: x0 => x0.currentUser,
      _2159: x0 => x0.displayName,
      _2160: x0 => x0.email,
      _2161: x0 => x0.phoneNumber,
      _2162: x0 => x0.photoURL,
      _2163: x0 => x0.providerId,
      _2164: x0 => x0.uid,
      _2165: x0 => x0.emailVerified,
      _2166: x0 => x0.isAnonymous,
      _2167: x0 => x0.providerData,
      _2168: x0 => x0.refreshToken,
      _2169: x0 => x0.tenantId,
      _2170: x0 => x0.metadata,
      _2175: x0 => x0.providerId,
      _2176: x0 => x0.signInMethod,
      _2177: x0 => x0.accessToken,
      _2178: x0 => x0.idToken,
      _2179: x0 => x0.secret,
      _2206: x0 => x0.creationTime,
      _2207: x0 => x0.lastSignInTime,
      _2212: x0 => x0.code,
      _2214: x0 => x0.message,
      _2226: x0 => x0.email,
      _2227: x0 => x0.phoneNumber,
      _2228: x0 => x0.tenantId,
      _2251: x0 => x0.user,
      _2254: x0 => x0.providerId,
      _2255: x0 => x0.profile,
      _2256: x0 => x0.username,
      _2257: x0 => x0.isNewUser,
      _2260: () => globalThis.firebase_auth.browserPopupRedirectResolver,
      _2266: x0 => x0.displayName,
      _2267: x0 => x0.enrollmentTime,
      _2268: x0 => x0.factorId,
      _2269: x0 => x0.uid,
      _2271: x0 => x0.hints,
      _2272: x0 => x0.session,
      _2274: x0 => x0.phoneNumber,
      _2286: (x0,x1) => x0.getItem(x1),
      _2314: (x0,x1,x2,x3,x4,x5,x6,x7) => ({apiKey: x0,authDomain: x1,databaseURL: x2,projectId: x3,storageBucket: x4,messagingSenderId: x5,measurementId: x6,appId: x7}),
      _2315: (x0,x1) => globalThis.firebase_core.initializeApp(x0,x1),
      _2316: x0 => globalThis.firebase_core.getApp(x0),
      _2317: () => globalThis.firebase_core.getApp(),
      _2415: () => globalThis.firebase_core.SDK_VERSION,
      _2422: x0 => x0.apiKey,
      _2424: x0 => x0.authDomain,
      _2426: x0 => x0.databaseURL,
      _2428: x0 => x0.projectId,
      _2430: x0 => x0.storageBucket,
      _2432: x0 => x0.messagingSenderId,
      _2434: x0 => x0.measurementId,
      _2436: x0 => x0.appId,
      _2438: x0 => x0.name,
      _2439: x0 => x0.options,
      _2440: (x0,x1) => x0.debug(x1),
      _2441: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2441(f,arguments.length,x0) }),
      _2442: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2442(f,arguments.length,x0,x1) }),
      _2443: (x0,x1) => ({createScript: x0,createScriptURL: x1}),
      _2444: (x0,x1,x2) => x0.createPolicy(x1,x2),
      _2445: (x0,x1) => x0.createScriptURL(x1),
      _2446: (x0,x1,x2) => x0.createScript(x1,x2),
      _2447: (x0,x1) => x0.appendChild(x1),
      _2448: (x0,x1) => x0.appendChild(x1),
      _2449: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2449(f,arguments.length,x0) }),
      _2462: x0 => new Array(x0),
      _2464: x0 => x0.length,
      _2466: (x0,x1) => x0[x1],
      _2467: (x0,x1,x2) => x0[x1] = x2,
      _2470: (x0,x1,x2) => new DataView(x0,x1,x2),
      _2472: x0 => new Int8Array(x0),
      _2473: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _2474: x0 => new Uint8Array(x0),
      _2480: x0 => new Uint16Array(x0),
      _2482: x0 => new Int32Array(x0),
      _2484: x0 => new Uint32Array(x0),
      _2486: x0 => new Float32Array(x0),
      _2488: x0 => new Float64Array(x0),
      _2490: (o, c) => o instanceof c,
      _2494: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2494(f,arguments.length,x0) }),
      _2495: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2495(f,arguments.length,x0) }),
      _2520: (decoder, codeUnits) => decoder.decode(codeUnits),
      _2521: () => new TextDecoder("utf-8", {fatal: true}),
      _2522: () => new TextDecoder("utf-8", {fatal: false}),
      _2523: x0 => new WeakRef(x0),
      _2524: x0 => x0.deref(),
      _2530: Date.now,
      _2532: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _2533: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _2534: () => {
        let stackString = new Error().stack.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0] === 'Error') {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _2535: () => typeof dartUseDateNowForTicks !== "undefined",
      _2536: () => 1000 * performance.now(),
      _2537: () => Date.now(),
      _2538: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _2539: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      _2540: () => new WeakMap(),
      _2541: (map, o) => map.get(o),
      _2542: (map, o, v) => map.set(o, v),
      _2543: () => globalThis.WeakRef,
      _2554: s => JSON.stringify(s),
      _2555: s => printToConsole(s),
      _2556: a => a.join(''),
      _2557: (o, a, b) => o.replace(a, b),
      _2559: (s, t) => s.split(t),
      _2560: s => s.toLowerCase(),
      _2561: s => s.toUpperCase(),
      _2562: s => s.trim(),
      _2563: s => s.trimLeft(),
      _2564: s => s.trimRight(),
      _2566: (s, p, i) => s.indexOf(p, i),
      _2567: (s, p, i) => s.lastIndexOf(p, i),
      _2568: (s) => s.replace(/\$/g, "$$$$"),
      _2569: Object.is,
      _2570: s => s.toUpperCase(),
      _2571: s => s.toLowerCase(),
      _2572: (a, i) => a.push(i),
      _2573: (a, i) => a.splice(i, 1)[0],
      _2575: (a, l) => a.length = l,
      _2576: a => a.pop(),
      _2577: (a, i) => a.splice(i, 1),
      _2579: (a, s) => a.join(s),
      _2580: (a, s, e) => a.slice(s, e),
      _2581: (a, s, e) => a.splice(s, e),
      _2582: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
      _2583: a => a.length,
      _2585: (a, i) => a[i],
      _2586: (a, i, v) => a[i] = v,
      _2588: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      _2589: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _2590: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _2591: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _2592: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _2593: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _2594: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _2595: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _2597: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      _2598: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _2599: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _2600: (t, s) => t.set(s),
      _2601: l => new DataView(new ArrayBuffer(l)),
      _2602: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _2604: o => o.buffer,
      _2605: o => o.byteOffset,
      _2606: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _2607: (b, o) => new DataView(b, o),
      _2608: (b, o, l) => new DataView(b, o, l),
      _2609: Function.prototype.call.bind(DataView.prototype.getUint8),
      _2610: Function.prototype.call.bind(DataView.prototype.setUint8),
      _2611: Function.prototype.call.bind(DataView.prototype.getInt8),
      _2612: Function.prototype.call.bind(DataView.prototype.setInt8),
      _2613: Function.prototype.call.bind(DataView.prototype.getUint16),
      _2614: Function.prototype.call.bind(DataView.prototype.setUint16),
      _2615: Function.prototype.call.bind(DataView.prototype.getInt16),
      _2616: Function.prototype.call.bind(DataView.prototype.setInt16),
      _2617: Function.prototype.call.bind(DataView.prototype.getUint32),
      _2618: Function.prototype.call.bind(DataView.prototype.setUint32),
      _2619: Function.prototype.call.bind(DataView.prototype.getInt32),
      _2620: Function.prototype.call.bind(DataView.prototype.setInt32),
      _2623: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      _2624: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      _2625: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _2626: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _2627: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _2628: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _2641: (o, t) => o instanceof t,
      _2643: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2643(f,arguments.length,x0) }),
      _2644: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2644(f,arguments.length,x0) }),
      _2645: o => Object.keys(o),
      _2646: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _2647: (handle) => clearTimeout(handle),
      _2648: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      _2649: (handle) => clearInterval(handle),
      _2650: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _2651: () => Date.now(),
      _2652: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      _2653: (x0,x1,x2) => x0.fetch(x1,x2),
      _2654: (x0,x1) => x0.get(x1),
      _2655: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._2655(f,arguments.length,x0,x1,x2) }),
      _2656: (x0,x1) => x0.forEach(x1),
      _2657: x0 => x0.abort(),
      _2658: () => new AbortController(),
      _2659: x0 => x0.getReader(),
      _2660: x0 => x0.read(),
      _2661: x0 => x0.cancel(),
      _2678: x0 => x0.trustedTypes,
      _2680: (x0,x1) => x0.text = x1,
      _2696: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _2697: (x0,x1) => x0.exec(x1),
      _2698: (x0,x1) => x0.test(x1),
      _2699: (x0,x1) => x0.exec(x1),
      _2700: (x0,x1) => x0.exec(x1),
      _2701: x0 => x0.pop(),
      _2703: o => o === undefined,
      _2722: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _2724: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      _2725: o => o instanceof RegExp,
      _2726: (l, r) => l === r,
      _2727: o => o,
      _2728: o => o,
      _2729: o => o,
      _2730: b => !!b,
      _2731: o => o.length,
      _2734: (o, i) => o[i],
      _2735: f => f.dartFunction,
      _2736: l => arrayFromDartList(Int8Array, l),
      _2737: l => arrayFromDartList(Uint8Array, l),
      _2738: l => arrayFromDartList(Uint8ClampedArray, l),
      _2739: l => arrayFromDartList(Int16Array, l),
      _2740: l => arrayFromDartList(Uint16Array, l),
      _2741: l => arrayFromDartList(Int32Array, l),
      _2742: l => arrayFromDartList(Uint32Array, l),
      _2743: l => arrayFromDartList(Float32Array, l),
      _2744: l => arrayFromDartList(Float64Array, l),
      _2745: x0 => new ArrayBuffer(x0),
      _2746: (data, length) => {
        const getValue = dartInstance.exports.$byteDataGetUint8;
        const view = new DataView(new ArrayBuffer(length));
        for (let i = 0; i < length; i++) {
          view.setUint8(i, getValue(data, i));
        }
        return view;
      },
      _2747: l => arrayFromDartList(Array, l),
      _2748: () => ({}),
      _2749: () => [],
      _2750: l => new Array(l),
      _2751: () => globalThis,
      _2752: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      _2753: (o, p) => p in o,
      _2754: (o, p) => o[p],
      _2755: (o, p, v) => o[p] = v,
      _2756: (o, m, a) => o[m].apply(o, a),
      _2758: o => String(o),
      _2759: (p, s, f) => p.then(s, f),
      _2760: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        return 17;
      },
      _2761: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2762: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2763: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI16ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2764: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI16ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2765: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2766: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2767: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2768: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2769: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2770: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2771: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      _2773: x0 => x0.input,
      _2774: x0 => x0.index,
      _2775: x0 => x0.groups,
      _2777: (x0,x1) => x0.exec(x1),
      _2779: x0 => x0.flags,
      _2780: x0 => x0.multiline,
      _2781: x0 => x0.ignoreCase,
      _2782: x0 => x0.unicode,
      _2783: x0 => x0.dotAll,
      _2784: (x0,x1) => x0.lastIndex = x1,
      _2785: (o, p) => p in o,
      _2786: (o, p) => o[p],
      _2787: (o, p, v) => o[p] = v,
      _2788: (o, p) => delete o[p],
      _2789: x0 => x0.random(),
      _2790: x0 => x0.random(),
      _2791: (x0,x1) => x0.getRandomValues(x1),
      _2792: () => globalThis.crypto,
      _2794: () => globalThis.Math,
      _2796: Function.prototype.call.bind(Number.prototype.toString),
      _2797: (d, digits) => d.toFixed(digits),
      _2801: () => globalThis.document,
      _2825: x0 => x0.src,
      _2826: (x0,x1) => x0.src = x1,
      _2827: x0 => x0.naturalWidth,
      _2828: x0 => x0.naturalHeight,
      _2853: x0 => x0.status,
      _2854: (x0,x1) => x0.responseType = x1,
      _2856: x0 => x0.response,
      _4242: (x0,x1) => x0.type = x1,
      _4250: (x0,x1) => x0.crossOrigin = x1,
      _4252: (x0,x1) => x0.text = x1,
      _4727: () => globalThis.window,
      _4772: x0 => x0.location,
      _4791: x0 => x0.navigator,
      _5053: x0 => x0.trustedTypes,
      _5054: x0 => x0.sessionStorage,
      _5070: x0 => x0.hostname,
      _5163: x0 => x0.geolocation,
      _5166: x0 => x0.mediaDevices,
      _5168: x0 => x0.permissions,
      _5182: x0 => x0.userAgent,
      _7429: x0 => x0.signal,
      _7508: () => globalThis.document,
      _7603: x0 => x0.head,
      _9333: x0 => x0.value,
      _9335: x0 => x0.done,
      _10058: x0 => x0.url,
      _10060: x0 => x0.status,
      _10062: x0 => x0.statusText,
      _10063: x0 => x0.headers,
      _10064: x0 => x0.body,
      _10204: (x0,x1) => x0.continuous = x1,
      _10206: (x0,x1) => x0.interimResults = x1,
      _10214: (x0,x1) => x0.onspeechstart = x1,
      _10222: (x0,x1) => x0.onresult = x1,
      _10224: (x0,x1) => x0.onnomatch = x1,
      _10226: (x0,x1) => x0.onerror = x1,
      _10228: (x0,x1) => x0.onstart = x1,
      _10230: (x0,x1) => x0.onend = x1,
      _10231: x0 => x0.error,
      _10233: x0 => x0.transcript,
      _10234: x0 => x0.confidence,
      _10237: x0 => x0.length,
      _10240: x0 => x0.length,
      _10242: x0 => x0.results,
      _14456: () => globalThis.console,
      _14485: () => globalThis.window.flutterCanvasKit,
      _14486: () => globalThis.window._flutter_skwasmInstance,
      _14487: x0 => x0.name,
      _14488: x0 => x0.message,
      _14489: x0 => x0.code,
      _14491: x0 => x0.customData,

    };

    const baseImports = {
      dart2wasm: dart2wasm,


      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
    };

    const deferredLibraryHelper = {
      "loadModule": async (moduleName) => {
        if (!loadDeferredWasm) {
          throw "No implementation of loadDeferredWasm provided.";
        }
        const source = await Promise.resolve(loadDeferredWasm(moduleName));
        const module = await ((source instanceof Response)
            ? WebAssembly.compileStreaming(source, this.builtins)
            : WebAssembly.compile(source, this.builtins));
        return await WebAssembly.instantiate(module, {
          ...baseImports,
          ...additionalImports,
          "wasm:js-string": jsStringPolyfill,
          "module0": dartInstance.exports,
        });
      },
    };

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      "deferredLibraryHelper": deferredLibraryHelper,
      "wasm:js-string": jsStringPolyfill,
    });

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}

