// Handle Enter key for accessibility
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('keydown', (e)=> {
      if(e.key === 'Enter') btn.click();
    });
  });
  
  /* --------------------------
     READ MORE SECTION LOGIC
  --------------------------- */
  const backdrop = document.getElementById('readmore-backdrop');
  const modal = document.getElementById('readmore-modal');
  const titleEl = document.getElementById('readmore-title');
  const descEl = document.getElementById('readmore-desc');
  const contentEl = document.getElementById('readmore-content');
  const closeBtn = document.getElementById('readmore-close');
  let lastFocus = null;
  
  function openModal(title, html, desc = 'Detailed information') {
    lastFocus = document.activeElement;
    titleEl.textContent = title;
    descEl.textContent = desc;
    contentEl.innerHTML = html;
    backdrop.classList.add('open');
    modal.style.display = 'block';
    requestAnimationFrame(()=> modal.classList.add('open'));
    closeBtn.focus();
    backdrop.setAttribute('aria-hidden','false');
    document.addEventListener('keydown', onKeydown);
  }
  
  function closeModal() {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', onKeydown);
    setTimeout(()=> { modal.style.display = 'none'; }, 180);
    if (lastFocus) lastFocus.focus();
  }
  
  function onKeydown(e){
    if (e.key === 'Escape') closeModal();
    
    if (e.key === 'Tab') {
      const focusables = modal.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
      const first = focusables[0], last = focusables[focusables.length-1];
      if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    }
  }
  
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  
  /* --------------------------
     FEATURED "READ MORE"
  --------------------------- */
  document.querySelectorAll('.featured .card .read').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.card');
      const heading = card.querySelector('h4');
      const id = heading?.id; 
      const tpl = id ? document.getElementById(id + '-tpl') : null;
      const html = tpl ? tpl.innerHTML : '<p>Content coming soon.</p>';
      openModal(heading?.textContent || 'Details', html);
    });
  });
  
  /* --------------------------
     BUTTON ACTIONS
  --------------------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const label = btn.textContent.trim();
  
      if (label.includes('Register')) {
        openRegistrationForm();
      } else if (label.includes('Tool')) {
        window.open('https://example-tool.com', '_blank');
      } else if (label.includes('Member Directory')) {
        openModal('Member Directory', `<p>Coming soon: searchable list of members.</p>`);
      }
    });
  });

  //TOOLALITS BUTTON CONTENT
  document.querySelectorAll('.btn.secondary').forEach(btn => {
    if (btn.textContent.trim() === 'ToolAlits') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const toolHTML = `
          <div style="display:flex;flex-direction:column;gap:14px">
            <p>
              <strong>ToolAlits</strong> is an interactive analytics platform that helps visualize AI governance data.
              You can explore datasets, simulate policy scenarios, and view interactive charts in real-time.
            </p>
            <img src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=60"
                 alt="ToolAlits dashboard preview" 
                 style="border-radius:10px;max-width:100%;height:auto;box-shadow:0 6px 18px rgba(0,0,0,0.12)">
            <a href="https://example-tool.com" target="_blank" class="btn">Launch Tool</a>
          </div>
        `;
  
        openModal('ToolAlits — Governance Analytics', toolHTML, 'Explore the interactive governance tool');
      });
    }
  });
  
  /* --------------------------
     EXAMPLE: REGISTRATION FORM
  --------------------------- */
  function openRegistrationForm() {
    const formHTML = `
      <form id="register-form" style="display:flex;flex-direction:column;gap:10px">
        <label>Name:<br><input type="text" required></label>
        <label>Email:<br><input type="email" required></label>
        <label>Event:<br>
          <select>
            <option>AI in Health Webinar</option>
            <option>AI for Agriculture Workshop</option>
            <option>AI in Governance Symposium</option>
          </select>
        </label>
        <button type="submit" class="btn">Submit</button>
      </form>
    `;
    openModal('Event Registration', formHTML, 'Register for an upcoming event');
    
    // Handle form submission
    setTimeout(() => {
      const form = document.getElementById('register-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Registration submitted successfully!');
        closeModal();
      });
    }, 200);
  }
  
