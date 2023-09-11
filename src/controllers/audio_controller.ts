import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

interface AudioListener {
    onUpdate: (duration: number) => void;
}

class AudioController {
    private listener?: AudioListener;
    private audioRecorderPlayer: AudioRecorderPlayer;

    constructor() {
        this.audioRecorderPlayer = new AudioRecorderPlayer();
    }

    setAudioListener(listener: AudioListener) {
        this.listener = listener;
    }

    async startRecording(): Promise<string> {
        const currentDateTime = new Date().toISOString();
        const audioPath = `${RNFS.DocumentDirectoryPath}/recording_${currentDateTime}.mp4`;
        const result = await this.audioRecorderPlayer.startRecorder(audioPath);
        this.audioRecorderPlayer.addRecordBackListener((e: any) => {
          this.listener?.onUpdate(e.currentPosition);
          console.log(e.currentPosition);
          return;
        });
        console.log("start recording: ", result);
        return result;
      }

    async stopRecording(): Promise<string> {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        console.log("stop recording: ", result);
        return result;
    }

    async startPlay(filePath: string): Promise<string> {
        const result = await this.audioRecorderPlayer.startPlayer(filePath);
        this.audioRecorderPlayer.addPlayBackListener((e: any) => {
          // Update something related to playback, like progress bar or similar
          return;
        });
        return result;
      }
    
      async stopPlay(): Promise<string> {
        return await this.audioRecorderPlayer.stopPlayer();
      }
}

export default new AudioController();
