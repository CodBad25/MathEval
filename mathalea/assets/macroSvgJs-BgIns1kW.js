import{k as g}from"./vendors/katex-DRsvfONx.js";import"./vendors/svgdotjs_svg.js-23QrOhwr.js";import{T as d}from"./index-DjA7ROjC.js";function z(o,a,n,x,e,t,c,l){return`
  \\setbox0\\box\\csname@mpfootins\\endcsname
  \\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
  \\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm,scale=0.8]
  \\draw [line width=3pt,color=frvzsz] (-4,4)-- (2,4);
  \\draw [line width=3pt,color=frvzsz] (2,4)-- (2,0);
  \\draw [line width=3pt,color=frvzsz] (2,0)-- (-4,0);
  \\draw [line width=3pt,color=frvzsz] (-4,0)-- (-4,4);
  \\draw [line width=3pt,color=frvzsz] (-4,2)-- (-5,2);
  \\draw [line width=3pt,color=frvzsz] (-5,2.4)-- (-5,1.6);
  \\draw [->,line width=3pt,color=frvzsz] (2,2) -- (3,2);
  \\node[text centered] at(-1,3.5){\\Large $\\mathbf{machine\\,${o}}$};
  \\node[text centered] at(-1,2.8){\\Large $\\mathbf{${a}}$};
  \\node[text centered] at(-1,2.3){\\Large $${n}$};
  \\node[text width=3cm,text centered] at(-1,1.6){\\Large  $${x}$};
  \\node[text width=3cm,text centered] at(-9,2.5) {\\Large  $\\mathbf{${e}}$};
  \\node[text width=3cm,text centered] at(-9,1.5) {\\Large $\\mathbf{${t}}$};
  \\fill [line width=3pt,color=frvzsz] (-6,2) -- (-6.5,1) -- (-5.5,2) -- (-6.5,3) -- cycle;
  %\\fill [line width=3pt,color=frvzsz] (1,2) -- (0.5,1) -- (1.5,2) -- (0.5,3) -- cycle;
  \\node[text centered] at(5.5,2.5) {\\Large  $\\mathbf{${c}}$};
  \\node[text centered] at(5.5,1.5) {\\Large  $\\mathbf{${l}}$};
  \\fill [line width=3pt,color=frvzsz] (3.5,2) -- (3,1) -- (4,2) -- (3,3) -- cycle;
  \\end{tikzpicture}
  \\global\\setbox\\csname@mpfootins\\endcsname\\box0
  `}function u(o,a,n){let e=0;const t=1;let c="";c+=`
  \\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
  \\setbox0\\box\\csname@mpfootins\\endcsname
  \\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
  \\draw [line width=3pt,color=frvzsz] (-10,0.5) -- (`+(-10+t)+",0.5) -- ("+(-10+t)+`,-0.5) -- (-10,-0.5) -- cycle;
  \\node[text width=3cm,text centered, scale=1] at(`+(-10+.5)+`,0){$${a}$};
  `,e=e+t;for(let l=0;l<n.length;l++)if(n.length===l+1){if(typeof n[l][0]<"u"&&typeof n[l][1]<"u"){const i=`${o}(x)=${n[l][1]}}`.length;c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+`,0) circle(0.5);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$${n[l][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+",0.5) -- ("+(-10+e+i/4+6*t/2)+",0.5) -- ("+(-10+e+i/4+6*t/2)+",-0.5) -- ("+(-10+e+5*t/2)+`,-0.5) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+i/8+5.5*t/2)+`,0){$${o}(`+a+`)=${n[l][1]}$};
        `}if(typeof n[l][0]<"u"&&typeof n[l][1]>"u"){const i=`${o}(x)=\\ldots`.length;c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+",0) circle("+t/2+`);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$${n[l][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+",-"+t/2+") -- ("+(-10+e+5*t/2)+",-"+t/2+`) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+i/8+5.5*t/2)+`,0){$${o}(`+a+`)=\\ldots$};
        `}if(typeof n[l][0]>"u"&&typeof n[l][1]<"u"){const i=`${o}(x)=${n[l][1]}`.length;c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+",0) circle("+t/2+`);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+",-"+t/2+") -- ("+(-10+e+5*t/2)+",-"+t/2+`) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+i/8+5.5*t/2)+`,0){$${o}(`+a+`)=${n[l][1]}$};
        `}if(typeof n[l][0]>"u"&&typeof n[l][1]>"u"){const i=`${o}(x)=\\ldots`.length;c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+",0) circle("+t/2+`);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+",-"+t/2+") -- ("+(-10+e+5*t/2)+",-"+t/2+`) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+i/8+5.5*t/2)+`,0){$${o}(`+a+`)=\\ldots$};
        `}}else{if(typeof n[l][0]<"u"&&typeof n[l][1]<"u"){const i=`${n[l][1]}`.length;c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+",0) circle("+t/2+`);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$${n[l][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+",-"+t/2+") -- ("+(-10+e+5*t/2)+",-"+t/2+`) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+i/8+5.5*t/2)+`,0){$${n[l][1]}$};
        `,e=e+3*t+i/4}if(typeof n[l][0]<"u"&&typeof n[l][1]>"u"&&(c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+",0) circle("+t/2+`);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$${n[l][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+","+t/2+") -- ("+(-10+e+6/4+6*t/2)+","+t/2+") -- ("+(-10+e+6/4+6*t/2)+",-"+t/2+") -- ("+(-10+e+5*t/2)+",-"+t/2+`) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+6/8+5.5*t/2)+`,0){$\\ldots$};
        `,e=e+3*t+6/4),typeof n[l][0]>"u"&&typeof n[l][1]<"u"){const i=`${n[l][1]}`.length;c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+",0) circle("+t/2+`);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+","+t/2+") -- ("+(-10+e+i/4+6*t/2)+",-"+t/2+") -- ("+(-10+e+5*t/2)+",-"+t/2+`) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+i/8+5.5*t/2)+`,0){$${n[l][1]}$};
        `,e=e+3*t+i/4}typeof n[l][0]>"u"&&typeof n[l][1]>"u"&&(c+=`
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e)+",0) -- ("+(-10+e+t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+t)+",0) circle("+t/2+`);
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+t)+`,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (`+(-10+e+3*t/2)+",0) -- ("+(-10+e+5*t/2)+`,0);
        \\draw [line width=3pt,color=frvzsz] (`+(-10+e+5*t/2)+","+t/2+") -- ("+(-10+e+6/4+6*t/2)+","+t/2+") -- ("+(-10+e+6/4+6*t/2)+",-"+t/2+") -- ("+(-10+e+5*t/2)+",-"+t/2+`) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(`+(-10+e+6/8+5.5*t/2)+`,0){$\\ldots$};
        `,e=e+3*t+6/4)}return c+=`
  \\end{tikzpicture}
  \\global\\setbox\\csname@mpfootins\\endcsname\\box0
  `,c}function m(o){return`
   
   \\setlength{\\fboxrule}{1.5mm}
   \\par\\vspace{0.25cm}
   \\noindent\\fcolorbox{nombres}{white}{\\parbox{\\linewidth-2\\fboxrule-2\\fboxsep}{`+o+`}}
   \\par\\vspace{0.25cm}
   `}function k(o){return`
  <div style="text-align:center">
  <video width="560" height="100%"  loop autoplay muted style="max-width: 100%" >
    <source src="`+o+`">
    Votre navigateur ne gère pas l'élément <code>video</code>.
  </video>
  </div>`}function y(o,a,n,x,e,t){const l="display: block";let i=d(25,1),r=d(50,1);const f=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString(e)}</div>`;i=d(9*10,1),r=d(50,1);const w=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString("\\times"+t[0][0])}</div>`;i=d(17*10,1),r=d(50,1);const s=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString(t[0][0]+"\\times "+e)}</div>`;i=d(25*10,1),r=d(50,1);const h=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString("+"+t[1][0])}</div>`;i=d(36*10,1),r=d(50,1);const $=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString(x+"("+e+") = "+t[0][0]+"\\times "+e+"+"+t[1][0])}</div>`;return`<div class="svgContainer" ${`style="${l}"`}><div style="position: relative;">
                <svg class="mathalea2d" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+a+" "+n+'" width="'+a+'" height="'+n+`">
                  <g>
                      <path d="M0 `+5*10+"L0 "+3*10+"L"+5*10+" "+3*10+"L"+5*10+" "+7*10+"L0 "+7*10+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>                          
                  </g>
                  <g>
                      <line x1="`+5*10+'" y1="'+5*10+'" x2="'+7*10+'" y2="'+5*10+`" stroke-width="3" stroke="#f15929">
                      </line>
                      <circle r="`+2*10+'" cx="'+9*10+'" cy="'+5*10+`" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </circle>
                      <path d="M`+11*10+" "+5*10+"L"+13*10+" "+5*10+"L"+(13*10-10/2)+" "+(5*10-10/2)+"M"+13*10+" "+5*10+"L"+(13*10-10/2)+" "+(5*10+10/2)+` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>                          
                  </g>
                  <g>
                      <path d="M`+13*10+" "+5*10+"L"+13*10+" "+3*10+"L"+21*10+" "+3*10+"L"+21*10+" "+7*10+"L"+13*10+" "+7*10+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>                          
                  </g>
                  <g>
                      <line x1="`+21*10+'" y1="'+5*10+'" x2="'+23*10+'" y2="'+5*10+`" stroke-width="3" stroke="#f15929">
                      </line>
                      <circle r="`+2*10+'" cx="'+25*10+'" cy="'+5*10+`" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </circle>
                      <path d="M`+27*10+" "+5*10+"L"+29*10+" "+5*10+"L"+(29*10-10/2)+" "+(5*10-10/2)+"M"+29*10+" "+5*10+"L"+(29*10-10/2)+" "+(5*10+10/2)+` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>                          
                  </g>
                  <g>
                      <path d="M`+29*10+" "+5*10+"L"+29*10+" "+3*10+"L"+44*10+" "+3*10+"L"+44*10+" "+7*10+"L"+29*10+" "+7*10+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>                  
                  </g>
              </svg>
              ${f}
              ${w}
            ${s}
            ${h}
              ${$}
              </div>
              </div>
              `}function L(o,a,n,x,e,t){const l="display: block";let i=d(25,1),r=d(50,1);const f=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString(e)}</div>`;i=d(9*10,1),r=d(50,1);const w=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString("\\times "+t[0][0])}</div>`;i=d(19*10,1),r=d(50,1);const s=` <div class="divLatex" style="position: absolute; top: ${r}px; left: ${i}px;transform: translate(-50%,-50%)" data-top="${r}" data-left="${i}">${g.renderToString(x+"("+e+") = "+t[0][0]+"\\times "+e)}</div>`;return`<div class="svgContainer" ${`style="${l}"`}><div style="position: relative;">
              <svg class="mathalea2d" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 `+a+" "+n+'" width="'+a+'" height="'+n+`">
                  <g>
                      <path d="M0 `+5*10+"L0 "+3*10+"L"+5*10+" "+3*10+"L"+5*10+" "+7*10+"L0 "+7*10+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>
                  </g>
                  <g>
                      <line x1="`+5*10+'" y1="'+5*10+'" x2="'+7*10+'" y2="'+5*10+`" stroke-width="3" stroke="#f15929">
                      </line>
                      <circle r="`+2*10+'" cx="'+9*10+'" cy="'+5*10+`" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </circle>
                      <path d="M`+11*10+" "+5*10+"L"+13*10+" "+5*10+"L"+(13*10-10/2)+" "+(5*10-10/2)+"M"+13*10+" "+5*10+"L"+(13*10-10/2)+" "+(5*10+10/2)+` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>                
                  </g>
                  <g>
                      <path d="M`+13*10+" "+5*10+"L"+13*10+" "+3*10+"L"+27*10+" "+3*10+"L"+27*10+" "+7*10+"L"+13*10+" "+7*10+`Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                      </path>                          
                  </g>
              </svg>
              ${f}
              ${w}
              ${s}
              </div>
              </div>
                `}export{y as S,u as a,L as b,m as c,k as m,z as t};
//# sourceMappingURL=macroSvgJs-BgIns1kW.js.map
