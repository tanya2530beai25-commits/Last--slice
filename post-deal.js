// Live discount preview
function calcDiscount() {
  var orig  = parseFloat(document.getElementById('original-price').value);
  var deal  = parseFloat(document.getElementById('deal-price').value);
  var badge = document.getElementById('discount-display');

  if (orig > 0 && deal > 0 && deal < orig) {
    var pct = Math.round(((orig - deal) / orig) * 100);
    badge.textContent = pct + '% off';
    badge.style.background    = '#fff0eb';
    badge.style.color         = '#c04e1e';
    badge.style.borderColor   = 'rgba(192,78,30,0.25)';
  } else {
    badge.textContent = '— % off';
    badge.style.background    = '#f5f5f5';
    badge.style.color         = '#aaa';
    badge.style.borderColor   = '#eee';
  }
}

// Format 24hr time to 12hr string e.g. "6:30 PM"
function formatTime(t) {
  if (!t) return '—';
  var parts = t.split(':');
  var h = parseInt(parts[0]);
  var m = parts[1];
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + m + ' ' + ampm;
}

function submitDeal() {
  var shopName  = document.getElementById('shop-name').value.trim();
  var category  = document.getElementById('category').value;
  var itemName  = document.getElementById('item-name').value.trim();
  var origPrice = document.getElementById('original-price').value;
  var dealPrice = document.getElementById('deal-price').value;
  var quantity  = document.getElementById('quantity').value;
  var expiry    = document.getElementById('expiry').value;
  var distance  = document.getElementById('distance').value.trim();
  var desc      = document.getElementById('description').value.trim();
  var errorMsg  = document.getElementById('error-msg');

  // Validate required fields
  if (!shopName || !category || !itemName || !origPrice || !dealPrice || !quantity || !expiry) {
    errorMsg.textContent = 'Please fill in all required fields.';
    errorMsg.style.display = 'block';
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Validate price
  if (parseFloat(dealPrice) >= parseFloat(origPrice)) {
    errorMsg.textContent = 'Deal price must be less than original price.';
    errorMsg.style.display = 'block';
    return;
  }

  errorMsg.style.display = 'none';

  // Save deal to localStorage
  var deal = {
    shopName:      shopName,
    category:      category,
    itemName:      itemName,
    description:   desc || '',
    originalPrice: origPrice,
    dealPrice:     dealPrice,
    quantity:      quantity,
    expiry:        formatTime(expiry),
    distance:      distance || '?',
    postedAt:      Date.now()
  };

  var existing = JSON.parse(localStorage.getItem('lastslice_deals') || '[]');
  existing.unshift(deal); // add new deal at the top
  localStorage.setItem('lastslice_deals', JSON.stringify(existing));

  // Show posting animation then success

  var btn = document.getElementById('submit-btn');
  btn.textContent = 'Posting...';
  btn.style.background = 'var(--green-brand)';
  btn.disabled = true;

  setTimeout(function() {
    btn.style.display = 'none';
    var sb = document.getElementById('success-box');
    sb.style.display = 'block';
    sb.scrollIntoView({ behavior: 'smooth' });
  }, 1000);
}
