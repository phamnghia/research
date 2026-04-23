import type { ReportGraphModel } from '../data/reportGraphModel';

function escMermaidLabel(s: string): string {
  return s.replace(/"/g, "'");
}

function pillarMid(model: ReportGraphModel, id: string): string {
  return model.pillarMermaidIds[id] ?? id.replace(/[^a-zA-Z0-9_]/g, '_');
}

export function buildReportGraphMermaidChart(
  model: ReportGraphModel,
  variant: 'overview' | 'pillar',
  activePillarId?: string,
): string {
  const O = model.overviewMermaidId;
  const lines: string[] = ['flowchart TB', `  ${O}(["${escMermaidLabel(model.overview.shortTitle)}"])`];

  for (const p of model.pillars) {
    lines.push(`  ${pillarMid(model, p.id)}["${escMermaidLabel(p.shortTitle)}"]`);
  }

  const pillarMids = model.pillars.map((p) => pillarMid(model, p.id));
  lines.push(`  ${O} --> ${pillarMids.join(' & ')}`);

  const edgeOp = variant === 'overview' ? '-->' : '-.->';
  for (const e of model.edges) {
    lines.push(
      `  ${pillarMid(model, e.from)} ${edgeOp}|${escMermaidLabel(e.label)}| ${pillarMid(model, e.to)}`,
    );
  }

  if (variant === 'pillar' && activePillarId) {
    lines.push('classDef rkgActive stroke-width:3px,stroke:#58a6ff');
    lines.push(`class ${pillarMid(model, activePillarId)} rkgActive`);
  }

  lines.push(
    `click ${O} "${model.overview.href}" "${escMermaidLabel(model.overview.fullTitle)}"`,
  );
  for (const p of model.pillars) {
    lines.push(`click ${pillarMid(model, p.id)} "${p.href}" "${escMermaidLabel(p.fullTitle)}"`);
  }

  return lines.join('\n');
}
