
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    // videoId: menVideo[0],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

$(function () {
  $("#player").hide();
  $("#fullNext").hide();
  $("#lowerNext").hide();
  $("#upperNext").hide();
  $("#absNext").hide();
  $("#legsNext").hide();
  $("#glutesNext").hide();
  $("#armsNext").hide();
});

var fullBody = ["LT0moP38wXY","TdUlF4F2nto"];
var lowerBody = ["5O2KEoFH_po", "un5vSCMDKeg"];
var upperBody = ["NYL1HaT9JfU", "Yxjxec_EhGQ"];
var abs = ["dJlFmxiL11s", "1919eTCoESo"];
var legs = ["3ru8I7LU3Dc","5DfCBBPgxE0"];
var glutes = ["SlTtw_ysPDM","I2PKsIVIsz8"];
var arms = ["8tE2aj192kc", "zIxdEgaISx8"];

$("#fullBdyBtn").on("click", function () {
  $("#player").show();
  $("#fullNext").show();
  $("#lowerNext").hide();
  $("#upperNext").hide();
  $("#absNext").hide();
  $("#legsNext").hide();
  $("#glutesNext").hide();
  $("#armsNext").hide();
  player.loadVideoById(fullBody[0]);
});

$("#lowerBdyBtn").on("click", function () {
  $("#player").show();
  $("#lowerNext").show();
  $("#fullNext").hide();
  $("#upperNext").hide();
  $("#absNext").hide();
  $("#legsNext").hide();
  $("#glutesNext").hide();
  $("#armsNext").hide();
  player.loadVideoById(lowerBody[0]);
});

$("#upperBdyBtn").on("click", function () {
  $("#player").show();
  $("#upperNext").show();
  $("#lowerNext").hide();
  $("#fullNext").hide();
  $("#absNext").hide();
  $("#legsNext").hide();
  $("#glutesNext").hide();
  $("#armsNext").hide();
  player.loadVideoById(upperBody[0]);
});

$("#absBtn").on("click", function () {
  $("#player").show();
  $("#absNext").show();
  $("#lowerNext").hide();
  $("#upperNext").hide();
  $("#fullNext").hide();
  $("#legsNext").hide();
  $("#glutesNext").hide();
  $("#armsNext").hide();
  player.loadVideoById(abs[0]);
});

$("#legsBtn").on("click", function () {
  $("#player").show();
  $("#legsNext").show();
  $("#lowerNext").hide();
  $("#upperNext").hide();
  $("#absNext").hide();
  $("#fullNext").hide();
  $("#glutesNext").hide();
  $("#armsNext").hide();
  player.loadVideoById(legs[0]);
});

$("#glutesBtn").on("click", function () {
  $("#player").show();
  $("#glutesNext").show();
  $("#lowerNext").hide();
  $("#upperNext").hide();
  $("#absNext").hide();
  $("#legsNext").hide();
  $("#fullNext").hide();
  $("#armsNext").hide();
  player.loadVideoById(glutes[0]);
});

$("#armsBtn").on("click", function () {
  $("#player").show();
  $("#armsNext").show();
  $("#lowerNext").hide();
  $("#upperNext").hide();
  $("#absNext").hide();
  $("#legsNext").hide();
  $("#glutesNext").hide();
  $("#fullNext").hide();
  player.loadVideoById(arms[0]);
});

  $("#fullNext").on("click", function () {
    for (i = 0; i < fullBody.length; i++) {
      player.loadVideoById(fullBody[i])
    };
  });

  $("#lowerNext").on("click", function () {
    for (i = 0; i < lowerBody.length; i++) {
      player.loadVideoById(lowerBody[i])
    };
  });
  $("#upperNext").on("click", function () {
    for (i = 0; i < upperBody.length; i++) {
      player.loadVideoById(upperBody[i])
    };
  });
  $("#absNext").on("click", function () {
    for (i = 0; i < abs.length; i++) {
      player.loadVideoById(abs[i])
    };
  });
  $("#legsNext").on("click", function () {
    for (i = 0; i < legs.length; i++) {
      player.loadVideoById(legs[i])
    };
  });
  $("#glutesNext").on("click", function () {
    for (i = 0; i < glutes.length; i++) {
      player.loadVideoById(glutes[i])
    };
  });
  $("#armsNext").on("click", function () {
    for (i = 0; i < arms.length; i++) {
      player.loadVideoById(arms[i])
    };
  });

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 5000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}



















