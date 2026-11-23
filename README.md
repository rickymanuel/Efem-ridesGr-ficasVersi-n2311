# Graphical Astrological Ephemeris — Orbits

Free educational / awareness project: ephemeris charts and a visualization of the Moon's orbit
(Lilith/apogee, Selene/perigee, lunar nodes) against the ecliptic. No ads, no tracking, no commercial use.

## License

This project is free software under the **GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)**.
The full license text is in the `LICENSE` file. If you use this app over the web, the complete source code
is available at the link shown in the app (menu → *About & Licenses*) and in this repository.

## Third-party components

| Component | License | Notes |
|---|---|---|
| [Swiss Ephemeris](https://www.astro.com/swisseph/) © Astrodienst AG, with its ephemeris data files (`wasm/swisseph.data`) | AGPL or Swiss Ephemeris Professional License (this project uses the AGPL option) | Swiss Ephemeris Inside |
| Swiss Ephemeris WebAssembly wrapper (`src/swisseph.js`, `wasm/`) by prolaxu | GPL-3.0-or-later | Compatible with AGPL-3.0 |
| [Chart.js](https://www.chartjs.org/) and chartjs-plugin-zoom | MIT | Loaded from a CDN |

All symbols, drawings and the user interface are original work by the author of this project.

Positions are calculated for educational purposes and come without any warranty.
