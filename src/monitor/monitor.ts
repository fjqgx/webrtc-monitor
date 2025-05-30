import { AudioReceiverData, AudioSenderData, VideoReceiverData, VideoSenderData } from "../../types";

export const enum RTCStatsType {
  OutboundRTP = 'outbound-rtp',
  RemoteInboundRTP = 'remote-inbound-rtp',
  Track = 'track',

  InboundRTP = 'inbound-rtp',

  Codec = 'codec',
  MediaSource = 'media-source',
  CandidatePair = 'candidate-pair',
}

export interface RTCStats {
  type: RTCStatsType;
  id: string;
  active: boolean;
  jitter: number;

  nackCount: number;
  packetsLost: number;

  audioLevel: number;
  totalAudioEnergy: number;
  retransmittedPacketsSent: number;
  retransmittedBytesSent: number;
  totalPacketSendDelay: number;

  mimeType: string;
  timestamp: number;
  frameWidth: number;
  frameHeight: number;
  framesPerSecond: number;
  framesEncoded: number;
  framesSent: number;
  keyFramesEncoded: number;
  firCount: number;
  pliCount: number;
  totalEncodeTime: number;
  width: number;
  height: number;
  encoderImplementation: string;
  qpSum: number;
  targetBitrate: number;
  framesDecoded: number;
  framesDropped: number;
  keyFramesDecoded: number;
  framesReceived: number;
  hugeFramesSent: number;

  rid?: string;

  bytesSent: number;
  packetsSent: number;
  fractionLost: number;
  availableOutgoingBitrate: number;
  currentRoundTripTime: number;

  bytesReceived: number;
  packetsReceived: number;

  playoutId: string;

  
}

export abstract class Monitor {

  protected monitor?: RTCRtpSender | RTCRtpReceiver;

  constructor (monitor: RTCRtpSender | RTCRtpReceiver) {
    this.monitor = monitor;
  }

  getStats (): Promise<void> {
    return new Promise((resolve) => {
      this.monitor && this.monitor.getStats().then((report: RTCStatsReport) => {
        report.forEach((stats: RTCStats) => {
          if (stats) {
            switch (stats.type) {
              case RTCStatsType.OutboundRTP:
                this.onOutboundRTP(stats, this.monitor !== undefined ? this.monitor.track : undefined);
                break;
  
              case RTCStatsType.MediaSource:
                this.onMediaSource(stats, this.monitor !== undefined ? this.monitor.track : undefined);
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

              case RTCStatsType.Track:
                this.onTrack(stats);
                break;
  
              default:
                break;
            }
          }
        })
      })
      resolve();
    })
  }

  destroy (): void {
    this.monitor = undefined;
  }

  abstract getMonitorData (): AudioSenderData | VideoSenderData | AudioReceiverData | VideoReceiverData | undefined;

  protected onOutboundRTP (stats: RTCStats, track: MediaStreamTrack | null | undefined): void {};

  protected onMediaSource (stats: RTCStats, track: MediaStreamTrack | null | undefined): void {};

  protected onCodec (stats: RTCStats): void {};

  protected onCandidatePair (stats: RTCStats): void {};

  protected onRemoteInboundRTP (stats: RTCStats): void {};

  protected onInboundRTP (stats: RTCStats): void {};

  protected onTrack (stats: RTCStats): void {};
}