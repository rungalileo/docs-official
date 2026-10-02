export const LunaMetricsTable = () => {
  const defaultModalities = ["Text"];
  const iconProps = {
    fill: "none",
    height: 20,
    width: 20,
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  };

  const IconText = () => (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8h8M12 8v8" />
    </svg>
  );

  const IconImage = () => (
    <svg {...iconProps} aria-hidden="true">
      <rect height="18" rx="2" width="18" x="3" y="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );

  const IconMusic = () => (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9 18V5l10-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  );

  const modalityIcons = {
    Text: IconText,
    "Image/PDF": IconImage,
    Audio: IconMusic,
  };

  const ModalityIcons = ({ modalities }) => (
    <span aria-label={`Supported modalities: ${modalities.join(", ")}`} role="group" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      {modalities.map((modality) => {
        const Icon = modalityIcons[modality];

        if (!Icon) return null;

        return (
          <span aria-label={modality} key={modality} role="img" style={{ display: "inline-flex", flexShrink: 0 }} title={modality}>
            <Icon />
          </span>
        );
      })}
    </span>
  );

  const metrics = [
    {
      name: "Action Advancement (SLM)",
      link: "/concepts/metrics/agentic/action-advancement",
      category: "Agentic",
      node: "Trace",
      modalities: ["Text"],
      description: "Measures how effectively each action advances toward the goal.",
      whenToUse: "When assessing whether an agent is making meaningful progress in multi-step tasks.",
      example: "A travel planning agent that needs to book flights, hotels, and activities in the correct sequence.",
    },
    {
      name: "Action Completion (SLM)",
      link: "/concepts/metrics/agentic/action-completion",
      category: "Agentic",
      node: "Session",
      modalities: ["Text"],
      description: "Measures whether the agent completed the intended action.",
      whenToUse: "When evaluating agent task completion rates and success.",
      example: "An e-commerce assistant that needs to successfully add items to cart, apply discounts, and complete checkout.",
    },
    {
      name: "Chunk Relevance (SLM)",
      link: "/concepts/metrics/rag/retrieval-quality/chunk-relevance",
      category: "RAG - Retrieval Quality",
      node: "Retriever span",
      modalities: ["Text"],
      description: "Measures whether each retrieved chunk contains information that could help answer the user's query.",
      whenToUse: "When evaluating the relevance of individual retrieved chunks to the query.",
      example: "A RAG system that needs to ensure each retrieved document chunk contributes useful information toward answering user questions.",
    },
    {
      name: "Completeness (SLM)",
      link: "/concepts/metrics/rag/generation-quality/completeness",
      category: "RAG - Generation Quality",
      node: "LLM Span",
      modalities: ["Text"],
      description: "Measures whether the response addresses all aspects of the user's query.",
      whenToUse: "When evaluating if responses fully address the user's intent.",
      example: "A healthcare chatbot that must address all symptoms mentioned by a patient when suggesting next steps.",
    },
    {
      name: "Context Adherence (SLM)",
      link: "/concepts/metrics/rag/generation-quality/context-adherence",
      category: "RAG - Generation Quality",
      node: "LLM Span",
      modalities: ["Text"],
      description: "Measures how well the response aligns with the provided context.",
      whenToUse: "When you want to ensure the model is grounding its responses in the provided context.",
      example: "A financial advisor bot that must base investment recommendations on the client's specific financial situation.",
    },
    {
      name: "Context Relevance (SLM)",
      link: "/concepts/metrics/rag/retrieval-quality/context-relevance",
      category: "RAG - Retrieval Quality",
      node: "Retriever span",
      modalities: ["Text"],
      description: "Measures whether the retrieved context, as a whole, contains enough information to fully answer the user's query.",
      whenToUse: "When assessing whether retrieval succeeded for a query and deciding whether to adjust Top K, retriever configuration, or fallback behavior.",
      example: "A RAG support assistant that needs to verify its retrieved documentation collectively covers all information needed to answer a customer's question.",
    },
    {
      name: "PII (SLM)",
      link: "/concepts/metrics/safety-and-compliance/pii",
      category: "Safety and Compliance",
      node: "Trace (root input/output only)",
      modalities: ["Text"],
      description: "Identifies personally identifiable or sensitive information in prompts and responses.",
      whenToUse: "When handling potentially sensitive data or in regulated industries.",
      example: "A healthcare chatbot that must detect and redact patient information in conversation logs.",
    },
    {
      name: "Prompt Injection (SLM)",
      link: "/concepts/metrics/safety-and-compliance/prompt-injection",
      category: "Safety and Compliance",
      node: "Trace (root input only)",
      modalities: ["Text"],
      description: "Detects attempts to manipulate the model through malicious prompts.",
      whenToUse: "When allowing user input to be processed directly by your AI system.",
      example: "A public-facing AI assistant that needs protection from users trying to bypass content filters or extract sensitive information.",
    },
   {
      name: "Sexism (SLM)",
      link: "/concepts/metrics/safety-and-compliance/sexism",
      category: "Safety and Compliance",
      node: "Trace (root input/output only)",
      modalities: ["Text"],
      description: "Detects gender-based bias or discriminatory content.",
      whenToUse: "When ensuring AI outputs are free from bias and discrimination.",
      example: "A resume screening assistant that must evaluate job candidates without gender or demographic bias.",
    },
   {
      name: "Tone (SLM)",
      link: "/concepts/metrics/expression-and-readability/tone",
      category: "Expression and Readability",
      node: "Trace (root input/output only)",
      modalities: ["Text"],
      description: "Evaluates the emotional tone and style of the response.",
      whenToUse: "When the style and tone of AI responses matter for your brand or user experience.",
      example: "A luxury brand's customer service chatbot that must maintain a sophisticated, professional tone.",
    },
    {
      name: "Tool Error Rate (SLM)",
      link: "/concepts/metrics/agentic/tool-error",
      category: "Agentic",
      node: "Tool Span",
      modalities: ["Text"],
      description: "Detects errors or failures during the execution of tools.",
      whenToUse: "When implementing AI agents that use tools and want to track error rates.",
      example: "A coding assistant that uses external APIs to run code and must handle and report execution errors.",
    },
    {
      name: "Tool Selection Quality (SLM)",
      link: "/concepts/metrics/agentic/tool-selection-quality",
      category: "Agentic",
      node: "LLM Span",
      modalities: ["Text"],
      description: "Evaluates whether the agent selected the most appropriate tools for the task.",
      whenToUse: "When optimizing agent systems for effective tool usage.",
      example: "A data analysis agent that must choose the right visualization or statistical method based on the data type.",
    },
    {
      name: "Toxicity (SLM)",
      link: "/concepts/metrics/safety-and-compliance/toxicity",
      category: "Safety and Compliance",
      node: "Trace (root input/output only)",
      modalities: ["Text"],
      description: "Identifies harmful, offensive, or inappropriate content.",
      whenToUse: "When monitoring AI outputs for harmful content or implementing content filtering.",
      example: "A social media content moderation system that must detect and flag potentially harmful user-generated content.",
    },
  ];

  const categories = [...new Set(metrics.map((m) => m.category))].sort();
  const nodes = [...new Set(metrics.map((m) => m.node))].sort();
  const modalities = [...new Set(metrics.flatMap((m) => m.modalities ?? defaultModalities))].sort();

  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterNode, setFilterNode] = useState("All");
  const [filterModality, setFilterModality] = useState("All");

  // Detect dark mode via Mintlify's "dark" class on <html> or via prefers-color-scheme
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      const htmlEl = document.documentElement;
      // Mintlify adds class "dark" to <html> when dark mode is active
      if (htmlEl.classList.contains("dark")) {
        setIsDark(true);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && !htmlEl.classList.contains("light")) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };

    checkDark();

    // Observe class changes on <html> for dynamic theme switching
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Also listen to system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDark);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", checkDark);
    };
  }, []);

  // Theme-aware colors
  const colors = isDark
    ? {
        bg: "#1a1a1a",
        bgAlt: "#262626",
        border: "#3f3f46",
        text: "#e4e4e7",
        textMuted: "#a1a1aa",
        selectBg: "#27272a",
        selectBorder: "#3f3f46",
        link: "#38bdf8",
      }
    : {
        bg: "#ffffff",
        bgAlt: "#f9fafb",
        border: "#e5e7eb",
        text: "#111827",
        textMuted: "#6b7280",
        selectBg: "#ffffff",
        selectBorder: "#d1d5db",
        link: "#1098F7",
      };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedMetrics = metrics
    .filter((m) => filterCategory === "All" || m.category === filterCategory)
    .filter((m) => filterNode === "All" || m.node === filterNode)
    .filter((m) => filterModality === "All" || (m.modalities ?? defaultModalities).includes(filterModality))
    .sort((a, b) => {
      const aVal = sortColumn === "modalities" ? (a.modalities ?? defaultModalities).join(" ") : a[sortColumn] || "";
      const bVal = sortColumn === "modalities" ? (b.modalities ?? defaultModalities).join(" ") : b[sortColumn] || "";
      if (sortDirection === "asc") {
        return aVal.localeCompare(bVal);
      }
      return bVal.localeCompare(aVal);
    });

  const selectStyle = {
    padding: "0.25rem 0.5rem",
    border: `1px solid ${colors.selectBorder}`,
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    background: colors.selectBg,
    color: colors.text,
  };

  const headerStyle = {
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    color: colors.text,
  };

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return " ↕";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div style={{ marginLeft: "-1rem", paddingLeft: "1rem", overflow: "visible", color: colors.text }}>
      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center", paddingLeft: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500, color: colors.text }}>Category:</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={selectStyle}>
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500, color: colors.text }}>Node:</label>
          <select value={filterNode} onChange={(e) => setFilterNode(e.target.value)} style={selectStyle}>
            <option value="All">All Nodes</option>
            {nodes.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500, color: colors.text }}>Modality:</label>
          <select value={filterModality} onChange={(e) => setFilterModality(e.target.value)} style={selectStyle}>
            <option value="All">All Modalities</option>
            {modalities.map((modality) => (
              <option key={modality} value={modality}>
                {modality}
              </option>
            ))}
          </select>
        </div>
        <div style={{ fontSize: "0.75rem", color: colors.textMuted }}>
          Showing {filteredAndSortedMetrics.length} of {metrics.length} metrics
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", maxWidth: "100%", paddingLeft: "0.5rem" }}>
        <table style={{ minWidth: "1320px", width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem 0.75rem 0.75rem", minWidth: "180px" }} onClick={() => handleSort("name")}>
                Name{getSortIndicator("name")}
              </th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "140px" }} onClick={() => handleSort("category")}>
                Category{getSortIndicator("category")}
              </th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "100px" }} onClick={() => handleSort("node")}>
                Node{getSortIndicator("node")}
              </th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "150px" }} onClick={() => handleSort("modalities")}>
                Modalities{getSortIndicator("modalities")}
              </th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "200px" }}>Description</th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "200px" }}>When to Use</th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "200px" }}>Example Use Case</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedMetrics.map((metric, idx) => (
              <tr key={metric.name} style={{ borderBottom: `1px solid ${colors.border}`, background: idx % 2 === 0 ? colors.bg : colors.bgAlt }}>
                <td style={{ padding: "0.75rem 0.5rem 0.75rem 0.75rem", fontWeight: 500, verticalAlign: "top", minWidth: "180px" }}>
                  <a href={metric.link} style={{ color: colors.link, textDecoration: "none" }}>
                    {metric.name}
                  </a>
                </td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>{metric.category}</td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>{metric.node}</td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>
                  <ModalityIcons modalities={metric.modalities ?? defaultModalities} />
                </td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>{metric.description}</td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>{metric.whenToUse}</td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>{metric.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedMetrics.length === 0 && <div style={{ padding: "2rem", textAlign: "center", color: colors.textMuted }}>No metrics match the selected filters.</div>}
    </div>
  );
};
