import { VideoSenderData } from "../../types";
import { VideoSenderMonitorData } from "../data/video-sender-monitor-data";
import { Monitor, RTCStats } from "./monitor";

export class VideoSenderMonitor extends Monitor {

  protected monitorData: VideoSenderMonitorData = new VideoSenderMonitorData();

  constructor (videoSender: RTCRtpSender) {
    super(videoSender);
  }

  getMonitorData(): VideoSenderData | undefined {
    return this.monitorData.isActive ? this.monitorData.getMonitorData() : undefined;
  }

  protected onOutboundRTP(stats: RTCStats): void {
    this.monitorData.onOutboundRTP(stats.timestamp, stats.active, stats.rid, stats.bytesSent, stats.packetsSent, stats.nackCount,
      stats.framesPerSecond, stats.framesEncoded, stats.framesSent, stats.keyFramesEncoded, stats.pliCount, stats.totalEncodeTime,
      stats.frameHeight, stats.frameWidth, stats.encoderImplementation, stats.qpSum);
  }

  protected onCandidatePair(stats: RTCStats): void {
    this.monitorData.onCandidatePair(stats.currentRoundTripTime, stats.availableOutgoingBitrate);
  }

  protected onMediaSource(stats: RTCStats): void {
    this.monitorData.onMediaSource(stats.framesPerSecond, stats.width, stats.height);
  }

  protected onCodec(stats: RTCStats): void {
    this.monitorData.onCodec(stats.mimeType);
  }

  protected onRemoteInboundRTP(stats: RTCStats): void {
    this.monitorData.onRemoteInboundRTP(stats.packetsLost, stats.fractionLost, stats.jitter);
  }
}

