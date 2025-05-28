import { VideoSenderData } from "../../types";
import { SenderMonitorData } from "./sender-monitor-data";

export class VideoSenderMonitorData extends SenderMonitorData {

  protected framesPerSecond: number = -1;
  protected width: number = -1;
  protected height: number = -1;

  protected sentFrameWidth: number = -1;
  protected sentFrameHeight: number = -1;
  protected sentFrameRate: number = -1;
  protected totalFramesEncoded: number = -1;
  protected totalFramesSent: number = -1;
  protected framesSentPerSecond: number = -1;
  protected keyFramesEncoded: number = -1;
  protected pliCount: number = -1;
  protected pliPerSecond: number = -1;
  protected totalEncodeTime: number = -1;
  protected framesEncodedPerSecond: number = -1;
  protected encodeTimePerFrame: number = -1;
  protected encoderImplementation: string = '';
  protected qpSum: number = -1;
  protected qpPerSecond: number = -1;

  constructor () {
    super();
  }

  onOutboundRTP(timestamp: number, active: boolean, rid: string | undefined, bytesSent: number, packetsSent: number, nackCount: number, frameRate: number,
    framesEncoded: number, framesSent: number, keyFramesEncoded: number, pliCount: number, totalEncodeTime: number, frameHeight: number, frameWidth: number,
    encoderImplementation: string, qpSum: number): void {
    super.onOutboundRTPData(timestamp, active, bytesSent, packetsSent, nackCount);

    this.sentFrameWidth = frameWidth;
    this.sentFrameHeight = frameHeight;
    this.sentFrameRate = frameRate;

    if (this.totalFramesEncoded > -1) {
      this.framesEncodedPerSecond = framesEncoded - this.totalFramesEncoded;
      if (this.totalEncodeTime > -1) {
        const encodeTime: number = totalEncodeTime - this.totalEncodeTime;
        if (encodeTime > 0 && this.framesEncodedPerSecond > 0) {
          this.encodeTimePerFrame = encodeTime / this.framesEncodedPerSecond;
        }
      }
    }
    this.totalFramesEncoded = framesEncoded;
    if (this.totalFramesSent > -1) {
      this.framesSentPerSecond = framesSent - this.totalFramesSent;
    }
    this.totalFramesSent = framesSent;
    this.keyFramesEncoded = keyFramesEncoded;
    if (this.pliCount > -1) {
      this.pliPerSecond = pliCount - this.pliCount;
    }
    this.pliCount = pliCount;
    this.totalEncodeTime = totalEncodeTime;
    this.encoderImplementation = encoderImplementation;
    this.lastOutboundRTPTmeStamp = timestamp;
    if (this.qpSum > -1) {
      this.qpPerSecond = qpSum - this.qpSum;
    }
    this.qpSum = qpSum;
  }

  onMediaSource (framesPerSecond: number, width: number, height: number): void {
    this.framesPerSecond = framesPerSecond;
    this.width = width;
    this.height = height;
  }

  getMonitorData(): VideoSenderData | undefined {
    if (this.lastOutboundRTPTmeStamp > -1) {
      const data: VideoSenderData = {
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
        framesPerSecond: this.framesPerSecond,
        width: this.width,
        height: this.height,
        sentFrameWidth: this.sentFrameWidth,
        sentFrameHeight: this.sentFrameHeight,
        sentFrameRate: this.sentFrameRate,
        totalFramesEncoded: this.totalFramesEncoded,
        framesEncodedPerSecond: this.framesEncodedPerSecond,
        totalFramesSent: this.totalFramesSent,
        framesSentPerSecond: this.framesSentPerSecond,
        keyFramesencoded: this.keyFramesEncoded,
        pliCount: this.pliCount,
        pliPerSecond: this.pliPerSecond,
        // encodeTimePerFrame: this.encodeTimePerFrame,
        encoderImplementation: this.encoderImplementation,
        qpPerSecond: this.qpPerSecond,
        qpSum: this.qpSum,
      };
      if (this.encodeTimePerFrame > -1) {
        data.encodeTimePerFrame = this.encodeTimePerFrame;
      }
      return data;
    }
    return undefined;
  }

  protected reset (): void {
    super.reset();
    this.framesPerSecond = -1;
    this.width = -1;
    this.height = -1;
    this.sentFrameWidth = -1;
    this.sentFrameHeight = -1;
    this.sentFrameRate = -1;
    this.totalFramesEncoded = -1;
    this.totalFramesSent = -1;
    this.framesSentPerSecond = -1;
    this.keyFramesEncoded = -1;
    this.pliCount = -1;
    this.pliPerSecond = -1;
    this.totalEncodeTime = -1;
    this.framesEncodedPerSecond = -1;
    this.encodeTimePerFrame = -1;
    this.encoderImplementation = '';
    this.qpSum = -1;
    this.qpPerSecond = -1;
  }
}

