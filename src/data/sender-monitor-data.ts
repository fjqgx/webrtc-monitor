import { MonitorData } from "./monitor-data";

export abstract class SenderMonitorData extends MonitorData {

  protected active: boolean = false;

  protected bytesSent: number = -1;
  protected bytesSentPerSecond: number = -1;

  protected packetsSent: number = -1;
  protected packetsSentPerSecond: number = -1;

  protected nackCount: number = -1;
  protected nackCountPerSecond: number = -1;

  protected packetsLost: number = -1;
  protected packetsLostPerSecond: number = -1;

  

  protected fractionLost: number = -1;

  constructor () {
    super();
  }

  get isActive (): boolean {
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

  protected onOutboundRTPData (timestamp: number, active: boolean, bytesSent: number, packetsSent: number, nackCount: number): void {
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
    this.bytesSent = bytesSent;
    this.nackCount = nackCount;
    this.packetsSent = packetsSent;
  }

  protected reset (): void {
    super.reset();
    this.active = false;
    this.bytesSent = -1;
    this.bytesSentPerSecond = -1;
    this.packetsSent = -1;
    this.packetsSentPerSecond = -1;
    this.nackCount = -1;
    this.nackCountPerSecond = -1;
    this.packetsLost = -1;
    this.packetsLostPerSecond = -1;
    this.fractionLost = -1;
  }
}