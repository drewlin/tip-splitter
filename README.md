# Tip Splitter · 小费分配

A simple, bilingual web app for splitting hibachi restaurant tips fairly among chefs, servers, and helpers at the end of each shift. Runs entirely in the browser — no server, no account, no fees.

[English](#english) · [中文说明](#中文说明)

---

## English

### What it does

Splits each table's tip among the staff who worked it, using a fixed ratio:

- **Chef** — 40%
- **Server** — 50%
- **Helper** — 10%

If multiple chefs (or servers, or helpers) worked the same table, that role's share is divided equally among them. At the end of the day, the app shows each person's total payout.

### Live app

👉 **https://YOUR-USERNAME.github.io/tip-splitter/**

*(Replace with your actual GitHub Pages URL once it's live.)*

### How to use it

1. **Add staff** once — type a name, pick Chef / Server / Helper, hit **+ Add**. Staff stays saved between days.
2. **Add a table** — tap **+ New Table**, enter the tip amount, then tap the chips for everyone who worked that table.
3. **See the split live** — each table shows its own breakdown right below.
4. **End of day** — scroll to **End-of-Day Payout** for every person's total. Tap **Copy summary** to paste into a message, or **Print** for paper.
5. **Reset day** — clears tables for the next shift; staff list stays.

### Add to home screen (use it like an app)

**iPhone (Safari):** Open the link → Share button → **Add to Home Screen** → Add.

**Android (Chrome):** Open the link → ⋮ menu → **Add to Home screen** → Add.

### Features

- Bilingual interface — toggle EN / 中 in the top right
- Works offline once loaded
- Data saves automatically in the browser
- Print-friendly summary view
- Handles missing roles — if a table has no helper, the 10% redistributes proportionally to chef and server (toggleable in settings)
- Mobile-first design, also works on tablets and desktop

### How the math works

For each table:

```
chef pool     = tip × 40%
server pool   = tip × 50%
helper pool   = tip × 10%

each chef gets    = chef pool   ÷ number of chefs on the table
each server gets  = server pool ÷ number of servers on the table
each helper gets  = helper pool ÷ number of helpers on the table
```

Each person's daily total is the sum of their shares across every table they worked.

**If a role is empty on a table** (e.g. no helper assigned), its share by default redistributes to the present roles in proportion to their original ratios. So with no helper, the chef gets 40/90 of the helper's 10%, and the server gets 50/90 of it. You can turn this off in settings to flag the unallocated amount instead.

### Privacy

All data — staff names, tables, tips — lives only in the browser's local storage on the device using it. Nothing is sent to a server. Each phone, tablet, or computer has its own separate data.

This means:
- Different devices won't share data with each other
- Clearing browser data for the site will erase everything
- The owner of the device controls all the data

### Hosting your own copy

This is a single static HTML file. To self-host:

1. Download `index.html`
2. Host it anywhere static — GitHub Pages, Netlify, Cloudflare Pages, or even a USB stick
3. Open the file in any modern browser

No build step, no dependencies, no server.

### Credits

Logo provided by the restaurant owner. Built with [Claude](https://claude.ai).

---

## 中文说明

### 这是什么

一个为铁板烧餐厅设计的小费分配工具，按固定比例把每桌的小费分给当桌服务的厨师、服务员和助手：

- **厨师** — 40%
- **服务员** — 50%
- **助手** — 10%

若一桌有多位厨师（或服务员、助手）一起服务，该角色的金额会在他们之间平均分配。当日结束时，应用会显示每个人的总收入。

### 在线使用

👉 **https://YOUR-USERNAME.github.io/tip-splitter/**

*（请替换为你的实际 GitHub Pages 网址。）*

### 使用步骤

1. **添加员工**（一次即可）— 输入姓名，选择厨师 / 服务员 / 助手，点击 **+ 添加**。员工列表会自动保存，无需每天重新添加。
2. **新增桌台** — 点击 **+ 新增桌台**，输入小费金额，再点击当桌服务的员工标签。
3. **实时查看分配** — 每张桌台下方会立即显示该桌的分配情况。
4. **当日结算** — 滚动到 **今日小费分配**，查看每位员工的总金额。点击 **复制总结** 可粘贴到微信或短信中，点击 **打印** 可打印纸质版。
5. **重置当日** — 清空当日桌台记录，准备下一天。员工列表保留。

### 添加到主屏幕（像 App 一样使用）

**iPhone（Safari）：** 打开链接 → 点击分享按钮 → **添加到主屏幕** → 添加。

**Android（Chrome）：** 打开链接 → ⋮ 菜单 → **添加到主屏幕** → 添加。

### 功能特点

- 中英双语界面 — 右上角点击 EN / 中 切换
- 加载后可离线使用
- 数据自动保存在浏览器中
- 支持打印小费总结
- 缺少角色时自动重分 — 若某桌没有助手，10% 会按比例分给厨师和服务员（设置中可关闭）
- 优先适配手机，平板和电脑也可使用

### 计算方式

每张桌台：

```
厨师池    = 小费 × 40%
服务员池  = 小费 × 50%
助手池    = 小费 × 10%

每位厨师所得    = 厨师池   ÷ 当桌厨师人数
每位服务员所得  = 服务员池 ÷ 当桌服务员人数
每位助手所得    = 助手池   ÷ 当桌助手人数
```

每个人的当日总收入 = 他/她在所有参与桌台的所得之和。

**当某角色在桌台中缺席时**（例如没有助手），默认会把该角色的份额按原比例分给在场的角色。例如没有助手时，厨师获得助手 10% 中的 40/90，服务员获得 50/90。可在设置中关闭此功能，将未分配金额单独标记。

### 隐私

所有数据 — 员工姓名、桌台记录、小费金额 — 仅保存在使用应用的设备浏览器本地存储中。不会上传到任何服务器。每台手机、平板或电脑有各自独立的数据。

这意味着：
- 不同设备之间不会共享数据
- 清除浏览器数据会清空所有记录
- 设备所有者完全掌控数据

### 自行部署

这是一个独立的静态 HTML 文件。如需自行托管：

1. 下载 `index.html`
2. 上传至任何静态托管服务 — GitHub Pages、Netlify、Cloudflare Pages 均可
3. 用任意现代浏览器打开即可

无需编译，无依赖，无后端。

### 致谢

Logo 由餐厅所有者提供。本应用由 [Claude](https://claude.ai) 协助构建。
