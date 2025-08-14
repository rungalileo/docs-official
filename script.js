// User Identification and Analytics Setup
(function() {
  'use strict';

  // Initialize data layer for GTM
  window.dataLayer = window.dataLayer || [];

  // User identification utilities
  const UserTracker = {
    // Generate or retrieve user ID
    getUserId: function() {
      let userId = localStorage.getItem('galileo_user_id');
      if (!userId) {
        userId = 'user_' + this.generateUUID();
        localStorage.setItem('galileo_user_id', userId);
      }
      return userId;
    },

    // Generate or retrieve session ID
    getSessionId: function() {
      let sessionId = sessionStorage.getItem('galileo_session_id');
      if (!sessionId) {
        sessionId = 'session_' + this.generateUUID();
        sessionStorage.setItem('galileo_session_id', sessionId);
        
        // Track session start
        this.trackSessionStart();
      }
      return sessionId;
    },

    // Generate UUID for unique identifiers
    generateUUID: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    // Get user properties
    getUserProperties: function() {
      return {
        userId: this.getUserId(),
        sessionId: this.getSessionId(),
        userAgent: navigator.userAgent,
        language: navigator.language || navigator.userLanguage,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: screen.width + 'x' + screen.height,
        viewportSize: window.innerWidth + 'x' + window.innerHeight,
        referrer: document.referrer,
        currentUrl: window.location.href,
        timestamp: new Date().toISOString()
      };
    },

    // Track session start
    trackSessionStart: function() {
      const userProps = this.getUserProperties();
      
      // Push to GTM data layer
      window.dataLayer.push({
        'event': 'session_start',
        'user_id': userProps.userId,
        'session_id': userProps.sessionId,
        'user_properties': userProps
      });

      console.log('Session started:', userProps);
    },

    // Track page view with user context
    trackPageView: function() {
      const userProps = this.getUserProperties();
      
      // Push to GTM data layer
      window.dataLayer.push({
        'event': 'page_view',
        'user_id': userProps.userId,
        'session_id': userProps.sessionId,
        'page_title': document.title,
        'page_url': window.location.href,
        'page_path': window.location.pathname,
        'user_properties': userProps
      });

      console.log('Page view tracked:', userProps);
    },

    // Track custom events
    trackEvent: function(eventName, eventData = {}) {
      const userProps = this.getUserProperties();
      
      const eventPayload = {
        'event': eventName,
        'user_id': userProps.userId,
        'session_id': userProps.sessionId,
        'user_properties': userProps,
        ...eventData
      };

      // Push to GTM data layer
      window.dataLayer.push(eventPayload);

      console.log('Custom event tracked:', eventPayload);
    },

    // Track user engagement
    trackEngagement: function(action, element = null) {
      const engagementData = {
        'action': action,
        'timestamp': new Date().toISOString()
      };

      if (element) {
        engagementData.element_type = element.tagName.toLowerCase();
        engagementData.element_id = element.id || null;
        engagementData.element_class = element.className || null;
        engagementData.element_text = element.textContent?.substring(0, 100) || null;
      }

      this.trackEvent('user_engagement', engagementData);
    },

    // Initialize user tracking
    init: function() {
      console.log('UserTracker initialized');
      
      // Track initial page view
      this.trackPageView();

      // Set up event listeners for user engagement
      this.setupEventListeners();

      // Track page visibility changes
      this.setupVisibilityTracking();

      // Track before unload
      this.setupBeforeUnloadTracking();
    },

    // Set up event listeners for user engagement
    setupEventListeners: function() {
      // Track clicks on important elements
      document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Track navigation clicks
        if (target.tagName === 'A' || target.closest('a')) {
          this.trackEngagement('navigation_click', target);
        }
        
        // Track button clicks
        if (target.tagName === 'BUTTON' || target.closest('button')) {
          this.trackEngagement('button_click', target);
        }

        // Track form interactions
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          this.trackEngagement('form_interaction', target);
        }
      });

      // Track scroll depth
      let maxScrollDepth = 0;
      window.addEventListener('scroll', () => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollDepth > maxScrollDepth) {
          maxScrollDepth = scrollDepth;
          
          // Track scroll milestones
          if (scrollDepth >= 25 && maxScrollDepth < 50) {
            this.trackEvent('scroll_depth', { depth: 25 });
          } else if (scrollDepth >= 50 && maxScrollDepth < 75) {
            this.trackEvent('scroll_depth', { depth: 50 });
          } else if (scrollDepth >= 75 && maxScrollDepth < 100) {
            this.trackEvent('scroll_depth', { depth: 75 });
          } else if (scrollDepth >= 100) {
            this.trackEvent('scroll_depth', { depth: 100 });
          }
        }
      });
    },

    // Set up visibility tracking
    setupVisibilityTracking: function() {
      let isVisible = true;
      let hiddenTime = null;

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          isVisible = false;
          hiddenTime = new Date();
          this.trackEvent('page_hidden');
        } else {
          if (!isVisible && hiddenTime) {
            const timeHidden = new Date() - hiddenTime;
            this.trackEvent('page_visible', { time_hidden_ms: timeHidden });
          }
          isVisible = true;
          hiddenTime = null;
        }
      });
    },

    // Set up before unload tracking
    setupBeforeUnloadTracking: function() {
      window.addEventListener('beforeunload', () => {
        // Track session end
        this.trackEvent('session_end', {
          session_duration_ms: Date.now() - performance.timing.navigationStart
        });
      });
    }
  };

  // Initialize user tracking when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UserTracker.init());
  } else {
    UserTracker.init();
  }

  // Make UserTracker available globally for manual tracking
  window.UserTracker = UserTracker;

})();

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

          // Track code language selection
          if (window.UserTracker) {
            window.UserTracker.trackEvent('code_language_selected', {
              language: language,
              element_id: target.id
            });
          }

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
