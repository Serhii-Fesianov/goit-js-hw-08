import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const CURRENT_TIME_KEY = 'videoplayer-current-time';

const player = new Player(iframe);

const onPlay = function (data) {
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem(CURRENT_TIME_KEY);
if (currentTime) {
  player.setCurrentTime(currentTime);
}
