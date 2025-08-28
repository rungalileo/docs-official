export const LLMFrameworkSelectorComponent = (props) => {
    return (
        <div className={`LLMFrameworkContent ${props.framework.replace(/\s+/g, '')}`}>
            {props.children}
        </div>
    );
};
