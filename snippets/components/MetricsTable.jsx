import { useState, useEffect } from 'react';

export const MetricsTable = () => {
    const metrics = [
        { name: "Action Advancement", link: "/concepts/metrics/agentic/action-advancement", category: "Agentic", node: "Trace", description: "Measures how effectively each action advances toward the goal.", whenToUse: "When assessing whether an agent is making meaningful progress in multi-step tasks.", example: "A travel planning agent that needs to book flights, hotels, and activities in the correct sequence." },
        { name: "Action Completion", link: "/concepts/metrics/agentic/action-completion", category: "Agentic", node: "Session", description: "Measures whether the agent completed the intended action.", whenToUse: "When evaluating agent task completion rates and success.", example: "An e-commerce assistant that needs to successfully add items to cart, apply discounts, and complete checkout." },
        { name: "Agent Efficiency", link: "/concepts/metrics/agentic/agent-efficiency", category: "Agentic", node: "Session", description: "Measures how efficiently an agent completes tasks with minimal unnecessary steps.", whenToUse: "When optimizing agent workflows for cost and performance.", example: "A customer support agent that should resolve issues in as few interactions as possible." },
        { name: "Agent Flow", link: "/concepts/metrics/agentic/agent-flow", category: "Agentic", node: "Session", description: "Evaluates the logical flow and progression of agent actions.", whenToUse: "When assessing whether an agent follows a coherent, logical sequence of actions.", example: "A research assistant that should gather information, analyze it, then synthesize findings in a logical order." },
        { name: "BLEU & ROUGE", link: "/concepts/metrics/expression-and-readability/bleu-and-rouge", category: "Expression and Readability", node: "LLM Span", description: "Measures text similarity using n-gram overlap between generated and reference text.", whenToUse: "When comparing generated text against reference translations or summaries.", example: "A translation system that needs to measure output quality against professional human translations." },
        { name: "Chunk Attribution Utilization", link: "/concepts/metrics/response-quality/chunk-attribution", category: "Response Quality", node: "Retriever Span", description: "Assesses whether the response uses the retrieved chunks and properly attributes information to source documents.", whenToUse: "When implementing RAG systems and want to ensure proper attribution.", example: "A legal research assistant that must cite specific cases and statutes when providing legal information." },
    { name: "Chunk Relevance", link: "/concepts/metrics/response-quality/chunk-relevance", category: "Response Quality", node: "Retriever span", description: "Measures whether each retrieved chunk contains information that could help answer the user's query.", whenToUse: "When evaluating the relevance of individual retrieved chunks to the query.", example: "A RAG system that needs to ensure each retrieved document chunk contributes useful information toward answering user questions." },
        { name: "Completeness", link: "/concepts/metrics/response-quality/completeness", category: "Response Quality", node: "LLM Span", description: "Measures whether the response addresses all aspects of the user's query.", whenToUse: "When evaluating if responses fully address the user's intent.", example: "A healthcare chatbot that must address all symptoms mentioned by a patient when suggesting next steps." },
        { name: "Context Adherence", link: "/concepts/metrics/response-quality/context-adherence", category: "Response Quality", node: "LLM Span", description: "Measures how well the response aligns with the provided context.", whenToUse: "When you want to ensure the model is grounding its responses in the provided context.", example: "A financial advisor bot that must base investment recommendations on the client's specific financial situation." },
    { name: "Context Precision", link: "/concepts/metrics/response-quality/context-precision", category: "Response Quality", node: "Retriever span", description: "Measures the percentage of relevant chunks in the retrieved context, weighted by their position in the retrieval order.", whenToUse: "When evaluating the overall quality of your retrieval system's results and ranking effectiveness.", example: "A document search system that needs to ensure retrieved chunks are relevant and properly ranked by importance." },
        { name: "Conversation Quality", link: "/concepts/metrics/agentic/conversation-quality", category: "Agentic", node: "Session (trace inputs/outputs only)", description: "Evaluates the overall quality and coherence of multi-turn conversations.", whenToUse: "When assessing conversational AI systems for natural, helpful dialogue.", example: "A virtual assistant that needs to maintain context and provide helpful responses across multiple turns." },
        { name: "Correctness (factuality)", link: "/concepts/metrics/response-quality/correctness", category: "Response Quality", node: "LLM Span", description: "Evaluates the factual accuracy of information provided in the response.", whenToUse: "When accuracy of information is critical to your application.", example: "A medical information system providing drug interaction details to healthcare professionals." },
        { name: "Ground Truth Adherence", link: "/concepts/metrics/response-quality/ground-truth-adherence", category: "Response Quality", node: "Trace", description: "Measures how well the response aligns with established ground truth.", whenToUse: "When evaluating model responses against known correct answers.", example: "A customer service AI that must provide accurate product specifications from an official catalog." },
        { name: "Instruction Adherence", link: "/concepts/metrics/response-quality/instruction-adherence", category: "Response Quality", node: "LLM Span", description: "Assesses whether the model followed the instructions in your prompt template.", whenToUse: "When using complex prompts and need to verify the model is following all instructions.", example: "A content generation system that must follow specific brand guidelines and formatting requirements." },
        { name: "PII / CPNI / PHI", link: "/concepts/metrics/safety-and-compliance/pii", category: "Safety and Compliance", node: "Trace (root input/output only)", description: "Identifies personally identifiable or sensitive information in prompts and responses.", whenToUse: "When handling potentially sensitive data or in regulated industries.", example: "A healthcare chatbot that must detect and redact patient information in conversation logs." },
    { name: "Precision @ K", link: "/concepts/metrics/response-quality/precision-at-k", category: "Response Quality", node: "Retriever span", description: "Measures the percentage of relevant chunks among the top K retrieved chunks at a specific rank position.", whenToUse: "When determining the optimal number of chunks to retrieve (Top K) and evaluating ranking quality at specific positions.", example: "A RAG system that needs to optimize retrieval parameters to balance between capturing all relevant chunks and avoiding irrelevant ones." },
        { name: "Prompt Injection", link: "/concepts/metrics/safety-and-compliance/prompt-injection", category: "Safety and Compliance", node: "Trace (root input only)", description: "Detects attempts to manipulate the model through malicious prompts.", whenToUse: "When allowing user input to be processed directly by your AI system.", example: "A public-facing AI assistant that needs protection from users trying to bypass content filters or extract sensitive information." },
        { name: "Prompt Perplexity", link: "/concepts/metrics/model-confidence/prompt-perplexity", category: "Model Confidence", node: "LLM Span", description: "Measures how surprising or unexpected the prompt is to the model.", whenToUse: "When analyzing prompt quality or detecting unusual inputs.", example: "A content moderation system that flags unusually structured prompts for manual review." },
        { name: "Reasoning Coherence", link: "/concepts/metrics/agentic/reasoning-coherence", category: "Agentic", node: "LLM Span", description: "Evaluates whether an agent's reasoning steps are logically consistent and aligned with its plan.", whenToUse: "When validating multi-step planning and intermediate reasoning quality.", example: "A financial planning agent that must develop a step-by-step investment plan for a user, ensuring each recommendation logically follows from prior steps and aligns with the user's goals." },
        { name: "Sexism / Bias", link: "/concepts/metrics/safety-and-compliance/sexism", category: "Safety and Compliance", node: "Trace (root input/output only)", description: "Detects gender-based bias or discriminatory content.", whenToUse: "When ensuring AI outputs are free from bias and discrimination.", example: "A resume screening assistant that must evaluate job candidates without gender or demographic bias." },
        { name: "Tool Errors", link: "/concepts/metrics/agentic/tool-error", category: "Agentic", node: "Tool Span", description: "Detects errors or failures during the execution of tools.", whenToUse: "When implementing AI agents that use tools and want to track error rates.", example: "A coding assistant that uses external APIs to run code and must handle and report execution errors." },
        { name: "Tool Selection Quality", link: "/concepts/metrics/agentic/tool-selection-quality", category: "Agentic", node: "LLM Span", description: "Evaluates whether the agent selected the most appropriate tools for the task.", whenToUse: "When optimizing agent systems for effective tool usage.", example: "A data analysis agent that must choose the right visualization or statistical method based on the data type." },
        { name: "Tone", link: "/concepts/metrics/expression-and-readability/tone", category: "Expression and Readability", node: "Trace (root input/output only)", description: "Evaluates the emotional tone and style of the response.", whenToUse: "When the style and tone of AI responses matter for your brand or user experience.", example: "A luxury brand's customer service chatbot that must maintain a sophisticated, professional tone." },
        { name: "Toxicity", link: "/concepts/metrics/safety-and-compliance/toxicity", category: "Safety and Compliance", node: "Trace (root input/output only)", description: "Identifies harmful, offensive, or inappropriate content.", whenToUse: "When monitoring AI outputs for harmful content or implementing content filtering.", example: "A social media content moderation system that must detect and flag potentially harmful user-generated content." },
        { name: "Uncertainty", link: "/concepts/metrics/model-confidence/uncertainty", category: "Model Confidence", node: "LLM Span", description: "Measures how uncertain the model is about its response.", whenToUse: "When flagging low-confidence responses for human review.", example: "A customer support system that escalates uncertain responses to human agents." },
        { name: "User Intent Change", link: "/concepts/metrics/agentic/intent-change", category: "Agentic", node: "Session (trace inputs/outputs only)", description: "Detects when user intent shifts during a conversation.", whenToUse: "When tracking conversation dynamics and adapting agent behavior.", example: "A sales assistant that needs to recognize when a customer shifts from browsing to purchasing intent." },
        { name: "SQL Correctness", link: "/concepts/metrics/text2sql/sql-correctness", category: "Text-to-SQL", node: "LLM Span", description: "Evaluates whether a generated SQL query is syntactically valid and adheres to the provided database schema.", whenToUse: "When validating that generated SQL queries are grammatically correct and properly grounded in the database schema.", example: "A business intelligence assistant that translates user questions into SQL queries for a data warehouse." },
        { name: "SQL Adherence", link: "/concepts/metrics/text2sql/sql-adherence", category: "Text-to-SQL", node: "LLM Span", description: "Evaluates whether a generated SQL query semantically aligns with the user's natural language intent.", whenToUse: "When validating that generated SQL queries accurately reflect what the user requested.", example: "A data analytics assistant where users ask questions in natural language and expect accurate query results." },
        { name: "SQL Injection", link: "/concepts/metrics/text2sql/sql-injection", category: "Text-to-SQL", node: "LLM Span", description: "Detects SQL injection attacks and security vulnerabilities in generated SQL queries.", whenToUse: "When protecting against malicious inputs and ensuring generated SQL is safe to execute.", example: "A customer-facing data analytics chatbot that must prevent injection attacks from user inputs." },
        { name: "SQL Efficiency", link: "/concepts/metrics/text2sql/sql-efficiency", category: "Text-to-SQL", node: "LLM Span", description: "Evaluates whether a generated SQL query is structured efficiently and avoids performance anti-patterns.", whenToUse: "When validating that generated SQL queries won't cause performance issues or resource exhaustion.", example: "A business intelligence platform where ad-hoc queries must not impact database availability." },
    ];

    const categories = [...new Set(metrics.map(m => m.category))].sort();
    const nodes = [...new Set(metrics.map(m => m.node))].sort();

    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterNode, setFilterNode] = useState('All');

    // Detect dark mode via Mintlify's "dark" class on <html> or via prefers-color-scheme
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () => {
            const htmlEl = document.documentElement;
            // Mintlify adds class "dark" to <html> when dark mode is active
            if (htmlEl.classList.contains('dark')) {
                setIsDark(true);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !htmlEl.classList.contains('light')) {
                setIsDark(true);
            } else {
                setIsDark(false);
            }
        };

        checkDark();

        // Observe class changes on <html> for dynamic theme switching
        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Also listen to system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', checkDark);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', checkDark);
        };
    }, []);

    // Theme-aware colors
    const colors = isDark
        ? {
            bg: '#1a1a1a',
            bgAlt: '#262626',
            border: '#3f3f46',
            text: '#e4e4e7',
            textMuted: '#a1a1aa',
            selectBg: '#27272a',
            selectBorder: '#3f3f46',
            link: '#38bdf8',
        }
        : {
            bg: '#ffffff',
            bgAlt: '#f9fafb',
            border: '#e5e7eb',
            text: '#111827',
            textMuted: '#6b7280',
            selectBg: '#ffffff',
            selectBorder: '#d1d5db',
            link: '#1098F7',
        };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedMetrics = metrics
        .filter(m => filterCategory === 'All' || m.category === filterCategory)
        .filter(m => filterNode === 'All' || m.node === filterNode)
        .sort((a, b) => {
            const aVal = a[sortColumn]?.toLowerCase() || '';
            const bVal = b[sortColumn]?.toLowerCase() || '';
            if (sortDirection === 'asc') {
                return aVal.localeCompare(bVal);
            }
            return bVal.localeCompare(aVal);
        });

    const selectStyle = {
        padding: '0.25rem 0.5rem',
        border: `1px solid ${colors.selectBorder}`,
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        background: colors.selectBg,
        color: colors.text,
    };

    const headerStyle = {
        cursor: 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        color: colors.text,
    };

    const getSortIndicator = (column) => {
        if (sortColumn !== column) return ' ↕';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div style={{ marginLeft: '-1rem', paddingLeft: '1rem', overflow: 'visible', color: colors.text }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: colors.text }}>Category:</label>
                    <select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="All">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: colors.text }}>Node:</label>
                    <select 
                        value={filterNode} 
                        onChange={(e) => setFilterNode(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="All">All Nodes</option>
                        {nodes.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div style={{ fontSize: '0.75rem', color: colors.textMuted }}>
                    Showing {filteredAndSortedMetrics.length} of {metrics.length} metrics
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', maxWidth: '100%', paddingLeft: '0.5rem' }}>
                <table style={{ minWidth: '1200px', width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                        <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem 0.75rem 0.75rem', minWidth: '180px' }} onClick={() => handleSort('name')}>
                                Name{getSortIndicator('name')}
                            </th>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '140px' }} onClick={() => handleSort('category')}>
                                Category{getSortIndicator('category')}
                            </th>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '100px' }} onClick={() => handleSort('node')}>
                                Node{getSortIndicator('node')}
                            </th>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>Description</th>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>When to Use</th>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>Example Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedMetrics.map((metric, idx) => (
                            <tr key={metric.name} style={{ borderBottom: `1px solid ${colors.border}`, background: idx % 2 === 0 ? colors.bg : colors.bgAlt }}>
                                <td style={{ padding: '0.75rem 0.5rem 0.75rem 0.75rem', fontWeight: 500, verticalAlign: 'top', minWidth: '180px' }}>
                                    <a href={metric.link} style={{ color: colors.link, textDecoration: 'none' }}>
                                        {metric.name}
                                    </a>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>{metric.category}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>{metric.node}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>{metric.description}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>{metric.whenToUse}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>{metric.example}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredAndSortedMetrics.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: colors.textMuted }}>
                    No metrics match the selected filters.
                </div>
            )}
        </div>
    );
};
