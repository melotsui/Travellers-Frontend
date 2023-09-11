import { FFmpegKit, FFprobeKit, ReturnCode } from 'ffmpeg-kit-react-native';
import AudioRecorderPlayer, { AVEncoderAudioQualityIOSType, AVEncodingOption, AVModeIOSOption, AudioEncoderAndroidType, AudioSet, AudioSourceAndroidType } from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

interface AudioListener {
    onUpdate: (duration: number) => void;
}
const audioSet: AudioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVModeIOS: AVModeIOSOption.measurement,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
};

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
        const result = await this.audioRecorderPlayer.startRecorder(audioPath, audioSet);
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

    async extractAudio(filePath: string): Promise<void> {
        const videoPath = filePath;
        const outputPath = filePath.replace('.mp4', '.wav');

        const command = `-i ${videoPath} -map 0:a:0 -vn -acodec pcm_s16le -ar 44100 -ac 2 ${outputPath}`;

        try {
            await FFmpegKit.executeAsync(command);
            console.log('Audio extraction was successful');

            const outputFile = await RNFS.readFile(outputPath);
            await RNFS.writeFile(outputPath, outputFile);
            console.log('Audio file saved successfully!');
        } catch (error) {
            console.log(`Audio extraction failed: ${error}`);
        }
    };
    async getAudioFileInfo(filePath: string): Promise<number> {
        const ffprobeCommand = `-v error -select_streams a:0 -show_entries stream=duration -of json ${filePath}`;

        try {
            const ffprobeSession = await FFprobeKit.executeAsync(ffprobeCommand);
            const ffprobeOutput = await ffprobeSession.getOutput();

            const fileInfo = JSON.parse(ffprobeOutput);
            const audioStream = fileInfo.streams[0];

            const duration = audioStream.duration;

            console.log('Duration:', duration);
            return duration;
        } catch (error) {
            console.log('Error getting audio file info:', error);
            return 0;
        }
    };

}

export default new AudioController();
