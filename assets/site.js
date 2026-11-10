(function(){
  var root=document.documentElement;
  function get(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function set(k,v){try{localStorage.setItem(k,v);}catch(e){}}

  // 明暗の切り替え（選んだ設定は全ページで共通）
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  var btn=document.getElementById('themeBtn'), lbl=document.getElementById('themeLbl');
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':mq.matches;}
  function sync(){
    if(!btn){return;}
    var d=isDark();
    btn.setAttribute('data-mode',d?'dark':'light');
    btn.setAttribute('aria-label',d?'明るい画面に切り替える':'暗い画面に切り替える');
    if(lbl){lbl.textContent=d?'朝の光':'夜の灯り';}
  }
  if(btn){btn.addEventListener('click',function(){
    var next=isDark()?'light':'dark';
    root.setAttribute('data-theme',next);set('nemae5-theme',next);sync();
  });}
  if(mq.addEventListener){mq.addEventListener('change',sync);}
  if(window.MutationObserver){new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-theme']});}
  sync();

  // 今夜の一篇（日替わりで全篇を巡回。表紙のみ）
  var tonightWorks=[
    {id:'yume',label:'夏目漱石『夢十夜』より「第一夜」',desc:'「百年待っていて下さい」――死にゆく女と、墓の傍らで待ち続ける「自分」。夢そのもののような一篇で、眠りへの境目にいちばん似合います。',min:'約4分'},
    {id:'carmen',label:'芥川龍之介『カルメン』',desc:'帝劇に来演したロシアのオペラ『カルメン』。舞台の上の悲劇と、客席にいた「本物のカルメン」をめぐる、皮肉で艶のある短編です。',min:'約4分'},
    {id:'shakai',label:'芥川龍之介『或社会主義者』',desc:'若き日の情熱は、家庭と仕事のなかで静かに遠ざかっていく。けれど彼が書いた一篇は、知らない場所で別の青年を動かしていた――。',min:'約3分'},
    {id:'mangan',label:'太宰治『満願』',desc:'伊豆・三島の夏。若い医者と、胸を病む妻を見守る日々。三年という歳月の重みと、朝の光のような結末が待っています。',min:'約3分'},
    {id:'yume6',label:'夏目漱石『夢十夜』より「第六夜」',desc:'夢のなかで運慶が仁王を彫っている。見物人とのやり取りが軽妙な、十夜のなかでも明るく笑える一篇です。',min:'約3分'},
    {id:'kakei',label:'梶井基次郎『筧の話』',desc:'山径の奥、古びた筧から洩れる澄んだ水音。その音に惹かれる心の風景を、静かにたどる小品です。',min:'約4分'},
    {id:'kinwa',label:'小川未明『金の輪』',desc:'病み上がりの少年と、金色に光る輪をまわす見知らぬ少年。夢のように静かで、哀しい余韻の残る童話です。',min:'約3分'},
    {id:'denden',label:'新美南吉『デンデンムシノカナシミ』',desc:'背中の殻いっぱいの悲しみに気づいたでんでんむし。友だちを訪ね歩くうちにたどり着く、小さな気づきの物語です。',min:'約1〜2分'},
    {id:'ame',label:'宮沢賢治『〔雨ニモマケズ〕』',desc:'賢治の死後、手帳から見つかった詩。「サウイフモノニ ワタシハナリタイ」――静かに読み直したい、わずか344字の一篇です。',min:'約1分'},
    {id:'iwashi',label:'岩本素白『鰯』',desc:'早春の越生、白い梅の花の下で青く光る鰯の背。何気ない一場面の美しさを味わう随筆です。',min:'約2分'}
  ];
  (function(){
    var link=document.getElementById('tonightLink'); if(!link){return;}
    var now=new Date();
    var start=new Date(now.getFullYear(),0,0);
    var day=Math.floor((now-start)/86400000);
    var w=tonightWorks[day%tonightWorks.length];
    link.setAttribute('href',w.id+'.html');
    var t=document.getElementById('tonightTitle'); if(t){t.textContent=w.label;}
    var d=document.getElementById('tonightDesc'); if(d){d.textContent=w.desc;}
    var b=document.getElementById('tonightBtn'); if(b){b.textContent='読む（'+w.min+'）';}
    var dt=document.getElementById('tonightDate');
    if(dt){var wd='日月火水木金土'.charAt(now.getDay());dt.textContent=now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日（'+wd+'）のおすすめ';}
  })();

  // 文字の大きさ（本文ページのみ）
  var minus=document.getElementById('fontMinus'), plus=document.getElementById('fontPlus');
  if(minus&&plus){
    var sizes=[1,1.125,1.25,1.4], idx=1, saved=parseFloat(get('nemae5-size'));
    sizes.forEach(function(v,i){if(v===saved){idx=i;}});
    function setSize(store){
      root.style.setProperty('--read-size',sizes[idx]+'rem');
      minus.disabled=(idx===0);plus.disabled=(idx===sizes.length-1);
      if(store){set('nemae5-size',String(sizes[idx]));}
      update();
    }
    minus.addEventListener('click',function(){if(idx>0){idx--;setSize(true);}});
    plus.addEventListener('click',function(){if(idx<sizes.length-1){idx++;setSize(true);}});
  }

  // 読み進み（本文の長さに対する位置）
  var bar=document.getElementById('progress'), text=document.getElementById('honbun');
  function update(){
    if(!bar||!text){return;}
    var r=text.getBoundingClientRect();
    var p=(window.innerHeight*0.6-r.top)/Math.max(r.height,1);
    bar.style.width=(Math.min(Math.max(p,0),1)*100)+'%';
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  if(minus&&plus){setSize(false);}else{update();}
})();
