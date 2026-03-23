🅿️ Otopark Otomasyon Sistemi
Bu proje, otopark yönetimini dijitalleştiren, kullanıcı dostu ve modern bir arayüze sahip bir web uygulamasıdır. Araç giriş-çıkış takibi, ücret hesaplama ve canlı doluluk durumu gibi özellikleri içerisinde barındırır.

🚀 Proje Özellikleri
Dinamik Otopark Haritası: 40 araçlık interaktif bir grid sistemi. Yol alanları ve giriş-çıkış yönlendirmeleriyle gerçekçi bir yerleşim planı sunar.

Gelişmiş Araç Kayıt Sistemi:

Akıllı Plaka Kontrolü: Sadece Türkiye plaka formatına (Örn: 38ABC123) uygun girişleri kabul eder ve Türkçe karakter desteği (Ç, Ş, İ, Ğ, Ü, Ö) sunar.

Hızlı Giriş: Boş bir slot seçip plaka girerek anında kayıt oluşturulur.

Ücretlendirme Mantığı:

İlk 1 saat tamamen ücretsizdir.

1 saatten sonraki her saat için otomatik olarak 40 TL ücret hesaplanır.

Anlık Arama ve Filtreleme: Harita üzerindeki "Plaka Ara" özelliği ile dolu slotlar arasında süzme yapılır; aranan araç parlatılırken diğerleri soluklaştırılarak görsel kolaylık sağlanır.

Kalıcı Veri (Local Storage): Sayfa yenilense bile araç listesi, işlem geçmişi (loglar) ve toplam ciro asla kaybolmaz.

İşlem Geçmişi (Log): Yapılan her çıkış işlemi; plaka, çıkış saati, kalınan süre ve ödenen ücret bilgisiyle birlikte "Durum" panelinde listelenir.

Tema Desteği: Tek tıkla Gece (Dark) ve Gündüz (Light) modları arasında geçiş yapılabilir.

🛠️ Teknik Detaylar
Veri Yönetimi: Araç bilgileri ve finansal veriler tarayıcının localStorage alanında JSON formatında tutulur.

DOM Manipülasyonu: JavaScript ile dinamik olarak HTML elementleri üretilir ve slotların doluluk durumuna göre CSS class'ları (.dolu, .bos) anlık değiştirilir.

Hesaplama Mantığı: Araç giriş-çıkış zamanları arasındaki fark ISOString formatından milisaniyeye çevrilerek tam saat hesabı üzerinden ücretlendirilir.

Hata Yönetimi: Hatalı plaka girişi veya seçim yapılmadan işlem yapılması durumunda kullanıcıya görsel bildirim (pop-up) verilir.
