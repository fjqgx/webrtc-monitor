import { AudioReceiverData, AudioSenderData, VideoReceiverData, VideoSenderData } from "../../types";

export const enum RTCStatsType {
  OutboundRTP = 'outbound-rtp',
  RemoteInboundRTP = 'remote-inbound-rtp',

  InboundRTP = 'inbound-rtp',

  Codec = 'codec',
  MediaSource = 'media-source',
  CandidatePair = 'candidate-pair',
}

export interface RTCStats {
  type: RTCStatsType;
  id: string;
  active: boolean;

  nackCount: number;
  packetsLost: number;

  audioLevel: number;
  jitter: number;

  totalAudioEnergy: number;

  mimeType: string;
  timestamp: number;
  frameWidth: number;
  frameHeight: number;
  framesPerSecond: number;
  framesEncoded: number;
  framesSent: number;
  keyFramesEncoded: number;
  pliCount: number;
  totalEncodeTime: number;
  width: number;
  height: number;
  encoderImplementation: string;
  qpSum: number;

  rid?: string;

  bytesSent: number;
  packetsSent: number;
  fractionLost: number;
  availableOutgoingBitrate: number;
  currentRoundTripTime: number;

  bytesReceived: number;
  packetsReceived: number;

  playoutId: string;

  framesDecoded: number;
  framesDropped: number;
  keyFramesDecoded: number;
  framesReceived: number;
}

export abstract class Monitor {

  protected monitor?: RTCRtpSender | RTCRtpReceiver;

  constructor (monitor: RTCRtpSender | RTCRtpReceiver) {
    this.monitor = monitor;
  }

  getStats (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.monitor && this.monitor.getStats().then((report: RTCStatsReport) => {
        report.forEach((stats: RTCStats) => {
          if (stats) {
            switch (stats.type) {
              case RTCStatsType.OutboundRTP:
                this.onOutboundRTP(stats);
                break;
  
              case RTCStatsType.MediaSource:
                this.onMediaSource(stats);
                break;
  
              case RTCStatsType.Codec:
                this.onCodec(stats);
                break;
  
              case RTCStatsType.CandidatePair:
                this.onCandidatePair(stats);
                break;
  
              case RTCStatsType.RemoteInboundRTP:
                this.onRemoteInboundRTP(stats);
                break;
  
              case RTCStatsType.InboundRTP:
                this.onInboundRTP(stats);
                break;
  
              default:
                break;
            }
          }
        })
      })
    })
  }

  destroy (): void {
    this.monitor = undefined;
  }

  abstract getMonitorData (): AudioSenderData | VideoSenderData | AudioReceiverData | VideoReceiverData | undefined;

  protected onOutboundRTP (stats: RTCStats): void {};

  protected onMediaSource (stats: RTCStats): void {};

  protected onCodec (stats: RTCStats): void {};

  protected onCandidatePair (stats: RTCStats): void {};

  protected onRemoteInboundRTP (stats: RTCStats): void {};

  protected onInboundRTP (stats: RTCStats): void {};
}