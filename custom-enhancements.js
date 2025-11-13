/**
 * Custom JavaScript Enhancements for Galileo Documentation
 * Implements Phase 1 Interactive Features
 * 
 * Features:
 * 1. Global search hotkey (Cmd/Ctrl+K)
 * 2. Sticky TOC with scroll progress
 * 3. Enhanced code copy buttons with language detection
 * 4. Reading time estimation
 * 5. Collapsible sections
 * 6. Enhanced breadcrumbs with suggestions
 */

(function() {
  'use strict';

  // ==================== 
  // 1. GLOBAL SEARCH HOTKEY (CMD/CTRL+K)
  // ====================
  
  function initSearchHotkey() {
    document.addEventListener('keydown', function(e) {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        
        // Try to focus the Mintlify search input
        const searchInput = document.querySelector('input[type="search"]') ||
                          document.querySelector('[role="search"] input') ||
                          document.querySelector('.search-input');
        
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        } else {
          // If no search input found, try to trigger search modal
          const searchButton = document.querySelector('button[aria-label*="Search"]') ||
                              document.querySelector('.search-button');
          if (searchButton) {
            searchButton.click();
          }
        }
      }
    });
  }

  // ==================== 
  // 2. STICKY TOC WITH SCROLL PROGRESS
  // ====================
  
  function initStickyTOC() {
    const tocContainer = document.querySelector('.sticky-toc');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('h2, h3');
    const tocLinks = tocContainer.querySelectorAll('.toc-link');
    
    // Calculate reading progress
    function updateProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      
      const progressFill = tocContainer.querySelector('.toc-progress-fill');
      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      }
      
      const progressText = tocContainer.querySelector('.toc-progress-indicator');
      if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
      }
    }

    // Highlight active section in TOC
    function updateActiveTOC() {
      let currentHeading = null;
      const scrollPosition = window.pageYOffset + 100;

      headings.forEach((heading) => {
        if (heading.offsetTop <= scrollPosition) {
          currentHeading = heading;
        }
      });

      tocLinks.forEach((link) => {
        link.classList.remove('active');
        if (currentHeading && link.getAttribute('href') === `#${currentHeading.id}`) {
          link.classList.add('active');
        }
      });
    }

    // Smooth scroll to section when TOC link clicked
    tocLinks.forEach((link) => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Update on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateProgress();
          updateActiveTOC();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial update
    updateProgress();
    updateActiveTOC();
  }

  // ==================== 
  // 3. ENHANCED CODE COPY BUTTONS
  // ====================
  
  function initEnhancedCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      
      // Detect language from class name
      const languageClass = Array.from(codeBlock.classList)
        .find(c => c.startsWith('language-'));
      const language = languageClass ? 
        languageClass.replace('language-', '').toUpperCase() : 
        'CODE';

      // Create wrapper if it doesn't exist
      let wrapper = pre.parentElement;
      if (!wrapper.classList.contains('code-block-wrapper')) {
        wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      }

      // Add language badge
      const languageBadge = document.createElement('div');
      languageBadge.className = 'code-language-badge';
      languageBadge.textContent = language;
      wrapper.insertBefore(languageBadge, pre);

      // Create enhanced copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'enhanced-copy-button';
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>Copy</span>
      `;

      copyButton.addEventListener('click', async function() {
        const code = codeBlock.textContent;
        
        try {
          await navigator.clipboard.writeText(code);
          
          // Show success state
          copyButton.classList.add('copied');
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          `;
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.classList.remove('copied');
            copyButton.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
          
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = code;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          
          copyButton.classList.add('copied');
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.classList.remove('copied');
            copyButton.textContent = 'Copy';
          }, 2000);
        }
      });

      wrapper.insertBefore(copyButton, pre);
    });
  }

  // ==================== 
  // 4. READING TIME ESTIMATION
  // ====================
  
  function calculateReadingTime() {
    const content = document.querySelector('main') || document.querySelector('article');
    if (!content) return 0;

    const text = content.textContent || '';
    const wordCount = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    return minutes;
  }

  function displayReadingTime() {
    const tocContainer = document.querySelector('.sticky-toc');
    if (!tocContainer) return;

    const minutes = calculateReadingTime();
    
    // Check if reading time already exists
    let readingTimeEl = tocContainer.querySelector('.toc-reading-time');
    if (!readingTimeEl) {
      readingTimeEl = document.createElement('div');
      readingTimeEl.className = 'toc-reading-time';
      tocContainer.appendChild(readingTimeEl);
    }

    readingTimeEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${minutes} min read</span>
    `;
  }

  // ==================== 
  // 5. COLLAPSIBLE SECTIONS
  // ====================
  
  function initCollapsibleSections() {
    // Look for sections that should be collapsible (you can customize the selector)
    const collapsibleHeaders = document.querySelectorAll('[data-collapsible]');
    
    collapsibleHeaders.forEach((header) => {
      const section = header.parentElement;
      section.classList.add('collapsible-section');
      
      const content = section.querySelector('[data-collapsible-content]');
      if (!content) return;

      content.classList.add('collapsible-content');
      
      // Add collapse icon
      const icon = document.createElement('span');
      icon.className = 'collapsible-icon';
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      `;
      header.appendChild(icon);

      // Toggle on click
      header.addEventListener('click', () => {
        section.classList.toggle('expanded');
      });

      // Start expanded by default if specified
      if (header.hasAttribute('data-expanded')) {
        section.classList.add('expanded');
      }
    });
  }

  // ==================== 
  // 6. ENHANCED BREADCRUMBS
  // ====================
  
  function enhanceBreadcrumbs() {
    const breadcrumbs = document.querySelector('[role="navigation"][aria-label*="breadcrumb"]') ||
                       document.querySelector('.breadcrumb');
    
    if (!breadcrumbs) return;

    // Add custom styling class
    breadcrumbs.classList.add('galileo-breadcrumbs');

    // Get current page info to suggest next steps
    const currentPath = window.location.pathname;
    const suggestions = getNextStepSuggestions(currentPath);

    if (suggestions.length > 0) {
      const suggestionsEl = document.createElement('div');
      suggestionsEl.className = 'breadcrumb-suggestions';
      suggestionsEl.innerHTML = `
        <div>
          <h4>📚 Next Steps</h4>
          <ul>
            ${suggestions.map(s => `<li><a href="${s.url}">${s.title}</a></li>`).join('')}
          </ul>
        </div>
      `;
      
      breadcrumbs.parentNode.insertBefore(suggestionsEl, breadcrumbs.nextSibling);
    }
  }

  function getNextStepSuggestions(currentPath) {
    // Map of current paths to suggested next steps
    const suggestionMap = {
      '/getting-started/quickstart': [
        { title: 'Log your first trace', url: '/sdk-api/logging/galileo-logger' },
        { title: 'Run experiments', url: '/getting-started/experiments' },
        { title: 'Configure metrics', url: '/concepts/metrics/overview' }
      ],
      '/sdk-api/logging/galileo-logger': [
        { title: 'Create experiments', url: '/sdk-api/experiments/experiments' },
        { title: 'Add custom metrics', url: '/concepts/metrics/custom-metrics/custom-metrics-ui-llm' },
        { title: 'Integrate with frameworks', url: '/sdk-api/third-party-integrations/overview' }
      ],
      '/deployment-docs/overview': [
        { title: 'AWS deployment', url: '/deployment-docs/deploying-on-aws-eks' },
        { title: 'Pre-deployment checklist', url: '/deployment-docs/pre-deployment/overview-v1' },
        { title: 'Security setup', url: '/deployment-docs/security/security-and-access-control' }
      ]
    };

    return suggestionMap[currentPath] || [];
  }

  // ==================== 
  // 7. SKIP TO MAIN CONTENT
  // ====================
  
  function addSkipLink() {
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    if (!main) return;

    // Add ID to main if it doesn't have one
    if (!main.id) {
      main.id = 'main-content';
    }

    // Create skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'Skip to main content';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // ==================== 
  // 8. KEYBOARD NAVIGATION HELPERS
  // ====================
  
  function initKeyboardNav() {
    // Add visible focus indicators
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-nav');
    });
  }

  // ==================== 
  // INITIALIZATION
  // ====================
  
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    try {
      initSearchHotkey();
      initStickyTOC();
      initEnhancedCodeCopy();
      displayReadingTime();
      initCollapsibleSections();
      enhanceBreadcrumbs();
      addSkipLink();
      initKeyboardNav();

      console.log('✅ Galileo documentation enhancements loaded successfully');
    } catch (error) {
      console.error('Error initializing documentation enhancements:', error);
    }
  }

  // Start initialization
  init();

  // Re-initialize on page navigation (for SPAs)
  if (window.navigation) {
    window.navigation.addEventListener('navigate', () => {
      setTimeout(init, 100);
    });
  }

})();
