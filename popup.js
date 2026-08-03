// ============================================================
//  Chess Monk – popup.js
//  Runs inside popup.html. Controls the toggle & persists state.
// ============================================================

const toggle = document.getElementById("switchbtn");

// ─── Load saved state and reflect it in the toggle ─────────
chrome.storage.local.get("focusMode", ({ focusMode }) => {
  toggle.checked = !!focusMode;
});

// ─── When the user flips the switch ────────────────────────
toggle.addEventListener("change", () => {
  const enabled = toggle.checked;

  // 1. Persist so content script applies it on next page load
  chrome.storage.local.set({ focusMode: enabled });

  // 2. Send live message to the active tab for instant effect
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;

    const url = tab.url || "";
    const isChessSite =
      url.includes("chess.com") || url.includes("lichess.org");

    if (!isChessSite) return;

    chrome.tabs.sendMessage(tab.id, {
      type: "SET_FOCUS_MODE",
      enabled,
    }).catch(() => {
      // Content script not yet ready (e.g. page just loaded).
      // Storage is already saved — it will apply on next navigation.
    });
  });
});


/* ----------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------
 
                                For Blur mode 

/* ----------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------*/

const toggleBlur = document.getElementById("switchbtn2");
 
// Load saved state
chrome.storage.local.get("blurMode", ({ blurMode }) => {
  toggleBlur.checked = !!blurMode;
});
 
// When user flips the switch
toggleBlur.addEventListener("change", () => {
  const enabled = toggleBlur.checked;
 
  // Persist state
  chrome.storage.local.set({ blurMode: enabled });
 
  // Send live message to active tab
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;
 
    const url = tab.url || "";
    const isChessSite =
      url.includes("chess.com") || url.includes("lichess.org");
 
    if (!isChessSite) return;
 
    chrome.tabs.sendMessage(tab.id, {
      type: "SET_BLUR_MODE",
      enabled,
    }).catch(() => {});
  });
});


/* ----------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------
 
                                For Opponent's info

/* ----------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------*/
 


const toggleOpp = document.getElementById("switchbtn3");
 
// Load saved state
chrome.storage.local.get("oppMode", ({ oppMode }) => {
  toggleOpp.checked = !!oppMode;
});
 
// When user flips the switch
toggleOpp.addEventListener("change", () => {
  const enabled = toggleOpp.checked;
 
  chrome.storage.local.set({ oppMode: enabled });
 
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;
 
    const url = tab.url || "";
    const isChessSite =
      url.includes("chess.com") || url.includes("lichess.org");
 
    if (!isChessSite) return;
 
    chrome.tabs.sendMessage(tab.id, {
      type: "SET_OPP_MODE",
      enabled,
    }).catch(() => {});
  });
});