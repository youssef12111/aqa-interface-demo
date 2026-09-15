'use strict';
const steps=[
 {name:'Analyze',image:'assets/analyze.jpeg',action:'Open Upload Contract',target:1,hotspots:[{label:'Upload Contract',x:15,y:26,w:76,h:8,target:1}]},
 {name:'Upload',image:'assets/upload.jpeg',action:'Choose recorded example',target:2,hotspots:[{label:'Choose recorded example',x:66,y:31,w:22,h:7,target:2}]},
 {name:'Ready',type:'ready',action:'Open recorded analysis',target:3},
 {name:'Results',image:'assets/results.jpeg',action:'Inspect termination evidence',target:4,hotspots:[{label:'Inspect termination evidence',x:9,y:64.8,w:82,h:16.5,target:4},{label:'Save to history walkthrough',x:10,y:91.7,w:80,h:4.5,target:5}]},
 {name:'Evidence',type:'evidence',action:'Continue to saving',target:5},
 {name:'Save',type:'save',action:'Show recorded History',target:6},
 {name:'History',image:'assets/history.jpeg',action:'Restart walkthrough',target:0,hotspots:[]}
];
const $=id=>document.getElementById(id);let current=0;
function ready(){return `<div class="phone"><div class="phone-header"><button class="icon-btn" data-go="1" aria-label="Back to upload">←</button>Upload contract</div><div class="phone-body"><p>Select a PDF, DOCX, or TXT file. The backend will extract text and analyze it.</p><div class="file-card"><span>▤ &nbsp; contract_test.txt</span><button data-go="1">Choose</button></div><button class="primary" data-go="3">▷ &nbsp; Analyze file</button><button class="quiet" data-go="1">← Back</button></div></div>`;}
function evidence(){return `<div class="phone"><div class="sheet"><button class="icon-btn" data-go="3" aria-label="Close evidence details">←</button><h3>Termination / Notice / Cure Period</h3><div class="badges"><span class="badge">Termination</span><span class="badge">HIGH</span><span class="badge">Score: 82/100</span><span class="badge">Rule: termination</span></div><h4>Evidence</h4><blockquote>“<span class="evidence-highlight">Either party may terminate this Agreement by providing 30 days written notice to the other party.</span>”</blockquote><h4>Why flagged</h4><p>Termination / Notice / Cure Period detected in section 'Termination'.</p><button class="quiet" data-go="3">Close details</button></div></div>`;}
function render(index,focus=false){current=Math.max(0,Math.min(steps.length-1,index));const s=steps[current];$('back').disabled=current===0;$('next').disabled=current===steps.length-1;$('next').textContent=current===steps.length-1?'Complete ✓':'Next →';$('zoom').hidden=!s.image;
 $('steps').innerHTML=steps.map((s,i)=>`<button data-go="${i}" ${i===current?'aria-current="step"':''}>${s.name}</button>`).join('');
 if(s.image){$('screen').innerHTML=`<div class="capture"><img src="${s.image}" alt="Original ${s.name} screen from the Flutter project report">${s.hotspots.map(h=>`<button class="hotspot" data-go="${h.target}" aria-label="${h.label}" title="${h.label}" style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%"></button>`).join('')}</div>`;}
 else if(s.type==='ready')$('screen').innerHTML=ready();
 else if(s.type==='evidence')$('screen').innerHTML=evidence();
 else $('screen').innerHTML=`<div class="saved-state"><h3>Save to history → Saved</h3><button class="primary" data-go="6">History</button></div>`;
 document.body.dataset.step=current;if(focus)$('steps').querySelector('[aria-current]').focus({preventScroll:true});
}
document.addEventListener('click',e=>{const go=e.target.closest('[data-go]');if(go){render(Number(go.dataset.go),true);return;}const close=e.target.closest('[data-close]');if(close)$(close.dataset.close).close();});
$('back').onclick=()=>render(current-1,true);$('next').onclick=()=>render(current+1,true);$('restart').onclick=()=>render(0,true);
$('zoom').onclick=()=>{$('zoom-image').src=steps[current].image;$('zoom-dialog').showModal();};
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();render(current+1,true);}if(e.key==='ArrowLeft'){e.preventDefault();render(current-1,true);}});
render(0);
