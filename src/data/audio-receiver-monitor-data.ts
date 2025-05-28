import { AudioReceiverData } from "../../types";
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
    if (this.lastInboundRTPTmeStamp > -1) {
      const data: AudioReceiverData = {
        bytesReceived: this.bytesReceived,
        bytesReceivedPerSecond: this.bytesReceivedPerSecond,
        packetsReceived: this.packetsReceived,
        packetsReceivedPerSecond: this.packetsReceivedPerSecond,
        packetsLost: this.packetsLost,
        packetsLostPerSecond: this.packetsLostPerSecond,
        codec: this.codec,
        jitter: this.jitter,
        audioLevel: this.audioLevel,
        totalAudioEnergy: this.totalAudioEnergy,
      };
      if (this.availableOutgoingBitrate > -1) {
        data.availableOutgoingBitrate = this.availableOutgoingBitrate;
      }
      if (this.currentroundTripTime > -1) {
        data.currentroundTripTime = this.currentroundTripTime;
      }
      if (this.playoutId) {
        data.playoutId = this.playoutId;
      }
      if (this.nackCount > -1) {
        data.nackCount = this.nackCount;
        if (this.nackCountPerSecond > -1) {
          data.nackCountPerSecond = this.nackCountPerSecond;
        }
      }
      return data;
    }
    return undefined;
  }
}

