let coords = [];
const els = [];
chart.onclick = (e) => {
  const coord = {x: e.clientX, y: e.clientY};
  movableIndex = coords.length;
  coords.push(coord);
  addEl(coord)
  useData(coords);
}
const keyCodes = {
  backspace: 8,

  h: 72,
  j: 74,
  k: 75,
  l: 76,

  w: 87,
  s: 83
}
let moveSpeed = 1;
window.onkeydown = (e) => {
  console.log(e.keyCode);
  switch(e.keyCode) {
    case keyCodes.backspace: 
      removeEl(els[els.length - 1]);
      coords.pop();
      useData(coords);
      break;

    case keyCodes.h:
      moveMovable(-1, 0);
      break;
    case keyCodes.j:
      moveMovable(0, 1);
      break;
    case keyCodes.k:
      moveMovable(0, -1);
      break;
    case keyCodes.l:
      moveMovable(1, 0);
      break;


    case keyCodes.w:
      moveSpeed *= 1.1;
      break;
    case keyCodes.s:
      moveSpeed /= 1.1;
      break;
  }

}
let movableIndex = 0;
const moveMovable = (x, y) => {
  const el = els[movableIndex];
  const coord = coords[movableIndex];
  coord.x += x * moveSpeed |0;
  coord.y += y * moveSpeed |0;
  el.style.top = coord.y;
  el.style.left = coord.x;

  useData(coords);
}
const addEl = ({x, y}) => {
  const el = document.createElement('div');
  el.className = 'point';
  el.style.top = y;
  el.style.left = x;

  el.onmouseup = () => movableIndex = els.indexOf(el);
  
  els.push(el)
  container.appendChild(el);
}
const removeEl = (el) => {
  container.removeChild(el);
  els.splice(els.indexOf(el), 1);
}
const acceptCoords = (privateCoords) => {
  coords = privateCoords;
  while(els.length > 0)
    removeEl(els[0]);
  coords.forEach(addEl)
}

acceptCoords(
  [{"x":503,"y":403},{"x":499,"y":298},{"x":394,"y":303},{"x":385,"y":408},{"x":421,"y":408},{"x":421,"y":417},{"x":384,"y":419},{"x":380,"y":480},{"x":344,"y":477},{"x":353,"y":327},{"x":234,"y":326},{"x":233,"y":311},{"x":354,"y":311},{"x":373,"y":121},{"x":402,"y":124},{"x":400,"y":133},{"x":409,"y":138},{"x":404,"y":150},{"x":419,"y":171},{"x":435,"y":172},{"x":438,"y":184},{"x":599,"y":169},{"x":595,"y":99},{"x":599,"y":99},{"x":602,"y":126},{"x":647,"y":122},{"x":644,"y":95},{"x":649,"y":94},{"x":652,"y":121},{"x":688,"y":119},{"x":683,"y":58},{"x":648,"y":62},{"x":649,"y":77},{"x":644,"y":78},{"x":643,"y":63},{"x":632,"y":64},{"x":631,"y":57},{"x":682,"y":50},{"x":677,"y":11},{"x":596,"y":21},{"x":598,"y":59},{"x":612,"y":59},{"x":613,"y":66},{"x":598,"y":67},{"x":598,"y":73},{"x":593,"y":73},{"x":589,"y":22},{"x":411,"y":34},{"x":408,"y":54},{"x":378,"y":56},{"x":379,"y":39},{"x":57,"y":58},{"x":57,"y":96},{"x":23,"y":106},{"x":21,"y":160},{"x":58,"y":174},{"x":58,"y":192},{"x":22,"y":206},{"x":23,"y":260},{"x":59,"y":273},{"x":61,"y":309},{"x":162,"y":310},{"x":162,"y":325},{"x":61,"y":323},{"x":61,"y":338},{"x":23,"y":353},{"x":24,"y":406},{"x":59,"y":420},{"x":60,"y":470},{"x":24,"y":481},{"x":24,"y":534},{"x":60,"y":547},{"x":60,"y":601},{"x":23,"y":610},{"x":21,"y":662},{"x":59,"y":673},{"x":58,"y":688},{"x":161,"y":679},{"x":163,"y":696},{"x":59,"y":705},{"x":57,"y":742},{"x":19,"y":752},{"x":16,"y":811},{"x":54,"y":821},{"x":53,"y":838},{"x":14,"y":850},{"x":11,"y":904},{"x":48,"y":918},{"x":49,"y":938},{"x":315,"y":921},{"x":327,"y":686},{"x":231,"y":692},{"x":228,"y":676},{"x":329,"y":668},{"x":339,"y":552},{"x":372,"y":556},{"x":372,"y":596},{"x":610,"y":562},{"x":652,"y":554},{"x":652,"y":509},{"x":612,"y":497},{"x":609,"y":472},{"x":649,"y":463},{"x":652,"y":406},{"x":612,"y":406},{"x":492,"y":414},{"x":491,"y":404}]
)



// line render
const I = Infinity;

const useData = (data) => {
  console.log(JSON.stringify(data));
  const edges = data.reduce((edges, { x, y }) => ({
    x: Math.min(x, edges.x),
    y: Math.min(y, edges.y),
    X: Math.max(x, edges.X),
    Y: Math.max(y, edges.Y)
  }), { x: I, y: I, X: -I, Y: -I });

  const coords = data.map(({ x, y }) => ({ x: x - edges.x, y: y - edges.y }));
  const w = c.width = edges.X - edges.x;
  const h = c.height = edges.Y - edges.y;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#eee';
  ctx.beginPath();
  coords.forEach(({ x, y }, i) => {
    ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
  })
  ctx.closePath();
  ctx.stroke();
}
useData(coords);
