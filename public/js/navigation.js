/* Primary navigation: mobile menu button and the header dropdowns ("What we do", "Legal"). */
(function(){
  var toggle=document.querySelector('.nav-toggle');
  var nav=document.querySelector('.primary-nav');
  var drops=[].slice.call(document.querySelectorAll('.nav-dropdown'));

  function setNav(open){
    if(!toggle||!nav)return;
    nav.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  }
  function setDrop(drop,open){
    var btn=drop.querySelector('.nav-drop-toggle');
    drop.classList.toggle('is-open',open);
    if(btn)btn.setAttribute('aria-expanded',String(open));
  }
  function closeDrops(except){
    drops.forEach(function(d){if(d!==except)setDrop(d,false);});
  }

  if(toggle&&nav){
    toggle.addEventListener('click',function(){setNav(!nav.classList.contains('is-open'));});
  }

  drops.forEach(function(drop){
    var btn=drop.querySelector('.nav-drop-toggle');
    if(!btn)return;
    /* Each dropdown opens and closes only through its is-open class, so a second click always closes it. */
    btn.addEventListener('click',function(){
      var willOpen=!drop.classList.contains('is-open');
      closeDrops(drop);
      setDrop(drop,willOpen);
    });
    /* Tabbing out of a dropdown closes it. */
    drop.addEventListener('focusout',function(e){
      if(e.relatedTarget&&!drop.contains(e.relatedTarget))setDrop(drop,false);
    });
  });

  document.addEventListener('click',function(e){
    drops.forEach(function(d){if(!d.contains(e.target))setDrop(d,false);});
  });

  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape')return;
    var openDrop=drops.filter(function(d){return d.classList.contains('is-open');})[0];
    closeDrops(null);
    setNav(false);
    if(openDrop){var b=openDrop.querySelector('.nav-drop-toggle');if(b)b.focus();}
  });
})();
