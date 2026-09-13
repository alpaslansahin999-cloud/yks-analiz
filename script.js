// ==========================================
// 1. SEKME YÖNETİMİ VE ARAYÜZ
// ==========================================
function sekmeDegistir(sekmeId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(icerik => icerik.classList.remove('active-content'));
    event.target.classList.add('active');
    document.getElementById(sekmeId + 'Sekmesi').classList.add('active-content');
    
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
// 2. ORTAK VERİ YÖNETİMİ
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
// 3. YASAL NET JENERATÖRÜ (Hayalet Netleri Engeller)
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
// 4. KUSURSUZ 2024 YIĞILMA MATRİSİ 
// ==========================================
const yigilmaHam = {
    "TYT": [ {p:500,s:1}, {p:480,s:2000}, {p:461.597,s:7447}, {p:440,s:20000}, {p:420,s:45000}, {p:400,s:80000}, {p:380,s:130000}, {p:360,s:200000}, {p:340,s:280000}, {p:320,s:380000}, {p:300,s:550000}, {p:250,s:1200000}, {p:200,s:2000000}, {p:0,s:3000000} ],
    "SAY": [ {p:500,s:1}, {p:480,s:1000}, {p:460,s:4000}, {p:443.656,s:10083}, {p:420,s:22000}, {p:400,s:40000}, {p:380,s:65000}, {p:360,s:95000}, {p:340,s:135000}, {p:320,s:180000}, {p:300,s:230000}, {p:250,s:380000}, {p:200,s:650000}, {p:0,s:1500000} ],
    "EA":  [ {p:500,s:1}, {p:460,s:1000}, {p:420,s:4000}, {p:400,s:8000}, {p:380,s:14000}, {p:355.565,s:22971}, {p:340,s:32000}, {p:320,s:50000}, {p:300,s:80000}, {p:280,s:130000}, {p:250,s:220000}, {p:200,s:500000}, {p:0,s:1200000} ],
    "SOZ": [ {p:500,s:1}, {p:460,s:500}, {p:420,s:3000}, {p:400,s:8000}, {p:380,s:15000}, {p:360,s:25000}, {p:340,s:40000}, {p:320,s:60000}, {p:300,s:90000}, {p:280,s:140000}, {p:250,s:250000}, {p:200,s:500000}, {p:0,s:1000000} ]
};

const yigilmaYerlesme = {
    "TYT": [ {p:560,s:1}, {p:540,s:2000}, {p:516.173,s:9177}, {p:500,s:15000}, {p:480,s:35000}, {p:450,s:85000}, {p:420,s:160000}, {p:400,s:230000}, {p:380,s:330000}, {p:360,s:450000}, {p:340,s:600000}, {p:320,s:800000}, {p:300,s:1050000}, {p:250,s:1800000}, {p:0,s:3000000} ],
    "SAY": [ {p:560,s:1}, {p:540,s:1000}, {p:520,s:3500}, {p:498.232,s:11172}, {p:480,s:18000}, {p:450,s:40000}, {p:420,s:80000}, {p:390,s:130000}, {p:360,s:190000}, {p:330,s:260000}, {p:300,s:350000}, {p:250,s:600000}, {p:0,s:1500000} ],
    "EA":  [ {p:560,s:1}, {p:520,s:1000}, {p:480,s:4000}, {p:450,s:8000}, {p:420,s:18000}, {p:410.141,s:24493}, {p:380,s:45000}, {p:350,s:85000}, {p:320,s:140000}, {p:290,s:220000}, {p:250,s:400000}, {p:0,s:1200000} ],
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
// 5. MERKEZİ MOTOR (Tüm Sekmelerin Bağlandığı Tek Beyin)
// ==========================================
function masterHesapla(alan, obpKatkisi, n) {
    let tTr_p  = (n.tr || 0)  * 3.181;
    let tMat_p = (n.mat || 0) * 3.649;
    let tSos_p = (n.sos || 0) * 3.245;
    let tFen_p = (n.fen || 0) * 3.385;

    let tytNetPuani = tTr_p + tMat_p + tSos_p + tFen_p;
    let tytHam = 100 + tytNetPuani;
    let alanHam = 100 + (tytNetPuani * 0.4); 

    if (alan === "TYT") {
        alanHam = tytHam;
    } else if (alan === "SAY") {
        alanHam += ((n.aMat || 0) * 3.667) + ((n.aFiz || 0) * 2.516) + ((n.aKim || 0) * 2.516) + ((n.aBiy || 0) * 2.516);
    } else if (alan === "EA") {
        alanHam += ((n.aMat || 0) * 3.667) + ((n.aEd || 0) * 2.800) + ((n.aTar1 || 0) * 3.000) + ((n.aCog1 || 0) * 3.330);
    } else if (alan === "SOZ") {
        alanHam += ((n.aEd || 0) * 2.800) + ((n.aTar1 || 0) * 3.000) + ((n.aCog1 || 0) * 3.330) + ((n.aTar2 || 0) * 3.000) + ((n.aCog2 || 0) * 3.000) + ((n.aFel || 0) * 3.000) + ((n.aDin || 0) * 3.000);
    }

    let tytHamSira = siralamayaCevir(tytHam, "TYT", true);
    let alanHamSira = siralamayaCevir(alanHam, alan, true);

    let tytYerPuan = tytHam + obpKatkisi;
    let tytYerSira = siralamayaCevir(tytYerPuan, "TYT", false);

    let alanYerPuan = alanHam + obpKatkisi;
    let alanYerSira = siralamayaCevir(alanYerPuan, alan, false);

    // KESİN DÜZELTME: Rapor çökmemesi için isimler birebir doğru gönderiliyor
    return { 
        tytHamPuan: tytHam, 
        tytHamSira: tytHamSira, 
        tytYerPuan: tytYerPuan, 
        tytYerSira: tytYerSira, 
        alanHamPuan: alanHam, 
        alanHamSira: alanHamSira, 
        alanYerPuan: alanYerPuan, 
        alanYerSira: alanYerSira 
    };
}

// Global Rapor İletişim Değişkenleri (Hepsini Senkronize Edeceğiz)
let hData = {}, gOlasilik = 0, gAlan = "", gHedefIstenen = 0, gObpMetni = "", gObpKatkisi = 0;

// REKLAM MOTORU
function reklamOynat(mesaj, callback) {
    document.getElementById("sonucEkrani").style.display = "none";
    document.getElementById("raporBtn").style.display = "none";
    document.getElementById("detayliRapor").style.display = "none";
    
    let reklamDiv = document.getElementById("reklamAlani");
    reklamDiv.innerHTML = `<div class="spinner"></div><p style="color:#64748b; font-size:14px; font-weight:600;">${mesaj}</p>`;
    reklamDiv.style.display = "block";
    reklamDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
        reklamDiv.style.display = "none";
        callback(); 
        document.getElementById("sonucEkrani").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 3000); 
}

// ==========================================
// SEKME 1: ANLIK HESAPLAMA (REKLAMLI)
// ==========================================
function anlikHesapla() {
    let veriler = ortakVerileriAl(false);
    if (!veriler) return;

    reklamOynat("Sonuçlar Hesaplanıyor... (Sponsorlu Reklam)", () => {
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
        
        // GLOBAL VERİLERİ GÜNCELLE (Raporun çökmemesi için KESİN ŞARTTIR)
        hData = res;
        gAlan = veriler.alan === "TYT" ? "Sadece TYT" : veriler.alan === "SAY" ? "Sayısal" : veriler.alan === "EA" ? "Eşit Ağırlık" : "Sözel";
        gObpKatkisi = veriler.obpKatkisi;
        gObpMetni = veriler.kirikObp ? "Kırık OBP" : "Normal OBP";
        gHedefIstenen = veriler.hedefSiralama || 0; // Hedef yoksa 0

        let html = `
            <h4 style="margin-top:0; color:#0f172a;">📊 Puan ve Sıralama Sonucunuz</h4>
            <div style="overflow-x:auto;">
            <table class="report-table" style="margin-bottom:0; min-width:600px; text-align:center;">
                <tr><th style="text-align:left;">Puan Türü</th><th>Ham Puan</th><th>Ham Sıra</th><th>OBP Puanı</th><th>Yerleştirme Puanı</th><th>Yerleştirme Sırası</th></tr>
                <tr>
                    <td style="text-align:left;"><strong>TYT</strong></td>
                    <td>${res.tytHamPuan.toFixed(5)}</td><td>${res.tytHamSira.toLocaleString()}</td><td style="color:#059669;">+ ${gObpKatkisi.toFixed(2)}</td>
                    <td>${res.tytYerPuan.toFixed(5)}</td><td><strong style="color:#2563eb; font-size:15px;">${res.tytYerSira.toLocaleString()}</strong></td>
                </tr>`;
        if (veriler.alan !== "TYT") {
            html += `
                <tr>
                    <td style="text-align:left;"><strong>${gAlan}</strong></td>
                    <td>${res.alanHamPuan.toFixed(5)}</td><td>${res.alanHamSira.toLocaleString()}</td><td style="color:#059669;">+ ${gObpKatkisi.toFixed(2)}</td>
                    <td>${res.alanYerPuan.toFixed(5)}</td><td><strong style="color:#2563eb; font-size:15px;">${res.alanYerSira.toLocaleString()}</strong></td>
                </tr>`;
        }
        html += `</table></div>`;
        
        document.getElementById("sonucEkrani").innerHTML = html;
        document.getElementById("sonucEkrani").style.display = "block";
        document.getElementById("raporBtn").style.display = "block"; // Butonu göster!
    });
}

// ==========================================
// SEKME 2: İHTİMAL SİMÜLATÖRÜ (REKLAMLI VE KORUMALI)
// ==========================================
function normalDagilim(ortalama, standartSapma) {
    let u = 0, v = 0; while(u === 0) u = Math.random(); while(v === 0) v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); 
    return Math.max(0, ortalama + (z * standartSapma));
}

// Sınav soru sayılarını aşmayı engelleyen limitörü (clamp) ekliyoruz
const clamp = (val, max) => Math.min(max, Math.max(0, val));

function simulasyonuBaslat() {
    let veriler = ortakVerileriAl(true);
    if (!veriler) return;
    
    reklamOynat("10.000 Simülasyon Senaryosu Analiz Ediliyor... (Sponsorlu Reklam)", () => {
        let n = {
            tr: parseFloat(document.getElementById("tTrH").value) || 0, 
            mat: parseFloat(document.getElementById("tMatH").value) || 0,
            sos: parseFloat(document.getElementById("tSosH").value) || 0, 
            fen: parseFloat(document.getElementById("tFenH").value) || 0,
            aMat: parseFloat(document.getElementById("aMatH").value) || 0, 
            aFiz: parseFloat(document.getElementById("aFizH").value) || 0,
            aKim: parseFloat(document.getElementById("aKimH").value) || 0, 
            aBiy: parseFloat(document.getElementById("aBiyH").value) || 0,
            aEd: parseFloat(document.getElementById("aEdH").value) || 0, 
            aTar1: parseFloat(document.getElementById("aTar1H").value) || 0,
            aCog1: parseFloat(document.getElementById("aCog1H").value) || 0, 
            aTar2: parseFloat(document.getElementById("aTar2H").value) || 0,
            aCog2: parseFloat(document.getElementById("aCog2H").value) || 0, 
            aFel: parseFloat(document.getElementById("aFelH").value) || 0,
            aDin: parseFloat(document.getElementById("aDinH").value) || 0
        };

        // GÜNCELLEME: Global değişkenleri ayarla
        gAlan = veriler.alan === "TYT" ? "Sadece TYT" : veriler.alan === "SAY" ? "Sayısal" : veriler.alan === "EA" ? "Eşit Ağırlık" : "Sözel";
        gObpKatkisi = veriler.obpKatkisi;
        gObpMetni = veriler.kirikObp ? "Kırık OBP" : "Normal OBP";
        gHedefIstenen = veriler.hedefSiralama;
        hData = masterHesapla(veriler.alan, gObpKatkisi, n); // Rapora gidecek ana veriler

        let basarili = 0;
        for(let i=0; i<10000; i++) {
            // DİKKAT: Artık netler sınırları (40, 20 vb.) aşamaz.
            let sim = {
                tr: clamp(normalDagilim(n.tr, 2.0), 40), 
                mat: clamp(normalDagilim(n.mat, 2.5), 40), 
                sos: clamp(normalDagilim(n.sos, 1.5), 20), 
                fen: clamp(normalDagilim(n.fen, 1.5), 20),
                aMat: clamp(normalDagilim(n.aMat, 2.5), 40), 
                aFiz: clamp(normalDagilim(n.aFiz, 1.5), 14), 
                aKim: clamp(normalDagilim(n.aKim, 1.5), 13), 
                aBiy: clamp(normalDagilim(n.aBiy, 1.5), 13),
                aEd: clamp(normalDagilim(n.aEd, 2.0), 24), 
                aTar1: clamp(normalDagilim(n.aTar1, 1.5), 10), 
                aCog1: clamp(normalDagilim(n.aCog1, 1.0), 6),
                aTar2: clamp(normalDagilim(n.aTar2, 1.5), 11), 
                aCog2: clamp(normalDagilim(n.aCog2, 1.5), 11), 
                aFel: clamp(normalDagilim(n.aFel, 1.5), 12), 
                aDin: clamp(normalDagilim(n.aDin, 1.0), 6)
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
// SEKME 3: HEDEF İÇİN GEREKEN NETLER (REKLAMLI)
// ==========================================
function gerekenNetleriBul() {
    let veriler = ortakVerileriAl(true);
    if (!veriler) return;
    
    reklamOynat("Yapay Zeka Hedefiniz İçin En Uygun Kombinasyonu Analiz Ediyor... (Reklam)", () => {
        let n = { tr:10, mat:5, sos:5, fen:2, aMat:5, aFiz:2, aKim:2, aBiy:2, aEd:5, aTar1:2, aCog1:2, aTar2:2, aCog2:2, aFel:2, aDin:2 };
        
        let hedefler = [];
        if (veriler.alan === "TYT") {
            hedefler = [{k:'tr', m:40}, {k:'mat', m:40}, {k:'tr', m:40}, {k:'mat', m:40}, {k:'sos', m:20}, {k:'fen', m:20}];
        } else if (veriler.alan === "SAY") {
            hedefler = [{k:'aMat', m:40}, {k:'tr', m:40}, {k:'aMat', m:40}, {k:'mat', m:40}, {k:'aFiz', m:14}, {k:'aKim', m:13}, {k:'aBiy', m:13}, {k:'tr', m:40}, {k:'mat', m:40}];
        } else if (veriler.alan === "EA") {
            hedefler = [{k:'aMat', m:40}, {k:'aEd', m:24}, {k:'tr', m:40}, {k:'mat', m:40}, {k:'aMat', m:40}, {k:'aTar1', m:10}, {k:'aCog1', m:6}];
        } else if (veriler.alan === "SOZ") {
            hedefler = [{k:'aEd', m:24}, {k:'tr', m:40}, {k:'aEd', m:24}, {k:'sos', m:20}, {k:'aTar1', m:10}, {k:'aCog1', m:6}, {k:'aTar2', m:11}, {k:'aCog2', m:11}, {k:'aFel', m:12}];
        }

        let sira = 3000000;
        let sayac = 0;
        let oncekiSira = sira;

        while (sira > veriler.hedefSiralama && sayac < 10000) {
            let hd = hedefler[sayac % hedefler.length];
            n[hd.k] = getNextValidNet(n[hd.k], hd.m);
            
            let p = masterHesapla(veriler.alan, veriler.obpKatkisi, n);
            sira = p.alanYerSira;
            sayac++;

            if (sayac % hedefler.length === 0) {
                if (oncekiSira === sira) break; 
                oncekiSira = sira;
            }
        }

        // GLOBAL VERİLERİ GÜNCELLE (Böylece Rapor doğru verilerle açılır)
        hData = masterHesapla(veriler.alan, veriler.obpKatkisi, n);
        gAlan = veriler.alan === "TYT" ? "Sadece TYT" : veriler.alan === "SAY" ? "Sayısal" : veriler.alan === "EA" ? "Eşit Ağırlık" : "Sözel";
        gObpKatkisi = veriler.obpKatkisi;
        gObpMetni = veriler.kirikObp ? "Kırık OBP" : "Normal OBP";
        gHedefIstenen = veriler.hedefSiralama;

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
        document.getElementById("raporBtn").style.display = "block"; // Buton gelsin
    });
}

// ==========================================
// ŞEFFAF RAPOR EKRANI (REKLAMLI)
// ==========================================
function reklamIzle() {
    reklamOynat("Premium Strateji Raporunuz Oluşturuluyor... (Sponsorlu Reklam)", () => {
        detayliRaporuUret();
    });
}

function detayliRaporuUret() {
    let rapor = `
        <div class="report-header">
            <h4>📋 YKS Strateji Raporu (OBP Dökümlü)</h4>
            <span style="font-size:12px; font-weight:normal; opacity:0.8;">Gerçekçi Ham ve Yerleştirme Analizi (2024 Kalibreli)</span>
        </div>
        <div class="report-body">
            <h5 style="margin-top:0; font-size:15px;">🔍 Hedef Netlerinizin Karşılığı</h5>
            <div style="overflow-x:auto;">
            <table class="report-table" style="min-width:600px; text-align:center;">
                <tr>
                    <th style="text-align:left;">Kategori</th>
                    <th>Ham Puan</th>
                    <th>Ham Sıra</th>
                    <th>OBP (${gObpMetni})</th>
                    <th>Yerleştirme Puanı</th>
                    <th>Yerleştirme Sırası</th>
                </tr>
                <tr>
                    <td style="text-align:left;"><strong>TYT</strong></td>
                    <td>${hData.tytHamPuan.toFixed(5)}</td>
                    <td>${hData.tytHamSira.toLocaleString()}</td>
                    <td style="color:#059669;">+ ${gObpKatkisi.toFixed(2)}</td>
                    <td>${hData.tytYerPuan.toFixed(5)}</td>
                    <td><strong style="color:#2563eb; font-size:15px;">${hData.tytYerSira.toLocaleString()}</strong></td>
                </tr>
    `;

    if (gAlan !== "Sadece TYT") {
        rapor += `
                <tr>
                    <td style="text-align:left;"><strong>${gAlan} <span class="badge">HEDEF ALAN</span></strong></td>
                    <td>${hData.alanHamPuan.toFixed(5)}</td>
                    <td>${hData.alanHamSira.toLocaleString()}</td>
                    <td style="color:#059669;">+ ${gObpKatkisi.toFixed(2)}</td>
                    <td>${hData.alanYerPuan.toFixed(5)}</td>
                    <td><strong style="color:#2563eb; font-size:15px;">${hData.alanYerSira.toLocaleString()}</strong></td>
                </tr>
        `;
    }
    rapor += `</table></div>`;

    // Eğer kullanıcı Hedef Sıralama belirtmişse durum analizi yap
    if (gHedefIstenen > 0) {
        if (hData.alanYerSira <= gHedefIstenen) {
            rapor += `
                <div class="status-box status-success">
                    ✅ <strong>Gidişat Harika:</strong> Tablodaki netlere ulaşırsan, hesaplanan yerleştirme sıralaman <strong>${hData.alanYerSira.toLocaleString()}</strong> oluyor ve hedefini rahatça geçiyorsun.
                </div>`;
        } else {
            let fark = hData.alanYerSira - gHedefIstenen;
            rapor += `
                <div class="status-box status-danger">
                    🚨 <strong>Kritik Uyarı:</strong> Hedef netlerinin tamamını yapsan bile beklenen yerleştirme sıralaman <strong>${hData.alanYerSira.toLocaleString()}</strong> kalıyor ve hedefine ulaşmak için hala <strong>${fark.toLocaleString()} kişi</strong> daha elemek zorundasın.
                </div>`;
        }
    } else {
        rapor += `
            <div class="status-box status-success">
                ✅ <strong>Analiz:</strong> Anlık netlerinize göre detaylı sıralama ve puan dökümünüz yukarıda verilmiştir. Bir hedef girerek strateji simülasyonu yapabilirsiniz.
            </div>`;
    }

    rapor += `</div>`;
    document.getElementById("detayliRapor").innerHTML = rapor;
    document.getElementById("detayliRapor").style.display = "block";
}