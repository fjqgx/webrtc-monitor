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
        currentroundTripTime: this.currentroundTripTime,
        codec: this.codec,
        audioLevel: this.audioLevel,
        totalAudioEnergy: this.totalAudioEnergy,
      };
      if (this.active !== undefined) {
        data.active = this.active;
      }
      if (this.packetsLost > -1) {
        data.packetsLost = this.packetsLost;
        if (this.packetsLostPerSecond > -1) {
          data.packetsLostPerSecond = this.packetsLostPerSecond;
        }
      }
      if (this.nackCount > -1) {
        data.nackCount = this.nackCount;
        if (this.nackCountPerSecond > -1) {
          data.nackCountPerSecond = this.nackCountPerSecond;
        }
      }
      if (this.jitter > -1) {
        data.jitter = this.jitter;
      }
      return data;
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