function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function renderCard(game) {
  const card = document.createElement("article");
  card.className = "game-card";
  card.id = slugify(game.name);

  const thumb = document.createElement("div");
  thumb.className = "game-thumb";
  if (game.thumbnail) {
    const img = document.createElement("img");
    img.src = game.thumbnail;
    img.alt = "";
    thumb.appendChild(img);
  } else {
    thumb.textContent = game.name.charAt(0).toUpperCase();
  }
  card.appendChild(thumb);

  const body = document.createElement("div");
  body.className = "game-body";

  const title = document.createElement("h2");
  const link = document.createElement("a");
  link.href = game.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = game.name;
  title.appendChild(link);
  body.appendChild(title);

  if (game.description) {
    const desc = document.createElement("p");
    desc.className = "game-description";
    desc.textContent = game.description;
    body.appendChild(desc);
  }

  const hasStatus = Boolean(game.status);
  const hasTags = Array.isArray(game.tags) && game.tags.length > 0;
  if (hasStatus || hasTags) {
    const meta = document.createElement("div");
    meta.className = "game-meta";
    if (hasStatus) {
      const status = document.createElement("span");
      status.className = "status-badge";
      status.textContent = game.status;
      meta.appendChild(status);
    }
    if (hasTags) {
      for (const tag of game.tags) {
        const tagEl = document.createElement("span");
        tagEl.className = "tag";
        tagEl.textContent = tag;
        meta.appendChild(tagEl);
      }
    }
    body.appendChild(meta);
  }

  card.appendChild(body);
  return card;
}

async function loadGames() {
  const grid = document.getElementById("game-grid");
  const emptyState = document.getElementById("empty-state");
  const errorState = document.getElementById("error-state");

  try {
    const response = await fetch("games.json");
    if (!response.ok) throw new Error(`Failed to fetch games.json: ${response.status}`);
    const games = await response.json();

    if (!Array.isArray(games) || games.length === 0) {
      emptyState.hidden = false;
      return;
    }

    for (const game of games) {
      grid.appendChild(renderCard(game));
    }
  } catch (err) {
    console.error(err);
    errorState.hidden = false;
  }
}

loadGames();
