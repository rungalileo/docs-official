export const LanguageAndFrameworkSelectorComponent = (props) => {
    return (
        <div className={`LanguageAndFrameworkContent ${props.language}${props.framework.replace(/\s+/g, '')}`}>
            {props.children}
        </div>
    );
};
