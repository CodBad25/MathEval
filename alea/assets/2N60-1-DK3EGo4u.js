import{E as U,ah as W,r as u,F as B,p as R,d4 as G,s as h,v as K,k as y,B as M,N as C,az as S,b as A,K as E,n as D,G as $,z as p,R as j,a1 as O,V as w,aq as X,x as v,ap as c,m as N,am as Y,y as d,j as L,o as Z}from"./index-Bk_D2JkM.js";import{a as _}from"./Personne-BA_n6lJG.js";import{b as T,t as ee}from"./style-BoyDn0TU.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const xt=!0,dt="mathLive",bt="Modéliser un problème par une inéquation",gt="14/02/2023",ft="03/04/2025",qt="d2084",ht={"fr-fr":["2N60-1","BP2RES18"],"fr-ch":[]};class vt extends U{constructor(){super(),this.besoinFormulaireNumerique=["Choix des questions",4,`1 : Situation concrète
2 : Situation géométrique
3 : Programme de calcul
4 : Mélange des cas précédents`],this.nbQuestions=1,this.sup=4,this.spacing=1.5,this.spacingCorr=1.5}nouvelleVersion(){let Q;this.sup===1?Q=["typeE1","typeE2","typeE3"]:this.sup===2?Q=["typeE4","typeE5","typeE6"]:this.sup===3?Q=["typeE7","typeE8"]:Q=["typeE1","typeE2","typeE3","typeE4","typeE5","typeE6","typeE7","typeE8"];const J=W(Q,this.nbQuestions);for(let l=0,H=0;l<this.nbQuestions&&H<50;){let s="",a="",m="";switch(J[l]){case"typeE1":{const t=u(20,30),e=u(t+5,50),r=u(20,35)/100,i=u(14,19)/100;s=`  Une société de location de véhicules particuliers propose deux tarifs :<br>
              $\\bullet$ Tarif A : un forfait de $${t}$ € et $${$(r,2)}$ € par km parcouru ;<br>
              $\\bullet$  Tarif B : un forfait de $${e}$ € et $${$(i,2)}$ € par km parcouru ;<br>
                      À partir de combien de km (arrondi à l'unité), le tarif B est-il plus intéressant que le tarif A ?<br>`,a=`En notant $x$, le nombre de km parcourus, on a :<br>
              $\\bullet$ Avec le tarif A, le prix à payer est : $${L(r,t)}$ ;<br>
              $\\bullet$  Avec le tarif B, le prix à payer est : $${L(i,e)}$ ;<br>
                       Le tarif B est plus avantageux que le tarif A lorsque $x$ vérifie : $${L(i,e)} < ${L(r,t)}$.<br>
                       On résout cette inéquation : <br>
              $\\begin{aligned}
              ${$(i,2)}x+${e}&<${$(r,2)}x+${t}\\\\
              ${$(i,2)}x+${e}-${d($(r,2))}${d("\\textit{x}")}&< ${$(r,2)}x-${d($(r,2))}${d("\\textit{x}")}+${t}\\\\
                     ${$(i-r)}x+${e}&<${t}\\\\
              ${$(i-r,2)}x+${e}-${d($(e))}&<${t}-${e}\\\\
              ${$(i-r,2)}x&<${t-e}\\\\
      \\dfrac{${$(i-r,2)}x}{${d($(i-r,2))}}&>\\dfrac{${t-e}}{${d($(i-r,2))}}${h(7)} \\text{On divise par } ${$(i-r,2)} <0\\\\
      x&>\\dfrac{${C(t-e)}}{${$(C(i-r),2)}}
      \\end{aligned}$<br>`,Math.round((t-e)/(i-r))===(t-e)/(i-r)?(a+=`Comme $\\dfrac{${C(t-e)}}{${$(C(i-r),2)}}= ${$((t-e)/(i-r),2)}$, c'est donc pour une distance minimale de  $${d($(Math.ceil((t-e)/(i-r))+1,0))}$ km que le tarif B est plus intéressant que le tarif A.
             `,m=$(Math.ceil((t-e)/(i-r))+1,0)):(a+=` Comme $\\dfrac{${C(t-e)}}{${$(C(i-r),2)}}\\simeq ${$((t-e)/(i-r),2)}$, c'est donc pour une distance minimale de  $${d(Math.ceil((t-e)/(i-r)))}$ km que le tarif B est plus intéressant que le tarif A.
                            `,m=$(Math.ceil((t-e)/(i-r)),0)),s+="<br>"+A(this,l,E.clavierDeBaseAvecFraction,{texteApres:" km"}),D(this,l,{reponse:{value:m}})}break;case"typeE2":{const t=_(),e=u(90,120),r=u(15,25)/100,i=u(20,35)*10;s=` Pour la location mensuelle d'un véhicule, une entreprise propose le tarif suivant :<br>
            Forfait de $${e}$ € quel que soit le nombre de km parcourus, puis un supplément par kilomètre parcouru de $${$(r,2)}$ €. <br>
            
            ${t} loue une voiture à cette société. Elle a un budget de $${i}$ € et ne veut pas le dépasser.<br>
                      Quel nombre maximum de km (arrondi à l'unité) pourra-t-elle parcourir sans dépasser son budget  ?
                                   `,a=`En notant $x$, le nombre de km parcourus, le coût pour la location mensuelle est donné par : $${L(r,e)}$.<br>
            Le budget de ${t} étant de  $${i}$ €, le nombre de km $x$ qu'elle pourra parcourir doit vérifier $${L(r,e)}<${i}$.<br>
            $\\begin{aligned}
            ${L(r,e)}&\\leqslant${i}\\\\
            ${$(r,2)}x+${e}-${d(e)}&\\leqslant ${i}x-${d(e)}\\\\
            ${$(r,2)}x&\\leqslant${i-e}\\\\
            x&\\leqslant\\dfrac{${i-e}}{${$(r,2)}}
    \\end{aligned}$<br>`,a+=`Comme $\\dfrac{${i-e}}{${$(r,2)}}${Math.round((i-e)/r)===(i-e)/r?"=":"\\simeq"} ${$((i-e)/r,2)}$, ${t} pourra faire au maximum  $${Math.floor((i-e)/r)}$ km pendant le mois avec son budget de $${i}$ €.
       `,m=$(Math.floor((i-e)/r),0),s+="<br>"+A(this,l,E.clavierDeBaseAvecFraction,{texteApres:" km"}),D(this,l,{reponse:{value:m}})}break;case"typeE3":{const t=u(7,25,[10,20])/2,e=u(70,150),r=u(200,400)*10;s=` À la mi-journée, la recette d'un musée s'élève à $${$(t*e,2)}$ € pour $${e}$ entrées. Le prix de l'entrée est unique.<br>
                Quel doit être le minimum d'entrées en deuxième partie de journée pour que la recette de la journée soit au moins égale à  $${$(r)}$ € ?<br>
                Résoudre ce problème en écrivant et résolvant une inéquation modélisant la situation.
                                       `,a=`Le montant du billet d'entrée est donné par $${$(t*e,2)}${h(1)} € \\div ${e}=${ee(t)}$ €.<br>

                En notant $x$ le nombre d'entrées en deuxième partie de journée, on obtient : $${$(t*e,2)} +${$(t,2)}\\times x\\geqslant ${$(r)}$.<br>

                $\\begin{aligned}
                ${$(t*e,2)} +${$(t,2)} x&\\geqslant ${$(r)}\\\\
                ${$(t*e,2)} +${$(t,2)}x-${d($(t*e,2))}&\\geqslant ${$(r)}-${d($(t*e,2))}\\\\
                ${$(t,2)}x&\\geqslant ${$(r-t*e,2)}\\\\
                x&\\geqslant \\dfrac{${$(r-t*e,2)}}{${$(t,2)}}\\\\
    \\end{aligned}$<br>
  Comme  $\\dfrac{${$(r-t*e,2)}}{${$(t,2)}}${Math.round((r-t*e)/t)===(r-t*e)/t?"=":"\\simeq"} ${$((r-t*e)/t,1)}$,
  il faudra au minimum ${Math.round((r-t*e)/t)===(r-t*e)/t?`$${$((r-t*e)/t,0)}$`:`$${$(Math.floor((r-t*e)/t)+1,0)} $`} entrées pour que la recette de la journée soit au moins égale à  $${$(r)}$ €.
                            `,m=Math.round((r-t*e)/t)===(r-t*e)/t?$((r-t*e)/t,0):$(Math.floor((r-t*e)/t)+1,0),s+="<br>"+A(this,l,E.clavierDeBaseAvecFraction,{texteApres:"entrées"}),D(this,l,{reponse:{value:m}})}break;case"typeE4":{const t=R([!0,!1]),e=u(3,10),r=e+u(3,10),i=R([["au tiers",3],["au quart",4],["à la moitié",2],["au dixième",10],["au cinquième",5]]),o=new B(r*e/2,i[1]*e/2+e/2).simplifie(),n=new B(e*r,e*i[1]+e).simplifie(),f=p(0,0,"A","below"),F=p(10,0,"B","below"),g=p(10,6,"C"),x=p(4,0,"M","below"),b=p(0,6,"D"),q=[],k=O([f,x,b],"black"),P=O([g,x,F],"black");k.couleurDeRemplissage=w("lightgray"),P.couleurDeRemplissage=w("lightgray"),q.push(j(f,F),j(F,g),j(b,f),j(g,b),Y(f,F,g,b,x),k,P),q.push(v("x",c(f,x).x,c(f,x).y-.7,0,"black",1,"milieu",!0),v(`${$(e)}`,c(f,b).x-.5,c(f,b).y,0,"black",1,"milieu",!0),v(`${$(r)}`,c(g,b).x,c(g,b).y+.5,0,"black",1,"milieu",!0)),s=` Soit $ABCD$ un rectangle tel que $AD=${e}$ et $DC=${r}$.<br>
            $M$ est un point du segment $[AB]$. On note $AM=x$.<br>
            Pour quelles valeurs de $x$ l'aire du triangle $AMD$ est-elle ${t?"au plus":"au moins"} égale ${i[0]} de l'aire du triangle $CMB$ ?<br>
              `,s+=N({xmin:-1,ymin:-1,xmax:12,ymax:8,pixelsParCm:20,mainlevee:!1,amplitude:.5,scale:.5,style:"margin: auto"},q),a=` L'aire du triangle $AMD$ est : ${e%2===0?`$\\dfrac{x\\times ${e}}{2}=${$(e/2,0)}x$`:`$\\dfrac{x\\times ${e}}{2}$`}. <br>
            Comme $MB=${r}-x$, l'aire du triangle $CMB$ est : ${e%2===0?`$\\dfrac{(${r}-x)\\times ${e}}{2}=${$(e/2,0)}(${r}-x)$`:`$\\dfrac{(${r}-x)\\times ${e}}{2}$`}. <br>
            Le problème revient donc à déterminer les valeurs de $x$ telles que : $${e%2===0?`${$(e/2,0)}x`:`\\dfrac{${e}x}{2}`} ${t?"\\leqslant":"\\geqslant"} ${e%2===0?`\\dfrac{1}{${i[1]}}\\times ${$(e/2,0)}(${r}-x)`:`\\dfrac{1}{${i[1]}}\\times \\dfrac{${e}(${r}-x)}{2}`}$. <br>`,e%2===0?(a+=`$\\begin{aligned}
            ${$(e/2,0)}x &${t?"\\leqslant":"\\geqslant"}  \\dfrac{${$(e/2,0)}(${r}-x)}{${i[1]}}${h(7)}\\\\`,a+=` ${$(e/2,0)}x \\times ${i[1]}&${t?"\\leqslant":"\\geqslant"} \\dfrac{${$(e/2,0)}(${r}-x)}{${i[1]}}\\times ${i[1]} ${h(7)}\\text{ On  multiplie par ${i[1]}, le sens de l'inéquation ne change pas.}\\\\`,a+=` ${$(i[1]*e/2,0)}x &${t?"\\leqslant":"\\geqslant"}  ${$(e/2,0)}(${r}-x)\\\\`,a+=` ${$(i[1]*e/2,0)}x &${t?"\\leqslant":"\\geqslant"}  ${$(r*e/2,0)}-${$(e/2,0)}x\\\\`,a+=` ${$(i[1]*e/2,0)}x +${$(e/2,0)}x&${t?"\\leqslant":"\\geqslant"}  ${$(r*e/2,0)}\\\\`,a+=` ${$(i[1]*e/2+e/2,0)}x &${t?"\\leqslant":"\\geqslant"}  ${$(r*e/2,0)}\\\\`,a+=` x &${t?"\\leqslant":"\\geqslant"}  ${o.texFraction}\\\\`,a+="\\end{aligned}$<br>",a+=`L'aire du triangle $AMD$ est ${t?"au plus":"au moins"} égale ${i[0]} de l'aire du triangle $CMB$ pour $x\\in ${t?`${d(`\\left[0\\,;\\,${o.texFraction}\\right]`)}`:`${d(`\\left[${o.texFraction}\\,;\\,${r}\\right]`)}`}$`,m=t?`[0;${o.texFraction}]`:`[${o.texFraction};${r}]`,s+="<br>"+A(this,l,E.clavierEnsemble)):(a+=`$\\begin{aligned}
              \\dfrac{${e} x}{2} &${t?"\\leqslant":"\\geqslant"} \\dfrac{${e}(${r}-x)}{${2*i[1]}}\\\\`,a+=`\\dfrac{${e} x}{2} \\times ${2*i[1]}&${t?"\\leqslant":"\\geqslant"} \\dfrac{${e}(${r}-x)}{${$(i[1]*2,0)}}\\times ${2*i[1]} ${h(7)}\\text{ On multiplie par ${2*i[1]}, le sens des inégalités ne change pas.}\\\\`,a+=` ${$(e*i[1],0)}x &${t?"\\leqslant":"\\geqslant"} ${e}(${r}-x)\\\\`,a+=` ${$(e*i[1],0)}x &${t?"\\leqslant":"\\geqslant"} ${e*r}-${e}x\\\\`,a+=` ${$(e*i[1],0)}x +${e}x&${t?"\\leqslant":"\\geqslant"} ${e*r}\\\\`,a+=` ${$(e*i[1]+e,0)}x &${t?"\\leqslant":"\\geqslant"} ${e*r}\\\\`,a+=` x &${t?"\\leqslant":"\\geqslant"}  ${n.texFraction}\\\\`,a+="\\end{aligned}$<br>",a+=`L'aire du triangle $AMD$ est ${t?"au plus":"au moins"} égale ${i[0]} de l'aire du triangle $CMB$ pour $x\\in ${t?`${d(`\\left[0\\,;\\,${o.texFraction}\\right]`)}`:`${d(`\\left[${o.texFraction}\\,;\\,${r}\\right]`)}`}$`,m=t?`[0;${o.texFraction}]`:`[${o.texFraction};${r}]`,s+="<br>"+A(this,l,E.clavierEnsemble)),D(this,l,{reponse:{value:m,options:{intervalle:!0}}})}break;case"typeE5":{const t=u(8,15),e=u(2,6),r=u(50,70),i=p(0,0,"A"),o=p(10,0,"B"),n=p(10,6,"C"),f=p(0,6,"D"),F=p(0,2,"E"),g=p(-2,2,"F"),x=p(-2,0,"G"),b=j(i,F);b.pointilles=2;const q=[],k=O([i,o,n,f,F,g,x],"black");k.couleurDeRemplissage=w("lightgray"),q.push(k,b),q.push(v("x",c(x,g).x-.5,c(x,g).y,0,"black",1,"milieu",!0),v("x",c(x,i).x,c(x,i).y-.5,0,"black",1,"milieu",!0),v(`x+${$(e)}`,c(o,n).x+1,c(o,n).y,0,"black",1,"milieu",!0),v(`${$(t)}`,c(i,o).x,c(i,o).y-.5,0,"black",1,"milieu",!0)),s=` On considère la figure ci-dessous (l'unité est le centimètre). <br>
            Quelles sont les valeurs possibles de $x$ pour que le périmètre de la figure soit supérieur à $${r}$ cm.<br>
              `,s+=N({xmin:-3,ymin:-1,xmax:12,ymax:8,pixelsParCm:20,mainlevee:!1,amplitude:.5,scale:.5,style:"margin: auto"},q),a=`Le périmètre de la figure est : $x+${t}+(x+${e})+${t}+${e}+x+x=4x+${2*e+2*t}$.<br>
            Le périmètre de la figure doit être supérieur à $${r}$, on cherche $x$ tel que : <br>

             `,a+=`$\\begin{aligned}
            4x+${2*e+2*t} &>${r}\\\\
            4x &>${r}-${2*e+2*t}\\\\
            4x&>${r-2*e-2*t}\\\\
            x&>\\dfrac{${r-2*e-2*t}}{4}`,a+="\\end{aligned}$<br>",a+=`Comme $\\dfrac{${r-2*e-2*t}}{4}=${$((r-2*e-2*t)/4,2)}$, $x$ doit être supérieur à $${$((r-2*e-2*t)/4,2)}$ cm pour que le périmètre de la figure soit supérieur à $${r}$ cm.

             `,m=new B(r-2*e-2*t,4).texFraction,s+="<br>"+A(this,l,E.clavierDeBaseAvecFraction,{texteAvant:"$x>$"}),D(this,l,{reponse:{value:m}})}break;case"typeE6":{const t=u(1,3),e=R([6,8,10,12]),r=u(50,70),i=new B(r-t**2,t+e/2).simplifie(),o=p(0,0,"A"),n=p(8,0,"B"),f=p(10,0,"C"),F=p(10,2,"D"),g=p(8,2,"E"),x=p(4,8,"F"),b=p(0,2,"G"),q=p(4,2,"H"),k=j(x,q);k.pointilles=2;const P=[],z=O([o,n,g,b],"black");z.couleurDeRemplissage=w("#7dbdd8");const V=O([n,f,F,g],"black");V.couleurDeRemplissage=w("#e1ac66");const I=O([b,g,x],"black");I.couleurDeRemplissage=w("#75ee7e"),P.push(z,V,I,k,X(x,q,g)),P.push(v("x",c(o,n).x,c(o,n).y-.7,0,"black",1,"milieu",!0),v(`${$(t)}`,c(b,o).x-.8,c(b,o).y,0,"black",1,"milieu",!0),v(`${$(t)}`,c(n,f).x,c(n,f).y-.7,0,"black",1,"milieu",!0),v(`${$(e)}`,c(x,q).x+.5,c(x,q).y,0,"black",1,"milieu",!0)),s=` On considère la figure ci-dessous sur laquelle les longueurs sont en cm. <br>
            Quelles sont les valeurs possibles de $x$ pour que l'aire de cette  figure dépasse  $${r}$ cm$^2$ ?<br>
            Résoudre ce problème en le modélisant par une inéquation.<br>
              `,s+=N({xmin:-3,ymin:-1,xmax:12,ymax:9,pixelsParCm:20,mainlevee:!1,amplitude:.5,scale:.5,style:"margin: auto"},P),a=`La figure est constituée d'un rectangle, d'un carré et d'un triangle.<br>
           $\\bullet$  L'aire du rectangle est : $${t}\\times x=${M(t)}x$.<br>
           $\\bullet$  L'aire du carré est : $${t}\\times ${t}=${t**2}$.<br>
           $\\bullet$  L'aire du triangle est : $\\dfrac{${e}\\times x}{2}=${$(e/2,0)}x$.<br>
Le problème revient donc à trouver les valeurs de $x$ vérifiant : $${M(t)}x+${t**2}+${$(e/2,0)}x>${r}$, soit $${$(t+e/2,0)}x+${t**2}>${r}$.<br>

             `,a+=`$\\begin{aligned}
            ${$(t+e/2,0)}x+${t**2} &>${r}\\\\
            ${$(t+e/2,0)}x &>${r}-${t**2}\\\\
            ${$(t+e/2,0)}x &>${r-t**2}\\\\
            x&>\\dfrac{${r-t**2}}{${$(t+e/2,0)}}`,a+="\\end{aligned}$<br>",S(r-t**2,t+e/2)===1?(a+=`$x$ doit être supérieur à $\\dfrac{${r-t**2}}{${$(t+e/2,0)}}$ cm pour que l'aire  de la figure dépasse $${r}$ cm$^2$.
            `,m=new B(r-t**2,t+e/2).texFraction):(a+=`Comme $\\dfrac{${r-t**2}}{${$(t+e/2,0)}}=${i.texFraction}$, $x$ doit être supérieur à $${i.texFraction}$ cm pour que l'aire  de la figure dépasse $${r}$ cm$^2$.
             `,m=i.texFraction),s+="<br>"+A(this,l,E.clavierDeBaseAvecFraction,{texteAvant:"$x>$"}),D(this,l,{reponse:{value:m}})}break;case"typeE7":{const t=u(-10,10,[-1,0,1]),e=u(-10,10,[-1,0,1]),r=u(2,10),i=u(-20,20,0),o=new B(i-e*r,r*t).simplifie(),n=R([["strictement supérieur",">","<"],["strictement inférieur","<",">"],["inférieur ou égal ","\\leqslant","\\geqslant"],["supérieur ou égal ","\\geqslant","\\leqslant"]]);s=` ${T("Voici un programme de calcul :")} `,s+=G(["Choisir un nombre",`Multiplier ce nombre par $${t}$`,`Ajouter $${e}$`,`Multiplier le résultat par $${r}$`]),s+=`Quels nombres doit-on choisir au départ pour obtenir un nombre ${n[0]} à $${i}$.<br>
               `,a=`En notant $x$ le nombre choisi au départ, on obtient  :<br>
          $\\bullet$ Multiplier ce nombre par $${t}$ : ${h(6)}$${t}\\times x=${t}x$ ;<br>
          $\\bullet$ Ajouter $${e}$ : ${h(6)}$${t}x${y(e)}$ ; <br>
          $\\bullet$ Multiplier le résultat par $${r}$ :${h(6)}$${r}\\times (${t}x${y(e)})=${$(r*t)}x${y(e*r)}$.<br>
          On cherche $x$ tel que : <br>`,a+=`$\\begin{aligned}
         ${$(r*t)}x${y(e*r)} &${n[1]}${i}\\\\
         ${$(r*t)}x &${n[1]}${i}${y(-e*r)}\\\\`,a+=` x &${r*t>0?`${n[1]}`:`${n[2]}`}\\dfrac{${i-e*r}}{${$(r*t)}}\\\\`,a+="\\end{aligned}$<br>",S(i-e*r,r*t)===1?(a+=`On doit choisir $x${r*t>0?`${n[1]}`:`${n[2]}`}${o.texFraction}$ pour obtenir un nombre ${n[0]} à $${i}$. .
            `,s+="<br>"+A(this,l,E.clavierDeBaseAvecFraction,{texteAvant:r*t>0?`$x${n[1]}$`:`$x${n[2]}$`})):(a+=`Comme $\\dfrac{${i-e*r}}{${$(r*t)}}=${o.texFraction}$, on doit choisir $x${r*t>0?`${n[1]}`:`${n[2]}`}${o.texFraction}$ pour obtenir un nombre ${n[0]} à $${i}$.
             `,s+="<br>"+A(this,l,E.clavierDeBaseAvecFraction,{texteAvant:r*t>0?`$x${n[1]}$`:`$x${n[2]}$`})),m=o.texFraction,D(this,l,{reponse:{value:m}})}break;case"typeE8":{const t=u(-10,10,0),e=u(-10,10,0),r=new B(e*e,t-2*e).simplifie(),i=R([["strictement supérieur",">","<"],["strictement inférieur","<",">"],["inférieur ou égal ","\\leqslant","\\geqslant"],["supérieur ou égal ","\\geqslant","\\leqslant"]]);s=`On donne les deux programmes de calcul suivants :<br>
            ${T("Programme 1 :")}<br>
                   `,s+=G(["Choisir un nombre",`Ajouter $${t}$`,"Multiplier le résultat par le nombre choisi au départ"]),s+=`<br>
            ${T("Programme 2 :")}<br>
                        `,s+=G(["Choisir un nombre",`Ajouter $${e}$`,"Prendre le carré du résultat"]),s+=`<br>Déterminer les nombres que l'on  doit entrer dans ces deux programmes pour qu'au final le résultat obtenu
            avec le programme 1 soit ${i[0]} à celui obtenu avec le programme 2.<br><br>`,a=`En notant $x$ le nombre choisi au départ : <br>
            On obtient avec le ${T("programme 1 :")} <br>
            $\\bullet$ Ajouter $${t}$ : ${h(5)} $x+${K(t)}$ ;<br>
            $\\bullet$ Multiplier le résultat par le nombre choisi au départ: ${h(5)} $x\\times(x${y(t)})=x^2${t>0?"+":"-"}${M(C(t))}x$.<br>
                   On obtient avec le ${T("programme 2 :")} <br>
        $\\bullet$ Ajouter $${e}$ :${h(5)} $x+${K(e)}$ ;<br>
        $\\bullet$ Prendre le carré du résultat :${h(5)} $(x${y(e)})^2=x^2${y(2*e)}x+${e*e}$.<br>
        
        Les nombres $x$ que l'on  doit entrer dans les deux programmes pour qu'au final le résultat obtenu avec le programme 1 soit ${i[0]} à celui obtenu avec le programme 2 vérifient : <br>
        $\\begin{aligned}
        x^2${t>0?"+":"-"}${M(C(t))}x & ${i[1]} x^2${y(2*e)}x+${e*e}\\\\
 ${M(t)}x & ${i[1]} ${y(2*e)}x+${e*e}\\\\
 ${2*e>0?`${M(t)}x- ${2*e}x`:`${M(t)}x- (${2*e}x)`}& ${i[1]} ${e*e}\\\\
 ${M(t-2*e)}x& ${i[1]} ${e*e}\\\\`,t-2*e===1?a+="":a+=` x &${t-2*e>0?`${i[1]}`:`${i[2]}`}\\dfrac{${e*e}}{${t-2*e}}\\\\`,a+="\\end{aligned}$<br>",S(e*e,t-2*e)===1?a+=`On doit choisir $x${t-2*e>0?`${i[1]}`:`${i[2]}`}${r.texFraction}$ pour que le résultat obtenu
  avec le programme 1 soit ${i[0]} à celui obtenu avec le programme 2.
`:a+=`Comme $\\dfrac{${e*e}}{${t-2*e}}=${r.texFraction}$, on doit choisir $x${t-2*e>0?`${i[1]}`:`${i[2]}`}${r.texFraction}$ pour que le résultat obtenu
  avec le programme 1 soit ${i[0]} à celui obtenu avec le programme 2.`,s+=A(this,l,E.clavierDeBaseAvecFraction,{texteAvant:t-2*e>0?`$x${i[1]}$`:`$x${i[2]}$`}),m=r.texFraction,D(this,l,{reponse:{value:m}})}break}this.questionJamaisPosee(l,m)&&(this.listeQuestions[l]=s,this.listeCorrections[l]=a,l++),H++}Z(this)}}export{ft as dateDeModifImportante,gt as dateDePublication,vt as default,xt as interactifReady,dt as interactifType,ht as refs,bt as titre,qt as uuid};
//# sourceMappingURL=2N60-1-DK3EGo4u.js.map
