import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Github, Linkedin, 
  Send, CheckCircle2, Copy, Check, ExternalLink, FileText 
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { mesajGonder } from '../app/actions/iletisim';

interface ContactViewProps {
  onOpenCV: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenCV }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Staj & İş Teklifi',
    message: '',
    kvkk: false,
    website: ''
  });

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setSendError(null);

    try {
      // Mesaj sunucuda doğrulanır ve iletisim_mesajlari tablosuna kaydedilir
      const sonuc = await mesajGonder({
        adSoyad: formData.name,
        eposta: formData.email,
        konu: formData.subject,
        mesaj: formData.message,
        kvkk: formData.kvkk,
        website: formData.website
      });

      if (sonuc.ok) {
        setFormSubmitted(true);
      } else {
        setSendError(sonuc.hata || 'Gönderim sırasında bir hata oluştu.');
      }
    } catch {
      setSendError('Bir ağ sorunu oluştu. Lütfen tekrar deneyin ya da aşağıdaki butonla e-posta programınızla gönderin.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-stone-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold block mb-1">
          İletişim & Randevu
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Bana Ulaşın
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Büyük veri analitiği, makine öğrenmesi ya da staj olanakları için dilediğiniz kanaldan mesaj bırakabilir veya doğrudan profilimi ziyaret edebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Direct channels (Sharp) */}
        <div className="md:col-span-5 space-y-3">
          {/* LinkedIn Card */}
          <div className="p-4 bg-white border border-stone-300 hover:border-orange-600 transition-all shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-stone-500 font-medium">LinkedIn</span>
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    in/salih-sülkü
                  </span>
                </div>
              </div>
              <a
                href={CV_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-none bg-stone-100 text-stone-600 hover:text-orange-600 transition-colors"
                title="LinkedIn Profili"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="p-4 bg-white border border-stone-300 hover:border-orange-600 transition-all shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-stone-500 font-medium">GitHub</span>
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    github.com/{CV_DATA.githubUsername}
                  </span>
                </div>
              </div>
              <a
                href={CV_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-none bg-stone-100 text-stone-600 hover:text-orange-600 transition-colors"
                title="GitHub Profili"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="p-4 bg-white border border-stone-300 hover:border-orange-600 transition-all shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="block text-[11px] text-stone-500 font-medium">E-Posta</span>
                  <a
                    href={`mailto:${CV_DATA.email}`}
                    className="text-xs font-semibold text-stone-900 hover:text-orange-600 truncate block transition-colors"
                  >
                    {CV_DATA.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(CV_DATA.email, 'email')}
                className="p-1.5 rounded-none bg-stone-100 text-stone-500 hover:text-orange-600 shrink-0 ml-1"
                title="Kopyala"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="p-4 bg-white border border-stone-300 hover:border-orange-600 transition-all shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-stone-500 font-medium">Telefon</span>
                  <a
                    href={`tel:${CV_DATA.phone}`}
                    className="text-xs font-mono font-bold text-stone-900 hover:text-orange-600 transition-colors"
                  >
                    {CV_DATA.formattedPhone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(CV_DATA.phone, 'phone')}
                className="p-1.5 rounded-none bg-stone-100 text-stone-500 hover:text-orange-600 shrink-0"
                title="Kopyala"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="p-4 bg-white border border-stone-300 flex items-center gap-3 text-xs text-stone-600 shadow-xs">
            <div className="w-8 h-8 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 block">{CV_DATA.location}</span>
              <span className="text-[11px] text-stone-500">Hibrit veya Uzaktan (Remote) çalışmaya uygun</span>
            </div>
          </div>

          {/* CV Button */}
          <div className="pt-1">
            <button
              onClick={onOpenCV}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-none bg-white hover:bg-orange-50 border-2 border-stone-800 hover:border-orange-600 text-xs font-bold text-stone-900 hover:text-orange-600 transition-colors duration-200 shadow-xs"
            >
              <FileText className="w-4 h-4 text-orange-600" />
              Yazdırılabilir CV (Özgeçmiş) Önizle
            </button>
          </div>
        </div>

        {/* Right Column: Contact form (Sharp) */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-7 bg-white border-2 border-stone-800 shadow-sm">
            <h2 className="text-base font-bold text-stone-900 mb-1">
              Hızlı Mesaj Gönderin
            </h2>
            <p className="text-xs text-stone-600 mb-4">
              Aşağıdaki formu doldurarak doğrudan bana not bırakabilirsiniz.
            </p>

            {formSubmitted ? (
              <div className="p-5 bg-orange-50 border border-orange-200 text-center space-y-2.5">
                <div className="w-10 h-10 rounded-none bg-orange-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Mesajınız Alındı!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Teşekkürler Sayın <span className="text-orange-600 font-bold">{formData.name}</span>. En kısa sürede <span className="font-mono text-stone-800">{formData.email}</span> adresi üzerinden geri dönüş yapacağım.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Staj & İş Teklifi', message: '', kvkk: false, website: '' });
                  }}
                  className="mt-2 px-3.5 py-1.5 text-xs text-stone-800 bg-stone-200 hover:bg-stone-300 font-semibold"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Adınız Soyadınız <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ad Soyad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-stone-50 border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    E-Posta Adresiniz <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ornek@alanadi.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-stone-50 border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Konu
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-orange-600"
                  >
                    <option value="Staj & İş Teklifi">Staj & İş Teklifi</option>
                    <option value="Büyük Veri & Proje">Büyük Veri & Proje</option>
                    <option value="Makine Öğrenmesi">Makine Öğrenmesi</option>
                    <option value="Genel Tanışma">Genel Tanışma</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-stone-800">
                      Mesajınız <span className="text-orange-600">*</span>
                    </label>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    placeholder="Mesajınızı buraya yazabilirsiniz..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-stone-50 border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600 resize-none"
                  />
                </div>

                <label className="flex items-start gap-2 text-[11px] text-stone-700 leading-snug">
                  <input
                    type="checkbox"
                    required
                    checked={formData.kvkk}
                    onChange={(e) => setFormData({ ...formData, kvkk: e.target.checked })}
                    className="mt-0.5 accent-orange-600"
                  />
                  <span>
                    Adım, e-posta adresim ve mesajımın yalnızca bana yanıt verilmesi amacıyla işlenmesini
                    kabul ediyorum.{' '}
                    <a href="/cerez-politikasi" target="_blank" className="text-orange-600 underline">
                      KVKK bilgilendirmesi
                    </a>
                  </span>
                </label>

                {/* Bot tuzağı: insanlar görmez, botlar doldurur */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                />

                {sendError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 space-y-2">
                    <p>{sendError}</p>
                    <a
                      href={`mailto:salihsul27@gmail.com?subject=${encodeURIComponent(formData.subject || 'İletişim')}&body=${encodeURIComponent(`Ad Soyad: ${formData.name}\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white font-bold text-[11px] hover:bg-red-700 transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      E-Posta Programıyla Gönder
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 hover:ring-2 hover:ring-orange-400/40 transition-all duration-200 disabled:opacity-50 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSending ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
