import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Mail, Phone, MapPin, Send, CheckCircle2, 
  Copy, Check, Github, Linkedin, ExternalLink 
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { mesajGonder } from '../app/actions/iletisim';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    kvkk: false,
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Mesaj sunucuda doğrulanır ve iletisim_mesajlari tablosuna kaydedilir
      const sonuc = await mesajGonder({
        adSoyad: formData.name,
        eposta: formData.email,
        telefon: formData.phone,
        konu: formData.subject,
        mesaj: formData.message,
        kvkk: formData.kvkk,
        website: formData.website
      });

      if (sonuc.ok) {
        setIsSuccess(true);
      } else {
        setSubmitError(sonuc.hata || 'Gönderim hatası');
      }
    } catch {
      setSubmitError('Bir ağ sorunu oluştu. Lütfen tekrar deneyin ya da e-posta programınızla gönderin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', message: '', kvkk: false, website: '' });
    setIsSuccess(false);
    setSubmitError(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Modal Card (Sharp Corners) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-xl bg-white border-2 border-stone-800 rounded-none shadow-2xl overflow-hidden z-10 my-auto text-stone-900"
        >
          {/* Top orange line */}
          <div className="h-1.5 w-full bg-orange-600" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-none text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-7">
            {/* Header */}
            <div className="mb-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold block mb-1">
                İletişim & Not
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Salih Sülkü ile İletişime Geçin
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Staj, büyük veri analitiği projeleri veya iş birliği için mesaj bırakabilir, LinkedIn veya e-posta yoluyla doğrudan ulaşabilirsiniz.
              </p>
            </div>

            {/* Quick contact shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              {/* LinkedIn */}
              <a
                href={CV_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-none bg-stone-50 border border-stone-300 hover:border-orange-600 text-stone-800 hover:text-orange-600 transition-all text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-6 h-6 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Linkedin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold truncate">LinkedIn Profili</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              </a>

              {/* GitHub */}
              <a
                href={CV_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-none bg-stone-50 border border-stone-300 hover:border-orange-600 text-stone-800 hover:text-orange-600 transition-all text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-6 h-6 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Github className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold truncate">github.com/{CV_DATA.githubUsername}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              </a>

              {/* Email */}
              <div className="flex items-center justify-between p-2.5 rounded-none bg-stone-50 border border-stone-300 text-xs">
                <a
                  href={`mailto:${CV_DATA.email}`}
                  className="flex items-center gap-2 text-stone-800 hover:text-orange-600 truncate"
                >
                  <div className="w-6 h-6 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{CV_DATA.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(CV_DATA.email, 'email')}
                  title="E-postayı Kopyala"
                  className="p-1 text-stone-400 hover:text-orange-600 ml-1 shrink-0"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-2.5 rounded-none bg-stone-50 border border-stone-300 text-xs">
                <a
                  href={`tel:${CV_DATA.phone}`}
                  className="flex items-center gap-2 text-stone-800 hover:text-orange-600 truncate"
                >
                  <div className="w-6 h-6 rounded-none bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono truncate">{CV_DATA.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(CV_DATA.phone, 'phone')}
                  title="Numarayı Kopyala"
                  className="p-1 text-stone-400 hover:text-orange-600 ml-1 shrink-0"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Form or Success State */}
            {isSuccess ? (
              <div className="p-5 rounded-none bg-orange-50 border border-orange-200 text-center">
                <div className="w-10 h-10 rounded-none bg-orange-600 text-white flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1">Mesajınız Alındı</h4>
                <p className="text-xs text-stone-600 mb-4">
                  Teşekkürler Sayın <span className="text-orange-600 font-bold">{formData.name}</span>. Mesajınız iletildi, en kısa sürede dönüş sağlanacaktır.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={resetForm}
                    className="px-3.5 py-1.5 text-xs text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-none font-medium transition-colors"
                  >
                    Yeni Mesaj
                  </button>
                  <button
                    onClick={onClose}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-none transition-colors"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Adınız Soyadınız <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ad Soyad"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-none bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      E-Posta Adresiniz <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ornek@alanadi.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-none bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Telefon <span className="text-stone-400 font-normal">(İsteğe Bağlı)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="05xx xxx xx xx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-none bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Konu
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 rounded-none bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-orange-600"
                    >
                      <option value="">Seçiniz...</option>
                      <option value="Staj & İş Teklifi">Staj & İş Teklifi</option>
                      <option value="Büyük Veri & Proje">Büyük Veri & Proje</option>
                      <option value="Makine Öğrenmesi">Makine Öğrenmesi</option>
                      <option value="Genel Tanışma">Genel Tanışma</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-stone-700">
                      Mesajınız <span className="text-orange-600">*</span>
                    </label>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <textarea
                    required
                    rows={3}
                    maxLength={500}
                    placeholder="Mesajınızı buraya yazabilirsiniz..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-600 resize-none"
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

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 space-y-2">
                    <p>{submitError}</p>
                    <a
                      href={`mailto:salihsul27@gmail.com?subject=${encodeURIComponent(formData.subject || 'İletişim')}&body=${encodeURIComponent(`Ad Soyad: ${formData.name}\nE-posta: ${formData.email}\nTelefon: ${formData.phone || 'Belirtilmedi'}\n\nMesaj:\n${formData.message}`)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white font-bold text-[11px] hover:bg-red-700 transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      E-Posta Programıyla Gönder
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 rounded-none text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-none text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
