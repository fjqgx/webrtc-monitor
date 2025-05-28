import { AudioSenderData, VideoSenderData, AudioReceiverData, VideoReceiverData } from "../../types";
import { VideoReceiverMonitorData } from "../data/video-receiver-monitor-data";
import { Monitor, RTCStats } from "./monitor";

export class VideoReceiverMonitor extends Monitor {

  protected monitorData: VideoReceiverMonitorData = new VideoReceiverMonitorData();

  constructor (videoReceiver: RTCRtpReceiver) {
    super(videoReceiver);
  }

  getMonitorData(): VideoReceiverData | undefined {
    return this.monitorData.getMonitorData();
  }

  protected onInboundRTP(stats: RTCStats): void {
    this.monitorData.onInboundRTP(stats.timestamp, stats.bytesReceived, stats.frameHeight,
      stats.frameWidth, stats.framesDecoded, stats.framesDropped, stats.framesReceived, stats.jitter,
      stats.keyFramesDecoded, stats.nackCount, stats.packetsLost, stats.packetsReceived, stats.pliCount);
  }

  protected onCodec(stats: RTCStats): void {
    this.monitorData.onCodec(stats.mimeType);
  }

  protected onCandidatePair(stats: RTCStats): void {
    this.monitorData.onCandidatePair(stats.currentRoundTripTime, stats.availableOutgoingBitrate);
  }
}

