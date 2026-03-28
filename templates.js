
// ===================== RESUME TEMPLATES =====================
function renderResume(tpl) {
  selectedTemplate = tpl || selectedTemplate;
  const el = document.getElementById('resume-output');
  if (!el) return;
  const fn = {nexus:tplNexus, aurora:tplAurora, slate:tplSlate, prism:tplPrism}[selectedTemplate] || tplNexus;
  el.innerHTML = fn(formData);
  saveData();
}

function switchTemplate(tpl) {
  selectedTemplate = tpl;
  document.querySelectorAll('.tpl-sel-btn').forEach(b => b.classList.toggle('active', b.dataset.template === tpl));
  renderResume(tpl);
  showToast('Template: ' + tpl.charAt(0).toUpperCase() + tpl.slice(1), 'info');
}

const bullets = txt => txt ? txt.split('\n').filter(l=>l.trim()).map(l=>`<li>${escHtml(l.replace(/^[•\-]\s*/,''))}</li>`).join('') : '';

function tplNexus(d) {
  const p = d.personal, ac = '#3B82F6';
  return `<div style="display:flex;min-height:1123px;font-family:'Inter',sans-serif;font-size:9pt;color:#1a1a2e">
  <div style="width:210px;background:#0f172a;color:#e2e8f0;padding:24px 16px;flex-shrink:0;display:flex;flex-direction:column;gap:14px">
    <div style="text-align:center">
      <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,${ac},#06B6D4);margin:0 auto 10px;display:flex;align-items:center;justify-content:center;font-size:22pt;font-weight:900;color:#fff">${(p.fullName||'?').charAt(0).toUpperCase()}</div>
      <div style="font-size:11pt;font-weight:800;color:#fff">${escHtml(p.fullName||'Your Name')}</div>
      <div style="font-size:8pt;color:${ac};font-weight:600;margin-top:2px">${escHtml(p.jobTitle||'')}</div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,.1);padding-top:12px">
      <div style="font-size:6.5pt;font-weight:700;color:${ac};letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">Contact</div>
      ${p.email?`<div style="font-size:7pt;margin-bottom:4px;word-break:break-all">📧 ${escHtml(p.email)}</div>`:``}
      ${p.phone?`<div style="font-size:7pt;margin-bottom:4px">📞 ${escHtml(p.phone)}</div>`:``}
      ${p.location?`<div style="font-size:7pt;margin-bottom:4px">📍 ${escHtml(p.location)}</div>`:``}
      ${p.linkedin?`<div style="font-size:7pt;margin-bottom:4px;word-break:break-all">🔗 ${escHtml(p.linkedin)}</div>`:``}
      ${p.github?`<div style="font-size:7pt;word-break:break-all">⌨ ${escHtml(p.github)}</div>`:``}
    </div>
    ${(d.skills.technical||[]).length?`<div style="border-top:1px solid rgba(255,255,255,.1);padding-top:12px"><div style="font-size:6.5pt;font-weight:700;color:${ac};letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">Technical Skills</div>${(d.skills.technical||[]).map(s=>`<div style="margin-bottom:7px"><div style="font-size:7pt;margin-bottom:2px;color:#cbd5e1">${escHtml(s)}</div><div style="height:3px;background:rgba(255,255,255,.1);border-radius:99px;overflow:hidden"><div style="height:100%;width:${70+Math.floor(Math.random()*25)}%;background:linear-gradient(90deg,${ac},#06B6D4);border-radius:99px"></div></div></div>`).join('')}</div>`:``}
    ${(d.skills.tools||[]).length?`<div style="border-top:1px solid rgba(255,255,255,.1);padding-top:12px"><div style="font-size:6.5pt;font-weight:700;color:${ac};letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">Tools</div><div style="display:flex;flex-wrap:wrap;gap:3px">${(d.skills.tools||[]).map(s=>`<span style="background:rgba(59,130,246,.2);color:${ac};border-radius:3px;padding:2px 5px;font-size:6.5pt">${escHtml(s)}</span>`).join('')}</div></div>`:``}
    ${(d.skills.languages||[]).length?`<div style="border-top:1px solid rgba(255,255,255,.1);padding-top:12px"><div style="font-size:6.5pt;font-weight:700;color:${ac};letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">Languages</div>${(d.skills.languages||[]).map(l=>`<div style="font-size:7pt;margin-bottom:2px;color:#cbd5e1">• ${escHtml(l)}</div>`).join('')}</div>`:``}
  </div>
  <div style="flex:1;padding:24px 22px;background:#fff">
    ${resumeSection(d.summary,'Profile',ac,`<p style="color:#374151;line-height:1.6;font-size:8.5pt">${escHtml(d.summary)}</p>`)}
    ${d.experience.some(e=>e.title)?resumeSection(true,'Experience',ac,d.experience.filter(e=>e.title).map(e=>`<div style="margin-bottom:11px"><div style="display:flex;justify-content:space-between"><b style="font-size:9pt;color:#1e293b">${escHtml(e.title)}</b><span style="font-size:7.5pt;color:#64748b">${escHtml(e.duration||'')}</span></div><div style="color:${ac};font-size:7.5pt;font-weight:600;margin-bottom:3px">${escHtml(e.company||'')}${e.location?' · '+escHtml(e.location):''}</div>${e.desc?`<ul style="margin:0;padding-left:14px;color:#374151;line-height:1.6;font-size:8pt">${bullets(e.desc)}</ul>`:''}</div>`).join('')):''}
    ${d.education.some(e=>e.degree)?resumeSection(true,'Education',ac,d.education.filter(e=>e.degree).map(e=>`<div style="margin-bottom:9px"><div style="display:flex;justify-content:space-between"><b style="font-size:9pt">${escHtml(e.degree)}</b><span style="font-size:7.5pt;color:#64748b">${escHtml(e.year||'')}</span></div><div style="color:${ac};font-size:7.5pt">${escHtml(e.institution||'')}${e.gpa?' · GPA: '+escHtml(e.gpa):''}</div></div>`).join('')):''}
    ${d.projects.some(p=>p.name)?resumeSection(true,'Projects',ac,d.projects.filter(p=>p.name).map(p=>`<div style="margin-bottom:9px"><b style="font-size:8.5pt">${escHtml(p.name)}</b>${p.tech?`<span style="font-size:7pt;color:${ac};margin-left:6px">${escHtml(p.tech)}</span>`:''}<div style="font-size:8pt;color:#374151">${escHtml(p.desc||'')}</div></div>`).join('')):''}
    ${d.certifications.some(c=>c.name)?resumeSection(true,'Certifications',ac,d.certifications.filter(c=>c.name).map(c=>`<div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:8.5pt"><b>${escHtml(c.name)}</b><span style="color:#64748b;font-size:7.5pt">${escHtml(c.issuer||'')} ${c.date?'· '+escHtml(c.date):''}</span></div>`).join('')):''}
    ${d.achievements?resumeSection(true,'Achievements',ac,`<p style="font-size:8.5pt;color:#374151;line-height:1.6">${escHtml(d.achievements)}</p>`):''}
    ${(d.skills.soft||[]).length?resumeSection(true,'Soft Skills',ac,`<div style="display:flex;flex-wrap:wrap;gap:4px">${(d.skills.soft||[]).map(s=>`<span style="background:#EFF6FF;color:${ac};border-radius:4px;padding:2px 8px;font-size:7.5pt;border:1px solid #BFDBFE">${escHtml(s)}</span>`).join('')}</div>`):''}
  </div></div>`;
}

function resumeSection(show, title, ac, body) {
  if (!show) return '';
  return `<div style="margin-bottom:16px"><div style="font-size:7.5pt;font-weight:700;color:${ac};letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid ${ac};padding-bottom:3px;margin-bottom:8px">${title}</div>${body}</div>`;
}

function tplAurora(d) {
  const p = d.personal;
  return `<div style="font-family:'Inter',sans-serif;font-size:9pt;color:#1e293b;min-height:1123px">
  <div style="background:linear-gradient(135deg,#4F46E5,#0891B2);padding:28px 34px;color:#fff">
    <div style="font-size:20pt;font-weight:900;margin-bottom:3px">${escHtml(p.fullName||'Your Name')}</div>
    <div style="font-size:10pt;opacity:.85;margin-bottom:10px">${escHtml(p.jobTitle||'')}</div>
    <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:7.5pt;opacity:.8">
      ${[p.email,p.phone,p.location,p.linkedin,p.github].filter(Boolean).map(x=>`<span>${escHtml(x)}</span>`).join('')}
    </div>
  </div>
  <div style="display:flex">
    <div style="width:190px;flex-shrink:0;background:#F8FAFC;padding:18px 14px;border-right:1px solid #E2E8F0">
      ${d.summary?`<div style="margin-bottom:14px"><div style="font-size:7pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">About</div><p style="font-size:7.5pt;color:#475569;line-height:1.6">${escHtml(d.summary)}</p></div>`:''}
      ${(d.skills.technical||[]).length?`<div style="margin-bottom:14px"><div style="font-size:7pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:3px">${(d.skills.technical||[]).map(s=>`<span style="background:#EEF2FF;color:#4338CA;border-radius:3px;padding:2px 6px;font-size:6.5pt;font-weight:600">${escHtml(s)}</span>`).join('')}</div></div>`:''}
      ${(d.skills.tools||[]).length?`<div style="margin-bottom:14px"><div style="font-size:7pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Tools</div>${(d.skills.tools||[]).map(s=>`<div style="font-size:7.5pt;color:#475569;margin-bottom:2px">• ${escHtml(s)}</div>`).join('')}</div>`:''}
      ${(d.skills.languages||[]).length?`<div style="margin-bottom:14px"><div style="font-size:7pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Languages</div>${(d.skills.languages||[]).map(l=>`<div style="font-size:7.5pt;color:#475569;margin-bottom:2px">• ${escHtml(l)}</div>`).join('')}</div>`:''}
      ${d.certifications.some(c=>c.name)?`<div><div style="font-size:7pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Certifications</div>${d.certifications.filter(c=>c.name).map(c=>`<div style="margin-bottom:7px"><div style="font-size:7.5pt;font-weight:600">${escHtml(c.name)}</div><div style="font-size:7pt;color:#64748b">${escHtml(c.issuer||'')}${c.date?' · '+escHtml(c.date):''}</div></div>`).join('')}</div>`:''}
    </div>
    <div style="flex:1;padding:18px 22px">
      ${d.experience.some(e=>e.title)?`<div style="margin-bottom:16px"><div style="font-size:7.5pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #4F46E5;padding-bottom:3px;margin-bottom:9px">Experience</div>${d.experience.filter(e=>e.title).map(e=>`<div style="margin-bottom:11px"><div style="display:flex;justify-content:space-between"><b style="font-size:9pt">${escHtml(e.title)}</b><span style="font-size:7.5pt;color:#64748b">${escHtml(e.duration||'')}</span></div><div style="color:#4F46E5;font-size:7.5pt;font-weight:600;margin-bottom:3px">${escHtml(e.company||'')}${e.location?' · '+escHtml(e.location):''}</div>${e.desc?`<ul style="margin:0;padding-left:14px;color:#374151;line-height:1.6;font-size:8pt">${bullets(e.desc)}</ul>`:''}</div>`).join('')}</div>`:''}
      ${d.education.some(e=>e.degree)?`<div style="margin-bottom:16px"><div style="font-size:7.5pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #4F46E5;padding-bottom:3px;margin-bottom:9px">Education</div>${d.education.filter(e=>e.degree).map(e=>`<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between"><b style="font-size:9pt">${escHtml(e.degree)}</b><span style="font-size:7.5pt;color:#64748b">${escHtml(e.year||'')}</span></div><div style="color:#4F46E5;font-size:7.5pt">${escHtml(e.institution||'')}${e.gpa?' · GPA: '+escHtml(e.gpa):''}</div></div>`).join('')}</div>`:''}
      ${d.projects.some(p=>p.name)?`<div style="margin-bottom:16px"><div style="font-size:7.5pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #4F46E5;padding-bottom:3px;margin-bottom:9px">Projects</div>${d.projects.filter(p=>p.name).map(p=>`<div style="margin-bottom:9px"><b style="font-size:8.5pt">${escHtml(p.name)}</b>${p.tech?`<span style="font-size:7pt;color:#0891B2;margin-left:6px;font-weight:600">${escHtml(p.tech)}</span>`:''}<div style="font-size:8pt;color:#374151;margin-top:2px">${escHtml(p.desc||'')}</div></div>`).join('')}</div>`:''}
      ${d.achievements?`<div><div style="font-size:7.5pt;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #4F46E5;padding-bottom:3px;margin-bottom:8px">Achievements</div><p style="font-size:8.5pt;color:#374151">${escHtml(d.achievements)}</p></div>`:''}
    </div>
  </div></div>`;
}

function tplSlate(d) {
  const p = d.personal;
  const sec = (show, title, body) => show ? `<div style="margin-bottom:14px"><div style="font-weight:700;font-size:9pt;text-transform:uppercase;letter-spacing:.07em;margin-bottom:7px;padding-bottom:3px;border-bottom:1.5px solid #1a1a1a">${title}</div>${body}<div style="height:1px;background:#ddd;margin-top:10px"></div></div>` : '';
  return `<div style="font-family:'Georgia',serif;font-size:9.5pt;color:#1a1a1a;padding:36px 44px;min-height:1123px;background:#fff">
  <div style="text-align:center;padding-bottom:16px;border-bottom:2.5px solid #1a1a1a;margin-bottom:16px">
    <div style="font-size:20pt;font-weight:700;margin-bottom:3px">${escHtml(p.fullName||'Your Name')}</div>
    <div style="font-size:10pt;color:#555;margin-bottom:8px;font-style:italic">${escHtml(p.jobTitle||'')}</div>
    <div style="font-size:8pt;color:#444;display:flex;justify-content:center;gap:12px;flex-wrap:wrap">${[p.email,p.phone,p.location,p.linkedin,p.github].filter(Boolean).map(x=>`<span>${escHtml(x)}</span>`).join('')}</div>
  </div>
  ${d.summary?sec(true,'Professional Summary',`<p style="color:#333;line-height:1.7;font-size:9pt">${escHtml(d.summary)}</p>`):''}
  ${d.experience.some(e=>e.title)?sec(true,'Professional Experience',d.experience.filter(e=>e.title).map(e=>`<div style="margin-bottom:11px"><div style="display:flex;justify-content:space-between"><b>${escHtml(e.title)}, ${escHtml(e.company||'')}</b><span style="font-size:8.5pt;color:#555">${escHtml(e.duration||'')}</span></div>${e.location?`<div style="font-size:8pt;color:#555;font-style:italic">${escHtml(e.location)}</div>`:''}<ul style="margin:3px 0 0;padding-left:18px;color:#333;line-height:1.6;font-size:8.5pt">${bullets(e.desc)}</ul></div>`).join('')):''}
  ${d.education.some(e=>e.degree)?sec(true,'Education',d.education.filter(e=>e.degree).map(e=>`<div style="margin-bottom:7px"><div style="display:flex;justify-content:space-between"><b>${escHtml(e.degree)}</b><span style="font-size:8.5pt;color:#555">${escHtml(e.year||'')}</span></div><div style="font-style:italic;color:#444;font-size:8.5pt">${escHtml(e.institution||'')}${e.gpa?' — GPA: '+escHtml(e.gpa):''}</div></div>`).join('')):''}
  ${[(d.skills.technical||[]).length?'Technical: '+(d.skills.technical||[]).join(', '):'',(d.skills.soft||[]).length?'Soft Skills: '+(d.skills.soft||[]).join(', '):'',(d.skills.tools||[]).length?'Tools: '+(d.skills.tools||[]).join(', '):'',(d.skills.languages||[]).length?'Languages: '+(d.skills.languages||[]).join(', '):''].filter(Boolean).length?sec(true,'Skills',
  `${(d.skills.technical||[]).length?`<div style="font-size:8.5pt;margin-bottom:3px"><b>Technical:</b> ${escHtml((d.skills.technical||[]).join(', '))}</div>`:''}
   ${(d.skills.soft||[]).length?`<div style="font-size:8.5pt;margin-bottom:3px"><b>Soft Skills:</b> ${escHtml((d.skills.soft||[]).join(', '))}</div>`:''}
   ${(d.skills.tools||[]).length?`<div style="font-size:8.5pt;margin-bottom:3px"><b>Tools:</b> ${escHtml((d.skills.tools||[]).join(', '))}</div>`:''}
   ${(d.skills.languages||[]).length?`<div style="font-size:8.5pt"><b>Languages:</b> ${escHtml((d.skills.languages||[]).join(', '))}</div>`:''}`):sec(false,'','')}
  ${d.projects.some(p=>p.name)?sec(true,'Projects',d.projects.filter(p=>p.name).map(p=>`<div style="margin-bottom:7px"><b>${escHtml(p.name)}</b>${p.tech?` <i style="color:#555;font-size:8.5pt">— ${escHtml(p.tech)}</i>`:''}<div style="font-size:8.5pt;color:#333">${escHtml(p.desc||'')}</div></div>`).join('')):''}
  ${d.certifications.some(c=>c.name)?sec(true,'Certifications',d.certifications.filter(c=>c.name).map(c=>`<div style="font-size:8.5pt;margin-bottom:3px"><b>${escHtml(c.name)}</b> — ${escHtml(c.issuer||'')} ${c.date?'('+escHtml(c.date)+')':''}</div>`).join('')):''}
  ${d.achievements?sec(true,'Achievements',`<p style="font-size:8.5pt;color:#333;line-height:1.6">${escHtml(d.achievements)}</p>`):''}
  </div>`;
}

function tplPrism(d) {
  const p = d.personal, ac = '#8B5CF6';
  const sec = (show, title, body) => show ? `<div style="margin-bottom:20px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span style="width:22px;height:2px;background:${ac};display:inline-block"></span><div style="font-size:8.5pt;font-weight:800;color:#0f0f1a;text-transform:uppercase;letter-spacing:.08em">${title}</div></div>${body}</div>` : '';
  return `<div style="font-family:'Inter',sans-serif;font-size:9pt;color:#1e1e2e;min-height:1123px;display:flex">
  <div style="width:7px;background:linear-gradient(180deg,#8B5CF6,#EC4899);flex-shrink:0"></div>
  <div style="flex:1;padding:30px 34px">
    <div style="margin-bottom:22px">
      <div style="font-size:26pt;font-weight:900;color:#0f0f1a;line-height:1;margin-bottom:5px">${escHtml(p.fullName||'Your Name')}</div>
      <div style="font-size:10.5pt;color:${ac};font-weight:600;margin-bottom:10px">${escHtml(p.jobTitle||'')}</div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:7.5pt;color:#555">${[p.email,p.phone,p.location,p.linkedin,p.github].filter(Boolean).map(x=>`<span>${escHtml(x)}</span>`).join('')}</div>
    </div>
    ${d.summary?`<div style="margin-bottom:20px;padding:12px 14px;background:#F5F3FF;border-left:3px solid ${ac};border-radius:0 8px 8px 0"><p style="color:#374151;line-height:1.7;font-size:8.5pt">${escHtml(d.summary)}</p></div>`:''}
    ${[...(d.skills.technical||[]),...(d.skills.soft||[]),...(d.skills.tools||[])].length?sec(true,'Skills',`<div style="display:flex;flex-wrap:wrap;gap:5px">${[...(d.skills.technical||[]),...(d.skills.soft||[]),...(d.skills.tools||[])].map(s=>`<span style="background:#EDE9FE;color:#5B21B6;border-radius:5px;padding:3px 9px;font-size:7.5pt;font-weight:600">${escHtml(s)}</span>`).join('')}</div>`):''}
    ${d.experience.some(e=>e.title)?sec(true,'Experience',`<div style="border-left:2px solid #EDE9FE;padding-left:16px">${d.experience.filter(e=>e.title).map(e=>`<div style="margin-bottom:13px;position:relative"><div style="position:absolute;left:-21px;top:4px;width:8px;height:8px;border-radius:50%;background:${ac};flex-shrink:0"></div><div style="display:flex;justify-content:space-between;margin-bottom:1px"><b style="font-size:9pt">${escHtml(e.title)}</b><span style="font-size:7.5pt;color:${ac};font-weight:600">${escHtml(e.duration||'')}</span></div><div style="font-size:7.5pt;color:#555;margin-bottom:4px">${escHtml(e.company||'')}${e.location?' · '+escHtml(e.location):''}</div>${e.desc?`<ul style="margin:0;padding-left:14px;color:#374151;line-height:1.6;font-size:8pt">${bullets(e.desc)}</ul>`:''}</div>`).join('')}</div>`):''}
    ${d.education.some(e=>e.degree)?sec(true,'Education',d.education.filter(e=>e.degree).map(e=>`<div style="padding:10px 13px;background:#FAFAFA;border-radius:8px;border:1px solid #E5E7EB;margin-bottom:7px"><div style="display:flex;justify-content:space-between"><b>${escHtml(e.degree)}</b><span style="font-size:7.5pt;color:${ac};font-weight:600">${escHtml(e.year||'')}</span></div><div style="font-size:7.5pt;color:#555">${escHtml(e.institution||'')}${e.gpa?' · GPA: '+escHtml(e.gpa):''}</div></div>`).join('')):''}
    ${d.projects.some(p=>p.name)?sec(true,'Projects',d.projects.filter(p=>p.name).map(p=>`<div style="padding:10px 13px;background:#FAFAFA;border-radius:8px;border:1px solid #E5E7EB;margin-bottom:7px"><b>${escHtml(p.name)}</b>${p.tech?`<span style="font-size:7pt;color:${ac};font-weight:600;margin-left:7px">${escHtml(p.tech)}</span>`:''}<div style="font-size:8pt;color:#374151;margin-top:3px">${escHtml(p.desc||'')}</div></div>`).join('')):''}
    ${d.certifications.some(c=>c.name)?sec(true,'Certifications',d.certifications.filter(c=>c.name).map(c=>`<div style="font-size:8.5pt;margin-bottom:4px"><b>${escHtml(c.name)}</b> — ${escHtml(c.issuer||'')} ${c.date?'('+escHtml(c.date)+')':''}</div>`).join('')):''}
    ${d.achievements?sec(true,'Achievements',`<p style="font-size:8.5pt;color:#374151;line-height:1.6">${escHtml(d.achievements)}</p>`):''}
    ${(d.skills.languages||[]).length?sec(true,'Languages',`<div style="display:flex;flex-wrap:wrap;gap:5px">${(d.skills.languages||[]).map(l=>`<span style="background:#EDE9FE;color:#5B21B6;border-radius:5px;padding:3px 9px;font-size:7.5pt;font-weight:600">${escHtml(l)}</span>`).join('')}</div>`):''}
  </div></div>`;
}
