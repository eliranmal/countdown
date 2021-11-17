# countdown

![countdown banner][countdown-repo-banner]


## overview

countdown is a [song][countdown-spotify] by [john coltrane][jc-website], but also a backwards counting timer app (this one!).

the timer has an accurate implementation that ~fights~ ignores the inherent time drift javascript timers has, and is designed to keep going even if the page is refreshed or the tab is closed.

it's built using [react.js][reactjs-website], and deployed with the help of [gh-pages][gh-pages-repo].

this project is part of my [job application][job-application-image] process at [redhat][redhat-website].


## development

### prerequisites

- [node.js][node-js-website]

### setup

- clone this repository locally
- install dependencies and run the development server:

      npm i
      npm start


### workflow

this project was bootstrapped with [create-react-app][create-react-app-website], so all development workflows are executed via [npm commands][npm-commands-docs], by running `npm run [command]`.
besides the [commands available out of the box][create-react-app-scripts] (`start`, `test` and `build`), it has the additional following ones:

- **`deploy`** - builds the project and uploads the artifact to github.io.
- **`serve`** - builds the project and launches a local node.js server.


## attribution

icons grabbed from [dryicons][icons-attribution].



[countdown-repo-banner]: /src/images/banner.png
[job-application-image]: /assets/redhat-job-application-process.png

[countdown-spotify]: https://open.spotify.com/album/4jTDjHLMFCHWrjuP1qmCf4?highlight=spotify:track:7aubHMiL85lZyppYOOwbwu
[jc-website]: https://www.johncoltrane.com/
[redhat-website]: https://www.redhat.com/en
[reactjs-website]: https://reactjs.org/
[gh-pages-repo]: https://github.com/tschaub/gh-pages
[node-js-website]: https://nodejs.org/en/
[create-react-app-website]: https://create-react-app.dev/
[create-react-app-scripts]: https://create-react-app.dev/docs/available-scripts
[npm-commands-docs]: https://docs.npmjs.com/cli/v7/commands
[icons-attribution]: https://dryicons.com/free-icons/player-button
