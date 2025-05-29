**Read this in other languages: [English](README.md), [中文](README_zh.md).**

# webrtc-monitor
webrtc monitor for browser


## describe
At present, it only supports statistics once every second




1. Asynchronous retrieval of results
```html
const pc = new RTCPeerConnection();
const monitor = new WebRTCMonitor(pc);
setInterval(() => {
  monitor.getStats().then((data) => {
    console.log("monitor:", data);
  })
}, 1000);
```

2. Synchronize to obtain results
```
const pc = new RTCPeerConnection();
const monitor = new WebRTCMonitor(pc);
setInterval(() => {
  monitor.getStats();
  // The result obtained here is from the previous second
  console.log("monitor:", monitor.getMonitorData());
}, 1000);

```



