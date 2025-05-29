**其他语言版本: [English](README.md), [中文](README_zh.md).**

# webrtc-monitor
在浏览器中使用的webrtc监控类

## 用法
目前暂时只支持1秒统计一次

1. 异步获取结果
```html
const pc = new RTCPeerConnection();
const monitor = new WebRTCMonitor(pc);
setInterval(() => {
  monitor.getStats().then((data) => {
    console.log("monitor:", data);
  })
}, 1000);
```

2. 同步获取结果

```
const pc = new RTCPeerConnection();
const monitor = new WebRTCMonitor(pc);
setInterval(() => {
  monitor.getStats();
  // 这里获取的是上一秒的统计结果
  console.log("monitor:", monitor.getMonitorData());
}, 1000);
```
