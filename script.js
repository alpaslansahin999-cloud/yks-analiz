// ==========================================
// 1. SEKME YÖNETİMİ VE ARAYÜZ (DÜZELTİLDİ)
// ==========================================
function sekmeDegistir(sekmeId, tiklananButon) {
    // 1. Tüm butonların ve içeriklerin aktifliğini kaldır
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(icerik => icerik.classList.remove('active-content'));
    
    // 2. Tıklanan butonu aktif et (HTML'den 'this' ile gönderilen obje)
    if (tiklananButon) {
        tiklananButon.classList.add('active');
    }
    
    // 3. İlgili içeriği göster
    let hedefSekme = document.getElementById(sekmeId + 'Sekmesi');
    if (hedefSekme) {
        hedefSekme.classList.add('active-content');
    }
    
    // 4. Sonuç ekranlarını temizle
    document.getElementById("sonucEkrani").style.display = "none";
    document.getElementById("raporBtn").style.display = "none";
    document.getElementById("detayliRapor").style.display = "none";
}

function alanKontrol() {
    let alan = document.getElementById("alanSecimi").value;
    let ayt1 = document.getElementById("aytKarti");
    let ayt2 = document.getElementById("pAytKarti");
    
    if (alan === "TYT") {
        if(ayt1) ayt1.classList.add("disabled-card");
        if(ayt2) ayt2.classList.add("disabled-card");
    } else {
        if(ayt1) ayt1.classList.remove("disabled-card");
        if(ayt2) ayt2.classList.remove("disabled-card");
    }
}

// ==========================================
// 2. OBP VE ORTAK VERİ YÖNETİMİ
// ==========================================
function ortakVerileriAl(hedefSartMi = true) {
    let alan = document.getElementById("alanSecimi").value;
    let obpGirdi = parseFloat(document.getElementById("obp").value);
    let hedefSiralama = parseInt(document.getElementById("hedefSiralama").value) || 0;
    let kalanGun = parseInt(document.getElementById("kalanGun").value) || 0;
    let kirikObp = document.getElementById("kirikObp").checked;

    if (isNaN(obpGirdi)) {
        alert("Lütfen Diploma Notunuzu veya OBP Puanınızı giriniz."); return null;
    }

    let gercekObp = obpGirdi;
    if (obpGirdi > 100 && obpGirdi <= 500) { gercekObp = obpGirdi / 5; } 
    else if (obpGirdi < 50 || obpGirdi > 500) {
        alert("Geçersiz değer: Lütfen Diploma Notu (50-100) veya YKS OBP Puanı (250-500) giriniz."); return null;
    }

    if (hedefSartMi && (hedefSiralama < 1 || kalanGun < 1)) {
        alert("Hedef Sıralama ve Kalan Gün bilgileri simülasyon için zorunludur."); return null;
    }
    
    let obpKatkisi = kirikObp ? (gercekObp * 0.3) : (gercekObp * 0.6);
    return { alan, obpKatkisi, hedefSiralama, kalanGun, kirikObp, gercekObp };
}

function f25(val) { return (Math.ceil(val * 4) / 4).toFixed(2); }

// ==========================================
// 3. YASAL NET JENERATÖRÜ 
// ==========================================
const validNetsCache = {};
function generateValidNets(maxQ) {
    if(validNetsCache[maxQ]) return validNetsCache[maxQ];
    let set = new Set();
    for(let c=0; c<=maxQ; c++) {
        for(let w=0; w<=(maxQ-c); w++) {
            set.add(c - w * 0.25);
        }
    }
    let arr = Array.from(set).sort((a,b) => a-b);
    validNetsCache[maxQ] = arr;
    return arr;
}

function getNextValidNet(current, maxQ) {
    let arr = generateValidNets(maxQ);
    for(let i=0; i<arr.length; i++) {
        if(arr[i] > current) return arr[i];
    }
    return current;
}

// ==========================================
// 4. ÇİFT ÇIPALI 2024 YIĞILMA MATRİSİ 
// ==========================================
const yigilmaHam = {
    "TYT": [ {p:500,s:1}, {p:480,s:2000}, {p:460.3,s:7300}, {p:440,s:20000}, {p:420,s:40000}, {p:400,s:62000}, {p:385.5,s:80300}, {p:370,s:105000}, {p:350,s:145000}, {p:330,s:210000}, {p:300,s:350000}, {p:250,s:1000000}, {p:200,s:1800000}, {p:0,s:3000000} ],
    "SAY": [ {p:500,s:1}, {p:480,s:1000}, {p:460,s:4000}, {p:439.5,s:10083}, {p:420,s:20000}, {p:400,s:35000}, {p:380,s:60000}, {p:360,s:90000}, {p:340,s:125000}, {p:320,s:170000}, {p:300,s:220000}, {p:250,s:380000}, {p:200,s:650000}, {p:0,s:1500000} ],
    "EA":  [ {p:500,s:1}, {p:460,s:1000}, {p:420,s:4000}, {p:400,s:8000}, {p:380,s:14000}, {p:340,s:32000}, {p:320,s:50000}, {p:300,s:80000}, {p:280,s:130000}, {p:250,s:220000}, {p:200,s:500000}, {p:0,s:1200000} ],
    "SOZ": [ {p:500,s:1}, {p:460,s:500}, {p:420,s:3000}, {p:400,s:8000}, {p:380,s:15000}, {p:360,s:25000}, {p:340,s:40000}, {p:320,s:60000}, {p:300,s:90000}, {p:280,s:140000}, {p:250,s:250000}, {p:200,s:500000}, {p:0,s:1000000} ]
};

const yigilmaYerlesme = {
    "TYT": [ {p:560,s:1}, {p:540,s:2000}, {p:514.8,s:9170}, {p:490,s:25000}, {p:470,s:45000}, {p:450,s:70000}, {p:424.5,s:107725}, {p:400,s:155000}, {p:380,s:220000}, {p:360,s:330000}, {p:340,s:480000}, {p:300,s:900000}, {p:250,s:1600000}, {p:0,s:3000000} ],
    "SAY": [ {p:560,s:1}, {p:540,s:1000}, {p:520,s:3500}, {p:494.0,s:11172}, {p:470,s:22000}, {p:450,s:38000}, {p:420,s:75000}, {p:390,s:120000}, {p:360,s:180000}, {p:330,s:250000}, {p:300,s:340000}, {p:250,s:600000}, {p:0,s:1500000} ],
    "EA":  [ {p:560,s:1}, {p:520,s:1000}, {p:480,s:4000}, {p:450,s:8000}, {p:420,s:18000}, {p:380,s:45000}, {p:350,s:85000}, {p:320,s:140000}, {p:290,s:220000}, {p:250,s:400000}, {p:0,s:1200000} ],
    "SOZ": [ {p:560,s:1}, {p:520,s:500}, {p:480,s:2000}, {p:450,s:6000}, {p:420,s:15000}, {p:400,s:25000}, {p:380,s:45000}, {p:360,s:70000}, {p:340,s:100000}, {p:320,s:140000}, {p:300,s:200000}, {p:250,s:400000}, {p:0,s:1000000} ]
};

function siralamayaCevir(puan, alan, isHam = false) {
    let tablo = isHam ? yigilmaHam[alan] : yigilmaYerlesme[alan];
    let maxP = isHam ? 500 : 560;
    if (puan >= maxP) return 1;

    for (let i = 0; i < tablo.length - 1; i++) {
        if (puan <= tablo[i].p && puan > tablo[i+1].p) {
            let oran = (puan - tablo[i+1].p) / (tablo[i].p - tablo[i+1].p);
            return Math.floor(tablo[i+1].s - ((tablo[i+1].s - tablo[i].s) * oran));
        }
    }
    return tablo[tablo.length - 1].s;
}

// ==========================================
// 5. MERKEZİ MOTOR 
// ==========================================
function masterHesapla(alan, obpKatkisi, n) {
    let tTr_p  = (n.tr || 0)  * 3.3;
    let tMat_p = (n.mat || 0) * 3.4;
    let tSos_p = (n.sos || 0) * 3.4;
    let tFen_p = (n.fen || 0) * 3.4;

    let tytNetPuani = tTr_p + tMat_p + tSos_p + tFen_p;
    let tytHam = 100 + tytNetPuani;
    let alanHam = 100 + (tytNetPuani * 0.4); 

    if (alan === "TYT") {
        alanHam = tytHam;
    } else if (alan === "SAY") {
        alanHam += ((n.aMat || 0) * 3.0) + ((n.aFiz || 0) * 2.85) + ((n.aKim || 0) * 3.07) + ((n.aBiy || 0) * 3.07);
    } else if (alan === "EA") {
        alanHam += ((n.aMat || 0) * 3.0) + ((n.aEd || 0) * 3.0) + ((n.aTar1 || 0) * 2.8) + ((n.aCog1 || 0) * 3.33);
    } else if (alan === "SOZ") {
        alanHam += ((n.aEd || 0) * 3.0) + ((n.aTar1 || 0) * 2.8) + ((n.aCog1 || 0) * 3.33) + ((n.aTar2 || 0) * 2.91) + ((n.aCog2 || 0) * 2.91) + ((n.aFel || 0) * 3.0) + ((n.aDin || 0) * 3.33);
    }

    let tytHamSira = siralamayaCevir(tytHam, "TYT", true);
    let alanHamSira = siralamayaCevir(alanHam, alan, true);

    let tytYerPuan = tytHam + obpKatkisi;
    let tytYerSira = siralamayaCevir(tytYerPuan, "TYT", false);

    let alanYerPuan = alanHam + obpKatkisi;
    let alanYerSira = siralamayaCevir(alanYerPuan, alan, false);

    return { 
        tytHamPuan: tytHam, tytHamSira: tytHamSira, tytYerPuan: tytYerPuan, tytYerSira: tytYerSira, 
        alanHamPuan: alanHam, alanHamSira: alanHamSira, alanYerPuan: alanYerPuan, alanYerSira: alanYerSira 
    };
}

let hData = {}, gOlasilik = 0, gAlan = "", gHedefIstenen = 0, gObpMetni = "", gObpKatkisi = 0;


// ==========================================
// ⭐ ADSTERRA REKLAM SİSTEMİ (SORUNSUZ HALİ) ⭐
// ==========================================
function reklamOynat(mesaj, callback) {
    // 1. Önceki sonuçları gizle
    document.getElementById("sonucEkrani").style.display = "none";
    document.getElementById("raporBtn").style.display = "none";
    document.getElementById("detayliRapor").style.display = "none";
    
    // 2. Adsterra Linkini yeni sekmede aç (Para Kazandıran Kısım)
    window.open("https://www.profitableratecpmnetwork.com/p6sn97m6?key=78ad20d9a14e1cdc3312774076d4844e", "_blank");

    // 3. Reklam bekleme alanını (Zaten HTML'de var olan reklamAlani) göster
    let reklamDiv = document.getElementById("reklamAlani");
    let kalanSaniye = 10; 
    
    reklamDiv.innerHTML = `
        <div class="spinner" style="margin:20px auto;"></div>
        <p style="color:#64748b; font-size:15px; font-weight:600; text-align:center;">${mesaj}</p>
        <p style="color:#e74c3c; font-size:16px; font-weight:bold; text-align:center;">
            Sonuçlar için <span id="saniyeGosterge">${kalanSaniye}</span> saniye bekleyiniz...
        </p>
    `;
    reklamDiv.style.display = "block";
    reklamDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 4. Geri sayım
    let geriSayim = setInterval(() => {
        kalanSaniye--;
        let gosterge = document.getElementById("saniyeGosterge");
        if (gosterge) gosterge.innerText = kalanSaniye;

        // Süre bitince
        if (kalanSaniye <= 0) {
            clearInterval(geriSayim);
            reklamDiv.style.display = "none"; // Reklam ekranını kapat
            
            // Asıl hesaplama (anlikHesapla vb.) fonksiyonunu çalıştır
            callback(); 
            document.getElementById("sonucEkrani").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 1000); 
}

// ==========================================
// SEKME 1: ANLIK HESAPLAMA
// ==========================================
function anlikHesapla() {
    let veriler = ortakVerileriAl(false);
    if (!veriler) return;

    reklamOynat("Sistem Yükleniyor... (Sponsorlu Bağlantıya Yönlendiriliyorsunuz)", () => {
        let n = {
            tr: parseFloat(document.getElementById("pTr").value) || 0, 
            mat: parseFloat(document.getElementById("pMat").value) || 0,
            sos: parseFloat(document.getElementById("pSos").value) || 0, 
            fen: parseFloat(document.getElementById("pFen").value) || 0,
            aMat: parseFloat(document.getElementById("pAMat").value) || 0, 
            aFiz: parseFloat(document.getElementById("pAFiz").value) || 0,
            aKim: parseFloat(document.getElementById("pAKim").value) || 0, 
            aBiy: parseFloat(document.getElementById("pABiy").value) || 0,
            aEd: parseFloat(document.getElementById("pAEd").value) || 0, 
            aTar1: parseFloat(document.getElementById("pATar1").value) || 0,
            aCog1: parseFloat(document.getElementById("pACog1").value) || 0, 
            aTar2: parseFloat(document.getElementById("pATar2").value) || 0,
            aCog2: parseFloat(document.getElementById("pACog2").value) || 0, 
            aFel: parseFloat(document.getElementById("pAFel").value) || 0,
            aDin: parseFloat(document.getElementById("pADin").value) || 0
        };

        let res = masterHesapla(veriler.alan, veriler.obpKatkisi, n);

        let html = `
            <h4 style="margin-top:0; color:#0f172a;">📊 Puan ve Sıralama Sonucunuz</h4>
            <div style="overflow-x:auto;">
            <table class="report-table" style="margin-bottom:0; min-width:600px; text-align:center;">
                <tr><th style="text-align:left;">Puan Türü</th><th>Tahmini Puan</th><th>Ham Sıra</th><th>OBP Puanı</th><th>Yerleştirme Puanı</th><th>Yerleştirme Sırası</th></tr>
                <tr>
                    <td style="text-align:left;"><strong>TYT</strong></td>
                    <td>${res.tytHamPuan.toFixed(2)}</td><td>${res.tytHamSira.toLocaleString()}</td><td style="color:#059669;">+ ${veriler.obpKatkisi.toFixed(2)}</td>
                    <td>${res.tytYerPuan.toFixed(2)}</td><td><strong style="color:#2563eb; font-size:15px;">${res.tytYerSira.toLocaleString()}</strong></td>
                </tr>`;
        if (veriler.alan !== "TYT") {
            let alanIsmi = veriler.alan === "SAY" ? "Sayısal" : veriler.alan === "EA" ? "Eşit Ağırlık" : "Sözel";
            html += `
                <tr>
                    <td style="text-align:left;"><strong>${alanIsmi}</strong></td>
                    <td>${res.alanHamPuan.toFixed(2)}</td><td>${res.alanHamSira.toLocaleString()}</td><td style="color:#059669;">+ ${veriler.obpKatkisi.toFixed(2)}</td>
                    <td>${res.alanYerPuan.toFixed(2)}</td><td><strong style="color:#2563eb; font-size:15px;">${res.alanYerSira.toLocaleString()}</strong></td>
                </tr>`;
        }
        html += `</table></div>`;
        
        document.getElementById("sonucEkrani").innerHTML = html;
        document.getElementById("sonucEkrani").style.display = "block";
        document.getElementById("raporBtn").style.display = "none"; 
    });
}

// ==========================================
// SEKME 2: İHTİMAL SİMÜLATÖRÜ 
// ==========================================
function normalDagilim(ortalama, standartSapma) {
    let u = 0, v = 0; while(u === 0) u = Math.random(); while(v === 0) v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); 
    return Math.max(0, ortalama + (z * standartSapma));
}
const clamp = (val, max) => Math.min(max, Math.max(0, val));

function simulasyonuBaslat() {
    let veriler = ortakVerileriAl(true);
    if (!veriler) return;
    
    reklamOynat("10.000 Simülasyon Senaryosu Analiz Ediliyor...", () => {
        let n = {
            tr: parseFloat(document.getElementById("tTrH").value) || 0, mat: parseFloat(document.getElementById("tMatH").value) || 0,
            sos: parseFloat(document.getElementById("tSosH").value) || 0, fen: parseFloat(document.getElementById("tFenH").value) || 0,
            aMat: parseFloat(document.getElementById("aMatH").value) || 0, aFiz: parseFloat(document.getElementById("aFizH").value) || 0,
            aKim: parseFloat(document.getElementById("aKimH").value) || 0, aBiy: parseFloat(document.getElementById("aBiyH").value) || 0,
            aEd: parseFloat(document.getElementById("aEdH").value) || 0, aTar1: parseFloat(document.getElementById("aTar1H").value) || 0,
            aCog1: parseFloat(document.getElementById("aCog1H").value) || 0, aTar2: parseFloat(document.getElementById("aTar2H").value) || 0,
            aCog2: parseFloat(document.getElementById("aCog2H").value) || 0, aFel: parseFloat(document.getElementById("aFelH").value) || 0,
            aDin: parseFloat(document.getElementById("aDinH").value) || 0
        };

        gAlan = veriler.alan === "TYT" ? "Sadece TYT" : veriler.alan === "SAY" ? "Sayısal" : veriler.alan === "EA" ? "Eşit Ağırlık" : "Sözel";
        gObpKatkisi = veriler.obpKatkisi;
        gObpMetni = veriler.kirikObp ? "Kırık OBP" : "Normal OBP";
        gHedefIstenen = veriler.hedefSiralama;
        hData = masterHesapla(veriler.alan, gObpKatkisi, n); 

        let basarili = 0;
        for(let i=0; i<10000; i++) {
            let sim = {
                tr: clamp(normalDagilim(n.tr, 2.0), 40), mat: clamp(normalDagilim(n.mat, 2.5), 40), sos: clamp(normalDagilim(n.sos, 1.5), 20), fen: clamp(normalDagilim(n.fen, 1.5), 20),
                aMat: clamp(normalDagilim(n.aMat, 2.5), 40), aFiz: clamp(normalDagilim(n.aFiz, 1.5), 14), aKim: clamp(normalDagilim(n.aKim, 1.5), 13), aBiy: clamp(normalDagilim(n.aBiy, 1.5), 13),
                aEd: clamp(normalDagilim(n.aEd, 2.0), 24), aTar1: clamp(normalDagilim(n.aTar1, 1.5), 10), aCog1: clamp(normalDagilim(n.aCog1, 1.0), 6),
                aTar2: clamp(normalDagilim(n.aTar2, 1.5), 11), aCog2: clamp(normalDagilim(n.aCog2, 1.5), 11), aFel: clamp(normalDagilim(n.aFel, 1.5), 12), aDin: clamp(normalDagilim(n.aDin, 1.0), 6)
            };
            let simRes = masterHesapla(veriler.alan, gObpKatkisi, sim);
            if (simRes.alanYerSira <= veriler.hedefSiralama) basarili++;
        }

        gOlasilik = (basarili / 10000) * 100;
        document.getElementById("sonucEkrani").innerHTML = `
            <strong>🎯 Sınav Simülasyonu Sonucu:</strong><br><br>
            Girdiğiniz <strong>hedef netlere</strong> ulaştığınız senaryoda, sınav günü yaşanacak stres faktörleri hesaba katıldığında ${veriler.hedefSiralama.toLocaleString()} hedefine ulaşma ihtimaliniz: <strong style="font-size:18px; color:#2563eb;">%${gOlasilik.toFixed(1)}</strong>
        `;
        document.getElementById("sonucEkrani").style.display = "block";
        document.getElementById("raporBtn").style.display = "block"; 
    });
}

// ==========================================
// SEKME 3: HEDEF İÇİN GEREKEN NETLER 
// ==========================================
function gerekenNetleriBul() {
    let veriler = ortakVerileriAl(true);
    if (!veriler) return;
    
    reklamOynat("Yapay Zeka Kombinasyonu Analiz Ediyor... (Reklam)", () => {
        let n = { tr:10, mat:5, sos:5, fen:2, aMat:5, aFiz:2, aKim:2, aBiy:2, aEd:5, aTar1:2, aCog1:2, aTar2:2, aCog2:2, aFel:2, aDin:2 };
        
        let hedefler = [];
        if (veriler.alan === "TYT") { hedefler = [{k:'tr', m:40}, {k:'mat', m:40}, {k:'tr', m:40}, {k:'mat', m:40}, {k:'sos', m:20}, {k:'fen', m:20}]; } 
        else if (veriler.alan === "SAY") { hedefler = [{k:'aMat', m:40}, {k:'tr', m:40}, {k:'aMat', m:40}, {k:'mat', m:40}, {k:'aFiz', m:14}, {k:'aKim', m:13}, {k:'aBiy', m:13}, {k:'tr', m:40}, {k:'mat', m:40}]; } 
        else if (veriler.alan === "EA") { hedefler = [{k:'aMat', m:40}, {k:'aEd', m:24}, {k:'tr', m:40}, {k:'mat', m:40}, {k:'aMat', m:40}, {k:'aTar1', m:10}, {k:'aCog1', m:6}]; } 
        else if (veriler.alan === "SOZ") { hedefler = [{k:'aEd', m:24}, {k:'tr', m:40}, {k:'aEd', m:24}, {k:'sos', m:20}, {k:'aTar1', m:10}, {k:'aCog1', m:6}, {k:'aTar2', m:11}, {k:'aCog2', m:11}, {k:'aFel', m:12}]; }

        let sira = 3000000;
        let sayac = 0;
        let oncekiSira = sira;

        while (sira > veriler.hedefSiralama && sayac < 10000) {
            let hd = hedefler[sayac % hedefler.length];
            n[hd.k] = getNextValidNet(n[hd.k], hd.m);
            
            let p = masterHesapla(veriler.alan, veriler.obpKatkisi, n);
            sira = p.alanYerSira;
            sayac++;
            if (sayac % hedefler.length === 0) { if (oncekiSira === sira) break; oncekiSira = sira; }
        }

        let aytGosterim = veriler.alan === "TYT" ? `<p>AYT Gerekmiyor.</p>` :
            veriler.alan === "SAY" ? `<strong>AYT:</strong> Mat ${f25(n.aMat)} | Fiz ${f25(n.aFiz)} | Kim ${f25(n.aKim)} | Biy ${f25(n.aBiy)}` :
            veriler.alan === "EA" ? `<strong>AYT:</strong> Mat ${f25(n.aMat)} | Ed ${f25(n.aEd)} | Tar-1 ${f25(n.aTar1)} | Coğ-1 ${f25(n.aCog1)}` :
            `<strong>AYT:</strong> Ed ${f25(n.aEd)} | Tar-1 ${f25(n.aTar1)} | Coğ-1 ${f25(n.aCog1)} | Tar-2 ${f25(n.aTar2)} | Coğ-2 ${f25(n.aCog2)} | Fel ${f25(n.aFel)} | Din ${f25(n.aDin)}`;

        document.getElementById("sonucEkrani").innerHTML = `
            <h4 style="margin-top:0;">🎯 ${veriler.hedefSiralama.toLocaleString()} Sıralama İçin Mümkün Olan Net Dağılımı</h4>
            <strong>TYT:</strong> Türkçe ${f25(n.tr)} | Mat ${f25(n.mat)} | Sos ${f25(n.sos)} | Fen ${f25(n.fen)}<br><br>
            ${aytGosterim}
        `;
        document.getElementById("sonucEkrani").style.display = "block";
        document.getElementById("raporBtn").style.display = "none"; 
    });
}

// ==========================================
// ŞEFFAF RAPOR EKRANI 
// ==========================================
function detayliRaporuUret() {
    let rapor = `
        <div class="report-header">
            <h4>📋 YKS Strateji Raporu (OBP Dökümlü)</h4>
            <span style="font-size:12px; font-weight:normal; opacity:0.8;">Gerçekçi Ham ve Yerleştirme Analizi (2024 Kalibreli)</span>
        </div>
        <div class="report-body">
            <h5 style="margin-top:0; font-size:15px;">🔍 Hedef Netlerinizin Karşılığı