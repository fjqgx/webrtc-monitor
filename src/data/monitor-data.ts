import { AudioReceiverData, AudioSenderData, VideoReceiverData, VideoSenderData } from "../../types/index";

export abstract class MonitorData {

  protected jitter: number = -1;

  protected codec: string = '';

  protected currentroundTripTime: number = -1;

  protected availableOutgoingBitrate: number = -1;

  constructor () {

  }

  onCodec (mimeType: string): void {
    if (mimeType) {
      this.codec = mimeType.substring(6);
    }
  }

  onCandidatePair (currentroundTripTime: number, availableOutgoingBitrate: number): void {
    this.currentroundTripTime = currentroundTripTime;
    this.availableOutgoingBitrate = availableOutgoingBitrate;
  }

  abstract getMonitorData (): AudioSenderData | AudioReceiverData | VideoSenderData | VideoReceiverData | undefined;

  protected reset (): void {
    this.codec = '';
    this.currentroundTripTime = -1;
    this.availableOutgoingBitrate = -1;
    this.jitter = -1;
  }
}
