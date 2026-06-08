// This is a simplified example config file for quickstart
// Some not frequently used features are omitted/commented out here
// For a full-featured example, please refer to `uptime.config.full.ts`

// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "YUN-LOVE 的状态页",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/YUN-LOVE', label: 'GitHub' },
    { link: 'https://blog.031312.xyz/', label: '博客' },
  ],
}

const workerConfig: WorkerConfig = {
  // Define all your monitors here
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
      const GRACE_PERIOD_MINUTES = 5;       // 宽限期（分钟），0 表示关闭
      const DEFAULT_TO = "YUN-LOVE@031312.xyz";
      const DEFAULT_FROM = "UptimeFlare 监控";
      const MAX_TEXT_LENGTH = 5000;          // 防止 text 字段过长
      // ================================

      // 定义 kvKey（提升作用域）
      let kvKey = "";
      
      // ---------- 清洗函数：保留换行和制表符 ----------
      function sanitizeString(str: string): string {
        if (!str) return '';
        // 删除 ASCII 控制字符，但保留 \n (0x0A), \r (0x0D), \t (0x09)
        let cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        // 删除不可见 Unicode 字符（零宽连字、零宽空格等）
        cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '');
        // HTML 转义（防止注入）
        cleaned = cleaned.replace(/[&<>]/g, (m) => {
          if (m === '&') return '&amp;';
          if (m === '<') return '&lt;';
          if (m === '>') return '&gt;';
          return m;
        });
        return cleaned;
      }
      // ------------------------------

      // 清洗字段
      const safeMonitorName = sanitizeString(monitor.name);
      const safeReason = sanitizeString(reason);
      const statusText = isUp ? '✅ 恢复正常 (UP)' : '❌ 服务中断 (DOWN)';

      // 时间处理（东八区）
      const timeString = new Date(timeNow * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

      // ---------- 宽限期检查（仅对 DOWN 生效，需要 KV 绑定）----------
      let shouldSkip = false;
      if (!isUp && GRACE_PERIOD_MINUTES > 0 && env.ALERT_KV) {
        kvKey = `webhook_alert_${monitor.id}`;  // 使用 monitor.id 更可靠
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
      // ------------------------------------------------------------

      // ---------- 构造 Webhook 请求体 ----------
      let detailText = `监控名称: ${safeMonitorName}\n时间: ${timeString}\n原因: ${safeReason}`;
      // 可选：截断过长文本
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

      // ---------- 发送 Webhook ----------
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
          // 发送成功后记录宽限期（仅 DOWN）
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
      // 如果你不需要这个回调，保持为空即可
    },
  },
}

const maintenances: MaintenanceConfig[] = []

export { maintenances, pageConfig, workerConfig }
