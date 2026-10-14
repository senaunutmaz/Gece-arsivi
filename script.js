const initialMovies = [
  {id:1,title:"Fısıltı Evi",year:2024,genre:"Paranormal",category:"paranormal",rating:"8.1",symbol:"⌂",c1:"#44303a",c2:"#a64a5d",description:"Terk edilmiş bir evde duyulan fısıltılar, yeni taşınan ailenin geçmişle yüzleşmesine neden olur.",accepted:true},
  {id:2,title:"Son Seans",year:2023,genre:"Psikolojik",category:"psychological",rating:"7.8",symbol:"◉",c1:"#302c3c",c2:"#76659e",description:"Gece yarısı son müşterisini bekleyen bir sinemacı, perdede kendi geleceğini görmeye başlar.",accepted:true},
  {id:3,title:"Karanlık Orman",year:2025,genre:"Doğaüstü",category:"paranormal",rating:"8.4",symbol:"♠",c1:"#1c3933",c2:"#477e65",description:"Kaybolan kardeşini arayan genç bir kadın, ormanda yaşayan eski bir varlığın izini sürer.",accepted:true},
  {id:4,title:"Kırmızı Oda",year:2022,genre:"Slasher",category:"slasher",rating:"7.6",symbol:"✳",c1:"#4a1d26",c2:"#d44454",description:"Bir grup öğrenci, kilitli bir odada geçmişte işlenen cinayetlerin izlerini bulur.",accepted:true},
  {id:5,title:"Sessiz Kat",year:2024,genre:"Psikolojik",category:"psychological",rating:"7.9",symbol:"⌁",c1:"#33383e",c2:"#8b9ca5",description:"Issız bir hastanede nöbet tutan hemşire, boş koridorlardan gelen ayak seslerini araştırır.",accepted:true},
  {id:6,title:"Gece Gelen",year:2021,genre:"Paranormal",category:"paranormal",rating:"8.0",symbol:"☾",c1:"#25233c",c2:"#6660a0",description:"Her gece aynı saatte kapısı çalınan bir adam, ziyaretçisinin yaşayan biri olmadığını fark eder.",accepted:true}
];

let movies = [...initialMovies];
const movieGrid = document.getElementById("movieGrid");
const form = document.getElementById("filmForm");
const titleInput = document.getElementById("filmTitle");
const descInput = document.getElementById("filmDescription");
const result = document.getElementById("result");
const toast = document.getElementById("toast");
let activeFilter = "all";

const knownCatalog = {
  "dabbe": {title: "Dabbe: Cin Çarpması", genre: "Korku", desc: "Issız bir köyde kadim bir cin musallatına uğrayan genç kadını kurtarmak için yürütülen esrarengiz paranormal ayin ve kabus dolu cinayetler."},
  "siccin": {title: "Siccin", genre: "Korku", desc: "Kıskançlık yüzünden yapılan kara büyü sonucu musallat olan karanlık iblislerin ve şeytani lanetin dehşet verici ölümleri."},
  "musallat": {title: "Musallat", genre: "Korku", desc: "Başka bir boyuttan gelen karanlık varlıkların musallat olması ve paranormal kabuslarla dolu ölümcül dehşet."},
  "semum": {title: "Semum", genre: "Korku", desc: "Genç kadının bedenine giren cehennem yaratığı Semum, paranormal dehşet ve şeytani ayinlerle evi cehenneme çevirir."},
  "üç harfliler": {title: "Üç Harfliler", genre: "Korku", desc: "Çocukluğunda yaşadığı kabusları unutan kadının evine musallat olan intikamcı cinler ve ıssız gece dehşeti."},
  "çığlık": {title: "Çığlık (Scream)", genre: "Korku", desc: "Maskeli bir seri katilin telefonla arayarak ölümcül korku oyunları oynadığı ve gençleri kurban ettiği kanlı cinayetler."},
  "scream": {title: "Çığlık (Scream)", genre: "Korku", desc: "Maskeli bir seri katilin telefonla arayarak ölümcül korku oyunları oynadığı ve gençleri kurban ettiği kanlı cinayetler."},
  "testere": {title: "Testere (Saw)", genre: "Korku", desc: "Karanlık bir odada zincirlenmiş kurbanların sadist bir katilin ölümcül dehşet oyunlarında hayatta kalma mücadelesi."},
  "saw": {title: "Testere (Saw)", genre: "Korku", desc: "Karanlık bir odada zincirlenmiş kurbanların sadist bir katilin ölümcül dehşet oyunlarında hayatta kalma mücadelesi."},
  "halka": {title: "Halka (The Ring)", genre: "Korku", desc: "İzleyen herkesin 7 gün sonra öldüğü lanetli bir video kaseti araştıran gazetecinin kuyudan çıkan intikamcı ruh Samara ile karşılaşması."},
  "the ring": {title: "Halka (The Ring)", genre: "Korku", desc: "İzleyen herkesin 7 gün sonra öldüğü lanetli bir video kaseti araştıran gazetecinin kuyudan çıkan intikamcı ruh Samara ile karşılaşması."},
  "the nun": {title: "The Nun", genre: "Korku", desc: "Issız bir manastıra musallat olan kadim şeytani iblis Valak ile ölümcül bir paranormal savaş."},
  "annabelle": {title: "Annabelle", genre: "Korku", desc: "Şeytani bir tarikatın kanlı ayini sonrası lanetlenen antika oyuncak bebeğin getirdiği paranormal dehşet ve ölüm."},
  "korku seansı": {title: "Korku Seansı", genre: "Korku", desc: "İzole bir çiftlik evine musallat olan karanlık ve lanetli bir hayaletin dehşetini durdurmak için ölümcül bir ayin."},
  "the conjuring": {title: "The Conjuring", genre: "Korku", desc: "İzole bir çiftlik evine musallat olan karanlık ve lanetli bir hayaletin dehşetini durdurmak için ölümcül bir ayin."},
  "the shining": {title: "Cinnet (The Shining)", genre: "Korku", desc: "İzole Overlook Oteli'ndeki hayaletler ve paranormal karanlık güçlerin etkisiyle aklını yitirip katile dönüşen yazar."},
  "cinnet": {title: "Cinnet (The Shining)", genre: "Korku", desc: "İzole Overlook Oteli'ndeki hayaletler ve paranormal karanlık güçlerin etkisiyle aklını yitirip katile dönüşen yazar."},
  "it": {title: "O (IT)", genre: "Korku", desc: "Kanalizasyonda yaşayan ve kurbanlarının en büyük korkularını kullanan lanetli iblis palyaço Pennywise'ın dehşeti."},
  "chucky": {title: "Chucky", genre: "Korku", desc: "Ruhunu oyuncak bebeğe aktaran seri katilin evdeki insanlara yaşattığı kanlı cinayetler ve dehşet."},
  "smile": {title: "Smile (Gülümse)", genre: "Korku", desc: "Kurbanlarına bulaşan esrarengiz gülümseme ve ölümcül doğaüstü lanetin dehşeti."},
  "recep ivedik": {title: "Recep İvedik", genre: "Komedi", desc: "Cüzdan sahibini bulmak için otele giden Recep İvedik'in yaşadığı absürt komik olaylar, kahkaha dolu sakarlıklar ve eğlenceli şakalar."},
  "g.o.r.a": {title: "G.O.R.A.", genre: "Komedi", desc: "Uzaylılar tarafından kaçırılan halı tüccarı Arif'in kahkaha dolu esprileri, eğlenceli dostlukları ve absürt uzay komedisi."},
  "gora": {title: "G.O.R.A.", genre: "Komedi", desc: "Uzaylılar tarafından kaçırılan halı tüccarı Arif'in kahkaha dolu esprileri, eğlenceli dostlukları ve absürt uzay komedisi."},
  "a.r.o.g": {title: "A.R.O.G", genre: "Komedi", desc: "Taş devrine yollanan Arif'in ilkel kabilelere futbol öğretmeye çalışırken yarattığı kahkaha dolu eğlenceli komedi macerası."},
  "arog": {title: "A.R.O.G", genre: "Komedi", desc: "Taş devrine yollanan Arif'in ilkel kabilelere futbol öğretmeye çalışırken yarattığı kahkaha dolu eğlenceli komedi macerası."},
  "yahşi batı": {title: "Yahşi Batı", genre: "Komedi", desc: "Osmanlı elçilerinin Vahşi Batı'da yaşadığı kahkaha dolu absürt kovboy komedisi ve eğlenceli maceralar."},
  "kolpaçino": {title: "Kolpaçino", genre: "Komedi", desc: "Kumarhaneye dönen villada yaşanan absürt şakalar, komik yanlış anlamalar ve kahkahalarla dolu eğlenceli mafya macerası."},
  "düğün dernek": {title: "Düğün Dernek", genre: "Komedi", desc: "Sivas'ta acele düğün için para arayan arkadaşların kahkaha dolu sakarlıkları ve eğlenceli komik maceraları."},
  "hababam sınıfı": {title: "Hababam Sınıfı", genre: "Komedi", desc: "Çamlıca Lisesi öğrencilerinin eğlenceli şakaları, kahkaha dolu tuzakları ve unutulmaz neşeli okul komedisi."},
  "ölümlü dünya": {title: "Ölümlü Dünya", genre: "Komedi", desc: "Kiralık katil ailenin örgütle ters düşmesi sonucu yaşadıkları absürt sakar kaçış macerası ve kahkaha dolu komedi."},
  "vizontele": {title: "Vizontele", genre: "Komedi", desc: "Televizyonun ilk kez geldiği kasabada yaşanan neşeli, sıcak ve kahkaha dolu komedi olayları."},
  "scary movie": {title: "Korkunç Bir Film", genre: "Komedi", desc: "Korku filmlerini tiye alan, lisede geçen absürt şakalar ve kahkaha dolu parodilerle bezeli eğlenceli komedi."},
  "korkunç bir film": {title: "Korkunç Bir Film", genre: "Komedi", desc: "Korku filmlerini tiye alan, lisede geçen absürt şakalar ve kahkaha dolu parodilerle bezeli eğlenceli komedi."},
  "buz devri": {title: "Buz Devri", genre: "Komedi", desc: "Tembel hayvan Sid ve arkadaşlarının kahkaha dolu sakarlıkları ve eğlenceli buzul çağı macerası."},
  "shrek": {title: "Shrek", genre: "Komedi", desc: "Bataklıkta yaşayan yeşil dev Shrek ile geveze eşeğin neşeli ve kahkahalarla dolu absürt masal komedisi."},
  "babam ve oğlum": {title: "Babam ve Oğlum", genre: "Dram", desc: "Eşini kaybeden Sadık'ın küçük oğluyla babasının çiftliğine sığınmasıyla başlayan hüzünlü ve duygusal aile dramı, derin aşk acısı ve ayrılık."},
  "ıssız adam": {title: "Issız Adam", genre: "Dram", desc: "Yalnız yaşayan gurme şef ile kitapçı kızın büyük aşkı, ayrılık acısı ve derin melankoliyle son bulan hüzünlü dram hikayesi."},
  "ayla": {title: "Ayla", genre: "Dram", desc: "Kore Savaşı'nda kimsesiz kalan küçük bir kız çocuğunu kurtaran Türk astsubayın yürek burkan duygusal dramı ve ayrılık hikayesi."},
  "müslüm": {title: "Müslüm", genre: "Dram", desc: "Müslüm Gürses'in hayatındaki derin acılar, trajik aile olayları ve büyük aşkıyla yoğrulmuş hüzün dolu biyografik dram hikayesi."},
  "titanik": {title: "Titanik", genre: "Dram", desc: "Batan transatlantik gemisinde filizlenen tutkulu aşk, yürek burkan ayrılık ve hüzün dolu gözyaşı trajedisi."},
  "titanic": {title: "Titanik", genre: "Dram", desc: "Batan transatlantik gemisinde filizlenen tutkulu aşk, yürek burkan ayrılık ve hüzün dolu gözyaşı trajedisi."}
};

function getAutomaticSynopsis(rawTitle){
  const t = rawTitle.trim().toLocaleLowerCase("tr-TR");
  for(const k of Object.keys(knownCatalog)){
    if(t.includes(k) || k.includes(t)){
      return knownCatalog[k];
    }
  }
  
  const comedyWords = ["komik", "şaka", "sakar", "gül", "eğlence", "absürt", "düğün", "dans", "tatil", "arkadaş", "çakal", "patron", "sosyete", "saf", "macera", "avare", "şaban", "recep", "para", "kumar", "çengi"];
  const dramaWords = ["aşk", "ayrılık", "sevgi", "hüzün", "yas", "hasret", "gözyaşı", "baba", "anne", "evlat", "oğul", "kız", "kalp", "kırık", "acı", "veda", "mucize", "kader", "hayat", "melankoli", "yalnız", "sevda"];
  
  if(comedyWords.some(w => t.includes(w))){
    return {
      title: rawTitle,
      genre: "Komedi",
      desc: "“" + rawTitle + "”, baş karakterlerin içine düştüğü absürt ve komik durumları, kahkaha dolu sakarlıkları, eğlenceli şakaları ve gülünç tesadüfleriyle izleyiciyi neşelendiren bir komedi filmidir."
    };
  }
  
  if(dramaWords.some(w => t.includes(w))){
    return {
      title: rawTitle,
      genre: "Dram",
      desc: "“" + rawTitle + "”, yıllar boyu süren hüzünlü bir aşk hikayesini, derin ailevi hesaplaşmaları, ayrılık acısını ve insanın iç dünyasındaki duygusal mücadeleyi anlatan dokunaklı bir dram filmidir."
    };
  }
  
  return {
    title: rawTitle,
    genre: "Korku",
    desc: "“" + rawTitle + "”, terk edilmiş ıssız bir yerde ortaya çıkan esrarengiz paranormal olayları, karanlıkta duyulan fısıltıları ve ölümcül lanetli bir varlığın musallat olduğu dehşet dolu korku anlarını anlatır."
  };
}

function renderMovies(){
  const shown = movies.filter(m => activeFilter === "all" || m.category === activeFilter);
  const countEl = document.getElementById("filmCount");
  if(countEl) countEl.textContent = String(movies.length).padStart(2,"0");
  if(!shown.length){
    movieGrid.innerHTML='<div class="empty-state">Bu kategoride henüz film yok.</div>';
    return;
  }
  movieGrid.innerHTML = shown.map((m,i)=>
    '<article class="movie-card">' +
      '<div class="poster" style="--c1:' + (m.c1||'#39242c') + ';--c2:' + (m.c2||'#9d4050') + '">' +
        '<span class="poster-index">DOSYA / ' + String(i+1).padStart(3,"0") + '</span>' +
        '<span class="poster-symbol" aria-hidden="true">' + (m.symbol||"✦") + '</span>' +
        '<div class="poster-title">' + escapeHTML(m.title) + '</div>' +
      '</div>' +
      '<div class="movie-info">' +
        '<div class="movie-meta"><span>' + escapeHTML(m.genre) + '</span><span>' + (m.year||"2026") + '</span></div>' +
        '<p>' + escapeHTML(m.description) + '</p>' +
        '<div class="card-bottom"><span class="rating">★ ' + (m.rating||"—") + '</span><button class="detail-btn" data-id="' + m.id + '">Dosyayı incele ↗</button></div>' +
      '</div>' +
    '</article>'
  ).join("");
}

function escapeHTML(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function analyzeDescription(text){
  const t = text.toLocaleLowerCase("tr-TR");
  const horror = ["korku","hayalet","lanet","cinayet","katil","öldür","ölüm","perili","iblis","şeytan","paranormal","musallat","mezarlık","karanlık","dehşet","ürküt","canavar","vampir","zombi","kovala","kaybol","lanetlen","ruh","kabus","gizemli","gerilim","cin","kan","kurban","hastane","orman","ıssız","fısıltı","doğaüstü","ölü","ceset"];
  const comedy = ["komedi","komik","kahkaha","eğlenceli","absürt","şaka","espri","güldür","mizah","eğlence","neşeli","romantik komedi"];
  const drama = ["dram","aşk hikayesi","aile dramı","duygusal mücadele","ayrılık","yas","ilişki sorunları","romantik","kalp kırıklığı"];
  
  const count = (words) => words.reduce((n,w)=>n+(t.includes(w)?1:0),0);
  const h = count(horror), c = count(comedy), d = count(drama);
  let predicted = "Belirsiz", score = 0, reason = "Açıklamada türü belirlemeye yetecek kadar ipucu bulunamadı.";
  
  if(h > 0 && h >= c && h >= d){
    predicted = "Korku";
    score = Math.min(.98, .58 + h * .09);
    reason = "Korku temasıyla ilişkili " + h + " anahtar ifade bulundu.";
  } else if(c > 0 && c >= d){
    predicted = "Komedi";
    score = Math.min(.96, .62 + c * .1);
    reason = "Komedi temasıyla ilişkili " + c + " anahtar ifade bulundu.";
  } else if(d > 0){
    predicted = "Dram";
    score = Math.min(.96, .62 + d * .1);
    reason = "Dram temasıyla ilişkili " + d + " anahtar ifade bulundu.";
  } else if(h > 0){
    predicted = "Korku";
    score = .6;
    reason = "Bazı korku temaları tespit edildi.";
  }
  return {predicted, score, reason, h, c, d};
}

function showResult(kind,heading,body,extra){
  result.className = "result " + kind;
  result.innerHTML = "<strong>" + heading + "</strong><div>" + body + "</div>" + (extra ? '<div style="margin-top:7px;opacity:.8">' + extra + '</div>' : "");
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"), 3000);
}

// Film adı yazıldığında açıklamayı otomatik üret
titleInput.addEventListener("input", ()=>{
  const val = titleInput.value.trim();
  if(val.length >= 2){
    const info = getAutomaticSynopsis(val);
    descInput.value = info.desc;
    document.getElementById("charCount").textContent = info.desc.length + " karakter (Otomatik)";
  }
});

form.addEventListener("submit", e=>{
  e.preventDefault();
  const title = titleInput.value.trim();
  if(!title){
    showToast("Lütfen bir film adı yazın.");
    return;
  }
  
  let description = descInput.value.trim();
  const info = getAutomaticSynopsis(title);
  if(!description){
    description = info.desc;
    descInput.value = description;
    document.getElementById("charCount").textContent = description.length + " karakter";
  }
  
  const analysis = analyzeDescription(description);
  
  if(info.genre === "Korku" || (analysis.predicted === "Korku" && analysis.h > 0)){
    if(movies.some(m => m.title.toLocaleLowerCase("tr-TR") === title.toLocaleLowerCase("tr-TR"))){
      showResult("review", "⚠ BU DOSYA ZATEN ARŞİVDE", "Bu isimle kayıtlı bir film bulunuyor.");
      return;
    }
    const newMovie = {
      id: Date.now(),
      title: info.title || title,
      year: new Date().getFullYear(),
      genre: "Yeni Kayıt (Korku)",
      category: "paranormal",
      rating: "8.2",
      symbol: "✧",
      c1: "#35232c",
      c2: "#b3475a",
      description,
      accepted: true
    };
    movies.unshift(newMovie);
    renderMovies();
    showResult("accept", "✓ ARŞİVE KABUL EDİLDİ", "“" + escapeHTML(title) + "” korku arşivine eklendi.", "Otomatik Sinopsis Analizi · Güven Puanı: %" + Math.round((analysis.score || .94)*100));
    showToast("Film arşive eklendi.");
    titleInput.value = "";
    descInput.value = "";
    document.getElementById("charCount").textContent = "0 karakter";
  } else {
    showResult("reject", "✕ ARŞİV KAPISI KAPALI", "“" + escapeHTML(title) + "” bu arşive eklenemez. Model tahmini: " + info.genre + ".", "Bu film korku türü içermiyor. Yalnızca korku filmleri kabul edilir.");
    showToast("Bu film korku arşivine kabul edilmedi.");
  }
});

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderMovies();
  });
});

document.getElementById("openAddTop").addEventListener("click", ()=>{
  document.getElementById("kontrol").scrollIntoView({behavior:"smooth"});
});

movieGrid.addEventListener("click", e=>{
  const btn = e.target.closest(".detail-btn");
  if(!btn) return;
  const movie = movies.find(m => String(m.id) === btn.dataset.id);
  if(!movie) return;
  showToast(movie.title + " — " + movie.genre + " · Demo film dosyası");
});

renderMovies();
