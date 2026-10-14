/* Contents panel for the Privacy Policy and Terms pages: collapses on small screens and highlights the section being read. */
(function(){
  var toc=document.querySelector('.doc-toc');
  if(!toc)return;
  var mq=window.matchMedia('(max-width:900px)');
  if(mq.matches)toc.removeAttribute('open');
  var links=[].slice.call(toc.querySelectorAll('a[href^="#"]'));
  var items=links.map(function(a){return {a:a,el:document.getElementById(a.getAttribute('href').slice(1))};}).filter(function(x){return x.el;});
  var ticking=false;
  function update(){
    ticking=false;
    var current=null;
    items.forEach(function(x){if(x.el.getBoundingClientRect().top<=120)current=x;});
    items.forEach(function(x){
      var on=x===current;
      x.a.classList.toggle('is-active',on);
      if(on){x.a.setAttribute('aria-current','true');}else{x.a.removeAttribute('aria-current');}
    });
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  links.forEach(function(a){a.addEventListener('click',function(){if(mq.matches)toc.removeAttribute('open');});});
  update();
})();
