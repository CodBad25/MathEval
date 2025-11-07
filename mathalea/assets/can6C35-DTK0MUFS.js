import{D as n}from"./vendors/decimal.js-16C9rIKp.js";import{t as i}from"./style-bimy13bZ.js";import{D as y,K as C,p as l,r as q,G as s,y as p}from"./index-DjA7ROjC.js";import{p as w,a as k}from"./Personne-dDkpKfiY.js";import"./vendors/ansi-styles-C5UZWym2.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Oe='Résoudre un problème avec "de plus", "de moins"',Pe=!0,Ke="mathLive",Fe=!0,Ge="AMCNum",Le="27/07/2022",Se="95dd2",Ve={"fr-fr":["can6C35","6N2A-flash6"],"fr-ch":[]};class Be extends y{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=C.clavierNumbers}nouvelleVersion(){let e,t,u,r,o,$,a,m,c,g,f,d,h,b;switch(l([1,1,1,2,3,3,3])){case 1:for(c=l(["a","b","c","d"]),$=l([!0,!1]),r=k(),o=k();o===r;)o=w();e=new n(q(81,119,[80,90,100,110])).div(10),t=new n(l([15,25,35,45,55])).div(10),u=new n(t).div(100),c==="a"?(a=new n(e).add(t),m=new n(e).sub(t),this.reponse=$?a:m,this.question=`${r} et ${o} sont allées acheter un déjeuner dans une sandwicherie.<br>
                ${r} a payé $${i(e)}$ € pour son déjeuner. ${o} a payé le sien $${i(t)}$ € ${$?"de plus":" de moins "}.<br>
                
                Combien ${o} a-t-elle payé son déjeuner ? `,this.correction=`${o} a payé son déjeuner $${i(t)}$ € ${$?"de plus":" de moins "} que celui de ${r}.<br>
        Elle l'a donc payé  (${$?`$${i(e)}+${i(t)}$`:`$${i(e)}-${i(t)}$`}) €, soit ${$?`$${p(i(a))}$`:`$${p(i(m))}$`} €.`,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ €"):c==="b"?(m=new n(e).add(t),a=new n(e).sub(t),this.reponse=$?a:m,this.question=`${r} et ${o} sont allées acheter un déjeuner dans une sandwicherie.<br>
                      ${r} a payé $${i(e)}$ € pour son déjeuner soit $${i(t)}$ € ${$?"de plus":" de moins "} que ${o}. <br>
                     
                      Combien ${o} a-t-elle payé son déjeuner ? `,this.correction=`${r} a payé son déjeuner $${i(t)}$ € ${$?"de plus":" de moins "} que celui de ${o}.<br>
              ${o} a donc payé son déjeuner $${i(t)}$ € ${$?"de moins":" de plus "}.  Elle l'a donc payé  (${$?`$${i(e)}-${i(t)}$`:`$${i(e)}+${i(t)}$`}) €, soit ${$?`$${p(i(a))}$`:`$${p(i(m))}$`} €.`,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ €"):c==="c"?(g=new n(e).add(t),f=new n(e).sub(t),m=new n(e).mul(2).add(t),a=new n(e).mul(2).sub(t),this.reponse=$?a:m,this.question=`${r} et ${o} sont allées acheter un déjeuner dans une sandwicherie.<br>
                      ${r} a payé $${i(e)}$ € pour son déjeuner soit $${i(t)}$ € ${$?"de plus":" de moins "}
                       que ${o}.<br>
                      
                      Combien ont-elles payé ensemble leur déjeuner ? `,this.correction=`${r} a payé son déjeuner $${i(t)}$ € ${$?"de plus":" de moins "}
          que celui de ${o}.<br>
              ${o} a donc payé son déjeuner $${i(t)}$ € ${$?"de moins":" de plus "}.
              Elle l'a donc payé  (${$?`$${i(e)}-${i(t)}$`:`$${i(e)}+${i(t)}$`}) €,
              soit ${$?`$${i(f)}$`:`$${i(g)}$`} €.<br>
              Ensemble, elles ont donc payé : (${$?`$${i(e)}+${i(f)}$`:`$${i(e)}+${i(g)}$`}) €,
              soit ${$?`$${i(a)}$`:`$${p(i(m))}$`} €. `,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ €"):(g=new n(e).add(t),f=new n(e).sub(t),m=new n(e).add(g),a=new n(e).add(f),this.reponse=$?m:a,this.question=`${r} et ${o} sont allées acheter un déjeuner dans une sandwicherie.<br>
          ${r} a payé $${i(e)}$ € pour son déjeuner. ${o} a payé le sien $${i(t)}$ € ${$?"de plus":" de moins "}.<br>
          
          Combien ont-elles payé ensemble leur déjeuner ? `,this.correction=`${o} a payé son déjeuner $${i(t)}$ € ${$?"de plus":" de moins "} que celui de ${r}.<br>
          Elle l'a donc payé  (${$?`$${i(e)}+${i(t)}$`:`$${i(e)}-${i(t)}$`}) €, soit ${$?`$${i(g)}$`:`$${i(f)}$`} €. <br>
              Ensemble, elles ont donc payé : (${$?`$${i(e)}+${i(g)}$`:`$${i(e)}+${i(f)}$`}) €,
              soit ${$?`$${i(m)}$`:`$${i(a)}$`} €. `,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ €"),this.interactif&&(this.optionsChampTexte={texteApres:" €"});break;case 2:for($=l([!0,!1]),r=w(),o=w();o===r;)o=w();e=new n(q(130,160)).div(100),t=q(2,15),u=new n(t).div(100),l([!0,!1])?(a=new n(e).add(u),m=new n(e).sub(u),this.reponse=$?m:a,this.question=`${r} mesure $${s(e,2,!0)}$ m. Il mesure $${t}$ cm ${$?"de plus":" de moins "}
              que ${o}. <br>

              Quelle est la taille de ${o} ?`,this.correction=`${r} mesure $${t}$ cm ${$?"de plus":" de moins "} que ${o} donc ${o} mesure $${t}$ cm ${$?"de moins":" de plus "} que ${r}.<br>
              Il mesure donc  (${$?`$${s(e,2,!0)}-${s(u,2,!0)}$`:`$${s(e,2,!0)}+${s(u,2,!0)}$`}) m, soit  ${$?`$${s(m,2,!0)}$`:`$${p(s(a,2,!0))}$`} m. `,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ m"):(a=new n(e).add(u),m=new n(e).sub(u),this.reponse=$?a:m,this.question=`${r} mesure $${s(e,2,!0)}$ m. ${o} mesure $${t}$ cm ${$?"de plus":" de moins "}
                    que ${r}. <br>
                    Quelle est la taille de ${o} ?`,this.correction=`${o} mesure $${t}$ cm ${$?"de plus":" de moins "} que ${r} donc ${o} mesure (${$?`$${s(e,2,!0)}+${s(u,2,!0)}$`:`$${s(e,2,!0)}-${s(u,2,!0)}$`}) m, soit  ${$?`$${s(a,2,!0)}$`:`$${p(s(m,2,!0))}$`} m. `,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ m"),this.interactif&&(this.optionsChampTexte={texteApres:" m"});break;case 3:for(c=l(["a","b","c","d"]),$=l([!0,!1]),d=l([!0,!1]),r=w(),o=w();o===r;)o=w();e=new n(q(1,5)*10+q(1,10)).div(10),t=q(1,9)*100,u=new n(t).div(1e3),c==="a"?(a=new n(e).add(u),m=new n(e).sub(u),this.reponse=$?m:a,this.question=`Chez le primeur, ${r} a acheté  $${s(e,1)}$ kg de ${d?"fruits":" légumes "}.<br>
            Il en a acheté $${t}$ g ${$?"de plus":" de moins "} que ${o}.<br>

            Quelle masse de ${d?"fruits":" légumes "} a acheté ${o} ?`,this.correction=`${r} a acheté $${t}$ g de ${d?"fruits":" légumes "}  ${$?"de plus":" de moins "} que ${o}, donc ${o} en a acheté $${t}$ g ${$?"de moins":" de plus "} que ${r}.<br>
            Or $${t}$ g $=${s(u,1)}$ kg. <br>
            ${o} a donc acheté $(${$?`${s(e,1)}-${s(u,1)}`:`${s(e,1)}+${s(u,1)}`})$ kg
            soit $${$?`${p(s(m,1))}`:`${p(s(a,1))}`}$ kg de ${d?"fruits":" légumes "}.`,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ kg"):c==="b"?(a=new n(e).add(u),m=new n(e).sub(u),this.reponse=$?a:m,this.question=`Chez le primeur, ${r} a acheté  $${s(e,1)}$ kg de ${d?"fruits":" légumes "}.<br>
          ${o} en a acheté $${t}$ g ${$?"de plus":" de moins "}.<br>

            Quelle masse de ${d?"fruits":" légumes "} a acheté ${o} ?`,this.correction=`$${t}$ g $=${s(u,1)}$ kg. <br>
          ${o} a acheté $${s(u,1)}$ kg de ${d?"fruits":" légumes "}  ${$?"de plus":" de moins "} que ${r},
          donc ${o} en a acheté  $(${$?`${s(e,1)}+${s(u,1)}`:`${s(e,1)}-${s(u,1)}`})$ kg
            soit $${$?`${p(s(a,1))}`:`${p(s(m,1))}`}$ kg de ${d?"fruits":" légumes "}.`,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ kg"):c==="c"?(h=new n(e).add(u),b=new n(e).sub(u),a=new n(h).add(e),m=new n(b).add(e),this.reponse=$?a:m,this.question=`Chez le primeur, ${r} a acheté  $${s(e,1)}$ kg de ${d?"fruits":" légumes "}.<br>
          ${o} en a acheté $${t}$ g ${$?"de plus":" de moins "}.<br>

            Quelle masse de ${d?"fruits":" légumes "} ont-ils acheté ensemble ?`,this.correction=`$${t}$ g $=${s(u,1)}$ kg. <br>
          ${o} a acheté $${s(u,1)}$ kg de ${d?"fruits":" légumes "}  ${$?"de plus":" de moins "} que ${r},
          donc ${o} en a acheté  $(${$?`${s(e,1)}+${s(u,1)}`:`${s(e,1)}-${s(u,1)}`})$ kg
            soit $${$?`${s(h,1)}`:`${s(b,1)}`}$ kg de ${d?"fruits":" légumes "}.<br>
            Ensemble, ils ont donc acheté :  $(${$?`${s(e,1)}+${s(h,1)}`:`${s(e,1)}+${s(b,1)}`})$ kg
            soit $${$?`${p(s(a,1))}`:`${p(s(m,1))}`}$ kg de ${d?"fruits":" légumes "}.`,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ kg"):(h=new n(e).add(u),b=new n(e).sub(u),a=new n(h).add(e),m=new n(b).add(e),this.reponse=$?m:a,this.question=`Chez le primeur, ${r} a acheté  $${s(e,1)}$ kg de ${d?"fruits":" légumes "}.<br>
          Il en a acheté $${t}$ g ${$?"de plus":" de moins "} que ${o}.<br>

          Quelle masse de ${d?"fruits":" légumes "} ont-ils acheté ensemble ?`,this.correction=`${r} a acheté $${t}$ g  ${d?"fruits":" légumes "} de ${$?"de plus":" de moins "} que ${o}, donc ${o} en a acheté $${t}$ g ${$?"de moins":" de plus "} que ${r}.<br>
            Or $${t}$ g $=${s(u,1)}$ kg. <br>
            ${o} a donc acheté $(${$?`${s(e,1)}-${s(u,1)}`:`${s(e,1)}+${s(u,1)}`})$ kg
            soit $${$?`${s(b,1)}`:`${s(h,1)}`}$ kg de ${d?"fruits":" légumes "}.<br>
            Ensemble, ils ont donc acheté :  $(${$?`${s(e,1)}+${s(b,1)}`:`${s(e,1)}+${s(h,1)}`})$ kg
            soit $${$?`${p(s(m,1))}`:`${p(s(a,1))}`}$ kg de ${d?"fruits":" légumes "}.`,this.canEnonce=this.question,this.canReponseACompleter="$\\dots$ kg"),this.interactif&&(this.optionsChampTexte={texteApres:" kg"});break}}}export{Fe as amcReady,Ge as amcType,Le as dateDePublication,Be as default,Pe as interactifReady,Ke as interactifType,Ve as refs,Oe as titre,Se as uuid};
//# sourceMappingURL=can6C35-DTK0MUFS.js.map
