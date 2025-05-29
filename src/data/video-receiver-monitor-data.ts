import { VideoReceiverData } from "../../types";
import { ReceiverMonitorData } from "./receiver-monitor-data";

export class VideoReceiverMonitorData extends ReceiverMonitorData {

  protected frameHeight: number = -1;
  protected frameWidth: number = -1;
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

  onInboundRTP (timestamp: number, bytesReceived: number, frameHeight: number, frameWidth: number, framesDecoded: number,
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
    this.frameWidth = frameWidth;
    this.framesDecoded = framesDecoded;
    this.framesDropped = framesDropped;
    this.framesReceived = framesReceived;
    this.keyFramesDecoded = keyFramesDecoded;
    this.pliCount = pliCount;
  }

  getMonitorData(): VideoReceiverData | undefined {
    if (this.lastInboundRTPTmeStamp > -1) {
      const data: VideoReceiverData = {
        bytesReceived: this.bytesReceived,
        bytesReceivedPerSecond: this.bytesReceivedPerSecond,
        packetsReceived: this.packetsReceived,
        packetsReceivedPerSecond: this.packetsLostPerSecond,
        packetsLost: this.packetsLost,
        packetsLostPerSecond: this.packetsLostPerSecond,
        nackCount: this.nackCount,
        nackCountPerSecond: this.nackCountPerSecond,
        codec: this.codec,
        framesDecoded: this.framesDecoded,
        framesDecodedPerSecond: this.framesDecodedPerSecond,
        pliCount: this.pliCount,
        pliCountPerSecond: this.pliCountPerSecond,
      }
      if (this.availableOutgoingBitrate > -1) {
        data.availableOutgoingBitrate = this.availableOutgoingBitrate;
      }
      if (this.keyFramesDecoded > -1) {
        data.keyFramesDecoded = this.keyFramesDecoded;
        if (this.keyFramesDecodedPerSecond > -1) {
          data.keyFramesDecodedPerSecond = this.keyFramesDecodedPerSecond;
        }
      }
      if (this.currentroundTripTime > -1) {
        data.currentroundTripTime = this.currentroundTripTime;
      }
      if (this.jitter > -1) {
        data.jitter = this.jitter;
      }
      if (this.frameHeight > -1) {
        data.frameHeight = this.frameHeight;
      }
      if (this.frameWidth > -1) {
        data.frameWidth = this.frameWidth;
      }
      if (this.framesDropped > -1) {
        data.framesDropped = this.framesDropped;
        if (this.framesDroppedPerSecond > -1) {
          data.framesDroppedPerSecond = this.framesDecodedPerSecond;
        }
      }
      if (this.framesReceived > -1) {
        data.framesReceived = this.framesReceived;
        if (this.framesReceivedPerSecond > -1) {
          data.framesReceivedPerSecond = this.framesReceivedPerSecond;
        }
      }
      return data;
    }
    return undefined;
  }
}

