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
  const cellStyle = { padding: "0.5rem" };
  const centerCellStyle = { textAlign: "center", padding: "0.5rem" };

  return (
    <div>
      {/* Classification Report Table - full width to match markdown tables */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(148, 163, 184, 0.5)" }}>
            <th style={{ textAlign: "left", padding: "0.5rem", fontWeight: "600" }}></th>
            <th style={{ textAlign: "center", padding: "0.5rem", fontWeight: "600" }}>Precision</th>
            <th style={{ textAlign: "center", padding: "0.5rem", fontWeight: "600" }}>Recall</th>
            <th style={{ textAlign: "center", padding: "0.5rem", fontWeight: "600" }}>F1-Score</th>
            <th style={{ textAlign: "center", padding: "0.5rem", fontWeight: "600" }}>Support</th>
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
}) => {
  const parseNum = (val) => (val !== undefined && val !== null ? Number(val) : undefined);
  const clampPct = (pct) => Math.max(0, Math.min(100, Number(pct) || 0));
  const formatValue = (pct) => {
    const p = clampPct(pct);
    return displayFormat === "fraction" ? (p / 100).toFixed(3) : `${p.toFixed(1)}%`;
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
          Confusion Matrix (Normalized)
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
