import { SenderMonitorData } from "./sender-monitor-data";
import { AudioSenderData } from "../../types/index";
import { getNumberValue } from "../utils/value-util";

export class AudioSenderMonitorData extends SenderMonitorData {
  
  protected audioLevel: number = -1;

  protected totalAudioEnergy: number = -1;

  constructor () {
    super();
  }

  getMonitorData(): AudioSenderData | undefined {
    if (this.lastOutboundRTPTmeStamp > -1) {
      const data: AudioSenderData = {
        availableOutgoingBitrate: this.availableOutgoingBitrate,
        bytesSent: this.bytesSent,
        bytesSentPerSecond: this.bytesSentPerSecond,
        packetsSent: this.packetsSent,
        packetsSentPerSecond: this.packetsSentPerSecond,
        packetsLost: this.packetsLost,
        packetsLostPerSecond: this.packetsLostPerSecond,
        nackCount: this.nackCount,
        nackCountPerSecond: this.nackCountPerSecond,
        currentroundTripTime: this.currentroundTripTime,
        codec: this.codec,
        jitter: this.jitter,
        audioLevel: this.audioLevel,
        totalAudioEnergy: this.totalAudioEnergy,
      };
      if (this.nackCount > -1) {
        data.nackCount = this.nackCount;
        if (this.nackCountPerSecond > -1) {
          data.nackCountPerSecond = this.nackCountPerSecond;
        }
      }
    }
    return undefined;
  }

  onOutboundRTP (timestamp: number, active: boolean, bytesSent: number, nackCount: number, packetsSent: number): void {
    super.onOutboundRTPData(timestamp, active, bytesSent, packetsSent, nackCount);
  }

  onMediaSource (audioLevel: number, totalAudioEnergy: number): void {
    this.audioLevel = getNumberValue(audioLevel, -1);
    this.totalAudioEnergy = getNumberValue(totalAudioEnergy, -1);
  }

  protected reset(): void {
    super.reset();
    this.audioLevel = -1;
    this.totalAudioEnergy = -1;
  }
}