// ===================== STATE =====================
const STEPS = [
  {id:'personal', label:'Personal Info', icon:'fas fa-user'},
  {id:'summary', label:'Summary', icon:'fas fa-align-left'},
  {id:'education', label:'Education', icon:'fas fa-graduation-cap'},
  {id:'experience', label:'Experience', icon:'fas fa-briefcase'},
  {id:'skills', label:'Skills', icon:'fas fa-code'},
  {id:'projects', label:'Projects', icon:'fas fa-rocket'},
  {id:'certifications', label:'Certifications', icon:'fas fa-certificate'},
  {id:'template', label:'Choose Template', icon:'fas fa-palette'},
];

let currentStep = 0;
let selectedTemplate = 'nexus';

const defaultData = () => ({
  personal: {fullName:'', jobTitle:'', email:'', phone:'', location:'', linkedin:'', github:'', website:''},
  summary: '',
  education: [{id:1, degree:'', institution:'', year:'', gpa:'', desc:''}],
  experience: [{id:1, title:'', company:'', duration:'', location:'', desc:''}],
  skills: {technical:[], soft:[], tools:[], languages:[]},
  projects: [{id:1, name:'', tech:'', link:'', github:'', desc:''}],
  certifications: [{id:1, name:'', issuer:'', date:''}],
  achievements: '',
});

let formData = loadData();

function loadData() {
  try { return JSON.parse(localStorage.getItem('resumeai_data')) || defaultData(); } catch { return defaultData(); }
}
function saveData() {
  localStorage.setItem('resumeai_data', JSON.stringify(formData));
  localStorage.setItem('resumeai_template', selectedTemplate);
}

// ===================== NAVIGATION =====================
function navigateTo(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + view);
  if (el) el.classList.add('active');
  window.scrollTo(0,0);
  ['preview','portfolio'].forEach(v => {
    const show = ['preview','portfolio'].includes(view) || view === v;
    ['nl-','mnl-'].forEach(p => {
      const lk = document.getElementById(p+v);
      if (lk) lk.style.display = (view==='preview'||view==='portfolio') ? '' : 'none';
    });
  });
  if (view === 'builder') { buildStepsNav(); renderCurrentStep(); }
  if (view === 'preview') { syncFormDataFromDOM(); renderResume(selectedTemplate); }
  if (view === 'portfolio') { syncFormDataFromDOM(); renderPortfolio(); }
  updateNavLinks(view);
}

function updateNavLinks(view) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-link'));
  const map = {landing:'nl-home', builder:'nl-builder', preview:'nl-preview', portfolio:'nl-portfolio'};
  if (map[view]) { const el=document.getElementById(map[view]); if(el) el.classList.add('active-link'); }
  if (view==='preview'||view==='portfolio') {
    ['nl-preview','nl-portfolio','mnl-preview','mnl-portfolio'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='';});
  }
}

function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
}

// ===================== BUILDER STEPS NAV =====================
function buildStepsNav() {
  const nav = document.getElementById('steps-nav');
  nav.innerHTML = STEPS.map((s,i) => `
    <div class="step-nav-item ${i===currentStep?'active':i<currentStep?'done':''}" onclick="goToStep(${i})">
      <span class="step-nav-num">${i<currentStep?'<i class="fas fa-check" style="font-size:.6rem"></i>':(i+1)}</span>
      <span>${s.label}</span>
    </div>`).join('');
}

function updateProgress() {
  const pct = ((currentStep) / (STEPS.length-1)) * 100;
  const fill = document.getElementById('builder-progress-fill');
  if (fill) fill.style.width = pct + '%';
  const ctr = document.getElementById('step-counter');
  if (ctr) ctr.textContent = `Step ${currentStep+1} of ${STEPS.length}`;
  const prev = document.getElementById('prev-btn');
  const next = document.getElementById('next-btn');
  if (prev) prev.style.opacity = currentStep===0?'.3':'1';
  if (prev) prev.disabled = currentStep===0;
  if (next) next.innerHTML = currentStep===STEPS.length-1
    ? '<i class="fas fa-eye"></i> Preview Resume'
    : 'Next <i class="fas fa-arrow-right"></i>';
}

function goToStep(i) {
  syncFormDataFromDOM();
  saveData();
  currentStep = i;
  buildStepsNav();
  renderCurrentStep();
  updateProgress();
  document.querySelector('.form-steps-container').scrollTop = 0;
}

function nextStep() {
  syncFormDataFromDOM();
  saveData();
  if (currentStep >= STEPS.length-1) { navigateTo('preview'); return; }
  currentStep++;
  buildStepsNav();
  renderCurrentStep();
  updateProgress();
  document.querySelector('.form-steps-container').scrollTop = 0;
}

function prevStep() {
  if (currentStep <= 0) return;
  syncFormDataFromDOM();
  saveData();
  currentStep--;
  buildStepsNav();
  renderCurrentStep();
  updateProgress();
}

function renderCurrentStep() {
  const container = document.getElementById('form-steps-container');
  const s = STEPS[currentStep];
  container.innerHTML = `<div class="form-step active">${getStepHTML(s.id)}</div>`;
  updateProgress();
  attachStepListeners();
}

// ===================== FORM STEPS HTML =====================
function getStepHTML(id) {
  switch(id) {
    case 'personal': return stepPersonal();
    case 'summary': return stepSummary();
    case 'education': return stepEducation();
    case 'experience': return stepExperience();
    case 'skills': return stepSkills();
    case 'projects': return stepProjects();
    case 'certifications': return stepCertifications();
    case 'template': return stepTemplate();
    default: return '';
  }
}

const fv = (k, sub) => sub !== undefined ? (formData[k]?.[sub] ?? '') : (formData[k] ?? '');
const fi = (id, placeholder, val, type='text') =>
  `<input type="${type}" id="${id}" placeholder="${placeholder}" value="${escHtml(String(val||''))}">`;
const fl = (text, id, opt='') => `<label class="form-label" for="${id}">${text}${opt?` <span class="optional">(optional)</span>`:''}</label>`;
const fg = (lbl, id, ph, val, full=false, opt=false) =>
  `<div class="form-group${full?' full':''}"><${fl(lbl,id,opt)}${fi(id,ph,val)}</div>`;

function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function stepPersonal() {
  const p = formData.personal;
  return `<div class="step-heading"><h2>Personal Information</h2><p>Let's start with the basics. Fill in your contact details.</p></div>
  <div class="form-grid">
    ${fg('Full Name','fullName','e.g. Jane Smith',p.fullName)}
    ${fg('Job Title / Role','jobTitle','e.g. Software Engineer',p.jobTitle)}
    ${fg('Email Address','email','you@example.com',p.email)}
    ${fg('Phone Number','phone','+1 (555) 000-0000',p.phone)}
    ${fg('Location','location','City, State, Country',p.location)}
    ${fg('LinkedIn URL','linkedin','linkedin.com/in/yourname',p.linkedin,false,true)}
    ${fg('GitHub URL','github','github.com/yourusername',p.github,false,true)}
    ${fg('Website / Portfolio','website','yourwebsite.com',p.website,false,true)}
  </div>`;
}

function stepSummary() {
  return `<div class="step-heading"><h2>Professional Summary</h2><p>Write 2-4 sentences highlighting your experience, skills, and career goals.</p></div>
  <div class="form-group full">
    <label class="form-label">Summary</label>
    <textarea id="summary" rows="6" placeholder="e.g. Results-driven Software Engineer with 5+ years of experience building scalable web applications...">${escHtml(formData.summary||'')}</textarea>
  </div>
  <div style="margin-top:.75rem;display:flex;gap:.5rem;flex-wrap:wrap">
    <button class="btn btn-ghost btn-sm" onclick="fillSummaryExample()"><i class="fas fa-magic"></i> Use AI Example</button>
  </div>`;
}

function stepEducation() {
  const entries = formData.education.length ? formData.education : defaultData().education;
  return `<div class="step-heading"><h2>Education</h2><p>Add your academic qualifications.</p></div>
  <div id="edu-list">${entries.map((e,i)=>eduEntry(e,i)).join('')}</div>
  <button class="btn-add-entry" onclick="addEntry('edu')"><i class="fas fa-plus"></i> Add Education</button>`;
}

function eduEntry(e,i) {
  return `<div class="dynamic-entry" data-edu-idx="${i}">
    <div class="dynamic-entry-header">
      <span class="dynamic-entry-title"><i class="fas fa-graduation-cap"></i> Education ${i+1}</span>
      ${i>0?`<button class="btn-remove" onclick="removeEntry('edu',${i})"><i class="fas fa-trash"></i></button>`:''}
    </div>
    <div class="form-grid">
      <div class="form-group">${fl('Degree / Qualification','edu_degree_'+i)}<input id="edu_degree_${i}" placeholder="e.g. B.Sc. Computer Science" value="${escHtml(e.degree||'')}"></div>
      <div class="form-group">${fl('Institution','edu_institution_'+i)}<input id="edu_institution_${i}" placeholder="e.g. MIT" value="${escHtml(e.institution||'')}"></div>
      <div class="form-group">${fl('Year / Duration','edu_year_'+i)}<input id="edu_year_${i}" placeholder="e.g. 2019 – 2023" value="${escHtml(e.year||'')}"></div>
      <div class="form-group">${fl('GPA / Grade','edu_gpa_'+i,true)}<input id="edu_gpa_${i}" placeholder="e.g. 3.8/4.0" value="${escHtml(e.gpa||'')}"></div>
      <div class="form-group full">${fl('Notable Achievements','edu_desc_'+i,true)}<textarea id="edu_desc_${i}" rows="2" placeholder="Awards, honors, relevant coursework...">${escHtml(e.desc||'')}</textarea></div>
    </div>
  </div>`;
}

function stepExperience() {
  const entries = formData.experience.length ? formData.experience : defaultData().experience;
  return `<div class="step-heading"><h2>Work Experience</h2><p>Add your work history, starting with the most recent.</p></div>
  <div id="exp-list">${entries.map((e,i)=>expEntry(e,i)).join('')}</div>
  <button class="btn-add-entry" onclick="addEntry('exp')"><i class="fas fa-plus"></i> Add Experience</button>`;
}

function expEntry(e,i) {
  return `<div class="dynamic-entry" data-exp-idx="${i}">
    <div class="dynamic-entry-header">
      <span class="dynamic-entry-title"><i class="fas fa-briefcase"></i> Experience ${i+1}</span>
      ${i>0?`<button class="btn-remove" onclick="removeEntry('exp',${i})"><i class="fas fa-trash"></i></button>`:''}
    </div>
    <div class="form-grid">
      <div class="form-group">${fl('Job Title','exp_title_'+i)}<input id="exp_title_${i}" placeholder="e.g. Senior Developer" value="${escHtml(e.title||'')}"></div>
      <div class="form-group">${fl('Company','exp_company_'+i)}<input id="exp_company_${i}" placeholder="e.g. Google" value="${escHtml(e.company||'')}"></div>
      <div class="form-group">${fl('Duration','exp_duration_'+i)}<input id="exp_duration_${i}" placeholder="e.g. Jan 2021 – Present" value="${escHtml(e.duration||'')}"></div>
      <div class="form-group">${fl('Location','exp_location_'+i,true)}<input id="exp_location_${i}" placeholder="e.g. New York, NY" value="${escHtml(e.location||'')}"></div>
      <div class="form-group full">${fl('Responsibilities & Achievements','exp_desc_'+i)}<textarea id="exp_desc_${i}" rows="4" placeholder="• Led team of 6 engineers to deliver product ahead of schedule&#10;• Increased app performance by 40% through optimization">${escHtml(e.desc||'')}</textarea></div>
    </div>
  </div>`;
}

function stepSkills() {
  const s = formData.skills;
  return `<div class="step-heading"><h2>Skills</h2><p>Add your skills by category. Press Enter or click Add.</p></div>
  <div class="skills-container">
    ${skillBox('Technical Skills','technical','e.g. JavaScript, Python, React',s.technical,'technical')}
    ${skillBox('Soft Skills','soft','e.g. Leadership, Communication',s.soft,'soft')}
    ${skillBox('Tools & Platforms','tools','e.g. Docker, AWS, Figma',s.tools,'tools')}
    ${skillBox('Languages','languages','e.g. English (Fluent), Spanish (B2)',s.languages,'languages')}
  </div>`;
}

function skillBox(title, id, ph, tags, cls) {
  return `<div class="skill-category">
    <div class="skill-category-title"><i class="fas fa-tag"></i> ${title}</div>
    <div class="tags-display" id="tags_${id}">${(tags||[]).map(t=>skillTag(t,id,cls)).join('')}</div>
    <div class="tag-input-row">
      <input id="skill_input_${id}" placeholder="${ph}" onkeydown="if(event.key==='Enter'){event.preventDefault();addSkillTag('${id}','${cls}')}">
      <button class="btn btn-primary btn-sm" onclick="addSkillTag('${id}','${cls}')"><i class="fas fa-plus"></i> Add</button>
    </div>
  </div>`;
}

function skillTag(text, cat, cls) {
  return `<span class="skill-tag ${cls}">${escHtml(text)}<span class="skill-tag-remove" onclick="removeSkillTag('${cat}','${escHtml(text)}')">&nbsp;✕</span></span>`;
}

function addSkillTag(cat, cls) {
  const inp = document.getElementById('skill_input_' + cat);
  const val = inp.value.trim();
  if (!val) return;
  if (!formData.skills[cat]) formData.skills[cat] = [];
  if (!formData.skills[cat].includes(val)) {
    formData.skills[cat].push(val);
    document.getElementById('tags_' + cat).insertAdjacentHTML('beforeend', skillTag(val, cat, cls));
  }
  inp.value = '';
  inp.focus();
  saveData();
}

function removeSkillTag(cat, val) {
  formData.skills[cat] = (formData.skills[cat] || []).filter(t => t !== val);
  const box = document.getElementById('tags_' + cat);
  if (box) box.querySelectorAll('.skill-tag').forEach(el => { if (el.textContent.replace('✕','').trim() === val) el.remove(); });
  saveData();
}

function stepProjects() {
  const entries = formData.projects.length ? formData.projects : defaultData().projects;
  return `<div class="step-heading"><h2>Projects</h2><p>Showcase your best work and personal projects.</p></div>
  <div id="proj-list">${entries.map((e,i)=>projEntry(e,i)).join('')}</div>
  <button class="btn-add-entry" onclick="addEntry('proj')"><i class="fas fa-plus"></i> Add Project</button>`;
}

function projEntry(e,i) {
  return `<div class="dynamic-entry" data-proj-idx="${i}">
    <div class="dynamic-entry-header">
      <span class="dynamic-entry-title"><i class="fas fa-rocket"></i> Project ${i+1}</span>
      ${i>0?`<button class="btn-remove" onclick="removeEntry('proj',${i})"><i class="fas fa-trash"></i></button>`:''}
    </div>
    <div class="form-grid">
      <div class="form-group">${fl('Project Name','proj_name_'+i)}<input id="proj_name_${i}" placeholder="e.g. E-commerce Platform" value="${escHtml(e.name||'')}"></div>
      <div class="form-group">${fl('Technologies Used','proj_tech_'+i)}<input id="proj_tech_${i}" placeholder="e.g. React, Node.js, MongoDB" value="${escHtml(e.tech||'')}"></div>
      <div class="form-group">${fl('Live URL','proj_link_'+i,true)}<input id="proj_link_${i}" placeholder="https://myproject.com" value="${escHtml(e.link||'')}"></div>
      <div class="form-group">${fl('GitHub URL','proj_github_'+i,true)}<input id="proj_github_${i}" placeholder="https://github.com/..." value="${escHtml(e.github||'')}"></div>
      <div class="form-group full">${fl('Description','proj_desc_'+i)}<textarea id="proj_desc_${i}" rows="3" placeholder="What does it do? What problems does it solve?">${escHtml(e.desc||'')}</textarea></div>
    </div>
  </div>`;
}

function stepCertifications() {
  const entries = formData.certifications.length ? formData.certifications : defaultData().certifications;
  return `<div class="step-heading"><h2>Certifications & Achievements</h2><p>Add certifications, awards, or notable accomplishments.</p></div>
  <div id="cert-list">${entries.map((e,i)=>certEntry(e,i)).join('')}</div>
  <button class="btn-add-entry" onclick="addEntry('cert')"><i class="fas fa-plus"></i> Add Certification</button>
  <div style="margin-top:1.5rem">
    <div class="form-group">
      <label class="form-label">Additional Achievements <span class="optional">(optional)</span></label>
      <textarea id="achievements" rows="3" placeholder="e.g. Speaker at DevConf 2024, Open Source contributor with 500+ GitHub stars...">${escHtml(formData.achievements||'')}</textarea>
    </div>
  </div>`;
}

function certEntry(e,i) {
  return `<div class="dynamic-entry" data-cert-idx="${i}">
    <div class="dynamic-entry-header">
      <span class="dynamic-entry-title"><i class="fas fa-certificate"></i> Certification ${i+1}</span>
      ${i>0?`<button class="btn-remove" onclick="removeEntry('cert',${i})"><i class="fas fa-trash"></i></button>`:''}
    </div>
    <div class="form-grid three">
      <div class="form-group">${fl('Certification Name','cert_name_'+i)}<input id="cert_name_${i}" placeholder="e.g. AWS Solutions Architect" value="${escHtml(e.name||'')}"></div>
      <div class="form-group">${fl('Issuing Organization','cert_issuer_'+i)}<input id="cert_issuer_${i}" placeholder="e.g. Amazon Web Services" value="${escHtml(e.issuer||'')}"></div>
      <div class="form-group">${fl('Date','cert_date_'+i)}<input id="cert_date_${i}" placeholder="e.g. March 2024" value="${escHtml(e.date||'')}"></div>
    </div>
  </div>`;
}

function stepTemplate() {
  const opts = [
    {id:'nexus', name:'Nexus', desc:'Modern dark sidebar', color:'linear-gradient(135deg,#1e3a5f,#3B82F6)', icon:'🌑'},
    {id:'aurora', name:'Aurora', desc:'Clean gradient header', color:'linear-gradient(135deg,#6366F1,#06B6D4)', icon:'🌊'},
    {id:'slate', name:'Slate', desc:'Classic professional', color:'linear-gradient(135deg,#374151,#6B7280)', icon:'📄'},
    {id:'prism', name:'Prism', desc:'Bold creative accent', color:'linear-gradient(135deg,#8B5CF6,#EC4899)', icon:'🎨'},
  ];
  return `<div class="step-heading"><h2>Choose Your Template</h2><p>Select the resume design that best represents you.</p></div>
  <div class="template-selector">
    ${opts.map(t=>`<div class="tpl-option ${selectedTemplate===t.id?'selected':''}" onclick="selectTemplate('${t.id}')">
      <div class="tpl-color-swatch" style="background:${t.color}"></div>
      <div class="tpl-name">${t.icon} ${t.name}</div>
      <div class="tpl-desc">${t.desc}</div>
    </div>`).join('')}
  </div>
  <div style="margin-top:2rem;text-align:center">
    <button class="btn btn-primary btn-xl" onclick="navigateTo('preview')">
      <i class="fas fa-eye"></i> Preview My Resume
    </button>
  </div>`;
}

function selectTemplate(id) {
  selectedTemplate = id;
  document.querySelectorAll('.tpl-option').forEach(el => {
    el.classList.toggle('selected', el.onclick.toString().includes(`'${id}'`));
  });
  saveData();
}

// ===================== DYNAMIC ENTRIES =====================
function addEntry(type) {
  syncFormDataFromDOM();
  if (type === 'edu') {
    formData.education.push({id: Date.now(), degree:'', institution:'', year:'', gpa:'', desc:''});
    document.getElementById('edu-list').innerHTML = formData.education.map((e,i)=>eduEntry(e,i)).join('');
  } else if (type === 'exp') {
    formData.experience.push({id: Date.now(), title:'', company:'', duration:'', location:'', desc:''});
    document.getElementById('exp-list').innerHTML = formData.experience.map((e,i)=>expEntry(e,i)).join('');
  } else if (type === 'proj') {
    formData.projects.push({id: Date.now(), name:'', tech:'', link:'', github:'', desc:''});
    document.getElementById('proj-list').innerHTML = formData.projects.map((e,i)=>projEntry(e,i)).join('');
  } else if (type === 'cert') {
    formData.certifications.push({id: Date.now(), name:'', issuer:'', date:''});
    document.getElementById('cert-list').innerHTML = formData.certifications.map((e,i)=>certEntry(e,i)).join('');
  }
}

function removeEntry(type, idx) {
  syncFormDataFromDOM();
  if (type==='edu' && formData.education.length > 1) {
    formData.education.splice(idx,1);
    document.getElementById('edu-list').innerHTML = formData.education.map((e,i)=>eduEntry(e,i)).join('');
  } else if (type==='exp' && formData.experience.length > 1) {
    formData.experience.splice(idx,1);
    document.getElementById('exp-list').innerHTML = formData.experience.map((e,i)=>expEntry(e,i)).join('');
  } else if (type==='proj' && formData.projects.length > 1) {
    formData.projects.splice(idx,1);
    document.getElementById('proj-list').innerHTML = formData.projects.map((e,i)=>projEntry(e,i)).join('');
  } else if (type==='cert' && formData.certifications.length > 1) {
    formData.certifications.splice(idx,1);
    document.getElementById('cert-list').innerHTML = formData.certifications.map((e,i)=>certEntry(e,i)).join('');
  }
}

// ===================== SYNC DOM → formData =====================
function syncFormDataFromDOM() {
  // Personal
  ['fullName','email','phone','jobTitle','location','linkedin','github','website'].forEach(f => {
    const el = document.getElementById(f); if(el) formData.personal[f] = el.value;
  });
  // Summary
  const sum = document.getElementById('summary'); if(sum) formData.summary = sum.value;
  // Achievements
  const ach = document.getElementById('achievements'); if(ach) formData.achievements = ach.value;
  // Education
  formData.education.forEach((e,i) => {
    ['degree','institution','year','gpa','desc'].forEach(f => {
      const el = document.getElementById(`edu_${f}_${i}`); if(el) e[f] = el.value;
    });
  });
  // Experience
  formData.experience.forEach((e,i) => {
    ['title','company','duration','location','desc'].forEach(f => {
      const el = document.getElementById(`exp_${f}_${i}`); if(el) e[f] = el.value;
    });
  });
  // Projects
  formData.projects.forEach((e,i) => {
    ['name','tech','link','github','desc'].forEach(f => {
      const el = document.getElementById(`proj_${f}_${i}`); if(el) e[f] = el.value;
    });
  });
  // Certifications
  formData.certifications.forEach((e,i) => {
    ['name','issuer','date'].forEach(f => {
      const el = document.getElementById(`cert_${f}_${i}`); if(el) e[f] = el.value;
    });
  });
}

function attachStepListeners() { /* inputs auto-update on sync */ }

function fillSummaryExample() {
  const role = formData.personal.jobTitle || 'Professional';
  const examples = [
    `Results-driven ${role} with 5+ years of experience designing and delivering high-impact solutions. Adept at collaborating with cross-functional teams and driving innovation. Passionate about leveraging technology to solve complex business challenges and create exceptional user experiences.`,
    `Dynamic ${role} with a proven track record of leading projects from conception to completion. Skilled at translating complex requirements into elegant, scalable solutions. Committed to continuous learning and staying ahead of industry trends.`,
    `Creative and detail-oriented ${role} with expertise in full-stack development and cloud architecture. Experienced in Agile methodologies and delivering products that exceed client expectations. Seeking to contribute technical expertise to a forward-thinking organization.`,
  ];
  const el = document.getElementById('summary');
  if (el) { el.value = examples[Math.floor(Math.random()*examples.length)]; formData.summary = el.value; }
  showToast('AI example summary applied!', 'success');
}

// ===================== CLEAR DATA =====================
function confirmClear() { document.getElementById('confirm-modal').classList.add('open'); }
function hideConfirmModal() { document.getElementById('confirm-modal').classList.remove('open'); }
function handleConfirmOverlayClick(e) { if(e.target===e.currentTarget) hideConfirmModal(); }
function clearAllData() {
  localStorage.removeItem('resumeai_data');
  localStorage.removeItem('resumeai_template');
  formData = defaultData();
  selectedTemplate = 'nexus';
  currentStep = 0;
  hideConfirmModal();
  buildStepsNav();
  renderCurrentStep();
  showToast('All data cleared', 'info');
}
