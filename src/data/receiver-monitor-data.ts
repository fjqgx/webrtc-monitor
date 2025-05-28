import { MonitorData } from "./monitor-data";

export abstract class ReceiverMonitorData extends MonitorData {

  protected bytesReceived: number = -1;
  protected bytesReceivedPerSecond: number = -1;
  protected packetsReceived: number = -1;
  protected packetsReceivedPerSecond: number = -1;
  protected packetsLost: number = -1;
  protected packetsLostPerSecond: number = -1;
  protected nackCount: number = -1;
  protected nackCountPerSecond: number = -1;

  constructor () {
    super();
  }

  protected onInboundRTPData (timestamp: number, bytesReceived: number, jitter: number, packetsLost: number, packetsReceived: number,
    nackCount: number): void {
    this.lastOutboundRTPTmeStamp = timestamp;
    if (this.bytesReceived > -1) {
      this.bytesReceivedPerSecond = bytesReceived - this.bytesReceived;
    }
    if (this.packetsReceived > -1) {
      this.packetsReceivedPerSecond = packetsReceived - this.packetsReceived
    }
    if (this.packetsLost > -1) {
      this.packetsLostPerSecond = packetsLost - this.packetsLost;
    }
    if (this.nackCount > -1) {
      this.nackCountPerSecond = nackCount - this.nackCount;
    }
    this.jitter = jitter;
    this.bytesReceived = bytesReceived;
    this.packetsLost = packetsLost;
    this.packetsReceived = packetsReceived;
    this.nackCount = nackCount;
  }
  

  protected reset(): void {
    super.reset();
  }
}

