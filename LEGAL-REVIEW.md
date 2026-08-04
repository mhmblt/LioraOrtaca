# Yayın Öncesi KVKK ve Çerez Hukuk Kontrolü

Bu dosya yayınlanacak hukuki metin değildir; şirket ve KVKK alanında çalışan hukuk danışmanı için tamamlanması gereken iç kontrol listesidir. `privacy.html` ve `cookies.html`, mevcut site davranışıyla uyumlu ve ölçülü bir temel oluşturur. Aşağıdaki bilgiler doğrulanmadan metinlerin şirkete mutlak hukuki koruma sağladığı kabul edilmemelidir.

## Şirket kimliği ve başvuru kanalı

- [ ] “MEF Yapı & İnşaat” ifadesinin tam ve güncel ticaret sicili unvanıyla aynı olduğu doğrulandı.
- [ ] Veri sorumlusunun merkez/tebligat adresi metne eklendi.
- [ ] Varsa KEP adresi ve KVKK başvurularını kabul eden kayıtlı e-posta adresi eklendi.
- [ ] `info.mefyapi@gmail.com` hesabının şirket kontrolünde olduğu, erişim yetkilerinin sınırlı ve iki aşamalı doğrulamanın açık olduğu teyit edildi.
- [ ] VERBİS yükümlülüğü ve varsa sicil bilgisi hukuk danışmanıyla kontrol edildi.

## Gerçek veri akışı

- [ ] WhatsApp, telefon ve e-posta taleplerini kimlerin gördüğü ve hangi sistemlerde sakladığı envantere işlendi.
- [ ] Satış ekibinin kişisel cihazlara veri aktarmaması ve eski talepleri silmesi için yazılı prosedür oluşturuldu.
- [ ] Satışa dönüşmeyen ilk talepler için metindeki iki yıllık süre yönetimce onaylandı ve fiilen uygulanabilir hâle getirildi.
- [ ] Sözleşmeye dönüşen müşteri verileri için ayrı müşteri/satış aydınlatma metni ve saklama planı hazırlandı.
- [ ] Özel nitelikli veri gelmesi hâlinde ayırma/silme ve yetkisiz erişimi önleme prosedürü belirlendi.
- [ ] İlgili kişi başvurularının kimlik doğrulama, kayıt, yasal süre içinde yanıtlama ve gerektiğinde ücret tarifesi süreci yazılı hâle getirildi.

## Tedarikçiler ve yurt dışı aktarım

- [ ] Vercel, Google ve Meta hizmetlerinin güncel sözleşmeleri, alt işleyenleri ve veri bölgeleri incelendi.
- [ ] Her aktarım için KVKK m.9 kapsamındaki uygun aktarım mekanizması belirlendi.
- [ ] Standart sözleşme kullanılacaksa taraflar ve imza yetkileri kontrol edildi; sözleşmenin Kuruma beş iş günü içinde bildirim süreci sorumlu kişiye atandı.
- [ ] Veri işleyen sözleşmeleri, erişim sınırları, ihlal bildirimi ve silme/iade hükümleri gözden geçirildi.
- [ ] GA4’ün birinci taraf analitik çerezleriyle otomatik yüklenmesi için uygulanacak hukuki sebep, gerekiyorsa tercih/rıza mekanizması ve KVKK m.9 aktarım mekanizması hukuk danışmanıyla belgelendi.
- [ ] Google Signals ve reklam kişiselleştirmesi ayrıca değerlendirilmeden açılmadı; yalnızca `analytics_storage` etkin, `ad_storage`, `ad_user_data` ve `ad_personalization` değerleri `denied` durumunda tutuldu.
- [ ] GA4 kullanıcı/olay verisi saklama süresi 14 ayı aşmayacak şekilde panelden doğrulandı.

## Analitik ölçüm ve harici medya

- [ ] Gizli/temiz tarayıcı profilinde GA4 etiketi çalışırken birinci taraf `_ga` ve `_ga_*` çerezlerinin oluştuğu ve sürelerinin altı ayı aşmadığı doğrulandı.
- [ ] Google Analytics’e giden ölçüm istekleri, birinci taraf analitik tanımlayıcıları ve Google Haritalar’ın otomatik ağ istekleri veri envanterine işlendi.
- [ ] Google Haritalar’ın mobil/masaüstünde otomatik açıldığı ve iframe kaynağının doğru proje/ofis konumunu gösterdiği doğrulandı.
- [ ] Çerez/yerel depolama tablosu kullanılan gerçek teknolojiyle karşılaştırıldı; yalnızca `liora-language` yerel tercih kaydı ve sağlayıcı kaynaklı işlemler açıklanıyor.
- [ ] Yeni pazarlama etiketi, pixel, canlı destek veya form eklenmeden önce envanter ve metin güncelleme süreci tanımlandı.
- [ ] Açık rıza gerektiren yeni bir kullanım eklenirse, bu kullanım devreye alınmadan önce ayrı ve özgür seçim sunan onay mekanizması hazırlanacağı süreç sahibine atandı.

## Pazarlama ve içerik

- [ ] Bilgi talebinin sürekli ticari elektronik ileti izni olarak kullanılmadığı satış ekibine bildirildi.
- [ ] Kampanya iletileri için 6563 sayılı Kanun, Ticari İletişim Yönetmeliği ve gerekiyorsa İYS süreci ayrıca değerlendirildi.
- [ ] “Son 4 daire” bilgisi her reklam ve site yayını öncesinde gerçek stokla doğrulandı.
- [ ] Fiyat, teslim tarihi, mimari özellik ve render beyanlarının bağlayıcı satış materyalleriyle tutarlı olduğu kontrol edildi.
- [ ] Google Business Profile yalnızca gerçek, uygun ve doğrulanabilir ofis için oluşturuldu; satılık daire adına sahte konum açılmadı.

## Periyodik gözden geçirme

- [ ] Hukuki metin sorumlusu ve teknik sorumlu belirlendi.
- [ ] En az altı ayda bir ve her yeni sağlayıcı/etiket/veri alanında yeniden inceleme takvimi oluşturuldu.
- [ ] Veri ihlali tespit, kayıt, Kurul ve ilgili kişi bildirim süreci hazırlandı.
