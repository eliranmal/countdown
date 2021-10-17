(this.webpackJsonpcountdown=this.webpackJsonpcountdown||[]).push([[0],{14:function(n,t,e){},15:function(n,t,e){},17:function(n,t,e){"use strict";e.r(t);var r=e(1),i=e.n(r),a=e(9),o=e.n(a),u=(e(14),e(3)),c=e(6),s=e(4),l=e(8),d=e.n(l),p=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign(n,t)},f=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.direction,e=void 0===t?"up":t,r=n.duration,i=void 0===r?3e4:r,a=(n.threshold,arguments.length>1?arguments[1]:void 0),o=arguments.length>2?arguments[2]:void 0,u=null!==a&&void 0!==a?a:{},c=null!==o&&void 0!==o?o:[],s=function(n){return u=n},l=function(n){return p(u,n)},d=function(n){return c=n},f=function(){return c.filter((function(n){return"lap"===n.type})).map((function(n){return n.timestamp}))},g=function(){var n;return null!==(n=c)&&void 0!==n?n:[]},v=function(){var n;return null!==(n=u)&&void 0!==n?n:{}},m=f,h=function(){return c.filter((function(n){var t=n.type;return["start","stop","pause","resume"].includes(t)})).reduce((function(n,t,e,r){var i,a=t.timestamp,o=t.type,c=null!==(i=r[e-1])&&void 0!==i?i:{},s=c.timestamp,l=c.type;return!u.running||u.paused||r[e+1]?"pause"!==o&&"stop"!==o||"start"!==l&&"resume"!==l||(n+=a-s):n+=Date.now()-a,n}),0)},j=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h();return"up"===e?n:i-n},b=function(){var n=j(),t=function(t,e){return function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return"".concat(n).padStart(t,"0")}(Math.abs(Math[n<0?"ceil":"floor"](t)),e)};return"".concat(n<0?"-":" ").concat([t(n/1e3/60/60),t(n/1e3/60),t(n/1e3),t(n%1e3,3)].join(":")," ")},O=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){return 1};return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();t(r),e()&&c.push({type:n,timestamp:r})}},w=O("start",(function(n){return!u.running&&l({running:!0})})),x=O("pause",(function(){return u.running&&!u.paused&&l({paused:!0})})),A=O("resume",(function(){return u.paused&&u.paused&&l({paused:!1})})),S=O("stop",(function(n){return u.running&&l({running:!1})})),y=O("lap",void 0,(function(){return u.running&&!u.paused})),E=function(){return!u.running&&s({})&&d([])};return{start:w,pause:x,resume:A,stop:S,lap:y,clear:E,getState:v,getLaps:m,getEvents:g,getEllapsedTime:j,getEllapsedTimeString:b}},g=(e(15),e(0));var v=function(){var n=d()("timer-state",{}),t=Object(s.a)(n,2),e=t[0],i=t[1],a=d()("timer-events",[]),o=Object(s.a)(a,2),l=o[0],p=o[1],v=f({direction:"down",duration:1e4,threshold:1e4},e,l),m=Object(r.useState)(v.getLaps()),h=Object(s.a)(m,2),j=h[0],b=h[1],O=Object(r.useState)(v.getEllapsedTimeString()),w=Object(s.a)(O,2),x=w[0],A=w[1],S=function(){i(Object(c.a)(Object(c.a)({},e),v.getState())),p(Object(u.a)(v.getEvents()))},y=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:S;return Object(g.jsx)("button",{title:n,className:"App-button-".concat(n),onMouseDown:function(){v[n](),t()}})};return Object(r.useEffect)((function(){var n=window.requestAnimationFrame((function t(){A(v.getEllapsedTimeString()),e.running&&!e.paused&&(n=window.requestAnimationFrame(t))}));return function(){window.cancelAnimationFrame(n)}}),[e.running,e.paused]),Object(g.jsxs)("div",{className:"App",children:[Object(g.jsx)("header",{className:"App-header",children:Object(g.jsx)("h1",{className:"App-title",children:"countdown"})}),Object(g.jsxs)("main",{className:"App-main",children:[Object(g.jsx)("pre",{className:"App-time-display",children:x}),Object(g.jsxs)("nav",{className:"App-controls",children:[y(e.running?e.paused?"resume":"pause":"start"),y("stop"),y("lap",(function(){S(),b(Object(u.a)(v.getLaps()))})),y("clear",(function(){i(Object(c.a)({},v.getState())),p(Object(u.a)(v.getEvents())),b(Object(u.a)(v.getLaps()))}))]}),Object(g.jsx)("code",{className:"App-laps-display",children:(j||[]).map((function(n,t){return Object(g.jsx)("p",{children:n},t)}))})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var m=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,18)).then((function(t){var e=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;e(n),r(n),i(n),a(n),o(n)}))};o.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(v,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)})),m()}},[[17,1,2]]]);
//# sourceMappingURL=main.20b87f77.chunk.js.map