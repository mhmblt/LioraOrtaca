# Liora Ortaca

MEF Yapı & İnşaat imzalı Liora Ortaca için hazırlanmış, mobil öncelikli ve dönüşüm odaklı proje tanıtım sitesi.

Statik arayüz ve Vercel Functions tabanlı teknik SEO uçlarından oluşur. Herhangi bir paket veya build adımı gerektirmez; Vercel'de **Other** framework preset'iyle doğrudan yayınlanabilir.

## Yerel kullanım

Projeyi bir statik sunucuyla açın. Örneğin:

```powershell
npx serve .
```

## Alan adı ve Analytics kurulumu

Canonical üretim alan adı `https://www.lioraortaca.com` olarak sabitlenmiştir. Vercel proje ayarlarında `SITE_URL` environment variable değerinin de aynı adres olması önerilir.

1. Google Analytics 4 web akışı oluşturulduğunda `site-config.js` içindeki `ga4MeasurementId` alanına gerçek `G-...` kimliğini girin. Geçerli kimlik yokken Analytics yüklenmez ve gereksiz çerez bildirimi gösterilmez.
2. GA4 yönetiminde `generate_lead` olayını **Key event** olarak işaretleyin. İhtiyaca göre `contact` olayı da key event yapılabilir.
3. GA4 veri saklama, Google Signals ve Google Ads bağlantı ayarlarını kurumun onay politikasıyla birlikte kontrol edin.

Analytics temel onay modunda çalışır: Google etiketi ziyaretçi kabul etmeden yüklenmez. Reklam depolama, reklam kullanıcı verisi ve reklam kişiselleştirme sinyalleri varsayılan olarak reddedilir.

Ölçülen başlıca olaylar:

- `generate_lead`: WhatsApp tıklamaları ve yerleşimi
- `contact`: telefon ve e-posta tıklamaları
- `select_content`: harita, Instagram, MEF Yapı sitesi ve ana CTA
- `view_promotion`: son 4 daire bölümü
- `language_change`: dil değişimi

Telefon, e-posta veya WhatsApp mesaj metni Analytics olaylarına gönderilmez.

## Teknik SEO

- Alan adına göre üretilen `/robots.txt`
- Canonical üretim alan adını kullanan `/robots.txt`; TR/EN ve proje renderlarını içeren görsel destekli `/sitemap.xml`
- Arama motorlarının ilk HTML yanıtında da okuyabildiği, önceden üretilmiş İngilizce sürüm: `/en`
- Marka/proje sorguları için ana sayfa ve satın alma niyetli yerel sorgular için `/mugla-ortaca-satilik-daire`
- Statik ve dinamik mutlak canonical ile doğru TR/EN hreflang bağlantıları
- Open Graph ve Twitter kartları
- `Organization`, `WebSite`, `WebPage`, `ApartmentComplex` ve satış sayfasında `BreadcrumbList` JSON-LD şeması
- İndeks dışı gizlilik/çerez sayfası: `/privacy`
- Özel, indeks dışı 404 sayfası
- Vercel preview adreslerinde otomatik `noindex`

Ana sayfadaki metinler veya `script.js` içindeki çeviriler değiştirildiğinde statik İngilizce sürümü yenileyin:

```powershell
node scripts/generate-en.mjs
```

Yayın öncesi bütünlük kontrolü:

```powershell
node scripts/verify-site.mjs
```

Render görselleri veya stil kaynakları değiştiğinde responsive AVIF/WebP dosyalarını ve tek istekli CSS paketlerini yeniden üretin:

```powershell
$env:NODE_PATH = "<sharp paketini içeren node_modules yolu>"
node scripts/build-performance-assets.mjs
```

Ana sayfa ve satış sayfası ilk görünümde tek CSS paketi kullanır. Kahraman görselleri responsive AVIF/WebP olarak öncelikli yüklenir; iletişim ve galeri görselleri ekrana yaklaşana kadar ertelenir. Fontlar üçüncü taraf bağlantı zinciri oluşturmadan `/assets/fonts` altından servis edilir.

Ana paylaşım görseli değiştiğinde 1200×630 sosyal kartını yeniden üretin:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\generate-social-image.ps1"
```

## Arama motoru yayına alma kontrolü

Yeni domain şu anda görünür bir Google sonucu üretmiyor. Deploy tamamlandıktan sonra:

1. Google Search Console'da bir Domain Property oluşturun ve DNS ile doğrulayın.
2. `https://www.lioraortaca.com/sitemap.xml` adresini gönderin.
3. URL Inspection ile önce `https://www.lioraortaca.com/`, ardından `https://www.lioraortaca.com/mugla-ortaca-satilik-daire` ve `/en` sayfalarını canlı test edip indeks talebi gönderin.
4. Bing Webmaster Tools'a Search Console mülkünü içe aktarın veya siteyi manuel doğrulayın; aynı sitemap'i gönderin.
5. Rich Results Test, PageSpeed Insights ve Tag Assistant ile canlı adresi doğrulayın.
6. MEF Yapı ana sitesinde Liora'ya özel, takip edilebilir gerçek bir proje bağlantısı yayınlayın. Google Business Profile, Instagram ve Facebook biyografilerinde canonical ana sayfayı kullanın.
7. Otomatik veya satın alınmış backlink paketleri yerine yerel basın, mimarlık/gayrimenkul yayınları ve gerçek iş ortaklarından editoryal bağlantılar kazanın.

Canlı deploy doğrulandıktan sonra Bing ve diğer IndexNow katılımcılarına canonical URL'leri bildirmek için:

```powershell
node scripts/submit-indexnow.mjs
```

Bu komut yalnızca keşfi hızlandırır; indekslenme veya sıralama garantisi vermez.

Anahtar kelime hedefleri bilinçli olarak iki kümeye ayrılmıştır:

- `/`: `Liora Ortaca`, `MEF Yapı Liora Ortaca`, `Muğla Ortaca konut projesi`
- `/mugla-ortaca-satilik-daire`: `Muğla Ortaca satılık daire`, `Ortaca satılık daire`, `Ortaca yeni daire`, `Cumhuriyet Mahallesi satılık daire`, `Ortaca daire fiyatları`

`Muğla daire` ve `Muğla daire fiyatları` gibi geniş sorgular yüzlerce güncel ilan ve fiyat verisi sunan portallar tarafından domine edilir. Proje sitesi için kısa vadeli öncelik, daha yüksek satış niyeti taşıyan Ortaca ve marka sorgularıdır. Gerçek, tarihli pazar verisi oluşmadan ayrı fiyat sayfaları üretilmemelidir.

## Yayın öncesi hukuk kontrolü

`privacy.html` uygulanan teknik davranışı açıklar. Tam ticari unvan, MERSİS/vergi bilgileri, resmi tebligat adresi ve kurum içi saklama süreleri kesinleştiğinde metin KVKK konusunda yetkin bir hukuk danışmanı tarafından gözden geçirilmelidir.
