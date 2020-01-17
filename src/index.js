const Tone = require("tone");
import * as p5 from "p5";
import { notes, duration } from "./score";
import VolumeLevel from "./volume_level";
import PlayerIcon from "./player_icon";
import {
  notesAdur2score,
  hsl2color,
  Color2RGBstring,
  levelsetmax,
  levelsetmin,
  note2number,
  calcvols
} from "./tools";

//主に動作させるバーの番号設定、tone.jsとp5.jsの間で、
let target = null;

//利用者の操作状況ステータス
let played = false;

//分離した音程と音の長さのパラメーターを構成
const score = notesAdur2score(notes, duration);

const BPM = 220;

const loop = 0;

//実際に音が再生されているか
let nowplayback = false;

Tone.Transport.bpm.value = BPM; // BPMを220に設定

//音の種類を設定
var syn = new Tone.PolySynth().toMaster();

// メロディをシーケンス制御の内容を定義
let melody = new Tone.Sequence((time, { note, dur }) => {
  // 音を鳴らす。
  syn.triggerAttackRelease(note, dur, time, 0.3);

  //鳴らした音に基づいて描画用のパラメータを与える。
  if (note != null) {
    target = note2number(note, min);
  }
  nowplayback = true;
}, score).start();

melody.loop = loop; // ループを回数設定

setInterval(() => {
  if (Tone.Transport.state == "started" && nowplayback == false) {
    soundstop();
  }
  nowplayback = false;
}, 2000);

// 音域の最小値、最大値の設定
const max = levelsetmax(notes);
const min = levelsetmin(notes);

//バーの本数設定
const hon = 7 * (max - min + 1);

//再生開始
const soundstart = () => {
  Tone.Transport.start();
  played = true;
};

//再生停止
const soundstop = () => {
  Tone.Transport.stop();
  played = false;
};

const sketch = p => {
  //canvasのサイズ設定
  const w = 400;
  const h = 400;

  //再生、停止ボタンの応答範囲サイズ
  const reactionAreaSize = 50;

  //バー
  const vols = [];

  //再生ボタン
  let player_icon = null;

  p.setup = () => {
    // キャンバス作成
    p.createCanvas(w, h).parent("canvas-area");

    //背景を設定
    p.background("#111");

    //バーの位置、角度を設定
    for (let i = 0; i < hon; i++) {
      const x = 200 + Math.sin(((360 / hon) * i * Math.PI) / 180) * 180;
      const y = 200 + Math.cos(((360 / hon) * i * Math.PI) / 180) * 180;
      const t = ((-360 / hon) * i * Math.PI) / 180 + Math.PI;
      vols.push(
        new VolumeLevel(
          p,
          x,
          y,
          t,
          Color2RGBstring(hsl2color((360 / hon) * i, 90, 50))
        )
      );
    }
    player_icon = new PlayerIcon(p, 205, 200);
  };

  p.draw = () => {
    //背景を更新
    p.background("rgba(16,16,16, 0.4)");

    let addvols = null;
    //targetに値の定義があったとき、各バーの変位量を設定
    if (target != null) {
      addvols = calcvols(target, hon, 170);
    }
    //各バーの表示を更新
    vols.forEach((vol, index) => {
      if (target != null) {
        vol.update(addvols[index]);
      } else {
        vol.update();
      }
      vol.display();
    });

    //パラメータをリセット
    target = null;

    //再生ボタンの表示更新
    player_icon.update(played);
    player_icon.display();
  };
  p.mouseClicked = () => {
    //中央をクリックしたときに反応させる
    if (
      w / 2 - reactionAreaSize < p.mouseX &&
      p.mouseX < w / 2 + reactionAreaSize &&
      h / 2 - reactionAreaSize < p.mouseY &&
      p.mouseY < h / 2 + reactionAreaSize
    ) {
      if (!played) {
        soundstart();
      } else {
        soundstop();
      }
    }
  };
};

//p5をsketchを基に実体化
new p5(sketch);
