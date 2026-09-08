const $ = (id) => document.getElementById(id);
const uid = () => Math.random().toString(36).slice(2,10);
const clone = (x) => JSON.parse(JSON.stringify(x));
const num = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
const round = (v,d=1) => Math.round((num(v)+Number.EPSILON)*10**d)/10**d;

const defaultFoodDB = [
  {id:uid(), name:'นมจืด', basis_value:100, basis_unit:'mL', kcal:61, protein:3.2, fat:3.3, cho:4.8, sodium:43, potassium:150, calcium:113, phosphorus:84, iron:0.03, zinc:0.4, vitA:46, vitD:1.3, vitE:0.1, source:'Demo'},
  {id:uid(), name:'ไข่ไก่สุก', basis_value:1, basis_unit:'ฟอง', kcal:78, protein:6.3, fat:5.3, cho:0.6, sodium:62, potassium:63, calcium:28, phosphorus:99, iron:0.9, zinc:0.6, vitA:75, vitD:1.1, vitE:0.5, source:'Demo'},
  {id:uid(), name:'ข้าวสวย', basis_value:100, basis_unit:'g', kcal:130, protein:2.4, fat:0.3, cho:28.7, sodium:1, potassium:35, calcium:10, phosphorus:43, iron:0.2, zinc:0.5, vitA:0, vitD:0, vitE:0.04, source:'Demo'},
  {id:uid(), name:'dextrin', basis_value:1, basis_unit:'g', kcal:4, protein:0, fat:0, cho:1, sodium:0, potassium:0, calcium:0, phosphorus:0, iron:0, zinc:0, vitA:0, vitD:0, vitE:0, source:'Custom default'},
  {id:uid(), name:'whey protein', basis_value:1, basis_unit:'g', kcal:4, protein:1, fat:0, cho:0, sodium:0, potassium:0, calcium:0, phosphorus:0, iron:0, zinc:0, vitA:0, vitD:0, vitE:0, source:'Custom default'},
  {id:uid(), name:'LCT oil', basis_value:1, basis_unit:'g', kcal:9, protein:0, fat:1, cho:0, sodium:0, potassium:0, calcium:0, phosphorus:0, iron:0, zinc:0, vitA:0, vitD:0, vitE:0, source:'Custom default'},
  {id:uid(), name:'MCT oil', basis_value:1, basis_unit:'g', kcal:8.3, protein:0, fat:1, cho:0, sodium:0, potassium:0, calcium:0, phosphorus:0, iron:0, zinc:0, vitA:0, vitD:0, vitE:0, source:'Custom default'}
];

const defaultState = {
  pnif:{format:'PNIF',version:'0.1',type:'24hr_recall',warnings:[]},
  meals:[],
  foodDB:clone(defaultFoodDB),
  modular:{name:'Daily modular recipe',finalVolume:900,notes:'',components:[],feeds:[]},
  lastSummary:null
};

let state = loadState();
let deferredInstallPrompt = null;

function loadState(){
  try{ const saved = localStorage.getItem('pedNutritionStateV1'); return saved ? {...clone(defaultState),...JSON.parse(saved)} : clone(defaultState); }
  catch(e){ return clone(defaultState); }
}
function saveState(){ localStorage.setItem('pedNutritionStateV1', JSON.stringify(state)); }

function showTab(name){
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===`tab-${name}`));
  if(name==='review') renderMeals();
  if(name==='foods') renderFoodDB();
  if(name==='modular') renderModular();
  if(name==='summary') renderSummary();
}

document.querySelectorAll('[data-tab]').forEach(el=>el.addEventListener('click',()=>showTab(el.dataset.tab)));

window.addEventListener('beforeinstallprompt', e=>{e.preventDefault();deferredInstallPrompt=e;$('installBtn').classList.remove('hidden');});
$('installBtn').addEventListener('click', async()=>{ if(!deferredInstallPrompt) return; deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt=null; $('installBtn').classList.add('hidden'); });
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

function normalizeAmount(v){
  if(typeof v==='number') return {value:v,original:String(v)};
  if(v===null || v===undefined || v==='') return {value:'',original:''};
  const s=String(v).trim();
  const m=s.match(/^\s*(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*$/);
  if(m) return {value:round((Number(m[1])+Number(m[2]))/2,2),original:s};
  const n=Number(s); return {value:Number.isFinite(n)?n:s,original:s};
}
function normalizeItem(item={}){
  const a=normalizeAmount(item.amount);
  return {
    id:item.id||uid(), time:item.time||'', type:item.type||inferType(item), food:item.food||item.name||'', amount:a.value,
    original_amount:a.original, unit:item.unit||'', weight_g:item.weight_g??'', volume_ml:item.volume_ml??'', raw_cooked:item.raw_cooked||'unknown',
    brand:item.brand||item.formula||'', concentration_kcal_oz:item.kcal_oz??item.concentration_kcal_oz??'', confidence:item.confidence||'medium',
    needs_review:Boolean(item.needs_review||item.confidence==='low'), note:item.note||'', ingredients:(item.ingredients||[]).map(normalizeIngredient)
  };
}
function normalizeIngredient(i={}){
  const a=normalizeAmount(i.amount);
  return {id:i.id||uid(), food:i.food||i.name||'', amount:a.value, original_amount:a.original, unit:i.unit||'', weight_g:i.weight_g??'', raw_cooked:i.raw_cooked||'unknown', confidence:i.confidence||'medium', note:i.note||''};
}
function inferType(item){
  const s=((item.food||'')+' '+(item.brand||item.formula||'')).toLowerCase();
  if(s.includes('formula')||s.includes('นม')||item.kcal_oz) return 'medical_formula';
  if(s.includes('modular')) return 'saved_modular';
  return 'regular_food';
}
function extractJson(text){
  const fenced=text.match(/```(?:json)?\s*([\s\S]*?)```/i); if(fenced) text=fenced[1];
  const first=text.indexOf('{'), last=text.lastIndexOf('}'); if(first<0||last<=first) throw new Error('ไม่พบ JSON object');
  return JSON.parse(text.slice(first,last+1));
}
function importPnif(){
  try{
    const obj=extractJson($('pnifInput').value);
    if(!obj || !Array.isArray(obj.items)) throw new Error('PNIF ต้องมี items เป็น array');
    state.pnif={format:obj.format||'PNIF',version:obj.version||'0.1',type:obj.type||'24hr_recall',warnings:obj.warnings||[]};
    state.meals=obj.items.map(normalizeItem);
    sortMeals(); saveState();
    $('pnifStatus').className='status ok'; $('pnifStatus').textContent=`Import สำเร็จ ${state.meals.length} รายการ — ไปที่ Review Intake เพื่อแก้ไขก่อนคำนวณ`;
    renderMeals(); showTab('review');
  }catch(e){ $('pnifStatus').className='status error'; $('pnifStatus').textContent='Import ไม่สำเร็จ: '+e.message; }
}
$('importPnifBtn').addEventListener('click',importPnif);
$('clearPnifBtn').addEventListener('click',()=>{$('pnifInput').value='';$('pnifStatus').textContent='';});
$('loadExampleBtn').addEventListener('click',()=>{$('pnifInput').value=JSON.stringify({format:'PNIF',version:'0.1',type:'24hr_recall',items:[{time:'10:00',food:'นมจืด',amount:180,unit:'mL',confidence:'high'},{time:'12:00',food:'ข้าว',amount:2,unit:'ทัพพี',confidence:'medium',needs_review:true,ingredients:[]}],warnings:['ตัวอย่างสำหรับทดสอบการแก้ไขและแทรกรายการ']},null,2)});

function sortMeals(){ state.meals.sort((a,b)=>(a.time||'99:99').localeCompare(b.time||'99:99')); saveState(); }
$('sortMealsBtn').addEventListener('click',()=>{sortMeals();renderMeals();});
$('addMealBtn').addEventListener('click',()=>{ state.meals.push(normalizeItem({time:'',food:'',confidence:'medium',needs_review:true})); saveState(); renderMeals(); });

function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function fieldLabel(label,input){return `<label>${label}${input}</label>`}
function typeOptions(v){return [['regular_food','Regular food'],['medical_formula','Medical formula'],['saved_modular','Saved modular recipe'],['fortifier','Fortifier / modular component']].map(([x,l])=>`<option value="${x}" ${x===v?'selected':''}>${l}</option>`).join('');}
function rcOptions(v){return ['unknown','raw','cooked','ready_to_feed'].map(x=>`<option ${x===v?'selected':''}>${x}</option>`).join('');}

function renderMeals(){
  const c=$('mealsContainer'); c.innerHTML='';
  $('reviewWarnings').innerHTML=(state.pnif.warnings||[]).map(w=>`<div class="warning-box">⚠️ ${esc(w)}</div>`).join('');
  if(!state.meals.length){c.innerHTML='<p class="muted">ยังไม่มีรายการอาหาร — Import PNIF หรือกด + Add food</p>';return;}
  state.meals.forEach((m,idx)=>{
    const card=document.createElement('div'); card.className='meal-card'+(m.needs_review?' needs-review':''); card.dataset.id=m.id;
    card.innerHTML=`
      <div class="meal-head">
        ${fieldLabel('Time',`<input data-k="time" value="${esc(m.time)}" placeholder="11:00">`)}
        ${fieldLabel('Food / dish',`<input data-k="food" value="${esc(m.food)}" placeholder="ชื่ออาหาร">`)}
        ${fieldLabel('Amount',`<input data-k="amount" value="${esc(m.amount)}" placeholder="1">`)}
        ${fieldLabel('Unit',`<input data-k="unit" value="${esc(m.unit)}" placeholder="g, mL, ชิ้น">`)}
        ${fieldLabel('Type',`<select data-k="type">${typeOptions(m.type)}</select>`)}
        <div class="meal-actions"><button class="small-btn secondary" data-action="insert">+ Insert below</button><button class="small-btn danger" data-action="delete">Delete</button></div>
      </div>
      <div class="grid-4" style="margin-top:8px">
        ${fieldLabel('Weight g',`<input data-k="weight_g" type="number" step="0.1" value="${esc(m.weight_g)}">`)}
        ${fieldLabel('Volume mL',`<input data-k="volume_ml" type="number" step="0.1" value="${esc(m.volume_ml)}">`)}
        ${fieldLabel('Raw/Cooked',`<select data-k="raw_cooked">${rcOptions(m.raw_cooked)}</select>`)}
        ${fieldLabel('Brand / formula',`<input data-k="brand" value="${esc(m.brand)}">`)}
      </div>
      <div class="grid-4" style="margin-top:8px">
        ${fieldLabel('kcal/oz',`<input data-k="concentration_kcal_oz" type="number" step="0.1" value="${esc(m.concentration_kcal_oz)}">`)}
        ${fieldLabel('Confidence',`<select data-k="confidence"><option ${m.confidence==='high'?'selected':''}>high</option><option ${m.confidence==='medium'?'selected':''}>medium</option><option ${m.confidence==='low'?'selected':''}>low</option></select>`)}
        ${fieldLabel('Needs review',`<select data-k="needs_review"><option value="false" ${!m.needs_review?'selected':''}>No</option><option value="true" ${m.needs_review?'selected':''}>Yes</option></select>`)}
        ${fieldLabel('Note',`<input data-k="note" value="${esc(m.note)}">`)}
      </div>
      <div class="ingredient-wrap"><div><strong>Ingredients</strong> <button class="small-btn secondary" data-action="addIngredient">+ Add ingredient</button></div><div class="ingredients"></div></div>
    `;
    card.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('change',()=>{let v=inp.value;if(inp.dataset.k==='needs_review')v=v==='true';m[inp.dataset.k]=v;saveState();renderMeals();}));
    card.querySelector('[data-action="insert"]').addEventListener('click',()=>{state.meals.splice(idx+1,0,normalizeItem({time:m.time,food:'',needs_review:true}));saveState();renderMeals();});
    card.querySelector('[data-action="delete"]').addEventListener('click',()=>{state.meals=state.meals.filter(x=>x.id!==m.id);saveState();renderMeals();});
    card.querySelector('[data-action="addIngredient"]').addEventListener('click',()=>{m.ingredients.push(normalizeIngredient({}));saveState();renderMeals();});
    const iw=card.querySelector('.ingredients');
    m.ingredients.forEach(ing=>{
      const row=document.createElement('div'); row.className='ingredient-row';
      row.innerHTML=`${fieldLabel('Food',`<input data-k="food" value="${esc(ing.food)}">`)}${fieldLabel('Amount',`<input data-k="amount" value="${esc(ing.amount)}">`)}${fieldLabel('Unit',`<input data-k="unit" value="${esc(ing.unit)}">`)}${fieldLabel('Weight g',`<input data-k="weight_g" type="number" step="0.1" value="${esc(ing.weight_g)}">`)}${fieldLabel('Raw/Cooked',`<select data-k="raw_cooked">${rcOptions(ing.raw_cooked)}</select>`)}<button class="small-btn danger">Delete</button>`;
      row.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('change',()=>{ing[inp.dataset.k]=inp.value;saveState();}));
      row.querySelector('button').addEventListener('click',()=>{m.ingredients=m.ingredients.filter(x=>x.id!==ing.id);saveState();renderMeals();});
      iw.appendChild(row);
    });
    if(m.needs_review) card.insertAdjacentHTML('afterbegin','<span class="review-badge">Needs review</span>');
    c.appendChild(card);
  });
}

function renderFoodDB(){
  const body=$('foodDbBody');body.innerHTML='';
  state.foodDB.forEach(f=>{
    const tr=document.createElement('tr');tr.className='food-edit-row';
    tr.innerHTML=`<td><input data-k="name" value="${esc(f.name)}"></td><td><input data-k="basis_value" type="number" step="0.1" value="${esc(f.basis_value)}" style="width:65px"> <input data-k="basis_unit" value="${esc(f.basis_unit)}" style="width:70px"></td><td><input data-k="kcal" type="number" step="0.01" value="${esc(f.kcal)}"></td><td><input data-k="protein" type="number" step="0.01" value="${esc(f.protein)}"></td><td><input data-k="fat" type="number" step="0.01" value="${esc(f.fat)}"></td><td><input data-k="cho" type="number" step="0.01" value="${esc(f.cho)}"></td><td><input data-k="source" value="${esc(f.source)}"></td><td><button class="small-btn danger">Delete</button></td>`;
    tr.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('change',()=>{f[inp.dataset.k]=inp.value;saveState();}));
    tr.querySelector('button').addEventListener('click',()=>{state.foodDB=state.foodDB.filter(x=>x.id!==f.id);saveState();renderFoodDB();});
    body.appendChild(tr);
  });
}
$('addFoodDbBtn').addEventListener('click',()=>{state.foodDB.unshift({id:uid(),name:'',basis_value:100,basis_unit:'g',kcal:0,protein:0,fat:0,cho:0,sodium:0,potassium:0,calcium:0,phosphorus:0,iron:0,zinc:0,vitA:0,vitD:0,vitE:0,source:'Custom'});saveState();renderFoodDB();});

function modComponentBlank(){return {id:uid(),name:'',amount:0,unit:'g',kcal:0,protein:0,fat:0,cho:0};}
function feedBlank(){return {id:uid(),time:'',prescribed:0,actual:0,note:''};}
function renderModular(){
  $('modName').value=state.modular.name||'';$('modFinalVolume').value=state.modular.finalVolume||'';$('modNotes').value=state.modular.notes||'';
  const c=$('modComponents');c.innerHTML='';
  state.modular.components.forEach(comp=>{
    const r=document.createElement('div');r.className='mod-row';
    r.innerHTML=`${fieldLabel('Component',`<input data-k="name" value="${esc(comp.name)}" placeholder="formula / dextrin / MCT">`)}${fieldLabel('Amount',`<input data-k="amount" type="number" step="0.1" value="${esc(comp.amount)}">`)}${fieldLabel('Unit',`<input data-k="unit" value="${esc(comp.unit)}">`)}${fieldLabel('kcal total',`<input data-k="kcal" type="number" step="0.1" value="${esc(comp.kcal)}">`)}${fieldLabel('Protein g',`<input data-k="protein" type="number" step="0.1" value="${esc(comp.protein)}">`)}${fieldLabel('Fat g',`<input data-k="fat" type="number" step="0.1" value="${esc(comp.fat)}">`)}${fieldLabel('CHO g',`<input data-k="cho" type="number" step="0.1" value="${esc(comp.cho)}">`)}<button class="small-btn danger">Delete</button>`;
    r.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('change',()=>{comp[inp.dataset.k]=inp.value;saveState();renderModularSummary();}));
    r.querySelector('button').addEventListener('click',()=>{state.modular.components=state.modular.components.filter(x=>x.id!==comp.id);saveState();renderModular();});c.appendChild(r);
  });
  const f=$('feedSchedule');f.innerHTML='';
  state.modular.feeds.forEach(feed=>{
    const r=document.createElement('div');r.className='feed-row';
    r.innerHTML=`${fieldLabel('Time',`<input data-k="time" value="${esc(feed.time)}">`)}${fieldLabel('Prescribed mL',`<input data-k="prescribed" type="number" step="1" value="${esc(feed.prescribed)}">`)}${fieldLabel('Actual mL',`<input data-k="actual" type="number" step="1" value="${esc(feed.actual)}">`)}${fieldLabel('% consumed',`<input value="${feed.prescribed?round(num(feed.actual)/num(feed.prescribed)*100,1):0}%" disabled>`)}${fieldLabel('Note',`<input data-k="note" value="${esc(feed.note)}">`)}<button class="small-btn danger">Delete</button>`;
    r.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('change',()=>{feed[inp.dataset.k]=inp.value;saveState();renderModular();}));
    r.querySelector('button').addEventListener('click',()=>{state.modular.feeds=state.modular.feeds.filter(x=>x.id!==feed.id);saveState();renderModular();});f.appendChild(r);
  });
  renderModularSummary();
}
['modName','modFinalVolume','modNotes'].forEach(id=>$(id).addEventListener('change',()=>{state.modular[id==='modName'?'name':id==='modFinalVolume'?'finalVolume':'notes']=$(id).value;saveState();renderModularSummary();}));
$('addModComponentBtn').addEventListener('click',()=>{state.modular.components.push(modComponentBlank());saveState();renderModular();});
$('addFeedBtn').addEventListener('click',()=>{state.modular.feeds.push(feedBlank());saveState();renderModular();});
$('saveModularBtn').addEventListener('click',()=>{saveState();renderModularSummary();});

function modularTotals(){return state.modular.components.reduce((a,c)=>{['kcal','protein','fat','cho'].forEach(k=>a[k]+=num(c[k]));return a;},{kcal:0,protein:0,fat:0,cho:0});}
function renderModularSummary(){
  const t=modularTotals(),vol=num(state.modular.finalVolume); const per100=vol?Object.fromEntries(Object.entries(t).map(([k,v])=>[k,v/vol*100])):{};
  $('modRecipeSummary').innerHTML=`<strong>Recipe total</strong><div class="summary-grid"><div class="metric">Energy<b>${round(t.kcal)} kcal</b></div><div class="metric">Protein<b>${round(t.protein)} g</b></div><div class="metric">Fat<b>${round(t.fat)} g</b></div><div class="metric">CHO<b>${round(t.cho)} g</b></div></div>${vol?`<p class="muted">Concentration: ${round(t.kcal/vol,3)} kcal/mL • per 100 mL: ${round(per100.kcal)} kcal, P ${round(per100.protein)} g, F ${round(per100.fat)} g, CHO ${round(per100.cho)} g</p>`:'<p class="muted">ระบุ final volume เพื่อคำนวณ concentration</p>'}`;
  const prescribed=state.modular.feeds.reduce((s,x)=>s+num(x.prescribed),0), actual=state.modular.feeds.reduce((s,x)=>s+num(x.actual),0),ratio=vol?actual/vol:0,pratio=vol?prescribed/vol:0;
  $('feedSummary').innerHTML=`<strong>Daily feeding</strong><div class="summary-grid"><div class="metric">Prescribed<b>${round(prescribed)} mL</b></div><div class="metric">Actual<b>${round(actual)} mL</b></div><div class="metric">Actual / prescribed<b>${prescribed?round(actual/prescribed*100,1):0}%</b></div><div class="metric">Actual energy<b>${round(t.kcal*ratio)} kcal</b></div></div><p class="muted">Actual nutrients: P ${round(t.protein*ratio)} g • F ${round(t.fat*ratio)} g • CHO ${round(t.cho*ratio)} g. Prescribed energy ${round(t.kcal*pratio)} kcal.</p>`;
}

function matchFood(name){
  const q=String(name||'').trim().toLowerCase(); if(!q)return null;
  return state.foodDB.find(f=>String(f.name).trim().toLowerCase()===q) || state.foodDB.find(f=>String(f.name).toLowerCase().includes(q)||q.includes(String(f.name).toLowerCase()));
}
function qtyFor(item,food){
  const basisUnit=String(food.basis_unit||'').toLowerCase();
  if(item.weight_g && basisUnit==='g') return num(item.weight_g)/num(food.basis_value||1);
  if(item.volume_ml && basisUnit==='ml') return num(item.volume_ml)/num(food.basis_value||1);
  if(String(item.unit||'').toLowerCase()===basisUnit && item.amount!=='') return num(item.amount)/num(food.basis_value||1);
  return null;
}
const nutrientKeys=['kcal','protein','fat','cho','sodium','potassium','calcium','phosphorus','iron','zinc','vitA','vitD','vitE'];
function addNutrients(total,food,factor){nutrientKeys.forEach(k=>total[k]+=num(food[k])*factor);}
function calculateIntake(){
  const total=Object.fromEntries(nutrientKeys.map(k=>[k,0]));const unmatched=[];
  state.meals.forEach(m=>{
    const parts=m.ingredients?.length?m.ingredients:[m];
    parts.forEach(p=>{const f=matchFood(p.food);if(!f){unmatched.push({time:m.time,food:p.food,reason:'No DB match'});return;} const factor=qtyFor(p,f);if(factor===null){unmatched.push({time:m.time,food:p.food,reason:`Need ${f.basis_unit} amount/weight`});return;}addNutrients(total,f,factor);});
  });
  state.lastSummary={total,unmatched,at:new Date().toISOString()};saveState();return state.lastSummary;
}
function renderSummary(){
  const s=state.lastSummary||calculateIntake(),t=s.total; const macroKcal=num(t.protein)*4+num(t.cho)*4+num(t.fat)*9;
  $('nutrientSummary').innerHTML=`<div class="summary-grid"><div class="metric">Energy<b>${round(t.kcal)} kcal</b></div><div class="metric">Protein<b>${round(t.protein)} g</b><span>${macroKcal?round(t.protein*4/macroKcal*100,1):0}% kcal</span></div><div class="metric">Fat<b>${round(t.fat)} g</b><span>${macroKcal?round(t.fat*9/macroKcal*100,1):0}% kcal</span></div><div class="metric">CHO<b>${round(t.cho)} g</b><span>${macroKcal?round(t.cho*4/macroKcal*100,1):0}% kcal</span></div></div><div class="summary-grid top-gap"><div class="metric">Na<b>${round(t.sodium)} mg</b></div><div class="metric">K<b>${round(t.potassium)} mg</b></div><div class="metric">Ca<b>${round(t.calcium)} mg</b></div><div class="metric">P<b>${round(t.phosphorus)} mg</b></div><div class="metric">Iron<b>${round(t.iron)} mg</b></div><div class="metric">Zinc<b>${round(t.zinc)} mg</b></div><div class="metric">Vit A<b>${round(t.vitA)} µg</b></div><div class="metric">Vit D<b>${round(t.vitD)} µg</b></div><div class="metric">Vit E<b>${round(t.vitE)} mg</b></div></div>`;
  $('unmatchedList').innerHTML=s.unmatched.length?`<div class="unmatched"><strong>Needs food matching / portion conversion (${s.unmatched.length})</strong>${s.unmatched.map(x=>`<div>${esc(x.time)} — ${esc(x.food||'(blank)')}: ${esc(x.reason)}</div>`).join('')}</div>`:'<div class="status ok">รายการทั้งหมดที่มีข้อมูลเพียงพอถูกคำนวณแล้ว</div>';
}
$('calculateBtn').addEventListener('click',()=>{calculateIntake();renderSummary();});

$('exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`ped-nutrition-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);});
$('importBackupInput').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{state=JSON.parse(await file.text());saveState();renderMeals();renderFoodDB();renderModular();alert('Restore สำเร็จ');}catch(err){alert('ไฟล์ backup ไม่ถูกต้อง');}});
$('resetBtn').addEventListener('click',()=>{if(confirm('ล้างข้อมูลใน browser เครื่องนี้ทั้งหมด?')){state=clone(defaultState);saveState();location.reload();}});

renderMeals(); renderFoodDB(); renderModular();
