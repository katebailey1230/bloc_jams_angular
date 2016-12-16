(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
          /**
          * @desc gets the object populated with the current album information
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
         
          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         
         var getSongIndex = function(song) {
         return currentAlbum.songs.indexOf(song);
         };
         
         SongPlayer.currentSong = null;
         /**
        * @desc Buzz object audio file
        * @type {Object}
        */
            
            var stopSong = function(song){
                currentBuzzObject.stop();
                song.playing = null;
            };
            var setSong = function(song) {
                if (currentBuzzObject) {
                stopSong(song);
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
            });
 
          SongPlayer.currentSong = song;
          };
         
        SongPlayer.currentSong = null;
            
            var playSong = function(song){
                currentBuzzObject.play();
                song.playing = true;
            };

          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
                if (SongPlayer.currentSong !== song) {
                setSong(song);  
                playSong(song);
                }
            else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 playSong(song);
             }
            }
        };
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--; 
            if (currentSongIndex < 0) {
                stopSong(song);
            }
            else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
       };
        SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex < 0) {
             stopSong(song);
            } 
            else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
        };

     return SongPlayer;
         
}
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
