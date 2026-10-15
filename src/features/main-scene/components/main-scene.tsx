"use client";

import { useEffect, useRef } from "react";
import { Application, Assets, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const ASSET_ROOT = "/assets";
const cardGrid = [
  ["Sun", "Sun", "Sun", "star", "M2"],
  ["wands", "Prophecy", "star", "pentagram", "star"],
  ["Tower", "cups", "W", "W", "W"],
  ["W", "Tower", "Tower", "W", "star"],
] as const;

const sceneAssets = [
  "loader/bg.png",
  "scene/game_logo.png",
  "scene/cup.png",
  "scene/character.png",
  "scene/table.png",
  "scene/panel.png",
  "scene/bet_button.png",
  "scene/auto_play_button.png",
  "scene/paytable_button.png",
  "scene/music_button.png",
  "scene/sfx_button.png",
  "scene/minus_button.png",
  "scene/plus_button.png",
  ...new Set(cardGrid.flat().map((name) => `cards/${name}.png`)),
];

function addSprite(
  parent: Container,
  asset: string,
  x: number,
  y: number,
  width: number,
  height?: number,
) {
  const sprite = Sprite.from(`${ASSET_ROOT}/${asset}`);
  sprite.position.set(x, y);
  sprite.width = width;
  if (height !== undefined) sprite.height = height;
  parent.addChild(sprite);
}

function addLabel(parent: Container, value: string, x: number, y: number, size: number) {
  const label = new Text({
    text: value,
    style: new TextStyle({
      fill: "#4b1115",
      fontFamily: "Georgia, serif",
      fontSize: size,
      fontWeight: "bold",
      align: "center",
    }),
  });
  label.anchor.set(0.5);
  label.position.set(x, y);
  parent.addChild(label);
}

async function createScene(app: Application) {
  await Assets.load(sceneAssets.map((asset) => `${ASSET_ROOT}/${asset}`));
  const scene = new Container();
  app.stage.addChild(scene);

  addSprite(scene, "loader/bg.png", 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
  scene.addChild(new Graphics().ellipse(965, 470, 680, 570).fill({ color: 0xa06122, alpha: 0.16 }));
  addSprite(scene, "scene/game_logo.png", 65, 137, 330);
  addSprite(scene, "scene/table.png", -10, 665, 535);
  addSprite(scene, "scene/cup.png", 132, 298, 270);

  scene.addChild(
    new Graphics()
      .circle(364, 580, 46)
      .fill({ color: 0x7c1114 })
      .stroke({ width: 7, color: 0x261c1d })
      .stroke({ width: 2, color: 0xe3a63e }),
  );
  const bonus = new Text({
    text: "BONUS",
    style: new TextStyle({
      fill: "#f7c85a",
      stroke: { color: "#3b090a", width: 5 },
      fontFamily: "Georgia, serif",
      fontSize: 21,
      fontWeight: "bold",
    }),
  });
  bonus.anchor.set(0.5);
  bonus.position.set(364, 580);
  scene.addChild(bonus);

  scene.addChild(
    new Graphics()
      .roundRect(477, 47, 910, 923, 10)
      .fill({ color: 0x100d0c, alpha: 0.82 })
      .stroke({ width: 19, color: 0x292524 })
      .stroke({ width: 5, color: 0xbf8440 })
      .roundRect(496, 67, 871, 883, 4)
      .stroke({ width: 3, color: 0xf2bf55 })
      .roundRect(508, 79, 847, 859, 2)
      .stroke({ width: 2, color: 0x73451d }),
  );

  const cardWidth = 126;
  const cardHeight = 196;
  cardGrid.forEach((row, rowIndex) => {
    row.forEach((card, columnIndex) => {
      const x = 536 + columnIndex * 165;
      const y = 85 + rowIndex * 217;
      scene.addChild(
        new Graphics()
          .roundRect(x + 4, y + 6, cardWidth, cardHeight, 5)
          .fill({ color: 0x000000, alpha: 0.38 }),
      );
      addSprite(scene, `cards/${card}.png`, x, y, cardWidth, cardHeight);
    });
  });

  addSprite(scene, "scene/character.png", 1455, 125, 465, 900);
  addSprite(scene, "scene/panel.png", 356, 978, 420, 79);
  addSprite(scene, "scene/panel.png", 827, 978, 557, 79);
  addLabel(scene, "BALANCE\n$1,000.00", 475, 1017, 16);
  addLabel(scene, "BET\n$1.00", 651, 1017, 16);
  addLabel(scene, "TOTAL WIN  $1500", 1100, 1017, 29);
  addSprite(scene, "scene/music_button.png", 100, 943, 60, 60);
  addSprite(scene, "scene/sfx_button.png", 100, 1000, 60, 60);
  addSprite(scene, "scene/paytable_button.png", 166, 955, 98, 98);
  addSprite(scene, "scene/minus_button.png", 1478, 989, 77, 77);
  addSprite(scene, "scene/bet_button.png", 1536, 860, 190, 190);
  addSprite(scene, "scene/auto_play_button.png", 1771, 890, 76, 76);
  addSprite(scene, "scene/plus_button.png", 1740, 989, 77, 77);

  const resize = () => {
    const parent = app.canvas.parentElement;
    if (!parent) return;
    const scale = Math.min(parent.clientWidth / DESIGN_WIDTH, parent.clientHeight / DESIGN_HEIGHT);
    scene.scale.set(scale);
    scene.position.set(
      Math.round((parent.clientWidth - DESIGN_WIDTH * scale) / 2),
      Math.round((parent.clientHeight - DESIGN_HEIGHT * scale) / 2),
    );
    app.renderer.resize(parent.clientWidth, parent.clientHeight);
  };
  const observer = new ResizeObserver(resize);
  if (app.canvas.parentElement) observer.observe(app.canvas.parentElement);
  resize();
  return () => observer.disconnect();
}

export function MainScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let destroyed = false;
    let cleanupScene: (() => void) | undefined;
    const app = new Application();

    const destroy = () => {
      if (destroyed) return;
      destroyed = true;
      cleanupScene?.();
      app.destroy(true, { children: true });
    };

    const mount = async () => {
      await app.init({
        background: "#090707",
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio, 2),
      });
      if (disposed || !hostRef.current) {
        destroy();
        return;
      }
      app.canvas.setAttribute("aria-label", "Arcana game scene");
      hostRef.current.appendChild(app.canvas);
      cleanupScene = await createScene(app);
      hostRef.current.dataset.ready = "true";
      if (disposed) destroy();
    };
    const mountPromise = mount();

    return () => {
      disposed = true;
      void mountPromise.then(destroy);
    };
  }, []);

  return <div ref={hostRef} className="game-scene" data-testid="main-scene" />;
}
