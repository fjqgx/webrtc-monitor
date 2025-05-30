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
  protected keyFramesEncodedPerSecond: number = -1;
  protected firCount: number = -1;
  protected firPerSecond: number = -1;
  protected pliCount: number = -1;
  protected pliPerSecond: number = -1;
  protected totalEncodeTime: number = -1;
  protected framesEncodedPerSecond: number = -1;
  protected encodeTimePerFrame: number = -1;
  protected encoderImplementation: string = '';
  protected qpSum: number = -1;
  protected qpPerSecond: number = -1;
  protected targetBitrate: number = -1;
  protected hugeFramesSent: number = -1;
  protected hugeFramesSentPerSecond: number = -1;

  constructor () {
    super();
  }

  onOutboundRTP(timestamp: number, active: boolean, rid: string | undefined, bytesSent: number, packetsSent: number, nackCount: number, frameRate: number,
    framesEncoded: number, framesSent: number, keyFramesEncoded: number, firCount: number, pliCount: number, totalEncodeTime: number, frameHeight: number,
    frameWidth: number, encoderImplementation: string, qpSum: number, retransmittedBytesSent: number, retransmittedPacketsSent: number,
    totalPacketSendDelay: number, targetBitrate: number, hugeFramesSent: number): void {
    super.onOutboundRTPData(timestamp, active, bytesSent, packetsSent, nackCount, retransmittedBytesSent, retransmittedPacketsSent, totalPacketSendDelay);
    this.onTrack(frameWidth, frameHeight, framesSent);   
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
    if (this.keyFramesEncoded > -1) {
      this.keyFramesEncodedPerSecond = keyFramesEncoded - this.keyFramesEncoded;
    }
    this.keyFramesEncoded = keyFramesEncoded;
    if (this.firCount > -1) {
      this.firPerSecond = firCount - this.firCount;
    }
    this.firCount = firCount;
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
    this.targetBitrate = targetBitrate;
    if (this.hugeFramesSent > -1) {
      this.hugeFramesSentPerSecond = hugeFramesSent - this.hugeFramesSent;
    }
    this.hugeFramesSent = hugeFramesSent;
  }

  onMediaSource (framesPerSecond: number, width: number, height: number): void {
    this.framesPerSecond = framesPerSecond;
    this.width = width;
    this.height = height;
  }

  onTrack (frameWidth: number, frameHeight: number, framesSent: number): void {
    if (frameWidth !== undefined) {
      this.sentFrameWidth = frameWidth;  
    }
    if (frameHeight !== undefined) {
      this.sentFrameHeight = frameHeight;
    }
    if (framesSent !== undefined) {
      if (this.totalFramesSent > -1) {
        this.framesSentPerSecond = framesSent - this.totalFramesSent;
      }
      this.totalFramesSent = framesSent;
    }
  }

  getMonitorData(): VideoSenderData | undefined {
    if (this.lastOutboundRTPTmeStamp > -1) {
      const data: VideoSenderData = {
        availableOutgoingBitrate: this.availableOutgoingBitrate,
        bytesSent: this.bytesSent,
        bytesSentPerSecond: this.bytesSentPerSecond,
        packetsSent: this.packetsSent,
        packetsSentPerSecond: this.packetsSentPerSecond,
        nackCount: this.nackCount,
        nackCountPerSecond: this.nackCountPerSecond,
        currentroundTripTime: this.currentroundTripTime,
        codec: this.codec,
        framesPerSecond: this.framesPerSecond,
        width: this.width,
        height: this.height,
        totalFramesEncoded: this.totalFramesEncoded,
        framesEncodedPerSecond: this.framesEncodedPerSecond,
        firCount: this.firCount,
        firPerSecond: this.firPerSecond,
        pliCount: this.pliCount,
        pliPerSecond: this.pliPerSecond,
        qpPerSecond: this.qpPerSecond,
        qpSum: this.qpSum,
      };
      this.addMonitorData(data);
      if (this.encodeTimePerFrame > -1) {
        data.encodeTimePerFrame = this.encodeTimePerFrame;
      }
      if (this.sentFrameWidth > -1) {
        data.sentFrameWidth = this.sentFrameWidth;
      }
      if (this.sentFrameHeight > -1) {
        data.sentFrameHeight = this.sentFrameHeight;
      }
      if (this. sentFrameRate > -1) {
        data.sentFrameRate = this.sentFrameRate;
      }
      if (this.totalFramesSent > -1) {
        data.totalFramesSent = this.totalFramesSent;
        if (this.framesSentPerSecond > -1) {
          data.framesSentPerSecond = this.framesSentPerSecond;
        }
      }
      if (this.keyFramesEncoded > -1) {
        data.keyFramesEncoded = this.keyFramesEncoded;
        if (this.keyFramesEncodedPerSecond > -1) {
          data.keyFramesEncodedPerSecond = this.keyFramesEncodedPerSecond;
        }
      }
      if (this.targetBitrate > -1) {
        data.targetBitrate = this.targetBitrate;
      }
      if (this.hugeFramesSent > -1) {
        data.hugeFramesSent = this.hugeFramesSent;
        if (this.hugeFramesSentPerSecond > -1) {
          data.hugeFramesSentPerSecond = this.hugeFramesSent
        }
      }
      if (this.encoderImplementation) {
        data.encoderImplementation = this.encoderImplementation;
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
    this.firCount = -1;
    this.firPerSecond = -1;
    this.pliCount = -1;
    this.pliPerSecond = -1;
    this.totalEncodeTime = -1;
    this.framesEncodedPerSecond = -1;
    this.encodeTimePerFrame = -1;
    this.encoderImplementation = '';
    this.qpSum = -1;
    this.qpPerSecond = -1;
    this.targetBitrate = -1;
    this.hugeFramesSent = -1;
    this.hugeFramesSentPerSecond = -1;
  }
}

