# AestheticNotion.io - Ücretsiz Notion Widget Oluşturucu

Notion sayfalarına doğrudan gömülebilecek güzel, özelleştirilebilir widget'lar oluşturmak için modern ve kullanıcı dostu bir web uygulaması. Next.js, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## Özellikler

### Widget Türleri

- **Saat Widget'ı**
  - Dijital (12s/24s) veya Analog görünüm
  - Dünya çapında büyük şehirler için zaman dilimi desteği
  - İsteğe bağlı saniye gösterimi
  - Gerçek zamanlı güncellemelerle canlı önizleme

- **Hava Durumu Widget'ı**
  - Mevcut hava durumu gösterimi
  - Celsius veya Fahrenheit birimleri
  - Sadece bugün veya 3 günlük tahmin seçenekleri
  - Şehir bazlı hava durumu bilgisi

- **Geri Sayım Widget'ı**
  - Özel etkinlik adı ve tarihi
  - Gerçek zamanlı geri sayım zamanlayıcısı
  - Gün, saat, dakika ve saniye gösterimi
  - Etkinlik tarihi görüntüleme

### Özelleştirme Seçenekleri

- **Renkler**
  - Özel arka plan rengi
  - Şeffaf arka plan seçeneği
  - Özel metin rengi
  - Hex girişli renk seçici

- **Tipografi**
  - Sans-serif (varsayılan)
  - Serif
  - Monospace

- **Düzen**
  - Küçük, orta veya büyük iç boşluk
  - Duyarlı tasarım
  - Mobil uyumlu arayüz

## Teknoloji Yığını

- **Framework:** Next.js 15.2.4
- **Dil:** TypeScript
- **Stil:** Tailwind CSS 4.1.9
- **UI Bileşenleri:** Radix UI
- **Deployment:** Vercel-ready
- **Analytics:** Vercel Analytics

## Başlarken

### Gereksinimler

- Node.js 18+ veya üzeri
- pnpm (önerilen) veya npm

### Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/cumakaradash/aestheticnotion.git
cd aestheticnotion
```

2. Bağımlılıkları yükleyin:
```bash
pnpm install
# veya
npm install
```

3. Geliştirme sunucusunu çalıştırın:
```bash
pnpm dev
# veya
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### Production için Build Alma

```bash
pnpm build
pnpm start
```

## Nasıl Kullanılır

1. **Widget Türünü Seçin:** Saat, Hava Durumu veya Geri Sayım widget'larından birini seçin
2. **Özelleştirin:** Zaman dilimi, renkler, yazı tipleri ve düzen gibi ayarları yapılandırın
3. **Önizleme:** Widget'ınızın gerçek zamanlı güncellendiğini görün
4. **URL Oluşturun:** Gömme bağlantınızı almak için "Widget URL'si Oluştur" düğmesine tıklayın
5. **Notion'a Gömün:** 
   - Oluşturulan URL'yi kopyalayın
   - Notion'da `/embed` yazın
   - URL'yi yapıştırın
   - Tamamlandı!

## Proje Yapısı

```
├── app/
│   ├── api/
│   │   └── render/        # Widget render endpoint'i
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout
│   └── page.tsx           # Ana sayfa
├── components/
│   ├── ui/                # Yeniden kullanılabilir UI bileşenleri
│   └── widget-preview.tsx # Canlı widget önizlemesi
├── lib/
│   ├── utils.ts           # Yardımcı fonksiyonlar
│   └── timezones.ts       # Zaman dilimi verileri
└── public/                # Statik dosyalar
```

## API Route'ları

### `/api/render`

URL parametrelerine göre widget'ları render eder.

**Parametreler:**
- `type`: Widget türü (clock, weather, countdown)
- `tz`: Zaman dilimi (saat widget'ı için)
- `clockType`: Saat görüntüleme türü (12h, 24h, analog)
- `seconds`: Saniyeleri göster (true/false)
- `city`: Şehir adı (hava durumu widget'ı için)
- `units`: Sıcaklık birimleri (celsius/fahrenheit)
- `forecast`: Tahmin türü (today/3day)
- `event`: Etkinlik adı (geri sayım widget'ı için)
- `date`: Etkinlik tarihi (YYYY-MM-DD)
- `bg`: Arka plan rengi (hex veya "transparent")
- `color`: Metin rengi (hex)
- `font`: Yazı tipi ailesi (sans, serif, mono)
- `padding`: İç boşluk boyutu (small, medium, large)

## Deployment

Bu proje Vercel'de deployment için optimize edilmiştir:

1. Kodunuzu GitHub'a gönderin
2. Projeyi Vercel'e import edin
3. Sıfır yapılandırma ile deploy edin

## Gelecek Geliştirmeler

- [ ] Canlı hava durumu API entegrasyonu
- [ ] Ek widget türleri (alıntılar, resimler, vb.)
- [ ] Özel yazı tipi yükleme desteği
- [ ] Widget şablonları galerisi
- [ ] Kullanıcı hesapları ve kaydedilmiş widget'lar
- [ ] Animasyon seçenekleri

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen Pull Request göndermekten çekinmeyin.

## Lisans

Bu proje açık kaynaklıdır ve [MIT Lisansı](LICENSE) altında mevcuttur.

## Teşekkürler

- [Next.js](https://nextjs.org/) ile geliştirilmiştir
- UI bileşenleri [Radix UI](https://www.radix-ui.com/) kullanılmıştır
- İkonlar [Lucide](https://lucide.dev/) kütüphanesinden alınmıştır
- [Tailwind CSS](https://tailwindcss.com/) ile stillendirilmiştir

## Destek

Destek için lütfen GitHub deposunda bir issue açın veya web sitesi üzerinden bizimle iletişime geçin.
