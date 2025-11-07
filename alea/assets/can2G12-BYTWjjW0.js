import{E as d,p as u,r as a,u as m,v as s,aA as p,av as l,o as b}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Le="Reconnaitre des vecteurs colinéaires (V/F)",Oe=!0,Qe="qcm",ke="30/10/2021",Me="2ba42",Se={"fr-fr":["can2G12"],"fr-ch":["2mQCM-5"]};class Ie extends d{constructor(){super(),this.nbQuestions=1}nouvelleVersion(){let e,t,r,i,c;for(let $=0,n,v,o,x=0;$<this.nbQuestions&&x<50;){switch(u([1,2,3,4,5])){case 1:e=a(-3,3,0)*2,t=a(-3,3,[0,e/2])*2,c=u([.5,1.5,3,2.5,3.5])*u([-1,1]),r=c*e,i=c*t,n=`Dans un repère, on considère les vecteurs $\\vec{u}\\begin{pmatrix}${e} \\\\ ${t} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}${r} \\\\ ${i} \\end{pmatrix}$.<br>
        Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.canEnonce=`Dans un repère, on considère les vecteurs $\\vec{u}(${e}\\;;\\; ${t})$ et $\\vec{v}(${r}\\;;\\;${i})$.<br>

        Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.autoCorrection[$]={enonce:n,propositions:[{texte:"Vrai",statut:e*i===t*r},{texte:"Faux",statut:e===50}],options:{ordered:!0,radio:!0}},o=m(this,$),n+=o.texte,v=o.texteCorr+`<br>Deux vecteurs $\\vec{u}$ et $\\vec{v}$
        sont colinéaires si et seulement si leur déterminant $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=0$.<br>
        Si $\\vec{u}\\begin{pmatrix}x_{\\vec{u}} \\\\ x_{\\vec{v}} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}x_{\\vec{v}} \\\\ y_{\\vec{v}} \\end{pmatrix}$,
        alors $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=x_{\\vec{u}}\\times y_{\\vec{v}}-y_{\\vec{u}}\\times x_{\\vec{v}}$.<br>
        En utilisant les données de l'énoncé, on obtient : <br>
        $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=
        ${s(e)}\\times ${s(i)}-${s(t)}\\times ${s(r)}
        =${e*i}-${s(t*r)}=${e*i-t*r}$.<br>
        On en déduit que les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires, il fallait donc cocher "${p("Vrai")}".`,v+=l(`<br><br> Mentalement : <br>
        On compare les produits en croix : $${s(e)}\\times ${s(i)}=${e*i}$ et $${s(t)}\\times ${s(r)}=${t*r}$.<br>
        Ils sont égaux, donc les vecteurs sont colinéaires.`,"blue");break;case 2:r=a(-3,3,0)*2,i=a(-3,3,[0,r/2])*2,c=u([.5,1.5,3,2.5,3.5])*u([-1,1]),e=c*r,t=c*i,n=`Dans un repère, on considère les vecteurs $\\overrightarrow{u}\\begin{pmatrix}${e} \\\\ ${t} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}${r} \\\\ ${i} \\end{pmatrix}$.<br>
        Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.canEnonce=`Dans un repère, on considère les vecteurs $\\vec{u}(${e}\\;;\\; ${t})$ et $\\vec{v}(${r}\\;;\\;${i})$.<br>
       
        Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.autoCorrection[$]={enonce:n,propositions:[{texte:"Vrai",statut:e*i===t*r},{texte:"Faux",statut:e===50}],options:{ordered:!0}},o=m(this,$),n+=o.texte,v=o.texteCorr+`<br>Deux vecteurs $\\vec{u}$ et $\\vec{v}$
            sont colinéaires si et seulement si leur déterminant $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=0$.<br>
            Si $\\vec{u}\\begin{pmatrix}x_{\\vec{u}} \\\\ x_{\\vec{v}} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}x_{\\vec{v}} \\\\ y_{\\vec{v}} \\end{pmatrix}$,
            alors $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=x_{\\vec{u}}\\times y_{\\vec{v}}-y_{\\vec{u}}\\times x_{\\vec{v}}$.<br>
            En utilisant les données de l'énoncé, on obtient : <br>
            $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=
            ${s(e)}\\times ${s(i)}-${s(t)}\\times ${s(r)}
            =${e*i}-${s(t*r)}=${e*i-t*r}$.<br>
            On en déduit que les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires, il fallait donc cocher "${p("Vrai")}".`,v+=l(`<br><br> Mentalement : <br>
            On compare les produits en croix : $${s(e)}\\times ${s(i)}=${e*i}$ et $${s(t)}\\times ${s(r)}=${t*r}$.<br>
            Ils sont égaux, donc les vecteurs sont colinéaires.`,"blue");break;case 3:e=a(-3,3,0)*2,t=a(-3,3,[0,e/2])*2,c=u([.5,1.5,3,2.5,3.5])*u([-1,1]),r=c*e,i=c*t+1,n=`Dans un repère, on considère les vecteurs $\\vec{u}\\begin{pmatrix}${e} \\\\ ${t} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}${r} \\\\ ${i} \\end{pmatrix}$.<br>
            Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.canEnonce=`Dans un repère, on considère les vecteurs $\\vec{u}(${e}\\;;\\; ${t})$ et $\\vec{v}(${r}\\;;\\;${i})$.<br>

            Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.autoCorrection[$]={enonce:n,propositions:[{texte:"Vrai",statut:e===100},{texte:"Faux",statut:e*i!==t*r}],options:{ordered:!0}},o=m(this,$),n+=o.texte,v=o.texteCorr+`<br>Deux vecteurs $\\vec{u}$ et $\\vec{v}$
            sont colinéaires si et seulement si leur déterminant $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=0$.<br>
            Si  $\\vec{u}\\begin{pmatrix}x_{\\vec{u}} \\\\ x_{\\vec{v}} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}x_{\\vec{v}} \\\\ y_{\\vec{v}} \\end{pmatrix}$,
            alors $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=x_{\\vec{u}}\\times y_{\\vec{v}}-y_{\\vec{u}}\\times x_{\\vec{v}}$.<br>
            En utilisant les données de l'énoncé, on obtient : <br>
            $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=
            ${s(e)}\\times ${s(i)}-${s(t)}\\times ${s(r)}
            =${e*i}-${s(t*r)}=${e*i-t*r}\\neq0$.<br>
            On en déduit que les vecteurs $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires, il fallait donc cocher "${p("Faux")}".`,v+=l(`<br><br> Mentalement : <br>
            On compare les produits en croix : $${s(e)}\\times ${s(i)}=${e*i}$ et $${s(t)}\\times ${s(r)}=${t*r}$.<br>
            Ils ne sont pas égaux, donc les vecteurs ne sont pas colinéaires.`,"blue");break;case 4:e=a(-3,3,0)*2,t=a(-3,3,[0,e/2])*2,c=u([.5,1.5,3,2.5,3.5])*u([-1,1]),r=c*e+1,i=c*t,n=`Dans un repère, on considère les vecteurs $\\vec{u}\\begin{pmatrix}${e} \\\\ ${t} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}${r} \\\\ ${i} \\end{pmatrix}$.<br>
            Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.canEnonce=`Dans un repère, on considère les vecteurs $\\vec{u}(${e}\\;;\\; ${t})$ et $\\vec{v}(${r}\\;;\\;${i})$.<br>

            Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.autoCorrection[$]={enonce:n,propositions:[{texte:"Vrai",statut:e===100},{texte:"Faux",statut:e*i!==t*r}],options:{ordered:!0}},o=m(this,$),n+=o.texte,v=o.texteCorr+`<br>Deux vecteurs $\\vec{u}$ et $\\vec{v}$
            sont colinéaires si et seulement si leur déterminant $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=0$.<br>
            Si  $\\vec{u}\\begin{pmatrix}x_{\\vec{u}} \\\\ x_{\\vec{v}} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}x_{\\vec{v}} \\\\ y_{\\vec{v}} \\end{pmatrix}$,
            alors $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=x_{\\vec{u}}\\times y_{\\vec{v}}-y_{\\vec{u}}\\times x_{\\vec{v}}$.<br>
            En utilisant les données de l'énoncé, on obtient : <br>
            $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=
            ${s(e)}\\times ${s(i)}-${s(t)}\\times ${s(r)}
            =${e*i}-${s(t*r)}=${e*i-t*r}\\neq0$.<br>
            On en déduit que les vecteurs $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires, il fallait donc cocher "${p("Faux")}".`,v+=l(`<br><br> Mentalement : <br>
            On compare les produits en croix : $${s(e)}\\times ${s(i)}=${e*i}$ et $${s(t)}\\times ${s(r)}=${t*r}$.<br>
            Ils ne sont pas égaux, donc les vecteurs ne sont pas colinéaires.`,"blue");break;case 5:default:e=a(-3,3,0)*2,t=a(-3,3,[0,e/2])*2,c=u([.5,1.5,3,2.5,3.5])*u([-1,1]),r=c*e,i=c*t*-1,n=`Dans un repère, on considère les vecteurs $\\vec{u}\\begin{pmatrix}${e} \\\\ ${t} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}${r} \\\\ ${i} \\end{pmatrix}$.<br>
            Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.canEnonce=`Dans un repère, on considère les vecteurs $\\vec{u}(${e}\\;;\\; ${t})$ et $\\vec{v}(${r}\\;;\\;${i})$.<br>
        
            Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires.`,this.autoCorrection[$]={enonce:n,propositions:[{texte:"Vrai",statut:e===100},{texte:"Faux",statut:e*i!==t*r}],options:{ordered:!0}},o=m(this,$),n+=o.texte,v=o.texteCorr+`<br>Deux vecteurs $\\vec{u}$ et $\\vec{v}$
            sont colinéaires si et seulement si leur déterminant $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=0$.<br>
            Si  $\\vec{u}\\begin{pmatrix}x_{\\vec{u}} \\\\ x_{\\vec{v}} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}x_{\\vec{v}} \\\\ y_{\\vec{v}} \\end{pmatrix}$,
            alors $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=x_{\\vec{u}}\\times y_{\\vec{v}}-y_{\\vec{u}}\\times x_{\\vec{v}}$.<br>
            En utilisant les données de l'énoncé, on obtient : <br>
            $det\\left(\\vec{u}\\,;\\,\\vec{v}\\right)=
            ${s(e)}\\times ${s(i)}-${s(t)}\\times ${s(r)}
            =${e*i}-${s(t*r)}=${e*i-t*r}\\neq0$.<br>
            On en déduit que les vecteurs $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires, il fallait donc cocher "${p("Faux")}".`,v+=l(`<br><br> Mentalement : <br>
            On compare les produits en croix : $${s(e)}\\times ${s(i)}=${e*i}$ et $${s(t)}\\times ${s(r)}=${t*r}$.<br>
            Ils ne sont pas égaux, donc les vecteurs ne sont pas colinéaires.`,"blue");break}this.questionJamaisPosee($,e,t,r,i)&&(this.listeQuestions[$]=n,this.listeCorrections[$]=v,$++),this.canReponseACompleter=o.texte,this.listeCanEnonces.push(this.canEnonce),this.listeCanReponsesACompleter.push(this.canReponseACompleter),x++}b(this)}}export{ke as dateDePublication,Ie as default,Oe as interactifReady,Qe as interactifType,Se as refs,Le as titre,Me as uuid};
//# sourceMappingURL=can2G12-BYTWjjW0.js.map
