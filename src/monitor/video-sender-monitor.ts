import { VideoSenderData } from "../../types";
import { VideoSenderMonitorData } from "../data/video-sender-monitor-data";
import { Monitor, RTCStats } from "./monitor";

export class VideoSenderMonitor extends Monitor {

  protected monitorData: VideoSenderMonitorData = new VideoSenderMonitorData();

  constructor (videoSender: RTCRtpSender) {
    super(videoSender);
  }

  getMonitorData(): VideoSenderData | undefined {
    return this.monitorData.getMonitorData();
  }

  protected onOutboundRTP(stats: RTCStats, track: MediaStreamTrack | null | undefined): void {
    if (stats.active === undefined && track) {
      stats.active = track.enabled;
    }
    
    this.monitorData.onOutboundRTP(stats.timestamp, stats.active, stats.rid, stats.bytesSent, stats.packetsSent, stats.nackCount,
      stats.framesPerSecond, stats.framesEncoded, stats.framesSent, stats.keyFramesEncoded, stats.firCount, stats.pliCount,
      stats.totalEncodeTime, stats.frameHeight, stats.frameWidth, stats.encoderImplementation, stats.qpSum, stats.retransmittedBytesSent,
      stats.retransmittedPacketsSent, stats.totalPacketSendDelay, stats.targetBitrate, stats.hugeFramesSent);
  }

  protected onCandidatePair(stats: RTCStats): void {
    this.monitorData.onCandidatePair(stats.currentRoundTripTime, stats.availableOutgoingBitrate);
  }

  protected onMediaSource(stats: RTCStats, track: MediaStreamTrack | null | undefined): void {
    if (track && (stats.width === undefined || stats.height === undefined)) {
      const setting: MediaTrackSettings = track.getSettings();
      stats.width = setting.width as number;
      stats.height = setting.height as number;
    }
    this.monitorData.onMediaSource(stats.framesPerSecond, stats.width, stats.height);
  }

  protected onCodec(stats: RTCStats): void {
    this.monitorData.onCodec(stats.mimeType);
  }

  protected onRemoteInboundRTP(stats: RTCStats): void {
    this.monitorData.onRemoteInboundRTP(stats.packetsLost, stats.fractionLost, stats.jitter);
  }

  protected onTrack(stats: RTCStats): void {
    this.monitorData.onTrack(stats.frameWidth, stats.frameHeight, stats.framesSent);
  }
}

