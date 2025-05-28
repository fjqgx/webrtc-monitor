import { VideoReceiverData } from "../../types";
import { ReceiverMonitorData } from "./receiver-monitor-data";

export class VideoReceiverMonitorData extends ReceiverMonitorData {

  protected frameHeight: number = -1;
  protected framewidth: number = -1;
  protected framesDecoded: number = -1;
  protected framesDecodedPerSecond: number = -1;
  protected framesDropped: number = -1;
  protected framesDroppedPerSecond: number = -1;
  protected framesReceived: number = -1;
  protected framesReceivedPerSecond: number = -1;
  protected keyFramesDecoded: number = -1;
  protected keyFramesDecodedPerSecond: number = -1;
  protected pliCount: number = -1;
  protected pliCountPerSecond: number = -1;

  constructor () {
    super();
  }

  onInboundRTP (timestamp: number, bytesReceived: number, frameHeight: number, framewidth: number, framesDecoded: number,
    framesDropped: number, framesReceived: number, jitter: number, keyFramesDecoded: number, nackCount: number,
    packetsLost: number, packetsReceived: number, pliCount: number): void {
    super.onInboundRTPData(timestamp, bytesReceived, jitter, packetsLost, packetsReceived, nackCount);
    
    if (this.framesDecoded > -1) {
      this.framesDecodedPerSecond = framesDecoded - this.framesDecoded;
    }
    if (this.framesDropped > -1) {
      this.framesDroppedPerSecond = framesDecoded - this.framesDropped;
    }
    if (this.framesReceived > -1) {
      this.framesReceivedPerSecond = framesReceived - this.framesReceived;
    }
    if (this.keyFramesDecoded > -1) {
      this.keyFramesDecodedPerSecond = keyFramesDecoded - this.keyFramesDecoded;
    }
    if (this.pliCount > -1) {
      this.pliCountPerSecond = pliCount - this.pliCount;
    }
    this.frameHeight = frameHeight;
    this.framewidth = framewidth;
    this.framesDecoded = framesDecoded;
    this.framesDropped = framesDropped;
    this.framesReceived = framesReceived;
    this.keyFramesDecoded = keyFramesDecoded;
    this.pliCount = pliCount;
  }

  getMonitorData(): VideoReceiverData | undefined {
    return {
      availableOutgoingBitrate: this.availableOutgoingBitrate,
      bytesReceived: this.bytesReceived,
      bytesReceivedPerSecond: this.bytesReceivedPerSecond,
      packetsReceived: this.packetsReceived,
      packetsReceivedPerSecond: this.packetsLostPerSecond,
      packetsLost: this.packetsLost,
      packetsLostPerSecond: this.packetsLostPerSecond,
      nackCount: this.nackCount,
      nackCountPerSecond: this.nackCountPerSecond,
      currentroundTripTime: this.currentroundTripTime,
      codec: this.codec,
      jitter: this.jitter,
      frameHeight: this.frameHeight,
      frameWidth: this.framewidth,
      framesDecoded: this.framesDecoded,
      framesDecodedPerSecond: this.framesDecodedPerSecond,
      framesDropped: this.framesDropped,
      framesDroppedPerSecond: this.framesDroppedPerSecond,
      framesReceived: this.framesReceived,
      framesReceivedPerSecond: this.framesReceivedPerSecond,
      keyFramesDecoded: this.keyFramesDecoded,
      keyFramesDecodedPerSecond: this.keyFramesDecodedPerSecond,
      pliCount: this.pliCount,
      pliCountPerSecond: this.pliCountPerSecond,
    }
  }
}

