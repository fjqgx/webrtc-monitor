import { AudioSenderData, AudioReceiverData, VideoSenderData, VideoReceiverData } from "../../types";
import { ReceiverMonitorData } from "./receiver-monitor-data";

export class AudioReceiverMonitorData extends ReceiverMonitorData {

  protected audioLevel: number = -1;
  protected totalAudioEnergy: number = -1;
  protected playoutId: string = '';

  constructor () {
    super();
  }

  onInboundRTP(timestamp: number, audioLevel: number, bytesReceived: number, jitter: number, packetsLost: number,
    packetsReceived: number, nackCount: number, playoutId: string, totalAudioEnergy: number): void {
    super.onInboundRTPData(timestamp, bytesReceived, jitter, packetsLost, packetsReceived, nackCount);

    this.playoutId = playoutId;
    this.totalAudioEnergy = totalAudioEnergy;
    this.audioLevel = audioLevel;
  }

  getMonitorData(): AudioReceiverData | undefined {
    return {
      availableOutgoingBitrate: this.availableOutgoingBitrate,
      bytesReceived: this.bytesReceived,
      bytesReceivedPerSecond: this.bytesReceivedPerSecond,
      packetsReceived: this.packetsReceived,
      packetsReceivedPerSecond: this.packetsReceivedPerSecond,
      packetsLost: this.packetsLost,
      packetsLostPerSecond: this.packetsLostPerSecond,
      nackCount: this.nackCount,
      nackCountPerSecond: this.nackCountPerSecond,
      currentroundTripTime: this.currentroundTripTime,
      codec: this.codec,
      jitter: this.jitter,
      audioLevel: this.audioLevel,
      totalAudioEnergy: this.totalAudioEnergy,
      playoutId: this.playoutId,
    }
  }
}

