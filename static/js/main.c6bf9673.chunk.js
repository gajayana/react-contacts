(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,n){},15:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),c=n(2),r=n.n(c),i=(n(13),n(3)),u=n(4),s=n(6),l=n(5),m=n(7),h=(n(15),function(t){var e=t.item;return a.a.createElement("p",null,e.id)}),p=function(t){var e=t.items;console.log(e);var n=e.map(function(t){return a.a.createElement(h,{item:t,key:t.id})});return a.a.createElement("div",null,n)},d=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(s.a)(this,Object(l.a)(e).call(this,t))).state={contacts:[]},n.url="https://cors-anywhere.herokuapp.com/https://simple-contact-crud.herokuapp.com",n}return Object(m.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(p,{items:this.state.contacts}))}},{key:"componentDidMount",value:function(){var t=this;fetch(this.url+"/contact").then(function(t){return t.json()}).then(function(e){t.setState({contacts:e.data})}).catch(function(t){return console.log(t)})}}]),e}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},8:function(t,e,n){t.exports=n(17)}},[[8,2,1]]]);
//# sourceMappingURL=main.c6bf9673.chunk.js.map