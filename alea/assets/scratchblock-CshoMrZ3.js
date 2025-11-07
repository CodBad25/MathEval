import{P as D,Q as S}from"./index-Bk_D2JkM.js";function z(h){const v=/[\\{}]/,B=/[{ ]/,y=function(s){let n;return s[0]==="}"?"}":(n=s.split(B)[0],n)},l=function(s,n,a){let t=[],r=[],e=[],g=[],i,b,k,u,$;const P=s.substring(n),w=y(P);switch(w.substring(0,5)){case"\\bloc":switch(b=w.split("{")[0],i=b.length,b=b.substring(6),a++,b){case"stop":r=l(s,n+i+1,a),e=l(s,r[1],r[2]),t=[`${r[0]} ${e[0]} `,e[1],e[2]];break;case"look":r=l(s,n+i+1,a),t=[r[0],r[1],r[2]];break;case"move":r=l(s,n+i+1,a),t=[r[0],r[1],r[2]];break;case"variable":r=l(s,n+i+1,a),t=[r[0],r[1],r[2]];break;case"control":r=l(s,n+i+1,a),t=[r[0],r[1],r[2]];break;case"pen":r=l(s,n+i+1,a),t=[r[0]+" :: pen",r[1],r[2]];break;case"list":r=l(s,n+i+1,a),t=[r[0]+" :: list",r[1],r[2]];break;case"init":r=l(s,n+i+1,a),t=[r[0],r[1],r[2]];break;case`space
`:a--,t=[`
`,11+n,a];break;case"if":for(r=l(s,n+i+1,a),e=l(s,r[1],r[2]),g=l(s,e[1],e[2]),t=[`${r[0]} ${e[0]} ${g[0]}`,g[1]+1,g[2]-1],a=t[2],u=a+1,$=s.substring(t[1]).indexOf("{")+t[1],t[1]=$+1,t[0]+=`
`;u>a;)r=l(s,t[1],u),t[0]+=" "+r[0],t[1]=r[1],u=r[2];t[0]+=" fin";break;case"ifelse":for(r=l(s,n+i+1,a),e=l(s,r[1],r[2]),g=l(s,e[1],e[2]),t=[`${r[0]} ${e[0]} ${g[0]}`,g[1]+1,g[2]-1],a=t[2],u=a+1,$=s.substring(t[1]).indexOf("{")+t[1],t[1]=$+1,t[0]+=`
`;u>a;)r=l(s,t[1],u),t[0]+=" "+r[0],t[1]=r[1],u=r[2];for(t[0]+=" sinon",u=a+1,$=s.substring(t[1]).indexOf("{")+t[1],t[1]=$+1,t[0]+=`
`;u>a;)r=l(s,t[1],u),t[0]+=" "+r[0],t[1]=r[1],u=r[2];t[0]+=" fin";break;case"repeat":for(r=l(s,n+i+1,a),r[0].split(" ")[1]!=="indéfiniment"?r[0].split(" ")[1]!=="jusqu'à"?(e=l(s,r[1],r[2]),g=l(s,e[1],e[2]),t=[`${r[0]} ${e[0]} ${g[0]}`,g[1]+1,g[2]-1],a=t[2]):(e=l(s,r[1],r[2]),t=[`${r[0]} ${e[0]} `,e[1]+1,e[2]-1],a=t[2]):(t=[`${r[0]} `,r[1]+1,r[2]-1],a=t[2]),u=a+1,$=s.substring(t[1]).indexOf("{")+t[1],t[1]=$+1,t[0]+=`
`;u>a;)r=l(s,t[1],u),t[0]+=" "+r[0],t[1]=r[1],u=r[2];t[0]+=" fin";break;default:r=l(s,n+i+1,a),t=[r[0],r[1],r[2]];break}break;case"\\oval":switch(b=w.split("{")[0],i=b.length,b=b.substring(5),a++,b.charAt(b.length-1)==="*"?(k=!0,b=b.substring(0,b.length-1)):k=!1,b){case"num":r=l(s,n+i+1,a),t=[`[${r[0]}]`,r[1]+1,r[2]-1];break;case"moreblocks":r=l(s,n+i+1,a),k?t=[`(${r[0]} v)`,r[1],r[2]]:t=[`(${r[0]})`,r[1],r[2]];break;case"variable":r=l(s,n+i+1,a),k?t=[`(${r[0]} v)`,r[1]+1,r[2]-1]:t=[`(${r[0]})`,r[1]+1,r[2]-1];break;case"sound":r=l(s,n+i+1,a),k?t=[`(${r[0]} v :: sound)`,r[1]+1,r[2]-1]:t=[`(${r[0]} :: sound)`,r[1]+1,r[2]-1];break;case"sensing":r=l(s,n+i+1,a),k?t=[`(${r[0]} v :: sensing)`,r[1]+1,r[2]-1]:t=[`(${r[0]} :: sensing)`,r[1]+1,r[2]-1];break;case"operator":for(r=l(s,n+i+1,a),e=l(s,r[1],r[2]),t=[`(${r[0]} ${e[0]}`,e[1],e[2]];s.charAt(e[1])!=="}";)e=l(s,e[1],e[2]),t[0]+=" "+e[0];t[0]+=")",t[1]=e[1]+1,t[2]=e[2]-1;break;default:r=l(s,n+i+1,a),k?t=[`(${r[0]} v)`,r[1]+1,r[2]-1]:t=[`(${r[0]})`,r[1]+1,r[2]-1];break}break;case"\\bool":switch(b=w.split(/\{ /)[0],i=b.length,b=b.substring(5,9),b){case"oper":for(a++,r=l(s,n+i+1,a),e=l(s,r[1],r[2]),t=[`<${r[0]} ${e[0]}`,e[1],e[2]];s.charAt(e[1])!=="}";)e=l(s,e[1],e[2]),t[0]+=" "+e[0];t[0]+=" :: operators boolean>",t[1]=e[1]+1,t[2]=e[2]-1;break;case"empt":t=["< vide :: operators boolean>",n+i+1,a];break;case"sens":for(a++,r=l(s,n+i+1,a),e=l(s,r[1],r[2]),t=[`<${r[0]} ${e[0]}`,e[1],e[2]];s.charAt(e[1])!=="}";)e=l(s,e[1],e[2]),t[0]+=" "+e[0];t[0]+=" :: sensing>",t[1]=e[1]+1,t[2]=e[2]-1;break;case"list":for(a++,r=l(s,n+i+1,a),e=l(s,r[1],r[2]),t=[`<${r[0]} ${e[0]}`,e[1],e[2]];s.charAt(e[1])!=="}";)e=l(s,e[1],e[2]),t[0]+=" "+e[0];t[0]+=" :: list>",t[1]=e[1]+1,t[2]=e[2]-1;break;default:r=l(s,n+i+1,a),t=[`<${r[0]}>`,r[1],r[2]];break}break;case"\\init":b=w.split("{")[0],i=b.length,a++,r=l(s,n+i+1,a),e=l(s,r[1],r[2]),t=[`${r[0]} ${e[0]} `,e[1],e[2]];break;case"\\name":for(b=w.split("{")[0],i=b.length,a++,r=l(s,n+i+1,a),e=l(s,r[1],r[2]),t=[`${r[0]} ${e[0]}`,e[1],e[2]];s.charAt(e[1])!=="}";)e=l(s,e[1],e[2]),t[0]+=" "+e[0];t[1]=e[1]+1,t[2]=e[2]-1;break;default:switch(w){case"}":a--,t=[" ",1+n,a];break;case"\\begin":{a++,s.substring(15+n)[0]==="["?n=s.substring(15+n).indexOf("]")+16+n:n+=15,t=[" <!-- Code Scratch -->",n,a];break}case"\\end":a--,t=[` <!-- Fin du Code Scratch  -->
`,13+n,a];break;case"\\turnleft":t=["gauche ",11+n,a];break;case"\\turnright":t=["droite ",12+n,a];break;case"\\greenflag":t=[" @greenFlag ",10+n,a];break;case"\\selectmenu":a++,r=l(s,12+n,a),t=[`[${r[0]} v]`,r[1]+1,r[2]-1];break;case"\\selectmenu*":a++,r=l(s,13+n,a),t=[`[${r[0]} v] `,r[1]+1,r[2]-1];break;default:b=s.substring(n).split(v)[0],t=[b,b.length+n,a];break}break}return t};let f="",o,O=[],M,c=0;if((h.match(/\{/g)||[]).length!==(h.match(/\}/g)||[]).length)return!1;if(!D.isHtml)f=h;else{const s=/scale=([\d.]+)/,n=h.match(s);n?f=`<pre class='blocks2' ${n[0]}>`:f="<pre class='blocks'>",M=0,o=!1;let a=0;for(;!o&&a<300;)O=l(h,M,c),f+=O[0],M=O[1],c=O[2],c===0&&(o=!0),a++;o||window.notify("Il y a un problème avec le scratchblock, une commande certainement non gérée : ",{stringLatex:h}),f+=`</pre>
`}return f}class C extends S{constructor(){super(),this.bordures=[-6,-6,6,6]}svg(v){function B(){let f=`<g>
`;for(let o=0;o<360;o+=15)f+=`<line x1="${115+Math.round(45*Math.cos(o*Math.PI/180))}" y1="${115+Math.round(45*Math.sin(o*Math.PI/180))}" x2="${115+Math.round(35*Math.cos(o*Math.PI/180))}" y2="${115+Math.round(35*Math.sin(o*Math.PI/180))}" stroke="white" />
`;return f+`</g>
`}function y(f){return`<g id="sorientera${f}" style="transform: scale(0.675)">
<g transform="translate(0 0)">
<g transform="translate(2 1)">
<path class="sb3-motion" d="M 0 4
      A 4 4 0 0 1 4 0
      H 12 c 2 0 3 1 4 2
      l 4 4
      c 1 1 2 2 4 2
      h 12
      c 2 0 3 -1 4 -2
      l 4 -4
      c 1 -1 2 -2 4 -2
      L 139 0
      a 4 4 0 0 1 4 4 L 143 44 a 4 4 0 0 1 -4 4 L 48 48 c -2 0 -3 1 -4 2 l -4 4 c -1 1 -2 2 -4 2 h -12 c -2 0 -3 -1 -4 -2 l -4 -4 c -1 -1 -2 -2 -4 -2 L 4 48 a 4 4 0 0 1 -4 -4 Z"></path>
      <text class="sb3-label sb3-" x="0" y="13" transform="translate(8 17)">s'orienter</text>
      <text class="sb3-label sb3-" x="0" y="13" transform="translate(78 17)">à</text>
      <g transform="translate(95 8)">
      <rect rx="16" ry="16" x="0" y="0" width="40" height="32" class="sb3-motion sb3-input sb3-input-number"></rect>
      <text class="sb3-label sb3-literal-number" x="0" y="13" transform="translate(11 9)">${f}</text>
      </g>
      </g>
      </g>
      </g>`}return`<g class="roseDesVents" id=roseDesVents${this.id} transform="translate(-115 -115) scale(${v/20})">
<rect x="50" y="50" rx="4" ry="4" width="130" height="130" fill="#4c97ff" stroke="#3373cc"/>
<circle r="50" cx="115" cy="115" fill="#3373cc" stroke="#3373cc"/>
${B()}
<clipPath id="monClip">
    <rect x="115" y="50" width="50" height="65"></rect>
  </clipPath>
  <circle r="50" cx="115" cy="115" id="quartDeCercle" fill-opacity="0.3" fill="white" clip-path="url(#monClip)"/>
  <defs>
  <g id="direction" x="0" y="0">
  <circle r="10" cx="0" cy="0" fill="white"/>
  <path d="M -6 3 h 7 v 3 l 5 -6 l -5 -6 v 3 h -7 v 6 z" fill="#4c97ff" />
  </g>
 </defs>
 <use href="#direction" x="165" y="115" />
 <use href="#direction" transform="rotate(-90 115 65)" x="115" y="65" />
 <use href="#direction" transform="rotate(-180 65 115)" x="65" y="115" />
 <use href="#direction" transform="rotate(90 115 165)" x="115" y="165" />
  <g transform="translate(65 0)">${y(0)}</g>
<g transform="translate(230 65) rotate(90)">${y(90)}</g>
<g transform="translate(165 230) rotate(180)">${y(180)}</g>
<g transform="translate(0 165) rotate(-90)">${y(-90)}</g>
</g>
`}tikz(){return`\\node (centre) {
    \\begin{tikzpicture}[baseline, scale=0.5]
              \\definecolor{scratchBlue}{RGB}{76, 151, 255}
               \\definecolor{scratchBlue2}{RGB}{51, 115, 204}
                \\pgfmathsetmacro{\\rayon}{1.5}
                \\coordinate (O) at (2,2);
                \\draw[scratchBlue2,thin,fill=scratchBlue,rounded corners] (0,0) rectangle (4,4);
                \\fill[scratchBlue2] (O) circle (\\rayon);
                \\fill[white,opacity=0.3] (O) -- ++(\\rayon,0) arc [start angle=0, end angle=90, radius=\\rayon cm] -- (O);
                \\draw[white,thick] ($(O)+(0,\\rayon)$) -- (O) -- ($(O)+(\\rayon,0)$) coordinate (dir90);
                \\fill[white] (O) circle (2pt);
                \\foreach \\angle in {0,15,...,345} {
      \\coordinate (A) at ($(O)+(\\angle:1.3)$);
                    \\draw[white,thin] ($(O)!0.8!(A)$) -- (A);
      }
                \\fill[white] (dir90) circle (10pt);
                \\node[scratchBlue,fill=scratchBlue,single arrow,scale=0.2] at (dir90) {aa};
                \\coordinate (N) at (2,\\rayon+2);
                \\fill[white] (N) circle (10pt);
                 \\node[scratchBlue,fill=scratchBlue,single arrow,scale=0.2, rotate=90] at (N) {aa};
                   \\coordinate (S) at (2,2-\\rayon);
                   \\fill[white] (S) circle (10pt);
                 \\node[scratchBlue,fill=scratchBlue,single arrow,scale=0.2, rotate=-90] at (S) {aa};
                   \\coordinate (W) at (2-\\rayon,2);
                   \\fill[white] (W) circle (10pt);
                 \\node[scratchBlue,fill=scratchBlue,single arrow,scale=0.2, rotate=180] at (W) {aa};
                 
            \\end{tikzpicture}
    };
        \\node[above] at (centre.north){
    \\begin{scratch}[scale=0.5]
                \\blockmove{s'orienter à \\ovalnum{$0$}}
            \\end{scratch}
      };
        \\node[above,rotate=-90] at (centre.east) {
      \\begin{scratch}[scale=0.5]
                \\blockmove{s'orienter à \\ovalnum{$90$}}
            \\end{scratch}
        };
        \\node[above, rotate=180] at (centre.south){
        \\begin{scratch}[scale=0.5]
                \\blockmove{s'orienter à \\ovalnum{$180$}}
            \\end{scratch}
          };
        \\node[above,rotate=90] at (centre.west){
          \\begin{scratch}[scale=0.5]
                \\blockmove{s'orienter à \\ovalnum{$-90$}}
            \\end{scratch}
            };`}}function V(){return new C}export{V as r,z as s};
//# sourceMappingURL=scratchblock-CshoMrZ3.js.map
