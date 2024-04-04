from flask import Flask, request, send_file
from pytube import YouTube
from flask_cors import CORS
import os
import ffmpeg
import uuid
# import tempfile

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    return  'Hello'

# @app.route('/download', methods=['GET'])
# def download_video():
#     video_url = request.args.get('url')

#     with tempfile.TemporaryDirectory() as temp_dir:
#         yt = YouTube(video_url)
#         video = yt.streams.get_highest_resolution()
#         video_path = video.download(temp_dir)
#         # video.download(temp_dir)
#         print(video_path)

#         #  # Close the file handle to prevent "PermissionError"
#         # video.close()

#         return send_file(video_path, as_attachment=True)
#         # return send_file(video.default_filename, as_attachment=True)

@app.route('/y2audio', methods=['POST'])
def send_audio():
    data = request.get_json()
    # yt_url = request.args.get('url')
    yt_url = data['url']

    yt = YouTube(yt_url)
    audio = yt.streams.get_audio_only()
    out_file = audio.download('./../y2d_client/public/audios/')

    # save the file
    base, ext = os.path.splitext(out_file)
    new_file = base + '.mp3'
    try:
        os.rename(out_file, new_file)
    except:
        os.remove(new_file)
        os.rename(out_file, new_file)

    filepath, ex = os.path.splitext(audio.default_filename)
    filepath = 'audios/' + filepath + '.mp3'

    data = {
        "filepath": filepath,
        "thumbnail": yt.thumbnail_url,
        "title": yt.title,
        "filesize": audio.filesize_mb
    }
    return data

@app.route('/y2adaptive', methods=['POST'])
def get_quality_video():
    data = request.get_json()
    yt_url = data['url']
    yt = YouTube(yt_url)
    
    #download audio
    audio = yt.streams.get_audio_only()
    audio_filepath = audio.download('./../y2d_client/audios/')
    base, ext = os.path.splitext(audio_filepath)
    new_audio_filepath = base + '.mp3'
    try:
        os.rename(audio_filepath, new_audio_filepath)
    except:
        os.remove(new_audio_filepath)
        os.rename(audio_filepath, new_audio_filepath)

    audio_filename, ex = os.path.splitext(audio.default_filename)
    audio_filename = audio_filename + '.mp3'

    #download video
    video = yt.streams.filter(only_video=True).first()
    video_filepath = video.download('./../y2d_client/videos/')
    video_base, video_ext = os.path.splitext(video_filepath)
    video_file_uname = './videos/' + str(uuid.uuid4()) + video_ext
    try:
        os.rename(video_filepath, video_file_uname)
    except:
        os.remove(video_file_uname)
        os.rename(video_filepath, video_file_uname)


    #combine audio and video
    input_video = ffmpeg.input(video_file_uname)
    input_audio = ffmpeg.input(new_audio_filepath)
    
    if os.path.isfile(video_filepath):
        os.remove(video_filepath)

    ffmpeg.concat(input_video, input_audio, v=1, a=1).output(video_filepath).run()

    if os.path.isfile(new_audio_filepath):
        os.remove(new_audio_filepath)
    if os.path.isfile(video_file_uname):
        os.remove(video_file_uname)

    data = {
        "filepath": './../y2d_client/videos/' + video.default_filename,
        "title": yt.title,
        "thumbnail": yt.thumbnail_url
    }
    return data



@app.route('/y2video', methods=['GET'])
def get_video():
    # Get the YouTube video URL from the query string
    video_url = request.args.get('url')

    # Download the YouTube video using pytube
    youtube = YouTube(video_url)
    video = youtube.streams.get_highest_resolution()
    # print(video)
    video.download('./../y2d_client/public/videos/')

    data = {
        "filepath": 'videos/' + video.default_filename,
        "thumbnail": youtube.thumbnail_url,
        "title": youtube.title,
        "filesize": video.filesize_mb
    }
    # Close the file handle to prevent "PermissionError"
    # video.close()
    
    return data

# @app.route('/download', methods=['GET'])
# def download_video():
#     file_path = request.args.get('path')

#     Return the downloaded video as a file
#     return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6002, debug=True)