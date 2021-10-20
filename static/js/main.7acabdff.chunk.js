(this.webpackJsonpcountdown=this.webpackJsonpcountdown||[]).push([[0],{21:function(e,n,t){},46:function(e,n,t){},48:function(e,n,t){var r={"./cog.svg":[52,3],"./eject.svg":[53,4],"./io.svg":[54,5],"./pause.svg":[55,6],"./play.svg":[56,7],"./rotate.svg":[57,8],"./stop.svg":[58,9]};function a(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],a=n[0];return t.e(n[1]).then((function(){return t(a)}))}a.keys=function(){return Object.keys(r)},a.id=48,e.exports=a},49:function(e,n,t){},50:function(e,n,t){"use strict";t.r(n);var r=t(2),a=t.n(r),i=t(13),c=t.n(i),o=(t(21),t(7)),s=t(5),u=t(3),l=t(4),d=t(9),p=t.n(d),m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};Object(r.useEffect)((function(){var n=function(n){var t=n.keyCode;return e({code:t})};return document.addEventListener("keydown",n),function(){document.removeEventListener("keydown",n)}}))},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return 1},t=arguments.length>2?arguments[2]:void 0;Object(r.useEffect)((function(){var t=window.requestAnimationFrame((function r(){e(),n()||(t=window.requestAnimationFrame(r))}));return function(){window.cancelAnimationFrame(t)}}),t)},g=function(e,n){var t=b(e),r=t.hours,a=t.minutes,i=t.seconds,c=t.milliseconds;return"".concat(n?e<0?"-":" ":"").concat([r,a,i].join(":"),".").concat(c).concat(n?" ":"")},b=function(e){var n=function(n,t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return"".concat(e).padStart(n,"0")}(Math.abs(Math[e<0?"ceil":"floor"](n)),t)};return{hours:n(e/1e3/60/60),minutes:n(e/1e3/60%60),seconds:n(e/1e3%60),milliseconds:n(e%1e3,3)}},v=function(e){return 60*e.hours*60*1e3+60*e.minutes*1e3+1e3*e.seconds+e.milliseconds},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign(e,n)},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.direction,t=void 0===n?"up":n,r=e.duration,a=void 0===r?3e4:r,i=(e.threshold,arguments.length>1?arguments[1]:void 0),c=arguments.length>2?arguments[2]:void 0,o=null!==i&&void 0!==i?i:{},s=null!==c&&void 0!==c?c:[],u=function(e){return o=e},l=function(e){return h(o,e)},d=function(e){return s=e},p=function(){return s.reduce((function(e,n,t,r){var a,i=n.type,c=n.timestamp,o=null!==(a=r[t-1])&&void 0!==a?a:{},s=o.type,u=o.timestamp;return"lap"===s&&["lap","stop","pause"].includes(i)&&e.push({endTime:c,startTime:u,duration:c-u}),e}),[])},m=function(){var e;return null!==(e=s)&&void 0!==e?e:[]},f=function(){var e;return null!==(e=o)&&void 0!==e?e:{}},b=p,v=function(){return s.filter((function(e){var n=e.type;return["start","stop","pause","resume"].includes(n)})).reduce((function(e,n,t,r){var a,i=n.timestamp,c=n.type,s=null!==(a=r[t-1])&&void 0!==a?a:{},u=s.timestamp,l=s.type;return!o.running||o.paused||r[t+1]?"pause"!==c&&"stop"!==c||"start"!==l&&"resume"!==l||(e+=i-u):e+=Date.now()-i,e}),0)},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v();return"up"===t?e:a-e},O=function(){return g(j(),!0)},w=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){return 1};return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();n(r),t()&&s.push({type:e,timestamp:r})}},x=w("start",(function(e){return!o.running&&l({running:!0})})),y=w("pause",(function(){return o.running&&!o.paused&&l({paused:!0})})),A=w("resume",(function(){return o.paused&&o.paused&&l({paused:!1})})),N=w("stop",(function(e){return o.running&&l({running:!1})})),k=w("lap",void 0,(function(){return o.running&&!o.paused})),E=function(){o.running&&!o.paused&&"lap"===(s[s.length-1]||{}).type&&s.pop()},S=function(){return!o.running&&u({})&&d([])};return{start:x,pause:y,resume:A,stop:N,lap:k,abortLap:E,clear:S,getState:f,getLaps:b,getEvents:m,getEllapsedTime:j,getEllapsedTimeString:O}},O=t(6),w=t.n(O),x=t(12),y=w.a.mark(k),A=["red","pink","purple","deepPurple","indigo","blue","lightBlue","cyan","teal","green","lightGreen","lime","yellow","amber","orange","deepOrange","brown","grey","blueGrey"],N=["300","400","500","600","700","800","900","A100"];function k(){var e,n,t,r,a,i,c;return w.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:e=0,n=0,t=N;case 2:if(!(n<t.length)){o.next=16;break}r=t[n],a=0,i=A;case 5:if(!(a<i.length)){o.next=13;break}return c=i[a],e++,o.next=10,x[c][r];case 10:a++,o.next=5;break;case 13:n++,o.next=2;break;case 16:return o.abrupt("return",e);case 17:case"end":return o.stop()}}),y)}var E=function(){var e;return(e=[]).concat.apply(e,Object(s.a)(N.map((function(e){return A.map((function(n){return x[n][e]}))}))))}(),S=k(),L=t(14),T=(t(15),t(16)),z=(t(46),t(1)),F=["name","color","size"],D=function(e){var n=e.name,t=e.color,a=e.size,i=void 0===a?"24px":a,c=Object(T.a)(e,F),o=Object(r.useRef)(null),s=Object(r.useState)(!1),d=Object(l.a)(s,2),p=d[0];d[1];if(Object(r.useEffect)((function(){}),[n]),!p&&o.current){var m=!0===t?S.next():t||"var(--redhat)",f=o.current;return Object(z.jsx)(f,Object(u.a)({className:"cd-icon",width:i,height:i,stroke:m,fill:m},c))}return Object(z.jsx)(z.Fragment,{children:"$nbsp;"})};t(49);var C=function(){var e,n=p()("timer-threshold",{hours:0,minutes:0,seconds:3,milliseconds:45}),t=Object(l.a)(n,2),a=t[0],i=t[1],c=p()("timer-duration",{hours:0,minutes:0,seconds:12,milliseconds:345}),d=Object(l.a)(c,2),b=d[0],h=d[1],O=p()("timer-state",{}),w=Object(l.a)(O,2),x=w[0],y=w[1],A=p()("timer-events",[]),N=Object(l.a)(A,2),k=N[0],S=N[1],T=j({direction:"down",duration:v(b),threshold:v(a)},x,k),F=Object(r.useState)(null!==(e=T.getLaps())&&void 0!==e?e:[]),C=Object(l.a)(F,2),M=C[0],P=C[1],B=Object(r.useState)(T.getEllapsedTimeString()),R=Object(l.a)(B,2),q=R[0],G=R[1],I=Object(r.useState)(!1),J=Object(l.a)(I,2),U=J[0],W=J[1],$=function(){y(Object(u.a)(Object(u.a)({},x),T.getState())),S(Object(s.a)(T.getEvents())),P(Object(s.a)(T.getLaps()))},_={start:{name:"play",size:"45%",style:{marginRight:"-6%"}},pause:{name:"pause",size:"45%"},resume:{name:"eject",size:"45%",style:{marginRight:"-6%",transform:"rotate(90deg)"}},stop:{name:"stop",size:"45%"},lap:{name:"rotate",size:"60%",style:{marginRight:"-6%",transform:"rotate(90deg)"}},clear:{name:"io",size:"60%",style:{marginTop:"-6%"}},config:{name:"cog",size:"55%"}},H=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:$,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return Object(z.jsx)("button",Object(u.a)(Object(u.a)({"data-tip":e,className:"App-button-".concat(e," ").concat("lap"===e&&"lap"===(k[k.length-1]||{}).type?"spinPulse":""),style:{"--pulse-delay":"".concat(v(a),"ms")},onMouseDown:function(){T[e]&&T[e](),n()}},t),{},{children:Object(z.jsx)(D,Object(u.a)({},_[e]))}))},K=function(e,n,t){return Object(z.jsx)("input",{type:"number",className:"App-config-input App-config-input-".concat(e),value:n[e],onChange:t})};return m((function(e){switch(e.code){case 32:T.lap(),$();break;case 8:T.abortLap(),$()}})),f((function(){return G(T.getEllapsedTimeString())}),(function(){return!x.running||x.paused}),[x.running,x.paused]),Object(z.jsxs)("div",{className:"App",children:[Object(z.jsx)(L.a,{place:"bottom",effect:"solid",border:!0,multiline:!0}),Object(z.jsx)("header",{className:"App-header",children:Object(z.jsx)("h1",{className:"App-title",children:"countdown"})}),Object(z.jsx)("div",{className:"App-top-menu",children:H("config",(function(){return W(!U)}))}),U?Object(z.jsxs)("div",{className:"App-config-modal",children:[Object(z.jsx)("label",{className:"App-config-label",children:"threshold"}),Object(z.jsx)("div",{className:"App-config-box",children:["hours","minutes","seconds","milliseconds"].map((function(e){return K(e,a,(function(n){return i(Object(u.a)(Object(u.a)({},a),{},Object(o.a)({},e,+n.target.value)))}))}))}),Object(z.jsx)("label",{className:"App-config-label",children:"duration"}),Object(z.jsx)("div",{className:"App-config-box",children:["hours","minutes","seconds","milliseconds"].map((function(e){return K(e,b,(function(n){return h(Object(u.a)(Object(u.a)({},b),{},Object(o.a)({},e,+n.target.value)))}))}))})]}):Object(z.jsxs)("main",{className:"App-main",children:[Object(z.jsx)("pre",{className:"App-time-display",children:q}),Object(z.jsxs)("nav",{className:"App-controls",children:[H(x.running?x.paused?"resume":"pause":"start"),H("stop"),H("lap"),H("clear",(function(){y(Object(u.a)({},T.getState())),S(Object(s.a)(T.getEvents())),P(Object(s.a)(T.getLaps()))}))]}),Object(z.jsx)("div",{className:"App-laps-display",children:M.map((function(e,n,t){var r=e.startTime,a=e.endTime,i=e.duration;return Object(z.jsx)("span",{className:"App-laps-item",style:{backgroundColor:E[n],paddingLeft:"".concat(i/(t.reduce((function(e,n){return e+n.duration}),0)/100),"%")},"data-tip":"\nstart time: ".concat(new Date(r).toLocaleString(),"<br/>\nend time: ").concat(new Date(a).toLocaleString(),"<br/>\nduration: ").concat(g(i),"<br/>"),children:"\xa0"},n)}))})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=function(e){e&&e instanceof Function&&t.e(10).then(t.bind(null,60)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,i=n.getLCP,c=n.getTTFB;t(e),r(e),a(e),i(e),c(e)}))};c.a.render(Object(z.jsx)(a.a.StrictMode,{children:Object(z.jsx)(C,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),M()}},[[50,1,2]]]);
//# sourceMappingURL=main.7acabdff.chunk.js.map