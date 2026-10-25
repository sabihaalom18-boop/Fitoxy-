const pages = [...document.querySelectorAll('.page')];
const navItems = [...document.querySelectorAll('.nav-item')];
const crumb = document.getElementById('pageCrumb');
const pageNames = {overview:'Overview',scanner:'Food scanner',fitgo:'Fit Go',progress:'Progress',coach:'AI Coach'};
function showPage(name){
  pages.forEach(p=>p.classList.toggle('active',p.id===`page-${name}`));
  navItems.forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  crumb.textContent=pageNames[name]||'Overview';
  document.getElementById('sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
navItems.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
document.querySelectorAll('[data-page-link]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.pageLink)));
const dateEl=document.getElementById('todayDate');
dateEl.textContent=new Intl.DateTimeFormat(undefined,{weekday:'short',month:'short',day:'numeric'}).format(new Date());
document.getElementById('mobileMenu').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
const toastEl=document.getElementById('toast');let toastTimer;
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2800)}
function toggleTheme(){document.body.classList.toggle('light');const name=document.body.classList.contains('light')?'Premium light':'Premium dark';document.getElementById('appearanceName').textContent=name;localStorage.setItem('fitoxy-theme',document.body.classList.contains('light')?'light':'dark')}
if(localStorage.getItem('fitoxy-theme')==='light')document.body.classList.add('light');
document.getElementById('themeToggle').addEventListener('click',toggleTheme);
document.getElementById('brightnessToggle').addEventListener('click',toggleTheme);
document.getElementById('appearanceName').textContent=document.body.classList.contains('light')?'Premium light':'Premium dark';
const fileInput=document.getElementById('foodFile'), preview=document.getElementById('foodPreview'), uploadZone=document.getElementById('uploadZone');
fileInput.addEventListener('change',()=>{const f=fileInput.files[0];if(!f)return;if(!f.type.startsWith('image/')){toast('Please choose an image file.');return}preview.src=URL.createObjectURL(f);preview.hidden=false;uploadZone.querySelector('h3').textContent=f.name;uploadZone.querySelector('p').textContent='Image selected — ready for demo preview';});
uploadZone.addEventListener('dragover',e=>{e.preventDefault();uploadZone.style.borderColor='var(--purple)'});
uploadZone.addEventListener('dragleave',()=>uploadZone.style.borderColor='');
uploadZone.addEventListener('drop',e=>{e.preventDefault();uploadZone.style.borderColor='';const f=e.dataTransfer.files[0];if(!f||!f.type.startsWith('image/')){toast('Please drop a food image.');return}const dt=new DataTransfer();dt.items.add(f);fileInput.files=dt.files;fileInput.dispatchEvent(new Event('change'))});
document.getElementById('scanButton').addEventListener('click',()=>{if(!fileInput.files.length){toast('Choose a food photo first to preview the demo.');return}document.getElementById('resultTitle').textContent='Demo estimate preview';document.getElementById('resultDescription').textContent='Your photo is selected. These sample nutrition numbers are not generated from your image; live AI analysis still needs to be connected.';toast('Demo preview ready — no real AI analysis was performed.')});
const routines={
 'Warm-up basics':['Move gently in place for 60 seconds if comfortable.','Roll shoulders slowly in both directions.','Make easy ankle circles while seated or standing securely.','Pause and breathe normally. Stop if uncomfortable.'],
 'Stretch break':['Relax shoulders away from ears.','Gently stretch one side at a time without bouncing.','Keep each movement comfortable; do not force your range.','Stop if you feel pain or dizziness.'],
 'Walking break':['Choose a safe, comfortable route.','Start at an easy pace that lets you talk comfortably.','Take breaks whenever you need them.','Skip outdoor walking if conditions are unsafe.']
};
function openRoutine(name){document.getElementById('routineTitle').textContent=name;const ol=document.getElementById('routineSteps');ol.innerHTML='';(routines[name]||[]).forEach(s=>{const li=document.createElement('li');li.textContent=s;ol.appendChild(li)});const box=document.getElementById('routineDetail');box.hidden=false;box.scrollIntoView({behavior:'smooth',block:'nearest'})}
document.querySelectorAll('[data-routine]').forEach(b=>b.addEventListener('click',()=>openRoutine(b.dataset.routine)));
document.getElementById('startRoutine').addEventListener('click',()=>openRoutine('Warm-up basics'));
document.getElementById('closeRoutine').addEventListener('click',()=>document.getElementById('routineDetail').hidden=true);
const canned={
 'Suggest a gentle warm-up':'Try a few comfortable shoulder rolls, ankle circles and easy marching in place. Keep the intensity low, and stop if you feel pain, dizziness or unusual breathlessness.',
 'Explain food estimates':'Food-photo estimates can be off because portions, ingredients and cooking oils are hard to identify from a picture. Treat results as a rough guide, not an exact measurement.',
 'Build a balanced routine':'A balanced routine can include comfortable movement, regular meals, water, rest and sleep. Start with small steps that fit your day; you do not need to push through discomfort.'
};
function addMessage(text,who){const d=document.createElement('div');d.className='message '+(who==='user'?'user-message':'bot-message');d.textContent=text;document.getElementById('chatMessages').appendChild(d);d.scrollIntoView({behavior:'smooth',block:'nearest'})}
document.querySelectorAll('.suggestions button').forEach(b=>b.addEventListener('click',()=>{const q=b.textContent;addMessage(q,'user');setTimeout(()=>addMessage(canned[q]||'This is a demo reply. Live AI will be connected in a later version.','bot'),250)}));
document.getElementById('chatForm').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('chatInput');const q=input.value.trim();if(!q)return;addMessage(q,'user');input.value='';setTimeout(()=>addMessage('Thanks for asking. This starter version is not connected to a live AI model yet. In the real Fitoxy AI app, this is where a carefully configured AI Coach will answer.','bot'),350)});
