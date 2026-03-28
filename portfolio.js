
// ===================== PORTFOLIO =====================
function renderPortfolio() {
  const d = formData;
  const p = d.personal;
  const name = p.fullName || 'My Portfolio';
  document.getElementById('pf-nav-brand').textContent = name;
  document.getElementById('portfolio-content').innerHTML = portfolioHTML(d);
}

function portfolioHTML(d) {
  const p = d.personal;
  return `
  <section id="pf-about" style="min-height:100vh;background:linear-gradient(135deg,#050810 60%,#0f172a);display:flex;align-items:center;padding:80px 0;position:relative;overflow:hidden">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 60% 50%,rgba(139,92,246,.12),transparent),radial-gradient(ellipse 50% 50% at 20% 70%,rgba(59,130,246,.1),transparent)"></div>
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem;position:relative;z-index:1">
      <div style="display:inline-flex;align-items:center;gap:.6rem;background:rgba(139,92,246,.1);border:1px solid rgba(139,92,246,.25);border-radius:99px;padding:.35rem 1rem;font-size:.78rem;color:#a78bfa;font-weight:600;margin-bottom:1.5rem">
        <span style="width:7px;height:7px;border-radius:50%;background:#a78bfa;display:inline-block"></span>
        Available for opportunities
      </div>
      <h1 style="font-family:'Inter',sans-serif;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;color:#fff;line-height:1.08;margin-bottom:1rem;letter-spacing:-.03em">
        Hi, I'm <span style="background:linear-gradient(135deg,#8B5CF6,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${escHtml(p.fullName||'Your Name')}</span>
      </h1>
      <div style="font-size:1.3rem;color:#a78bfa;font-weight:600;margin-bottom:1.25rem">${escHtml(p.jobTitle||'Professional')}</div>
      <p style="font-size:1.05rem;color:rgba(255,255,255,.65);max-width:580px;line-height:1.75;margin-bottom:2rem">${escHtml(d.summary||'Passionate professional dedicated to delivering exceptional results.')}</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.5rem">
        ${p.email?`<a href="mailto:${escHtml(p.email)}" style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);color:#c4b5fd;padding:.6rem 1.1rem;border-radius:10px;font-size:.88rem;font-weight:600;text-decoration:none">📧 ${escHtml(p.email)}</a>`:''}
        ${p.linkedin?`<a href="https://${escHtml(p.linkedin)}" target="_blank" style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);color:#93c5fd;padding:.6rem 1.1rem;border-radius:10px;font-size:.88rem;font-weight:600;text-decoration:none">🔗 LinkedIn</a>`:''}
        ${p.github?`<a href="https://${escHtml(p.github)}" target="_blank" style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);padding:.6rem 1.1rem;border-radius:10px;font-size:.88rem;font-weight:600;text-decoration:none">⌨ GitHub</a>`:''}
        ${p.phone?`<a href="tel:${escHtml(p.phone)}" style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.25);color:#6ee7b7;padding:.6rem 1.1rem;border-radius:10px;font-size:.88rem;font-weight:600;text-decoration:none">📞 ${escHtml(p.phone)}</a>`:''}
      </div>
      ${p.location?`<div style="font-size:.9rem;color:rgba(255,255,255,.4)">📍 ${escHtml(p.location)}</div>`:''}
    </div>
  </section>

  ${([...(d.skills.technical||[]),...(d.skills.soft||[]),...(d.skills.tools||[])].length) ? `
  <section id="pf-skills" style="padding:6rem 0;background:#0a0f1e">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <div style="text-align:center;margin-bottom:3.5rem">
        <div style="display:inline-block;padding:.25rem .85rem;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);border-radius:99px;font-size:.72rem;font-weight:700;color:#60a5fa;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Skills</div>
        <h2 style="font-family:'Inter',sans-serif;font-size:2.2rem;font-weight:800;color:#fff;letter-spacing:-.02em">Technical Expertise</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem">
        ${(d.skills.technical||[]).length?`<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:1.5rem">
          <h3 style="color:#60a5fa;font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Technical Skills</h3>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem">${(d.skills.technical||[]).map(s=>`<span style="background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.2);color:#93c5fd;border-radius:8px;padding:.35rem .75rem;font-size:.82rem;font-weight:600">${escHtml(s)}</span>`).join('')}</div>
        </div>`:''}
        ${(d.skills.tools||[]).length?`<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:1.5rem">
          <h3 style="color:#06B6D4;font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Tools & Platforms</h3>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem">${(d.skills.tools||[]).map(s=>`<span style="background:rgba(6,182,212,.12);border:1px solid rgba(6,182,212,.2);color:#67e8f9;border-radius:8px;padding:.35rem .75rem;font-size:.82rem;font-weight:600">${escHtml(s)}</span>`).join('')}</div>
        </div>`:''}
        ${(d.skills.soft||[]).length?`<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:1.5rem">
          <h3 style="color:#a78bfa;font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Soft Skills</h3>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem">${(d.skills.soft||[]).map(s=>`<span style="background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.2);color:#c4b5fd;border-radius:8px;padding:.35rem .75rem;font-size:.82rem;font-weight:600">${escHtml(s)}</span>`).join('')}</div>
        </div>`:''}
        ${(d.skills.languages||[]).length?`<div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:1.5rem">
          <h3 style="color:#6ee7b7;font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Languages</h3>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem">${(d.skills.languages||[]).map(l=>`<span style="background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.2);color:#6ee7b7;border-radius:8px;padding:.35rem .75rem;font-size:.82rem;font-weight:600">${escHtml(l)}</span>`).join('')}</div>
        </div>`:''}
      </div>
    </div>
  </section>` : ''}

  ${d.projects.some(p=>p.name) ? `
  <section id="pf-projects" style="padding:6rem 0;background:#050810">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <div style="text-align:center;margin-bottom:3.5rem">
        <div style="display:inline-block;padding:.25rem .85rem;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);border-radius:99px;font-size:.72rem;font-weight:700;color:#34d399;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Projects</div>
        <h2 style="font-family:'Inter',sans-serif;font-size:2.2rem;font-weight:800;color:#fff;letter-spacing:-.02em">Featured Work</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem">
        ${d.projects.filter(p=>p.name).map((p,i)=>`
        <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:1.75rem;transition:all .2s;cursor:default;position:relative;overflow:hidden">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#8B5CF6,#06B6D4)"></div>
          <div style="font-size:1.5rem;margin-bottom:.75rem">🚀</div>
          <h3 style="font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:.5rem">${escHtml(p.name)}</h3>
          ${p.tech?`<div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.75rem">${p.tech.split(',').map(t=>`<span style="background:rgba(139,92,246,.1);color:#a78bfa;border-radius:6px;padding:.25rem .6rem;font-size:.75rem;font-weight:600">${escHtml(t.trim())}</span>`).join('')}</div>`:''}
          <p style="color:rgba(255,255,255,.6);font-size:.88rem;line-height:1.65;margin-bottom:1rem">${escHtml(p.desc||'')}</p>
          <div style="display:flex;gap:.75rem;flex-wrap:wrap">
            ${p.link?`<a href="${escHtml(p.link)}" target="_blank" style="color:#06B6D4;font-size:.82rem;font-weight:600;text-decoration:none">🔗 Live Demo</a>`:''}
            ${p.github?`<a href="${escHtml(p.github)}" target="_blank" style="color:rgba(255,255,255,.6);font-size:.82rem;font-weight:600;text-decoration:none">⌨ Source Code</a>`:''}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${d.experience.some(e=>e.title) ? `
  <section id="pf-experience" style="padding:6rem 0;background:#0a0f1e">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <div style="text-align:center;margin-bottom:3.5rem">
        <div style="display:inline-block;padding:.25rem .85rem;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);border-radius:99px;font-size:.72rem;font-weight:700;color:#60a5fa;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Experience</div>
        <h2 style="font-family:'Inter',sans-serif;font-size:2.2rem;font-weight:800;color:#fff;letter-spacing:-.02em">Career Journey</h2>
      </div>
      <div style="position:relative;padding-left:2rem;border-left:2px solid rgba(255,255,255,.08)">
        ${d.experience.filter(e=>e.title).map(e=>`
        <div style="position:relative;margin-bottom:2.5rem">
          <div style="position:absolute;left:-2.4rem;top:4px;width:12px;height:12px;border-radius:50%;background:linear-gradient(135deg,#8B5CF6,#06B6D4);border:2px solid #050810"></div>
          <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:1.5rem">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:.5rem;margin-bottom:.5rem">
              <div>
                <h3 style="font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:.2rem">${escHtml(e.title)}</h3>
                <div style="color:#8B5CF6;font-size:.88rem;font-weight:600">${escHtml(e.company||'')}${e.location?' · '+escHtml(e.location):''}</div>
              </div>
              <span style="background:rgba(139,92,246,.1);color:#a78bfa;border-radius:8px;padding:.3rem .75rem;font-size:.78rem;font-weight:600;white-space:nowrap">${escHtml(e.duration||'')}</span>
            </div>
            ${e.desc?`<ul style="margin:0;padding-left:1.25rem;color:rgba(255,255,255,.6);line-height:1.7;font-size:.88rem">${bullets(e.desc)}</ul>`:``}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <section id="pf-contact" style="padding:6rem 0;background:linear-gradient(135deg,#050810,#0f172a)">
    <div style="max-width:700px;margin:0 auto;padding:0 2rem;text-align:center">
      <div style="display:inline-block;padding:.25rem .85rem;background:rgba(139,92,246,.1);border:1px solid rgba(139,92,246,.2);border-radius:99px;font-size:.72rem;font-weight:700;color:#a78bfa;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem">Contact</div>
      <h2 style="font-family:'Inter',sans-serif;font-size:2.2rem;font-weight:800;color:#fff;margin-bottom:1rem;letter-spacing:-.02em">Let's Work Together</h2>
      <p style="color:rgba(255,255,255,.55);font-size:1rem;line-height:1.7;margin-bottom:2.5rem">I'm always open to discussing new opportunities, interesting projects, or just having a chat.</p>
      <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap">
        ${p.email?`<a href="mailto:${escHtml(p.email)}" style="display:inline-flex;align-items:center;gap:.6rem;background:linear-gradient(135deg,#8B5CF6,#06B6D4);color:#fff;padding:.85rem 1.75rem;border-radius:12px;font-size:.95rem;font-weight:700;text-decoration:none;box-shadow:0 4px 15px rgba(139,92,246,.35)">📧 ${escHtml(p.email)}</a>`:''}
        ${p.phone?`<a href="tel:${escHtml(p.phone)}" style="display:inline-flex;align-items:center;gap:.6rem;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);padding:.85rem 1.75rem;border-radius:12px;font-size:.95rem;font-weight:700;text-decoration:none">📞 ${escHtml(p.phone)}</a>`:''}
      </div>
    </div>
  </section>
  <footer style="background:#050810;border-top:1px solid rgba(255,255,255,.06);padding:1.5rem 2rem;text-align:center;font-size:.82rem;color:rgba(255,255,255,.3)">
    Portfolio of ${escHtml(p.fullName||'Your Name')} • Built with ResumeAI
  </footer>`;
}

// ===================== PDF EXPORT =====================
function downloadPDF() {
  syncFormDataFromDOM();
  const el = document.getElementById('resume-output');
  if (!el || !el.innerHTML.trim()) {
    renderResume(selectedTemplate);
  }
  const name = (formData.personal.fullName || 'Resume').replace(/\s+/g,'_');
  showToast('Generating PDF…', 'info');
  const opt = {
    margin: 0,
    filename: `${name}_Resume.pdf`,
    image: { type:'jpeg', quality:.98 },
    html2canvas: { scale:2, useCORS:true, logging:false },
    jsPDF: { unit:'mm', format:'a4', orientation:'portrait' }
  };
  html2pdf().set(opt).from(el).save().then(()=>showToast('PDF downloaded!','success')).catch(()=>showToast('PDF failed. Try again.','error'));
}

// ===================== AI SUGGESTIONS =====================
const AI_SUGGESTIONS = {
  summary: [
    { icon:'fa-pen', text:'Start with a strong quantifiable statement: "Engineered solutions that reduced load time by 60%, serving 2M+ users."' },
    { icon:'fa-star', text:'Use the formula: [Adjective] [Role] with [X] years of experience in [specialization], skilled in [top skills].' },
    { icon:'fa-bullseye', text:'End your summary with a clear goal: "Seeking a senior role to drive product innovation at a growth-stage startup."' },
    { icon:'fa-chart-line', text:'Include 1-2 measurable achievements in your summary to immediately grab recruiter attention.' },
  ],
  experience: [
    { icon:'fa-bolt', text:'Replace weak verbs like "responsible for" with power verbs: Led, Architected, Scaled, Engineered, Optimized.' },
    { icon:'fa-percent', text:'Add metrics to every bullet: "Improved API response time by 45%" instead of "Improved API performance".' },
    { icon:'fa-list', text:'Use the STAR format: Situation → Task → Action → Result for each bullet point.' },
    { icon:'fa-arrow-up', text:'List your most impactful achievements first — recruiters scan the first 2-3 bullets most carefully.' },
  ],
  skills: [
    { icon:'fa-filter', text:'Include both broad (JavaScript) and specific (React 18, Next.js 14) skills to pass ATS filters.' },
    { icon:'fa-sort', text:'Order skills by proficiency: Expert-level skills first, followed by intermediate and beginner.' },
    { icon:'fa-tags', text:'Mirror keywords from the job description to boost your ATS match score significantly.' },
    { icon:'fa-plus', text:'Add trending tools in your field (Docker, Kubernetes, Terraform, LangChain) to stay competitive.' },
  ],
  projects: [
    { icon:'fa-users', text:'Include the impact: "Used by 500+ customers" or "Processed $1M+ in transactions" adds credibility.' },
    { icon:'fa-link', text:'Always include a live demo or GitHub link — hiring managers love seeing your work in action.' },
    { icon:'fa-code', text:'List 3-5 specific technologies per project to maximize keyword coverage for ATS systems.' },
    { icon:'fa-trophy', text:'Feature your most complex or impressive project first. One great project beats five mediocre ones.' },
  ],
  general: [
    { icon:'fa-file-alt', text:'Keep your resume to 1 page for under 5 years experience, 2 pages for senior roles.' },
    { icon:'fa-eye', text:'Use consistent formatting — same font sizes, bullet styles, and date formats throughout.' },
    { icon:'fa-robot', text:'ATS tip: Use standard section headings like "Experience", "Education", "Skills" for best parsing.' },
    { icon:'fa-spell-check', text:'Proofread carefully — typos or grammatical errors are the #1 resume rejection reason.' },
  ]
};

function showAISuggestions() {
  const body = document.getElementById('ai-modal-body');
  body.innerHTML = Object.entries(AI_SUGGESTIONS).map(([cat, tips]) => `
    <div class="ai-category">
      <div class="ai-category-title">
        <i class="fas fa-chevron-right"></i>
        ${cat.charAt(0).toUpperCase() + cat.slice(1)} Tips
      </div>
      ${tips.map(t => `
        <div class="ai-suggestion">
          <i class="fas ${t.icon} ai-suggestion-icon"></i>
          <span class="ai-suggestion-text">${t.text}</span>
        </div>`).join('')}
    </div>`).join('');
  document.getElementById('ai-modal').classList.add('open');
}

function hideAIModal() { document.getElementById('ai-modal').classList.remove('open'); }
function handleModalOverlayClick(e) { if (e.target === e.currentTarget) hideAIModal(); }

// ===================== TOASTS =====================
function showToast(msg, type='info') {
  const icons = { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas ${icons[type]||icons.info} toast-icon"></i><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(20px)'; setTimeout(()=>t.remove(),300); }, 3000);
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  selectedTemplate = localStorage.getItem('resumeai_template') || 'nexus';
  // Show preview/portfolio links if data exists
  const hasData = formData.personal.fullName;
  if (hasData) {
    ['nl-preview','mnl-preview','nl-portfolio','mnl-portfolio'].forEach(id => {
      const el = document.getElementById(id); if(el) el.style.display='';
    });
    const elNavCta = document.getElementById('nav-cta-btn');
    if (elNavCta) elNavCta.innerHTML = '<i class="fas fa-eye"></i> Preview Resume';
    if (elNavCta) elNavCta.onclick = () => navigateTo('preview');
  }
});
