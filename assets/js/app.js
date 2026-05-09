'use strict';

const STORAGE_KEY = 'hibachi-tip-splitter-v1';
const DEFAULT_ROLES = [
  { id: 'chef', pct: 40, color: '#9C2E14', builtin: true },
  { id: 'server', pct: 50, color: '#B5701F', builtin: true },
  { id: 'helper', pct: 10, color: '#4F6B43', builtin: true },
];
const ROLE_COLORS = ['#9C2E14', '#B5701F', '#4F6B43', '#3F6F8F', '#7A4E8A', '#2F7D69', '#8A5A44', '#5E6482'];

/* ---------- i18n ---------- */
const I18N = {
  en: {
    htmlLang: 'en',
    locale: undefined, // browser default
    appTitle: 'Tip Splitter',
    subtitle: 'Hibachi · Chef 40% · Server 50% · Helper 10%',
    subtitlePrefix: 'Hibachi',
    tipsTodayLabel: 'Tips collected today',
    tablesUnit: 'tables',
    earningUnit: 'people earning',
    staffHeading: 'Staff',
    staffHint: 'Add once · stays saved',
    namePlaceholder: 'Name',
    chef: 'Chef',
    server: 'Server',
    helper: 'Helper',
    chefRoleLabel: 'Chefs',
    serverRoleLabel: 'Servers',
    helperRoleLabel: 'Helpers',
    addBtn: '+ Add',
    noStaff: 'No staff yet. Add chefs, servers, and helpers above.',
    tablesHeading: 'Tables',
    newTableBtn: '+ New Table',
    noTables: 'No tables yet. Tap "New Table" to add one.',
    tableLabelPrefix: 'Table',
    assignHint: 'Tap names below to assign staff to this table',
    payoutHeading: 'End-of-Day Payout',
    payoutHint: 'Auto-calculated',
    noPayouts: 'No payouts yet. Add tables with tips and assign staff.',
    distributedOf: (a, b) => `${a} distributed of ${b}`,
    allAccounted: '✓ all tips accounted for',
    unallocatedMeta: amt => `⚠ ${amt} unallocated`,
    unallocatedInline: amt => `⚠ ${amt} unallocated`,
    redistributeLabel: 'Redistribute when a role is missing',
    redistributeDesc: 'If a table has no helper, the 10% redistributes proportionally to chef & server. Turn off to flag unallocated amounts instead.',
    editRolesBtn: 'Edit roles',
    doneRolesBtn: 'Done',
    rolesSettingsLabel: 'Roles & percentages',
    rolesSettingsDesc: 'Edit role names and tip weights. Add custom roles for your restaurant.',
    rolePctTotal: pct => `Total ${pct}%`,
    newRoleNamePlaceholder: 'New role',
    newRolePctPlaceholder: '%',
    addRoleBtn: '+ Add role',
    copyBtn: '📋 Copy summary',
    printBtn: '🖨 Print',
    resetBtn: 'Reset day',
    confirmRemoveStaff: name => `Remove ${name}? They will be unassigned from all tables.`,
    confirmDeleteTable: label => `Delete ${label || 'this table'}?`,
    confirmResetDay: 'Clear all tables for the day? Staff list stays.',
    toastDuplicate: (name, role) => `${name} is already added as ${role}`,
    toastRoleExists: role => `${role} already exists`,
    toastNeedRoleName: 'Enter a role name',
    toastCannotRemoveRole: role => `Remove staff from ${role} before deleting this role`,
    toastNoTablesReset: 'No tables to reset',
    toastDayReset: 'Day reset · staff kept',
    toastCopied: 'Summary copied to clipboard',
    toastCopyShort: 'Summary copied',
    toastCopyFailed: 'Copy failed — long-press to select',
    splitFmt: (count, role, amount) => count > 1
      ? `${count} ${role}s · ${amount} each`
      : `${count} ${role} · ${amount}`,
    noRoleStaff: role => `No ${role}s yet — add some above`,
    summaryHeader: date => `HIBACHI TIP PAYOUT — ${date}`,
    summaryTotal: (tips, count) => `Total tips: ${tips} across ${count} tables`,
    summarySectionTitle: roleName => `-- ${roleName.toUpperCase()}S --`,
    summaryUnalloc: amt => `Unallocated: ${amt}`,
    printAppTitle: 'Hibachi Tip Payout',
    printTablesHeading: 'Tables',
    printPayoutHeading: 'End-of-Day Payout',
    printColTable: 'Table',
    printColTip: 'Tip',
    printColChef: 'Chef',
    printColServer: 'Server',
    printColHelper: 'Helper',
    printNone: '—',
    printMetaTables: n => `${n} tables`,
    printMetaPeople: n => `${n} people`,
    printDistributedFooter: (a, b) => `Distributed: ${a} of ${b}`,
    printAllAccounted: 'All tips accounted for',
    printUnallocFooter: amt => `Unallocated: ${amt}`,
    printEmpty: 'No tables to print yet.',
    dateOpts: { weekday: 'long', month: 'long', day: 'numeric' },
    fullDateOpts: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  },
  zh: {
    htmlLang: 'zh',
    locale: 'zh-CN',
    appTitle: '小费分配',
    subtitle: '铁板烧 · 厨师 40% · 服务员 50% · 助手 10%',
    subtitlePrefix: '铁板烧',
    tipsTodayLabel: '今日小费总额',
    tablesUnit: '桌',
    earningUnit: '人参与分配',
    staffHeading: '员工',
    staffHint: '添加一次 · 永久保存',
    namePlaceholder: '姓名',
    chef: '厨师',
    server: '服务员',
    helper: '助手',
    chefRoleLabel: '厨师',
    serverRoleLabel: '服务员',
    helperRoleLabel: '助手',
    addBtn: '+ 添加',
    noStaff: '还没有员工。请在上方添加厨师、服务员和助手。',
    tablesHeading: '桌台',
    newTableBtn: '+ 新增桌台',
    noTables: '还没有桌台。点击"新增桌台"开始记录。',
    tableLabelPrefix: '桌台',
    assignHint: '点击下方姓名将员工添加到此桌',
    payoutHeading: '今日小费分配',
    payoutHint: '自动计算',
    noPayouts: '暂无分配。请添加桌台、输入小费并指派员工。',
    distributedOf: (a, b) => `已分配 ${a}，共 ${b}`,
    allAccounted: '✓ 全部小费已分配',
    unallocatedMeta: amt => `⚠ ${amt} 未分配`,
    unallocatedInline: amt => `⚠ 未分配 ${amt}`,
    redistributeLabel: '缺少角色时按比例重分',
    redistributeDesc: '若桌台没有助手，10% 会按比例分给厨师和服务员。关闭则会标记未分配金额。',
    editRolesBtn: '编辑角色',
    doneRolesBtn: '完成',
    rolesSettingsLabel: '角色与百分比',
    rolesSettingsDesc: '可编辑角色名称和小费权重，也可添加自定义角色。',
    rolePctTotal: pct => `合计 ${pct}%`,
    newRoleNamePlaceholder: '新角色',
    newRolePctPlaceholder: '%',
    addRoleBtn: '+ 添加角色',
    copyBtn: '📋 复制总结',
    printBtn: '🖨 打印',
    resetBtn: '重置当日',
    confirmRemoveStaff: name => `移除 ${name}？将从所有桌台中取消其指派。`,
    confirmDeleteTable: label => `删除 ${label || '此桌台'}？`,
    confirmResetDay: '清除当日所有桌台？员工列表保留。',
    toastDuplicate: (name, role) => `${name} 已添加为${role}`,
    toastRoleExists: role => `${role} 已存在`,
    toastNeedRoleName: '请输入角色名称',
    toastCannotRemoveRole: role => `请先移除${role}员工，再删除此角色`,
    toastNoTablesReset: '没有桌台可重置',
    toastDayReset: '已重置 · 员工保留',
    toastCopied: '总结已复制到剪贴板',
    toastCopyShort: '总结已复制',
    toastCopyFailed: '复制失败 — 请长按选择',
    splitFmt: (count, role, amount) => count > 1
      ? `${count} 位${role} · 每人 ${amount}`
      : `${count} 位${role} · ${amount}`,
    noRoleStaff: role => `还没有${role} — 请在上方添加`,
    summaryHeader: date => `铁板烧小费分配 — ${date}`,
    summaryTotal: (tips, count) => `小费总额：${tips}，共 ${count} 桌`,
    summarySectionTitle: roleName => `—— ${roleName} ——`,
    summaryUnalloc: amt => `未分配：${amt}`,
    printAppTitle: '铁板烧小费分配',
    printTablesHeading: '桌台明细',
    printPayoutHeading: '当日小费分配',
    printColTable: '桌台',
    printColTip: '小费',
    printColChef: '厨师',
    printColServer: '服务员',
    printColHelper: '助手',
    printNone: '—',
    printMetaTables: n => `${n} 桌`,
    printMetaPeople: n => `${n} 人`,
    printDistributedFooter: (a, b) => `已分配：${a}，共 ${b}`,
    printAllAccounted: '全部小费已分配',
    printUnallocFooter: amt => `未分配：${amt}`,
    printEmpty: '暂无可打印的桌台。',
    dateOpts: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
    fullDateOpts: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  },
};

let lang = 'zh';
function t(key, ...args) {
  const dict = I18N[lang];
  const v = dict[key];
  if (typeof v === 'function') return v(...args);
  return v != null ? v : key;
}
function tRole(role) {
  const def = getRole(role);
  if (def?.builtin && I18N[lang][role]) return I18N[lang][role];
  return def?.name || role;
}
function tRoleLabel(role) {
  const def = getRole(role);
  if (def?.builtin && I18N[lang][role + 'RoleLabel']) return I18N[lang][role + 'RoleLabel'];
  return def?.name || role;
}

function freshDefaultRoles() {
  return DEFAULT_ROLES.map(r => ({ ...r }));
}

function normalizeRole(raw, index = 0) {
  const fallback = DEFAULT_ROLES[index] || DEFAULT_ROLES[0];
  const id = String(raw?.id || uid()).replace(/[^a-z0-9_-]/gi, '').toLowerCase() || uid();
  const pct = Math.max(0, Number(raw?.pct ?? fallback.pct) || 0);
  const color = /^#[0-9a-f]{6}$/i.test(raw?.color || '') ? raw.color : ROLE_COLORS[index % ROLE_COLORS.length];
  return {
    id,
    name: String(raw?.name || '').trim(),
    pct,
    color,
    builtin: Boolean(raw?.builtin || DEFAULT_ROLES.some(r => r.id === id)),
  };
}

function getRoles() {
  return state.roles;
}

function getRole(roleId) {
  return state.roles.find(r => r.id === roleId);
}

function roleColor(roleId) {
  return getRole(roleId)?.color || '#4A3F36';
}

function hexToRgba(hex, alpha) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return `rgba(74, 63, 54, ${alpha})`;
  return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${alpha})`;
}

function roleStyle(roleId) {
  const color = roleColor(roleId);
  return `style="--role-color:${escapeAttr(color)};--role-bg:${escapeAttr(hexToRgba(color, 0.12))};--role-border:${escapeAttr(hexToRgba(color, 0.28))}"`;
}

function roleRatios() {
  const total = getRoles().reduce((sum, r) => sum + Math.max(0, Number(r.pct) || 0), 0);
  const ratios = {};
  getRoles().forEach(r => { ratios[r.id] = total > 0 ? Math.max(0, Number(r.pct) || 0) / total : 0; });
  return ratios;
}

const state = {
  staff: [],
  tables: [],
  roles: freshDefaultRoles(),
  redistribute: true,
};
let rolesEditorOpen = false;

const uid = () => Math.random().toString(36).slice(2, 10);
const fmt = (n) => '$' + (Math.round(n * 100) / 100).toFixed(2);

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data.staff)) state.staff = data.staff;
      if (Array.isArray(data.tables)) state.tables = data.tables;
      if (Array.isArray(data.roles) && data.roles.length) state.roles = data.roles.map(normalizeRole);
      DEFAULT_ROLES.forEach((role, idx) => {
        if (!state.roles.some(r => r.id === role.id)) state.roles.splice(idx, 0, { ...role });
      });
      const validRoleIds = new Set(state.roles.map(r => r.id));
      state.staff.forEach(s => { if (!validRoleIds.has(s.role)) s.role = 'helper'; });
      if (typeof data.redistribute === 'boolean') state.redistribute = data.redistribute;
      if (data.lang === 'en' || data.lang === 'zh') lang = data.lang;
    }
  } catch (e) { console.warn('Load failed', e); }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      staff: state.staff,
      tables: state.tables,
      roles: state.roles,
      redistribute: state.redistribute,
      lang,
    }));
  } catch (e) { console.warn('Save failed', e); }
}

/* ---------- Calculation ---------- */

function tableAssignmentsByRole(table) {
  const assigned = {};
  getRoles().forEach(role => {
    assigned[role.id] = state.staff.filter(s => s.role === role.id && table.staffIds.includes(s.id));
  });
  return assigned;
}

function calcTableSplit(table) {
  const tip = parseFloat(table.tip) || 0;
  const assigned = tableAssignmentsByRole(table);
  const counts = {};
  getRoles().forEach(role => { counts[role.id] = assigned[role.id].length; });

  let ratios = roleRatios();

  if (state.redistribute) {
    const missingTotal = getRoles().filter(r => counts[r.id] === 0).reduce((a, r) => a + ratios[r.id], 0);
    const presentTotal = 1 - missingTotal;
    if (missingTotal > 0 && presentTotal > 0) {
      getRoles().forEach(r => {
        if (counts[r.id] === 0) ratios[r.id] = 0;
        else ratios[r.id] = ratios[r.id] + (ratios[r.id] / presentTotal) * missingTotal;
      });
    } else {
      getRoles().forEach(r => { if (counts[r.id] === 0) ratios[r.id] = 0; });
    }
  } else {
    getRoles().forEach(r => { if (counts[r.id] === 0) ratios[r.id] = 0; });
  }

  const pools = {};
  getRoles().forEach(r => { pools[r.id] = tip * ratios[r.id]; });

  const perPerson = {};
  getRoles().forEach(r => {
    if (counts[r.id] > 0) {
      const each = pools[r.id] / counts[r.id];
      assigned[r.id].forEach(s => {
        perPerson[s.id] = (perPerson[s.id] || 0) + each;
      });
    }
  });

  const allocated = Object.values(pools).reduce((a, v) => a + v, 0);
  const unallocated = Math.max(0, tip - allocated);

  return { tip, pools, perPerson, counts, assigned, unallocated };
}

function calcDaily() {
  const totals = {};
  let totalTips = 0;
  let totalUnalloc = 0;
  state.tables.forEach(t => {
    const s = calcTableSplit(t);
    totalTips += s.tip;
    totalUnalloc += s.unallocated;
    Object.entries(s.perPerson).forEach(([id, amt]) => {
      totals[id] = (totals[id] || 0) + amt;
    });
  });
  return { totals, totalTips, totalUnalloc };
}

/* ---------- Rendering ---------- */

function renderDate() {
  const d = new Date();
  const opts = I18N[lang].dateOpts;
  const locale = I18N[lang].locale;
  document.getElementById('dateBadge').textContent = d.toLocaleDateString(locale, opts);
}

function renderHeader() {
  const { totalTips, totals } = calcDaily();
  document.getElementById('totalAmount').textContent = fmt(totalTips);
  document.getElementById('tableCount').textContent = state.tables.length;
  document.getElementById('staffWorking').textContent = Object.values(totals).filter(v => v > 0).length;
}

function renderSubtitle() {
  const split = getRoles().map(role => `${tRole(role.id)} ${Number(role.pct) || 0}%`).join(' · ');
  document.querySelector('.brand .sub').textContent = `${t('subtitlePrefix')} · ${split}`;
}

function renderStaff() {
  const list = document.getElementById('staffList');
  if (state.staff.length === 0) {
    list.innerHTML = `<div class="empty">${escapeHtml(t('noStaff'))}</div>`;
    return;
  }
  const order = Object.fromEntries(getRoles().map((r, i) => [r.id, i]));
  const sorted = [...state.staff].sort((a, b) =>
    (order[a.role] ?? 999) - (order[b.role] ?? 999) || a.name.localeCompare(b.name)
  );
  list.innerHTML = sorted.map(s => `
    <span class="staff-pill" ${roleStyle(s.role)}>
      <span class="role-tag">${escapeHtml(tRole(s.role))}</span>
      ${escapeHtml(s.name)}
      <button data-act="rmStaff" data-id="${s.id}" title="×">×</button>
    </span>
  `).join('');
}

function renderTables() {
  const wrap = document.getElementById('tablesList');
  if (state.tables.length === 0) {
    wrap.innerHTML = `<div class="empty">${escapeHtml(t('noTables'))}</div>`;
    return;
  }
  wrap.innerHTML = state.tables.map(table => {
    const split = calcTableSplit(table);
    const noStaffAssigned = table.staffIds.length === 0;
    return `
      <div class="table-card" data-id="${table.id}">
        <div class="table-row1">
          <input class="table-label" data-act="label" data-id="${table.id}"
                 value="${escapeAttr(table.label)}" placeholder="${escapeAttr(t('tableLabelPrefix'))}" maxlength="20">
          <div class="tip-input-wrap">
            <input class="tip-input" data-act="tip" data-id="${table.id}"
                   type="number" inputmode="decimal" min="0" step="0.01"
                   value="${table.tip}" placeholder="0.00">
          </div>
          <button class="btn-icon delete-table" data-act="rmTable" data-id="${table.id}" title="✕">✕</button>
        </div>
        ${noStaffAssigned && state.staff.length > 0 ? `<div class="assign-hint"><span class="arrow">👇</span><span>${escapeHtml(t('assignHint'))}</span></div>` : ''}
        ${getRoles().map(r => renderRoleSection(table, r.id)).join('')}
        ${parseFloat(table.tip) > 0 ? renderTableSplitSummary(split) : ''}
      </div>
    `;
  }).join('');
}

function renderRoleSection(table, role) {
  const staffOfRole = state.staff.filter(s => s.role === role);
  const pct = (getRole(role)?.pct || 0).toFixed(0) + '%';
  const chips = staffOfRole.length === 0
    ? `<div class="chip-empty">${escapeHtml(t('noRoleStaff', tRole(role)))}</div>`
    : staffOfRole.map(s => {
        const active = table.staffIds.includes(s.id);
        return `<button class="chip ${active ? 'active' : ''}" ${roleStyle(role)}
                  data-act="toggleStaff" data-table="${table.id}" data-staff="${s.id}">
                  ${escapeHtml(s.name)}
                </button>`;
      }).join('');
  return `
    <div class="role-section" ${roleStyle(role)}>
      <div class="role-label">${escapeHtml(tRoleLabel(role))} <span class="pct">${pct}</span></div>
      <div class="chip-group">${chips}</div>
    </div>
  `;
}

function renderTableSplitSummary(split) {
  const items = getRoles().map(r => {
    const c = split.counts[r.id];
    if (c === 0) return null;
    const each = split.pools[r.id] / c;
    const text = t('splitFmt', c, tRole(r.id), `<span class="amt">${fmt(each)}</span>`);
    return `<div class="item"><span class="dot" ${roleStyle(r.id)}></span>${text}</div>`;
  }).filter(Boolean);
  if (split.unallocated > 0.005) {
    items.push(`<div class="item warn">${escapeHtml(t('unallocatedInline', fmt(split.unallocated)))}</div>`);
  }
  return `<div class="table-split">${items.join('')}</div>`;
}

function renderSummary() {
  const { totals, totalTips, totalUnalloc } = calcDaily();
  const list = document.getElementById('summaryList');
  const meta = document.getElementById('summaryMeta');

  const earners = state.staff
    .filter(s => totals[s.id] > 0)
    .map(s => ({ ...s, amount: totals[s.id] }))
    .sort((a, b) => b.amount - a.amount);

  if (earners.length === 0) {
    list.innerHTML = `<div class="empty">${escapeHtml(t('noPayouts'))}</div>`;
    meta.innerHTML = '';
    return;
  }

  list.innerHTML = earners.map(s => `
    <div class="summary-row">
      <div class="person">
        <span class="role-dot" ${roleStyle(s.role)}></span>
        <div>
          <span class="name">${escapeHtml(s.name)}</span>
          <span class="role-text">${escapeHtml(tRole(s.role))}</span>
        </div>
      </div>
      <div class="amount">${fmt(s.amount)}</div>
    </div>
  `).join('');

  const distributed = earners.reduce((a, e) => a + e.amount, 0);
  let metaHtml = `<div class="check">${t('distributedOf', `<strong>${fmt(distributed)}</strong>`, fmt(totalTips))}</div>`;
  if (totalUnalloc > 0.005) {
    metaHtml += `<div class="check warn">${t('unallocatedMeta', `<strong>${fmt(totalUnalloc)}</strong>`)}</div>`;
  } else if (totalTips > 0) {
    metaHtml += `<div class="check">${escapeHtml(t('allAccounted'))}</div>`;
  }
  meta.innerHTML = metaHtml;
}

function renderRolePicker() {
  const picker = document.getElementById('rolePicker');
  const selected = document.querySelector('input[name="newRole"]:checked')?.value || getRoles()[0]?.id;
  picker.innerHTML = getRoles().map((role, idx) => {
    const id = `rolePick${idx}`;
    const checked = role.id === selected || (!getRole(selected) && idx === 0);
    return `
      <input type="radio" name="newRole" id="${id}" value="${escapeAttr(role.id)}" ${checked ? 'checked' : ''}>
      <label for="${id}" ${roleStyle(role.id)}>${escapeHtml(tRole(role.id))}</label>
    `;
  }).join('');
}

function renderRoleSettings() {
  const section = document.getElementById('rolesSettingsSection');
  const toggle = document.getElementById('toggleRolesBtn');
  section.hidden = !rolesEditorOpen;
  toggle.textContent = t(rolesEditorOpen ? 'doneRolesBtn' : 'editRolesBtn');
  const list = document.getElementById('roleSettingsList');
  const total = getRoles().reduce((sum, r) => sum + (Number(r.pct) || 0), 0);
  document.getElementById('rolePctTotal').textContent = t('rolePctTotal', total.toFixed(0));
  list.innerHTML = getRoles().map(role => {
    const canDelete = !role.builtin;
    return `
      <div class="role-setting-row" data-role-id="${escapeAttr(role.id)}">
        <div class="role-name-wrap">
          <span class="swatch" ${roleStyle(role.id)}></span>
          <input type="text" data-role-field="name" value="${escapeAttr(tRole(role.id))}" maxlength="24" ${role.builtin ? 'disabled' : ''}>
        </div>
        <div class="pct-field">
          <input type="number" data-role-field="pct" value="${escapeAttr(role.pct)}" min="0" max="100" step="1">
        </div>
        <button class="btn-icon" data-act="rmRole" data-id="${escapeAttr(role.id)}" title="×" ${canDelete ? '' : 'disabled'}>×</button>
      </div>
    `;
  }).join('');
}

function applyI18nStatic() {
  document.documentElement.lang = I18N[lang].htmlLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = I18N[lang][key];
    if (typeof val === 'string') el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = I18N[lang][key];
    if (typeof val === 'string') el.placeholder = val;
  });
  // Update lang toggle button states
  document.getElementById('langEn').classList.toggle('active', lang === 'en');
  document.getElementById('langZh').classList.toggle('active', lang === 'zh');
}

function renderAll() {
  applyI18nStatic();
  renderRolePicker();
  renderSubtitle();
  renderDate();
  renderHeader();
  renderStaff();
  renderTables();
  renderSummary();
  renderRoleSettings();
  document.getElementById('redistToggle').checked = state.redistribute;
}

/* ---------- Helpers ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

/* ---------- Analytics ---------- */
function analyticsEnabled() {
  return typeof window.gtag === 'function'
    && typeof window.GA_MEASUREMENT_ID === 'string'
    && !window.GA_MEASUREMENT_ID.includes('XXXXXXXX');
}

function analyticsSnapshot() {
  const { totals, totalUnalloc } = calcDaily();
  return {
    app_language: lang,
    table_count: state.tables.length,
    staff_count: state.staff.length,
    role_count: state.roles.length,
    earner_count: Object.values(totals).filter(v => v > 0).length,
    has_unallocated_tips: totalUnalloc > 0.005,
    redistribute_enabled: state.redistribute,
  };
}

function trackEvent(name, params = {}) {
  if (!analyticsEnabled()) return;
  window.gtag('event', name, {
    ...analyticsSnapshot(),
    ...params,
  });
}

/* ---------- Events ---------- */
document.getElementById('langEn').addEventListener('click', () => {
  lang = 'en';
  save();
  renderAll();
  trackEvent('language_change', { selected_language: lang });
});
document.getElementById('langZh').addEventListener('click', () => {
  lang = 'zh';
  save();
  renderAll();
  trackEvent('language_change', { selected_language: lang });
});

document.getElementById('addStaffBtn').addEventListener('click', () => {
  const nameEl = document.getElementById('staffName');
  const name = nameEl.value.trim();
  if (!name) { nameEl.focus(); return; }
  const role = document.querySelector('input[name="newRole"]:checked').value;
  if (state.staff.some(s => s.name.toLowerCase() === name.toLowerCase() && s.role === role)) {
    toast(t('toastDuplicate', name, tRole(role)));
    return;
  }
  state.staff.push({ id: uid(), name, role });
  nameEl.value = '';
  nameEl.focus();
  save();
  renderAll();
  trackEvent('staff_add', { role });
});

document.getElementById('staffName').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('addStaffBtn').click();
  }
});

document.getElementById('toggleRolesBtn').addEventListener('click', () => {
  rolesEditorOpen = !rolesEditorOpen;
  renderRoleSettings();
  trackEvent('roles_editor_toggle', { open: rolesEditorOpen });
});

document.getElementById('addTableBtn').addEventListener('click', () => {
  const num = state.tables.length + 1;
  state.tables.push({
    id: uid(),
    label: t('tableLabelPrefix') + ' ' + num,
    tip: '',
    staffIds: [],
  });
  save();
  renderAll();
  trackEvent('table_add');
  setTimeout(() => {
    const inputs = document.querySelectorAll('.tip-input');
    if (inputs.length) inputs[inputs.length - 1].focus();
  }, 50);
});

document.body.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const act = btn.dataset.act;

  if (act === 'rmRole') {
    const roleId = btn.dataset.id;
    const role = getRole(roleId);
    if (!role || role.builtin) return;
    if (state.staff.some(s => s.role === roleId)) {
      toast(t('toastCannotRemoveRole', tRole(roleId)));
      return;
    }
    state.roles = state.roles.filter(r => r.id !== roleId);
    save();
    renderAll();
    trackEvent('role_remove');
  }

  if (act === 'rmStaff') {
    const id = btn.dataset.id;
    const s = state.staff.find(x => x.id === id);
    if (!s) return;
    if (!confirm(t('confirmRemoveStaff', s.name))) return;
    state.staff = state.staff.filter(x => x.id !== id);
    state.tables.forEach(tbl => { tbl.staffIds = tbl.staffIds.filter(sid => sid !== id); });
    save();
    renderAll();
    trackEvent('staff_remove', { role: s.role });
  }

  if (act === 'rmTable') {
    const id = btn.dataset.id;
    const tbl = state.tables.find(x => x.id === id);
    if (!tbl) return;
    if (!confirm(t('confirmDeleteTable', tbl.label))) return;
    state.tables = state.tables.filter(x => x.id !== id);
    save();
    renderAll();
    trackEvent('table_remove');
  }

  if (act === 'toggleStaff') {
    const tableId = btn.dataset.table;
    const staffId = btn.dataset.staff;
    const tbl = state.tables.find(x => x.id === tableId);
    if (!tbl) return;
    const staff = state.staff.find(x => x.id === staffId);
    if (tbl.staffIds.includes(staffId)) {
      tbl.staffIds = tbl.staffIds.filter(s => s !== staffId);
      trackEvent('table_staff_toggle', { assigned: false, role: staff?.role || 'unknown' });
    } else {
      tbl.staffIds.push(staffId);
      trackEvent('table_staff_toggle', { assigned: true, role: staff?.role || 'unknown' });
    }
    save();
    renderAll();
  }
});

document.getElementById('roleSettingsList').addEventListener('input', (e) => {
  const field = e.target.closest('[data-role-field]');
  if (!field) return;
  const row = field.closest('[data-role-id]');
  const role = row ? getRole(row.dataset.roleId) : null;
  if (!role) return;
  if (field.dataset.roleField === 'name' && !role.builtin) role.name = field.value.trim();
  if (field.dataset.roleField === 'pct') role.pct = Math.max(0, Number(field.value) || 0);
  save();
  renderRolePicker();
  renderSubtitle();
  renderTables();
  renderSummary();
  const total = getRoles().reduce((sum, r) => sum + (Number(r.pct) || 0), 0);
  document.getElementById('rolePctTotal').textContent = t('rolePctTotal', total.toFixed(0));
});

document.getElementById('addRoleBtn').addEventListener('click', () => {
  const nameEl = document.getElementById('newRoleName');
  const pctEl = document.getElementById('newRolePct');
  const name = nameEl.value.trim();
  if (!name) { toast(t('toastNeedRoleName')); nameEl.focus(); return; }
  if (getRoles().some(r => tRole(r.id).toLowerCase() === name.toLowerCase())) {
    toast(t('toastRoleExists', name));
    return;
  }
  const id = `role_${uid()}`;
  state.roles.push({
    id,
    name,
    pct: Math.max(0, Number(pctEl.value) || 0),
    color: ROLE_COLORS[state.roles.length % ROLE_COLORS.length],
    builtin: false,
  });
  nameEl.value = '';
  pctEl.value = '';
  save();
  renderAll();
  trackEvent('role_add');
});

document.getElementById('newRoleName').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('addRoleBtn').click();
  }
});

document.body.addEventListener('input', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  const id = el.dataset.id;
  const tbl = state.tables.find(x => x.id === id);
  if (!tbl) return;

  if (act === 'label') {
    tbl.label = el.value;
    save();
    renderHeader();
  }
  if (act === 'tip') {
    tbl.tip = el.value;
    save();
    renderHeader();
    renderSummary();
    const card = el.closest('.table-card');
    if (card) {
      const split = calcTableSplit(tbl);
      const existing = card.querySelector('.table-split');
      const html = parseFloat(tbl.tip) > 0 ? renderTableSplitSummary(split) : '';
      if (existing) existing.outerHTML = html;
      else if (html) card.insertAdjacentHTML('beforeend', html);
    }
  }
});

document.getElementById('redistToggle').addEventListener('change', (e) => {
  state.redistribute = e.target.checked;
  save();
  renderAll();
  trackEvent('redistribute_toggle', { enabled: state.redistribute });
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (state.tables.length === 0) { toast(t('toastNoTablesReset')); return; }
  if (!confirm(t('confirmResetDay'))) return;
  const resetTableCount = state.tables.length;
  state.tables = [];
  save();
  renderAll();
  toast(t('toastDayReset'));
  trackEvent('day_reset', { reset_table_count: resetTableCount });
});

document.getElementById('copyBtn').addEventListener('click', async () => {
  const text = buildSummaryText();
  try {
    await navigator.clipboard.writeText(text);
    toast(t('toastCopied'));
    trackEvent('summary_copy', { success: true });
  } catch (err) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      toast(t('toastCopyShort'));
      trackEvent('summary_copy', { success: true, fallback: true });
    }
    catch (e) {
      toast(t('toastCopyFailed'));
      trackEvent('summary_copy', { success: false, fallback: true });
    }
    document.body.removeChild(ta);
  }
});

document.getElementById('printBtn').addEventListener('click', () => {
  renderPrintArea();
  trackEvent('summary_print');
  // Give the browser a tick to apply the print DOM, then open the print dialog
  setTimeout(() => window.print(), 50);
});

function renderPrintArea() {
  const area = document.getElementById('printArea');
  const { totals, totalTips, totalUnalloc } = calcDaily();
  const d = new Date();
  const dateStr = d.toLocaleDateString(I18N[lang].locale, I18N[lang].fullDateOpts);

  // Reuse the same logo source in the print view.
  const logoSrc = document.querySelector('.brand-mark img')?.src || '';

  if (state.tables.length === 0) {
    area.innerHTML = `
      <div class="print-sheet">
        <div class="print-head">
          ${logoSrc ? `<img src="${logoSrc}" alt="">` : ''}
          <div class="titles">
            <h1>${escapeHtml(t('printAppTitle'))}</h1>
            <div class="date">${escapeHtml(dateStr)}</div>
          </div>
        </div>
        <div class="print-empty">${escapeHtml(t('printEmpty'))}</div>
      </div>
    `;
    return;
  }

  // Build tables rows
  const tableRows = state.tables.map(table => {
    const assigned = tableAssignmentsByRole(table);
    const cellFor = role => {
      const names = assigned[role].map(s => escapeHtml(s.name)).join(', ');
      return names || `<span class="empty-cell">${escapeHtml(t('printNone'))}</span>`;
    };
    return `
      <tr>
        <td class="label-col">${escapeHtml(table.label || '')}</td>
        <td class="num">${fmt(parseFloat(table.tip) || 0)}</td>
        ${getRoles().map(role => `<td class="role-cell">${cellFor(role.id)}</td>`).join('')}
      </tr>
    `;
  }).join('');
  const roleHeadings = getRoles().map(role => `<th>${escapeHtml(tRoleLabel(role.id))}</th>`).join('');

  // Build payout groups by role
  const earners = state.staff
    .filter(s => totals[s.id] > 0)
    .map(s => ({ ...s, amount: totals[s.id] }))
    .sort((a, b) => b.amount - a.amount);

  const payoutGroups = getRoles().map(role => {
    const grp = earners.filter(e => e.role === role.id);
    if (grp.length === 0) return '';
    const rows = grp.map(e => `
      <div class="print-payout-row">
        <span class="name">${escapeHtml(e.name)}</span>
        <span class="amt">${fmt(e.amount)}</span>
      </div>
    `).join('');
    return `
      <div class="print-payout-group">
        <h3>${escapeHtml(tRoleLabel(role.id))}</h3>
        ${rows}
      </div>
    `;
  }).filter(Boolean).join('');

  // Footer line
  const distributed = earners.reduce((a, e) => a + e.amount, 0);
  const footerLeft = totalUnalloc > 0.005
    ? `<span class="check">${t('printUnallocFooter', `<strong>${fmt(totalUnalloc)}</strong>`)}</span>`
    : `<span class="check">${escapeHtml(t('printAllAccounted'))} ✓</span>`;
  const footerRight = `<span class="check">${t('printDistributedFooter', `<strong>${fmt(distributed)}</strong>`, `<strong>${fmt(totalTips)}</strong>`)}</span>`;

  area.innerHTML = `
    <div class="print-sheet">
      <div class="print-head">
        ${logoSrc ? `<img src="${logoSrc}" alt="">` : ''}
        <div class="titles">
          <h1>${escapeHtml(t('printAppTitle'))}</h1>
          <div class="date">${escapeHtml(dateStr)}</div>
        </div>
        <div class="meta">
          <div class="tot">${fmt(totalTips)}</div>
          <div>${escapeHtml(t('printMetaTables', state.tables.length))} · ${escapeHtml(t('printMetaPeople', earners.length))}</div>
        </div>
      </div>

      <div class="print-section">
        <h2>${escapeHtml(t('printTablesHeading'))}</h2>
        <table class="print-tables">
          <thead>
            <tr>
              <th>${escapeHtml(t('printColTable'))}</th>
              <th>${escapeHtml(t('printColTip'))}</th>
              ${roleHeadings}
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>

      <div class="print-section">
        <h2>${escapeHtml(t('printPayoutHeading'))}</h2>
        <div class="print-payout-grid">${payoutGroups}</div>
      </div>

      <div class="print-footer">
        ${footerLeft}
        ${footerRight}
      </div>
    </div>
  `;
}

function buildSummaryText() {
  const { totals, totalTips, totalUnalloc } = calcDaily();
  const d = new Date();
  const dateStr = d.toLocaleDateString(I18N[lang].locale, I18N[lang].fullDateOpts);
  const lines = [];
  lines.push(t('summaryHeader', dateStr));
  lines.push(t('summaryTotal', fmt(totalTips), state.tables.length));
  lines.push('');
  const earners = state.staff
    .filter(s => totals[s.id] > 0)
    .map(s => ({ ...s, amount: totals[s.id] }))
    .sort((a, b) => b.amount - a.amount);
  getRoles().forEach(role => {
    const grp = earners.filter(e => e.role === role.id);
    if (grp.length === 0) return;
    lines.push(t('summarySectionTitle', tRoleLabel(role.id)));
    grp.forEach(e => lines.push(`  ${e.name.padEnd(20)} ${fmt(e.amount)}`));
    lines.push('');
  });
  if (totalUnalloc > 0.005) {
    lines.push(t('summaryUnalloc', fmt(totalUnalloc)));
  }
  return lines.join('\n');
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Init ---------- */
load();
renderAll();
trackEvent('app_ready');
