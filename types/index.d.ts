

export declare class WebRTCMonitor {

  constructor (pc: RTCPeerConnection);

  getStats (): Promise<WebRTcMonitorData>;
}


export interface WebRTcMonitorData {
  send?: {
    audio?: AudioSenderData;
    video?: VideoSenderData;
  };
  receive?: {
    audio?: AudioReceiverData;
    video?: VideoReceiverData;
  }
}

export interface AudioSenderData {
  availableOutgoingBitrate: number;
  bytesSent: number;
  bytesSentPerSecond: number;
  packetsSent: number;
  packetsSentPerSecond: number;
  packetsLost?: number;
  packetsLostPerSecond?: number;
  nackCount?: number;
  nackCountPerSecond?: number;
  currentroundTripTime: number;
  codec: string;
  jitter?: number;
  audioLevel: number;
  totalAudioEnergy: number;
}

export interface VideoSenderData {
  availableOutgoingBitrate: number;
  bytesSent: number;
  bytesSentPerSecond: number;
  packetsSent: number;
  packetsSentPerSecond: number;
  packetsLost?: number;
  packetsLostPerSecond?: number;
  nackCount: number;
  nackCountPerSecond: number;
  currentroundTripTime: number;
  codec: string;
  jitter?: number;
  framesPerSecond: number;
  width: number;
  height: number;
  sentFrameWidth?: number;
  sentFrameHeight?: number;
  sentFrameRate?: number;
  totalFramesEncoded: number;
  framesEncodedPerSecond: number;
  totalFramesSent?: number;
  framesSentPerSecond?: number;
  keyFramesEncoded?: number;
  pliCount: number;
  pliPerSecond: number;
  encodeTimePerFrame?: number;
  encoderImplementation: string;
  qpPerSecond: number;
  qpSum: number;
}

export interface AudioReceiverData {
  availableOutgoingBitrate?: number;
  bytesReceived: number;
  bytesReceivedPerSecond: number;
  packetsReceived: number;
  packetsReceivedPerSecond: number;
  packetsLost: number;
  packetsLostPerSecond: number;
  nackCount?: number;
  nackCountPerSecond?: number;
  currentroundTripTime?: number;
  codec: string;
  jitter: number;
  audioLevel?: number;
  totalAudioEnergy?: number;
  playoutId?: string;
}

export interface VideoReceiverData {
  availableOutgoingBitrate?: number;
  bytesReceived: number;
  bytesReceivedPerSecond: number;
  packetsReceived: number;
  packetsReceivedPerSecond: number;
  packetsLost: number;
  packetsLostPerSecond: number;
  nackCount: number;
  nackCountPerSecond: number;
  currentroundTripTime?: number;
  codec: string;
  jitter?: number;
  frameHeight?: number;
  frameWidth?: number;
  framesDecoded: number;
  framesDecodedPerSecond: number;
  framesDropped?: number;
  framesDroppedPerSecond?: number;
  framesReceived?: number;
  framesReceivedPerSecond?: number;
  keyFramesDecoded?: number;
  keyFramesDecodedPerSecond?: number;
  pliCount: number;
  pliCountPerSecond: number;
}