export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
  githubUrl: string;
  liveUrl?: string;
  interactiveType?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Temel Düzey' | 'Orta Düzey' | 'İleri Düzey' | 'Yetkin';
    levelPercent: number;
    tag: string;
    description: string;
  }[];
}

export interface EducationItem {
  institution: string;
  department?: string;
  degree?: string;
  period: string;
  location: string;
  status: 'Devam Ediyor' | 'Mezun';
  highlights: string[];
}

export const CV_DATA = {
  name: "Salih SÜLKÜ",
  title: "Büyük Veri Analistliği & Veri Bilimi",
  shortBio: "Büyük veri analitiği, makine öğrenmesi algoritmaları ve veri odaklı yazılım mimarileri üzerine yoğunlaşıyorum.",
  longBio: "Büyük veri kümelerinden anlamlı içgörüler çıkarmak, doğrusal ve istatistiksel modeller kurmak, ilişkisel ve NoSQL veritabanlarını optimize etmek temel odak alanlarımdır. Çalışma hayatımda değer üretebileceğim ve uzmanlığımı pekiştireceğim ön tecrübeler edinmek istiyorum.",
  location: "Bursa, Türkiye",
  phone: "05444049065",
  formattedPhone: "+90 544 404 90 65",
  email: "salihsulku@iCloud.com",
  github: "https://github.com/SalihSulku",
  githubUsername: "SalihSulku",
  linkedin: "https://www.linkedin.com/in/salih-s%C3%BClk%C3%BC-ab95a2389/",
  linkedinUsername: "salih-sülkü",
  languages: [
    { name: "Türkçe", level: "Anadil", code: "TR" },
    { name: "İngilizce", level: "Orta – İleri Düzey (B2-C1)", code: "EN" }
  ],
  stats: [
    { label: "Büyük Veri & İstatistik", value: "MCBÜ", detail: "2025 – Devam" },
    { label: "Temel Programlama", value: "3+ Dil", detail: "Python, SQL, C#" },
    { label: "Veritabanı Mimarisi", value: "3 Sistem", detail: "SQL Server, Mongo, Cassandra" },
    { label: "ML & Veri Analitiği", value: "%89.2", detail: "Model R² Başarısı" }
  ],
  education: [
    {
      institution: "MANİSA CELÂL BAYAR ÜNİVERSİTESİ",
      department: "Manisa Teknik Bilimler Meslek Yüksekokulu, İstatistik Bölümü, Büyük Veri Analistliği",
      period: "2025 – Devam Ediyor",
      location: "Manisa, Türkiye",
      status: "Devam Ediyor",
      highlights: [
        "Büyük veri analitiği, istatistiksel modelleme ve olasılık kuramı",
        "Python ile veri madenciliği, veri temizleme ve görselleştirme",
        "İlişkisel veritabanları (RDBMS) ve NoSQL dağıtık sistem temelleri"
      ]
    },
    {
      institution: "NURİ ERBAK ANADOLU LİSESİ",
      department: "Eşit Ağırlık / Türkçe & Matematik Alanı",
      period: "2021 – 2025",
      location: "Bursa, Türkiye",
      status: "Mezun",
      highlights: [
        "Eşit Ağırlık alanı kapsamında matematiksel modelleme, analitik düşünme ve algoritma temelleri",
        "Akademik başarı ve analitik modelleme yatkınlığı"
      ]
    }
  ] as EducationItem[],
  skillCategories: [
    {
      title: "Programlama Dilleri",
      description: "Veri işleme, istatistiksel hesaplama ve nesne yönelimli yazılım dilleri",
      skills: [
        {
          name: "Python",
          level: "İleri Düzey",
          levelPercent: 90,
          tag: "Veri Bilimi & ML",
          description: "Veri manipülasyonu, makine öğrenmesi modelleri, otomasyon scriptleri ve analitik algoritmalar."
        },
        {
          name: "SQL",
          level: "Yetkin",
          levelPercent: 88,
          tag: "Veri Sorgulama",
          description: "Karmaşık JOIN'ler, alt sorgular, indeksleme, veri tablosu tasarımı ve toplu veri işleme."
        },
        {
          name: "C#",
          level: "Orta Düzey",
          levelPercent: 78,
          tag: "Masaüstü & Backend",
          description: "WinForms arayüzleri, DataGridView bileşenleri, OOP prensipleri ve kurumsal masaüstü yazılımları."
        }
      ]
    },
    {
      title: "Veritabanı Sistemleri",
      description: "Yapılandırılmış ve dağıtık veri saklama mimarileri",
      skills: [
        {
          name: "SQL Server",
          level: "Yetkin",
          levelPercent: 85,
          tag: "RDBMS",
          description: "İlişkisel veritabanı tasarımı, T-SQL sorguları, CRUD operasyonları ve veri bütünlüğü kuralları."
        },
        {
          name: "MongoDB",
          level: "Temel Düzey",
          levelPercent: 62,
          tag: "NoSQL / Doküman",
          description: "BSON/JSON doküman tabanlı veri koleksiyonları oluşturma ve esnek şema sorgulamaları."
        },
        {
          name: "Apache Cassandra",
          level: "Temel Düzey",
          levelPercent: 58,
          tag: "Büyük Veri / Dağıtık",
          description: "Yüksek hacimli dağıtık veri mimarileri ve sütun bazlı NoSQL depolama ilkeleri."
        }
      ]
    },
    {
      title: "Veri Analitiği & Kütüphaneler",
      description: "Veri temizleme, istatistiksel analiz ve görselleştirme araç takımı",
      skills: [
        {
          name: "Pandas",
          level: "İleri Düzey",
          levelPercent: 92,
          tag: "DataFrames",
          description: "Eksik veri doldurma, zaman serileri, group-by agregasyonları ve veri dönüştürme."
        },
        {
          name: "Seaborn",
          level: "Yetkin",
          levelPercent: 86,
          tag: "İstatistiksel Görselleştirme",
          description: "Korelasyon ısı haritaları (Heatmap), dağılım grafikleri, regresyon eğrileri ve dağılım testleri."
        },
        {
          name: "Excel",
          level: "İleri Düzey",
          levelPercent: 90,
          tag: "İş Zekası & Pivot",
          description: "İleri düzey formüller, Pivot Table, veri doğrulama ve CSV/XLSX veri aktarımı."
        },
        {
          name: "Jupyter Notebook & Google Colab",
          level: "Yetkin",
          levelPercent: 88,
          tag: "Geliştirme Ortamı",
          description: "İnteraktif veri analizi, adım adım model doğrulama ve bulut GPU üzerinde model eğitimi."
        }
      ]
    },
    {
      title: "Geliştirme Araçları & Ekosistem",
      description: "Kod yönetimi, versiyonlama ve IDE araçları",
      skills: [
        {
          name: "GitHub & Git",
          level: "Yetkin",
          levelPercent: 84,
          tag: "Versiyon Kontrol",
          description: "Kaynak kod takibi, commit disiplini, repozituar yönetimi ve açık kaynak paylaşımı."
        },
        {
          name: "Visual Studio",
          level: "Yetkin",
          levelPercent: 80,
          tag: "IDE",
          description: "C# WinForms ve C# çözüm yapılandırması, hata ayıklama (debug) ve derleme yönetimi."
        }
      ]
    }
  ] as SkillCategory[],
  projects: [
    {
      id: "anxiety-data-story",
      title: "Kaygıyı Ne Büyütüyor? (Etkileşimli Veri Hikâyesi)",
      category: "Veri Görselleştirme & İstatistik",
      shortDesc: "300 kişilik örneklemle uyku, kafein ve stresin kaygı puanıyla ilişkisini scrollytelling ile aktaran etkileşimli veri görselleştirme projesi.",
      fullDesc: "Kaggle Social Anxiety veri setinden (11.000 kayıt) derlenen 300 kişilik rastgele örneklem üzerinden; uyku süresi, günlük kafein miktarı ve stres seviyelerinin bireylerin kaygı puanları (1-10) üzerindeki dağılımı ve korelasyonu incelendi. Ziyaretçilerin adım adım veriyi keşfedebildiği modern scrollytelling anlatımı, dinamik SVG/Canvas grafik animasyonları ve kullanıcıların kendi parametrelerini deneyimleyebildiği etkileşimli hesaplayıcı modül geliştirildi.",
      technologies: ["JavaScript (ES6+)", "HTML5 Canvas & SVG", "Veri Hikâyeciliği (Scrollytelling)", "Kaggle Dataset", "İstatistiksel Analiz", "GitHub Pages"],
      metrics: [
        { label: "Veri Kümesi", value: "Kaggle (11.000 Kayıt)" },
        { label: "Örneklem Grubu", value: "300 Kişilik Temsil" },
        { label: "Görselleştirme", value: "Etkileşimli Scrollytelling" },
        { label: "Yayın Durumu", value: "Canlı GitHub Pages" }
      ],
      keyFeatures: [
        "Adım adım kaydırmalı (scrollytelling) veri keşfi ve dinamik noktacık (scatter plot) geçişleri",
        "Uyku saatine ve kafein alımına bağlı kaygı puanı sıçramalarının istatistiksel analizi",
        "Ziyaretçinin kendi parametrelerini girerek ortalama skoru gözlemleyebildiği hesaplayıcı",
        "Korelasyon ve nedensellik ayrımına dikkat çeken veri etiği ve analiz yaklaşımı"
      ],
      githubUrl: "https://github.com/SalihSulku/Kaygi",
      liveUrl: "https://salihsulku.github.io/Kaygi/",
      interactiveType: "data-storytelling"
    },
    {
      id: "student-grade-predictor",
      title: "Öğrenci Not Tahmini Makine Öğrenmesi Uygulaması",
      category: "Makine Öğrenmesi & Veri Analitiği",
      shortDesc: "Çalışma süresi, devamsızlık ve önceki sınav verileriyle Doğrusal Regresyon modeli kullanarak öğrenci final notlarını tahmin eden analitik sistem.",
      fullDesc: "Örneklemlerin diğer bağımsız değişkenlerinden (haftalık çalışma saati, ders devamsızlık oranı, ara sınav notları) yola çıkarak nihai notları gerçeğe en yakın şekilde tahmin eden Doğrusal Regresyon (Linear Regression) modeli kuruldu. Modelin açıklayıcılığı R² (Belirlilik Katsayısı) metriği ve Ortalama Kare Hata (MSE) ile test edilerek yüksek başarı oranı elde edildi.",
      technologies: ["Python", "Pandas", "Seaborn", "Scikit-Learn", "Jupyter Notebook", "Google Colab"],
      metrics: [
        { label: "Model Algoritması", value: "Linear Regression" },
        { label: "Model Başarısı (R²)", value: "0.892" },
        { label: "Test/Train Oranı", value: "20 / 80" },
        { label: "Metrik Ölçümü", value: "R² & MSE" }
      ],
      keyFeatures: [
        "Veri seti üzerinde eksik ve aykırı değerlerin (outliers) tespiti ve temizlenmesi",
        "Seaborn kütüphanesi ile özellikler arası Pearson korelasyon matrisi çıkarılması",
        "Öğrencinin haftalık çalışma saati ve devamsızlık oranına bağlı dinamik regresyon tahmini",
        "R² metriği ile gerçek değerler ve tahmin edilen değerlerin saçılım analizi"
      ],
      githubUrl: "https://github.com/SalihSulku",
      interactiveType: "ml-prediction"
    },
    {
      id: "stock-inventory-system",
      title: "Stok ve Envanter Yönetim Sistemi",
      category: "Masaüstü & Veritabanı Yazılımı",
      shortDesc: "C# ve WinForms kullanılarak DataGridView üzerinden ürün listeleme, CRUD işlemleri ve Excel/CSV dışa aktarım özelliklerine sahip envanter yönetim arayüzü.",
      fullDesc: "İşletmelerin veya depoların envanter süreçlerini dijitalleştirmek amacıyla C# ve .NET WinForms teknolojisiyle geliştirilmiş yönetim yazılımı. DataGridView kontrolü üzerinden ürün listeleme, stok veri ekleme/silme işlemleri ve verilerin tek tıkla Excel/CSV formatına aktarılmasını sağlar.",
      technologies: ["C#", ".NET WinForms", "SQL Server / ADO.NET", "DataGridView", "Excel / CSV Export", "Visual Studio"],
      metrics: [
        { label: "Arayüz Mimarisi", value: "WinForms & DataGridView" },
        { label: "Veri Dışa Aktarım", value: "Excel / CSV" },
        { label: "Veritabanı", value: "SQL Server & ADO.NET" },
        { label: "İşlem Yeteneği", value: "Tam CRUD Desteği" }
      ],
      keyFeatures: [
        "DataGridView bileşeni ile hızlı ve düzenli ürün listeleme",
        "Yeni stok kalemi ekleme, mevcut ürünü düzenleme ve silme (CRUD) fonksiyonları",
        "Ürün kodu, kategori ve ada göre anlık filtreleme ve sorgulama",
        "Raporlama ve analiz için anlık CSV ve Excel dışa aktarım desteği"
      ],
      githubUrl: "https://github.com/SalihSulku",
      interactiveType: "inventory-management"
    }
  ] as ProjectItem[]
};
