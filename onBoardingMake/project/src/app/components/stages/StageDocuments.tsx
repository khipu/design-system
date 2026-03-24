import { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, FileText, Check, X } from 'lucide-react';

interface StageDocumentsProps {
  personType: 'natural' | 'juridica';
  onNext: (data: any) => void;
  onBack: () => void;
  formData?: any;
}

interface Document {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  fileName?: string;
}

export function StageDocuments({ personType, onNext, onBack, formData: parentFormData }: StageDocumentsProps) {
  const naturalDocs: Document[] = [
    { id: 'rut-front', name: 'RUT personal (lado frontal)', required: true, uploaded: false },
    { id: 'rut-back', name: 'RUT personal (lado posterior)', required: true, uploaded: false },
  ];

  const juridicaDocs: Document[] = [
    { id: 'escritura', name: 'Escritura / constitución de la empresa', required: true, uploaded: false },
    { id: 'poder', name: 'Documento que acredite la representación legal / poder', required: true, uploaded: false },
    { id: 'patente', name: 'Patente', required: false, uploaded: false },
  ];

  const [documents, setDocuments] = useState<Document[]>(() => {
    const base = personType === 'natural' ? naturalDocs : juridicaDocs;
    // Restaurar estado de documentos si existen datos previos
    if (parentFormData?.uploadedDocs) {
      return base.map(doc => ({
        ...doc,
        uploaded: parentFormData.uploadedDocs.includes(doc.id),
        fileName: parentFormData.uploadedDocNames?.[doc.id]
      }));
    }
    return base;
  });

  const handleFileUpload = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments(documents.map(doc =>
        doc.id === docId
          ? { ...doc, uploaded: true, fileName: file.name }
          : doc
      ));
    }
  };

  const handleRemoveFile = (docId: string) => {
    setDocuments(documents.map(doc =>
      doc.id === docId
        ? { ...doc, uploaded: false, fileName: undefined }
        : doc
    ));
  };

  const requiredDocsUploaded = documents
    .filter(doc => doc.required)
    .every(doc => doc.uploaded);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requiredDocsUploaded) {
      const uploadedDocs = documents.filter(d => d.uploaded).map(d => d.id);
      const uploadedDocNames = documents.reduce((acc, d) => {
        if (d.fileName) acc[d.id] = d.fileName;
        return acc;
      }, {} as Record<string, string>);
      onNext({ documents, uploadedDocs, uploadedDocNames });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Etapa 3: Carga de documentos
        </h2>
        <p className="text-gray-600">
          Sube los documentos requeridos para verificar tu identidad
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 tour-form">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-900 text-sm">
            <strong>💡 Tip:</strong> Asegúrate de que los documentos sean legibles y estén actualizados. 
            Los formatos permitidos son: PDF, JPG, PNG (máx. 5MB por archivo).
          </p>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    {doc.required && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        Obligatorio
                      </span>
                    )}
                    {!doc.required && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        Opcional
                      </span>
                    )}
                  </div>
                </div>
                {doc.uploaded && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>

              {!doc.uploaded ? (
                <label className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 font-medium">
                    Seleccionar archivo
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(doc.id, e)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-green-900 font-medium">
                      {doc.fileName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(doc.id)}
                    className="p-1 hover:bg-green-100 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-green-700" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Progreso de carga</p>
              <p className="text-sm text-gray-600 mt-1">
                {documents.filter(d => d.uploaded).length} de {documents.length} documentos subidos
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((documents.filter(d => d.uploaded).length / documents.length) * 100)}%
              </p>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${(documents.filter(d => d.uploaded).length / documents.length) * 100}%`
              }}
            />
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
            type="submit"
            disabled={!requiredDocsUploaded}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              requiredDocsUploaded
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}