import { AudioSenderData } from "../../types";
import { AudioSenderMonitorData } from "../data/audio-sender-monitor-data";
import { Monitor, RTCStats } from "./monitor";

export class AudioSenderMonitor extends Monitor {

  protected monitorData: AudioSenderMonitorData = new AudioSenderMonitorData();

  constructor (audioSender: RTCRtpSender) {
    super(audioSender);
  }

  getMonitorData(): AudioSenderData | undefined {
    return this.monitorData.getMonitorData();
  }

  protected onOutboundRTP(stats: RTCStats): void {
    this.monitorData.onOutboundRTP(stats.timestamp, stats.active, stats.bytesSent, stats.nackCount, stats.packetsSent);
  }

  protected onMediaSource(stats: RTCStats): void {
    this.monitorData.onMediaSource(stats.audioLevel, stats.totalAudioEnergy);
  }

  protected onCodec(stats: RTCStats): void {
    this.monitorData.onCodec(stats.mimeType);
  }

  protected onCandidatePair(stats: RTCStats): void {
    this.monitorData.onCandidatePair(stats.currentRoundTripTime, stats.availableOutgoingBitrate);
  }

  protected onRemoteInboundRTP(stats: RTCStats): void {
    this.monitorData.onRemoteInboundRTP(stats.packetsLost, stats.fractionLost, stats.jitter);
  }
}
