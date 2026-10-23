-- Görev 3.1, ziyaretçi defterine son 24 saat içinde yazılan onaylanmamış mesajları getirir.
SELECT * FROM ziyaretci_defteri
WHERE yayinda = false
  AND yazma_zamani >= now() - INTERVAL '24 hours';

-- Görev 3.2, onaylanan en yeni 4 ziyaretçi mesajını getirir.
SELECT * FROM ziyaretci_defteri
WHERE yayinda = TRUE
ORDER BY yazma_zamani DESC
LIMIT 4;

-- görev 3.3, Hangi şehirden kaç mesaj geldiğini getirir.
SELECT sehir, COUNT(*)
FROM ziyaretci_defteri
GROUP BY sehir;

-- görev 3.4, hangi konudan kaç mesaj geldiğini getirir.
SELECT k.ad AS kategori, COUNT(n.id) AS not_sayisi
FROM konu_etiket as k
LEFT JOIN ziyaretci_defteri AS n ON n.kategori_id = k.id
GROUP BY k.ad;

-- görev 3.5, öğrenci numaramı içeren mesajı getitt.
SELECT * FROM ziyaretci_defteri
WHERE ad ILIKE '2516016028';

-- görev 3.6, mesajı onaylar yayinda = t.
UPDATE ziyaretci_defteri
SET yayinda = TRUE
WHERE id = 3;
SELECT * FROM ziyaretci_defteri WHERE id = 3; --check

-- görev 3.7, içinde link barındıran mesajları siler.
DELETE FROM ziyaretci_defteri
WHERE mesaj ILIKE '%http%';

-- Görev 6, şifrenin kaç gün önce değiştirildiğini verir.
SELECT eposta, CURRENT_DATE - sifre_degisim::date AS gun_once
FROM yoneticiler;

-- Görev 7, çerezleri türe göre sayar
SELECT tur, COUNT(*) AS adet
FROM cerezler
GROUP BY tur
ORDER BY adet DESC, tur;
