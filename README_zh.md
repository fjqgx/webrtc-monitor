**其他语言版本: [English](README.md), [中文](README_zh.md).**

# webrtc-monitor
在浏览器中使用的webrtc监控类

## 用法
目前暂时只支持1秒统计一次
```html
const pc = new RTCPeerConnection();
const monitor = new WebRTCMonitor(pc);
setInterval(() => {
  monitor.getStats().then((data) => {
    console.log("monitor:", data);
  })
}, 1000);
```

