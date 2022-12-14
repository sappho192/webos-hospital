(function() {
  
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    video = document.getElementById('video'),
    vendorUrl = window.URL || window.webkitURL;
    
    navigator.getMedia =  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetuserMedia ||
    navigator.msGetUserMedia;
    
    navigator.getMedia({
      video: true,
      audio: false
    }, function(stream) {
      video.srcObject = stream;
      video.play();
    }, function(error) {
      // an error occurred
    } );    
  } )();