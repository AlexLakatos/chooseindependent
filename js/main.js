(function() {
    var embedcodeElem = document.getElementById('embedcode');

    document.webL10n.ready(function() {
        var topVideoUrlConfig = {
            en: 'https://www.youtube.com/watch?v=LtOGa5M8AuU',
            de: 'https://www.youtube.com/watch?v=q8r3HyMnZrQ',
            pt: 'https://www.youtube.com/watch?v=q7d7m_4X8tg'
        },
        topVideoUrlConfigEmbed = {
            en: 'https://www.youtube.com/embed/LtOGa5M8AuU?enablejsapi=1&controls=0&showinfo=0',
            de: 'https://www.youtube.com/embed/q8r3HyMnZrQ?enablejsapi=1&controls=0&showinfo=0',
            pt: 'https://www.youtube.com/embed/q7d7m_4X8tg?enablejsapi=1&controls=0&showinfo=0'
        },
        topVideoUrl = topVideoUrlConfig.en,
        topVideoUrlSrc = topVideoUrlConfigEmbed.en,
        videoUrl = 'https://www.youtube.com/watch?v=j6pwTk4D8WI',
        shareDescr = document.webL10n.get('share-description'),
        encodedDescr = shareDescr.replace(/#/g, '%23'),
        lang = document.webL10n.getLanguage().substring(0, 2),
        langDropdown = document.getElementById('language'),
        topvideo = document.getElementById('topvideo'),
        embedcodePrefix = '<iframe height="315" src="',
        embedcodeSuffix = '" frameborder="0" allowfullscreen></iframe>';

        function changeTopVideoLanguage(normal, embed) {
            topVideoUrl = normal,
            topVideoUrlSrc = embed,
            topvideo.src = topVideoUrlSrc;
            embedcodeElem.textContent = embedcodePrefix + embed + embedcodeSuffix;
        }

        if(lang=="en") {
            changeTopVideoLanguage(topVideoUrlConfig.en, topVideoUrlConfigEmbed.en);
        }
        if(lang=="es") {
            langDropdown.value="es";
            changeTopVideoLanguage(topVideoUrlConfig.en, topVideoUrlConfigEmbed.en);
        }
        if(lang=="de") {
            langDropdown.value="de";
            changeTopVideoLanguage(topVideoUrlConfig.de, topVideoUrlConfigEmbed.de);
        }
        if(lang=="pt") {
            langDropdown.value="pt-BR";
            changeTopVideoLanguage(topVideoUrlConfig.pt, topVideoUrlConfigEmbed.pt);
        }
        if(lang=="bn") {
            langDropdown.value="bn-BD";
            changeTopVideoLanguage(topVideoUrlConfig.en, topVideoUrlConfigEmbed.en);
        }
        if(lang=="ur") {
            langDropdown.value="ur";
            changeTopVideoLanguage(topVideoUrlConfig.en, topVideoUrlConfigEmbed.en);
        }

        function getShareOptions(url) {
            var options = {
                width: '110px',
                title: document.webL10n.get('share-title'),
                url: url,
                description: shareDescr,
                ui: {
                    button_text: document.webL10n.get('share'),
                },
                networks: {
                    twitter: {
                        description: encodedDescr
                    },
                    facebook: {
                        description: encodedDescr
                    },
                    email: {
                        description: shareDescr + url
                    },
                    pinterest: {
                        enabled: false
                    },
                    google_plus: {
                        enabled: false
                    }
                }
            }
            return options;
        }

        var topVideoSharer = new Share('.share-button-top', getShareOptions(topVideoUrl)),
            bottomVideoSharer = new Share('.share-button-bottom', getShareOptions(videoUrl));

        smoothScroll.init({
            speed: 700,
            easing: 'easeInOutCubic'
        });
    }, false);

    var usingThisLink = document.getElementById('usingThisLink');
    usingThisLink.addEventListener('click', function() {
        var isHidden = embedcodeElem.hasAttribute('hidden');
        console.log(isHidden);
        if (isHidden) {
            embedcodeElem.removeAttribute('hidden');
        }
        else {
            embedcodeElem.setAttribute('hidden', 'hidden');
        }
        return false;
    });

    $('#tabzilla').on('click', function() {
      ga('send', 'event', 'link', 'click', 'tabzilla');
    });
    $('a[href="#online"]').on('click', function() {
      ga('send', 'event', 'link', 'click', 'online');
    });
    $('a[href="#offline"]').on('click', function() {
      ga('send', 'event', 'link', 'click', 'offline');
    });
    $('#download-avatar').on('click', function() {
      ga('send', 'event', 'link', 'click', 'download-avatar');
    });
    $('#firefox-affiliate').on('click', function() {
      ga('send', 'event', 'link', 'click', 'firefox-affiliate');
    });
    $('#download-wallpapers').on('click', function() {
      ga('send', 'event', 'link', 'click', 'download-wallpapers');
    });
    $('#firefox-badge').on('click', function() {
      ga('send', 'event', 'link', 'click', 'firefox-badge');
    });
    $('#download-signs').on('click', function() {
      ga('send', 'event', 'link', 'click', 'download-signs');
    });
    $('.offline-video').delegate('li','click', function() {
      var type = $(this).data('networks');
      if (type == 'twitter') {
        ga('send', 'event', 'li', 'click', 'offline-video-twitter');
      } else if (type == 'facebook') {
        ga('send', 'event', 'li', 'click', 'offline-video-facebook');
      } else if (type == 'email') {
        ga('send', 'event', 'li', 'click', 'offline-video-email');
      }
    });
    $('.tenyears-video').delegate('li','click', function() {
      var type = $(this).data('networks');
      if (type == 'twitter') {
        ga('send', 'event', 'li', 'click', 'tenyears-video-twitter');
      } else if (type == 'facebook') {
        ga('send', 'event', 'li', 'click', 'tenyears-video-facebook');
      } else if (type == 'email') {
        ga('send', 'event', 'li', 'click', 'tenyears-video-email');
      }
    });
	
	
	var s = document.createElement("script");
	s.src = "https://www.youtube.com/player_api"; /* Load Player API*/
	var before = document.getElementsByTagName("script")[0];
	before.parentNode.insertBefore(s, before);
	
}());



function topVideoGA(event) {
    if (event.data == YT.PlayerState.PLAYING) {
		ga('send', 'event', 'ChooseIndependentVideo', 'clicked');
    }
	if (event.data == YT.PlayerState.ENDED) {
		ga('send', 'event', 'ChooseIndependentVideo', 'watched');
	}
}
function bottomVideoGA(event) {
    if (event.data == YT.PlayerState.PLAYING) {
		ga('send', 'event', 'FX10Video', 'clicked');
    }
	if (event.data == YT.PlayerState.ENDED) {
		ga('send', 'event', 'FX10Video', 'watched');
	}
}

var player1, player2;
function onYouTubeIframeAPIReady(event) {
        player1 = new YT.Player('topvideo', {
          events: {
            'onStateChange': topVideoGA
          }
        });   
		
        player2 = new YT.Player('bottomvideo', {
          events: {
            'onStateChange': bottomVideoGA
          }
        });		
}