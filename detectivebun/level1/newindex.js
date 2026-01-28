/**
 * Name: newindex.js
 * Author: Madison Kekic
 * Creates first level of game
 * Draws game elements- ground, platforms, player
 * Implements core game mechanics- continuous movement, jumping, gravity, and collision detection
 */

//--ASSETS--//

const playerSprite = new Image();
playerSprite.src = "../sprites/bunnyright.png";

//--CANVAS--//
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

//--MAP DATA--//

const layersData = {
  l_sky: l_sky,
  l_hills: l_hills,
  l_platform: l_platform,
  l_bushes: l_bushes,
  l_tree: l_tree,
  l_houses: l_houses,
  l_spikes: l_spikes,
  l_ladder: l_ladder,
  l_gems: l_gems,
  l_cavedecor: l_cavedecor,
  l_cherry: l_cherry,
  l_fire: l_fire,
  l_end_block: l_end_block,
  l_collision: l_collision,
};

// ⭐ NEW: Explicit layer order (back → front)
const layerOrder = [
  "l_sky",
  "l_hills",
  "l_bushes",
  "l_tree",
  "l_houses",
  "l_platform",
  "l_spikes",
  "l_ladder",
  "l_gems",
  "l_cavedecor",
  "l_cherry",
  "l_fire",
  "l_end_block",
  "l_collision" // usually invisible, but last so it doesn't overwrite visuals
];

const tilesets = {
  l_sky: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_hills: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_platform: { imageUrl: './images/tileset.png', tileSize: 16 },
  l_bushes: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_tree: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_houses: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_spikes: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_ladder: { imageUrl: './images/tileset.png', tileSize: 16 },
  l_gems: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_cavedecor: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_cherry: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_fire: { imageUrl: './images/tileset.png', tileSize: 16 },
  l_end_block: { imageUrl: './images/decorations.png', tileSize: 16 },
  l_collision: { imageUrl: './images/tileset.png', tileSize: 16 },
};

//--DRAWING MAP--//
const loadedTilesets = {};

function loadTilesets(tilesets) {
  const promises = Object.keys(tilesets).map(key => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = tilesets[key].imageUrl;
      img.onload = () => {
        loadedTilesets[key] = img;
        resolve();
      };
    });
  });

  return Promise.all(promises);
}


function drawLayer(layerName, layerData) {
  const tileset = tilesets[layerName];
  const img = loadedTilesets[layerName];
  const tileSize = tileset.tileSize;

  const tilesPerRow = Math.floor(img.width / tileSize);
  const totalTiles = tilesPerRow * Math.floor(img.height / tileSize);

  for (let y = 0; y < layerData.length; y++) {
    for (let x = 0; x < layerData[y].length; x++) {
      const tileIndex = layerData[y][x];

      if (tileIndex === -1 || tileIndex === 0) continue;

      // ✅ Safety check: skip out-of-bounds tile indices
      if (tileIndex >= totalTiles) {
        console.warn(`Skipping tileIndex ${tileIndex} in layer ${layerName} — exceeds tileset capacity`);
        continue;
      }

      const sx = (tileIndex % tilesPerRow) * tileSize;
      const sy = Math.floor(tileIndex / tilesPerRow) * tileSize;

      // ✅ Debug log: show tile index and position
      console.log(`Drawing tile ${tileIndex} from (${sx}, ${sy}) to (${x * tileSize}, ${y * tileSize}) in layer ${layerName}`);

      ctx.drawImage(
        img,
        sx, sy, tileSize, tileSize,
        x * tileSize, y * tileSize, tileSize, tileSize
      );
    }
  }
}

// ⭐ UPDATED: draw layers in correct order
function drawMap() {
  for (const layerName of layerOrder) {
    drawLayer(layerName, layersData[layerName]);
  }
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  requestAnimationFrame(gameLoop);
}

// INITIALIZE GAME
(async function initGame() {
  console.log("Loading tilesets...");
  await loadTilesets(tilesets);
  console.log("Tilesets loaded. Starting game.");
  gameLoop();
})();
