import { AudioReceiverData } from "../../types";
import { AudioReceiverMonitorData } from "../data/audio-receiver-monitor-data";
import { Monitor, RTCStats } from "./monitor";

export class AudioReceiverMonitor extends Monitor {

  protected monitorData: AudioReceiverMonitorData = new AudioReceiverMonitorData();

  constructor (audioReceiver: RTCRtpReceiver) {
    super(audioReceiver);
  }

  getMonitorData(): AudioReceiverData | undefined {
    return this.monitorData.getMonitorData();
  }

  protected onInboundRTP(stats: RTCStats): void {
    this.monitorData.onInboundRTP(stats.timestamp, stats.audioLevel, stats.bytesReceived, stats.jitter, stats.packetsLost,
      stats.packetsReceived, stats.nackCount, stats.playoutId, stats.totalAudioEnergy);
  }

  protected onCodec(stats: RTCStats): void {
    this.monitorData.onCodec(stats.mimeType);
  }

  protected onCandidatePair(stats: RTCStats): void {
    this.monitorData.onCandidatePair(stats.currentRoundTripTime, stats.availableOutgoingBitrate);
  }
}

