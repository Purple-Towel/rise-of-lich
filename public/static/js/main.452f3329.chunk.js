(this["webpackJsonpreact-front-end"]=this["webpackJsonpreact-front-end"]||[]).push([[0],{1505:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(112),r=a.n(i),o=(a(599),a(34)),c=a(35);a(600);function l(){const e=Object(o.a)(["\n  margin: auto;\n  max-width: 800px;\n  display: flex;\n  justify-content: center;\n"]);return l=function(){return e},e}function h(){const e=Object(o.a)(["\n  font-family: 'Metal Mania', cursive;\n  font-size: 5em;\n  margin-top: 0px;\n  margin-bottom: 50px;\n  text-align: center;\n"]);return h=function(){return e},e}const u=c.a.h1(h()),m=c.a.div(l());class d extends n.Component{render(){return s.a.createElement("div",null,s.a.createElement(u,null,"Rise of Lich: Revengeance"),s.a.createElement(m,{id:"game"}))}}var p=d,f=a(587),g=a(588),v=a(1526),y=a(1531),b=a(1529),x=a(1527),w=a(1525),k=a(1528),O=a(190),E=a.n(O);function A(){const e=Object(o.a)(["\n  color: #000;\n  text-decoration: none;\n\n  &:hover {\n    color: #f00;\n  }\n"]);return A=function(){return e},e}function S(){const e=Object(o.a)(["\n  display: flex;\n  justify-content: space-around;\n"]);return S=function(){return e},e}const M=c.a.footer(S()),T=c.a.a(A());var j=()=>s.a.createElement(M,null,s.a.createElement(T,{href:"https://github.com/Purple-Towel"},s.a.createElement(E.a,null)," Angad Grewel"),s.a.createElement(T,{href:"https://github.com/DPintoLL"},s.a.createElement(E.a,null)," Diogo Pinto"),s.a.createElement(T,{href:"https://github.com/rancewcampbell"},s.a.createElement(E.a,null)," Rance Campbell"));function L(){const e=Object(o.a)(["\n  margin: 0;\n  text-align: center;\n"]);return L=function(){return e},e}function F(){const e=Object(o.a)(["\n  max-width: 800px;\n  margin: auto;\n  font-family: 'Metal Mania', cursive;\n  font-size: 2em;\n"]);return F=function(){return e},e}const B=c.a.article(F()),R=c.a.h1(L());var z=()=>s.a.createElement(B,null,s.a.createElement(R,null,"About"),s.a.createElement("p",null,"\n  Welcome to Rise of Lich: Revengeance! We are Angad, Diogo, and Rance and we built this\n  game as a final project for the Canadian coding bootcamp known as Lighthouse Labs. Rise of Lich\n  was created using Phaser 3, TypeScript and React. This game is a week long effort by the three of\n  us to show how much we have learned over the course of our 12 week bootcamp. We hope you enjoy it!\n  "),s.a.createElement(j,null));function N(){const e=Object(o.a)(["\n  width: 30px;\n"]);return N=function(){return e},e}function W(){const e=Object(o.a)(["\n  text-align: left;\n"]);return W=function(){return e},e}function C(){const e=Object(o.a)(["\n  margin: 0;\n"]);return C=function(){return e},e}function D(){const e=Object(o.a)(["\n  max-width: 800px;\n  text-align: center;\n  margin: auto;\n  font-family: 'Metal Mania', cursive;\n  font-size: 2em;\n"]);return D=function(){return e},e}function G(){const e=Object(o.a)(["\n  display: inline-grid;\n  grid-template-columns: repeat(3, [col-start] 1fr);\n  grid-gap: 0px;\n  margin: auto;\n"]);return G=function(){return e},e}const P=c.a.div(G()),H=c.a.section(D()),I=c.a.h1(C()),_=c.a.p(W()),J=c.a.img(N());var K=()=>s.a.createElement(H,null,s.a.createElement(I,null,"Tutorial"),s.a.createElement(P,{className:"grid2x3"},s.a.createElement(J,{src:"assets/empty.png",alt:"empty"}),s.a.createElement(J,{src:"assets/up_arr.png",alt:"up-arrow"}),s.a.createElement(J,{src:"assets/empty.png",alt:"empty"}),s.a.createElement(J,{src:"assets/left_arr.png",alt:"left-arrow"}),s.a.createElement(J,{src:"assets/down_arr.png",alt:"down-arrow"}),s.a.createElement(J,{src:"assets/right_arr.png",alt:"right-arrow"})),s.a.createElement(_,null,"Movement: You may press any of the above indicated keys to move the character in the corresponding direction. Moving takes Stamina, and once you reach 0 Stamina it will be game over."));function X(e){const t=e.children,a=e.value,n=e.index,i=Object(g.a)(e,["children","value","index"]);return s.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},i),a===n&&s.a.createElement(k.a,{p:3},s.a.createElement(w.a,null,t)))}function Y(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}const U=Object(v.a)(e=>({root:{flexGrow:1}}));function $(){const e=U(),t=s.a.useState(0),a=Object(f.a)(t,2),n=a[0],i=a[1];return s.a.createElement("div",{className:e.root},s.a.createElement(y.a,{position:"static",style:{background:"transparent",boxShadow:"none",color:"#000"}},s.a.createElement(b.a,{value:n,onChange:(e,t)=>{i(t)},"aria-label":"Tutorial and about tabs",centered:!0},s.a.createElement(x.a,Object.assign({style:{fontSize:32,fontFamily:"Metal Mania"},label:"Tutorial"},Y(0))),s.a.createElement(x.a,Object.assign({style:{fontSize:32,fontFamily:"Metal Mania"},label:"About"},Y(1))))),s.a.createElement(X,{value:n,index:0},s.a.createElement(K,null)),s.a.createElement(X,{value:n,index:1},s.a.createElement(z,null)))}function q(){const e=Object(o.a)(["\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 800px;\n"]);return q=function(){return e},e}const Q=c.a.div(q());function V(){return s.a.createElement("div",{className:"App"},s.a.createElement(Q,null,s.a.createElement(p,null)),s.a.createElement($,null))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Z=a(30),ee=a.n(Z),te=a(143),ae=a(144);var ne={map:[[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5],[10,11,11,11,11,11,11,11,11,11,83,11,83,11,39,25],[0,11,11,11,11,11,11,11,11,11,11,83,11,83,11,15],[10,11,11,11,11,11,11,11,11,11,11,11,83,11,83,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,83,11,15],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,83,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,15],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,400,11,11,11,11,11,11,11,11,11,11,11,15],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,15],[40,41,42,41,42,41,42,41,42,41,42,41,42,41,42,45]],moves:22};var se={map:[[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5],[10,11,11,11,11,49,49,11,11,11,49,49,11,11,11,25],[0,11,11,11,49,11,11,11,11,11,11,11,49,11,11,15],[10,11,11,11,49,11,49,49,49,49,49,11,49,11,11,25],[0,11,11,49,11,11,49,39,11,11,49,11,11,49,11,15],[10,11,11,49,11,11,49,49,11,49,49,11,11,49,11,25],[0,11,11,49,11,11,49,11,11,11,49,11,11,49,11,15],[10,11,11,49,11,11,49,83,83,83,49,11,11,49,11,25],[0,11,11,11,49,11,11,11,11,11,11,11,49,11,11,15],[10,11,11,11,11,49,11,11,11,11,11,49,11,11,11,25],[0,11,11,11,11,11,49,11,400,11,49,11,11,11,11,15],[40,41,42,41,42,41,42,41,42,41,42,41,42,41,42,45]],moves:15};var ie={map:[[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,15],[10,11,11,11,11,11,11,11,11,49,49,49,11,11,11,25],[0,11,11,11,49,49,49,49,49,49,39,49,11,11,11,15],[10,11,11,49,777,11,11,11,11,777,777,49,11,11,11,25],[0,11,49,777,11,11,49,49,49,49,49,49,11,11,11,15],[10,49,777,11,11,777,49,11,11,11,11,11,11,11,11,25],[0,11,11,11,777,49,11,11,11,11,11,11,11,11,11,15],[10,83,777,777,49,11,11,11,11,11,11,11,11,11,11,25],[0,400,11,49,11,11,11,11,11,11,11,11,11,11,11,15],[40,41,42,41,42,41,42,41,42,41,42,41,42,41,42,45]],moves:19};var re={map:[[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,15],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,15],[10,49,49,49,49,49,49,49,49,49,49,49,49,11,11,25],[0,400,83,11,778,11,49,11,11,11,11,11,11,49,49,15],[10,49,49,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,49,11,11,11,11,11,11,11,49,778,49,11,15],[10,11,11,11,49,49,49,11,11,11,11,778,39,778,11,25],[0,11,11,11,11,11,11,49,11,11,11,49,778,49,11,15],[40,41,42,41,42,41,42,41,42,41,42,41,42,41,42,45]],moves:18};var oe={map:[[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,49,83,15],[10,11,11,11,11,11,11,11,11,11,11,11,11,49,11,25],[0,49,49,49,49,49,49,11,11,11,11,11,11,49,11,15],[10,39,779,778,779,778,779,778,779,778,779,778,779,778,400,25],[0,49,49,49,49,49,49,11,11,11,11,11,11,11,11,15],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,15],[10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,25],[0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,15],[40,41,42,41,42,41,42,41,42,41,42,41,42,41,42,45]],moves:19};class ce extends ee.a.Scene{constructor(){super("game"),this.cursors=void 0,this.player=void 0,this.boxes=[],this.spikes=[],this.spikesAlternating1=[],this.spikesAlternating2=[],this.barriers=[],this.layer=void 0,this.facing="right",this.moves=50,this.isGameOver=!1,this.steps=0,this.movesText=void 0,this.stepsText=void 0,this.levels=[ne,se,ie,re,oe],this.currentLevel=1}preload(){this.cursors=this.input.keyboard.createCursorKeys()}create(e){var t;const a=e.currentLevel,n=e.steps;this.currentLevel=a,this.steps=n,this.facing="right";const s=this.make.tilemap({data:this.levels[this.currentLevel-1].map,tileWidth:16,tileHeight:16});this.moves=this.levels[this.currentLevel-1].moves;const i=s.addTilesetImage("tiles");this.layer=s.createStaticLayer(0,i,0,0),this.barriers=this.layer.createFromTiles(49,11,{key:"tiles",frame:49}).map(e=>e.setOrigin(0)),this.spikes=this.layer.createFromTiles(777,11,{key:"character",frame:356}).map(e=>e.setOrigin(0)),this.spikesAlternating1=this.layer.createFromTiles(778,11,{key:"character",frame:353}).map(e=>e.setOrigin(0)),this.spikesAlternating2=this.layer.createFromTiles(779,11,{key:"character",frame:356}).map(e=>e.setOrigin(0)),this.boxes=this.layer.createFromTiles(83,11,{key:"tiles",frame:83}).map(e=>e.setOrigin(0)),this.player=this.layer.createFromTiles(400,11,{key:"character",frame:40}).pop(),null===(t=this.player)||void 0===t||t.setOrigin(0),this.createPlayerAnimations(),this.createSpikeAnimations(),this.add.image(16,16,"hud-icon"),this.movesText=this.add.text(8,8,"".concat(this.moves),{fontSize:"14px",fill:"#f00"}),this.movesText.setShadow(1,1),this.stepsText=this.add.text(16,150,"Steps: ".concat(this.steps))}update(){if(!this.cursors)return;!0===this.isGameOver&&(this.scene.start("gameOver",{currentLevel:this.currentLevel}),this.isGameOver=!1);const e=ee.a.Input.Keyboard.JustDown(this.cursors.left),t=ee.a.Input.Keyboard.JustDown(this.cursors.right),a=ee.a.Input.Keyboard.JustDown(this.cursors.down),n=ee.a.Input.Keyboard.JustDown(this.cursors.up);if(this.input.keyboard.once("keydown-R",()=>{this.add.text(.5*this.scale.width,.5*this.scale.height,"Restarting",{fontSize:16,fontFamily:"Metal Mania",color:"#f00"}).setOrigin(.5),this.scene.start("game",{currentLevel:this.currentLevel,steps:0})},this),t){if(!this.player)return;"left"===this.facing&&(this.player.toggleFlipX(),this.facing="right");const e=this.player.x+24,t=this.player.y+8;this.tweenMove(e,t,"x","positive")}else if(e){if(!this.player)return;"right"===this.facing&&(this.player.toggleFlipX(),this.facing="left");const e=this.player.x-8,t=this.player.y+8;this.tweenMove(e,t,"x","negative")}else if(a){if(!this.player)return;const e=this.player.x+8,t=this.player.y+24;this.tweenMove(e,t,"y","positive")}else if(n){if(!this.player)return;const e=this.player.x+8,t=this.player.y-8;this.tweenMove(e,t,"y","negative")}}tweenMove(e,t,a,n){if(this.tweens.isTweening(this.player))return;if(this.hasObstruction(e,t))return;if(this.getTileAt(e,t,39)&&this.moves>=2&&!this.isGameOver){this.levels[this.currentLevel-1].moves;this.currentLevel++,setTimeout(()=>{this.scene.start("transition",{currentLevel:this.currentLevel,stepsTaken:this.steps})},700)}const s=this.getBoxAt(e,t),i={[a]:{positive:"+=16",negative:"-=16"}[n],duration:400,onStart:()=>{var e,t,a;null===(e=this.player)||void 0===e||e.anims.play("move",!0),this.moves-=1,this.steps+=1,null===(t=this.movesText)||void 0===t||t.setText("".concat(this.moves)),null===(a=this.stepsText)||void 0===a||a.setText("Steps: ".concat(this.steps)),this.moves<=0&&(this.isGameOver=!0)},onComplete:()=>{var e;null===(e=this.player)||void 0===e||e.anims.play("idle",!0)},onCompleteScope:this};if(s){if(this.tweens.isTweening(s))return;if(!this.checkBoxMovement(s,a,n))return;this.tweens.add(Object(ae.a)(Object(ae.a)({},i),{},{targets:s}))}else this.tweens.add(Object(ae.a)(Object(ae.a)({},i),{},{targets:this.player}));if(this.getSpikeAt(e,t))return this.moves-=1;if(this.steps%2===0){var r,o=Object(te.a)(this.spikesAlternating1);try{for(o.s();!(r=o.n()).done;){r.value.anims.play("extend")}}catch(g){o.e(g)}finally{o.f()}var c,l=Object(te.a)(this.spikesAlternating2);try{for(l.s();!(c=l.n()).done;){c.value.anims.play("retract")}}catch(g){l.e(g)}finally{l.f()}}if(this.steps%2===1){var h,u=Object(te.a)(this.spikesAlternating1);try{for(u.s();!(h=u.n()).done;){h.value.anims.play("retract")}}catch(g){u.e(g)}finally{u.f()}var m,d=Object(te.a)(this.spikesAlternating2);try{for(d.s();!(m=d.n()).done;){m.value.anims.play("extend")}}catch(g){d.e(g)}finally{d.f()}}const p=this.getSpikeAlternating1(e,t),f=this.getSpikeAlternating2(e,t);if(p){if(this.canSpikeAlternating1Hurt())return this.moves-=1}if(f){if(this.canSpikeAlternating2Hurt())return this.moves-=1}}checkBoxMovement(e,t,a){if("x"===t&&"negative"===a){if(this.hasObjectObstruction(e.getBounds().x-8,e.getBounds().y+8))return!1}else if("x"===t&&"positive"===a){if(this.hasObjectObstruction(e.getBounds().x+24,e.getBounds().y+8))return!1}else if("y"===t&&"negative"===a){if(this.hasObjectObstruction(e.getBounds().x+8,e.getBounds().y-8))return!1}else if("y"===t&&"positive"===a&&this.hasObjectObstruction(e.getBounds().x+8,e.getBounds().y+24))return!1;return!0}hasObstruction(e,t){if(!this.layer)return!1;if(this.getBarrierAt(e,t))return!0;const a=this.layer.getTileAtWorldXY(e,t);if(!a)return!1;return-1!==[0,1,5,10,15,25,40,41,42,45,49].indexOf(a.index)}hasObjectObstruction(e,t){if(this.hasObstruction(e,t)||this.getBoxAt(e,t))return!0}getBoxAt(e,t){return this.boxes.find(a=>a.getBounds().contains(e,t))}getBarrierAt(e,t){return this.barriers.find(a=>a.getBounds().contains(e,t))}getTileAt(e,t,a){if(!this.layer)return;const n=this.layer.getTileAtWorldXY(e,t);return!!n&&(n.index===a?n:void 0)}createPlayerAnimations(){this.anims.create({key:"move",frames:this.anims.generateFrameNumbers("character",{start:40,end:43}),frameRate:10,repeat:-1}),this.anims.create({key:"idle",frames:[{key:"character",frame:40}],frameRate:20})}getSpikeAt(e,t){return this.spikes.find(a=>a.getBounds().contains(e,t))}getSpikeAlternating1(e,t){return this.spikesAlternating1.find(a=>a.getBounds().contains(e,t))}getSpikeAlternating2(e,t){return this.spikesAlternating2.find(a=>a.getBounds().contains(e,t))}canSpikeAlternating1Hurt(){return this.steps%2===0}canSpikeAlternating2Hurt(){return this.steps%2===1}createSpikeAnimations(){this.anims.create({key:"extend",frames:this.anims.generateFrameNumbers("character",{start:353,end:356}),frameRate:10}),this.anims.create({key:"retract",frames:this.anims.generateFrameNumbers("character",{start:356,end:353}),frameRate:10})}}var le=a(586),he=a.n(le);class ue extends ee.a.Loader.File{constructor(e,t,a="google"){super(e,{type:"webfont",key:t.toString()}),this.fontNames=[],this.service="",this.fontNames=Array.isArray(t)?t:[t],this.service=a}load(){const e={active:()=>{this.loader.nextFile(this,!0)}};switch(this.service){case"google":e.google={families:this.fontNames};break;default:throw new Error("Unsupported font service")}he.a.load(e)}}class me extends ee.a.Scene{constructor(){super("preload")}preload(){this.load.spritesheet("ghost-idle","assets/ghost-idle.png",{frameWidth:64,frameHeight:64}),this.load.spritesheet("tiles","assets/Dungeon_Tileset.png",{frameWidth:16,startFrame:0}),this.load.spritesheet("character","assets/0x72_DungeonTilesetII_v1.3.png",{frameWidth:16,startFrame:0}),this.load.spritesheet("lich","assets/demon-idle.png",{frameWidth:160,frameHeight:140});const e=new ue(this.load,["Metal Mania"]);this.load.addFile(e),this.load.spritesheet("hud-icon","assets/hud-icon.png",{frameWidth:32,frameHeight:32})}create(){this.scene.start("intro")}}class de{static flashElement(e,t,a=!0,n="Linear",s=1500,i=500){if(e&&t){let r=s-i/2;e.tweens.timeline({tweens:[{targets:t,duration:0,alpha:0,ease:n},{targets:t,duration:r,alpha:1,ease:n},{targets:t,duration:i,alpha:1,ease:n},{targets:t,duration:r,alpha:0,ease:n,onComplete:()=>{!0===a&&this.flashElement(e,t)}}]})}}}class pe extends ee.a.Scene{constructor(){super("intro")}create(){const e=this.scale.width,t=this.scale.height;this.anims.create({key:"lich-idle",frames:this.anims.generateFrameNumbers("lich",{start:0,end:5}),frameRate:5,repeat:-1}),this.add.sprite(.5*e,.5*t,"lich").play("lich-idle"),this.add.text(.5*e,.25*t,"Rise of Lich: Revengeance",{fontSize:24,fontFamily:"Metal Mania",color:"#f00"}).setOrigin(.5);const a=this.add.text(.5*e,.75*t,"Press enter to start",{fontFamily:"Metal Mania",fontSize:16,color:"#f00"}).setOrigin(.5);de.flashElement(this,a),this.input.keyboard.once("keydown-ENTER",()=>{this.scene.start("game",{currentLevel:1,steps:0})},this)}}class fe extends ee.a.Scene{constructor(){super("gameOver"),this.currentLevel=1}create(e){const t=e.currentLevel;this.currentLevel=t;const a=this.scale.width,n=this.scale.height;this.anims.create({key:"ghost-idle",frames:this.anims.generateFrameNumbers("ghost-idle",{start:0,end:6}),frameRate:5,repeat:-1}),this.add.sprite(.5*a,.5*n,"ghost-idle").play("ghost-idle"),this.add.text(.5*a,.25*n,"Game Over",{fontSize:24,fontFamily:"Metal Mania",color:"#f00"}).setOrigin(.5);const s=this.add.text(.5*a,.75*n,"Press r to retry",{fontFamily:"Metal Mania",fontSize:16,color:"#f00"}).setOrigin(.5);de.flashElement(this,s),this.input.keyboard.once("keydown-R",()=>{this.scene.start("game",{currentLevel:this.currentLevel,steps:0})},this)}}class ge extends ee.a.Scene{constructor(){super("transition")}create(e){const t=e.currentLevel,a=e.stepsTaken,n=this.scale.width,s=this.scale.height;this.add.text(.5*n,.25*s,"Level Completed",{fontSize:24,fontFamily:"Metal Mania",color:"#f00"}).setOrigin(.5),this.add.text(.5*n,.5*s,"Steps taken: ".concat(a),{fontSize:16,fontFamily:"Metal Mania",color:"#f00"}).setOrigin(.5);const i=this.add.text(.5*n,.75*s,"Press enter to continue or r to retry",{fontFamily:"Metal Mania",fontSize:16,color:"#f00"}).setOrigin(.5);de.flashElement(this,i),this.input.keyboard.once("keydown-R",()=>{this.scene.start("game",{currentLevel:t-1,steps:0})},this),this.input.keyboard.once("keydown-ENTER",()=>{this.scene.start("game",{currentLevel:t,steps:0})},this)}}const ve={type:ee.a.AUTO,width:256,height:192,parent:"game",physics:{default:"arcade",arcade:{gravity:{y:0}}},scene:[me,pe,ce,fe,ge],scale:{zoom:3}};t.default=new ee.a.Game(ve);r.a.render(s.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})},594:function(e,t,a){e.exports=a(1505)},599:function(e,t,a){},600:function(e,t,a){}},[[594,1,2]]]);
//# sourceMappingURL=main.452f3329.chunk.js.map