🅿️ Otopark Otomasyon Sistemi

Bu proje, otopark yönetimini dijitalleştiren, kullanıcı dostu ve modern arayüze sahip bir web uygulamasıdır.
Araç giriş-çıkış takibi, ücret hesaplama ve anlık doluluk durumu gibi temel ihtiyaçları karşılamak üzere geliştirilmiştir.

🚀 Özellikler

🗺️ Dinamik Otopark Haritası

40 araç kapasiteli interaktif grid sistemi
Gerçekçi yerleşim: yol alanları ve giriş-çıkış yönlendirmeleri

🚗 Araç Kayıt Sistemi

Plaka doğrulama: Türkiye plaka formatına uygun giriş (örn: 38ABC123)
Türkçe karakter desteği (Ç, Ş, İ, Ğ, Ü, Ö)
Boş slot seçilerek hızlı araç kaydı

💰 Ücretlendirme

İlk 1 saat ücretsiz
Sonraki her saat için 40 TL otomatik ücretlendirme
Süre hesaplama: giriş-çıkış zaman farkına göre

🔍 Arama & Filtreleme

“Plaka Ara” özelliği ile anlık filtreleme
Aranan araç vurgulanır, diğerleri soluklaştırılır

💾 Kalıcı Veri

Tüm veriler (araçlar, loglar, ciro) localStorage üzerinde saklanır
Sayfa yenilense bile veri kaybı olmaz

📊 İşlem Geçmişi

Çıkış yapan araçlar loglanır
Plaka, süre ve ücret bilgileri görüntülenir
🌗 Tema Desteği

Dark / Light mode geçişi

🛠️ Teknik Detaylar

Veri Yönetimi: localStorage (JSON formatında)
Dinamik Arayüz: JavaScript ile DOM manipülasyonu
Durum Yönetimi: Slotlar .dolu / .bos class’ları ile güncellenir
Zaman Hesabı: ISO formatından milisaniye bazlı süre hesaplama
Hata Yönetimi: Geçersiz işlem durumlarında kullanıcıya bildirim (pop-up)
