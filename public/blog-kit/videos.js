(function(){
  var vp=document.querySelector('[data-vp]');
  document.querySelectorAll('[data-video]').forEach(function(a){a.addEventListener('click',function(){if(vp)vp.classList.toggle('vp--wide',a.getAttribute('data-format')==='v');},true);});
  var chips=document.querySelectorAll('.vd-chips button'),cards=document.querySelectorAll('.vd-card');
  chips.forEach(function(b){b.addEventListener('click',function(){var f=b.getAttribute('data-f');
    chips.forEach(function(x){x.setAttribute('aria-pressed',x===b);});
    cards.forEach(function(c){c.hidden=!(f==='all'||c.getAttribute('data-cat').split(' ').indexOf(f)>-1);});
    document.querySelectorAll('.vd-band').forEach(function(b){b.hidden=!b.querySelector('.vd-card:not([hidden])');});});});
})();
