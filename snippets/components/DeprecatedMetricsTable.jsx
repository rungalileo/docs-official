export const DeprecatedMetricsTable = () => {
  const metrics = [
    {
      name: "BLEU & ROUGE",
      category: "Expression and Readability",
      node: "LLM Span",
      description: "Measures text similarity using n-gram overlap between generated and reference text.",
      whenToUse: "When comparing generated text against reference translations or summaries.",
      example: "A translation system that needs to measure output quality against professional human translations.",
    },
    {
      name: "Chunk Attribution Utilization",
      category: "RAG - Generation Quality",
      node: "Retriever Span",
      description: "Assesses whether the response uses the retrieved chunks and properly attributes information to source documents.",
      whenToUse: "When implementing RAG systems and want to ensure proper attribution.",
      example: "A legal research assistant that must cite specific cases and statutes when providing legal information.",
    },
    {
      name: "Prompt Perplexity",
      category: "Model Confidence",
      node: "LLM Span",
      description: "Measures how surprising or unexpected the prompt is to the model.",
      whenToUse: "When analyzing prompt quality or detecting unusual inputs.",
      example: "A content moderation system that flags unusually structured prompts for manual review.",
    },
    {
      name: "Uncertainty",
      category: "Model Confidence",
      node: "LLM Span",
      description: "Measures how uncertain the model is about its response.",
      whenToUse: "When flagging low-confidence responses for human review.",
      example: "A customer support system that escalates uncertain responses to human agents.",
    },
  ];

  const categories = [...new Set(metrics.map((m) => m.category))].sort();
  const nodes = [...new Set(metrics.map((m) => m.node))].sort();

  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterNode, setFilterNode] = useState("All");

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
    .sort((a, b) => {
      const aVal = a[sortColumn]?.toLowerCase() || "";
      const bVal = b[sortColumn]?.toLowerCase() || "";
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
        <div style={{ fontSize: "0.75rem", color: colors.textMuted }}>
          Showing {filteredAndSortedMetrics.length} of {metrics.length} metrics
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", maxWidth: "100%", paddingLeft: "0.5rem" }}>
        <table style={{ minWidth: "1200px", width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
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
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "200px" }}>Description</th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "200px" }}>When to Use</th>
              <th style={{ ...headerStyle, textAlign: "left", padding: "0.75rem 0.5rem", minWidth: "200px" }}>Example Use Case</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedMetrics.map((metric, idx) => (
              <tr key={metric.name} style={{ borderBottom: `1px solid ${colors.border}`, background: idx % 2 === 0 ? colors.bg : colors.bgAlt }}>
                <td style={{ padding: "0.75rem 0.5rem 0.75rem 0.75rem", fontWeight: 500, verticalAlign: "top", minWidth: "180px" }}>
                  {metric.name}
                </td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>{metric.category}</td>
                <td style={{ padding: "0.75rem 0.5rem", verticalAlign: "top", color: colors.text }}>{metric.node}</td>
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