import { AudioSenderData, VideoSenderData } from "../../types";
import { MonitorData } from "./monitor-data";

export abstract class SenderMonitorData extends MonitorData {

  protected lastOutboundRTPTmeStamp: number = -1;

  protected active?: boolean = undefined;

  protected bytesSent: number = -1;
  protected bytesSentPerSecond: number = -1;

  protected packetsSent: number = -1;
  protected packetsSentPerSecond: number = -1;

  protected nackCount: number = -1;
  protected nackCountPerSecond: number = -1;

  protected packetsLost: number = -1;
  protected packetsLostPerSecond: number = -1;

  protected retransmittedBytesSent: number = -1;
  protected retransmittedBytesSentPerSecond: number = -1;

  protected retransmittedPacketsSent: number = -1;
  protected retransmittedPacketsSentPerSecond: number = -1;
  
  protected totalPacketSendDelay: number = -1;
  protected avgPacketSendDelay: number = -1;

  protected fractionLost: number = -1;

  constructor () {
    super();
  }

  get isActive (): boolean | undefined {
    return this.active;
  }

  onRemoteInboundRTP (packetsLost: number, fractionLost: number, jitter: number): void {
    if (this.packetsLost > -1) {
      this.packetsLostPerSecond = packetsLost - this.packetsLost;
    }
    this.packetsLost = packetsLost;
    this.jitter = jitter;
    this.fractionLost = this.fractionLost;
  }

  protected addMonitorData(data: VideoSenderData | AudioSenderData): void {
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
    if (this.retransmittedBytesSent > -1) {
      data.retransmittedBytesSent = this.retransmittedBytesSent;
      if (this.retransmittedBytesSentPerSecond > -1) {
        data.retransmittedBytesSentPerSecond = this.retransmittedBytesSentPerSecond;
      }
    }
    if (this.retransmittedPacketsSent > -1) {
      data.retransmittedPacketsSent = this.retransmittedPacketsSent;
      if (this.retransmittedPacketsSentPerSecond > -1) {
        data.retransmittedPacketsSentPerSecond = this.retransmittedPacketsSentPerSecond;
      }
    }
    if (this.totalPacketSendDelay > -1) {
      data.totalPacketSendDelay = this.totalPacketSendDelay;
      if (this.avgPacketSendDelay > -1) {
        data.avgPacketSendDelay = this.avgPacketSendDelay;
      }
    }
  }

  protected onOutboundRTPData (timestamp: number, active: boolean, bytesSent: number, packetsSent: number, nackCount: number,
    retransmittedBytesSent: number, retransmittedPacketsSent: number, totalPacketSendDelay: number): void {
    this.lastOutboundRTPTmeStamp = timestamp;
    this.active = active;

    if (this.bytesSent > -1) {
      this.bytesSentPerSecond = bytesSent - this.bytesSent;
    }
    if (this.nackCount > -1) {
      this.nackCountPerSecond = nackCount - this.nackCount;
    }
    if (this.packetsSent > -1) {
      this.packetsSentPerSecond = packetsSent - this.packetsSent;
    }
    if (this.retransmittedBytesSent > -1) {
      this.retransmittedBytesSentPerSecond = retransmittedBytesSent - this.retransmittedBytesSent;
    }
    this.retransmittedBytesSent = retransmittedBytesSent;

    if (this.retransmittedPacketsSent > -1) {
      this.retransmittedPacketsSentPerSecond = retransmittedPacketsSent - this.retransmittedPacketsSent;
    }
    this.retransmittedPacketsSent = retransmittedPacketsSent;
    if (this.totalPacketSendDelay > -1) {
      const delay: number = totalPacketSendDelay = this.totalPacketSendDelay;
      if (this.packetsSentPerSecond > 0) {
        this.avgPacketSendDelay = delay / this.packetsSentPerSecond;
      }
    }
    this.totalPacketSendDelay = -1;
    this.bytesSent = bytesSent;
    this.nackCount = nackCount;
    this.packetsSent = packetsSent;
  }

  protected reset (): void {
    super.reset();
    this.lastOutboundRTPTmeStamp = -1;
    this.active = undefined;
    this.bytesSent = -1;
    this.bytesSentPerSecond = -1;
    this.packetsSent = -1;
    this.packetsSentPerSecond = -1;
    this.nackCount = -1;
    this.nackCountPerSecond = -1;
    this.packetsLost = -1;
    this.packetsLostPerSecond = -1;
    this.fractionLost = -1;
    this.retransmittedBytesSent = -1;
    this.retransmittedBytesSentPerSecond = -1;
    this.retransmittedPacketsSent = -1;
    this.retransmittedPacketsSentPerSecond = -1;
    this.totalPacketSendDelay = -1;
    this.avgPacketSendDelay = -1;
  }
}