export const LLMFrameworkSelector = (props) => {
    // The props.children contains LLMFrameworkSelectorComponent components
    // with the framework set. Extract frameworks dynamically and ensure uniqueness.
    const frameworks = [...new Set(React.Children.map(props.children, child => child.props.framework))];

    // Log all the frameworks
    console.log('[LLM Framework Selector] Available frameworks', frameworks);

    function getClassName(framework) {
        // Normalize to match class token added by LLMFrameworkSelectorComponent (e.g., "OpenAI")
        return `${framework.replace(/\s+/g, '')}`;
    }

    const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);

    // Load initial selection from localStorage when available
    useEffect(() => {
        try {
            if (typeof window === 'undefined') return;
            const LS_KEY = 'LLMFrameworkSelector.selectedFramework';
            const saved = window.localStorage.getItem(LS_KEY);
            if (saved && frameworks.includes(saved)) {
                console.debug('[LLM Framework Selector] Loaded saved framework from localStorage', { saved });
                setSelectedFramework(saved);
            } else if (frameworks && frameworks.length > 0) {
                // Prime localStorage with default if nothing saved or invalid
                window.localStorage.setItem(LS_KEY, frameworks[0]);
            }
        } catch (err) {
            console.warn('[LLM Framework Selector] Failed to access localStorage', err);
        }
        // Re-run if available frameworks change
    }, [JSON.stringify(frameworks)]);

    useEffect(() => {
        const targetClass = getClassName(selectedFramework);
        console.debug('[LLM Framework Selector] Selection changed', {
            selectedFramework,
            targetClass,
        });

        // Persist selection
        try {
            if (typeof window !== 'undefined') {
                const LS_KEY = 'LLMFrameworkSelector.selectedFramework';
                window.localStorage.setItem(LS_KEY, selectedFramework ?? '');
            }
        } catch (err) {
            console.warn('[LLM Framework Selector] Failed to write localStorage', err);
        }

        const allContentDivs = document.querySelectorAll('.LLMFrameworkContent');
        console.debug('[LLM Framework Selector] Hiding content blocks', {
            totalBlocks: allContentDivs.length,
        });
        allContentDivs.forEach(div => {
            div.style.display = 'none';
        });

        const targetDivs = document.querySelectorAll(`.LLMFrameworkContent.${targetClass}`);
        if (targetDivs.length > 0) {
            targetDivs.forEach(div => (div.style.display = ''));
            console.debug('[LLM Framework Selector] Showing blocks', { targetClass, count: targetDivs.length });
        } else {
            console.warn('[LLM Framework Selector] No matching blocks found', { targetClass });
        }
    }, [selectedFramework]);

    return (
        <div>
            <div>
                <div>
                    {frameworks.map(fw => (
                        <button
                            key={fw}
                            type="button"
                            onClick={() => {
                                console.log('[LLM Framework Selector] Framework clicked', { framework: fw });
                                setSelectedFramework(fw);
                            }}
                            style={{
                                marginRight: '0.5em',
                                background: selectedFramework === fw ? '#1098F7' : 'transparent',
                                color: selectedFramework === fw ? '#fff' : 'inherit',
                                border: '1px solid #ccc',
                                borderRadius: 'var(--rounded-xl,.75rem)',
                                padding: '0.2em 0.5em',
                                cursor: 'pointer',
                            }}
                            aria-pressed={selectedFramework === fw}
                        >
                            {fw}
                        </button>
                    ))}
                </div>
            </div>
            {props.children}
        </div>
    );
};
