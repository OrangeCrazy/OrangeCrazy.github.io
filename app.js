"use strict";

const PREVIEW_DPI = 96;
const MM_PER_INCH = 25.4;

const PAPER_SIZES = {
  A2: { label: "A2", widthMm: 420, heightMm: 594 },
  A3: { label: "A3", widthMm: 297, heightMm: 420 },
  A4: { label: "A4", widthMm: 210, heightMm: 297 },
  A5: { label: "A5", widthMm: 148, heightMm: 210 },
};

const PHOTO_SIZES = {
  "4R": { nameKey: "photoSize4R", widthMm: 102, heightMm: 152 },
  "5R": { nameKey: "photoSize5R", widthMm: 127, heightMm: 178 },
  "6R": { nameKey: "photoSize6R", widthMm: 152, heightMm: 203 },
  "7R": { nameKey: "photoSize7R", widthMm: 178, heightMm: 254 },
  "8R": { nameKey: "photoSize8R", widthMm: 203, heightMm: 254 },
};

const I18N = {
  "zh-CN": {
    pageTitle: "照片排版工具",
    appTitle: "照片排版",
    appSubtitle: "按真实照片尺寸裁切、排版并导出打印图。",
    repoLink: "GitHub 仓库 / 提交 Issue",
    addPhotos: "添加照片",
    paper: "纸张",
    paperSize: "纸张尺寸",
    rotatePage: "旋转画布",
    exportDpi: "导出 DPI",
    pageMargin: "裁切边距(mm)",
    photoGap: "照片间距(mm)",
    bleed: "出血(mm)",
    currentPhoto: "当前照片",
    printSize: "打印尺寸",
    rotatePhoto: "旋转照片",
    rotateSize: "旋转尺寸",
    fitFill: "适配填满",
    removePhoto: "移除照片",
    moveFrameMode: "移动照片框",
    moveImageMode: "移动照片内容",
    lockPhoto: "锁定照片",
    unlockPhoto: "取消锁定",
    lockedLabel: "已锁定",
    autoMoveFrame: "自动移动照片框",
    batchPagePrompt: "本次一次性添加 {count} 张照片。请输入用于排版这批照片的画布数量：",
    layout: "排版",
    autoLayout: "智能排版",
    addPage: "新增画布",
    exportCurrent: "导出当前画布 PNG",
    exportAll: "导出全部画布 PNG",
    hint: "左键或单指拖动照片内图像选取区域，滚轮或双指缩放。右键或长按照片可打开快捷菜单。",
    language: "语言",
    zoom: "缩放",
    autoZoom: "自适应",
    zoomControls: "画布缩放控制",
    zoomOut: "缩小画布",
    zoomIn: "放大画布",
    pageTab: "画布 {n}",
    portrait: "纵向",
    landscape: "横向",
    status: "{paper} {direction} {width}x{height}mm，{pages} 张画布，当前 {current} 张照片，共 {total} 张",
    largeExportWarning: "当前导出约 {mp} 百万像素，可能需要较多内存并导致浏览器短暂卡顿。是否继续？",
    photoSize4R: "4 寸 4R",
    photoSize5R: "5 寸 5R",
    photoSize6R: "6 寸 6R",
    photoSize7R: "7 寸 7R",
    photoSize8R: "8 寸 8R",
  },
  "zh-HK": {
    pageTitle: "照片排版工具",
    appTitle: "照片排版",
    appSubtitle: "依真實照片尺寸裁切、排版並匯出列印圖。",
    repoLink: "GitHub 倉庫 / 提交 Issue",
    addPhotos: "加入照片",
    paper: "紙張",
    paperSize: "紙張尺寸",
    rotatePage: "旋轉畫布",
    exportDpi: "匯出 DPI",
    pageMargin: "裁切邊距(mm)",
    photoGap: "照片間距(mm)",
    bleed: "出血(mm)",
    currentPhoto: "目前照片",
    printSize: "列印尺寸",
    rotatePhoto: "旋轉照片",
    rotateSize: "旋轉尺寸",
    fitFill: "適配填滿",
    removePhoto: "移除照片",
    moveFrameMode: "移動照片框",
    moveImageMode: "移動照片內容",
    lockPhoto: "鎖定照片",
    unlockPhoto: "取消鎖定",
    lockedLabel: "已鎖定",
    autoMoveFrame: "自動移動照片框",
    batchPagePrompt: "本次一次加入 {count} 張照片。請輸入用於排版這批照片的畫布數量：",
    layout: "排版",
    autoLayout: "智慧排版",
    addPage: "新增畫布",
    exportCurrent: "匯出目前畫布 PNG",
    exportAll: "匯出全部畫布 PNG",
    hint: "左鍵或單指拖動照片內圖像選取區域，滾輪或雙指縮放。右鍵或長按照片可開啟快捷選單。",
    language: "語言",
    zoom: "縮放",
    autoZoom: "自適應",
    zoomControls: "畫布縮放控制",
    zoomOut: "縮小畫布",
    zoomIn: "放大畫布",
    pageTab: "畫布 {n}",
    portrait: "直向",
    landscape: "橫向",
    status: "{paper} {direction} {width}x{height}mm，{pages} 張畫布，目前 {current} 張照片，共 {total} 張",
    largeExportWarning: "目前匯出約 {mp} 百萬像素，可能需要較多記憶體並造成瀏覽器短暫卡頓。是否繼續？",
    photoSize4R: "4 吋 4R",
    photoSize5R: "5 吋 5R",
    photoSize6R: "6 吋 6R",
    photoSize7R: "7 吋 7R",
    photoSize8R: "8 吋 8R",
  },
  en: {
    pageTitle: "Photo Print Layout",
    appTitle: "Photo Layout",
    appSubtitle: "Crop, arrange, and export print-ready images at real photo sizes.",
    repoLink: "GitHub Repository / Submit Issue",
    addPhotos: "Add Photos",
    paper: "Paper",
    paperSize: "Paper Size",
    rotatePage: "Rotate Canvas",
    exportDpi: "Export DPI",
    pageMargin: "Cut Margin (mm)",
    photoGap: "Photo Gap (mm)",
    bleed: "Bleed (mm)",
    currentPhoto: "Current Photo",
    printSize: "Print Size",
    rotatePhoto: "Rotate Photo",
    rotateSize: "Rotate Size",
    fitFill: "Fit to Fill",
    removePhoto: "Remove Photo",
    moveFrameMode: "Move Frame",
    moveImageMode: "Move Image",
    lockPhoto: "Lock Photo",
    unlockPhoto: "Unlock",
    lockedLabel: "Locked",
    autoMoveFrame: "Auto Move Frame",
    batchPagePrompt: "You are adding {count} photos at once. Enter the number of canvases for this batch:",
    layout: "Layout",
    autoLayout: "Smart Layout",
    addPage: "Add Canvas",
    exportCurrent: "Export Current PNG",
    exportAll: "Export All PNG",
    hint: "Drag inside a photo with mouse or one finger. Use wheel or pinch to zoom. Right-click or long-press for the shortcut menu.",
    language: "Language",
    zoom: "Zoom",
    autoZoom: "Auto",
    zoomControls: "Canvas zoom controls",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    pageTab: "Canvas {n}",
    portrait: "Portrait",
    landscape: "Landscape",
    status: "{paper} {direction} {width}x{height}mm, {pages} canvas(es), {current} photo(s) on current, {total} total",
    largeExportWarning: "This export is about {mp} megapixels and may need a lot of memory. Continue?",
    photoSize4R: "4 inch 4R",
    photoSize5R: "5 inch 5R",
    photoSize6R: "6 inch 6R",
    photoSize7R: "7 inch 7R",
    photoSize8R: "8 inch 8R",
  },
};

const els = {
  canvas: document.getElementById("previewCanvas"),
  canvasWrap: document.getElementById("canvasWrap"),
  fileInput: document.getElementById("fileInput"),
  paperSelect: document.getElementById("paperSelect"),
  rotatePageButton: document.getElementById("rotatePageButton"),
  dpiSelect: document.getElementById("dpiSelect"),
  pageMargin: document.getElementById("pageMargin"),
  photoGap: document.getElementById("photoGap"),
  bleed: document.getElementById("bleed"),
  sizeSelect: document.getElementById("sizeSelect"),
  rotatePhotoButton: document.getElementById("rotatePhotoButton"),
  rotateButton: document.getElementById("rotateButton"),
  fitButton: document.getElementById("fitButton"),
  removeButton: document.getElementById("removeButton"),
  moveFrameButton: document.getElementById("moveFrameButton"),
  lockButton: document.getElementById("lockButton"),
  autoLayoutButton: document.getElementById("autoLayoutButton"),
  addPageButton: document.getElementById("addPageButton"),
  exportButton: document.getElementById("exportButton"),
  exportAllButton: document.getElementById("exportAllButton"),
  zoomOutButton: document.getElementById("zoomOutButton"),
  zoomInput: document.getElementById("zoomInput"),
  zoomInButton: document.getElementById("zoomInButton"),
  zoomAutoButton: document.getElementById("zoomAutoButton"),
  languageSelect: document.getElementById("languageSelect"),
  pageTabs: document.getElementById("pageTabs"),
  status: document.getElementById("status"),
  contextMenu: document.getElementById("contextMenu"),
};

const ctx = els.canvas.getContext("2d");

const state = {
  pages: [newPage()],
  activePage: 0,
  selectedId: null,
  drag: null,
  paperKey: "A4",
  pageLandscape: false,
  pointers: new Map(),
  longPressTimer: null,
  pinch: null,
  zoomMode: "auto",
  zoom: 1,
  lang: detectLanguage(),
  frameMoveMode: false,
};

function newPage() {
  return { photos: [] };
}

function detectLanguage() {
  const browserLang = (navigator.language || navigator.userLanguage || "zh-CN").toLowerCase();
  if (browserLang.startsWith("zh-tw") || browserLang.startsWith("zh-hk") || browserLang.startsWith("zh-mo")) {
    return "zh-HK";
  }
  if (browserLang.startsWith("zh")) {
    return "zh-CN";
  }
  return "en";
}

function t(key, params = {}) {
  const dict = I18N[state?.lang] || I18N["zh-CN"];
  const fallback = I18N["zh-CN"][key] || key;
  return (dict[key] || fallback).replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

function photoSizeLabel(sizeKey) {
  const size = PHOTO_SIZES[sizeKey];
  return `${t(size.nameKey)} ${size.widthMm}x${size.heightMm}mm`;
}

function updatePhotoSizeOptions() {
  for (const option of els.sizeSelect.options) {
    option.textContent = photoSizeLabel(option.value);
  }
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.title = t("pageTitle");
  els.languageSelect.value = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.title = t(node.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });
  updatePhotoSizeOptions();
  syncSelectedControls();
  updateTabs();
  updateStatus();
}

function mmToPx(mm, dpi = PREVIEW_DPI) {
  return mm / MM_PER_INCH * dpi;
}

function pxToMm(px, dpi = PREVIEW_DPI) {
  return px / dpi * MM_PER_INCH;
}

function pageSizeMm() {
  const paper = PAPER_SIZES[state.paperKey];
  return state.pageLandscape
    ? { widthMm: paper.heightMm, heightMm: paper.widthMm }
    : { widthMm: paper.widthMm, heightMm: paper.heightMm };
}

function pageSizePx(dpi = PREVIEW_DPI) {
  const size = pageSizeMm();
  return {
    width: Math.round(mmToPx(size.widthMm, dpi)),
    height: Math.round(mmToPx(size.heightMm, dpi)),
  };
}

function resizeCanvas() {
  const size = pageSizePx();
  els.canvas.width = size.width;
  els.canvas.height = size.height;
  updateCanvasZoom();
}

function autoZoom() {
  const size = pageSizePx();
  const wrapRect = els.canvasWrap.getBoundingClientRect();
  const availableW = Math.max(160, wrapRect.width - 52);
  const availableH = Math.max(160, wrapRect.height - 52);
  return Math.min(1, availableW / size.width, availableH / size.height);
}

function clampZoom(zoom) {
  return Math.min(3, Math.max(0.1, zoom));
}

function updateCanvasZoom() {
  if (state.zoomMode === "auto") {
    state.zoom = autoZoom();
  } else {
    state.zoom = clampZoom(state.zoom);
  }
  const size = pageSizePx();
  els.canvas.style.width = `${Math.round(size.width * state.zoom)}px`;
  els.canvas.style.height = `${Math.round(size.height * state.zoom)}px`;
  els.zoomInput.value = Math.round(state.zoom * 100);
  els.zoomAutoButton.classList.toggle("active", state.zoomMode === "auto");
}

function setManualZoom(nextZoom) {
  state.zoomMode = "manual";
  state.zoom = clampZoom(nextZoom);
  updateCanvasZoom();
}

function activePage() {
  return state.pages[state.activePage];
}

function selectedPhoto() {
  return activePage().photos.find((photo) => photo.id === state.selectedId) || null;
}

function photoRect(photo, dpi = PREVIEW_DPI) {
  return {
    x: mmToPx(photo.xMm, dpi),
    y: mmToPx(photo.yMm, dpi),
    w: mmToPx(photo.widthMm, dpi),
    h: mmToPx(photo.heightMm, dpi),
  };
}

function makeId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

async function loadImage(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  await img.decode();
  return { img, url };
}

function coverScale(photo) {
  const imageSize = rotatedImageSizeMm(photo, 1);
  const scaleX = photo.widthMm / imageSize.widthMm;
  const scaleY = photo.heightMm / imageSize.heightMm;
  return Math.max(scaleX, scaleY);
}

function rotatedImageSizeMm(photo, scale = photo.scale) {
  const baseW = pxToMm(photo.img.naturalWidth) * scale;
  const baseH = pxToMm(photo.img.naturalHeight) * scale;
  const quarterTurns = Math.abs((photo.rotationDeg || 0) / 90) % 2;
  return quarterTurns
    ? { widthMm: baseH, heightMm: baseW }
    : { widthMm: baseW, heightMm: baseH };
}

function resetImageTransform(photo) {
  photo.scale = coverScale(photo);
  photo.offsetMmX = 0;
  photo.offsetMmY = 0;
  clampPhotoOffset(photo);
}

function clampPhotoOffset(photo) {
  const imageSize = rotatedImageSizeMm(photo);
  const maxX = Math.max(0, (imageSize.widthMm - photo.widthMm) / 2);
  const maxY = Math.max(0, (imageSize.heightMm - photo.heightMm) / 2);
  photo.offsetMmX = Math.min(maxX, Math.max(-maxX, photo.offsetMmX));
  photo.offsetMmY = Math.min(maxY, Math.max(-maxY, photo.offsetMmY));
}

function drawPhoto(targetCtx, photo, dpi, options = {}) {
  const rect = photoRect(photo, dpi);
  targetCtx.save();
  targetCtx.beginPath();
  targetCtx.rect(rect.x, rect.y, rect.w, rect.h);
  targetCtx.clip();

  const imageW = mmToPx(pxToMm(photo.img.naturalWidth) * photo.scale, dpi);
  const imageH = mmToPx(pxToMm(photo.img.naturalHeight) * photo.scale, dpi);
  const centerX = rect.x + rect.w / 2 + mmToPx(photo.offsetMmX, dpi);
  const centerY = rect.y + rect.h / 2 + mmToPx(photo.offsetMmY, dpi);
  targetCtx.imageSmoothingEnabled = true;
  targetCtx.imageSmoothingQuality = "high";
  targetCtx.translate(centerX, centerY);
  targetCtx.rotate((photo.rotationDeg || 0) * Math.PI / 180);
  targetCtx.drawImage(photo.img, -imageW / 2, -imageH / 2, imageW, imageH);
  targetCtx.restore();

  if (options.guides) {
    drawGuides(targetCtx, photo, dpi, rect, options.selected);
  }
}

function drawGuides(targetCtx, photo, dpi, rect, selected) {
  const bleed = Number(els.bleed.value) || 0;
  targetCtx.save();
  targetCtx.lineWidth = selected ? 2 : 1;
  targetCtx.strokeStyle = selected ? "#147a78" : "rgba(29, 36, 51, 0.55)";
  targetCtx.strokeRect(rect.x, rect.y, rect.w, rect.h);

  if (bleed > 0) {
    const b = mmToPx(bleed, dpi);
    targetCtx.setLineDash([6, 4]);
    targetCtx.strokeStyle = selected ? "#c64242" : "rgba(198, 66, 66, 0.75)";
    targetCtx.strokeRect(rect.x + b, rect.y + b, rect.w - 2 * b, rect.h - 2 * b);
  }

  targetCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
  targetCtx.fillRect(rect.x + 5, rect.y + 5, 84, 22);
  targetCtx.fillStyle = "#1d2433";
  targetCtx.font = "12px Segoe UI, Microsoft YaHei, sans-serif";
  targetCtx.fillText(photo.sizeKey, rect.x + 12, rect.y + 20);
  if (photo.locked) {
    targetCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
    targetCtx.fillRect(rect.x + rect.w - 70, rect.y + 5, 64, 22);
    targetCtx.fillStyle = "#c64242";
    targetCtx.fillText(t("lockedLabel"), rect.x + rect.w - 62, rect.y + 20);
  }
  targetCtx.restore();
}

function draw() {
  const pagePx = pageSizePx();
  ctx.clearRect(0, 0, pagePx.width, pagePx.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, pagePx.width, pagePx.height);

  const margin = mmToPx(Number(els.pageMargin.value) || 0);
  ctx.save();
  ctx.setLineDash([8, 5]);
  ctx.strokeStyle = "rgba(20, 122, 120, 0.55)";
  ctx.strokeRect(margin, margin, pagePx.width - margin * 2, pagePx.height - margin * 2);
  ctx.restore();

  for (const photo of activePage().photos) {
    drawPhoto(ctx, photo, PREVIEW_DPI, { guides: true, selected: photo.id === state.selectedId });
  }

  updateTabs();
  updateStatus();
}

function updateTabs() {
  els.pageTabs.innerHTML = "";
  state.pages.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = t("pageTab", { n: index + 1 });
    button.className = index === state.activePage ? "active" : "";
    button.addEventListener("click", () => {
      state.activePage = index;
      state.selectedId = activePage().photos[0]?.id || null;
      syncSelectedControls();
      draw();
    });
    els.pageTabs.appendChild(button);
  });
}

function updateStatus() {
  const total = state.pages.reduce((sum, page) => sum + page.photos.length, 0);
  const current = activePage().photos.length;
  const size = pageSizeMm();
  const paper = PAPER_SIZES[state.paperKey].label;
  const direction = state.pageLandscape ? t("landscape") : t("portrait");
  els.status.textContent = t("status", {
    paper,
    direction,
    width: size.widthMm,
    height: size.heightMm,
    pages: state.pages.length,
    current,
    total,
  });
}

function syncSelectedControls() {
  const photo = selectedPhoto();
  const locked = !!photo?.locked;
  els.sizeSelect.disabled = !photo || locked;
  els.rotatePhotoButton.disabled = !photo || locked;
  els.rotateButton.disabled = !photo || locked;
  els.fitButton.disabled = !photo || locked;
  els.removeButton.disabled = !photo;
  els.moveFrameButton.disabled = !photo || locked;
  els.lockButton.disabled = !photo;
  els.moveFrameButton.textContent = state.frameMoveMode ? t("moveImageMode") : t("moveFrameMode");
  els.moveFrameButton.classList.toggle("active", state.frameMoveMode);
  if (photo) {
    els.sizeSelect.value = photo.sizeKey;
    els.lockButton.textContent = photo.locked ? t("unlockPhoto") : t("lockPhoto");
    els.lockButton.classList.toggle("active", !!photo.locked);
  } else {
    els.lockButton.textContent = t("lockPhoto");
    els.lockButton.classList.remove("active");
  }
}

function pointFromEvent(event) {
  const bounds = els.canvas.getBoundingClientRect();
  const x = (event.clientX - bounds.left) * els.canvas.width / bounds.width;
  const y = (event.clientY - bounds.top) * els.canvas.height / bounds.height;
  return { x, y };
}

function rememberPointer(event) {
  state.pointers.set(event.pointerId, {
    clientX: event.clientX,
    clientY: event.clientY,
    point: pointFromEvent(event),
    pointerType: event.pointerType,
  });
}

function forgetPointer(event) {
  state.pointers.delete(event.pointerId);
  if (state.pointers.size < 2) {
    state.pinch = null;
  }
}

function clearLongPress() {
  if (state.longPressTimer) {
    clearTimeout(state.longPressTimer);
    state.longPressTimer = null;
  }
}

function pointerDistance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function beginPinchIfReady() {
  if (state.pointers.size !== 2) return false;
  const [first, second] = [...state.pointers.values()];
  const target = hitTest(first.point) || hitTest(second.point);
  if (!target) return false;
  state.selectedId = target.id;
  state.drag = null;
  state.pinch = {
    id: target.id,
    startDistance: pointerDistance(first, second),
    startScale: target.scale,
  };
  syncSelectedControls();
  draw();
  return true;
}

function updatePinchScale() {
  if (!state.pinch || state.pointers.size !== 2) return false;
  const photo = selectedPhoto();
  if (!photo || photo.id !== state.pinch.id) return false;
  const [first, second] = [...state.pointers.values()];
  const distance = pointerDistance(first, second);
  if (!state.pinch.startDistance) return false;
  const nextScale = state.pinch.startScale * (distance / state.pinch.startDistance);
  photo.scale = Math.max(coverScale(photo), Math.min(nextScale, coverScale(photo) * 8));
  clampPhotoOffset(photo);
  draw();
  return true;
}

function hitTest(point) {
  for (let i = activePage().photos.length - 1; i >= 0; i -= 1) {
    const photo = activePage().photos[i];
    const rect = photoRect(photo);
    if (point.x >= rect.x && point.x <= rect.x + rect.w && point.y >= rect.y && point.y <= rect.y + rect.h) {
      return photo;
    }
  }
  return null;
}

function setPhotoSize(photo, sizeKey, keepOrientation = true) {
  const size = PHOTO_SIZES[sizeKey];
  const landscape = keepOrientation && photo.widthMm > photo.heightMm;
  photo.sizeKey = sizeKey;
  photo.widthMm = landscape ? size.heightMm : size.widthMm;
  photo.heightMm = landscape ? size.widthMm : size.heightMm;
  resetImageTransform(photo);
  if (!photo.locked) {
    autoLayout({ keepSelection: photo.id });
  } else {
    draw();
  }
}

function rotateSelected() {
  const photo = selectedPhoto();
  if (!photo) return;
  const nextW = photo.heightMm;
  photo.heightMm = photo.widthMm;
  photo.widthMm = nextW;
  resetImageTransform(photo);
  if (!photo.locked) {
    autoLayout({ keepSelection: photo.id });
  } else {
    draw();
  }
}

function rotatePhotoContent(photo = selectedPhoto()) {
  if (!photo) return;
  photo.rotationDeg = ((photo.rotationDeg || 0) + 90) % 360;
  resetImageTransform(photo);
  draw();
}

function togglePhotoLock(photo = selectedPhoto()) {
  if (!photo) return;
  photo.locked = !photo.locked;
  syncSelectedControls();
  draw();
}

function rotatePage() {
  state.pageLandscape = !state.pageLandscape;
  resizeCanvas();
  autoLayout();
  draw();
}

function removePhoto(photoId = state.selectedId) {
  const page = activePage();
  const index = page.photos.findIndex((photo) => photo.id === photoId);
  if (index < 0) return;
  page.photos.splice(index, 1);
  state.selectedId = page.photos[Math.min(index, page.photos.length - 1)]?.id || null;
  state.drag = null;
  hideContextMenu();
  syncSelectedControls();
  draw();
}

function addPhotoToCurrentPage(imageData, sizeKey = "4R") {
  const size = PHOTO_SIZES[sizeKey];
  const photo = {
    id: makeId(),
    name: imageData.name,
    img: imageData.img,
    url: imageData.url,
    sizeKey,
    xMm: Number(els.pageMargin.value) || 5,
    yMm: Number(els.pageMargin.value) || 5,
    widthMm: size.widthMm,
    heightMm: size.heightMm,
    rotationDeg: 0,
    locked: false,
    scale: 1,
    offsetMmX: 0,
    offsetMmY: 0,
  };
  resetImageTransform(photo);
  activePage().photos.push(photo);
  state.selectedId = photo.id;
  return photo;
}

function createPhoto(imageData, sizeKey = "4R") {
  const size = PHOTO_SIZES[sizeKey];
  const photo = {
    id: makeId(),
    name: imageData.name,
    img: imageData.img,
    url: imageData.url,
    sizeKey,
    xMm: Number(els.pageMargin.value) || 5,
    yMm: Number(els.pageMargin.value) || 5,
    widthMm: size.widthMm,
    heightMm: size.heightMm,
    rotationDeg: 0,
    locked: false,
    scale: 1,
    offsetMmX: 0,
    offsetMmY: 0,
  };
  resetImageTransform(photo);
  return photo;
}

function occupiedRectsForPage(page) {
  return page.photos.map((photo) => ({
    xMm: photo.xMm,
    yMm: photo.yMm,
    widthMm: photo.widthMm,
    heightMm: photo.heightMm,
  }));
}

function placeNewPhotos(photos, minPages = 1) {
  while (state.pages.length < minPages) {
    state.pages.push(newPage());
  }
  const occupiedByPage = state.pages.map(occupiedRectsForPage);
  for (const photo of photos) {
    let placed = false;
    for (let pageIndex = 0; pageIndex < state.pages.length; pageIndex += 1) {
      if (placePhotoOnPage(photo, state.pages[pageIndex], occupiedByPage[pageIndex])) {
        placed = true;
        break;
      }
    }
    if (!placed) {
      const page = newPage();
      state.pages.push(page);
      occupiedByPage.push([]);
      if (!placePhotoOnPage(photo, page, occupiedByPage[occupiedByPage.length - 1])) {
        forcePlacePhotoOnPage(photo, page, occupiedByPage[occupiedByPage.length - 1]);
      }
    }
  }
  const last = photos[photos.length - 1];
  if (last) {
    const pageIndex = state.pages.findIndex((page) => page.photos.includes(last));
    state.activePage = pageIndex >= 0 ? pageIndex : state.activePage;
    state.selectedId = last.id;
  }
  syncSelectedControls();
  draw();
}

function simulatedPagesNeeded(count, sizeKey) {
  const size = PHOTO_SIZES[sizeKey];
  const photos = Array.from({ length: count }, () => ({
    widthMm: size.widthMm,
    heightMm: size.heightMm,
    xMm: 0,
    yMm: 0,
  }));
  const pages = [newPage()];
  const occupiedByPage = [[]];
  for (const photo of photos) {
    let placed = false;
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
      if (placePhotoOnPage(photo, pages[pageIndex], occupiedByPage[pageIndex])) {
        placed = true;
        break;
      }
    }
    if (!placed) {
      pages.push(newPage());
      occupiedByPage.push([]);
      placePhotoOnPage(photo, pages[pages.length - 1], occupiedByPage[occupiedByPage.length - 1]);
    }
  }
  return pages.length;
}

function chooseBatchSizeKey(count, pageCount) {
  const sizeKeys = Object.keys(PHOTO_SIZES).sort((a, b) => {
    const areaA = PHOTO_SIZES[a].widthMm * PHOTO_SIZES[a].heightMm;
    const areaB = PHOTO_SIZES[b].widthMm * PHOTO_SIZES[b].heightMm;
    return areaB - areaA;
  });
  return sizeKeys.find((key) => simulatedPagesNeeded(count, key) <= pageCount) || "4R";
}

function askBatchPageCount(count) {
  const answer = prompt(t("batchPagePrompt", { count }), "1");
  if (answer === null) return null;
  const pageCount = Math.floor(Number(answer));
  return Number.isFinite(pageCount) && pageCount > 0 ? pageCount : 1;
}

function rectsOverlap(a, b, gap = 0) {
  return !(
    a.xMm + a.widthMm + gap <= b.xMm ||
    b.xMm + b.widthMm + gap <= a.xMm ||
    a.yMm + a.heightMm + gap <= b.yMm ||
    b.yMm + b.heightMm + gap <= a.yMm
  );
}

function fitsOnPage(photo, xMm, yMm, occupied) {
  const margin = Number(els.pageMargin.value) || 0;
  const gap = Number(els.photoGap.value) || 0;
  const pageSize = pageSizeMm();
  const maxX = pageSize.widthMm - margin;
  const maxY = pageSize.heightMm - margin;
  const candidate = { xMm, yMm, widthMm: photo.widthMm, heightMm: photo.heightMm };
  if (xMm < margin || yMm < margin || xMm + photo.widthMm > maxX || yMm + photo.heightMm > maxY) {
    return false;
  }
  return !occupied.some((rect) => rectsOverlap(candidate, rect, gap));
}

function placePhotoOnPage(photo, page, occupied) {
  const margin = Number(els.pageMargin.value) || 0;
  const gap = Number(els.photoGap.value) || 0;
  const pageSize = pageSizeMm();
  const maxX = pageSize.widthMm - margin;
  const maxY = pageSize.heightMm - margin;
  const step = Math.max(2, gap || 2);
  const candidates = [{ xMm: margin, yMm: margin }];
  for (const rect of occupied) {
    candidates.push({ xMm: rect.xMm + rect.widthMm + gap, yMm: rect.yMm });
    candidates.push({ xMm: rect.xMm, yMm: rect.yMm + rect.heightMm + gap });
  }
  for (let yMm = margin; yMm + photo.heightMm <= maxY; yMm += step) {
    candidates.push({ xMm: margin, yMm });
  }
  for (let xMm = margin; xMm + photo.widthMm <= maxX; xMm += step) {
    candidates.push({ xMm, yMm: margin });
  }
  candidates.sort((a, b) => a.yMm - b.yMm || a.xMm - b.xMm);
  for (const candidate of candidates) {
    if (fitsOnPage(photo, candidate.xMm, candidate.yMm, occupied)) {
      photo.xMm = candidate.xMm;
      photo.yMm = candidate.yMm;
      page.photos.push(photo);
      occupied.push({ xMm: photo.xMm, yMm: photo.yMm, widthMm: photo.widthMm, heightMm: photo.heightMm });
      return true;
    }
  }
  return false;
}

function forcePlacePhotoOnPage(photo, page, occupied) {
  const margin = Number(els.pageMargin.value) || 0;
  photo.xMm = margin;
  photo.yMm = margin;
  page.photos.push(photo);
  occupied.push({ xMm: photo.xMm, yMm: photo.yMm, widthMm: photo.widthMm, heightMm: photo.heightMm });
}

function clampFramePosition(photo) {
  const pageSize = pageSizeMm();
  const margin = Number(els.pageMargin.value) || 0;
  const maxX = Math.max(margin, pageSize.widthMm - margin - photo.widthMm);
  const maxY = Math.max(margin, pageSize.heightMm - margin - photo.heightMm);
  photo.xMm = Math.min(maxX, Math.max(margin, photo.xMm));
  photo.yMm = Math.min(maxY, Math.max(margin, photo.yMm));
}

function autoLayout(options = {}) {
  const keepSelection = options.keepSelection ?? state.selectedId;
  const oldActiveId = keepSelection;
  const allPhotos = state.pages.flatMap((page, pageIndex) => page.photos.map((photo, photoIndex) => ({
    photo,
    pageIndex,
    photoIndex,
  })));
  if (!allPhotos.length) return;

  const lockedEntries = allPhotos.filter((entry) => entry.photo.locked);
  const unlockedEntries = allPhotos.filter((entry) => !entry.photo.locked);
  const minPages = Math.max(1, options.minPages || 1, ...lockedEntries.map((entry) => entry.pageIndex + 1));
  state.pages = Array.from({ length: minPages }, () => newPage());
  const occupiedByPage = state.pages.map(() => []);

  for (const entry of lockedEntries) {
    while (state.pages.length <= entry.pageIndex) {
      state.pages.push(newPage());
      occupiedByPage.push([]);
    }
    state.pages[entry.pageIndex].photos.push(entry.photo);
    occupiedByPage[entry.pageIndex].push({
      xMm: entry.photo.xMm,
      yMm: entry.photo.yMm,
      widthMm: entry.photo.widthMm,
      heightMm: entry.photo.heightMm,
    });
  }

  for (const entry of unlockedEntries) {
    const photo = entry.photo;
    let placed = false;
    for (let pageIndex = 0; pageIndex < state.pages.length; pageIndex += 1) {
      if (placePhotoOnPage(photo, state.pages[pageIndex], occupiedByPage[pageIndex])) {
        placed = true;
        break;
      }
    }
    if (!placed) {
      const page = newPage();
      state.pages.push(page);
      occupiedByPage.push([]);
      if (!placePhotoOnPage(photo, page, occupiedByPage[occupiedByPage.length - 1])) {
        forcePlacePhotoOnPage(photo, page, occupiedByPage[occupiedByPage.length - 1]);
      }
    }
  }

  state.pages = state.pages.filter((page, index) => page.photos.length || index === 0);
  const selectedPageIndex = state.pages.findIndex((page) => page.photos.some((photo) => photo.id === oldActiveId));
  state.activePage = selectedPageIndex >= 0 ? selectedPageIndex : Math.min(state.activePage, state.pages.length - 1);
  state.selectedId = selectedPhoto() ? state.selectedId : (oldActiveId && selectedPageIndex >= 0 ? oldActiveId : state.pages[state.activePage].photos[0]?.id || null);
  syncSelectedControls();
  draw();
}

function legacyShelfLayout() {
  const allPhotos = state.pages.flatMap((page) => page.photos);
  if (!allPhotos.length) return;

  state.pages = [newPage()];
  state.activePage = 0;

  const margin = Number(els.pageMargin.value) || 0;
  const gap = Number(els.photoGap.value) || 0;
  const pageSize = pageSizeMm();
  const maxX = pageSize.widthMm - margin;
  const maxY = pageSize.heightMm - margin;
  let cursorX = margin;
  let cursorY = margin;
  let rowH = 0;
  let page = state.pages[0];

  for (const photo of allPhotos) {
    const orientations = [
      { w: photo.widthMm, h: photo.heightMm },
      { w: photo.heightMm, h: photo.widthMm },
    ];
    const currentFits = cursorX + orientations[0].w <= maxX;
    const rotatedFits = cursorX + orientations[1].w <= maxX && orientations[1].h <= maxY - cursorY;
    if (!currentFits && rotatedFits) {
      photo.widthMm = orientations[1].w;
      photo.heightMm = orientations[1].h;
      resetImageTransform(photo);
    }

    if (cursorX + photo.widthMm > maxX) {
      cursorX = margin;
      cursorY += rowH + gap;
      rowH = 0;
    }

    if (cursorY + photo.heightMm > maxY) {
      page = newPage();
      state.pages.push(page);
      cursorX = margin;
      cursorY = margin;
      rowH = 0;
    }

    photo.xMm = cursorX;
    photo.yMm = cursorY;
    page.photos.push(photo);
    cursorX += photo.widthMm + gap;
    rowH = Math.max(rowH, photo.heightMm);
  }

  state.selectedId = state.pages[0].photos[0]?.id || null;
  syncSelectedControls();
  draw();
}

function exportPage(pageIndex) {
  const dpi = Number(els.dpiSelect.value) || 300;
  const pageSize = pageSizeMm();
  const output = document.createElement("canvas");
  output.width = Math.round(mmToPx(pageSize.widthMm, dpi));
  output.height = Math.round(mmToPx(pageSize.heightMm, dpi));
  const megapixels = output.width * output.height / 1000000;
  if (megapixels > 220 && !confirm(t("largeExportWarning", { mp: Math.round(megapixels) }))) {
    return;
  }
  const outCtx = output.getContext("2d");
  outCtx.fillStyle = "#fff";
  outCtx.fillRect(0, 0, output.width, output.height);

  for (const photo of state.pages[pageIndex].photos) {
    drawPhoto(outCtx, photo, dpi, { guides: false });
  }

  output.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const direction = state.pageLandscape ? "landscape" : "portrait";
    link.download = `${state.paperKey.toLowerCase()}-${direction}-photo-layout-page-${pageIndex + 1}-${dpi}dpi.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, "image/png");
}

function showContextMenu(event, photo) {
  els.contextMenu.innerHTML = "";
  const rotatePhotoButton = document.createElement("button");
  rotatePhotoButton.type = "button";
  rotatePhotoButton.textContent = t("rotatePhoto");
  rotatePhotoButton.disabled = photo.locked;
  rotatePhotoButton.addEventListener("click", () => {
    rotatePhotoContent(photo);
    hideContextMenu();
  });
  els.contextMenu.appendChild(rotatePhotoButton);

  const rotateSizeButton = document.createElement("button");
  rotateSizeButton.type = "button";
  rotateSizeButton.textContent = t("rotateSize");
  rotateSizeButton.disabled = photo.locked;
  rotateSizeButton.addEventListener("click", () => {
    const selectedBefore = state.selectedId;
    state.selectedId = photo.id;
    rotateSelected();
    state.selectedId = selectedBefore === photo.id ? photo.id : state.selectedId;
    hideContextMenu();
  });
  els.contextMenu.appendChild(rotateSizeButton);

  const autoMoveButton = document.createElement("button");
  autoMoveButton.type = "button";
  autoMoveButton.textContent = t("autoMoveFrame");
  autoMoveButton.disabled = photo.locked;
  autoMoveButton.addEventListener("click", () => {
    autoLayout({ keepSelection: photo.id });
    hideContextMenu();
  });
  els.contextMenu.appendChild(autoMoveButton);

  const lockButton = document.createElement("button");
  lockButton.type = "button";
  lockButton.textContent = photo.locked ? t("unlockPhoto") : t("lockPhoto");
  lockButton.addEventListener("click", () => {
    togglePhotoLock(photo);
    hideContextMenu();
  });
  els.contextMenu.appendChild(lockButton);

  for (const [key, size] of Object.entries(PHOTO_SIZES)) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = photoSizeLabel(key);
    button.disabled = photo.locked;
    button.addEventListener("click", () => {
      setPhotoSize(photo, key);
      hideContextMenu();
    });
    els.contextMenu.appendChild(button);
  }
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "danger-menu-item";
  removeButton.textContent = t("removePhoto");
  removeButton.addEventListener("click", () => removePhoto(photo.id));
  els.contextMenu.appendChild(removeButton);
  els.contextMenu.style.left = `${event.clientX}px`;
  els.contextMenu.style.top = `${event.clientY}px`;
  els.contextMenu.hidden = false;
}

function showContextMenuAt(point, photo) {
  const bounds = els.canvas.getBoundingClientRect();
  showContextMenu({
    clientX: bounds.left + point.x * bounds.width / els.canvas.width,
    clientY: bounds.top + point.y * bounds.height / els.canvas.height,
  }, photo);
}

function hideContextMenu() {
  els.contextMenu.hidden = true;
}

els.fileInput.addEventListener("change", async (event) => {
  const files = [...event.target.files];
  if (!files.length) return;
  if (files.length > 1) {
    const pageCount = askBatchPageCount(files.length);
    if (pageCount === null) {
      event.target.value = "";
      return;
    }
    const sizeKey = chooseBatchSizeKey(files.length, pageCount);
    const newPhotos = [];
    for (const file of files) {
      const imageData = await loadImage(file);
      imageData.name = file.name;
      newPhotos.push(createPhoto(imageData, sizeKey));
    }
    placeNewPhotos(newPhotos, pageCount);
    event.target.value = "";
    return;
  }

  const newPhotos = [];
  for (const file of files) {
    const imageData = await loadImage(file);
    imageData.name = file.name;
    newPhotos.push(createPhoto(imageData, "4R"));
  }
  placeNewPhotos(newPhotos);
  event.target.value = "";
});

els.canvas.addEventListener("pointerdown", (event) => {
  hideContextMenu();
  rememberPointer(event);
  const point = pointFromEvent(event);
  const photo = hitTest(point);
  state.selectedId = photo?.id || null;
  syncSelectedControls();

  if (beginPinchIfReady()) {
    clearLongPress();
    event.preventDefault();
    return;
  }

  if (photo && event.button === 0) {
    els.canvas.setPointerCapture(event.pointerId);
    state.drag = {
      id: photo.id,
      type: state.frameMoveMode && !photo.locked ? "frame" : "image",
      lastX: point.x,
      lastY: point.y,
    };
    if (event.pointerType === "touch") {
      clearLongPress();
      state.longPressTimer = setTimeout(() => {
        if (state.pointers.size !== 1 || state.pinch) return;
        state.drag = null;
        state.selectedId = photo.id;
        syncSelectedControls();
        draw();
        showContextMenuAt(point, photo);
      }, 550);
    }
  }
  draw();
});

els.canvas.addEventListener("pointermove", (event) => {
  rememberPointer(event);
  if (updatePinchScale()) {
    clearLongPress();
    event.preventDefault();
    return;
  }
  if (!state.drag) return;
  const photo = selectedPhoto();
  if (!photo || photo.id !== state.drag.id) return;
  const point = pointFromEvent(event);
  if (Math.hypot(point.x - state.drag.lastX, point.y - state.drag.lastY) > 3) {
    clearLongPress();
  }
  if (state.drag.type === "frame" && !photo.locked) {
    photo.xMm += pxToMm(point.x - state.drag.lastX);
    photo.yMm += pxToMm(point.y - state.drag.lastY);
    clampFramePosition(photo);
  } else if (!photo.locked) {
    photo.offsetMmX += pxToMm(point.x - state.drag.lastX);
    photo.offsetMmY += pxToMm(point.y - state.drag.lastY);
    clampPhotoOffset(photo);
  }
  state.drag.lastX = point.x;
  state.drag.lastY = point.y;
  draw();
});

els.canvas.addEventListener("pointerup", (event) => {
  forgetPointer(event);
  clearLongPress();
  if (state.pointers.size === 0) {
    state.pinch = null;
  }
  state.drag = null;
});

els.canvas.addEventListener("pointercancel", (event) => {
  forgetPointer(event);
  clearLongPress();
  state.drag = null;
});

els.canvas.addEventListener("wheel", (event) => {
  const point = pointFromEvent(event);
  const photo = hitTest(point);
  if (!photo) return;
  event.preventDefault();
  if (photo.locked) return;
  state.selectedId = photo.id;
  const factor = event.deltaY < 0 ? 1.05 : 0.95;
  photo.scale = Math.max(coverScale(photo), Math.min(photo.scale * factor, coverScale(photo) * 8));
  clampPhotoOffset(photo);
  syncSelectedControls();
  draw();
}, { passive: false });

els.canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const photo = hitTest(pointFromEvent(event));
  if (!photo) return;
  state.selectedId = photo.id;
  syncSelectedControls();
  draw();
  showContextMenu(event, photo);
});

document.addEventListener("click", (event) => {
  if (!els.contextMenu.contains(event.target)) {
    hideContextMenu();
  }
});

els.sizeSelect.addEventListener("change", () => {
  const photo = selectedPhoto();
  if (photo) setPhotoSize(photo, els.sizeSelect.value);
});

els.paperSelect.addEventListener("change", () => {
  state.paperKey = els.paperSelect.value;
  resizeCanvas();
  autoLayout();
  draw();
});
els.rotatePageButton.addEventListener("click", rotatePage);
els.rotatePhotoButton.addEventListener("click", () => rotatePhotoContent());
els.rotateButton.addEventListener("click", rotateSelected);
els.fitButton.addEventListener("click", () => {
  const photo = selectedPhoto();
  if (!photo) return;
  resetImageTransform(photo);
  draw();
});
els.removeButton.addEventListener("click", () => removePhoto());
els.moveFrameButton.addEventListener("click", () => {
  state.frameMoveMode = !state.frameMoveMode;
  syncSelectedControls();
});
els.lockButton.addEventListener("click", () => togglePhotoLock());
els.autoLayoutButton.addEventListener("click", autoLayout);
els.addPageButton.addEventListener("click", () => {
  state.pages.push(newPage());
  state.activePage = state.pages.length - 1;
  state.selectedId = null;
  syncSelectedControls();
  draw();
});
els.exportButton.addEventListener("click", () => exportPage(state.activePage));
els.exportAllButton.addEventListener("click", () => {
  state.pages.forEach((_, index) => exportPage(index));
});
els.zoomOutButton.addEventListener("click", () => setManualZoom(state.zoom - 0.1));
els.zoomInButton.addEventListener("click", () => setManualZoom(state.zoom + 0.1));
els.zoomInput.addEventListener("change", () => {
  setManualZoom((Number(els.zoomInput.value) || 100) / 100);
});
els.zoomAutoButton.addEventListener("click", () => {
  state.zoomMode = "auto";
  updateCanvasZoom();
});
els.languageSelect.addEventListener("change", () => {
  state.lang = els.languageSelect.value;
  applyLanguage();
  draw();
});

window.addEventListener("resize", () => {
  if (state.zoomMode === "auto") {
    updateCanvasZoom();
  }
});

if ("ResizeObserver" in window) {
  const canvasWrapObserver = new ResizeObserver(() => {
    if (state.zoomMode === "auto") {
      updateCanvasZoom();
    }
  });
  canvasWrapObserver.observe(els.canvasWrap);
}

for (const input of [els.pageMargin, els.photoGap, els.bleed]) {
  input.addEventListener("change", () => {
    if (input === els.photoGap || input === els.pageMargin) autoLayout();
    draw();
  });
}

applyLanguage();
resizeCanvas();
syncSelectedControls();
draw();
