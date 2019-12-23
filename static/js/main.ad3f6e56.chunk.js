(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),l=a(47),o=a.n(l),r=(a(56),a(4)),i=a(5),c=a(7),m=a(6),p=a(8),u=(a(57),a(58),a(31),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this))).state={globalparams:e.globalparams},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"container"},n.a.createElement("section",{className:"info-tiles"},n.a.createElement("div",{className:"tile is-ancestor has-text-centered"},n.a.createElement("div",{className:"tile is-parent"},n.a.createElement("article",{className:"tile is-child box"},n.a.createElement("p",{className:"title"},"Alpha ",this.state.globalparams.alpha/100),n.a.createElement("p",{className:"subtitle"},n.a.createElement("input",{className:"slider is-fullwidth is-large is-danger is-circle",step:"1",min:"0",max:"100",value:this.state.globalparams.alpha,type:"range",onChange:function(t){e.setState({globalparams:Object.assign({},e.state.globalparams,{alpha:t.target.value})},function(){e.props.onChange&&e.props.onChange(e.state.globalparams)})}}))),n.a.createElement("article",{className:"tile is-child box"},n.a.createElement("p",{className:"title"},"Total time of sim ",this.state.globalparams.totaltime),n.a.createElement("p",{className:"subtitle"},n.a.createElement("input",{className:"slider is-fullwidth is-large is-danger is-circle",step:"1",min:"0",max:"1000",value:this.state.globalparams.totaltime,type:"range",onChange:function(t){e.setState({globalparams:Object.assign({},e.state.globalparams,{totaltime:t.target.value})},function(){e.props.onChange&&e.props.onChange(e.state.globalparams)})}}))),n.a.createElement("article",{className:"tile is-child box"},n.a.createElement("p",{className:"title"},"Conviction required ",this.state.globalparams.convictionthreshold),n.a.createElement("p",{className:"subtitle"},n.a.createElement("input",{className:"slider is-fullwidth is-large is-danger is-circle",step:"1",min:"0",max:"200000",value:this.state.globalparams.convictionthreshold,type:"range",onChange:function(t){e.setState({globalparams:Object.assign({},e.state.globalparams,{convictionthreshold:t.target.value})},function(){e.props.onChange&&e.props.onChange(e.state.globalparams)})}})))))))}}]),t}(s.Component)),h=a(48),d=a(50),v=a.n(d),g=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this))).state={globalparams:e.globalparams,proposal:e.proposal,currenttime:0,convictiontresholdpassed:!1,stakeHistory:[],timeline:void 0,plot:void 0},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){this.recalc([]),this.restart()}},{key:"componentWillReceiveProps",value:function(e){var t=this;this.setState({globalparams:e.globalparams},function(){t.recalc([])})}},{key:"makecolor",value:function(e){var t=251*e%255,a=43*e%255;return"rgba(".concat(139*e%255,",").concat(t,",").concat(a,",0.3)")}},{key:"restart",value:function(){var e=this;this.setState({currenttime:0,convictiontresholdpassed:!1},function(){var t=setInterval(function(){var a=e.state.currenttime+1;e.state.globalparams.totaltime>e.state.currenttime&&!e.state.convictiontresholdpassed?e.setState({currenttime:a},function(){e.recalc([])}):(clearInterval(t),e.state.convictiontresholdpassed?e.recalc([{t:e.state.currenttime,desc:"Proposal passed !"}]):e.recalc([[{t:e.state.currenttime,desc:"Proposal did not pass before end of sim"}]]))},1)})}},{key:"recalc",value:function(e){for(var t=this,a=[],s=0;s<this.state.globalparams.totaltime;s++)a.push(s);for(var n=this.state.proposal.convictions.reduce(function(a,s,n){for(var l=t.state.globalparams.alpha/100,o=0,r=0,i=[],c=0,m=0,p=0;p<t.state.currenttime;p++){var u=v.a.getConviction(l,o,r,c);if(i.push(u),s.stakes&&s.stakes.length>m&&s.stakes[m].time<=p){var h=s.stakes[m];m++,r=h.tokensstaked,c=0,o=u,e.push({t:p,desc:"".concat(s.name," changes stake to ").concat(h.tokensstaked)})}c++}return a.push({label:s.name,fill:!1,borderColor:t.makecolor(n),data:i}),a},[]),l=[],o=function(e){var a=n.reduce(function(t,a){return t+a.data[e]},0);l.push(a),a<t.state.globalparams.convictionthreshold||t.setState({convictiontresholdpassed:!0})},r=0;r<this.state.currenttime;r++)o(r);for(var i=[],c=0;c<this.state.globalparams.totaltime;c++)i.push(this.state.globalparams.convictionthreshold);n.push({label:"total",borderColor:"rgba(75,192,192,1)",data:l}),n.push({fill:!0,label:"required conviction",borderColor:"rgba(175,0,0,1)",data:i});var m=e.sort(function(e,t){return e.t-t.t});this.setState({plot:{labels:a,datasets:n},timeline:m})}},{key:"render",value:function(){var e=this,t=this.state.timeline.map(function(e,t){return n.a.createElement("li",{key:t},"at time ",e.t," : ",e.desc)});return n.a.createElement("div",{className:"container"},n.a.createElement("section",{className:"hero is-info welcome is-small"},n.a.createElement("div",{className:"hero-body"},n.a.createElement("div",{className:"container"},n.a.createElement("h1",{className:"title"},"Proposal : ",this.state.proposal.name),this.state.convictiontresholdpassed&&n.a.createElement("h1",{className:"title"},"PASSED!")))),n.a.createElement("div",{className:"card"},n.a.createElement("header",{className:"card-header"},n.a.createElement("p",{className:"card-header-title"},"Conviction chart")),n.a.createElement("div",{className:"card-content"},n.a.createElement("div",{className:"content"},this.state.plot&&n.a.createElement(h.a,{data:this.state.plot}),n.a.createElement("ol",null,t)))),n.a.createElement("button",{onClick:function(){e.restart()}},"Restart Simulation"))}}]),t}(s.Component),b=(s.Component,function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this))).state={globalparams:{alpha:90,totaltime:400,convictionthreshold:6800},proposals:[{timecreated:0,id:1,value:1e3,name:"Spend 1000 xDAI on X",convictions:[{name:"Griff",stakes:[{time:20,tokensstaked:1e3},{time:50,tokensstaked:0}]},{name:"Jeff",stakes:[{time:30,tokensstaked:1e3},{time:60,tokensstaked:7e3}]}]}]},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"timeChanged",value:function(e){console.log("app: time changed")}},{key:"render",value:function(){var e=this,t=this.state.proposals.map(function(t,a){return n.a.createElement("div",{key:a,className:"tile is-ancestor has-text-centered"},n.a.createElement("div",{className:"tile is-parent"},n.a.createElement("article",{className:"tile is-child box"},n.a.createElement(g,{globalparams:e.state.globalparams,proposal:t}))))});return n.a.createElement("div",{className:"App"},n.a.createElement("section",{className:"info-tiles"},n.a.createElement(u,{globalparams:this.state.globalparams,onChange:function(t){e.setState({globalparams:t})}})),n.a.createElement("section",{className:"info-tiles"},t))}}]),t}(s.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},31:function(e,t,a){},50:function(e,t){e.exports={getConviction:function(e,t,a,s){return 0===s?0:t+(a-t)*(1-1/(1+s/(10*e)))}}},51:function(e,t,a){e.exports=a(153)},56:function(e,t,a){},57:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"}},[[51,1,2]]]);
//# sourceMappingURL=main.ad3f6e56.chunk.js.map