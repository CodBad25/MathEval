var V=Object.defineProperty;var z=(y,k,g)=>k in y?V(y,k,{enumerable:!0,configurable:!0,writable:!0,value:g}):y[k]=g;var F=(y,k,g)=>z(y,typeof k!="symbol"?k+"":k,g);import{E as G,p as S,r as f,P as T,V as L,T as I,ag as U,A as Z,z as w,R as J,m as R,Z as K,dC as W,aU as X}from"./index-Bk_D2JkM.js";import{c as Y,a as E,d as _,o as H,h as l,t as n,g as a,l as ee,f as re}from"./2dLutin-DtMfa3Je.js";import{s as oe}from"./scratchblock-CshoMrZ3.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const hr=!0,fr="cliqueFigure",gr=!0,$r="qcmMono",kr="Tortue Scratch avec répétitions",Sr="29/06/2021",xr="8ded2",yr={"fr-fr":["4I1-2"],"fr-ch":[]};class Mr extends G{constructor(){super();F(this,"indiceBonneFigure");this.nbQuestions=1,this.nbQuestionsModifiable=!1,this.typeExercice="Scratch",this.interactif=!0,this.listeAvecNumerotation=!1,this.indiceBonneFigure=0}nouvelleVersion(g){this.figures=[];const q=[];this.autoCorrection[0]={};const N=S(["polygonesReguliers","spirales","rosaces1","roueDentee","frise1"]);let o,t,c,s,i;const m=S(["turnright","turnleft"]);let x,p;m==="turnright"?p="turnleft":p="turnright";const e=[],u=f(0,3),P=90,j=0,O=0;T.unitesLutinParCm=10,T.pixelsParCm=20;let Q="";for(let r=0;r<4;r++)e[r]=Y(),e[r].color=L("green"),e[r].epaisseur=3,e[r].pointilles=0,E(j,O,e[r]),_(e[r]),H(re(P),e[r]);switch(e[0].codeScratch=`\\begin{scratch}[print,fill,blocks,scale=0.75]
 \\blockinit{quand \\greenflag est cliqué}
 `,e[0].codeScratch+=`\\blockmove{aller à x: \\ovalnum{${j}} y: \\ovalnum{${O}}}
 `,e[0].codeScratch+=`\\blockmove{s'orienter à \\ovalnum{${P}}}
 `,e[0].codeScratch+=`\\blockpen{stylo en position d'écriture}
 `,N){case"polygonesReguliers":s=S([3,5,6,7,8]),o=I(360/s,1),t=(10-s)*10,u!==3?e[0].codeScratch+=`\\blockrepeat{répéter \\ovalnum{${s}} fois}
{
\\blockmove{avancer de \\ovalnum{${t}} pas}
`:e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${o}} degrés}
\\blockrepeat{répéter \\ovalnum{${s-1}} fois}
{
\\blockmove{avancer de \\ovalnum{${t}} pas}

`,u===0||u===3?e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${o}} degrés}
}
`:u===1?e[0].codeScratch+=`\\blockmove{tourner \\${p}{} de \\ovalnum{${o}} degrés}
}
`:o!==90?e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${180-o}} degrés}
}
`:e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${o}} degrés}
              \\blockmove{avancer de \\ovalnum{${t}} pas}

              \\blockmove{tourner \\${m}{} de \\ovalnum{${o}} degrés}
}
`,H(-90,e[2]);for(let r=0;r<s;r++)l(t,e[0]),l(t,e[1]),l(t,e[2]),r!==0&&l(t,e[3]),m==="turnright"?(n(o,e[0]),n(o,e[3]),a(o,e[1]),o!==90?n(180-o,e[2]):(n(o,e[2]),l(t,e[2]),n(o,e[2]))):(a(o,e[0]),a(o,e[3]),n(o,e[1]),o!==90?a(180-o,e[2]):(a(o,e[2]),l(t,e[2]),a(o,e[2])));break;case"rosaces1":switch(s=S([3,4,5,6,8]),i=f(3,6,5),o=f(2,4)*10,t=(10-s)*5,c=(8-i)*4,e[0].codeScratch+=`\\blockrepeat{répéter \\ovalnum{${s}} fois} 
{`,u<2&&(e[0].codeScratch+=`\\blockmove{aller à x: \\ovalnum{0} y: \\ovalnum{0}}
`),u%2===0?e[0].codeScratch+=`\\blockmove{avancer de \\ovalnum{${o}} pas}
`:u===1?e[0].codeScratch+=`\\blockmove{avancer de \\ovalnum{${o/2}} pas}
`:e[0].codeScratch+=`\\blockmove{avancer de \\ovalnum{${o+2}} pas}
`,u){case 0:e[0].codeScratch+=`\\blockmove{tourner \\turnright{} de \\ovalnum{${90-180/i}} degrés}
`;break;case 1:e[0].codeScratch+=`\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}
`;break;case 2:e[0].codeScratch+=`\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}
`;break}switch(e[0].codeScratch+=`\\blockrepeat{répéter \\ovalnum{${i}} fois}
        {
          \\blockmove{avancer de \\ovalnum{${c}} pas}
          \\blockmove{tourner \\turnleft{} de \\ovalnum{${360/i}} degrés}
        }
`,u){case 0:e[0].codeScratch+=`\\blockmove{tourner \\turnleft{} de \\ovalnum{${90-180/i}} degrés}
`;break;case 1:e[0].codeScratch+=`\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}
`;break;case 2:e[0].codeScratch+=`\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}
`;break;case 3:e[0].codeScratch+=`\\blockmove{tourner \\turnright{} de \\ovalnum{180} degrés}
`;break}e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${360/s}} degrés}
}
`;for(let r=0;r<s;r++){E(0,0,e[0]),E(0,0,e[1]),l(o,e[0]),l(o/2,e[1]),l(o,e[2]),l(o+2,e[3]),n(90-180/i,e[0]),n(90,e[1]),a(90,e[2]);for(let d=0;d<i;d++)l(c,e[0]),l(c,e[1]),l(c,e[2]),l(c,e[3]),a(360/i,e[0]),a(360/i,e[1]),a(360/i,e[2]),a(360/i,e[3]);a(90-180/i,e[0]),a(90,e[1]),n(90,e[2]),n(180,e[3]),m==="turnright"?(n(360/s,e[0]),n(360/s,e[1]),n(360/s,e[2]),n(360/s,e[3])):(a(360/s,e[0]),a(360/s,e[1]),a(360/s,e[2]),a(360/s,e[3]))}break;case"spirales":s=S([3,4,5,6,8]),i=f(1,4)+Math.floor((9-s)/2),o=f(1,4)*5,t=60+f(0,4)*5,c=360/s,u!==2?e[0].codeScratch+=`\\blockvariable{mettre \\selectmenu*{longueur} à \\ovalnum{${o}}}
          \\blockrepeat{répéter jusqu'à ce que \\booloperator{\\ovalvariable{longueur}>\\ovalnum{${t}}}}
          {
          \\blockmove{avancer de \\ovalvariable{longueur} pas}
`:e[0].codeScratch+=`\\blockvariable{mettre \\selectmenu*{longueur} à \\ovalnum{${t}}}
          \\blockrepeat{répéter jusqu'à ce que \\booloperator{\\ovalvariable{longueur}<\\ovalnum{${o}}}}
          {
          \\blockmove{avancer de \\ovalvariable{longueur} pas}
`,u%2===0?e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${c}} degrés}
`:u===1?m==="turnright"?e[0].codeScratch+=`\\blockmove{tourner \\turnleft{} de \\ovalnum{${c}} degrés}
`:e[0].codeScratch+=`\\blockmove{tourner \\turnright{} de \\ovalnum{${c}} degrés}
`:e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${c-10}} degrés}
`,u===2?(e[0].codeScratch+=`\\blockvariable{ajouter \\ovalnum{${-i}} à \\ovalvariable{longueur}}
`,e[0].codeScratch+=`}
`):(e[0].codeScratch+=`\\blockvariable{ajouter \\ovalnum{${i}} à \\ovalvariable{longueur}}
`,e[0].codeScratch+=`}
`);for(let r=o;r<t;r+=i)l(r,e[0]),l(r,e[1]),l(r,e[3]),m==="turnright"?(n(c,e[0]),a(c,e[1]),n(c-10,e[3])):(a(c,e[0]),n(c,e[1]),a(c-10,e[3]));for(let r=t;r>o;r-=i)l(r,e[2]),m==="turnright"?n(c,e[2]):a(c,e[2]);break;case"roueDentee":s=S([3,4,5,6,8]),o=f(1,2)*10,t=720/s,c=360/s,u<5&&(e[0].codeScratch+=`\\blockrepeat{répéter \\ovalnum{${s}} fois}
                                  {
                                  \\blockmove{avancer de \\ovalvariable{${o}} pas}
`,u<2?e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${c}} degrés}
`:e[0].codeScratch+=`\\blockmove{tourner \\${p}{} de \\ovalnum{${c}} degrés}
`,e[0].codeScratch+=`\\blockmove{avancer de \\ovalvariable{${o*2}} pas}
`,u===0?e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${t}} degrés}
`:e[0].codeScratch+=`\\blockmove{tourner \\${p}{} de \\ovalnum{${t}} degrés}
`,u<3?e[0].codeScratch+=`\\blockmove{avancer de \\ovalvariable{${o*2}} pas}
`:e[0].codeScratch+=`\\blockmove{avancer de \\ovalvariable{${o}} pas}
`,u>0?e[0].codeScratch+=`\\blockmove{tourner \\${m}{} de \\ovalnum{${t}} degrés}
`:e[0].codeScratch+=`\\blockmove{tourner \\${p}{} de \\ovalnum{${t}} degrés}
`,e[0].codeScratch+=`}
`);for(let r=0;r<s;r++)l(o,e[0]),l(o,e[1]),l(o,e[2]),l(o,e[3]),m==="turnright"?(n(c,e[0]),n(c,e[1]),a(c,e[2]),a(c,e[3])):(a(c,e[0]),a(c,e[1]),n(c,e[2]),n(c,e[3])),l(o*2,e[0]),l(o*2,e[1]),l(o*2,e[2]),l(o*2,e[3]),m==="turnright"?(n(t,e[0]),a(t,e[1]),a(t,e[2]),a(t,e[3])):(a(t,e[0]),n(t,e[1]),n(t,e[2]),n(t,e[3])),l(o*2,e[0]),l(o*2,e[1]),l(o*2,e[2]),l(o,e[3]),m==="turnright"?(a(t,e[0]),n(t,e[1]),n(t,e[2]),n(t,e[3])):(n(t,e[0]),a(t,e[1]),a(t,e[2]),a(t,e[3]));break;case"frise1":s=3,i=S([45,60,90]),i=S([45,60,90]),o=f(1,2)*5,t=f(1,3)*5,c=f(2,4)*5,x=[[`\\blockmove{avancer de \\ovalvariable{${t}} pas}
`,t],[`\\blockmove{tourner \\${m}{} de \\ovalnum{${i}} degrés}
`,m,i],[`\\blockmove{avancer de \\ovalvariable{${o}} pas}
`,o],[`\\blockmove{tourner \\${m}{} de \\ovalnum{${i}} degrés}
`,m,i],[`\\blockmove{avancer de \\ovalvariable{${o}} pas}
`,o],[`\\blockmove{tourner \\${p}{} de \\ovalnum{${i}} degrés}
`,p,i],[`\\blockmove{avancer de \\ovalvariable{${o}} pas}
`,o],[`\\blockmove{tourner \\${p}{} de \\ovalnum{${i}} degrés}
`,p,i],[`\\blockmove{avancer de \\ovalvariable{${c}} pas}
`,c],[`\\blockmove{tourner \\${p}{} de \\ovalnum{${i}} degrés}
`,p,i],[`\\blockmove{avancer de \\ovalvariable{${t}} pas}
`,t],[`\\blockmove{tourner \\${m}{} de \\ovalnum{${i}} degrés}
`,m,i]],e[0].codeScratch+=`\\blockrepeat{répéter \\ovalnum{${s}} fois}
{
`;for(let r=0;r<6;r++)e[0].codeScratch+=x[2*(u+r)%12][0],e[0].codeScratch+=x[(2*(u+r)+1)%12][0];e[0].codeScratch+=`}
`;for(let r=0;r<s;r++)for(let d=0;d<6;d++)for(let $=0;$<4;$++)l(Number(x[2*($+d)%12][1]),e[$]),x[(2*($+d)+1)%12][1]==="turnright"?n(Number(x[(2*($+d)+1)%12][2]),e[$]):a(Number(x[(2*($+d)+1)%12][2]),e[$]);break}e[0].codeScratch+=`\\blockpen{relever le stylo}
`,e[0].codeScratch+="\\end{scratch}";let v="Quelle figure est tracée par le stylo à l'exécution du programme ci-dessous ?<br>Le tracé démarre à la croix bleue.<br>";v+="S'orienter à 90° signifie s'orienter vers la droite de l'écran.<br>";let h=1,M=1;for(let r=0;r<4;r++)ee(e[r]),h=Math.max(h,e[r].xMax-e[r].xMin),M=Math.max(M,e[r].yMax-e[r].yMin);h=Math.round(h+1.5),T.isHtml?v+='<table style="width: 100%"><tr><td>':v+="\\begin{minipage}[b]{.25\\textwidth}",v+=oe(e[0].codeScratch),T.isHtml?(v+="</td><td>",v+="    ",v+='</td><td style="vertical-align: top; text-align: center">'):(v+="\\end{minipage} ",v+="\\hfill \\begin{minipage}[b]{.74\\textwidth}");let b=[0,1,2,3];b=U(b);for(let r=0;r<4;r++)for(let d=0;d<e[r].listeTraces.length;d++)e[r].listeTraces[d][0]-=Math.floor(e[r].xMin),e[r].listeTraces[d][2]-=Math.floor(e[r].xMin),e[r].listeTraces[d][1]-=Math.floor(e[r].yMin),e[r].listeTraces[d][3]-=Math.floor(e[r].yMin);const C=[];for(let r=0;r<4;r++)C[r]=Z(w(e[r].listeTraces[0][0],e[r].listeTraces[0][1])),C[r].taille=5,C[r].color=L("blue"),C[r].epaisseur=2,r===u&&q.push(C[r]);const D=J(0,M+.5,1,M+.5);D.epaisseur=2,D.styleExtremites="|-|",q.push(e[u]);const A={xmin:-.5,ymin:-1.5,xmax:h,ymax:M+1,pixelsParCm:Math.round(400/h),scale:4/h,style:"display: inline-block"},B={xmin:-.5,ymin:-1.5,xmax:h,ymax:M+1,pixelsParCm:Math.round(400/h),scale:4/h,style:"display: inline-block"};for(let r=0;r<4;r++){const d={...A,id:`cliquefigure${r}Ex${g}Q0`};v+=R(d,e[b[r]],C[b[r]],K(`figure ${r+1}`,w((e[b[r]].xMax-e[b[r]].xMin)/2,-.8),0,"black",1)),r===1&&(v+="<br>")}T.isHtml?v+="</td></tr></table>":v+="\\end{minipage} ",this.autoCorrection[0]={enonce:v,propositions:[{texte:"figure 1",statut:!1},{texte:"figure 2",statut:!1},{texte:"figure 3",statut:!1},{texte:"figure 4",statut:!1}],options:{ordered:!0}},this.autoCorrection[0].propositions[b.indexOf(u)].statut=!0,W(this.autoCorrection[0]),this.indiceBonneFigure=b.indexOf(u),Q+=`La bonne figure est la figure ${this.indiceBonneFigure+1}`,this.interactif&&T.isHtml&&(v+=`<span id="resultatCheckEx${this.numeroExercice}Q0"></span>`),this.figures[0]=[{id:`cliquefigure0Ex${this.numeroExercice}Q0`,solution:b.indexOf(u)===0},{id:`cliquefigure1Ex${g}Q0`,solution:b.indexOf(u)===1},{id:`cliquefigure2Ex${g}Q0`,solution:b.indexOf(u)===2},{id:`cliquefigure3Ex${g}Q0`,solution:b.indexOf(u)===3}],Q+=R(B,q),this.listeQuestions.push(v),this.listeCorrections.push(Q),X(this)}}export{gr as amcReady,$r as amcType,Sr as dateDePublication,Mr as default,hr as interactifReady,fr as interactifType,yr as refs,kr as titre,xr as uuid};
//# sourceMappingURL=4I1-2-C7Cc65DL.js.map
