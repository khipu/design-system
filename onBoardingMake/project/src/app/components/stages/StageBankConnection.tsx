import { useState } from 'react';
import { ArrowRight, ArrowLeft, Building, CheckCircle2 } from 'lucide-react';

interface StageBankConnectionProps {
  onNext: (data: any) => void;
  onBack: () => void;
  serviceInterest?: string;
  formData?: any;
  personType?: 'natural' | 'juridica';
}

export function StageBankConnection({ onNext, onBack, serviceInterest, formData: parentFormData, personType }: StageBankConnectionProps) {
  const [step, setStep] = useState<'select' | 'auth' | 'confirm'>('select');
  const [formData, setFormData] = useState({
    accountType: parentFormData?.accountType || '',
    bank: parentFormData?.bank || '',
    rut: parentFormData?.rut || '',
    password: '',
    selectedAccount: parentFormData?.selectedAccount || '',
    termsAccepted: parentFormData?.termsAccepted || false
  });

  const banks = [
    'Banco de Chile',
    'Banco Estado',
    'Banco Santander',
    'Banco BCI',
    'Banco Scotiabank',
    'Banco Itaú',
    'Banco Security',
    'Banco Falabella'
  ];

  const mockAccounts = [
    { id: '1', type: 'Cuenta Corriente', number: '****1234', bank: formData.bank },
    { id: '2', type: 'Cuenta Vista', number: '****5678', bank: formData.bank }
  ];

  const handleConnect = () => {
    if (formData.accountType && formData.bank && formData.rut && formData.password && formData.termsAccepted) {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    if (isWebScraping || formData.selectedAccount) {
      onNext(formData);
    }
  };

  const isWebScraping = serviceInterest === 'Web scrapping as service';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {isWebScraping 
            ? 'Etapa 4: Validación de identidad con Cuenta Bancaria'
            : personType === 'natural'
            ? 'Etapa 4: Validación de Identidad y Conexión Bancaria'
            : 'Etapa 4: Validación de Identidad Jurídica y Conexión Bancaria'
          }
        </h2>
        <p className="text-gray-600">
          {isWebScraping
            ? 'Para comprobar tu interés en la contratación de Web scraping as service'
            : 'Conecta tu banco para recibir tus pagos'
          }
        </p>
      </div>

      <div className="space-y-6 tour-form">
        {step === 'select' && (
          <>
            <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  Tipo de cuenta *
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona el tipo de cuenta</option>
                  {personType === 'natural'
                    ? <option value="Persona">Persona</option>
                    : <option value="Empresa">Empresa</option>
                  }
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  Selecciona tu banco *
                </label>
                <select
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona tu banco</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  RUT de la cuenta *
                </label>
                <input
                  type="text"
                  value={formData.rut}
                  onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                  placeholder="12.345.678-9"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-3">
                  Clave del banco *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Esta información está encriptada y protegida
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="w-5 h-5 text-blue-600 mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium mb-1">
                      Autorización para el uso de la cuenta
                    </p>
                    <p className="text-sm text-gray-600">
                      Acepto que Khipu utilice esta cuenta bancaria para la recaudación de pagos 
                      según los términos y condiciones del servicio.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Atrás
              </button>
              <button
                type="button"
                onClick={handleConnect}
                disabled={!formData.accountType || !formData.bank || !formData.rut || !formData.password || !formData.termsAccepted}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  formData.accountType && formData.bank && formData.rut && formData.password && formData.termsAccepted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Conectar banco
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-900">
                  ✓ Validación exitosa
                </h3>
              </div>
              <p className="text-green-800">
                {isWebScraping 
                  ? 'Hemos validado tu empresa correctamente.'
                  : 'Hemos validado tu cuenta bancaria correctamente. Ahora selecciona la cuenta que usarás para recibir pagos.'
                }
              </p>
            </div>

            {!isWebScraping && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Selecciona tu cuenta de recaudación *
                </h3>
                <div className="space-y-3">
                  {mockAccounts.map((account) => (
                    <label
                      key={account.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.selectedAccount === account.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="selectedAccount"
                          value={account.id}
                          checked={formData.selectedAccount === account.id}
                          onChange={(e) => setFormData({ ...formData, selectedAccount: e.target.value })}
                          className="w-5 h-5 text-blue-600"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{account.type}</p>
                          <p className="text-sm text-gray-600">
                            {account.bank} - {account.number}
                          </p>
                        </div>
                      </div>
                      {formData.selectedAccount === account.id && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('select')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Atrás
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!isWebScraping && !formData.selectedAccount}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isWebScraping || formData.selectedAccount
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isWebScraping ? 'Siguiente' : 'Confirmar cuenta'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}