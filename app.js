let araclar = JSON.parse(localStorage.getItem("araclar")) || [];
let hareketler = JSON.parse(localStorage.getItem("hareketler")) || [];
let toplamCiro = parseFloat(localStorage.getItem("toplamCiro")) || 0;

const plakaInput = document.querySelector("#aracplaka");
const aramaInput = document.querySelector("#plakaAra");
const hareketPaneli = document.getElementById("hareketler");
const grid = document.getElementById("grid");
const modal = document.querySelector("#onayModal");
let seciliSlot = null;

function HaritayiOlustur() {
    grid.innerHTML = "";
    let slotSayaci = 1;
    for(let i=1; i<=50; i++) {
        if (i % 5 === 3) {
            const yol = document.createElement("div");
            yol.className = "yol-alani";
            grid.appendChild(yol);
            continue;
        }
        const id = `slot${slotSayaci}`;
        const div = document.createElement("div");
        div.id = id;
        const kayitli = araclar.find(a => a.slotId === id);
        if(kayitli) {
            div.className = "slot dolu";
            div.textContent = kayitli.plaka;
        } else {
            div.className = "slot bos";
            div.textContent = "BOŞ";
        }
        grid.appendChild(div);
        slotSayaci++;
        if(slotSayaci > 40) break;
    }
}

plakaInput.addEventListener("input", function() {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9ÇŞİĞÜÖ]/g, '');
});

aramaInput.addEventListener("input", function() {
    const aranan = this.value.toUpperCase().trim();
    document.querySelectorAll(".slot").forEach(slot => {
        if (aranan === "") {
            slot.classList.remove("arama-bulundu", "arama-soluk"); 
            return;
        }
        if (slot.classList.contains("dolu") && slot.textContent.includes(aranan)) {
            slot.classList.add("arama-bulundu"); 
            slot.classList.remove("arama-soluk");
        } else {
            slot.classList.add("arama-soluk"); 
            slot.classList.remove("arama-bulundu");
        }
    });
});

grid.addEventListener("click", (e) => {
    if(e.target.classList.contains("slot")) {
        document.querySelectorAll(".slot").forEach(s => s.style.borderColor = "transparent");
        e.target.style.borderColor = "#fff";
        seciliSlot = e.target;
        plakaInput.focus();
    }
});

document.querySelector("#ekleBtn").addEventListener("click", () => {
    const plaka = plakaInput.value.trim();
    if(!seciliSlot || seciliSlot.classList.contains("dolu")) return MesajGoster("Önce boş yer seç!","hata");
    if(!/^[0-9]{2}[A-ZÇŞİĞÜÖ]{1,3}[0-9]{2,4}$/.test(plaka)) return MesajGoster("Plaka hatalı!","hata");
    
    seciliSlot.textContent = plaka;
    seciliSlot.className = "slot dolu";
    araclar.push({ plaka, slotId: seciliSlot.id, girisZamani: new Date().toISOString() });
    localStorage.setItem("araclar", JSON.stringify(araclar));
    plakaInput.value = "";
    GuncelleOzet();
    MesajGoster("Giriş Başarılı", "basari");
});

// YENİ: PLAKA GÜNCELLEME BUTONU (SÜREYİ KORUR)
document.querySelector("#updateBtn").addEventListener("click", () => {
    const yeniPlaka = plakaInput.value.trim().toUpperCase();
    if(!seciliSlot || !seciliSlot.classList.contains("dolu")) return MesajGoster("Önce dolu bir yer seç!","hata");
    if(!/^[0-9]{2}[A-ZÇŞİĞÜÖ]{1,3}[0-9]{2,4}$/.test(yeniPlaka)) return MesajGoster("Yeni plaka hatalı!","hata");

    const index = araclar.findIndex(a => a.slotId === seciliSlot.id);
    if(index !== -1) {
        araclar[index].plaka = yeniPlaka; // Sadece plakayı değiştiriyoruz, giriş zamanı sabit kalıyor.
        localStorage.setItem("araclar", JSON.stringify(araclar));
        seciliSlot.textContent = yeniPlaka;
        plakaInput.value = "";
        MesajGoster("Plaka güncellendi, süre devam ediyor", "basari");
    }
});

document.querySelector("#silBtn").addEventListener("click", () => {
    if(!seciliSlot || !seciliSlot.classList.contains("dolu")) return MesajGoster("Dolu bir yer seç!","hata");
    
    const index = araclar.findIndex(a => a.slotId === seciliSlot.id);
    const arac = araclar[index];
    const giris = new Date(arac.girisZamani);
    const cikis = new Date();
    const farkMs = cikis - giris;
    const toplamSaat = Math.floor(farkMs / (1000 * 60 * 60)); 
    
    let ucret = (toplamSaat >= 1) ? toplamSaat * 40 : 0;
    toplamCiro += ucret;
    localStorage.setItem("toplamCiro", toplamCiro);
    
    HareketBlokEkle(arac.plaka, giris.toLocaleTimeString(), cikis.toLocaleTimeString(), `${toplamSaat} saat`, ucret);
    araclar.splice(index, 1);
    localStorage.setItem("araclar", JSON.stringify(araclar));
    
    seciliSlot.textContent = "BOŞ";
    seciliSlot.className = "slot bos";
    GuncelleOzet();
    MesajGoster(ucret > 0 ? `${ucret} TL Alındı` : "Ücretsiz Çıkış", "basari");
});

document.querySelector("#sifirlaBtn").addEventListener("click", () => modal.style.display = "flex");
document.querySelector("#vazgecBtn").addEventListener("click", () => modal.style.display = "none");
document.querySelector("#kesinSifirlaBtn").addEventListener("click", () => {
    toplamCiro = 0;
    localStorage.setItem("toplamCiro", 0);
    GuncelleOzet();
    modal.style.display = "none";
    MesajGoster("Ciro sıfırlandı aga!", "basari");
});

function GuncelleOzet() {
    const dolular = document.querySelectorAll(".slot.dolu").length;
    document.querySelector("#dolusayisi").textContent = `Dolu: ${dolular}`;
    document.querySelector("#bossayisi").textContent = `Boş: ${40 - dolular}`;
    document.querySelector("#gunlukCiro").textContent = `💰 Ciro: ${toplamCiro} TL`;
}

function HareketBlokEkle(plaka, giris, cikis, sure, ucret, kaydet = true) {
    const blok = document.createElement("div");
    blok.className = "hareket-blok";
    blok.innerHTML = `<strong>🚗 ${plaka}</strong><br>Çıkış: ${cikis} | 💰 ${ucret} TL<br>Süre: ${sure}`;
    hareketPaneli.prepend(blok);
    if(kaydet) {
        hareketler.unshift({plaka, giris, cikis, sure, ucret});
        if(hareketler.length > 40) hareketler.pop();
        localStorage.setItem("hareketler", JSON.stringify(hareketler));
    }
}

function MesajGoster(m, t) {
    const k = document.getElementById("mesaj");
    k.textContent = m; k.className = `goster ${t}`;
    setTimeout(() => k.className = "", 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    HaritayiOlustur();
    [...hareketler].reverse().forEach(h => HareketBlokEkle(h.plaka, h.giris, h.cikis, h.sure, h.ucret, false));
    GuncelleOzet();
    setInterval(() => document.getElementById("saat").textContent = new Date().toLocaleTimeString(), 1000);
});

const tBtn = document.getElementById("Tema");
tBtn.addEventListener("click", () => {
    document.body.classList.toggle("Beyaz-mode");
    const m = document.body.classList.contains("Beyaz-mode") ? "beyaz" : "koyu";
    localStorage.setItem("tema", m);
    tBtn.textContent = m === "beyaz" ? "🌙" : "☀️";
});
if(localStorage.getItem("tema") === "beyaz") { document.body.classList.add("Beyaz-mode"); tBtn.textContent = "🌙"; }
