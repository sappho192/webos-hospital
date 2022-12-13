var mediaRecorder;
var recordedBlobs;

window.onload = function() {
    let mystream;
    const url = 'ws://165.246.43.140:3000';  // WebSocket 서버의 주소
    const ws = new WebSocket(url);
    var video = document.querySelector('video');
    var canvasEl = document.getElementById('canvas');
    const constraints = window.constraints = {
        audio: false,
        video: true
    };
    // button Elements
    const js_camera_play_btn = document.getElementById("js-camera-play-btn");
    const js_camera_stop_btn = document.getElementById("js-camera-stop-btn");
    const js_camera_server_btn = document.getElementById("js-camera-server-btn");
    js_camera_server_btn.removeAttribute("disabled");

    // Add Eventlistener for the media capture and stream API
    js_camera_play_btn.addEventListener('click', function(e) {
        play_video_stream();
        js_camera_stop_btn.removeAttribute("disabled");
        setInterval(function() {
            const context = canvasEl.getContext('2d');
            context.drawImage(video, 0, 0, 640, 480);
            sendImage()
         }, 300)
    });

    function play_video_stream() {
        console.log(window.navigator.mediaDevices);
        mystream = window.navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                var videoTracks = stream.getVideoTracks();
                console.log('Got stream with constraints:', constraints);
                console.log('Using video device: ' + videoTracks[0].label);
                stream.onremovetrack = function() {
                    console.log('Stream ended');
                };
                window.stream = stream; // make variable available to browser console
                video.srcObject = stream;
            })
            .catch(function(error) {
            });
    };

    function sendImage(){
        var rawData = canvasEl.toDataURL("image/jpeg", 0.5);
        ws.send(rawData);
    }

    js_camera_stop_btn.addEventListener('click', function(e) {
        stop_video_stream();
        js_camera_stop_btn.setAttribute("disabled", true);
    });

    function stop_video_stream() {
        var stream = video.srcObject;
        var tracks = stream.getTracks();
        console.log(tracks);
        tracks.forEach(function(track) {
            track.stop();
        });
        video.srcObject = null;
    }

    js_camera_server_btn.addEventListener('click', function(e){
        connectServer();
    });

    function connectServer(){
        ws.onopen = function(){
            console.log("websocket is connedted");
        }
        ws.onmessage = function(msg){
            console.log(msg.data);
        }
    }
}