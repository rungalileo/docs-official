export const MetricsTable = () => {
    const metrics = [
        { name: "Action Advancement", link: "/concepts/metrics/agentic/action-advancement", category: "Agentic", node: "Trace", description: "Measures how effectively each action advances toward the goal.", whenToUse: "When assessing whether an agent is making meaningful progress in multi-step tasks.", example: "A travel planning agent that needs to book flights, hotels, and activities in the correct sequence." },
        { name: "Action Completion", link: "/concepts/metrics/agentic/action-completion", category: "Agentic", node: "Session", description: "Measures whether the agent completed the intended action.", whenToUse: "When evaluating agent task completion rates and success.", example: "An e-commerce assistant that needs to successfully add items to cart, apply discounts, and complete checkout." },
        { name: "Agent Efficiency", link: "/concepts/metrics/agentic/agent-efficiency", category: "Agentic", node: "Session", description: "Measures how efficiently an agent completes tasks with minimal unnecessary steps.", whenToUse: "When optimizing agent workflows for cost and performance.", example: "A customer support agent that should resolve issues in as few interactions as possible." },
        { name: "Agent Flow", link: "/concepts/metrics/agentic/agent-flow", category: "Agentic", node: "Session", description: "Evaluates the logical flow and progression of agent actions.", whenToUse: "When assessing whether an agent follows a coherent, logical sequence of actions.", example: "A research assistant that should gather information, analyze it, then synthesize findings in a logical order." },
        { name: "BLEU & ROUGE", link: "/concepts/metrics/expression-and-readability/bleu-and-rouge", category: "Expression and Readability", node: "LLM Span", description: "Measures text similarity using n-gram overlap between generated and reference text.", whenToUse: "When comparing generated text against reference translations or summaries.", example: "A translation system that needs to measure output quality against professional human translations." },
        { name: "Chunk Attribution Utilization", link: "/concepts/metrics/response-quality/chunk-attribution", category: "Response Quality", node: "Retriever Span", description: "Assesses whether the response uses the retrieved chunks and properly attributes information to source documents.", whenToUse: "When implementing RAG systems and want to ensure proper attribution.", example: "A legal research assistant that must cite specific cases and statutes when providing legal information." },
        { name: "Completeness", link: "/concepts/metrics/response-quality/completeness", category: "Response Quality", node: "LLM Span", description: "Measures whether the response addresses all aspects of the user's query.", whenToUse: "When evaluating if responses fully address the user's intent.", example: "A healthcare chatbot that must address all symptoms mentioned by a patient when suggesting next steps." },
        { name: "Context Adherence", link: "/concepts/metrics/response-quality/context-adherence", category: "Response Quality", node: "LLM Span", description: "Measures how well the response aligns with the provided context.", whenToUse: "When you want to ensure the model is grounding its responses in the provided context.", example: "A financial advisor bot that must base investment recommendations on the client's specific financial situation." },
        { name: "Context Relevance", link: "/concepts/metrics/response-quality/context-relevance", category: "Response Quality", node: "Retriever Span", description: "Evaluates whether the retrieved context is relevant to the user's query.", whenToUse: "When assessing the quality of your retrieval system's results.", example: "An internal knowledge base search that retrieves company policies relevant to specific employee questions." },
        { name: "Conversation Quality", link: "/concepts/metrics/agentic/conversation-quality", category: "Agentic", node: "Session", description: "Evaluates the overall quality and coherence of multi-turn conversations.", whenToUse: "When assessing conversational AI systems for natural, helpful dialogue.", example: "A virtual assistant that needs to maintain context and provide helpful responses across multiple turns." },
        { name: "Correctness (factuality)", link: "/concepts/metrics/response-quality/correctness", category: "Response Quality", node: "LLM Span", description: "Evaluates the factual accuracy of information provided in the response.", whenToUse: "When accuracy of information is critical to your application.", example: "A medical information system providing drug interaction details to healthcare professionals." },
        { name: "Ground Truth Adherence", link: "/concepts/metrics/response-quality/ground-truth-adherence", category: "Response Quality", node: "Trace", description: "Measures how well the response aligns with established ground truth.", whenToUse: "When evaluating model responses against known correct answers.", example: "A customer service AI that must provide accurate product specifications from an official catalog." },
        { name: "Instruction Adherence", link: "/concepts/metrics/response-quality/instruction-adherence", category: "Response Quality", node: "LLM Span", description: "Assesses whether the model followed the instructions in your prompt template.", whenToUse: "When using complex prompts and need to verify the model is following all instructions.", example: "A content generation system that must follow specific brand guidelines and formatting requirements." },
        { name: "PII / CPNI / PHI", link: "/concepts/metrics/safety-and-compliance/pii", category: "Safety and Compliance", node: "Trace (root input/output only)", description: "Identifies personally identifiable or sensitive information in prompts and responses.", whenToUse: "When handling potentially sensitive data or in regulated industries.", example: "A healthcare chatbot that must detect and redact patient information in conversation logs." },
        { name: "Prompt Injection", link: "/concepts/metrics/safety-and-compliance/prompt-injection", category: "Safety and Compliance", node: "Trace (root input/output only)", description: "Detects attempts to manipulate the model through malicious prompts.", whenToUse: "When allowing user input to be processed directly by your AI system.", example: "A public-facing AI assistant that needs protection from users trying to bypass content filters." },
        { name: "Prompt Perplexity", link: "/concepts/metrics/model-confidence/prompt-perplexity", category: "Model Confidence", node: "LLM Span", description: "Measures how surprising or unexpected the prompt is to the model.", whenToUse: "When analyzing prompt quality or detecting unusual inputs.", example: "A content moderation system that flags unusually structured prompts for manual review." },
        { name: "Sexism / Bias", link: "/concepts/metrics/safety-and-compliance/sexism", category: "Safety and Compliance", node: "Trace (root input/output only)", description: "Detects gender-based bias or discriminatory content.", whenToUse: "When ensuring AI outputs are free from bias and discrimination.", example: "A resume screening assistant that must evaluate job candidates without gender or demographic bias." },
        { name: "Tool Errors", link: "/concepts/metrics/agentic/tool-error", category: "Agentic", node: "Tool Span", description: "Detects errors or failures during the execution of tools.", whenToUse: "When implementing AI agents that use tools and want to track error rates.", example: "A coding assistant that uses external APIs to run code and must handle and report execution errors." },
        { name: "Tool Selection Quality", link: "/concepts/metrics/agentic/tool-selection-quality", category: "Agentic", node: "LLM Span", description: "Evaluates whether the agent selected the most appropriate tools for the task.", whenToUse: "When optimizing agent systems for effective tool usage.", example: "A data analysis agent that must choose the right visualization or statistical method based on the data type." },
        { name: "Tone", link: "/concepts/metrics/expression-and-readability/tone", category: "Expression and Readability", node: "Trace (root input/output only)", description: "Evaluates the emotional tone and style of the response.", whenToUse: "When the style and tone of AI responses matter for your brand or user experience.", example: "A luxury brand's customer service chatbot that must maintain a sophisticated, professional tone." },
        { name: "Toxicity", link: "/concepts/metrics/safety-and-compliance/toxicity", category: "Safety and Compliance", node: "Trace", description: "Identifies harmful, offensive, or inappropriate content.", whenToUse: "When monitoring AI outputs for harmful content or implementing content filtering.", example: "A social media content moderation system that must detect and flag potentially harmful user-generated content." },
        { name: "Uncertainty", link: "/concepts/metrics/model-confidence/uncertainty", category: "Model Confidence", node: "LLM Span", description: "Measures how uncertain the model is about its response.", whenToUse: "When flagging low-confidence responses for human review.", example: "A customer support system that escalates uncertain responses to human agents." },
        { name: "User Intent Change", link: "/concepts/metrics/agentic/intent-change", category: "Agentic", node: "Session", description: "Detects when user intent shifts during a conversation.", whenToUse: "When tracking conversation dynamics and adapting agent behavior.", example: "A sales assistant that needs to recognize when a customer shifts from browsing to purchasing intent." },
    ];

    const categories = [...new Set(metrics.map(m => m.category))].sort();
    const nodes = [...new Set(metrics.map(m => m.node))].sort();

    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterNode, setFilterNode] = useState('All');

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

    const buttonStyle = {
        padding: '0.25rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '0.875rem',
    };

    const activeButtonStyle = {
        ...buttonStyle,
        background: '#1098F7',
        color: '#fff',
        borderColor: '#1098F7',
    };

    const selectStyle = {
        padding: '0.25rem 0.5rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        background: '#fff',
    };

    const headerStyle = {
        cursor: 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
    };

    const getSortIndicator = (column) => {
        if (sortColumn !== column) return ' ↕';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div style={{ marginLeft: '-1rem', paddingLeft: '1rem', overflow: 'visible' }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Category:</label>
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
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Node:</label>
                    <select 
                        value={filterNode} 
                        onChange={(e) => setFilterNode(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="All">All Nodes</option>
                        {nodes.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Showing {filteredAndSortedMetrics.length} of {metrics.length} metrics
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', maxWidth: '100%', paddingLeft: '0.5rem' }}>
                <table style={{ minWidth: '1200px', width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem 0.75rem 0.75rem', minWidth: '180px' }} onClick={() => handleSort('name')}>
                                Name{getSortIndicator('name')}
                            </th>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '140px' }} onClick={() => handleSort('category')}>
                                Category{getSortIndicator('category')}
                            </th>
                            <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '100px' }} onClick={() => handleSort('node')}>
                                Node{getSortIndicator('node')}
                            </th>
                            <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>Description</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>When to Use</th>
                            <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>Example Use Case</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedMetrics.map((metric, idx) => (
                            <tr key={metric.name} style={{ borderBottom: '1px solid #e5e7eb', background: idx % 2 === 0 ? '#fff' : '#f9fafb' }}>
                                <td style={{ padding: '0.75rem 0.5rem 0.75rem 0.75rem', fontWeight: 500, verticalAlign: 'top', minWidth: '180px' }}>
                                    <a href={metric.link} style={{ color: '#1098F7', textDecoration: 'none' }}>
                                        {metric.name}
                                    </a>
                                </td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>{metric.category}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>{metric.node}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>{metric.description}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>{metric.whenToUse}</td>
                                <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>{metric.example}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredAndSortedMetrics.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    No metrics match the selected filters.
                </div>
            )}
        </div>
    );
};
