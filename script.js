// REO script
!(function () {
  var e, t, n;
  (e = "638190bf025179e"),
    (t = function () {
      Reo.init({ clientID: "638190bf025179e" });
    }),
    ((n = document.createElement("script")).src = "https://static.reo.dev/" + e + "/reo.js"),
    (n.async = !0),
    (n.onload = t),
    document.head.appendChild(n);
})();

// Hubspot script
const script = document.createElement("script");
script.type = "text/javascript";
script.id = "hs-script-loader";
script.async = true;
script.defer = true;
script.src = "//js.hs-scripts.com/23114811.js";
document.head.appendChild(script);

// RB2B script.
!(function () {
  var reb2b = (window.reb2b = window.reb2b || []);
  if (reb2b.invoked) return;
  reb2b.invoked = true;
  reb2b.methods = ["identify", "collect"];
  reb2b.factory = function (method) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      reb2b.push(args);
      return reb2b;
    };
  };
  for (var i = 0; i < reb2b.methods.length; i++) {
    var key = reb2b.methods[i];
    reb2b[key] = reb2b.factory(key);
  }
  reb2b.load = function (key) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/8XOE9GH5EDOM.js.gz";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);
  };
  reb2b.SNIPPET_VERSION = "1.0.1";
  reb2b.load("8XOE9GH5EDOM");
})();

// Universal CodeGroup tab synchronization
(function () {
  // Store the last selected language to sync across all CodeGroups
  let lastSelectedLanguage = null;

  // Function to initialize the script
  function init() {
    console.log("Universal CodeGroup tab sync initialized");

    // Set up the click event listener on the document (event delegation)
    document.addEventListener("click", handleDocumentClick);

    // Set up a MutationObserver to detect when new CodeGroups are added
    setupMutationObserver();

    // Initial scan for CodeGroups
    syncAllCodeGroups();
  }

  // Handle clicks anywhere in the document
  function handleDocumentClick(event) {
    // Find if the click was on a CodeGroup tab
    let target = event.target;

    // Traverse up the DOM to find if we clicked on a tab
    while (target && target !== document) {
      if (target.getAttribute && target.getAttribute("role") === "tab" && target.id && target.id.startsWith("headlessui-tabs-tab-")) {
        // We found a tab click
        const tabDiv = target.querySelector("div");
        if (tabDiv) {
          const language = tabDiv.textContent.trim();
          console.log(`Tab clicked: ${language}`);

          // Store the selected language
          lastSelectedLanguage = language;

          // Sync all other CodeGroups to this language (after a small delay)
          setTimeout(() => {
            syncAllCodeGroups();
          }, 10);
        }
        break;
      }
      target = target.parentNode;
    }
  }

  // Function to sync all CodeGroups to the last selected language
  function syncAllCodeGroups() {
    if (!lastSelectedLanguage) {
      // If no language has been selected yet, find the first selected tab
      const selectedTab = document.querySelector('[role="tab"][aria-selected="true"]');
      if (selectedTab) {
        const tabDiv = selectedTab.querySelector("div");
        if (tabDiv) {
          lastSelectedLanguage = tabDiv.textContent.trim();
          console.log(`Initial language detected: ${lastSelectedLanguage}`);
        }
      }
    }

    if (!lastSelectedLanguage) {
      console.log("No language selected yet");
      return;
    }

    // Find all tab containers
    const tabLists = document.querySelectorAll('[role="tablist"][aria-orientation="horizontal"]');
    console.log(`Found ${tabLists.length} CodeGroup containers`);

    // For each container, find and click the tab with the matching language
    tabLists.forEach((tabList) => {
      const tabs = tabList.querySelectorAll('[role="tab"]');

      // Find the tab with the matching language
      let matchingTab = null;
      tabs.forEach((tab) => {
        const tabDiv = tab.querySelector("div");
        if (tabDiv) {
          const tabLanguage = tabDiv.textContent.trim();
          if (tabLanguage === lastSelectedLanguage && tab.getAttribute("aria-selected") !== "true") {
            matchingTab = tab;
          }
        }
      });

      // Click the matching tab if found and not already selected
      if (matchingTab) {
        console.log(`Syncing tab to ${lastSelectedLanguage}`);
        matchingTab.click();
      }
    });
  }

  // Set up a MutationObserver to detect when new CodeGroups are added
  function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldSync = false;

      mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length) {
          // Check if any of the added nodes are or contain CodeGroup elements
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === 1) {
              // Element node
              if ((node.getAttribute && node.getAttribute("role") === "tablist") || (node.querySelector && node.querySelector('[role="tablist"]'))) {
                shouldSync = true;
                break;
              }
            }
          }
        }
      });

      if (shouldSync) {
        console.log("New CodeGroup detected, syncing...");
        setTimeout(syncAllCodeGroups, 100); // Delay to ensure the DOM is fully updated
      }
    });

    // Start observing the entire document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    console.log("MutationObserver set up");
  }

  // Start the script when the DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
