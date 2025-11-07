var A=Object.defineProperty;var w=(p,i,e)=>i in p?A(p,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):p[i]=e;var h=(p,i,e)=>w(p,typeof i!="symbol"?i+"":i,e);import{Q as B,T as l,V as b,dB as D,cZ as x}from"./index-Bk_D2JkM.js";class E extends B{constructor({rayon:e=1,rayonExt:t,rayonInt:s,nbDents:r=12,xCenter:c=0,yCenter:$=0,color:a="black",couleurDeRemplissage:m="black",couleurDuTrou:g="white",dureeTour:f=10,angleStart:y=90,marqueurG:u=null,marqueurD:n=null,marqueurColorG:o="Sienna",marqueurColorD:d="Sienna"}){super();h(this,"rayon");h(this,"rayonExt");h(this,"rayonInt");h(this,"nbDents");h(this,"xCenter");h(this,"yCenter");h(this,"couleurDeRemplissage");h(this,"couleurDuTrou");h(this,"dureeTour");h(this,"angleStart");h(this,"marqueurG");h(this,"marqueurD");h(this,"marqueurColorG");h(this,"marqueurColorD");this.rayon=e,this.rayonExt=t>e?t:l(e*4/3),this.rayonInt=s<e?s:l(e*3/4),this.nbDents=r,this.xCenter=c,this.yCenter=$,this.dureeTour=f,this.marqueurG=u,this.marqueurD=n,this.marqueurColorG=o,this.marqueurColorD=d,this.color=b(a),this.couleurDeRemplissage=b(m),this.couleurDuTrou=b(g),this.angleStart=y,this.bordures=[c-t-.2,$-t-.2,c+t+.2,$+t+.2]}svg(e){const t=this.xCenter*e,s=-this.yCenter*e,r=l(this.rayon*e),c=l(this.rayonExt*e),$=l(this.rayonInt*e),a=360/this.nbDents,m=l(c-r),g=l(r*D(.25*a)),f=l(t+r*x(a*.25+this.angleStart)),y=l(s+r*D(a*.25+this.angleStart));let u=`<g class="roueEngrenage" id=roue${this.id}>
      <path stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}"
        d="M ${f},${y} `;for(let n=0;n<this.nbDents;n++){const o=t+r*x(a*(-n-.25)+this.angleStart),d=s+r*D(a*(-n-.25)+this.angleStart),S=t+c*x(a*(-n+.125)+this.angleStart),q=s+c*D(a*(-n+.125)+this.angleStart),T=t+c*x(a*(-n-.125)+this.angleStart),k=s+c*D(a*(-n-.125)+this.angleStart),R=t+r*x(a*(-n-.75)+this.angleStart),G=s+r*D(a*(-n-.75)+this.angleStart);u+=`A${m},${g} ${180+this.angleStart-n*a},0 0 ${S},${q} L${T},${k} A${m},${g} ${l(180+this.angleStart-(n-.125)*a)}, 0, 0 ${o},${d} A${r},${r} 0, 0, 0 ${R},${G} `}return u+='Z"/>',typeof this.marqueurG=="number"&&(u+=`<circle cx="${l(t+(r-5)*x(this.marqueurG))}" cy="${l(s+(r-5)*D(this.marqueurG))}" r="3" stroke="HotPink" fill="${this.marqueurColorG}" />`),typeof this.marqueurD=="number"&&(u+=`<circle cx="${l(t+(r-5)*x(this.marqueurD))}" cy="${l(s+(r-5)*D(this.marqueurD))}" r="3" stroke="HotPink" fill="${this.marqueurColorD}" />`),this.dureeTour!==0?u+=`<animateTransform
        id="animRoue${this.id}"
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 ${t} ${s}"
        to="${this.dureeTour<0?-360:360} ${t} ${s}"
        dur="${Math.abs(this.dureeTour)}"
        repeatCount="indefinite"
        />
        </g>
        <circle cx="${t}" cy="${s}" r="${$}" stroke="${this.color[0]}" fill="${this.couleurDuTrou[0]}" />
        <text class="compteurDeTours" id="compteur${this.id}" fill="red" align="middle" dominant-baseline="middle" text-anchor="middle" x="${t}" y="${s}">0</text>`:u+=`</g>
        <circle cx="${t}" cy="${s}" r="${$}" stroke="${this.color[0]}" fill="${this.couleurDuTrou[0]}" />`,u}tikz(){const e=this.rayon,t=this.rayonExt,s=this.rayonInt;let r=`% engrenage de rayon ${this.rayon}, avec ${this.nbDents} dents centré en (${this.xCenter};${this.yCenter})
      \\foreach \\i in {1,2,...,${this.nbDents}}{
                    \\pgfmathparse{360*(\\i-1)/${this.nbDents}}\\let\\angle\\pgfmathresult
                    \\begin{scope}[shift={(${this.xCenter},${this.yCenter})}]
                        \\pgfmathparse{${this.rayon}*cos(${this.angleStart}+90/${this.nbDents})}\\let\\Ax\\pgfmathresult
                    \\pgfmathparse{${e}*sin(${this.angleStart}+90/${this.nbDents})}\\let\\Ay\\pgfmathresult
                    \\pgfmathparse{${e}*cos(${this.angleStart}-90/${this.nbDents})}\\let\\Bx\\pgfmathresult
                    \\pgfmathparse{${e}*sin(${this.angleStart}-90/${this.nbDents})}\\let\\By\\pgfmathresult
                    \\pgfmathparse{${t}*cos(${this.angleStart}+45/${this.nbDents})}\\let\\Cx\\pgfmathresult
                    \\pgfmathparse{${t}*sin(${this.angleStart}+45/${this.nbDents})}\\let\\Cy\\pgfmathresult
                    \\pgfmathparse{${t}*cos(${this.angleStart}-45/${this.nbDents})}\\let\\Dx\\pgfmathresult
                    \\pgfmathparse{${t}*sin(${this.angleStart}-45/${this.nbDents})}\\let\\Dy\\pgfmathresult
                    \\pgfmathparse{${this.angleStart}-90/${this.nbDents}}\\let\\a\\pgfmathresult
                    \\pgfmathparse{${this.angleStart}-270/${this.nbDents}}\\let\\b\\pgfmathresult
                    \\fill[${this.couleurDeRemplissage[1]},draw,rotate=\\angle] (0,0) -- (\\Ax,\\Ay) to[bend left=15] (\\Cx,\\Cy) -- (\\Dx,\\Dy) to[bend left=15] (\\Bx,\\By) arc (\\a:\\b:${e}cm) -- cycle;
                    \\draw[${this.color[1]},rotate=\\angle] (\\Ax,\\Ay) to[bend left=15] (\\Cx,\\Cy) -- (\\Dx,\\Dy) to[bend left=15] (\\Bx,\\By) arc (\\a:\\b:${e}cm);
                    \\end{scope}}
                \\fill[${this.couleurDuTrou[1]},draw=${this.color[1]}] (${this.xCenter},${this.yCenter}) circle (${s});
    `;return typeof this.marqueurD=="number"&&(r+=`\\fill[HotPink,draw=black] (${l(this.xCenter+(e-.2)*x(this.marqueurD),2)},${l(this.yCenter+(e-.2)*D(this.marqueurD),2)}) circle (0.1degS);
  `),r}}function C({rayon:p=1,rayonExt:i,rayonInt:e,nbDents:t=12,xCenter:s=0,yCenter:r=0,color:c="black",couleurDeRemplissage:$="black",couleurDuTrou:a="white",dureeTour:m=10,angleStart:g=90,marqueurG:f=null,marqueurD:y=null,marqueurColorG:u="Sienna",marqueurColorD:n="Sienna"}){return new E({rayon:p,rayonExt:i,rayonInt:e,nbDents:t,xCenter:s,yCenter:r,color:c,couleurDeRemplissage:$,couleurDuTrou:a,dureeTour:m,angleStart:g,marqueurG:f,marqueurD:y,marqueurColorG:u,marqueurColorD:n})}function H({dureeTourBase:p=0,module:i=.5,marqueurs:e=!1}={},...t){const s=[];let r=0;const c=0;let $=0,a=0,m=p,g=0,f,y,u,n;for(let o=0;o<t.length-1;o++){$=i*t[o],a=i*t[o+1];const d=($+a)/2;e&&(o===0?(f=null,y=0,n="Sienna"):o%2===1?(f=180,y=0,u="Sienna",n="blue"):(f=180,y=0,u="blue",n="Sienna")),s.push(C({marqueurG:f,marqueurD:y,marqueurColorD:n,marqueurColorG:u,dureeTour:m,angleStart:g,rayonInt:i*2,rayon:$*.5-.625*i,rayonExt:$*.5+i/2,nbDents:t[o],xCenter:r,yCenter:c,couleurDeRemplissage:"green",color:"black",couleurDuTrou:"white"})),r+=d,g===0?t[o+1]%2===0?g=180/t[o+1]:g=0:t[o+1]%2===0?g=0:g=180/t[o+1],m=-m*a/$}return s.push(C({marqueurG:180,marqueurD:null,marqueurColorG:n,dureeTour:m,angleStart:g,rayonInt:i*2,rayon:a*.5-.625*i,rayonExt:a*.5+i/2,nbDents:t[t.length-1],xCenter:r,yCenter:c,couleurDeRemplissage:"green",color:"black",couleurDuTrou:"white"})),s}export{H as e};
//# sourceMappingURL=engrenage-BjdEwKb4.js.map
