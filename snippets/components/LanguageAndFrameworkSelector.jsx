export const LanguageAndFrameworkSelector = (props) => {
    // The props.children contains LanguageAndFrameworkSelectorComponent components
    // with the language and framework set.
    // Iterate over the children and extract the languages and frameworks instead
    // of using a hardcoded list.
    // Make sure each list item is unique
    const languages = [...new Set(React.Children.map(props.children, child => child.props.language))];
    const frameworks = [...new Set(React.Children.map(props.children, child => child.props.framework))];

    // Log all the languages and frameworks
    console.log('[Lang/Framework Selector] Available languages', languages);
    console.log('[Lang/Framework Selector] Available frameworks', frameworks);

    function getClassName(language, framework) {
        // Normalize to match class token (e.g., "PythonOpenAI")
        return `${language}${framework.replace(/\s+/g, '')}`;
    }

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);

    useEffect(() => {
        const targetClass = getClassName(selectedLanguage, selectedFramework);
        console.debug('[Lang/Framework Selector] Selection changed', {
            selectedLanguage,
            selectedFramework,
            targetClass,
        });

        const allContentDivs = document.querySelectorAll('.LanguageAndFrameworkContent');
        console.debug('[Lang/Framework Selector] Hiding content blocks', {
            totalBlocks: allContentDivs.length,
        });
        allContentDivs.forEach(div => {
            div.style.display = 'none';
        });

        const targetDiv = document.querySelector(`.LanguageAndFrameworkContent.${targetClass}`);
        if (targetDiv) {
            targetDiv.style.display = '';
            console.debug('[Lang/Framework Selector] Showing block', { targetClass });
        } else {
            console.warn('[Lang/Framework Selector] No matching block found', { targetClass });
        }
    }, [selectedLanguage, selectedFramework]);

    return (
        <div>
            <div style={{ marginBottom: '1em' }}>
                <div style={{ marginBottom: '0.5em', fontWeight: 'bold' }}>Language</div>
                <div>
                    {languages.map(lang => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => {
                                console.log('[Lang/Framework Selector] Language clicked', { lang });
                                setSelectedLanguage(lang);
                            }}
                            style={{
                                marginRight: '0.5em',
                                background: selectedLanguage === lang ? '#1098F7' : 'transparent',
                                color: selectedLanguage === lang ? '#fff' : 'inherit',
                                border: '1px solid #ccc',
                                borderRadius: 'var(--rounded-xl,.75rem)',
                                padding: '0.5em 1em',
                                cursor: 'pointer',
                            }}
                            aria-pressed={selectedLanguage === lang}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <div style={{ marginBottom: '0.5em', fontWeight: 'bold' }}>LLM</div>
                <div style={{ marginBottom: '0.5em' }}>
                    <span>This LLM will be used for both LLM-as-a-judge metrics, and in your quickstart code.</span>
                </div>
                <div>
                    {frameworks.map(fw => (
                        <button
                            key={fw}
                            type="button"
                            onClick={() => {
                                console.log('[Lang/Framework Selector] Framework clicked', { framework: fw });
                                setSelectedFramework(fw);
                            }}
                            style={{
                                marginRight: '0.5em',
                                background: selectedFramework === fw ? '#1098F7' : 'transparent',
                                color: selectedFramework === fw ? '#fff' : 'inherit',
                                border: '1px solid #ccc',
                                borderRadius: 'var(--rounded-xl,.75rem)',
                                padding: '0.5em 1em',
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
