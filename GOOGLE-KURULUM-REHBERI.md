# Liora Ortaca — Google Search, Maps ve Analytics Kurulum Rehberi

Bu rehber `https://www.lioraortaca.com` üretim alan adı içindir. İşlemleri, şirketin mülkiyetinde olan ve en az iki yetkili yöneticisi bulunan kurumsal bir Google hesabıyla yapın. Ajans veya çalışan hesabını tek ana sahip olarak bırakmayın.

## 0. Yayından önce zorunlu kontrol

1. Vercel üretim deployment’ının `https://www.lioraortaca.com` adresinde açıldığını doğrulayın.
2. `https://lioraortaca.com` adresinin tek adımda `https://www.lioraortaca.com` adresine yönlendiğini kontrol edin.
3. Aşağıdaki adreslerin `200` yanıtı verdiğini kontrol edin:
   - `https://www.lioraortaca.com/`
   - `https://www.lioraortaca.com/en`
   - `https://www.lioraortaca.com/mugla-ortaca-satilik-daire`
   - `https://www.lioraortaca.com/robots.txt`
   - `https://www.lioraortaca.com/sitemap.xml`
4. `LEGAL-REVIEW.md` dosyasındaki şirket bilgileri ve yurt dışı aktarım kontrolleri tamamlanmadan GA4’ü etkinleştirmeyin.
5. Çerez panelini gizli sekmede test edin. Ziyaretçi seçim yapmadan `googletagmanager.com`, `google-analytics.com` veya gömülü `google.com/maps` isteği oluşmamalıdır.

## 1. Google Search Console

### 1.1 Domain property oluşturma

1. [Google Search Console](https://search.google.com/search-console/) hesabını açın.
2. Sol üstteki mülk seçicisinden **Mülk ekle** seçeneğini açın.
3. **Alan adı / Domain** türünü seçin.
4. Değer olarak yalnızca `lioraortaca.com` yazın. `https://`, `www` veya yol eklemeyin. Domain property; HTTP/HTTPS ile tüm alt alan adlarını birlikte kapsar.
5. Google’ın verdiği `google-site-verification=...` TXT kaydını kopyalayın.
6. Alan adı DNS’i Vercel’de yönetiliyorsa Vercel → Project/Team → Domains/DNS bölümünde; başka bir kayıt kuruluşundaysa o kuruluşun DNS panelinde yeni TXT kaydı oluşturun:
   - Tür: `TXT`
   - Ad/Host: çoğu panelde `@`
   - Değer: Google’ın verdiği metnin tamamı
   - TTL: varsayılan veya 300 saniye
7. DNS yayılımından sonra Search Console’a dönüp **Doğrula** seçeneğine basın. TXT kaydını doğrulamadan sonra silmeyin.
8. Ayarlar → Kullanıcılar ve izinler bölümünden ikinci bir şirket yetkilisini tam yetkili kullanıcı olarak ekleyin.

Resmî kaynaklar: [Domain property](https://support.google.com/webmasters/answer/10431861?hl=en), [mülkiyet doğrulama](https://support.google.com/webmasters/answer/9008080?hl=en).

### 1.2 Sitemap ve önemli URL’ler

1. Sol menüden **Site haritaları / Sitemaps** bölümünü açın.
2. Yeni site haritası alanına `sitemap.xml` yazın ve gönderin.
3. Durum “Başarılı” olduktan sonra **URL Denetleme / URL Inspection** aracında sırayla şu URL’leri kontrol edin:
   - `https://www.lioraortaca.com/`
   - `https://www.lioraortaca.com/mugla-ortaca-satilik-daire`
   - `https://www.lioraortaca.com/en`
4. Her URL’de **Canlı URL’yi test et** çalıştırın. Canonical’ın aynı üretim URL’si olduğunu, indekslemeye izin verildiğini ve render kaynaklarının yüklenebildiğini doğrulayın.
5. Sayfa henüz indekslenmemişse **Dizine eklenmesini iste** seçeneğini bir kez kullanın. Tekrarlı istek sıralamayı hızlandırmaz.
6. `/privacy` ve `/cookies` sayfaları bilerek `noindex,follow` durumundadır; bu sayfalar için indeks isteği göndermeyin.

Google, sitemap gönderimini bir sıralama garantisi olarak değerlendirmez. İndeksleme ve sıralama; teknik erişilebilirlik, içerik kalitesi, yerel güven sinyalleri ve zamanla oluşan kullanıcı talebine bağlıdır.

Resmî kaynak: [Search Console başlangıç görevleri ve sitemap](https://support.google.com/webmasters/answer/10351509?hl=en).

### 1.3 İlk 90 günlük takip

Haftada bir:

1. **Sayfalar / Indexing** raporunda canonical, yönlendirme veya robots hatası olup olmadığını inceleyin.
2. **Performans → Arama sonuçları** bölümünde şu kümeleri ayrı filtreleyin:
   - Marka: `liora`, `liora ortaca`, `mef yapı liora`
   - Yerel niyet: `ortaca satılık daire`, `cumhuriyet mahallesi satılık daire`
   - Geniş sorgular: `muğla daire`, `muğla daire fiyatları`
3. Sorgu bazında yalnızca konum değil; gösterim, tıklama, tıklama oranı ve doğru açılış sayfasını birlikte değerlendirin.
4. **Core Web Vitals** ve mobil kullanılabilirlik sorunlarını izleyin.
5. Yeni ve gerçek bir proje içeriği yayınlandığında sitemap’i tekrar tekrar göndermek yerine Google’ın normal taramasını bekleyin; kritik sayfa için URL Denetleme kullanılabilir.

## 2. Google Analytics 4

### 2.1 Hesap, mülk ve web akışı

1. [Google Analytics](https://analytics.google.com/) → Yönetici bölümünü açın.
2. Şirkete ait bir hesap altında yeni GA4 mülkü oluşturun:
   - Mülk adı: `Liora Ortaca`
   - Raporlama saat dilimi: `Türkiye`
   - Para birimi: `TRY`
3. Veri Akışları → Web → yeni web akışı:
   - Site URL: `https://www.lioraortaca.com`
   - Akış adı: `Liora Ortaca — Production`
4. Akış ayrıntılarındaki `G-...` biçimli **Measurement ID / Ölçüm Kimliği** değerinin projede kullanılan kimlikle aynı olduğunu doğrulayın.
5. Projedeki `site-config.js` dosyası şu kimlikle yapılandırılmıştır:

```js
ga4MeasurementId: 'G-6PJERQFXEK',
```

Kimlik farklı bir mülke aitse doğru üretim akışı kimliğiyle değiştirip yeniden deploy edin.

Resmî kaynak: [GA4 ölçüm kimliğini bulma ve etiketi kurma](https://support.google.com/analytics/answer/9311124?hl=en).

### 2.2 Gizlilik ve veri ayarları

1. Yönetici → Veri Ayarları → Veri Saklama bölümünde olay/kullanıcı verisini **14 ay** olarak ayarlayın.
2. Google Signals ve reklam kişiselleştirmesini, ayrıca hukuki değerlendirme ve açık bir reklam kullanım kararı olmadan açmayın.
3. Veri paylaşımı seçeneklerinde yalnızca operasyon için gerekli seçimleri açık bırakın.
4. Yönetici → Veri Akışları → Google etiketi ayarlarında:
   - İç trafik için ofis IP’lerini tanımlayın.
   - İstenmeyen yönlendirmeler listesine yalnızca gerçekten ödeme/kimlik doğrulama aracı gibi oturumu bozan alan adlarını ekleyin.
   - Form etkileşimi yoksa form ölçümünü gereksiz yere açmayın.
5. Site, Google etiketini üretim alan adında otomatik yükler. Standart Gerçek Zamanlı ve GA4 raporlarının oluşması için `analytics_storage` etkin; `ad_storage`, `ad_user_data` ve `ad_personalization` kapalıdır. `allow_google_signals` ve reklam kişiselleştirme sinyalleri de kapalı tutulur. Birinci taraf Analytics çerezleri kod seviyesinde en çok altı ayla sınırlandırılmış ve sonraki ziyaretlerde yenilenmeyecek şekilde ayarlanmıştır. Bu tercih, şirketin güncel veri envanteri ve hukuk danışmanının analitik çerez değerlendirmesiyle birlikte yönetilmelidir.

Resmî kaynaklar: [kullanıcı onayı yönetimi](https://support.google.com/analytics/answer/12329599?hl=en), [Consent Mode kurulumu](https://developers.google.com/tag-platform/security/guides/consent), [GA4 yapılandırma ve 14 aylık sınır](https://support.google.com/analytics/answer/12229528?hl=en).

### 2.3 Olaylar ve gerçek dönüşümler

Kod şu olayları üretir:

- `generate_lead`: WhatsApp tıklamaları
- `contact`: telefon ve e-posta tıklamaları
- `select_content`: ana CTA, harita, Instagram ve MEF Yapı sitesi
- `view_promotion`: son dört daire alanının görüntülenmesi
- `language_change`: dil değişimi

Kurulum:

1. Canlı veya test ortamında bir test tıklaması yapın.
2. GA4 → Raporlar → Gerçek Zamanlı bölümünde olayın geldiğini doğrulayın.
3. Yönetici → Olaylar / Key events bölümünde `generate_lead` olayını temel dönüşüm olarak işaretleyin.
4. `contact` olayını ikincil dönüşüm yapabilirsiniz; WhatsApp ve telefon/e-posta aynı değerde değilse özel boyut veya event filtresiyle ayrı raporlayın.
5. `view_promotion` bir satış dönüşümü değildir; ana başarı metriği yapmayın.
6. Reklam kampanyalarında tek tip UTM kullanın:

```text
utm_source=instagram
utm_medium=paid_social
utm_campaign=liora_son_4_daire_2026q3
utm_content=video_01
```

Facebook için yalnızca `utm_source=facebook` değerini değiştirin. Türkçe karakter, boşluk ve her reklamda farklı isim kullanmaktan kaçının.

### 2.4 Teknik doğrulama

1. Gizli sekmede siteyi açın; herhangi bir onay penceresi görünmemelidir.
2. Tag Assistant/Network panelinde `gtag/js?id=G-6PJERQFXEK` dosyasının ve GA4 ölçüm isteklerinin geldiğini doğrulayın.
3. Sayfa kaynağında etiketin `<head>` içinde başlatıldığını; `analytics_storage` değerinin `granted`, `ad_storage`, `ad_user_data` ve `ad_personalization` değerlerinin `denied` olduğunu kontrol edin.
4. Temiz bir tarayıcı profilinde siteye ait `_ga` ve `_ga_*` çerezlerinin oluştuğunu, sürelerinin altı ayı aşmadığını doğrulayın.
5. `https://www.lioraortaca.com/?ga_debug=1` adresini açtıktan sonra WhatsApp bağlantısına tıklayın; GA4 DebugView içinde `page_view` ve `generate_lead` olaylarını kontrol edin. Gerçek Zamanlı rapor genellikle dakikalar içinde, standart raporlar daha geç güncellenir.
6. Test trafiğini GA4’te geliştirici/iç trafik filtresiyle üretim raporlarından ayırın.

## 3. Search Console ile GA4’ü bağlama

Ön koşul: GA4 mülkünde **Editor**, Search Console Domain property’de **Verified owner** yetkisi gerekir.

1. GA4 → Yönetici → Ürün Bağlantıları → Search Console Bağlantıları.
2. **Bağla** → yönettiğiniz `lioraortaca.com` Domain property’sini seçin.
3. `Liora Ortaca — Production` web akışını seçin.
4. Yapılandırmayı inceleyip gönderin.
5. Raporlar → Kitaplık bölümünde Search Console koleksiyonu görünmüyorsa yayımlayın.
6. Organik arama verisi yaklaşık 48 saat gecikmeli gelebilir; Search Console geçmişi en fazla 16 ay kapsar.

Resmî kaynak: [Search Console ile GA4 bağlantısı](https://support.google.com/analytics/answer/10737381?hl=en-EN).

## 4. Google Maps ve Google Business Profile

### 4.1 Hangi profil açılmalı?

Google’ın kurallarına göre satıştaki daire, model ev veya boş konut tek başına Business Profile için uygun değildir. Müşterilerin belirtilen saatlerde gerçekten ziyaret edebildiği, şirket personeli bulunan ve kalıcı tabelası olan **satış/kiralama ofisi** uygundur. Bu nedenle:

- Proje adresinde gerçek, tabelalı ve personelli bir satış ofisi varsa bu ofis için profil oluşturun.
- Böyle bir ofis yoksa proje adına sahte/anahtar kelime doldurulmuş konum oluşturmayın. MEF Yapı’nın gerçek ofis profilini kullanın.
- Müşteri kabul edilmeyen adresi herkese açık göstermeyin; uygun bir hizmet alanı işletmesiyse adresi gizleyip hizmet bölgesi kullanın.
- İşletme adı, gerçek tabelada ve resmi kanallarda nasıl kullanılıyorsa aynen o biçimde yazılmalıdır.

Resmî kaynaklar: [Business Profile uygunluğu](https://support.google.com/business/answer/13763036?hl=en-CA), [işletmeyi doğru temsil etme kuralları](https://support.google.com/business/answer/3038177?hl=en).

### 4.2 Profil oluşturma ve doğrulama

1. Önce Google ve Maps’te `MEF Yapı Ortaca` ve gerçek işletme adıyla arama yapın.
2. Mevcut profil varsa yeni kopya açmayın; yetkiliyseniz **Bu işletmenin sahibi misiniz?** ile sahiplik isteyin.
3. Profil yoksa [business.google.com/add](https://business.google.com/add) üzerinden ekleyin.
4. Şu bilgileri gerçek ve tutarlı girin:
   - Gerçek işletme/tabela adı
   - Müşteri kabul edilen kesin adres veya uygun hizmet alanı
   - `+90 546 910 80 52`
   - `https://www.lioraortaca.com/?utm_source=google&utm_medium=organic&utm_campaign=business_profile`
   - Gerçek çalışma saatleri
   - Ana faaliyeti en iyi anlatan az sayıda kategori
5. Google’ın sunduğu doğrulama yöntemini tamamlayın. Yöntem Google tarafından belirlenir; video, telefon, e-posta, canlı görüşme veya posta olabilir.
6. Video doğrulaması istenirse dış cephe/tabela, çevre, personel erişimi ve işletmeyi yönetme yetkisini gösteren unsurları kesintisiz biçimde kaydedin.
7. Birincil sahip şirkette kalsın; ajansı yalnızca yönetici ekleyin.

Resmî kaynaklar: [profil ekleme veya sahiplenme](https://support.google.com/business/answer/2911778), [işletmeyi doğrulama](https://support.google.com/business/answer/7107242?hl=en-en).

### 4.3 Yerel görünürlük için sürdürülebilir çalışma

1. Web sitesi, Business Profile, Instagram ve MEF Yapı sitesinde ad/telefon/adres yazımını tutarlı tutun.
2. Sadece gerçek proje ve ofis fotoğrafları yükleyin; render görsellerini “temsili görsel” bağlamı olmadan gerçek tamamlanmış yapı gibi sunmayın.
3. Açıklamada fiyat/indirim, link veya anahtar kelime dizisi kullanmayın; Google açıklama alanı faydalı ve gerçeğe uygun olmalıdır.
4. Gerçek müşterilerden tarafsız yorum isteyin; yorum karşılığı teşvik, toplu sahte yorum veya çalışan yorumları kullanmayın.
5. Sorulara ve yorumlara kişisel veri açıklamadan, ölçülü ve zamanında yanıt verin.
6. İşletme taşınır, kapanır veya satış ofisi faaliyeti biterse profili güncelleyin.

### 4.4 Sitedeki gömülü haritayı kesin konuma bağlama

Site şu anda Cumhuriyet Mahallesi aramasını konum bölümünde otomatik yükler. Kesin ve doğrulanmış satış ofisi/proje konumu hazır olduğunda:

1. Google Cloud’da şirkete ait bir proje oluşturun.
2. **Maps Embed API**’yi etkinleştirin.
3. Bir tarayıcı API anahtarı oluşturun.
4. Anahtarı:
   - HTTP referrer olarak `https://www.lioraortaca.com/*` ile,
   - API kısıtı olarak yalnızca **Maps Embed API** ile sınırlandırın.
5. Google Maps’ten doğrulanmış konumun Place ID’sini alın.
6. `index.html` ve `mugla-ortaca-satilik-daire.html` içindeki harita iframe’inin `src` değerini resmi Embed API biçimiyle değiştirin:

```text
https://www.google.com/maps/embed/v1/place?key=API_KEY&q=place_id:PLACE_ID
```

7. Anahtar frontend’de görünür olacağından gizli kabul etmeyin; güvenliği sağlayan referrer ve API kısıtlarıdır.
8. Deploy’dan sonra haritanın masaüstü ve mobilde otomatik açıldığını, bağlantının doğru konuma gittiğini ve tarayıcı konsolunda API/referrer hatası olmadığını test edin.

Resmî kaynak: [Maps Embed API kurulumu](https://developers.google.com/maps/documentation/embed/get-started).

## 5. Aylık yönetim özeti

Her ay aynı tabloda takip edin:

- Search Console: marka ve yerel sorgu gösterimi, organik tıklama, doğru landing page, indeks/CWV hataları
- GA4: kullanıcı/oturum, `generate_lead`, `contact`, kaynak/medium, landing page
- Reklam: harcama, WhatsApp lead sayısı, nitelikli görüşme ve gerçek satış
- Business Profile: aramalar, web sitesi tıklaması, arama/rota aksiyonu, yorum yanıt süresi

Web sitesi tıklaması tek başına satış değildir. En doğru ROI hesabı:

```text
Nitelikli lead maliyeti = reklam harcaması / satış ekibince nitelikli bulunan görüşme
Satış edinme maliyeti = toplam pazarlama harcaması / gerçekleşen satış
```

WhatsApp görüşmelerinde kaynak bilgisini CRM veya basit bir satış tablosuna kaydetmeden GA4 yalnızca tıklamayı ölçer; satış sonucunu kendiliğinden bilemez.
