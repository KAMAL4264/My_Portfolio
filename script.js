(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;let saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
root.dataset.theme=(saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';
$('#theme').addEventListener('click',()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}});
const burger=$('#burger'),menu=$('#menu');
const closeMenu=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded','false')};
burger.addEventListener('click',()=>{burger.setAttribute('aria-expanded',menu.classList.toggle('open'))});
$$('#menu a').forEach(a=>a.addEventListener('click',closeMenu));
const links=$$('#menu a');
$$('main [id]').forEach(s=>{if(!links.some(l=>l.getAttribute('href')==='#'+s.id))return;
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+s.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe(s)});
// rotating skill word (stops if reduced motion is on)
const words=['AWS','Python','Terraform','PostgreSQL','ReactJS'],rot=$('#rot');let w=0;
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{w=(w+1)%words.length;rot.textContent=words[w]},2000);
// project tabs
const tabs=$$('[role=tab]');
const pick=t=>{tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;$('#'+x.getAttribute('aria-controls')).hidden=!on});t.focus()};
tabs.forEach((t,i)=>{t.addEventListener('click',()=>pick(t));
 t.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(k){e.preventDefault();pick(tabs[(i+k+tabs.length)%tabs.length])}})});
$('#copy').addEventListener('click',async()=>{const m='kamalnath4264@gmail.com',s=$('#status');
 try{await navigator.clipboard.writeText(m);s.textContent='Email copied to clipboard.'}catch(e){s.textContent='Copy failed. Email: '+m}
 setTimeout(()=>s.textContent='',3000)});
$('#yr').textContent=new Date().getFullYear();
})();
