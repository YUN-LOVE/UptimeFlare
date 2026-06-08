// This is a simplified example config file for quickstart
// Some not frequently used features are omitted/commented out here
// For a full-featured example, please refer to `uptime.config.full.ts`

// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "YUN-LOVE 的状态页",
  links: [
    { link: 'https://github.com/YUN-LOVE', label: 'GitHub' },
    { link: 'https://blog.031312.xyz/', label: '博客' },
  ],
}

const workerConfig: WorkerConfig = {
  monitors: [
    {
      id: 'blog',
      name: '博客',
      method: 'HEAD',
      target: 'https://blog.031312.xyz/',
      statusPageLink: 'https://blog.031312.xyz/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'OpenList',
      name: 'OpenList（lg）',
      method: 'GET',
      target: 'https://lg.031312.xyz:5225/',
      statusPageLink: 'https://lg.031312.xyz:5225/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'eo_umami',
      name: 'Umami（EdgeOne Pages）',
      method: 'HEAD',
      target: 'https://umami.031312.xyz/',
      statusPageLink: 'https://umami.031312.xyz/share/V4876OwqxIo2vSbe',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 15000,
    },
    {
      id: 'onedrive_index',
      name: 'OneDrive 公开只读（Vercel）',
      method: 'HEAD',
      target: 'https://one.031312.xyz/',
      statusPageLink: 'https://one.031312.xyz/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'lg_matrix_livekit',
      name: 'lg matrix livekit',
      method: 'TCP_PING',
      target: 'lg.031312.xyz:7881',
      timeout: 5000,
    },
    {
      id: 'lg_matrix',
      name: 'matrix服务器',
      method: 'HEAD',
      target: 'https://lg.031312.xyz:4224/',
      statusPageLink: 'https://lg.031312.xyz:4224/',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'lg_ssh',
      name: 'lg SSH',
      method: 'TCP_PING',
      target: 'lg.031312.xyz:22',
      timeout: 5000,
    }
  ],
  notification: {
    timeZone: 'Asia/Shanghai',
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // ========== 1. 配置区 ==========
      const WEBHOOK_URL = env.WEBHOOK_URL || "https://push.031312.xyz/api/push/y8Vo5RcCHRAIiwM8";
      const GRACE_PERIOD_MINUTES = 5;
      const DEFAULT_TO = "YUN-LOVE@031312.xyz";
      const DEFAULT_FROM = "UptimeFlare 监控";
      const MAX_TEXT_LENGTH = 5000;
      let kvKey = "";
      
      // ---------- 强化清洗函数：删除所有控制字符，保留可见字符 ----------
      function sanitizeString(str: string): string {
        if (!str) return '';
        // 1. 删除 ASCII 控制字符（0x00-0x1F, 0x7F），替换为空格
        let cleaned = str.replace(/[\x00-\x1F\x7F]/g, ' ');
        // 2. 删除 Unicode 控制字符（包括零宽字符、方向控制、行分隔符等）
        cleaned = cleaned.replace(/[\p{C}]/gu, ' ');
        // 3. 合并连续空白（包括多个空格、换行、制表等）为一个空格
        cleaned = cleaned.replace(/\s+/g, ' ');
        // 4. HTML 转义（防止注入）
        cleaned = cleaned.replace(/[&<>]/g, (m) => {
          if (m === '&') return '&amp;';
          if (m === '<') return '&lt;';
          if (m === '>') return '&gt;';
          return m;
        });
        return cleaned.trim();
      }
      // ------------------------------

      const safeMonitorName = sanitizeString(monitor.name);
      const safeReason = sanitizeString(reason);
      const statusText = isUp ? '✅ 恢复正常 (UP)' : '❌ 服务中断 (DOWN)';
      const timeString = new Date(timeNow * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

      // 宽限期检查（仅对 DOWN 生效）
      let shouldSkip = false;
      if (!isUp && GRACE_PERIOD_MINUTES > 0 && env.ALERT_KV) {
        kvKey = `webhook_alert_${monitor.id}`;
        let lastRecord = null;
        try {
          const raw = await env.ALERT_KV.get(kvKey);
          if (raw) lastRecord = JSON.parse(raw);
        } catch (e) {
          console.error(`KV 读取失败: ${e}`);
        }
        const lastTime = lastRecord?.time || 0;
        const minutesSinceLast = (Date.now() - lastTime) / 1000 / 60;
        if (lastRecord?.status === 'DOWN' && minutesSinceLast < GRACE_PERIOD_MINUTES) {
          console.log(`[跳过] ${monitor.name} DOWN 告警被抑制 (距离上次 ${minutesSinceLast.toFixed(1)} 分钟)`);
          shouldSkip = true;
        }
      }
      if (shouldSkip) return;

      let detailText = `监控名称: ${safeMonitorName} 时间: ${timeString} 原因: ${safeReason}`;
      if (detailText.length > MAX_TEXT_LENGTH) {
        detailText = detailText.substring(0, MAX_TEXT_LENGTH) + '…(内容过长已截断)';
      }

      const payload = {
        subject: `[${statusText}] ${safeMonitorName}`,
        to: DEFAULT_TO,
        from: DEFAULT_FROM,
        text: detailText,
      };

      console.log("发送 Webhook payload:", JSON.stringify(payload, null, 2));

      try {
        const resp = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) {
          const errText = await resp.text();
          console.error(`Webhook 发送失败 (${resp.status}): ${errText}`);
        } else {
          console.log(`Webhook 发送成功: ${monitor.name} -> ${statusText}`);
          if (!isUp && GRACE_PERIOD_MINUTES > 0 && env.ALERT_KV) {
            await env.ALERT_KV.put(kvKey, JSON.stringify({
              status: 'DOWN',
              time: Date.now(),
            }));
          }
        }
      } catch (err: any) {
        console.error(`Webhook 请求异常: ${err.message}`);
      }
    },
    onIncident: async (env, monitor, timeIncidentStart, timeNow, reason) => {
      // 空实现
    },
  },
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }
