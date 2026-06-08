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
    // HTTP 监控示例
    // {
    //   // `id` 应该是唯一的，如果 `id` 保持不变，历史记录将被保留
    //   id: 'blog',
    //   // `name` 用于状态页面和回调消息
    //   name: '博客',
    //   // `method` 应该是有效的 HTTP 方法
    //   method: 'HEAD',
    //   // `target` 是一个有效的 URL
    //   target: 'https://blog.acofork.com/',
    //   // [可选] `tooltip` 仅用于在状态页面显示提示信息
    //   //tooltip: '这是此监控的提示信息',
    //   // [可选] `statusPageLink` 仅用于状态页面的可点击链接
    //   statusPageLink: 'https://blog.acofork.com/',
    //   // [可选] `hideLatencyChart` 如果设置为 true，将隐藏状态页面的延迟图表
    //   hideLatencyChart: false,
    //   // [可选] `expectedCodes` 是可接受的 HTTP 响应代码数组，如果不指定，默认为 2xx
    //   expectedCodes: [200],
    //   // [可选] `timeout` 以毫秒为单位，如果不指定，默认为 10000
    //   timeout: 10000,
    //   // [可选] 要发送的头部信息
    //   //headers: {
    //   //  'User-Agent': 'Uptimeflare',
    //   //  Authorization: 'Bearer YOUR_TOKEN_HERE',
    //   //},
    //   // [可选] 要发送的正文
    //   //body: 'Hello, world!',
    //   // [可选] 如果指定，响应必须包含关键字才被视为正常
    //   //responseKeyword: 'success',
    //   // [可选] 如果指定，响应必须不包含关键字才被视为正常
    //   //responseForbiddenKeyword: 'bad gateway',
    //   // [可选] 如果指定，检查将在您指定的区域运行，
    //   // 设置此值之前请参考文档 https://github.com/lyc8503/UptimeFlare/wiki/Geo-specific-checks-setup
    //   //checkLocationWorkerRoute: 'https://xxx.example.com',
    // },
    // {
    //   id: 'uptimekuma',
    //   name: 'UptimeKuma',
    //   method: 'HEAD',
    //   target: 'https://acofork-uptime.zeabur.app/status/acofork',
    //   statusPageLink: 'https://acofork-uptime.zeabur.app/status/acofork',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
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
    // {
    //   id: 'blog_eo',
    //   name: '博客（EdgeOne Pages国内节点）',
    //   method: 'HEAD',
    //   target: 'https://eo-blog.acofork.com/',
    //   statusPageLink: 'https://eo-blog.acofork.com/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
    // {
    //   id: 'blog_cf',
    //   name: '博客（Cloudflare Pages海外节点）',
    //   method: 'HEAD',
    //   target: 'https://cf-blog.acofork.com/',
    //   statusPageLink: 'https://cf-blog.acofork.com/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
    // {
    //   id: 'umami_nas',
    //   name: 'Umami（NAS）',
    //   method: 'HEAD',
    //   target: 'https://umami.acofork.com/',
    //   statusPageLink: 'https://umami.acofork.com/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
    // {
    //   id: 'vw_nas',
    //   name: 'VaultWarden（NAS）',
    //   method: 'HEAD',
    //   target: 'https://vw.acofork.com/',
    //   statusPageLink: 'https://vw.acofork.com/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
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
    // {
    //   id: 'fnos_nas',
    //   name: '飞牛（NAS）',
    //   method: 'HEAD',
    //   target: 'https://nas.acofork.com/',
    //   statusPageLink: 'https://nas.acofork.com/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
    // {
    //   id: 'gh_proxy_eo',
    //   name: 'Github 代理（EdgeOne）',
    //   method: 'HEAD',
    //   target: 'https://gh.072103.xyz/',
    //   statusPageLink: 'https://gh.072103.xyz/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
    // {
    //   id: 'gh_proxy_cf',
    //   name: 'Github 代理（Cloudflare）',
    //   method: 'HEAD',
    //   target: 'https://cf-gh.072103.xyz/',
    //   statusPageLink: 'https://cf-gh.072103.xyz/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
    // {
    //   id: 'eopfapi',
    //   name: '随机图API（EdgeOne）',
    //   method: 'HEAD',
    //   target: 'https://eopfapi.acofork.com/pic/',
    //   statusPageLink: 'https://eopfapi.acofork.com/pic/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
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
    // {
    //   id: 'upload_to_s3',
    //   name: '简单上传文件到S3（EdgeOne Pages）',
    //   method: 'GET',
    //   target: 'https://u.2x.nz/',
    //   statusPageLink: 'https://u.2x.nz/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
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
    // {
    //   id: 'eo_http',
    //   name: '网站安全测试（EdgeOne Pages）',
    //   method: 'HEAD',
    //   target: 'https://http.acofork.com/',
    //   statusPageLink: 'https://http.acofork.com/',
    //   hideLatencyChart: false,
    //   expectedCodes: [200],
    //   timeout: 10000,
    // },
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
    // [Optional] Notification webhook settings, if not specified, no notification will be sent
    // More info at Wiki: https://github.com/lyc8503/UptimeFlare/wiki/Setup-notification
    webhook: {
      // [Required] webhook URL (example: Telegram Bot API)
      url: 'https://push.031312.xyz/api/push/y8Vo5RcCHRAIiwM8',
      // [Optional] HTTP method, default to 'GET' for payloadType=param, 'POST' otherwise
      method: 'POST',
      // [Optional] headers to be sent
      headers: {
         // 'Authorization': 'Bearer ${env.RESEND_API_KEY}',
         'Content-Type': 'application/json'
      },
      // [Required] Specify how to encode the payload
      // Should be one of 'param', 'json' or 'x-www-form-urlencoded'
      // 'param': append url-encoded payload to URL search parameters
      // 'json': POST json payload as body, set content-type header to 'application/json'
      // 'x-www-form-urlencoded': POST url-encoded payload as body, set content-type header to 'x-www-form-urlencoded'
      payloadType: 'json',
      // [Required] payload to be sent
      // $MSG will be replaced with the human-readable notification message
      payload: {
        "from": "系统状态更新 <uptimeflare@031312.xyz>",
        "to": ["yun0313wwh12@gmail.com"],
        "subject": "UptimeFlare 状态更新",
        "text": "$MSG"
      },
      // [Optional] timeout calling this webhook, in millisecond, default to 5000
      timeout: 10000,
    },
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: 'Asia/Shanghai',
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
    //gracePeriod: 5,
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
    // ========== 宽限期配置 ==========
    // const GRACE_PERIOD_MINUTES = 5;   // 5分钟内重复的 DOWN 不报警
    // // =================================
    //
    // if (env.RESEND_API_KEY) {
    //   try {
    //     // ---------- 宽限期检查（仅对 DOWN 状态生效）----------
    //     let skipSend = false;
    //     if (!isUp && env.ALERT_KV) {   // 只有 DOWN 并且 KV 可用时才检查
    //       const kvKey = `alert_${monitor.name}`;
    //       let lastRecord = null;
    //       try {
    //         const raw = await env.ALERT_KV.get(kvKey);
    //         if (raw) lastRecord = JSON.parse(raw);
    //       } catch (e) {
    //         console.error(`KV read error: ${e}`);
    //       }
    //
    //       const lastStatus = lastRecord?.status;
    //       const lastTime = lastRecord?.time || 0;
    //       const minutesSinceLast = (Date.now() - lastTime) / 1000 / 60;
    //
    //       if (lastStatus === "DOWN" && minutesSinceLast < GRACE_PERIOD_MINUTES) {
    //         console.log(`[Skip] ${monitor.name} DOWN alert suppressed (${minutesSinceLast.toFixed(1)} min since last alert)`);
    //         skipSend = true;
    //       }
    //     }
    //     // ----------------------------------------------------
    //
    //     if (!skipSend) {
    //       const statusText = isUp ? '恢复正常 (UP)' : '服务中断 (DOWN)';
    //       const color = isUp ? '#4ade80' : '#ef4444';
    //       const subject = `[${statusText}] ${monitor.name} 状态变更通知`;
    //
    //       let timeString = new Date(timeNow * 1000).toISOString();
    //       try {
    //         timeString = new Date(timeNow * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
    //       } catch (e) {}
    //
    //       const htmlContent = `
    //         <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
    //           <h2 style="color: ${color};">${statusText}</h2>
    //           <p><strong>监控名称:</strong> ${monitor.name}</p>
    //           <p><strong>时间:</strong> ${timeString}</p>
    //           <p><strong>原因:</strong> ${reason}</p>
    //           <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    //           <p style="font-size: 12px; color: #888;">来自 UptimeFlare 监控报警</p>
    //         </div>
    //       `;
    //
    //       const resendPayload = {
    //         from: "系统状态更新 <uptimeflare@031312.xyz>",
    //         to: ["YUN-LOVE@031312.xyz"],
    //         subject: subject,
    //         html: htmlContent,
    //       };
    //       console.log("Generated HTML content:", htmlContent);
    //
    //       const resp = await fetch('https://api.resend.com/emails', {
    //         method: 'POST',
    //         headers: {
    //           'Authorization': `Bearer ${env.RESEND_API_KEY}`,
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(resendPayload)
    //       });
    //
    //       if (!resp.ok) {
    //         console.error(`Resend API call failed: ${resp.status} ${await resp.text()}`);
    //       } else {
    //         // 发送成功后更新 KV（仅记录 DOWN 事件，也可记录 UP，但 UP 不会触发下一次的宽限期检查）
    //         if (!isUp && env.ALERT_KV) {
    //           const kvKey = `alert_${monitor.name}`;
    //           await env.ALERT_KV.put(kvKey, JSON.stringify({
    //             status: "DOWN",
    //             time: Date.now()
    //           }));
    //         }
    //       }
    //     }
    //   } catch (e) {
    //     console.error(`Error calling Resend API: ${e}`);
    //   }
    // }
  },
  onIncident: async (env, monitor, timeIncidentStart, timeNow, reason) => {
    // 如果你不需要这个回调，保持为空即可
  },
 },
}

// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature

const maintenances: MaintenanceConfig[] = []

// const maintenances: MaintenanceConfig[] = [
//   {
    // // [Optional] Monitor IDs to be affected by this maintenance
    // monitors: ['foo_monitor', 'bar_monitor'],
    // // [Optional] default to "Scheduled Maintenance" if not specified
    // title: 'Test Maintenance',
    // // Description of the maintenance, will be shown at status page
    // body: 'This is a test maintenance, server software upgrade',
    // // Start time of the maintenance, in UNIX timestamp or ISO 8601 format
    // start: '2020-01-01T00:00:00+08:00',
    // // [Optional] end time of the maintenance, in UNIX timestamp or ISO 8601 format
    // // if not specified, the maintenance will be considered as on-going
    // end: '2050-01-01T00:00:00+08:00',
    // // [Optional] color of the maintenance alert at status page, default to "yellow"
    // color: 'blue',
//   },
// ]

// Don't edit this line
export { maintenances, pageConfig, workerConfig }
