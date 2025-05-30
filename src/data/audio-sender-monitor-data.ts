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
      this.addMonitorData(data);
      return data;
    }
    return undefined;
  }

  onOutboundRTP (timestamp: number, active: boolean, bytesSent: number, nackCount: number, packetsSent: number,
    retransmittedBytesSent: number, retransmittedPacketsSent: number, totalPacketSendDelay: number): void {
    super.onOutboundRTPData(timestamp, active, bytesSent, packetsSent, nackCount, retransmittedBytesSent, retransmittedPacketsSent, totalPacketSendDelay);
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