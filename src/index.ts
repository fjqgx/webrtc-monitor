import { AudioReceiverData, AudioSenderData, VideoReceiverData, VideoSenderData, WebRTcMonitorData } from "../types";
import { AudioReceiverMonitor } from "./monitor/audio-receiver-monitor";
import { AudioSenderMonitor } from "./monitor/audio-sender-monitor";
import { VideoReceiverMonitor } from "./monitor/video-receiver-monitor";
import { VideoSenderMonitor } from "./monitor/video-sender-monitor";
import { EventEmitter } from "./utils/event-emitter";


export class WebRTCMonitor extends EventEmitter {

  protected pc?: RTCPeerConnection;

  protected audioSenderMonitor?: AudioSenderMonitor;

  protected videoSenderMonitor?: VideoSenderMonitor;

  protected audioReceiverMonitor?: AudioReceiverMonitor;

  protected videoReceiverMonitor?: VideoReceiverMonitor;

  protected monitorData: WebRTcMonitorData = {};

  constructor (pc: RTCPeerConnection) {
    super();
    this.pc = pc;

    this.pc.addEventListener("signalingstatechange", () => {
      if (this.pc && this.pc.signalingState === "stable") {
        this.init();
      }
    })
    this.init();
  }

  getStats (): Promise<WebRTcMonitorData> {
    return new Promise((resolve, reject) => {
      this.monitorData = {};
      if (!this.pc) {
        resolve(this.monitorData);
        return;
      }

      if (this.audioSenderMonitor) {
        this.audioSenderMonitor.getStats();
        const audioData: AudioSenderData | undefined = this.audioSenderMonitor.getMonitorData();
        if (audioData) {
          this.monitorData.send = {
            audio: audioData
          }
        }
      }

      if (this.videoSenderMonitor) {
        this.videoSenderMonitor.getStats();
        const videoData: VideoSenderData | undefined = this.videoSenderMonitor.getMonitorData();
        if (videoData) {
          this.monitorData.send = this.monitorData.send || {};
          this.monitorData.send.video = videoData;
        }
      }

      if (this.audioReceiverMonitor) {
        this.audioReceiverMonitor.getStats();
        const audioData: AudioReceiverData | undefined = this.audioReceiverMonitor.getMonitorData();
        if (audioData) {
          this.monitorData.receive = {
            audio: audioData
          }
        }
      }

      if (this.videoReceiverMonitor) {
        this.videoReceiverMonitor.getStats();
        const videoData: VideoReceiverData | undefined = this.videoReceiverMonitor.getMonitorData();
        if (videoData) {
          this.monitorData.receive = this.monitorData.receive || {};
          this.monitorData.receive.video = videoData;
        }
      }
      resolve(this.monitorData);
    })
  }

  getMonitorData (): WebRTcMonitorData {
    return this.monitorData;
  }

  destroy (): void {
    if (this.audioSenderMonitor)
    this.pc = undefined;
  }

  protected init (): void {
    if (!this.pc) {
      return;
    }
    const senderArr: RTCRtpSender[] = this.pc.getSenders();
    senderArr.forEach((sender: RTCRtpSender) => {
      if (sender.track) {
        if (sender.track.kind === "audio") {
          if (!this.audioSenderMonitor) {
            this.audioSenderMonitor = new AudioSenderMonitor(sender);
          }
        } else if (sender.track.kind === "video") {
          if (!this.videoSenderMonitor) {
            this.videoSenderMonitor = new VideoSenderMonitor(sender);
          }
        }
      }
    })

    const receiverArr: RTCRtpReceiver[] = this.pc.getReceivers();
    receiverArr.forEach((receiver: RTCRtpReceiver) => {
      if (receiver.track) {
        if (receiver.track.kind === "audio") {
          if (!this.audioReceiverMonitor) {
            this.audioReceiverMonitor = new AudioReceiverMonitor(receiver);
          }
        } else if (receiver.track.kind === "video") {
          if (!this.videoReceiverMonitor) {
            this.videoReceiverMonitor = new VideoReceiverMonitor(receiver);
          }
        }
      }
    })
  }
}

// @ts-ignore
window.WebRTCMonitor = WebRTCMonitor;

