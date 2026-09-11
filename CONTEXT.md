# Game Hub

A free-hosted directory site that links out to independently deployed games. The Hub itself contains no game logic — it lists games and points to where each one lives.

## Language

**Hub**:
The static site (this repo) that lists all Games as a browsable directory and links to each one's own deployed URL.
_Avoid_: Site, portal (when meaning specifically this listing page)

**Game**:
A standalone playable project, deployed and hosted independently of the Hub (its own repo, its own Firebase/GitHub Pages deployment). The Hub only holds a reference to it, never its code.
_Avoid_: Project (too generic), App

**Game entry**:
The Hub's record for one Game: its metadata (name, link, description, thumbnail, tags, status) stored in the Hub's data file. Distinct from the Game itself, which is the deployed thing being pointed to.
_Avoid_: Listing (ambiguous with the page as a whole)

**Status** (of a Game entry):
One of `live`, `in-progress`, or `prototype` — signals how finished/playable a Game currently is, set by hand in the Game entry.

## Relationships

- **Hub ↔ Game**: one-directional reference only. The Hub fetches its data file and renders links; it never builds, hosts, or embeds a Game's code.
