import { yoneticiyiZorunluKil } from '@/lib/auth';
import SifreFormu from './SifreFormu';

export default async function SifreSayfasi() {
  await yoneticiyiZorunluKil();

  return (
    <div className="space-y-6 max-w-md">
      <div className="border-b-2 border-stone-800 pb-3">
        <h1 className="text-2xl font-extrabold text-stone-900">Şifre Değiştir</h1>
        <p className="text-xs text-stone-600 mt-1">
          En az 10 karakter; harf, rakam ve özel karakter içermelidir. Değişiklikten sonra bu cihaz dışındaki
          tüm oturumlar kapatılır.
        </p>
      </div>
      <div className="p-5 bg-white border-2 border-stone-800">
        <SifreFormu />
      </div>
    </div>
  );
}
