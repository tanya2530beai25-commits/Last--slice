function sendMessage() {
      var name = document.getElementById('c-name').value.trim();
      var email = document.getElementById('c-email').value.trim();
      var subject = document.getElementById('c-subject').value;
      var msg = document.getElementById('c-msg').value.trim();
      var error = document.getElementById('c-error');
      var success = document.getElementById('c-success');

      if (!name || !email || !subject || !msg) {
        error.style.display = 'block';
        return;
      }
      error.style.display = 'none';

      var btn = document.querySelector('.send-btn');
      btn.textContent = 'Sending...';
      btn.style.background = 'var(--green-brand)';
      btn.disabled = true;

      setTimeout(() => {
        btn.style.display = 'none';
        success.style.display = 'block';
      }, 1000);
    }

    const obs = new IntersectionObserver(e => 
      e.forEach(x => { 
        if (x.isIntersecting) 
          x.target.classList.add('visible'); 
        }), 
        { threshold: 0.1 }
      );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    