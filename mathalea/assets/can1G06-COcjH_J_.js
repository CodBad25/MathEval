import{D as V,p,z as I,r as y,aj as u,ap as Q,a1 as F,ak as v,R as P,am as k,m,G as B,aq as J,ar as T,F as K,al as U}from"./index-DjA7ROjC.js";import{D as H}from"./vendors/decimal.js-16C9rIKp.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const se="Déterminer un produit scalaire sur des figures géométriques classiques ",$e=!0,ne="mathLive",le="27/06/2022",he="a394f",ce={"fr-fr":["can1G06"],"fr-ch":[]};class ge extends V{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){let t,o,a,i,q,d,w,S,r,s,z,f,M,L,j,b,A,$,O,C,D,x,E,R,G,N,g,e,n,l,h,c;switch(p([1,2,3,4])){case 1:g=p(["a","b"]),t=I(0,0,"A","below"),r=y(4,8),s=y(4,8),f=new H(r*s).div(2),O=new K(r*s,2),o=u(t,s,0,"B","below"),A=p([30,45,60]),a=u(o,r,A,"C","above"),i=u(t,r,A,"D","above"),C=F(t,o,a,i),D=v(o,t,"black",.5,""),x=v(a,o,"black",.5,""),E=U(o,t,i,"black",1.5,`${A}^\\circ`),$=[],n=Math.min(t.x,o.x,a.x,i.x)-1,l=Math.min(t.y,o.y,a.y,i.y)-1,c=Math.max(t.x,o.x,a.x,i.x)+1,h=Math.max(t.y,o.y,a.y,i.y)+1,$.push(k(t,o,a,i),D,x,E,C),this.question="$ABCD$ est un parallélogramme.<br>",g==="a"&&(this.question+=`Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),A===30&&(this.correction=`
      $\\begin{aligned}
     \\overrightarrow{AB}\\cdot \\overrightarrow{AD}&=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
      &=${r}\\times ${s}\\times \\cos\\left(${A}°\\right)\\\\
               &=${r*s}\\times\\dfrac{\\sqrt{3}}{2}\\\\
               &=${B(f,1)}\\sqrt{3}
               \\end{aligned}$`,this.reponse=[`${f}\\sqrt{3}`,`${O.texFraction}\\times\\sqrt{3}`]),A===45&&(this.correction=`
      $\\begin{aligned}
     \\overrightarrow{AB}\\cdot \\overrightarrow{AD}&=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
      &=${r}\\times ${s}\\times \\cos\\left(${A}°\\right)\\\\
               &=${r*s}\\times \\dfrac{\\sqrt{2}}{2}\\\\
               &=${B(f,1)}\\sqrt{2}
               \\end{aligned}$`,this.reponse=[`${f}\\sqrt{2}`,`${O.texFraction}\\times\\sqrt{2}`]),A===60&&(this.correction=`
      $\\begin{aligned}
     \\overrightarrow{AB}\\cdot \\overrightarrow{AD}&=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
      &=${r}\\times ${s}\\times \\cos\\left(${A}°\\right)\\\\
               &=${r*s}\\times \\dfrac{1}{2}\\\\
               &=${B(f,1)}
               \\end{aligned}$`,this.reponse=[`${f}`,`${O.texFraction}`])),g==="b"&&(p([!0,!1])?(this.question+=`Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{DC}$.<br>
            
            `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=`
    Les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{DC}$ sont colinéaires et de même sens.<br>
    On en déduit : $\\overrightarrow{AB}\\cdot \\overrightarrow{DC}=AB\\times DC=${s}\\times ${s}=${s*s}$.`,this.reponse=s*s):(this.question=`Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{CD}$.<br>
            
            `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=`
      Les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$ sont colinéaires et de sens contraires.<br>
      On en déduit : $\\overrightarrow{AB}\\cdot \\overrightarrow{CD}=-AB\\times DC=-${s}\\times ${s}=${-s*s}$.`,this.reponse=-s*s));break;case 2:e=p([!0,!1]),g=p(["a","b","c","d","e"]),t=I(0,0,"A","below"),r=p([4,6,8,10]),b=new H(r*r).div(4),o=u(t,r,0,"B","below"),a=u(o,r,90,"C","above"),i=u(t,r,90,"D","above"),C=F(t,o,a,i),q=Q(t,o,"I","below"),D=v(i,a,"black",.5,""),x=v(a,o,"black",.5,""),$=[],n=Math.min(t.x,o.x,a.x,i.x)-1,l=Math.min(t.y,o.y,a.y,i.y)-1.5,c=Math.max(t.x,o.x,a.x,i.x)+1,h=Math.max(t.y,o.y,a.y,i.y)+1.5,$.push(k(t,o,a,i,q),D,x,C,P(q,i),T(t,q,"||"),T(q,o,"||")),g==="a"&&(this.question=`$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>

          Calculer $\\overrightarrow{AB}\\cdot ${e?"\\overrightarrow{AD}":"\\overrightarrow{CB}"}$.<br>

          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.4,style:"margin: auto"},$),this.correction=`Les vecteurs $\\overrightarrow{AB}$ et $${e?"\\overrightarrow{AD}":"\\overrightarrow{CB}"}$ sont orthogonaux, on en déduit : $\\overrightarrow{AB}\\cdot ${e?"\\overrightarrow{AD}":"\\overrightarrow{CB}"}=0$.
     `,this.reponse=0),g==="b"&&(this.question=`$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>

          Calculer $\\overrightarrow{DA}\\cdot \\overrightarrow{DI}$.<br>

          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.4,style:"margin: auto"},$),this.correction=`Le projeté orthogonal de $I$ sur $(DA)$ est $A$. Ainsi : <br>
          $\\overrightarrow{DA}\\cdot \\overrightarrow{DI}=\\overrightarrow{DA}\\cdot \\overrightarrow{DA}=${r}^2=${r**2}$.
     `,this.reponse=r*r),g==="c"&&(this.question=`$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>

          Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{ID}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.4,style:"margin: auto"},$),this.correction=`Le projeté orthogonal de $D$ sur $(AB)$ est $A$. Ainsi : <br>
          $\\overrightarrow{AB}\\cdot \\overrightarrow{ID}=\\overrightarrow{AB}\\cdot \\overrightarrow{IA}$.<br>
          Les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{IA}$ sont colinéaires de sens contraire. On a donc
          $\\overrightarrow{AB}\\cdot \\overrightarrow{ID}=-${r}\\times ${B(r/2,0)}=${B(-r*r/2,0)}$.
     `,this.reponse=-r*r/2),g==="d"&&(this.question=`$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>

          Calculer $\\overrightarrow{BI}\\cdot \\overrightarrow{ID}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.4,style:"margin: auto"},$),this.correction=`Le projeté orthogonal de $D$ sur $(AB)$ est $A$. Ainsi : <br>
          $\\overrightarrow{BI}\\cdot \\overrightarrow{ID}=\\overrightarrow{BI}\\cdot \\overrightarrow{IA}$.<br>
          Les vecteurs $\\overrightarrow{BI}$ et $\\overrightarrow{IA}$ sont colinéaires de même sens. On a donc
          $\\overrightarrow{BI}\\cdot \\overrightarrow{ID}=${B(r/2,0)}\\times ${B(r/2,0)}=${B(b,0)}$.
     `,this.reponse=b),g==="e"&&(this.question=`$ABCD$ est un carré. $I$ est le milieu de $[AB]$.<br>

          Calculer $\\overrightarrow{BC}\\cdot  ${e?"\\overrightarrow{ID}":"\\overrightarrow{DI}"}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.4,style:"margin: auto"},$),this.correction=`Le projeté orthogonal de $I$ sur $(BC)$ est $B$. Celui de $D$ sur $(BC)$ est $C$.  Ainsi : <br>
          $\\overrightarrow{BC}\\cdot ${e?"\\overrightarrow{ID}":"\\overrightarrow{DI}"}=\\overrightarrow{BC}\\cdot ${e?"\\overrightarrow{BC}":"\\overrightarrow{CB}"}$.<br>
           On a donc
          $\\overrightarrow{BC}\\cdot ${e?"\\overrightarrow{ID}":"\\overrightarrow{DI}"}=${r}\\times ${e?`${r}`:`(-${r})`}=${e?`${r*r}`:`${-r*r}`}$.
     `,this.reponse=e?r*r:-r*r);break;case 3:e=p([!0,!1]),g=p(["a","b","c"]),t=I(0,0,"A","below"),r=y(5,10),o=u(t,r,0,"B","below"),s=y(2,4),z=y(3,6),i=u(t,z,90,"D","above"),a=u(i,s,0,"C","above"),C=F(t,o,a,i),D=v(o,t,"black",.5,""),x=v(i,a,"black",.5,""),$=[],n=Math.min(t.x,o.x,a.x,i.x)-1,l=Math.min(t.y,o.y,a.y,i.y)-1,c=Math.max(t.x,o.x,a.x,i.x)+1,h=Math.max(t.y,o.y,a.y,i.y)+1,$.push(k(t,o,a,i),D,x,C,J(o,t,i)),g==="a"&&(this.question=`$ABCD$ est un trapèze rectangle.<br>

          Calculer $\\overrightarrow{AB}\\cdot ${e?"\\overrightarrow{AD}":"\\overrightarrow{DA}"}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=`Les vecteurs $\\overrightarrow{AB}$ et $${e?"\\overrightarrow{AD}":"\\overrightarrow{DA}"}$ sont orthogonaux. <br>
          Donc $\\overrightarrow{AB}\\cdot ${e?"\\overrightarrow{AD}":"\\overrightarrow{DA}"}=0$.
     `,this.reponse=0),g==="b"&&(this.question=`$ABCD$ est un trapèze rectangle.<br>

          Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=`Le projeté orthogonal du point $C$ sur $(AB)$ est le point $H$ tel que $BH=${r-s}$.<br>
         On a :  $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}=\\overrightarrow{AB}\\cdot \\overrightarrow{BH}$ avec $\\overrightarrow{AB}$ et  $\\overrightarrow{BH}$ colinéaires de sens contraire.<br>
         On en déduit  $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}=-AB\\times BH=-${r}\\times ${r-s}=${-r*(r-s)}$.
     `,this.reponse=-r*(r-s)),g==="c"&&(this.question=`$ABCD$ est un trapèze rectangle.<br>

          Calculer $\\overrightarrow{AB}\\cdot ${e?"\\overrightarrow{DC}":"\\overrightarrow{CD}"}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=`Les vecteurs $\\overrightarrow{AB}$ et  $${e?"\\overrightarrow{DC}":"\\overrightarrow{CD}"}$ sont colinéaires ${e?"même sens":"sens contraire"}.<br>
         On a :  $\\overrightarrow{AB}\\cdot ${e?"\\overrightarrow{DC}":"\\overrightarrow{CD}"}=${r}\\times ${e?`${s}`:`(-${s})`}=${e?`${r*s}`:`${-r*s}`}$
       
         
         
       
     `,this.reponse=e?r*s:-r*s);break;case 4:e=p([!0,!1]),g=p(["a","b","c","d","e","f"]),t=I(0,0,"A","below"),r=y(3,6),o=u(t,r,0,"B","below"),a=u(o,r,60,"C","right"),i=u(a,r,120,"D","above"),d=u(i,r,180,"E","above"),w=u(d,r,-120,"F","left"),S=Q(w,a,"O","below"),C=F(t,o,a,i,d,w),D=v(o,t,"black",.5,""),x=v(i,a,"black",.5,""),E=v(d,i,"black",.5,""),R=v(w,d,"black",.5,""),G=v(t,w,"black",.5,""),N=v(a,o,"black",.5,""),M=P(d,o),L=P(w,a),j=P(t,i),M.pointilles=2,L.pointilles=2,j.pointilles=2,$=[],n=Math.min(t.x,o.x,a.x,i.x,d.x,w.x)-1,l=Math.min(t.y,o.y,a.y,i.y,d.y,w.y)-1,c=Math.max(t.x,o.x,a.x,i.x,d.x,w.x)+1,h=Math.max(t.y,o.y,a.y,i.y,d.y,w.y)+1,b=new H(r*r).div(2),$.push(k(t,o,a,i,d,w,S),D,x,E,R,G,N,C,M,L,j),g==="a"&&(this.question=`$ABCDEF$ est un hexagone régulier de centre $O$.<br>

          Calculer $\\overrightarrow{OA}\\cdot ${e?"\\overrightarrow{OB}":"\\overrightarrow{OF}"}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
          $\\begin{aligned}
          \\overrightarrow{OA}\\cdot ${e?"\\overrightarrow{OB}":"\\overrightarrow{OF}"}&=OA\\times  ${e?"OB":"OF"}\\times \\cos(\\widehat{ ${e?"AOB":"AOF"}})\\\\
           &=${r}\\times ${r}\\times \\cos\\left(60°\\right)\\\\
                    &=${r*r}\\times\\dfrac{1}{2}\\\\
                    &=${B(b,1)}
                    \\end{aligned}$`,this.reponse=b),g==="b"&&(this.question=`$ABCDEF$ est un hexagone régulier de centre $O$.<br>

          Calculer $\\overrightarrow{ED}\\cdot ${e?"\\overrightarrow{OC}":"\\overrightarrow{OF}"}$.<br>
          
          `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
          Les vecteurs $\\overrightarrow{ED}$ et $${e?"\\overrightarrow{OC}":"\\overrightarrow{OF}"}$ sont colinéaires ${e?"de même sens":"de sens contraire"}.<br>
Ainsi, $\\overrightarrow{ED}\\cdot ${e?"\\overrightarrow{OC}":"\\overrightarrow{OF}"}=${r}\\times ${e?`${r}`:`(-${r})`}=${e?`${r*r}`:`${-r*r}`}$.
         `,this.reponse=e?r*r:-r*r),g==="c"&&(this.question=`$ABCDEF$ est un hexagone régulier de centre $O$.<br>

            Calculer $\\overrightarrow{OC}\\cdot ${e?"\\overrightarrow{OA}":"\\overrightarrow{OE}"}$.<br>
            
            `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
            $\\begin{aligned}
            \\overrightarrow{OC}\\cdot ${e?"\\overrightarrow{OA}":"\\overrightarrow{OE}"}&=OC\\times  ${e?"OA":"OE"}\\times \\cos(\\widehat{ ${e?"AOE":"COE"}})\\\\
             &=${r}\\times ${r}\\times \\cos\\left(120°\\right)\\\\
                      &=${r*r}\\times\\left(-\\dfrac{1}{2}\\right)\\\\
                      &=${B(-b,1)}
                      \\end{aligned}$`,this.reponse=-b),g==="d"&&(this.question=`$ABCDEF$ est un hexagone régulier de centre $O$.<br>

            Calculer $\\overrightarrow{OC}\\cdot ${e?"\\overrightarrow{BD}":"\\overrightarrow{DB}"}$.<br>
            
            `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
           $OBCD$ est un losange (4 côtés de même longueur). Ses diagonales sont donc perpendiculaires. On en déduit : <br>
           $\\overrightarrow{OC}\\cdot ${e?"\\overrightarrow{BD}":"\\overrightarrow{DB}"}=0$.
  `,this.reponse=0),g==="e"&&(this.question=`$ABCDEF$ est un hexagone régulier de centre $O$.<br>

            Calculer $\\overrightarrow{DE}\\cdot \\overrightarrow{DA}$.<br>
            
            `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
            $\\begin{aligned}
            \\overrightarrow{DE}\\cdot \\overrightarrow{DA}&=DE\\times DA\\times \\cos(\\widehat{ ADE})\\\\
             &=${r}\\times 2\\times ${r}\\times \\cos\\left(60°\\right)\\\\
                      &=${2*r*r}\\times\\dfrac{1}{2}\\\\
                      &=${r*r}
                      \\end{aligned}$`,this.reponse=r*r),g==="f"&&(this.question=`$ABCDEF$ est un hexagone régulier de centre $O$.<br>

            Calculer $\\overrightarrow{OB}\\cdot ${e?"\\overrightarrow{EB}":"\\overrightarrow{BE}"}$.<br>
            
            `,this.question+=m({xmin:n,ymin:l,xmax:c,ymax:h,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},$),this.correction=` $ABCDEF$ est un hexagone régulier, donc les six triangles sont équilatéraux.<br>
            Les vecteurs $\\overrightarrow{OB}$ et $${e?"\\overrightarrow{EB}":"\\overrightarrow{BE}"}$ sont colinéaires ${e?"de même sens":"de sens contraire"}.<br>
  Ainsi, $\\overrightarrow{OB}\\cdot ${e?"\\overrightarrow{EB}":"\\overrightarrow{BE}"}=${r}\\times ${e?`2\\times${r}`:`(-2\\times${r})`}=${e?`${2*r*r}`:`${-2*r*r}`}$.
           `,this.reponse=e?2*r*r:-2*r*r);break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{le as dateDePublication,ge as default,$e as interactifReady,ne as interactifType,ce as refs,se as titre,he as uuid};
//# sourceMappingURL=can1G06-COcjH_J_.js.map
