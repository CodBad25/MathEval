var U=Object.defineProperty;var z=(d,t,q)=>t in d?U(d,t,{enumerable:!0,configurable:!0,writable:!0,value:q}):d[t]=q;var N=(d,t,q)=>z(d,typeof t!="symbol"?t+"":t,q);import{MathfieldElement as P}from"./vendors/mathlive-DtHmjDB4.js";import{i as G}from"./vendors/cortex-js_compute-engine-CK5Y8453.js";const J=["développer","simplifier","dériver","compiler"],Q=[["notation","scientifique","ingénieure"]],W=["irréductible","forcer décimal en rationnel","fraction plus simple"],X=["ordonnée","croissant","élimine doublons"],Y=["simplifier","dériver"],r=new G;r.latexOptions.decimalMarker="{,}";r.latexOptions.exponentProduct="\\times";const K=function(d,t){return Number.isInteger(d)||(d=Math.round(d)),Number.isInteger(t)||(t=Math.round(t)),t?K(t,d%t):d};function B(d){for(const t of Array.from(d.children))t.children.length>0&&t instanceof HTMLDivElement?B(t):t.textContent!==""&&(t.textContent="")}function Z(d,t,{saisieCanonical:q,reponseCanonical:C,isEqual:y,formatSelector:S,optionsFormatSaisie:u,optionsFormatReponse:g}){var b,E,k,A,I,D,M;S==="fraction"&&(q=!1,C=!1);const $=document.querySelector("div#feedback");let V,m,R,L,T,l;$!=null&&B($);let i,a,h;switch(S){case"litteral":i=r.parse(d,{canonical:q}),a=r.parse(t,{canonical:C}),u.litteral&&(u.litteral.developper&&(i=r.box(["Expand",i]).evaluate()),u.litteral.simplifier&&(i=i.simplify()),u.litteral.deriver&&(alert("Attention ! la dérivée n'est fonctionnelle que pour les polynômes."),i=r.box(["D",i,"x"]).evaluate()),u.litteral.compiler&&(V=i.compile())),R=i.latex,g.litteral&&(g.litteral.developper&&(a=r.box(["Expand",a]).evaluate()),g.litteral.simplifier&&(a=a.simplify()),g.litteral.deriver&&(a=r.box(["Derivative",a,"x"]).evaluate()),g.litteral.compiler&&(m=a.compile())),L=a.latex;break;case"numerique":T=(b=u.numerique)==null?void 0:b.notation,T&&(T==="scientifique"?(r.latexOptions.notation="scientific",r.latexOptions.avoidExponentsInRange=[0,0]):T==="ingénieure"?(r.latexOptions.notation="engineering",r.latexOptions.avoidExponentsInRange=[0,0]):(r.latexOptions.notation="auto",r.latexOptions.avoidExponentsInRange=[-9,9])),i=r.parse(d,{canonical:q}),R=i.latex,l=(E=g.numerique)==null?void 0:E.notation,l&&(l==="scientifique"?(r.latexOptions.notation="scientific",r.latexOptions.avoidExponentsInRange=[0,0]):l==="ingénieure"?(r.latexOptions.notation="engineering",r.latexOptions.avoidExponentsInRange=[0,0]):(r.latexOptions.notation="auto",r.latexOptions.avoidExponentsInRange=[-9,9])),a=r.parse(t,{canonical:C}),L=a.latex;break;case"liste":case"fonction":case"fraction":default:(k=u.fraction)!=null&&k.forcerdecimalenrationnel&&(r.latexOptions.parseNumbers="rational"),a=r.parse(t,{canonical:!1}),i=r.parse(d,{canonical:!1}),(A=u.fraction)!=null&&A.forcerdecimalenrationnel?y=!0:(y=!0,(I=u.fraction)!=null&&I.irreductible&&(a=a.canonical)),R=i.latex,L=a.latex;break}if(S==="fraction")if((D=u.fraction)!=null&&D.fractionplussimple){const v=i.op1.numericValue,x=a.op1.numericValue;v!=null&&x!=null?(h=i.isEqual(a),h=h&&v<x):(console.warn(`On a un problème avec l'un des deux numérateurs : numSaisie = ${v} et numReponse = ${x} `),h=!1)}else if((M=u.fraction)!=null&&M.irreductible){const v=Number(i.op1.numericValue),x=Number(i.op2.numericValue);h=K(v,x)===1&&i.isEqual(a)}else h=i.isEqual(a);else h=y?i.isEqual(a):i.isSame(a);const j=document.querySelector("#resultatSaisie"),w=document.querySelector("#resultatReponse");if(j&&w&&(j.textContent=`${R}`,w.textContent=`${L}`),$!=null){const v=document.querySelector("div#conclusion");if(v&&v.appendChild(document.createTextNode(`Comparaison de la saisie élève [${i.json}] soit ${i.latex} et de la réponse [${a.json}] soit ${a.latex} en utilisant la méthode ${y?"isEqual()":"isSame()"} avec le processus de traitement pour le format ${S} : ${String(h)}`)),V){const x=document.querySelector("div#saisieCompile");x&&x.appendChild(document.createTextNode(`saisie compilée : ${V}`))}if(m){const x=document.querySelector("div#reponseCompile");x&&x.appendChild(document.createTextNode(`réponse compilée : ${m}`))}}return h}const te="sandboxCE",ne="Compute-engine sandbox";class ie{constructor(){N(this,"typeExercice");N(this,"numeroExercice");N(this,"sup");N(this,"titre");N(this,"container");this.typeExercice="html",this.titre="Compute-engine sandbox",this.container=document.createElement("div"),this.container.setAttribute("overflow","auto");const t=window.mathVirtualKeyboard;this.container.id="sandbox",this.container.innerHTML=`<table id="table1">
        <thead>
        <tr>
            <th colspan="3">
                <h2>Saisir deux expressions puis choisir le type de comparaison</h2>
            </th>
        </tr>
        <tr>
            <td>
             <label>Type de comparaison :
                    <select id="format">
                        <option>littéral</option>
                        <option>numérique</option>
                        <option>fraction</option>
                        <option>liste</option>
                        <option>fonction</option>
                    </select>
                </label>
</td>
<td>    </td>
     <td>séparateur décimal
     <form id="sep">
     <input type="radio" name="sep" value="virgule" checked><label>virgule</label></input>
     <input type="radio" name="sep" value="point"><label>point</label></input>
</form>
</td>          
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><h3>Saisie élève</h3></td>
            <td><h3>Réponse attendue</h3></td>
            <td><h3>Résultat de la comparaison</h3></td>
        </tr>
        <tr>
            <td id="saisie"></td>
            <td id="reponse"></td>
            <td id="resultat">true</td>
        </tr>
        <tr>
            <td id="optionsSaisie"></td>
            <td id="optionsReponse"></td>
        </tr>
        <tr>
            <th>Rendre canonique la saisie élève ?</th>
            <th>Rendre canonique la réponse attendue ?</th>
            <th>Utiliser isSame() ou isEqual() ?</th>
        </tr>
        <tr>
            <th>
                <form id='canonicalSaisie'>
                    <label><input type='radio' name='canonicalSaisie' value='true' checked>True</label><br>
                    <label><input type='radio' name='canonicalSaisie' value='false'>False</label>
                </form>
            </th>
            <th>
                <form id='canonicalReponse'>
                    <label><input type='radio' name='canonicalReponse' value='true' checked>True</label><br>
                    <label><input type='radio' name='canonicalReponse' value='false'>False</label>
                </form>
            </th>
            <th>
                <form id="isEqual">
                    <label><input type='radio' name='isEqual' value='true' checked>isEqual()</label><br>
                    <label><input type='radio' name='isEqual' value='false'>isSame()</label>
                </form>
            </th>
        </tr>
        <tr>

        </tr>
        <tr>
            <th colspan="2">
                résultat après traitement
            </th>
        </tr>
        <tr>
            <th id="resultatSaisie">
                &nbsp;
            </th>
            <th id="resultatReponse">
                &nbsp;
            </th>
        </tr>
        </tbody>
    </table>
    <div id="feedback" style="display: block">
        <div id="conclusion"></div>
        <div id="divCompile" style="display: inline">
            <div id="saisieCompile" style="display: inline"></div>
            &nbsp;&nbsp;
            <div id="reponseCompile" style="display: inline"></div>
        </div>
    </div>
`;const q=this.container.querySelector("#sep"),C=this.container.querySelector("#canonicalSaisie"),y=this.container.querySelector("#canonicalReponse"),S=this.container.querySelector("#optionsSaisie"),u=this.container.querySelector("#optionsReponse"),g=this.container.querySelector("#isEqual"),$=C==null?void 0:C.querySelectorAll("input"),V=y==null?void 0:y.querySelectorAll("input"),m=g==null?void 0:g.querySelectorAll("input"),R=this.container.querySelector("#saisie"),L=this.container.querySelector("#reponse"),T=this.container.querySelector("#resultat"),l=this.container.querySelector("#format");let i=!1,a=!1,h=!1,j,w;P.decimalSeparator=",";const b=new P,E=new P;b.mathVirtualKeyboardPolicy="manual",E.mathVirtualKeyboardPolicy="manual",b.addEventListener("focusin",()=>t.show()),E.addEventListener("focusin",()=>t.show()),b.addEventListener("focusout",()=>t.hide()),E.addEventListener("focusout",()=>t.hide());const k=document.createElement("form"),A=document.createElement("form");function I(){if(S&&k){for(const e of Array.from(k.children))k.removeChild(e);for(const e of Array.from(S.children))S.removeChild(e)}if(u&&A){for(const e of Array.from(A.children))A.removeChild(e);for(const e of Array.from(u.children))u.removeChild(e)}}function D(e,o,n){const s=document.createElement("label"),f=document.createTextNode(e),c=document.createElement("input");return c.addEventListener("change",()=>O()),c.type="checkbox",c.value=o,c.checked=n,c.name=o,s.appendChild(c),s.appendChild(f),s}function M(e,o){const n=document.createElement("label"),s=document.createTextNode(e[0]+" : "),f=document.createElement("input");f.addEventListener("change",()=>O()),f.type="radio",f.value=e[1],f.checked=o,f.name=e[0];const c=document.createElement("input");c.addEventListener("change",()=>O()),c.type="radio",c.value=e[2],c.checked=!1,c.name=e[0];const p=document.createTextNode(e[1]),H=document.createTextNode(e[2]);return n.appendChild(s),n.appendChild(f),n.appendChild(p),n.appendChild(c),n.appendChild(H),n}function v(e,...o){I();for(const n of o){const s=Array.isArray(n)?M(n,!1):D(n,n.replaceAll("é","e").replaceAll(/\s/g,""),!1);k.appendChild(s),k.appendChild(document.createElement("br")),e||(A.appendChild(Array.isArray(n)?M(n,!1):D(n,n.replaceAll("é","e").replaceAll(/\s/g,""),!1)),A.appendChild(document.createElement("br")))}}function x(e){if(e&&S&&u){switch(e){case"littéral":v(!1,...J);break;case"numérique":v(!1,...Q);break;case"fonction":v(!1,...Y);break;case"liste":v(!1,...X);break;case"fraction":v(!0,...W);break;default:throw I(),Error(`Le sélecteur de format a rencontré une valeur imprévue : ${l==null?void 0:l.value}`)}S.appendChild(k),u.appendChild(A)}}if(l&&l.addEventListener("change",()=>{if((l==null?void 0:l.value)==="fraction"&&(alert(`En format "fraction", le test se fait toujours avec isEqual, et l'option canonical à false.
Si l'option "forcer décimal en rationnel" est active, les nombres décimaux sont convertis en fractions décimales.
Les options permettent d'affiner le test.`),y)){const e=Array.from(y.querySelectorAll("input"));e[1]&&(e[1].checked=!0)}x(l.value)}),q){const e=({from:o,to:n,json:s})=>{if(Array.isArray(s))for(const f of s)e({from:o,to:n,json:f});else typeof s=="string"&&s.replaceAll(o,n)};q.addEventListener("change",()=>{const o=Array.from(q.querySelectorAll("input")),n=b.expression,s=E.expression;if(Array.isArray(o)&&o.length>0){const f=o.find(c=>c==null?void 0:c.checked);f&&(f.value==="virgule"?(P.decimalSeparator=",",e({from:".",to:",",json:n}),e({from:".",to:",",json:s}),b.expression=n,E.expression=s):(P.decimalSeparator=".",e({from:",",to:".",json:n}),e({from:",",to:".",json:s}),b.expression=n,E.expression=s))}})}C&&C.addEventListener("change",()=>{var e;if((l==null?void 0:l.value)==="fraction"){alert(`En format "fraction", le test se fait avec isEqual, l'option canonical à false.
Les options permettent de configurer plus finement le test.
De plus, si l'option "forcer décimal en rationnel" est active, les nombres décimaux sont convertis en fraction décimale avant le test.`);const o=Array.from(C.querySelectorAll("input"));o[1]&&(o[1].checked=!0);return}$&&(i=!!((e=$[0])!=null&&e.checked)),O()}),y&&y.addEventListener("change",()=>{var e;if((l==null?void 0:l.value)==="fraction"){alert(`En format "fraction", l'option canonical reste à false car sinon, cela provoque la réduction de la fraction.`);const o=Array.from(y.querySelectorAll("input"));o[1]&&(o[1].checked=!0);return}V&&(a=!!((e=V[0])!=null&&e.checked)),O()}),g&&g.addEventListener("change",()=>{var e;if(m&&l&&l.value==="fraction"){const o=document.querySelector("#optionsSaisie");o&&(o.firstChild.elements[1].checked?(h=!0,m[0]&&m[1]&&(m[0].checked=!0,m[1].checked=!1)):(h=!1,m[0]&&m[1]&&(m[1].checked=!0,m[0].checked=!1)))}else m&&(h=!!((e=m[0])!=null&&e.checked));O()}),b&&b.addEventListener("change",()=>{O()}),E&&E.addEventListener("change",()=>{O()});function O(){j={},w={};let e;if(l){const o=l.value;if(["littéral","fraction","fonction","numérique","liste"].includes(o)){e=o.replaceAll("é","e").replaceAll(/\s/g,"");const n=Array.from(k.elements).filter(p=>p.checked).map(p=>p.name==="notation"?[p.name,p.value]:[p.name,!0]),s=Array.from(A.elements).filter(p=>p.checked).map(p=>p.name==="notation"?[p.name,p.value]:[p.name,!0]),f=[e,Object.fromEntries(n)],c=[e,Object.fromEntries(s)];if(j=Object.fromEntries([f]),w=Object.fromEntries([c]),T){const p=Z(b.value,E.value,{saisieCanonical:i,reponseCanonical:a,isEqual:h,formatSelector:e,optionsFormatSaisie:j,optionsFormatReponse:w});T.innerText=String(p)}}}}R&&R.appendChild(b),L&&L.appendChild(E),x("littéral")}get html(){return this.container}}export{ie as default,ne as titre,te as uuid};
//# sourceMappingURL=sandboxCE-DpMl3Kyj.js.map
