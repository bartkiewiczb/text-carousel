const { Random } = require("random-js");
const random = new Random(); // uses the nativeMath engine

const kabong = require('./sfx/kabong.mp3');
const bonk = require('./sfx/bonk.mp3');
const sproing = require('./sfx/sproing.mp3');
const jojobane = require('./sfx/jojobane.mp3');
const boink = require('./sfx/boink.mp3');
const DP_08 = require('./sfx/DP_08.mp3');
const DP_14 = require('./sfx/DP_14.mp3');
const kirbStarRide = require('./sfx/kirbStarRide.mp3');
const kirbTreasure = require('./sfx/kirbTreasure.mp3');
const Newtype1 = require('./sfx/Newtype1.mp3');
const profiling = require('./sfx/profiling.mp3');
const Votoms = require('./sfx/Votoms.mp3');
const ZakuEye = require('./sfx/ZakuEye.mp3');
const PW1Save = require('./sfx/PW1Save.mp3');
const PW2Save = require('./sfx/PW2Save.mp3');
const PW3Save = require('./sfx/PW3Save.mp3');
const SunsetRiders = require('./sfx/SunsetRiders.mp3');
const KonamiLogo = require('./sfx/KonamiLogo.mp3');
const Gunbuster = require('./sfx/GunbusterEyecatch.mp3');
const GGundamEpCard = require('./sfx/GGundamEpCard.mp3');
const CapcomLogo = require('./sfx/CapcomLogo.mp3');
const KatamariFanfare = require('./sfx/KatamariFanfare.mp3');
const GTJingle = require('./sfx/GTJingle.mp3');
const VOGetReady = require('./sfx/VOGetReady.mp3');

const audios = [
    new Audio(bonk),
    new Audio(kabong),
    new Audio(sproing),
    new Audio(jojobane),
    new Audio(boink),
    new Audio(DP_08),
    new Audio(DP_14),
    new Audio(kirbStarRide),
    new Audio(kirbTreasure),
    new Audio(Newtype1),
    new Audio(profiling),
    new Audio(Votoms),
    new Audio(ZakuEye),
    new Audio(PW1Save),
    new Audio(PW2Save),
    new Audio(PW3Save),
    new Audio(SunsetRiders),
    new Audio(KonamiLogo),
    new Audio(Gunbuster),
    new Audio(GGundamEpCard),
    new Audio(CapcomLogo),
    new Audio(KatamariFanfare),
    new Audio(GTJingle),
    new Audio(VOGetReady),
];

function playSound() {
    let audio1 = random.pick(audios);
    audio1.play();
    console.log("audio call");
}

export default playSound;
