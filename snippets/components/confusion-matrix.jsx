export const BooleanClassificationReport = ({
  report,
  negativeLabel = "Not Advanced",
  positiveLabel = "Advanced",
  negativeClass = "False",
  positiveClass = "True",
  maxWidth = 520,
}) => {
  // Parse sklearn classification report string
  const parseReport = (reportStr) => {
    const lines = reportStr.trim().split('\n').filter(line => line.trim());
    const result = { classes: [], accuracy: null, macroAvg: null, weightedAvg: null, totalSupport: null };
    
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      
      // Skip header line
      if (parts[0] === 'precision') continue;
      
      // Parse class rows (e.g., "False 0.9583 0.7302 0.8288 63")
      if (parts.length >= 5 && !['accuracy', 'macro', 'weighted'].includes(parts[0])) {
        result.classes.push({
          name: parts[0],
          precision: parseFloat(parts[1]),
          recall: parseFloat(parts[2]),
          f1: parseFloat(parts[3]),
          support: parseInt(parts[4], 10),
        });
      }
      
      // Parse accuracy row (accuracy has format: "accuracy 0.8504 127")
      if (parts[0] === 'accuracy') {
        result.accuracy = parseFloat(parts[1]);
        result.totalSupport = parseInt(parts[2], 10);
      }
      
      // Parse macro avg row (format: "macro avg 0.8716 0.8495 0.8480 127")
      if (parts[0] === 'macro' && parts[1] === 'avg') {
        result.macroAvg = {
          precision: parseFloat(parts[2]),
          recall: parseFloat(parts[3]),
          f1: parseFloat(parts[4]),
          support: parseInt(parts[5], 10),
        };
      }
      
      // Parse weighted avg row (format: "weighted avg 0.8709 0.8504 0.8481 127")
      if (parts[0] === 'weighted' && parts[1] === 'avg') {
        result.weightedAvg = {
          precision: parseFloat(parts[2]),
          recall: parseFloat(parts[3]),
          f1: parseFloat(parts[4]),
          support: parseInt(parts[5], 10),
        };
      }
    }
    
    return result;
  };

  const parsed = parseReport(report);
  
  if (parsed.classes.length < 2) {
    return <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>BooleanClassificationReport: Could not parse report. Expected at least 2 classes.</div>;
  }

  // Find negative and positive class data
  const negClass = parsed.classes.find(c => c.name === negativeClass) || parsed.classes[0];
  const posClass = parsed.classes.find(c => c.name === positiveClass) || parsed.classes[1];

  // Calculate confusion matrix values from precision, recall, and support
  // For negative class: recall = TN / (TN + FP), support = TN + FP
  // For positive class: recall = TP / (TP + FN), support = TP + FN
  const tnPlusFp = negClass.support;
  const tpPlusFn = posClass.support;
  
  const tn = Math.round(negClass.recall * tnPlusFp);
  const fp = tnPlusFp - tn;
  const tp = Math.round(posClass.recall * tpPlusFn);
  const fn = tpPlusFn - tp;

  // Calculate percentages (row-normalized)
  const tnPct = (tn / tnPlusFp) * 100;
  const fpPct = (fp / tnPlusFp) * 100;
  const fnPct = (fn / tpPlusFn) * 100;
  const tpPct = (tp / tpPlusFn) * 100;

  const rowStyle = { borderBottom: "1px solid rgba(148, 163, 184, 0.3)" };
  const cellStyle = { padding: "0.5rem 0.125rem" };
  const centerCellStyle = { textAlign: "left", padding: "0.5rem 0.125rem" };

  return (
    <div>
      {/* Classification Report Table - full width to match markdown tables */}
      <table style={{ width: "auto", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(148, 163, 184, 0.5)" }}>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}></th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>Precision</th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>Recall</th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>F1-Score</th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>Support</th>
          </tr>
        </thead>
        <tbody>
          {/* Class rows */}
          <tr style={rowStyle}>
            <td style={cellStyle}>{negativeLabel}</td>
            <td style={centerCellStyle}>{negClass.precision.toFixed(2)}</td>
            <td style={centerCellStyle}>{negClass.recall.toFixed(2)}</td>
            <td style={centerCellStyle}>{negClass.f1.toFixed(2)}</td>
            <td style={centerCellStyle}>{negClass.support}</td>
          </tr>
          <tr style={rowStyle}>
            <td style={cellStyle}>{positiveLabel}</td>
            <td style={centerCellStyle}>{posClass.precision.toFixed(2)}</td>
            <td style={centerCellStyle}>{posClass.recall.toFixed(2)}</td>
            <td style={centerCellStyle}>{posClass.f1.toFixed(2)}</td>
            <td style={centerCellStyle}>{posClass.support}</td>
          </tr>
          
        </tbody>
      </table>

      {/* Confusion Matrix */}
      <BooleanConfusionMatrix
        actualNegativeLabel={negativeLabel}
        actualPositiveLabel={positiveLabel}
        predictedNegativeLabel={negativeLabel}
        predictedPositiveLabel={positiveLabel}
        tnPct={tnPct.toString()}
        fpPct={fpPct.toString()}
        fnPct={fnPct.toString()}
        tpPct={tpPct.toString()}
        displayFormat="fraction"
        maxWidth={maxWidth}
      />
    </div>
  );
};

export const BooleanConfusionMatrix = ({
  actualNegativeLabel = "Not Advanced",
  actualPositiveLabel = "Advanced",
  predictedNegativeLabel = "Not Advanced",
  predictedPositiveLabel = "Advanced",
  tnCount,
  tnPct,
  fpCount,
  fpPct,
  fnCount,
  fnPct,
  tpCount,
  tpPct,
  matrix,
  maxWidth = 520,
  displayFormat = "percentage", // "percentage" or "fraction"
  fractionDigits = 3,
  percentageDigits = 1,
  titlePrefix = "",
}) => {
  const parseNum = (val) => (val !== undefined && val !== null ? Number(val) : undefined);
  const clampPct = (pct) => Math.max(0, Math.min(100, Number(pct) || 0));
  const formatValue = (pct) => {
    const p = clampPct(pct);
    if (displayFormat === "fraction") {
      const digits = Number.isFinite(Number(fractionDigits)) ? Number(fractionDigits) : 3;
      return (p / 100).toFixed(digits);
    }
    const digits = Number.isFinite(Number(percentageDigits)) ? Number(percentageDigits) : 1;
    return `${p.toFixed(digits)}%`;
  };

  const palette = [
    "#f8fafc",
    "#eff6ff",
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
  ];

  const getBg = (pct) => {
    const p = clampPct(pct);
    const idx = p === 100 ? 9 : Math.floor(p / 10);
    return palette[idx];
  };

  const getColor = (pct) => (clampPct(pct) >= 60 ? "#ffffff" : "#1e3a8a");

  // Parse raw inputs
  const rawTn = parseNum(tnCount);
  const rawFp = parseNum(fpCount);
  const rawFn = parseNum(fnCount);
  const rawTp = parseNum(tpCount);
  const rawTnPct = parseNum(tnPct);
  const rawFpPct = parseNum(fpPct);
  const rawFnPct = parseNum(fnPct);
  const rawTpPct = parseNum(tpPct);

  // Determine mode: counts-only, percentages-only, or use matrix prop
  const hasCounts = rawTn !== undefined && rawFp !== undefined && rawFn !== undefined && rawTp !== undefined;
  const hasPcts = rawTnPct !== undefined && rawFpPct !== undefined && rawFnPct !== undefined && rawTpPct !== undefined;

  let resolvedMatrix;
  let showCounts;

  if (matrix) {
    resolvedMatrix = matrix;
    showCounts = matrix.tn?.count !== undefined;
  } else if (hasCounts) {
    // Calculate percentages from counts (row-wise: TN+FP for actual negative, FN+TP for actual positive)
    const actualNegTotal = rawTn + rawFp;
    const actualPosTotal = rawFn + rawTp;
    resolvedMatrix = {
      tn: { count: rawTn, pct: actualNegTotal > 0 ? (rawTn / actualNegTotal) * 100 : 0 },
      fp: { count: rawFp, pct: actualNegTotal > 0 ? (rawFp / actualNegTotal) * 100 : 0 },
      fn: { count: rawFn, pct: actualPosTotal > 0 ? (rawFn / actualPosTotal) * 100 : 0 },
      tp: { count: rawTp, pct: actualPosTotal > 0 ? (rawTp / actualPosTotal) * 100 : 0 },
    };
    showCounts = true;
  } else if (hasPcts) {
    // Percentages only mode
    resolvedMatrix = {
      tn: { pct: rawTnPct },
      fp: { pct: rawFpPct },
      fn: { pct: rawFnPct },
      tp: { pct: rawTpPct },
    };
    showCounts = false;
  } else {
    return <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>BooleanConfusionMatrix: Provide either all counts or all percentages</div>;
  }

  const cellStyle = (pct) => ({
    background: getBg(pct),
    color: getColor(pct),
    padding: "1rem",
    textAlign: "center",
    borderRadius: "8px",
    aspectRatio: "1 / 1",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(148, 163, 184, 0.35)",
  });

  const displayPredictedLabels = {
    left: predictedPositiveLabel,
    right: predictedNegativeLabel,
  };

  const displayActualLabels = {
    top: actualPositiveLabel,
    bottom: actualNegativeLabel,
  };

  const displayMatrix = {
    tl: resolvedMatrix.tp,
    tr: resolvedMatrix.fn,
    bl: resolvedMatrix.fp,
    br: resolvedMatrix.tn,
  };

  return (
    <div style={{ maxWidth: maxWidth + "px", margin: "1rem 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto auto 1fr 1fr", gridTemplateRows: "auto auto auto 1fr 1fr auto", gap: "2px" }}>
        {/* Row 1: Title spanning columns 3-4 */}
        <div></div>
        <div></div>
        <div style={{ gridColumn: "3 / 5", textAlign: "center", padding: "0.5rem", fontWeight: "600", fontSize: "1rem" }}>
          {titlePrefix}Confusion Matrix (Normalized)
        </div>

        {/* Row 2: Empty corners + "Predicted" spanning columns 3-4 */}
        <div></div>
        <div></div>
        <div style={{ gridColumn: "3 / 5", textAlign: "center", padding: "0.5rem", fontWeight: "600", fontSize: "0.875rem" }}>
          Predicted
        </div>

        {/* Row 3: Empty corner + empty corner + predicted class labels */}
        <div></div>
        <div></div>
        <div style={{ textAlign: "center", padding: "0.5rem", fontSize: "0.75rem", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "center" }}>{displayPredictedLabels.left}</div>
        <div style={{ textAlign: "center", padding: "0.5rem", fontSize: "0.75rem", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "center" }}>{displayPredictedLabels.right}</div>

        {/* Row 4: "Actual" spanning rows 4-5 + actual positive label + TP + FN */}
        <div style={{ gridRow: "4 / 6", writingMode: "vertical-rl", transform: "rotate(180deg)", textAlign: "center", fontWeight: "600", fontSize: "0.875rem", padding: "0 0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Actual
        </div>
        <div style={{ padding: "0.5rem", fontSize: "0.75rem", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>{displayActualLabels.top}</div>
        <div style={cellStyle(displayMatrix.tl.pct)}>
          {showCounts && <div style={{ fontSize: "1.5rem", fontWeight: "700", lineHeight: 1 }}>{displayMatrix.tl.count}</div>}
          <div style={{ fontSize: showCounts ? "0.75rem" : "1rem", fontWeight: showCounts ? "400" : "700", opacity: showCounts ? 0.8 : 1 }}>{formatValue(displayMatrix.tl.pct)}</div>
        </div>
        <div style={cellStyle(displayMatrix.tr.pct)}>
          {showCounts && <div style={{ fontSize: "1.5rem", fontWeight: "700", lineHeight: 1 }}>{displayMatrix.tr.count}</div>}
          <div style={{ fontSize: showCounts ? "0.75rem" : "1rem", fontWeight: showCounts ? "400" : "700", opacity: showCounts ? 0.8 : 1 }}>{formatValue(displayMatrix.tr.pct)}</div>
        </div>

        {/* Row 4: (Actual already spans here) + actual negative label + FP + TN */}
        <div style={{ padding: "0.5rem", fontSize: "0.75rem", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>{displayActualLabels.bottom}</div>
        <div style={cellStyle(displayMatrix.bl.pct)}>
          {showCounts && <div style={{ fontSize: "1.5rem", fontWeight: "700", lineHeight: 1 }}>{displayMatrix.bl.count}</div>}
          <div style={{ fontSize: showCounts ? "0.75rem" : "1rem", fontWeight: showCounts ? "400" : "700", opacity: showCounts ? 0.8 : 1 }}>{formatValue(displayMatrix.bl.pct)}</div>
        </div>
        <div style={cellStyle(displayMatrix.br.pct)}>
          {showCounts && <div style={{ fontSize: "1.5rem", fontWeight: "700", lineHeight: 1 }}>{displayMatrix.br.count}</div>}
          <div style={{ fontSize: showCounts ? "0.75rem" : "1rem", fontWeight: showCounts ? "400" : "700", opacity: showCounts ? 0.8 : 1 }}>{formatValue(displayMatrix.br.pct)}</div>
        </div>

        {/* Row 5: Color scale legend spanning columns 3-4 */}
        <div></div>
        <div></div>
        <div style={{ gridColumn: "3 / 5", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>{displayFormat === "fraction" ? "0.0" : "0%"}</span>
          <div style={{ display: "flex", flex: 1, height: "12px", borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(148, 163, 184, 0.35)" }}>
            {palette.map((color, idx) => (
              <div key={idx} style={{ flex: 1, height: "100%", background: color }} />
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>{displayFormat === "fraction" ? "1.0" : "100%"}</span>
        </div>
      </div>
    </div>
  );
};

export const MultiLabelConfusionMatrix = ({
  report,
  labelOrder,
  labelDisplayNames = {},
  decimals = 4,
  maxWidth = 520,
  microNegativeLabel = "False",
  microPositiveLabel = "True",
  showPerLabelMatrices = true,
}) => {
  // Inline helpers (required for MDX/Mintlify compatibility)
  const toNum = (v) => { if (v == null) return undefined; const n = Number(v); return Number.isFinite(n) ? n : undefined; };
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const sumVals = (obj, keys) => (keys || Object.keys(obj || {})).reduce((a, k) => a + (toNum(obj?.[k]) ?? 0), 0);
  const getLabels = (lo, pcs) => { if (Array.isArray(lo) && lo.length) return lo; if (pcs && typeof pcs === "object") return Object.keys(pcs); return []; };
  const deriveCM = ({ precision, recall, positiveSupport, negativeSupport }) => {
    const P = toNum(positiveSupport), N = toNum(negativeSupport), prec = toNum(precision), rec = toNum(recall);
    if (P === undefined || N === undefined || prec === undefined || rec === undefined || P < 0 || N < 0) return null;
    const tp = clamp01(rec) * P, fn = P - tp;
    let fp = clamp01(prec) > 0 ? tp / clamp01(prec) - tp : 0;
    if (!Number.isFinite(fp) || fp < 0) fp = 0; if (fp > N) fp = N;
    const tn = N - fp;
    return { tnPct: N > 0 ? (tn / N) * 100 : 0, fpPct: N > 0 ? (fp / N) * 100 : 0, fnPct: P > 0 ? (fn / P) * 100 : 0, tpPct: P > 0 ? (tp / P) * 100 : 0 };
  };

  const labels = getLabels(labelOrder, report?.per_class_support);
  const perSupport = report?.per_class_support || {};
  const perNegSupport = report?.per_class_negative_support || {};

  if (!report || labels.length === 0) {
    return (
      <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>
        MultiLabelConfusionMatrix: Missing or invalid report/labels.
      </div>
    );
  }

  // Phase 1: Aggregation (Micro-averaging)
  const totalPositiveSupport = sumVals(perSupport, labels);
  const totalNegativeSupport = sumVals(perNegSupport, labels);

  const microMatrix = deriveCM({
    precision: report.micro_precision,
    recall: report.micro_recall,
    positiveSupport: totalPositiveSupport,
    negativeSupport: totalNegativeSupport,
  });

  return (
    <div>
      {microMatrix ? (
        <BooleanConfusionMatrix
          actualPositiveLabel={microPositiveLabel}
          actualNegativeLabel={microNegativeLabel}
          predictedPositiveLabel={microPositiveLabel}
          predictedNegativeLabel={microNegativeLabel}
          matrix={{
            tp: { pct: microMatrix.tpPct },
            fn: { pct: microMatrix.fnPct },
            fp: { pct: microMatrix.fpPct },
            tn: { pct: microMatrix.tnPct },
          }}
          displayFormat="fraction"
          fractionDigits={decimals}
          maxWidth={maxWidth}
          titlePrefix="Micro-Averaged "
        />
      ) : (
        <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>
          MultiLabelConfusionMatrix: Could not derive micro confusion matrix from report.
        </div>
      )}

      {showPerLabelMatrices && (
        <>
          <div style={{ fontWeight: "600", fontSize: "0.95rem", margin: "1.25rem 0 0.5rem" }}>Per-label confusion matrices</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {labels.map((label) => {
              const labelName = labelDisplayNames?.[label] ?? label;
              const matrix = deriveCM({
                precision: report?.per_class_precision?.[label],
                recall: report?.per_class_recall?.[label],
                positiveSupport: perSupport?.[label],
                negativeSupport: perNegSupport?.[label],
              });

              const negativeLabel = `Not ${labelName}`;

              return (
                <div key={label}>
                  <div style={{ fontWeight: "600", fontSize: "0.875rem", marginBottom: "0.25rem" }}>{labelName}</div>
                  {matrix ? (
                    <BooleanConfusionMatrix
                      actualPositiveLabel={labelName}
                      actualNegativeLabel={negativeLabel}
                      predictedPositiveLabel={labelName}
                      predictedNegativeLabel={negativeLabel}
                      matrix={{
                        tp: { pct: matrix.tpPct },
                        fn: { pct: matrix.fnPct },
                        fp: { pct: matrix.fpPct },
                        tn: { pct: matrix.tnPct },
                      }}
                      displayFormat="fraction"
                      fractionDigits={decimals}
                      maxWidth={maxWidth}
                    />
                  ) : (
                    <div style={{ color: "red", padding: "0.75rem", border: "1px solid red" }}>
                      Could not derive confusion matrix for label: <code>{label}</code>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export const MultiLabelClassificationReport = ({
  report: reportProp,
  labelOrder: labelOrderProp,
  labelDisplayNames: labelDisplayNamesProp = {},
  decimals = 4,
  maxWidth = 520,
  showConfusionMatrices = true,
  showPerLabelMatrices = true,
  showAverageRows = true,
}) => {
  // Inline helpers (required for MDX/Mintlify compatibility)
  const toNum = (v) => { if (v == null) return undefined; const n = Number(v); return Number.isFinite(n) ? n : undefined; };
  const sumVals = (obj, keys) => (keys || Object.keys(obj || {})).reduce((a, k) => a + (toNum(obj?.[k]) ?? 0), 0);
  const getLabels = (lo, pcs) => { if (Array.isArray(lo) && lo.length) return lo; if (pcs && typeof pcs === "object") return Object.keys(pcs); return []; };
  const fmtMetric = (v, d) => { const n = toNum(v); if (n === undefined) return "—"; return n.toFixed(Number.isFinite(Number(d)) ? Number(d) : 4); };

  // Support both object and JSON string formats for MDX compatibility
  let report, labelOrder, labelDisplayNames;
  try {
    report = typeof reportProp === 'string' ? JSON.parse(reportProp) : reportProp;
    labelOrder = typeof labelOrderProp === 'string' ? JSON.parse(labelOrderProp) : labelOrderProp;
    labelDisplayNames = typeof labelDisplayNamesProp === 'string' ? JSON.parse(labelDisplayNamesProp) : labelDisplayNamesProp;
  } catch (e) {
    return (
      <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>
        MultiLabelClassificationReport: JSON parse error - {e.message}
      </div>
    );
  }

  const labels = getLabels(labelOrder, report?.per_class_support);

  if (!report || labels.length === 0) {
    return (
      <div style={{ color: "red", padding: "1rem", border: "1px solid red" }}>
        MultiLabelClassificationReport: Missing or invalid report/labels.
      </div>
    );
  }

  const perSupport = report?.per_class_support || {};
  const totalPositiveSupport = sumVals(perSupport, labels);

  const rowStyle = { borderBottom: "1px solid rgba(148, 163, 184, 0.3)" };
  const cellStyle = { padding: "0.5rem 0.125rem" };
  const centerCellStyle = { textAlign: "left", padding: "0.5rem 0.125rem" };

  const avgRowStyle = {
    ...rowStyle,
    background: "rgba(148, 163, 184, 0.08)",
    fontWeight: 600,
  };

  return (
    <div>
      <table style={{ width: "auto", borderCollapse: "collapse", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(148, 163, 184, 0.5)" }}>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}></th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>Precision</th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>Recall</th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>F1-Score</th>
            <th style={{ textAlign: "left", padding: "0.5rem 0.125rem", fontWeight: "600" }}>Support</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label) => {
            const labelName = labelDisplayNames?.[label] ?? label;
            return (
              <tr key={label} style={rowStyle}>
                <td style={cellStyle}>{labelName}</td>
                <td style={centerCellStyle}>{fmtMetric(report?.per_class_precision?.[label], decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report?.per_class_recall?.[label], decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report?.per_class_f1?.[label], decimals)}</td>
                <td style={centerCellStyle}>{toNum(perSupport?.[label]) ?? "—"}</td>
              </tr>
            );
          })}

          {showAverageRows && (
            <>
              <tr style={avgRowStyle}>
                <td style={cellStyle}>Micro avg</td>
                <td style={centerCellStyle}>{fmtMetric(report.micro_precision, decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report.micro_recall, decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report.micro_f1, decimals)}</td>
                <td style={centerCellStyle}>{totalPositiveSupport}</td>
              </tr>
              <tr style={avgRowStyle}>
                <td style={cellStyle}>Macro avg</td>
                <td style={centerCellStyle}>{fmtMetric(report.macro_precision, decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report.macro_recall, decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report.macro_f1, decimals)}</td>
                <td style={centerCellStyle}>{totalPositiveSupport}</td>
              </tr>
              <tr style={avgRowStyle}>
                <td style={cellStyle}>Weighted avg</td>
                <td style={centerCellStyle}>{fmtMetric(report.weighted_precision, decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report.weighted_recall, decimals)}</td>
                <td style={centerCellStyle}>{fmtMetric(report.weighted_f1, decimals)}</td>
                <td style={centerCellStyle}>{totalPositiveSupport}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {showConfusionMatrices && (
        <MultiLabelConfusionMatrix
          report={report}
          labelOrder={labels}
          labelDisplayNames={labelDisplayNames}
          decimals={decimals}
          maxWidth={maxWidth}
          showPerLabelMatrices={showPerLabelMatrices}
        />
      )}
    </div>
  );
};
