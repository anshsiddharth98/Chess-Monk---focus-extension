// ============================================================
//  Chess Monk – content.js
// ============================================================

// Only activates on actual game pages
function isGamePage() {
  const path = location.pathname;
  return (
    path.startsWith("/play") ||
    path.startsWith("/game") ||
    path.startsWith("/live") ||
    path.startsWith("/puzzles/rush") ||
    path.startsWith("/puzzles/battle")
  );
}

// On non-game pages, remove any leftover styles and stop
if (!isGamePage()) {
  const ids = [
    "chess-monk-focus-style",
    "chess-monk-blur-style",
    "chess-monk-opp-style"
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
}

/* ===========================================================
   FOCUS MODE
=========================================================== */

const STYLE_ID = "chess-monk-focus-style";

const CHESS_COM_CSS = `
  header,
  .header,
  .top-nav,
  .navigation,
  .main-header,
  #main-navigation-component,
  .nav-bar-component,
  [class*="nav-bar"],
  [class*="navigation"] { display: none !important; }

  .sidebar,
  .right-sidebar,
  .left-sidebar,
  .sidebar-container,
  .sidebar-component,
  .board-layout-sidebar,
  [class*="sidebar"] { display: none !important; }

  .chat-container,
  .chat-component,
  .chat-stream-component,
  .chat-box,
  .resizable-chat-area-component,
  [class*="chat"] { display: none !important; }

  .move-list,
  .moves,
  .move-list-component,
  .game-move-list,
  .analysis-moves,
  [class*="move-list"] { display: none !important; }

  .board-player,
  .player-info,
  .board-players,
  .user-tagline,
  .player-username,
  .player-rating,
  .player-tagline,
  .cc-avatar-img,
  .board-player-default-component,
  [class*="player-tagline"],
  [class*="user-tagline"],
  [class*="board-player"] { display: none !important; }

  .game-controls,
  .board-controls,
  .action-buttons,
  .resign-button,
  .draw-button,
  .game-controls-component,
  [class*="game-controls"],
  [class*="board-controls"] { display: none !important; }

  .ad-container,
  .promo-banner,
  .banner,
  .ad-component,
  .advertisement-component,
  [class*="ad-"],
  [class*="promo"],
  [class*="banner"] { display: none !important; }

  footer,
  .footer,
  .bottom-bar,
  [class*="footer"] { display: none !important; }

  .news-feed,
  .community-feed,
  .engine-evaluation,
  .new-game-component,
  .underlined-tabs-tab,
  .underlined-tabs-active,
  [class*="news-feed"],
  [class*="community"],
  [class*="engine-eval"] { display: none !important; }

  body { background: #1a1a1a !important; }
`;

const LICHESS_CSS = `
  #top,
  header.base,
  aside.side,
  .rmoves,
  .mchat,
  .under-board,
  .watchers,
  .game__meta,
  [class*="chat"],
  [class*="sidebar"],
  footer { display: none !important; }

  body { background: #1a1a1a !important; }
`;

function enableFocusMode() {
  if (!isGamePage()) return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = location.hostname.includes("lichess.org")
    ? LICHESS_CSS
    : CHESS_COM_CSS;
  document.head.appendChild(style);
}

function disableFocusMode() {
  const el = document.getElementById(STYLE_ID);
  if (el) el.remove();
}

chrome.storage.local.get("focusMode", ({ focusMode }) => {
  if (focusMode) enableFocusMode();
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SET_FOCUS_MODE") {
    message.enabled ? enableFocusMode() : disableFocusMode();
  }
});

/* ===========================================================
   BLUR MODE
=========================================================== */

const BLUR_STYLE_ID = "chess-monk-blur-style";

const CHESS_COM_BLUR_CSS = `
  header,
  .header,
  .top-nav,
  .navigation,
  .main-header,
  #main-navigation-component,
  .nav-bar-component,
  [class*="nav-bar"],
  [class*="navigation"] { filter: blur(10px) !important; pointer-events: none !important; }

  .sidebar,
  .right-sidebar,
  .left-sidebar,
  .sidebar-container,
  .sidebar-component,
  .board-layout-sidebar,
  [class*="sidebar"] { filter: blur(10px) !important; pointer-events: none !important; }

  .chat-container,
  .chat-component,
  .chat-stream-component,
  .chat-box,
  .resizable-chat-area-component,
  [class*="chat"] { filter: blur(10px) !important; pointer-events: none !important; }

  .move-list,
  .moves,
  .move-list-component,
  .game-move-list,
  .analysis-moves,
  [class*="move-list"] { filter: blur(10px) !important; pointer-events: none !important; }

  .board-player,
  .player-info,
  .board-players,
  .user-tagline,
  .player-username,
  .player-rating,
  .player-tagline,
  .cc-avatar-img,
  .board-player-default-component,
  [class*="player-tagline"],
  [class*="user-tagline"],
  [class*="board-player"] { filter: blur(10px) !important; pointer-events: none !important; }

  .game-controls,
  .board-controls,
  .action-buttons,
  .resign-button,
  .draw-button,
  .game-controls-component,
  [class*="game-controls"],
  [class*="board-controls"] { filter: blur(10px) !important; pointer-events: none !important; }

  .ad-container,
  .promo-banner,
  .banner,
  .ad-component,
  .advertisement-component,
  [class*="ad-"],
  [class*="promo"],
  [class*="banner"] { filter: blur(10px) !important; pointer-events: none !important; }

  footer,
  .footer,
  .bottom-bar,
  [class*="footer"] { filter: blur(10px) !important; pointer-events: none !important; }

  .news-feed,
  .community-feed,
  .engine-evaluation,
  .new-game-component,
  .underlined-tabs-tab,
  .underlined-tabs-active,
  [class*="news-feed"],
  [class*="community"],
  [class*="engine-eval"] { filter: blur(10px) !important; pointer-events: none !important; }
`;

const LICHESS_BLUR_CSS = `
  #top,
  header.base,
  aside.side,
  .rmoves,
  .mchat,
  .under-board,
  .watchers,
  .game__meta,
  [class*="chat"],
  [class*="sidebar"],
  footer { filter: blur(10px) !important; pointer-events: none !important; }
`;

function enableBlurMode() {
  if (!isGamePage()) return;
  if (document.getElementById(BLUR_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = BLUR_STYLE_ID;
  style.textContent = location.hostname.includes("lichess.org")
    ? LICHESS_BLUR_CSS
    : CHESS_COM_BLUR_CSS;
  document.head.appendChild(style);
}

function disableBlurMode() {
  const el = document.getElementById(BLUR_STYLE_ID);
  if (el) el.remove();
}

chrome.storage.local.get("blurMode", ({ blurMode }) => {
  if (blurMode) enableBlurMode();
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SET_BLUR_MODE") {
    message.enabled ? enableBlurMode() : disableBlurMode();
  }
});

/* ===========================================================
   OPPONENT INFO MODE
=========================================================== */

const OPP_STYLE_ID = "chess-monk-opp-style";

const OPP_CSS = `
  .player-tagline {
    filter: blur(8px) !important;
    pointer-events: none !important;
    user-select: none !important;
  }

  .cc-avatar-img {
    filter: blur(8px) !important;
    pointer-events: none !important;
  }
`;

function enableOppMode() {
  if (!isGamePage()) return;
  if (document.getElementById(OPP_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = OPP_STYLE_ID;
  style.textContent = OPP_CSS;
  document.head.appendChild(style);
}

function disableOppMode() {
  const el = document.getElementById(OPP_STYLE_ID);
  if (el) el.remove();
}

chrome.storage.local.get("oppMode", ({ oppMode }) => {
  if (oppMode) enableOppMode();
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SET_OPP_MODE") {
    message.enabled ? enableOppMode() : disableOppMode();
  }
});