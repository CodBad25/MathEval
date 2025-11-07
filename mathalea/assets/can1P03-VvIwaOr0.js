import{E as x,r as h,p as y,m as f,b as v,G as e,C as A,o as C}from"./index-DjA7ROjC.js";import{D as o}from"./vendors/decimal.js-16C9rIKp.js";import{A as r}from"./arbres-7rpK0tRr.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ne="Calculer la probabilité d’une intersection à partir d’un arbre",qe="04/07/2022",Ge=!0,Ie="mathLive",Je=!0,Ve="AMCNum",ze="7c8b7",Fe={"fr-fr":["can1P03"],"fr-ch":[]};class He extends x{constructor(){super(),this.sup=!0,this.keyboard=["numbers","fullOperations","variables","trigo","advanced"],this.nbQuestions=1}nouvelleVersion(){for(let t=0,d=0,u,B,P,w,a,i,b,$,l,m,s,n,c,p;t<this.nbQuestions&&d<50;){switch(p=[],a=new o(h(1,9,5)).div(10),l=new o(a).mul(-1).add(1),i=new o(h(1,9,5)).div(10),$=new o(i).mul(-1).add(1),m=new o(h(1,9,5)).div(10),b=new o(m).mul(-1).add(1),u=new o(a).mul(i),B=new o(a).mul($),P=new o(l).mul(m),w=new o(l).mul(b),y([1,2,3,4])){case 1:s=new r({racine:!0,rationnel:!1,nom:"",proba:1,visible:!1,alter:"",enfants:[new r({rationnel:!1,nom:"A",proba:1,visible:!1,alter:"",enfants:[new r({rationnel:!1,nom:"B",proba:1,visible:!1,alter:""}),new r({rationnel:!1,nom:"\\overline{B}",proba:new o(1-i)})]}),new r({rationnel:!1,nom:"\\overline{A}",proba:l,enfants:[new r({rationnel:!1,nom:"B",proba:new o(m)}),new r({rationnel:!1,nom:"\\overline{B}",proba:new o(1-m)})]})]}),s.setTailles(),p=s.represente(0,7,0,1.5,!0,1),n=`On donne l'arbre de probabilités ci-dessous :<br>
          
          `,n+=f({xmin:-.1,xmax:14,ymin:0,ymax:7,style:"inline",scale:.5},...p),this.interactif?(n+="<br> $P(A\\cap B)=$ ",n+=v(this,t," lycee")):n+=`<br>
          
          Calculer $P(A\\cap B)$. `,c=` $P(A\\cap B)=P(A)\\times P_{A}(B)$.<br>
      $P(A)=1-${e(l,1)}= ${e(a,1)}$.<br>
      $P_{A}(B)=1-${e(1-i,1)}= ${e(i,1)}$.<br>
      Ainsi, $P(A\\cap B)=P(A)\\times P_{A}(B)=${e(a,1)}\\times ${e(i,1)}=${e(u,2)}$.
      `,A(this,t,u),this.canEnonce=n,this.canReponseACompleter="";break;case 2:s=new r({racine:!0,rationnel:!1,nom:"",proba:1,visible:!1,alter:"",enfants:[new r({rationnel:!1,nom:"A",proba:1,visible:!1,alter:"",enfants:[new r({rationnel:!1,nom:"B",proba:i,alter:""}),new r({rationnel:!1,nom:"\\overline{B}",proba:1,visible:!1})]}),new r({rationnel:!1,nom:"\\overline{A}",proba:l,enfants:[new r({rationnel:!1,nom:"B",proba:new o(m)}),new r({rationnel:!1,nom:"\\overline{B}",proba:b})]})]}),s.setTailles(),p=s.represente(0,7,0,1.5,!0,1),n=`On donne l'arbre de probabilités ci-dessous :<br>
          
          `,n+=f({xmin:-.1,xmax:14,ymin:0,ymax:7,style:"inline",scale:.5},...p),this.interactif?(n+="<br> $P(A\\cap \\overline{B})=$ ",n+=v(this,t," lycee")):n+=`<br>
          
          Calculer $P(A\\cap \\overline{B})$. `,c=` $P(A\\cap \\overline{B})=P(A)\\times P_{A}(\\overline{B})$.<br>
        $P(A)=1-${e(l,1)}= ${e(a,1)}$.<br>
        $P_{A}(\\overline{B})=1-${e(i,1)}= ${e(1-i,1)}$.<br>
        Ainsi, $P(A\\cap \\overline{B})=P(A)\\times P_{A}(\\overline{B})=${e(a,1)}\\times ${e(1-i,1)}=${e(B,2)}$.
        `,A(this,t,B),this.canEnonce=n,this.canReponseACompleter="";break;case 3:s=new r({racine:!0,rationnel:!1,nom:"",proba:1,visible:!1,alter:"",enfants:[new r({rationnel:!1,nom:"A",proba:a,alter:"",enfants:[new r({rationnel:!1,nom:"B",proba:i,alter:""}),new r({rationnel:!1,nom:"\\overline{B}",proba:$})]}),new r({rationnel:!1,nom:"\\overline{A}",proba:1,visible:!1,enfants:[new r({rationnel:!1,nom:"B",proba:1,visible:!1}),new r({rationnel:!1,nom:"\\overline{B}",proba:b})]})]}),s.setTailles(),p=s.represente(0,7,0,1.5,!0,1),n=`On donne l'arbre de probabilités ci-dessous :<br>
          
          `,n+=f({xmin:-.1,xmax:14,ymin:0,ymax:7,style:"inline",scale:.5},...p),this.interactif?(n+="<br> $P(\\overline{A}\\cap B)=$ ",n+=v(this,t," lycee")):n+=`<br>
          
          Calculer $P(\\overline{A}\\cap B)$. `,c=`
        





        $P(\\overline{A}\\cap B)=P(\\overline{A})\\times P_{\\overline{A}}(B)$.<br>
        $P(\\overline{A})=1-${e(a,1)}=${e(l,1)}$.<br>
        $P_{\\overline{A}}(B)=1-${e(b,1)}= ${e(1-b,1)}$.<br>
        Ainsi, $P(\\overline{A}\\cap B)=P(\\overline{A})\\times P_{\\overline{A}}(B)=${e(l,1)}\\times ${e(m,1)}=${e(P,2)}$.
        `,A(this,t,P),this.canEnonce=n,this.canReponseACompleter="";break;case 4:s=new r({racine:!0,rationnel:!1,nom:"",proba:1,visible:!1,alter:"",enfants:[new r({rationnel:!1,nom:"A",proba:a,alter:"",enfants:[new r({rationnel:!1,nom:"B",proba:i,alter:""}),new r({rationnel:!1,nom:"\\overline{B}",proba:$})]}),new r({rationnel:!1,nom:"\\overline{A}",proba:1,visible:!1,enfants:[new r({rationnel:!1,nom:"B",proba:m}),new r({rationnel:!1,nom:"\\overline{B}",proba:1,visible:!1})]})]}),s.setTailles(),p=s.represente(0,7,0,1.5,!0,1),n=`On donne l'arbre de probabilités ci-dessous :<br>
          
          `,n+=f({xmin:-.1,xmax:14,ymin:0,ymax:7,style:"inline",scale:.5},...p),this.interactif?(n+="<br> $P(\\overline{A}\\cap \\overline{B})=$ ",n+=v(this,t," lycee")):n+=`<br>
          
          Calculer $P(\\overline{A}\\cap \\overline{B})$. `,c=`
        





        $P(\\overline{A}\\cap \\overline{B})=P(\\overline{A})\\times P_{\\overline{A}}(\\overline{B})$.<br>
        $P(\\overline{A})=1-${e(a,1)}=${e(l,1)}$.<br>
        $P_{\\overline{A}}(\\overline{B})=1-${e(m,1)}= ${e(b,1)}$.<br>
        Ainsi, $P(\\overline{A}\\cap \\overline{B})=P(\\overline{A})\\times P_{\\overline{A}}(\\overline{B})=${e(l,1)}\\times ${e(b,1)}=${e(w,2)}$.
        `,A(this,t,w),this.canEnonce=n,this.canReponseACompleter="";break}this.questionJamaisPosee(t,a,i)&&(this.listeQuestions[t]=n,this.listeCorrections[t]=c,t++),d++}C(this)}}export{Je as amcReady,Ve as amcType,qe as dateDePublication,He as default,Ge as interactifReady,Ie as interactifType,Fe as refs,Ne as titre,ze as uuid};
//# sourceMappingURL=can1P03-VvIwaOr0.js.map
