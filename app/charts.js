// Small canvas chart kit for Indonesia in Numbers.
// No library: every chart is drawn with the canvas 2D API so the first
// load stays tiny and the site needs no network at all.

const INK = '#1c2420';
const MUTED = '#6b7280';
const TEAL = '#0d5c57';
const TEAL_SOFT = '#17837c';
const AMBER = '#e8a33d';
const GRID = '#e3ddd0';

function setupCanvas(canvas, height) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  canvas.width = Math.max(1, Math.round(width * ratio));
  canvas.height = Math.round(height * ratio);
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

function niceMax(max) {
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const norm = max / pow;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * pow;
}

function drawAxes(ctx, x0, y0, x1, y1, ticks, lo, hi) {
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.fillStyle = MUTED;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const t of ticks) {
    // Gridlines share the data scale, so a label always sits on the
    // line its value belongs to — even when the range dips below zero.
    const y = y0 - ((t - lo) / (hi - lo)) * (y0 - y1);
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
    ctx.fillText(String(t), x0 - 8, y);
  }
  ctx.strokeStyle = '#c9c2b2';
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y0);
  ctx.stroke();
}

// Vertical bars with a value label on top of each bar.
export function drawBarChart(canvas, points, formatValue) {
  const { ctx, width, height } = setupCanvas(canvas, 220);
  const padL = 44, padR = 10, padT = 22, padB = 30;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const max = niceMax(Math.max(...points.map((p) => p.value)));
  const ticks = [0, max / 2, max];
  drawAxes(ctx, padL, height - padB, width - padR, padT, ticks, 0, max);
  const slot = plotW / points.length;
  const barW = Math.min(34, slot * 0.62);
  ctx.textAlign = 'center';
  points.forEach((p, i) => {
    const x = padL + slot * i + slot / 2;
    const barH = (p.value / max) * plotH;
    const y = height - padB - barH;
    ctx.fillStyle = p.highlight ? AMBER : TEAL;
    ctx.beginPath();
    ctx.roundRect(x - barW / 2, y, barW, barH, [3, 3, 0, 0]);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(formatValue(p.value), x, y - 8);
    ctx.fillStyle = MUTED;
    ctx.font = '11px system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.label), x, height - padB + 8);
    ctx.textBaseline = 'alphabetic';
  });
}

// Line chart with dots and a filled area underneath.
export function drawLineChart(canvas, points, formatValue) {
  const { ctx, width, height } = setupCanvas(canvas, 240);
  const padL = 48, padR = 14, padT = 28, padB = 30;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = points.map((p) => p.value);
  const lo = Math.floor(Math.min(...values) - 0.5);
  const hi = Math.ceil(Math.max(...values) + 0.5);
  const ticks = [lo, (lo + hi) / 2, hi].map((t) => t.toFixed(1));
  drawAxes(ctx, padL, height - padB, width - padR, padT, ticks, lo, hi);
  const xAt = (i) => padL + (i / (points.length - 1)) * plotW;
  const yAt = (v) => height - padB - ((v - lo) / (hi - lo)) * plotH;
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(p.value)) : ctx.lineTo(xAt(i), yAt(p.value))));
  ctx.strokeStyle = TEAL_SOFT;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.lineTo(xAt(points.length - 1), height - padB);
  ctx.lineTo(xAt(0), height - padB);
  ctx.closePath();
  ctx.fillStyle = 'rgba(23, 131, 124, 0.12)';
  ctx.fill();
  ctx.textAlign = 'center';
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(p.value), 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = TEAL;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(formatValue(p.value), xAt(i), yAt(p.value) - 10);
    ctx.fillStyle = MUTED;
    ctx.font = '11px system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.label), xAt(i), height - padB + 8);
    ctx.textBaseline = 'alphabetic';
  });
}

// Horizontal bars, one row per item, with the value at the end of the bar.
export function drawHBarChart(canvas, rows, formatValue) {
  const rowH = 34;
  const { ctx, width, height } = setupCanvas(canvas, rows.length * rowH + 16);
  const padL = 130, padR = 64, padT = 8;
  const plotW = width - padL - padR;
  const max = niceMax(Math.max(...rows.map((r) => r.value)));
  ctx.font = '12px system-ui, sans-serif';
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(r.label, padL - 10, y + 12);
    const barW = (r.value / max) * plotW;
    ctx.fillStyle = r.highlight ? AMBER : TEAL;
    ctx.beginPath();
    ctx.roundRect(padL, y, Math.max(2, barW), 22, [0, 3, 3, 0]);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(formatValue(r.value), padL + barW + 8, y + 12);
    ctx.font = '12px system-ui, sans-serif';
  });
}

// A simple donut: one filled slice per segment, with a centre label.
export function drawDonut(canvas, segments, centreLabel) {
  const size = 190;
  const { ctx, width } = setupCanvas(canvas, size);
  const cx = width / 2;
  const cy = size / 2;
  const radius = 78;
  const inner = 52;
  let angle = -Math.PI / 2;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  for (const seg of segments) {
    const sweep = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    angle += sweep;
  }
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = '#fbf9f4';
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = 'bold 15px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(centreLabel, cx, cy);
}
