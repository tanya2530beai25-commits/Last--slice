function handleSignIn() {
      var email = document.getElementById('email').value.trim();
      var password = document.getElementById('password').value.trim();
      var error = document.getElementById('error-msg');

      if (!email || !password) { error.style.display = 'block'; return; }
      error.style.display = 'none';

      var btn = document.querySelector('.submit-btn');
      btn.textContent = 'Signing in...';
      btn.style.background = 'var(--green-brand)';

      setTimeout(() => { location.href = 'b.html'; }, 1200);
    }

    function handleGoogle() { alert('Google sign-in coming soon!'); }
    document.addEventListener('keydown', e => { if (e.key === 'Enter') handleSignIn(); });