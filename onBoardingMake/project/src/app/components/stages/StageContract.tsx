import { useState } from 'react';
import { ArrowRight, ArrowLeft, FileText, AlertCircle, Mail } from 'lucide-react';

interface StageContractProps {
  personType: 'natural' | 'juridica';
  onNext: (data: any) => void;
  onBack: () => void;
  formData?: any;
}

export function StageContract({ personType, onNext, onBack, formData }: StageContractProps) {
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [showObjection, setShowObjection] = useState(false);

  // Fecha actual en español
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.toLocaleString('es-CL', { month: 'long' });
  const currentYear = now.getFullYear();

  // Determinar si mostrar el contrato de Mandato para Pagos Instantáneos
  const serviceInterest = formData?.serviceInterest || '';
  const collectionModel = formData?.collectionModel || '';
  const industry = formData?.industry || '';
  const businessSize = formData?.businessSize || '';
  const tipoRecaudacion = formData?.tipoRecaudacion || '';
  
  const showMandatoContract = personType === 'natural' && serviceInterest === 'Pagos instantáneos';
  
  // Determinar si mostrar el contrato de MANDATO PARA PERCIBIR EL PAGO
  // Para negocios < 160.000 USD que elijan pagos instantáneos y que NO sean PSP o recaudo por mandato de terceros
  const isSmallBusiness = businessSize === '0 - 60.000 USD' || businessSize === '60.001 - 160.000 USD';
  const isPSP = industry === 'Proveedor de Servicios de Pago (PSP)';
  const isMandatoTerceros = tipoRecaudacion === 'mandato_terceros';
  
  const showMandatoPercibirPagoContract = 
    personType === 'juridica' &&
    serviceInterest === 'Pagos instantáneos' &&
    isSmallBusiness &&
    !isPSP &&
    !isMandatoTerceros;
  
  // Contrato "DATO PARA PERCIBIR EL PAGO" (khipu-mandate-agreement.md)
  // Se activa para Pagos instantáneos + Cuenta Khipu 24hrs (cualquier tipo de persona)
  const showKhipu24hrsContract =
    serviceInterest === 'Pagos instantáneos' &&
    collectionModel === 'Cuenta Khipu con transferencia en 24hrs hábiles';

  // Determinar si mostrar el contrato de Prestación de Servicios para Persona Jurídica con Cuenta Khipu
  const showPrestacionServiciosContract = 
    personType === 'juridica' && 
    serviceInterest === 'Pagos instantáneos' && 
    collectionModel === 'Cuenta Khipu con transferencia en 24hrs hábiles' &&
    !showMandatoPercibirPagoContract &&
    !showKhipu24hrsContract;
  
  // Determinar si mostrar el contrato de Mandato para Persona Jurídica con Cuenta Propia
  const showPrestacionServiciosCuentaPropiaContract = 
    personType === 'juridica' && 
    serviceInterest === 'Pagos instantáneos' && 
    collectionModel === 'Cuenta Propia' &&
    industry !== 'PSP';

  // Determinar si mostrar el contrato de Acuerdo de Cooperación Comercial para PSP o Mandato de Terceros
  const showAcuerdoPSPContract = 
    personType === 'juridica' && 
    serviceInterest === 'Pagos instantáneos' &&
    (isPSP || isMandatoTerceros);

  // Determinar si mostrar el contrato de Prestación de Servicios WaaS
  const showWaaSContract = 
    serviceInterest === 'Web scrapping as service' ||
    serviceInterest === 'Validación de identidad';

  // Determinar si mostrar el contrato de Mandato para Pagos Automáticos
  const showPagosAutomaticosContract =
    serviceInterest === 'Pagos automáticos';

  // Determinar si mostrar el contrato de Acuerdo de Participación de Ingresos (Revenue Sharing)
  const showRevenueSharingContract = 
    personType === 'juridica' && 
    serviceInterest === 'Pagos instantáneos' && 
    collectionModel === 'Soy Business Partner: Cuenta Khipu';

  // Determinar la URL del tarifario según el plan seleccionado
  const selectedPlan = formData?.plan || '';
  const getTarifarioUrl = () => {
    if (selectedPlan === 'plan-porcentual') {
      return 'https://s3.amazonaws.com/website.khipu.com/docs/tarifario_porcentual.pdf';
    } else if (selectedPlan === 'plan-fija') {
      return 'https://s3.amazonaws.com/website.khipu.com/docs/tarifario_fijo.pdf';
    }
    return '';
  };

  const tarifarioUrl = getTarifarioUrl();

  // Obtener datos del formulario para autocompletar el contrato
  const getContractData = () => {
    if (personType === 'natural') {
      const addressParts = [
        formData?.street,
        formData?.floor,
        formData?.commune,
        formData?.region
      ].filter(Boolean);
      const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '_________________';
      
      return {
        fullName: `${formData?.firstName || '_________________'} ${formData?.lastName || ''}`.trim(),
        rut: formData?.rut || '_________________',
        address: fullAddress,
        street: formData?.street || '_________________',
        floor: formData?.floor || '_________________',
        commune: formData?.commune || '_________________',
        region: formData?.region || '_________________'
      };
    } else {
      const addressParts = [
        formData?.businessStreet,
        formData?.businessFloor,
        formData?.businessCommune,
        formData?.businessRegion
      ].filter(Boolean);
      const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '_________________';
      
      return {
        businessName: formData?.businessName || '_________________',
        businessRut: formData?.businessRut || '_________________',
        fullName: formData?.legalRepName || '_________________',
        rut: formData?.businessRut || '_________________',
        legalRepRut: formData?.legalRepRut || '_________________',
        address: fullAddress,
        street: formData?.businessStreet || '_________________',
        floor: formData?.businessFloor || '_________________',
        commune: formData?.businessCommune || '_________________',
        region: formData?.businessRegion || '_________________'
      };
    }
  };

  const contractData = getContractData();

  const contractSections = [
    {
      title: '1. Objeto del contrato',
      content: 'El presente contrato regula la prestación de servicios de procesamiento de pagos mediante transferencias electrónicas (TEF) entre Khipu y el cliente.'
    },
    {
      title: '2. Condiciones de servicio',
      content: 'El cliente autoriza a Khipu para procesar transacciones en su nombre, recaudar fondos y transferirlos a la cuenta bancaria designada según los términos acordados.'
    },
    {
      title: '3. Tarifas y comisiones',
      content: 'Las tarifas aplicables corresponden al plan seleccionado durante el proceso de activación. Khipu se reserva el derecho de modificar las tarifas con previo aviso de 30 días.'
    },
    {
      title: '4. Plazos de liquidación',
      content: 'Los fondos recaudados serán transferidos a la cuenta del cliente en un plazo máximo de 24 horas hábiles desde la confirmación de la transacción.'
    },
    {
      title: '5. Obligaciones del cliente',
      content: 'El cliente se compromete a proporcionar información veraz, mantener actualizados sus datos y cumplir con todas las normativas vigentes en materia de comercio electrónico.'
    },
    {
      title: '6. Seguridad y protección de datos',
      content: 'Khipu se compromete a proteger la información del cliente según la Ley 19.628 de Protección de Datos Personales y las mejores prácticas de la industria.'
    },
    {
      title: '7. Terminación del contrato',
      content: 'Cualquiera de las partes puede terminar el contrato con un aviso previo de 30 días. Khipu puede terminar inmediatamente en caso de incumplimiento grave.'
    }
  ];

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      onNext({ contractAccepted: true });
    }, 1000);
  };

  const handleReject = () => {
    setAccepted(false);
    setShowObjection(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Etapa 6: Firma de contrato</h2>
        <p className="text-gray-600">
          Revisa y firma el contrato de servicios
        </p>
      </div>

      <div className="space-y-6 tour-form">
        {accepted === null && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                📄 Contrato generado automáticamente
              </h3>
              <p className="text-blue-800 text-sm">
                Este contrato se ha generado usando la información que proporcionaste durante 
                el onboarding: tamaño de empresa, industria, modelo de recaudación y plan seleccionado.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h3 className="font-semibold text-gray-900">
                  {showWaaSContract
                    ? 'Contrato de Prestación de Servicios WaaS'
                    : showPagosAutomaticosContract
                    ? 'Contrato de Mandato para la Suscripción del Servicio de Pagos Automáticos'
                    : showKhipu24hrsContract
                    ? 'Mandato para Percibir el Pago — Cuenta Khipu con transferencia en 24hrs hábiles'
                    : 'Contrato de Servicios de Transferencias Electrónicas de Fondos (TEF)'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {personType === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}
                </p>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto space-y-6">
                {showPrestacionServiciosContract ? (
                  // Contrato de Prestación de Servicios + Mandato para Persona Jurídica con Cuenta Khipu 24hrs
                  <>
                  {/* Contrato de Prestación de Servicios para Persona Jurídica */}
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>CONTRATO</p>
                      <p>DE PRESTACIÓN DE SERVICIOS</p>
                      <p className="mt-2">{contractData.businessName}</p>
                      <p>Y</p>
                      <p>KHIPU SPA</p>
                    </div>

                    <p>
                      En el Santiago de Chile lugar, a {currentDay} de {currentMonth} de {currentYear}, entre:
                    </p>

                    <p>
                      Por una parte: KHIPU SpA, en adelante "Khipu", sociedad por acciones, Rol Único Tributario N° 76.187.287-7, 
                      representada por don Roberto Opazo Gazmuri, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 9.123.845-4 
                      y don Emilio Davis Méndez, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados 
                      en calle Las Urbinas N° 53, piso 13, comuna de Providencia, Chile,
                    </p>

                    <p>
                      Por otra parte: <strong>{contractData.businessName}</strong>, Rol Único Tributario N° <strong>{contractData.businessRut}</strong>, sociedad representada por{' '}
                      don(a) <strong>{contractData.fullName}</strong>, chileno, Cédula Nacional de Identidad N° <strong>{contractData.legalRepRut}</strong>, domiciliado{' '}
                      en <strong>{contractData.street}</strong>, piso <strong>{contractData.floor}</strong>, comuna de <strong>{contractData.commune}</strong>, <strong>{contractData.region}</strong>, en adelante "el Cobrador",{' '}
                      referidos conjuntamente como las "Partes", se ha convenido el siguiente Contrato de prestación de servicios:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: Definiciones.</h4>
                      <p className="mb-2">Para los efectos del presente Contrato se definen los siguientes conceptos:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>"Khipu", es KHIPU SPA, empresa que celebra este Contrato como prestador de servicios, quien se compromete a implementar y mantener el Sistema Khipu para posibilitar el Pago entre el Cobrador y el Pagador por medio de dicho Sistema.</li>
                        <li>"Cobrador", o el "Cliente", es <strong>{contractData.businessName}</strong> para quien Khipu se compromete a prestar los servicios a que refiere el presente Contrato.</li>
                        <li>"Pagador", es la persona natural o jurídica que ha acordado un Pago con el Cobrador.</li>
                        <li>"Sistema Khipu", es el conjunto de programas computacionales (en especial la Aplicación Terminal de Pago Khipu), licencias, portales web, procedimientos, equipamiento (computadores personales, servidores y aparatos de telecomunicaciones) y servicios de terceros que permiten perfeccionar pagos electrónicos, mediante transferencias electrónicas bancarias entre cuentas corrientes y/o cuentas vistas abiertas en el sistema bancario nacional, conforme a sus políticas, prácticas y mecanismos de seguridad, u otro sistema determinado por Khipu. El Sistema podrá incluir herramientas electrónicas que faciliten la comunicación entre El Cobrador y El Pagador, sin que por ello Khipu se transforme en parte de las convenciones que pacten, ni actúen como intermediario.</li>
                        <li>"Aplicación Terminal de Pago Khipu", es un navegador web o browser, que permite navegar por páginas programadas en lenguaje HTML, preparado para automatizar la generación de transferencias de dinero entre cuentas bancarias de El Pagador y El Cliente, mostrando las páginas web con una representación visual distinta a la que mostraría un navegador web de propósito general, pero sin alterar los mecanismos de seguridad de las mismas.</li>
                        <li>"Pago", es la suma de dinero determinada en cada operación efectuada mediante el Sistema Khipu, entre El Cobrador y El Pagador, mediante una transferencia bancaria electrónica entre la cuenta corriente o cuenta vista del El Pagador a la cuenta de El Cobrador.</li>
                        <li>"Operación", es el funcionamiento del Sistema Khipu, respecto de cada Pago realizado por El Pagador al Cobrador, identificado mediante un código único, fecha y monto, y que se perfecciona en el instante en que los fondos son recibidos en la Cuenta de El Cobrador.</li>
                        <li>"Código Único de Operación", es el código exclusivo que identifica cada Operación.</li>
                        <li>"Comisión", es una suma de dinero pagada a Khipu, acordada para cada operación según los términos incluidos en el Anexo de Condiciones Particulares de este Contrato, correspondiente al precio del servicio prestado por Khipu.</li>
                        <li>"Hora de Cierre Diario", es la hora establecida en el Sistema Khipu para el cierre de la rendición de pagos efectuados en cada día.</li>
                        <li>"Condiciones de Uso", es el conjunto de políticas y prácticas de operación del Sistema Khipu, estipuladas en el documento homónimo que se encuentra disponible en el sitio web https://www.khipu.com, pudiendo ser descargado desde aquel y que forma parte de este Contrato.</li>
                        <li>"Convenio Pagador – Cobrador" o "Convención Pagador – Cobrador", acuerdo de voluntad, escrito o no, entre El Pagador y El Cobrador, del cual deriva la obligación del primero de pagar al segundo una determinada suma de dinero, la que es satisfecha por medio de la operación del mandato ejecutado por medio de Khipu. Khipu no es parte de dicho acuerdo de voluntades.</li>
                        <li>"Usuario", es la persona natural o jurídica que realiza una operación en el Sistema Khipu y que se encuentra registrada en éste mediante la individualización de una o más casillas electrónicas.</li>
                        <li>"Cuentas de Cobro" Son las cuentas corrientes bancarias que El Cobrador tendrá en Banco Itaú. Se recomienda que El Cobrador tenga como mínimo 3 cuentas reservadas en forma exclusiva para la operación con Khipu. Estas cuentas tendrán como único propósito recibir Pagos a través del Sistema Khipu. El Cobrador facultará a Khipu para solicitar confirmación de recepción de fondos y revisar saldos y cartolas en línea.</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: Objeto del Contrato</h4>
                      <p className="mb-2">
                        El objeto del presente Contrato es prestar servicios informáticos, contenidos en el Sistema Khipu, de apoyo al proceso de recaudación de dinero pagado por Pagadores al Cobrador, en cuentas bancarias de este último.
                      </p>
                      <p>
                        Khipu no participa ni interviene en el acuerdo de voluntades entre Pagador y Cobrador, ni en su causa, objeto y/o condiciones. Es el Cobrador el responsable y quien registra la operación de cobro en el Sistema Khipu, Pagador y Cobrador son los únicos responsables de verificar la veracidad de los elementos que configuran cada operación y de cumplir las obligaciones recíprocamente contraídas.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: Rendición de Pagos</h4>
                      <p className="mb-2">
                        Los pagos efectivamente realizados por el Pagador se materializarán a través de transferencias de fondos hechas desde la cuenta corriente del Pagador a una cuenta corriente del Cobrador (Cuenta Cobrador), a menos que por contingencia Khipu haya redireccionado los pagos a una cuenta del Cobrador en un banco configurado para ello.
                      </p>
                      <p>
                        Khipu diariamente practicará rendiciones de las Operaciones concretadas efectivamente, esto es, montos percibidos por el Cobrador conforme la Hora de Cierre Diario del día anterior, mediante la remisión del detalle de las mismas vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema Khipu y que además quedarán disponibles para el Cobrador en el Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: Comprobante de Pago.</h4>
                      <p>
                        Khipu se obliga a emitir un comprobante de pago firmado electrónicamente por un representante legal, por cada una de las operaciones efectuadas a través del Sistema Khipu, inmediatamente a continuación de percibidos los fondos en la Cuenta del Cobrador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: Comisión y otros costos</h4>
                      <p>
                        El Cobrador se obliga a pagar a Khipu por el uso de su Sistema la comisión y las tarifas fijas establecidas en el Anexo de Condiciones Particulares o en sus modificaciones.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: Cobro de comisiones.</h4>
                      <p className="mb-2">
                        Las comisiones y aquellas tarifas fijas devengadas en el mes inmediatamente anterior serán facturadas por Khipu, mensualmente, dentro de los primeros 5 días corridos del mes siguiente a su prestación.
                      </p>
                      <p className="mb-2">
                        En caso que el Cliente pague la factura correspondiente y no vencida antes del día 20 del mes en curso, se aplicará al Cliente un descuento de pronto pago. El descuento de pronto pago consiste en un descuento de 8 UF aplicable en la factura del mes inmediatamente siguiente.
                      </p>
                      {tarifarioUrl && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900 mb-2 font-semibold">
                            📄 Plan seleccionado: {selectedPlan === 'plan-porcentual' ? 'Plan Porcentual' : 'Plan con Tarifa Fija'}
                          </p>
                          <a
                            href={tarifarioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                          >
                            <FileText className="w-4 h-4" />
                            Ver tarifario aplicable (PDF)
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEPTIMO: Suministro de servicio y/o bienes.</h4>
                      <p>
                        El Cobrador reconoce que Khipu no tiene obligación alguna respecto del cumplimiento en tiempo, forma, cantidad, calidad o precio en la entrega de cualquier bien, servicio u otro tipo de contraprestación que pudiere dar origen o causar el pago mandatado.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: Requerimiento de operación lícita y real.</h4>
                      <p>
                        El Cobrador reconoce, acepta y se obliga a utilizar el Sistema Khipu sólo para recibir pagos de origen y con finalidad lícita.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO OCTAVO: Vigencia.</h4>
                      <p>
                        El presente contrato tendrá una duración de un año contado desde la fecha de suscripción, sin perjuicio que, del derecho de cualquiera de las partes para ponerle término en cualquier tiempo mediante comunicación electrónica remitida a lo menos con 30 días corridos de anticipación.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO PRIMERO: Firma electrónica y ejemplar del Contrato.</h4>
                      <p>
                        El presente Contrato será firmado electrónicamente por ambas partes y quedará registrado en un ejemplar disponible en el Sistema Khipu, el que podrá ser descargado por El Cobrador en cualquier momento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEGUNDO: Cumplimiento Ley N° 20.393 y Ley N° 21.595.</h4>
                      <p>
                        Las Partes se obligan a cumplir de buena fe con todas las leyes y regulaciones aplicables a los Servicios a prestar, y/o cualquiera otra prestación a realizar para que sea objeto del presente Contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO CUARTO: Tratamiento de Datos Personales.</h4>
                      <p>
                        Las Partes reconocen que, en virtud de la prestación de los Servicios objeto del Contrato, Khipu accederá, sólo para los efectos de recolección y captura de datos, a datos de carácter personal pertenecientes estrictamente necesarios para el proceso de pago, siempre y cuando ésta última cuente con la debida fuente o base de licitud para ello conforme las disposiciones de la Ley N°19.628 sobre Protección de la Vida Privada.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEXTO: Prórroga de competencia.</h4>
                      <p>
                        Las partes se someterán en relación a este Contrato a las Leyes de la República de Chile. Además, prorrogan competencia en los tribunales ordinarios de la comuna y ciudad de Santiago y se someten a la jurisdicción de sus tribunales.
                      </p>
                    </div>
                  </div>

                  {/* Separador entre contratos */}
                  <div className="border-t-2 border-dashed border-gray-300 my-6 pt-4">
                    <div className="text-center mb-4">
                      <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                        SEGUNDO CONTRATO APLICABLE
                      </span>
                    </div>
                  </div>

                  {/* Mandato para Percibir el Pago - Persona Jurídica con Cuenta Khipu 24hrs */}
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>MANDATO PARA PERCIBIR EL PAGO</p>
                      <p className="mt-2"><strong>{contractData.businessName}</strong></p>
                      <p>Y</p>
                      <p>KHIPU SPA</p>
                    </div>

                    <p>
                      En el Santiago de Chile lugar, a {currentDay} de {currentMonth} de {currentYear}, entre:
                    </p>

                    <p>
                      Por una parte: KHIPU SPA, en adelante "Khipu", sociedad por acciones, Rol Único Tributario N° 76.187.287-7,
                      representada por don ROBERTO OPAZO GAZMURI, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 9.123.845-4
                      y don EMILIO DAVIS MENDEZ, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados
                      en calle Las Urbinas N° 53, piso 13, comuna de Providencia, Chile,
                    </p>

                    <p>
                      Por otra parte: <strong>{contractData.businessName}</strong>, Rol Único Tributario N° <strong>{contractData.businessRut}</strong>, sociedad representada
                      por don(a) <strong>{contractData.fullName}</strong>, chileno, Cédula Nacional de Identidad N° <strong>{contractData.legalRepRut}</strong>,
                      domiciliado en <strong>{contractData.street}</strong>, piso <strong>{contractData.floor}</strong>, comuna de <strong>{contractData.commune}</strong>, <strong>{contractData.region}</strong>,
                      en adelante "el Cobrador", referidos conjuntamente como las "Partes", se ha convenido el siguiente mandato para percibir el pago:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: Definiciones.</h4>
                      <p className="mb-2">Para los efectos del presente contrato se definen los siguientes conceptos:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>"Khipu", es el mandatario para percibir el pago acordado entre el Cobrador y el Pagador, y lo ejecuta por medio del Sistema Khipu.</li>
                        <li>"Cobrador", es la persona natural o jurídica que ha mandatado a Khipu para percibir el pago convenido entre el primero y el Pagador.</li>
                        <li>"Pagador", es la persona natural o jurídica que ha acordado un pago con el Cobrador, y que ha mandatado a Khipu para efectuar el pago convenido.</li>
                        <li>"Sistema Khipu", es el conjunto de programas computacionales (en especial la Aplicación de Terminal de Pago Khipu), licencias, portales web, procedimientos, equipamiento (computadores personales, servidores y aparatos de telecomunicaciones) y servicios de terceros que permiten perfeccionar pagos electrónicos, mediante transferencias electrónicas bancarias entre cuentas corrientes y/o cuentas vista que ejecutan en el sistema bancario nacional, conforme sus políticas, prácticas y mecanismos de seguridad, u otro sistema determinado por Khipu. El Sistema podrá incluir herramientas electrónicas que faciliten la comunicación entre Cobrador y Pagador, sin que por ello Khipu se transforme en parte de las convenciones que pacten, ni actúe como intermediador.</li>
                        <li>"Aplicación Terminal de Pago Khipu", es un navegador web o browser, que permite navegar por páginas programadas en lenguaje HTML, preparado para automatizar la generación de transferencias de dinero entre cuentas bancarias, mostrando las páginas web con una representación visual distinta a la que mostraría un navegador web de propósito general, pero sin alterar los mecanismos de seguridad de las mismas.</li>
                        <li>"Pago", es la suma de dinero determinada en cada operación efectuada mediante el Sistema Khipu, entre el Cobrador y Pagador, que es entregada a Khipu y que éste último recibe del Pagador, por cuenta y nombre del Cobrador.</li>
                        <li>"Operación", es el ejercicio especial y particular del mandato para percibir el pago que se conviene en este instrumento, realizado por el Pagador a Khipu, identificado mediante un código único, fecha y monto, y que se perfecciona en el instante en que los fondos son recibidos en la cuenta corriente de Khipu.</li>
                        <li>"Código Único de Operación", es el código exclusivo que identifica cada operación.</li>
                        <li>"Comisión", es una suma de dinero pagada a Khipu, acordada para cada operación según los términos incluidos en el Anexo de Condiciones Particulares de este contrato correspondiente al precio del servicio prestado por Khipu.</li>
                        <li>"Hora de Cierre Diario", es la hora establecida en el Sistema Khipu para el cierre de la rendición de pagos percibidos.</li>
                        <li>"Condiciones de Uso", es el conjunto de políticas y prácticas de operación del Sistema Khipu, estipuladas en el documento denominado "Condiciones de Uso", el cual se encuentra disponible en el sitio web https://khipu.com, pudiendo ser descargado desde aquel.</li>
                        <li>"Convenio Pagador –Cobrador" o "Convención Pagador –Cobrador", acuerdo de voluntad, escrito o no, entre Pagador y Cobrador, del cual deriva la obligación del primero de pagar al segundo una determinada suma de dinero. Khipu no es parte de dicho acuerdo de voluntades.</li>
                        <li>"Usuario", es la persona natural o jurídica que realiza una operación en el Sistema Khipu y que se encuentra registrada en éste mediante la individualización de una o más casillas electrónicas.</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: Objeto del contrato.</h4>
                      <p>
                        El Cobrador mandata a Khipu para percibir el pago de cobros de operaciones mediante el Sistema Khipu, en los términos contenidos en este contrato y conforme las disposiciones de los artículos 2116 y siguientes del Código Civil y demás normas legales pertinentes. El mandato se entenderá otorgado al momento en que el Cobrador registre la operación en el Sistema Khipu, y su ejecución se perfeccionará con la recepción de los fondos por parte de Khipu, lo que importará la aceptación del mandato.
                      </p>
                      <p className="mt-2">
                        El Sistema Khipu dispondrá de un campo específico que permita al Cobrador indicar un código único a cada transacción, de manera que facilite la conciliación de los cobros realizados mediante el Sistema Khipu y el sistema de venta del Cobrador.
                      </p>
                      <p className="mt-2">
                        Khipu no participa ni interviene en el acuerdo de voluntades Convenio Pagador-Cobrador, ni en su causa, objeto y/o condiciones, siendo el Cobrador el responsable y quien registra la operación de cobro en el Sistema Khipu, y Pagador y Cobrador los únicos responsables de verificar la veracidad de los elementos que configuran cada Operación.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: Forma de transferir el Pago percibido.</h4>
                      <p>
                        Khipu efectuará un depósito en la cuenta corriente o cuenta vista del Cobrador, mediante una transferencia de fondos electrónica, pago por nómina u otro producto bancario, de forma tal que permita que todas las operaciones de percepción de pago perfeccionadas antes de la Hora de Cierre Diario y que no hayan sido rendidas o depositadas en fecha precedente, en el Sistema Khipu, sean depositadas dentro del día hábil bancario siguiente.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: Rendición de Pagos</h4>
                      <p>
                        Khipu, diariamente practicará rendiciones de las operaciones efectivamente concretadas, esto es de los montos percibidos, para el Cobrador conforme la Hora de Cierre Diario, mediante la remisión del detalle de las mismas, que le serán remitidas vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema Khipu y que además quedarán disponibles para el Cobrador en el Sistema Khipu. En caso de no existir casilla electrónica configurada en el Sistema Khipu, la rendición será informada únicamente mediante su publicación en el Sistema.
                      </p>
                      <p className="mt-2">
                        La rendición tendrá efectos meramente informativos y operativos, y no implicará validación, verificación ni garantía por parte de Khipu respecto de la exactitud, licitud o veracidad de los datos registrados por el Cobrador o el Pagador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: Comprobante de Pago.</h4>
                      <p>
                        Khipu se obliga a emitir un comprobante de pago firmado electrónicamente, por cada una de las operaciones efectuadas a través del Sistema Khipu, una vez percibidos los fondos para los que es mandatado a pagar por el Pagador, en el cual se individualice el Código Único de Operación, monto, fecha de la misma, Pagador, Cobrador y demás antecedentes señalados en Condiciones de Uso.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: Comisión y otros costos</h4>
                      <p>
                        El Cobrador, por la aceptación del pago por medio del Sistema Khipu, se obliga a pagar mensualmente a Khipu, la comisión y las tarifas fijas establecidos en el Anexo de Condiciones Particulares o en sus modificaciones. El monto a pagar por cada Operación efectuada en el mes se calcula al día del pago efectivo de cada operación entre Pagador y Khipu y al término del mes se liquida la totalidad de las operaciones cursadas, conforme a la tarifa indicada en el Anexo de condiciones particulares.
                      </p>
                      {tarifarioUrl && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900 mb-2 font-semibold">
                            📄 Plan seleccionado: {selectedPlan === 'plan-porcentual' ? 'Plan Porcentual' : 'Plan con Tarifa Fija'}
                          </p>
                          <a
                            href={tarifarioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                          >
                            <FileText className="w-4 h-4" />
                            Ver tarifario aplicable (PDF)
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SÉPTIMO: Mandato irrevocable para deducir comisión.</h4>
                      <p>
                        El Cobrador otorga mandato especial e irrevocable a Khipu para que deduzca de los pagos que deba efectuar al Cobrador, su comisión y eventuales impuestos aplicables, como así también para que le haga entrega de los valores netos correspondientes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: Suministro de servicio y/o bienes.</h4>
                      <p>
                        El Cobrador reconoce que Khipu no tiene obligación alguna en el cumplimiento en tiempo, forma, cantidad, calidad o precio en la entrega de cualquier bien, servicio u otro tipo de contraprestación que pudiere dar origen o causar el pago mandatado, en términos mediatos o inmediatos.
                      </p>
                      <p className="mt-2">
                        Asimismo, la eventual obligación de emitir boleta o factura derivada de la adquisición de un bien y/o prestación de algún servicio contratado recae única y exclusivamente en el Cobrador. Lo anterior no obsta a la obligación de Khipu de facturar los servicios prestados en conformidad a lo estipulado en este Contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">NOVENO: Requerimiento de operación lícita y real.</h4>
                      <p>
                        El Cobrador reconoce, acepta y se obliga a utilizar el Sistema Khipu sólo para recibir pagos de origen y con finalidad lícita, pudiendo ser estos derivados de la adquisición de bienes, prestación de servicios, actividades o prestaciones en general, convenidas entre él y el Pagador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO: Reclamo por diferencias en operaciones.</h4>
                      <p>
                        En el evento que en las rendiciones indicadas se omitiesen operaciones realizadas en el periodo respectivo; contengan retenciones, descuentos u otros cargos indebidos o improcedentes; o bien existiesen errores o diferencias con sus propios registros, el Cobrador tendrá un plazo máximo de 5 días corridos, contados desde la emisión de la rendición respectiva, para efectuar el correspondiente reclamo, transcurrido dicho plazo sin existir reclamo, se entenderá aprobada la rendición por el Cobrador sin más trámite.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO PRIMERO: Reembolso.</h4>
                      <p>
                        Si Khipu realizara una rendición de pagos, donde el monto transferido fuera mayor al total recaudado, menos la comisión, se gestionará como si dicho dinero transferido en exceso hubiese sido entregado por adelantado. En la siguiente rendición se descontará el adelanto transfiriendo al Cobrador el saldo entre el monto a rendir y el adelanto.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO SEGUNDO: Imposibilidad de cumplimiento.</h4>
                      <p>
                        El Cobrador declara conocer que, en razón de ser éste un mandato para percibir el pago, la imposibilidad de Khipu de percibir el pago o de enterar al Cobrador algún pago percibido será responsabilidad única y de cargo del Cobrador la de entregar al Pagador el o los bienes o de prestar el o los servicios contratados al Pagador, del cual pudiera emanar el pago mandatado a ejecutar.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO TERCERO: Controversia Cobrador – Pagador.</h4>
                      <p>
                        Cualquier controversia o dificultad entre el Cobrador y el Pagador, especialmente las relativas a la calidad, cantidad o cualquier característica de una venta o servicio prestado, deberá ser resuelta directamente entre esas partes, sin intervención ni responsabilidad alguna de Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO CUARTO: Cambio de antecedentes del Cobrador.</h4>
                      <p>
                        El Cobrador deberá modificar en forma inmediata, en el sistema Khipu, cualquier cambio relativo a los antecedentes registrados en él y que sean necesarios para la correcta ejecución del mandato. El Cobrador es responsable exclusivo de informar oportunamente a Khipu de cualquier cambio en la forma de pago, especialmente tratándose de la cuenta bancaria en la que Khipu debe depositar los montos recaudados.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO QUINTO: Condiciones de Uso.</h4>
                      <p>
                        El Cobrador declara conocer y acepta las Condiciones de Uso del Sistema Khipu, las cuales se encuentran disponibles en el portal web de Khipu. Khipu podrá emitir unilateralmente manuales, instrucciones o normas operacionales destinadas a complementar el sistema, debiendo el Cobrador atenerse a tales normas. Las normas que disponga Khipu serán comunicadas y difundidas por medios electrónicos, con a lo menos 10 días previos a su entrada en vigencia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SEXTO: Modificaciones.</h4>
                      <p>
                        Las modificaciones de las condiciones del presente contrato y sus Condiciones de Uso podrán acordarse por medio de sistemas electrónicos y con a lo menos 30 días corridos de anticipación a la fecha en que las modificaciones del caso comenzarán a regir.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SÉPTIMO: Prohibiciones.</h4>
                      <p>
                        El Cobrador no podrá ceder total o parcialmente el presente contrato y/o cualquiera de los derechos que de él puedan emanar. Sin perjuicio de lo anterior, Khipu queda facultado para ceder los derechos y obligaciones que emanan de este contrato, previa notificación al cobrador con a lo menos 10 días de anticipación. Queda prohibido al Pagador y Cobrador incorporar al Sistema Khipu cualquier tipo de información o antecedentes falsos o que atente contra las leyes nacionales o internacionales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO OCTAVO: Término del contrato por incumplimiento o insolvencia.</h4>
                      <p>
                        El incumplimiento del Cobrador de cualquiera de las obligaciones que emanan del presente instrumento o sus modificaciones, faculta a Khipu para poner término a éste en forma inmediata y sin previo aviso. Igual facultad regirá para el caso de que alguna de las partes cayere en insolvencia o fuere declarada su quiebra.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO NOVENO: Propiedad de los fondos.</h4>
                      <p>
                        Las partes declaran conocer que las sumas de dinero que Khipu percibe del Pagador y transfiere electrónicamente al Cobrador en razón de las operaciones descritas en este contrato no son de propiedad de Khipu, siendo éste un mero poseedor de ellas, sin perjuicio de lo concerniente a las comisiones que por el uso del Sistema cobra. Khipu dispondrá de cuentas bancarias separadas para la administración de los fondos de su propiedad y la de los fondos que le son entregados en mandato de pago.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO: Vigencia.</h4>
                      <p>
                        El presente contrato tendrá una duración de un año contado desde la fecha de suscripción, sin perjuicio que, del derecho de cualquiera de las partes para ponerle término en cualquier tiempo mediante comunicación electrónica remitida a lo menos con 30 días corridos de anticipación. Con todo, el contrato se renovará tácita y automáticamente por períodos iguales y sucesivos de 1 año cada uno, si ninguna de las partes haya comunicado por escrito su intención de darle término con 30 días de anticipación a la expiración de su plazo de vigencia original o prorrogado.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO PRIMERO: Versiones anteriores sin efecto.</h4>
                      <p>El presente contrato reemplaza cualquier otro acuerdo o convención celebrado con anterioridad entre las partes sobre las materias que aquí se tratan.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEGUNDO: Propiedad industrial.</h4>
                      <p>
                        Las partes dejan establecido que podrán utilizar sus respectivas razones sociales, marcas comerciales, nombres distintivos, imágenes o logotipos en campañas publicitarias o presentaciones de carácter comercial.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO TERCERO: Firma electrónica y ejemplar del Contrato.</h4>
                      <p>
                        El presente Contrato será firmado electrónicamente por ambas partes y quedará registrado en un ejemplar disponible en el Sistema Khipu, el que podrá ser descargado por El Cobrador en cualquier momento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO CUARTO: Cumplimiento Ley N° 20.393 y Ley N° 21.595</h4>
                      <p>
                        Las Partes se obligan a cumplir de buena fe con todas las leyes y regulaciones aplicables a los Servicios a prestar. En especial, las partes declaran conocer que la otra parte ha implementado un Modelo de Prevención de Delitos y se obligan a no realizar ninguna actividad que pueda ser considerada constitutiva de delito en el contexto de las disposiciones de la Ley N°20.393 y la Ley N° 21.595.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO QUINTO: Tratamiento de Datos Personales.</h4>
                      <p>
                        Las Partes reconocen que, en virtud de la prestación de los Servicios objeto del Contrato, Khipu accederá, sólo para los efectos de recolección y captura de datos, a datos de carácter personal estrictamente necesarios para el proceso de pago, conforme las disposiciones de la Ley N°19.628 sobre Protección de la Vida Privada y sus modificaciones posteriores, particularmente la Ley N°21.719. El responsable del tratamiento es el Cobrador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEXTO: No renuncia.</h4>
                      <p>
                        Si Khipu dejara de exigir el cumplimiento de alguna de las disposiciones establecidas en el presente contrato, ello no será de ninguna manera interpretado como una renuncia a la estipulación del caso, ni en ninguna manera afectará la validez de la misma o cualquiera de sus partes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SÉPTIMO: Prórroga de competencia</h4>
                      <p>
                        Las partes se someterán en relación a este Contrato a las Leyes de la República de Chile. Además, prorrogan competencia en los tribunales ordinarios de la comuna y ciudad de Santiago y se someten a la jurisdicción de sus tribunales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PERSONERÍAS.</h4>
                      <p className="mb-2">
                        La personería de don Emilio Davis Méndez y la de don Roberto Opazo Gazmuri para representar a Khipu SpA constan en escritura pública de 12 de noviembre de 2012 autorizada por el Notario Público de Santiago señor Pablo Gonzalez Caamaño.
                      </p>
                      <p>
                        La personería de don(a) <strong>{contractData.fullName}</strong> para representar a <strong>{contractData.businessName}</strong> consta por escritura pública extendida en la Notaría de Santiago.
                      </p>
                      <p className="mt-2">
                        La persona natural que acepta y suscribe el presente contrato declara ser absolutamente capaz para contratar, y en caso de estar actuando en representación de otra persona, sea esta natural o jurídica, declara poseer facultades suficientes para representarla, pudiendo contratar en su nombre y obligarla.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-4 font-semibold">Las Partes firman en señal de aceptación.</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">Roberto Opazo Gazmuri</p>
                          <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          <div className="mt-4">
                            <p className="border-t border-gray-500 pt-2 text-center">Emilio Davis Méndez</p>
                            <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">{contractData.fullName}</p>
                          <p className="text-center text-gray-600">pp. {contractData.businessName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>

                ) : showKhipu24hrsContract ? (
                  // Contrato "DATO PARA PERCIBIR EL PAGO" (khipu-mandate-agreement.md)
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>MANDATO PARA PERCIBIR EL PAGO</p>
                      <p className="mt-2">
                        {personType === 'juridica'
                          ? contractData.businessName
                          : `${formData?.firstName || ''} ${formData?.lastName || ''}`.trim() || '___________________'}
                      </p>
                      <p>Y</p>
                      <p>KHIPU SPA</p>
                    </div>

                    <p>
                      En el Santiago de Chile lugar, a {currentDay} de {currentMonth} de {currentYear}, entre:
                    </p>

                    <p>
                      Por una parte: KHIPU SPA, en adelante "Khipu", sociedad por acciones, Rol Único Tributario N° 76.187.287-7,
                      representada por don ROBERTO OPAZO GAZMURI, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 9.123.845-4
                      y don EMILIO DAVIS MENDEZ, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados
                      en calle Las Urbinas N° 53, piso 13, comuna de Providencia, Chile,
                    </p>

                    {personType === 'juridica' ? (
                      <p>
                        Por otra parte: <strong>{contractData.businessName}</strong>, Rol Único Tributario N° <strong>{contractData.businessRut}</strong> sociedad representada
                        por don(a) <strong>{contractData.fullName}</strong>, chileno, Cédula Nacional de Identidad N° <strong>{contractData.legalRepRut}</strong>,
                        domiciliado en <strong>{contractData.street}</strong>, piso <strong>{contractData.floor}</strong>, comuna de <strong>{contractData.commune}</strong>,
                        <strong> {contractData.region}</strong>, en adelante "el Cobrador", referidos conjuntamente como las "Partes",
                        se ha convenido el siguiente mandato para percibir el pago:
                      </p>
                    ) : (
                      <p>
                        Por otra parte: <strong>{contractData.fullName}</strong>, Rol Único Tributario N° <strong>{contractData.rut}</strong>,
                        domiciliado en <strong>{contractData.address}</strong>, en adelante "el Cobrador", referidos conjuntamente como las "Partes",
                        se ha convenido el siguiente mandato para percibir el pago:
                      </p>
                    )}

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: Definiciones.</h4>
                      <p className="mb-2">Para los efectos del presente contrato se definen los siguientes conceptos:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>"Khipu", es el mandatario para percibir el pago acordado entre el Cobrador y el Pagador, y lo ejecuta por medio del Sistema Khipu.</li>
                        <li>"Cobrador", es la persona natural o jurídica que ha mandatado a Khipu para percibir el pago convenido entre el primero y el Pagador.</li>
                        <li>"Pagador", es la persona natural o jurídica que ha acordado un pago con el Cobrador, y que ha mandatado a Khipu para efectuar el pago convenido.</li>
                        <li>"Sistema Khipu", es el conjunto de programas computacionales (en especial la Aplicación de Terminal de Pago Khipu), licencias, portales web, procedimientos, equipamiento (computadores personales, servidores y aparatos de telecomunicaciones) y servicios de terceros que permiten perfeccionar pagos electrónicos, mediante transferencias electrónicas bancarias entre cuentas corrientes y/o cuentas vista que ejecutan en el sistema bancario nacional, conforme sus políticas, prácticas y mecanismos de seguridad, u otro sistema determinado por Khipu. El Sistema podrá incluir herramientas electrónicas que faciliten la comunicación entre Cobrador y Pagador, sin que por ello Khipu se transforme en parte de las convenciones que pacten, ni actué como intermediador.</li>
                        <li>"Aplicación Terminal de Pago Khipu", es un navegador web o browser, que permite navegar por páginas programadas en lenguaje HTML, preparado para automatizar la generación de transferencias de dinero entre cuentas bancarias, mostrando las páginas web con una representación visual distinta a la que mostraría un navegador web de propósito general, pero sin alterar los mecanismos de seguridad de las mismas.</li>
                        <li>"Pago", es la suma de dinero determinada en cada operación efectuada mediante el Sistema Khipu, entre el Cobrador y Pagador, que es entregada a Khipu y que éste último recibe del Pagador, por cuenta y nombre del Cobrador.</li>
                        <li>"Operación", es el ejercicio especial y particular del mandato para percibir el pago que se conviene en este instrumento, realizado por el Pagador a Khipu, identificado mediante un código único, fecha y monto, y que se perfecciona en el instante en que los fondos son recibidos en la cuenta corriente de Khipu.</li>
                        <li>"Código Único de Operación", es el código exclusivo que identifica cada operación.</li>
                        <li>"Comisión", es una suma de dinero pagada a Khipu, acordada para cada operación según los términos incluidos en el Anexo de Condiciones Particulares de este contrato correspondiente al precio del servicio prestado por Khipu.</li>
                        <li>"Hora de Cierre Diario", es la hora establecida en el Sistema Khipu para el cierre de la rendición de pagos percibidos.</li>
                        <li>"Condiciones de Uso", es el conjunto de políticas y prácticas de operación del Sistema Khipu, estipuladas en el documento denominado "Condiciones de Uso", el cual se encuentra disponible en el sitio web https://khipu.com, pudiendo ser descargado desde aquel.</li>
                        <li>"Convenio Pagador–Cobrador" o "Convención Pagador–Cobrador", acuerdo de voluntad, escrito o no, entre Pagador y Cobrador, del cual deriva la obligación del primero de pagar al segundo una determinada suma de dinero, la que es satisfecha por medio de la operación del mandato ejecutado por medio de Khipu. Khipu no es parte de dicho acuerdo de voluntades.</li>
                        <li>"Usuario", es la persona natural o jurídica que realiza una operación en el Sistema Khipu y que se encuentra registrada en éste mediante la individualización de una o más casillas electrónicas.</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: Objeto del contrato.</h4>
                      <p className="mb-2">
                        El Cobrador mandata a Khipu para percibir el pago de cobros de operaciones mediante el Sistema Khipu, en los términos contenidos en este contrato
                        y conforme las disposiciones de los artículos 2116 y siguientes del Código Civil y demás normas legales pertinentes. El mandato se entenderá otorgado
                        al momento en que el Cobrador registre la operación en el Sistema Khipu, y su ejecución se perfeccionará con la recepción de los fondos por parte de Khipu,
                        lo que importará la aceptación del mandato.
                      </p>
                      <p className="mb-2">
                        El Sistema Khipu dispondrá de un campo específico que permita al Cobrador indicar un código único a cada transacción, de manera que facilite la conciliación
                        de los cobros realizados mediante el Sistema Khipu y el sistema de venta del Cobrador.
                      </p>
                      <p>
                        Khipu no participa ni interviene en el acuerdo de voluntades Convenio Pagador-Cobrador, ni en su causa, objeto y/o condiciones, siendo el Cobrador el responsable
                        y quien registra la operación de cobro en el Sistema Khipu, y Pagador y Cobrador los únicos responsables de verificar la veracidad de los elementos que configuran cada Operación.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: Forma de transferir el Pago percibido.</h4>
                      <p className="mb-2">
                        Khipu efectuará un depósito en la cuenta corriente o cuenta vista del Cobrador, mediante una transferencia de fondos electrónica, pago por nómina u otro producto
                        bancario, de forma tal que permita que todas las operaciones de percepción de pago perfeccionadas antes de la Hora de Cierre Diario y que no hayan sido rendidas
                        o depositadas en fecha precedente, en el Sistema Khipu, sean depositadas dentro del día hábil bancario siguiente.
                      </p>
                      <p>
                        La imposibilidad del banco en que se encuentren depositados los fondos mandatados para el pago, de transferir el pago al Cobrador, sea ella a consecuencia de terremotos,
                        maremotos, catástrofes naturales, huelgas generalizadas, guerras, conmoción nacional o por otro caso de fuerza mayor o caso fortuito, u otra situación ajena a la
                        responsabilidad de Khipu, no genera responsabilidad alguna para este último. Sin perjuicio de lo anterior, Khipu se obliga a actuar diligentemente con el objeto de
                        poner a disposición del Cobrador el pago percibido tan pronto como ello sea posible, una vez superadas las circunstancias que hubieren impedido su transferencia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: Rendición de Pagos</h4>
                      <p className="mb-2">
                        Khipu, diariamente practicará rendiciones de las operaciones efectivamente concretadas, esto es de los montos percibidos, para el Cobrador conforme la Hora de Cierre
                        Diario, mediante la remisión del detalle de las mismas, que le serán remitidas vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema
                        Khipu y que además quedarán disponibles para el Cobrador en el Sistema Khipu. En caso de no existir casilla electrónica configurada en el Sistema Khipu, la rendición
                        será informada únicamente mediante su publicación en el Sistema.
                      </p>
                      <p>
                        La rendición tendrá efectos meramente informativos y operativos, y no implicará validación, verificación ni garantía por parte de Khipu respecto de la exactitud,
                        licitud o veracidad de los datos registrados por el Cobrador o el Pagador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: Comprobante de Pago.</h4>
                      <p className="mb-2">
                        Khipu se obliga a emitir un comprobante de pago firmado electrónicamente, por cada una de las operaciones efectuadas a través del Sistema Khipu, una vez percibidos
                        los fondos para los que es mandatado a pagar por el Pagador, en el cual se individualice el Código Único de Operación, monto, fecha de la misma, Pagador, Cobrador
                        y demás antecedentes señalados en Condiciones de Uso.
                      </p>
                      <p>
                        El Comprobante de Pago será remitido vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema Khipu y que además quedarán disponibles
                        en el Sistema Khipu. En caso de existir imposibilidad de remitir y/o recibir el comprobante, la rendición será informada únicamente mediante su publicación en el Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: Comisión y otros costos</h4>
                      <p className="mb-2">
                        El Cobrador, por la aceptación del pago por medio del Sistema Khipu, se obliga a pagar mensualmente a Khipu, la comisión y las tarifas fijas establecidos en el Anexo
                        de Condiciones Particulares o en sus modificaciones. El monto a pagar por cada Operación efectuada en el mes se calcula al día del pago efectivo de cada operación entre
                        Pagador y Khipu y al término del mes se liquida la totalidad de las operaciones cursadas, conforme a la tarifa indicada en el Anexo de condiciones particulares.
                      </p>
                      {tarifarioUrl && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900 mb-2 font-semibold">
                            📄 Plan seleccionado: {selectedPlan === 'plan-porcentual' ? 'Plan Porcentual' : 'Plan con Tarifa Fija'}
                          </p>
                          <a
                            href={tarifarioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                          >
                            <FileText className="w-4 h-4" />
                            Ver tarifario aplicable (PDF)
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SÉPTIMO: Mandato irrevocable para deducir comisión.</h4>
                      <p>
                        El Cobrador otorga mandato especial e irrevocable a Khipu para que deduzca de los pagos que deba efectuar al Cobrador, su comisión y eventuales impuestos aplicables,
                        como así también para que le haga entrega de los valores netos correspondientes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: Suministro de servicio y/o bienes.</h4>
                      <p className="mb-2">
                        El Cobrador reconoce que Khipu no tiene obligación alguna en el cumplimiento en tiempo, forma, cantidad, calidad o precio en la entrega de cualquier bien, servicio
                        u otro tipo de contraprestación que pudiere dar origen o causar el pago mandatado, en términos mediatos o inmediatos.
                      </p>
                      <p>
                        Asimismo, la eventual obligación de emitir boleta o factura derivada de la adquisición de un bien y/o prestación de algún servicio contratado recae única y exclusivamente
                        en el Cobrador. Lo anterior no obsta a la obligación de Khipu de facturar los servicios prestados en conformidad a lo estipulado en este Contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">NOVENO: Requerimiento de operación lícita y real.</h4>
                      <p>
                        El Cobrador reconoce, acepta y se obliga a utilizar el Sistema Khipu sólo para recibir pagos de origen y con finalidad lícita, pudiendo ser estos derivados de la
                        adquisición de bienes, prestación de servicios, actividades o prestaciones en general, convenidas entre él y el Pagador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO: Reclamo por diferencias en operaciones.</h4>
                      <p className="mb-2">
                        En el evento que en las rendiciones indicadas se omitiesen operaciones realizadas en el periodo respectivo; contengan retenciones, descuentos u otros cargos indebidos
                        o improcedentes; o bien existiesen errores o diferencias con sus propios registros, el Cobrador tendrá un plazo máximo de 5 días corridos, contados desde la emisión
                        de la rendición respectiva, para efectuar el correspondiente reclamo, transcurrido dicho plazo sin existir reclamo, se entenderá aprobada la rendición por el Cobrador
                        sin más trámite.
                      </p>
                      <p>
                        Para la presentación de reclamos, éstos deben ser interpuestos en forma pormenorizada, indicando precisamente la operación omitida o respecto de la cual existen errores
                        o diferencias, mediante el Código de Operación, e indicando los motivos y antecedentes en que se funda el reclamo. El reclamo será resuelto por Khipu, conforme sus
                        respaldos y registros bancarios correspondientes, dentro de los 30 días siguientes de recibido el reclamo.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO PRIMERO: Reembolso.</h4>
                      <p>
                        Si Khipu realizara una rendición de pagos, donde el monto transferido fuera mayor al total recaudado, menos la comisión, se gestionará como si dicho dinero transferido
                        en exceso hubiese sido entregado por adelantado. En la siguiente rendición se descontará el adelanto transfiriendo al Cobrador el saldo entre el monto a rendir y el adelanto.
                        Si el monto del adelanto fuera mayor al monto que se debe rendir al día hábil siguiente, entonces no se realizará transferencia. Esto ocurrirá en las rendiciones de los días
                        hábiles posteriores hasta que el adelanto haya sido rebajado completamente.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO SEGUNDO: Imposibilidad de cumplimiento.</h4>
                      <p className="mb-2">
                        El Cobrador declara conocer que, en razón de ser éste un mandato para percibir el pago, la imposibilidad de Khipu de percibir el pago o de enterar al Cobrador algún
                        pago percibido; o, si éste fuera enterado con retraso a lo pactado, será responsabilidad única y de cargo del Cobrador la de entregar al Pagador el o los bienes o de
                        prestar el o los servicios contratados al Pagador.
                      </p>
                      <p>
                        Las partes acuerdan que Khipu queda exento de toda responsabilidad de perjuicios directos e indirectos, previstos e imprevistos, si por razones de caso fortuito o fuerza
                        mayor tales como sismos, cortes de energía eléctrica y/o del servicio telefónico, intervenciones de redes por parte de terceros, no funcionamiento de redes públicas y/o
                        privadas, no funcionamiento de los sistemas de uno o más bancos, actos terroristas, huelgas u otros similares; no se pudiere mantener en funcionamiento u operativo el Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO TERCERO: Controversia Cobrador – Pagador.</h4>
                      <p>
                        Cualquier controversia o dificultad entre el Cobrador y el Pagador, especialmente las relativas a la calidad, cantidad o cualquier característica de una venta o servicio
                        prestado, deberá ser resuelta directamente entre esas partes, sin intervención ni responsabilidad alguna de Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO CUARTO: Cambio de antecedentes del Cobrador.</h4>
                      <p>
                        El Cobrador deberá modificar en forma inmediata, en el sistema Khipu, cualquier cambio relativo a los antecedentes registrados en él y que sean necesarios para la correcta
                        ejecución del mandato. El Cobrador es responsable exclusivo de informar oportunamente a Khipu de cualquier cambio en la forma de pago, especialmente tratándose de la cuenta
                        bancaria en la que Khipu debe depositar los montos recaudados, no siendo Khipu responsable por los perjuicios que por ellos se pudieran causar.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO QUINTO: Condiciones de Uso.</h4>
                      <p className="mb-2">
                        El Cobrador declara conocer y acepta las Condiciones de Uso del Sistema Khipu, las cuales se encuentran disponibles en el portal web de Khipu.
                      </p>
                      <p>
                        Khipu dentro de las condiciones del presente contrato y su(s) Anexo(s), podrá emitir unilateralmente manuales, instrucciones o normas operacionales destinadas a
                        complementar el sistema establecido en este instrumento o destinadas a adoptar acciones o mecanismos de seguridad en las operaciones para evitar usos indebidos o
                        fraudulentos del Sistema Khipu, debiendo el Cobrador atenerse a tales normas. Las normas que disponga Khipu serán comunicadas y difundidas por medios electrónicos,
                        con a lo menos 10 días previos a su entrada en vigencia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SEXTO: Modificaciones.</h4>
                      <p>
                        Las modificaciones de las condiciones del presente contrato y sus Condiciones de Uso podrán acordarse por medio de sistemas electrónicos y con a lo menos 30 días corridos
                        de anticipación a la fecha en que las modificaciones del caso comenzarán a regir.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SÉPTIMO: Prohibiciones.</h4>
                      <p className="mb-2">
                        El Cobrador no podrá ceder total o parcialmente el presente contrato y/o cualquiera de los derechos que de él puedan emanar. Sin perjuicio de lo anterior, Khipu queda
                        facultado para ceder los derechos y obligaciones que emanan de este contrato, previa notificación al cobrador con a lo menos 10 días de anticipación.
                      </p>
                      <p>
                        Queda prohibido al Pagador y Cobrador incorporar al Sistema Khipu cualquier tipo de información o antecedentes falsos o que atente contra las leyes nacionales o internacionales,
                        sean ellas civiles, penales, comerciales, o de propiedad intelectual, sin ser esta una enumeración taxativa. El Cobrador faculta a Khipu, para que éste conforme su criterio
                        y políticas, pueda eliminar o suspender del Sistema Khipu cualquier antecedente proporcionado por el Pagador o Cobrador que se estime pueda afectar leyes o normas nacionales,
                        extranjeras o supranacionales, situación que incluso puede ser motivo de la suspensión o eliminación del Cobrador del Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO OCTAVO: Término del contrato por incumplimiento o insolvencia.</h4>
                      <p>
                        El incumplimiento del Cobrador de cualquiera de las obligaciones que emanan del presente instrumento o sus modificaciones, faculta a Khipu para poner término a éste
                        en forma inmediata y sin previo aviso, sin perjuicio de ella procurará practicar los oficios pertinentes para que el cobrador cumpla sus obligaciones. Igual facultad
                        regirá para el caso de que alguna de las partes cayere en insolvencia o fuere declarada su quiebra.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO NOVENO: Propiedad de los fondos.</h4>
                      <p>
                        Las partes declaran conocer que las sumas de dinero que Khipu percibe del Pagador y transfiere electrónicamente al Cobrador en razón de las operaciones descritas en
                        este contrato no son de propiedad de Khipu, siendo éste un mero poseedor de ellas, sin perjuicio de lo concerniente a las comisiones que por el uso del Sistema cobra.
                        Khipu dispondrá de cuentas bancarias separadas para la administración de los fondos de su propiedad y la de los fondos que le son entregados en mandato de pago.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO: Vigencia.</h4>
                      <p>
                        El presente contrato tendrá una duración de un año contado desde la fecha de suscripción, sin perjuicio que, del derecho de cualquiera de las partes para ponerle
                        término en cualquier tiempo mediante comunicación electrónica remitida a lo menos con 30 días corridos de anticipación. Con todo, el contrato se renovare tácita y
                        automáticamente por períodos iguales y sucesivos de 1 año cada uno, si ninguna de las partes haya comunicado por escrito su intención de darle término con 30 días
                        de anticipación a la expiración de su plazo de vigencia original o prorrogado.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO PRIMERO: Versiones anteriores sin efecto.</h4>
                      <p>El presente contrato reemplaza cualquier otro acuerdo o convención celebrado con anterioridad entre las partes sobre las materias que aquí se tratan.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEGUNDO: Propiedad industrial.</h4>
                      <p>
                        Las partes dejan establecido que podrán utilizar sus respectivas razones sociales, marcas comerciales, nombres distintivos, imágenes o logotipos en campañas
                        publicitarias o presentaciones de carácter comercial. Tal utilización de modo alguno constituye un traspaso o licencia de uso de tales elementos para fines distintos del presente Contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO TERCERO: Firma electrónica y ejemplar del Contrato.</h4>
                      <p>
                        El presente Contrato será firmado electrónicamente por ambas partes y quedará registrado en un ejemplar disponible en el Sistema Khipu, el que podrá ser descargado
                        por El Cobrador en cualquier momento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO CUARTO: Cumplimiento Ley N° 20.393 y Ley N° 21.595</h4>
                      <p className="mb-2">
                        Las Partes se obligan a cumplir de buena fe con todas las leyes y regulaciones aplicables a los Servicios a prestar, y/o cualquiera otra prestación a realizar para
                        que sea objeto del presente Contrato. En especial, las partes declaran conocer que la otra parte ha implementado un Modelo de Prevención de Delitos y se obligan a no
                        realizar ninguna actividad que pueda ser considerada constitutiva de delito en el contexto de las disposiciones de la Ley N°20.393 y la Ley N° 21.595.
                      </p>
                      <p>
                        Además, teniendo especial consideración los servicios contratados, las partes declaran conocer el texto de la Ley N°21.459, comprendiendo los delitos que en ella se
                        han tipificado, por lo que se obligan expresamente a cumplir en todo momento con lo dispuesto en dicha Ley, en la ejecución de los Servicios a que se refiere el presente contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO QUINTO: Tratamiento de Datos Personales.</h4>
                      <p className="mb-2">
                        Las Partes reconocen que, en virtud de la prestación de los Servicios objeto del Contrato, Khipu accederá, sólo para los efectos de recolección y captura de datos,
                        a datos de carácter personal estrictamente necesarios para el proceso de pago, siempre y cuando ésta última cuente con la debida fuente o base de licitud para ello
                        conforme las disposiciones de la Ley N°19.628 sobre Protección de la Vida Privada, y sus modificaciones posteriores, particularmente la Ley N°21.719. El responsable
                        del tratamiento y de la licitud de dichas es el Cobrador.
                      </p>
                      <p>
                        A mayor abundamiento, Khipu declara y asegura que no guardará, archivará ni almacenará datos, salvo los registros de pagos, de suerte tal que, una vez entregados a
                        través de medio cifrado, termina toda intervención en dicho proceso.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEXTO: No renuncia.</h4>
                      <p>
                        Si Khipu dejara de exigir el cumplimiento de alguna de las disposiciones establecidas en el presente contrato, ello no será de ninguna manera interpretado como una
                        renuncia a la estipulación del caso, ni en ninguna manera afectará la validez de la misma o cualquiera de sus partes o el derecho de Khipu para posteriormente exigir el cumplimiento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SÉPTIMO: Prórroga de competencia</h4>
                      <p>
                        Las partes se someterán en relación a este Contrato a las Leyes de la República de Chile. Además, prorrogan competencia en los tribunales ordinarios de la comuna
                        y ciudad de Santiago y se someten a la jurisdicción de sus tribunales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PERSONERÍAS.</h4>
                      <p className="mb-2">
                        La personería de don Emilio Davis Méndez y la de don Roberto Opazo Gazmuri para representar a Khipu SpA constan en escritura pública de 12 de noviembre de 2012
                        autorizada por el Notario Público de Santiago señor Pablo Gonzalez Caamaño.
                      </p>
                      {personType === 'juridica' && (
                        <p className="mb-2">
                          La personería de don(a) <strong>{contractData.fullName}</strong> y de don(a) ____________ para representar a <strong>{contractData.businessName}</strong> consta
                          por escritura pública de ____________, extendida en la Notaría de Santiago de ____________.
                        </p>
                      )}
                      <p>
                        La persona natural que acepta y suscribe el presente contrato declara ser absolutamente capaz para contratar, y en caso de estar actuando en representación de otra
                        persona, sea esta natural o jurídica, declara poseer facultades suficientes para representarla, pudiendo contratar en su nombre y obligarla.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-4 font-semibold">Las Partes firman en señal de aceptación.</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">Roberto Opazo Gazmuri</p>
                          <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          <div className="mt-4">
                            <p className="border-t border-gray-500 pt-2 text-center">Emilio Davis Méndez</p>
                            <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">{contractData.fullName}</p>
                          {personType === 'juridica' && (
                            <p className="text-center text-gray-600">pp. {contractData.businessName}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ANEXO DE CONDICIONES PARTICULARES */}
                    <div className="border-t-2 border-dashed border-gray-300 my-6 pt-6">
                      <div className="text-center mb-4">
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                          ANEXO DE CONDICIONES PARTICULARES
                        </span>
                      </div>
                      <div className="space-y-3">
                        <p><span className="font-semibold">Nombre o razón social:</span>{' '}
                          {personType === 'juridica' ? contractData.businessName : contractData.fullName}
                        </p>
                        <p><span className="font-semibold">RUT N°:</span>{' '}
                          {personType === 'juridica' ? contractData.businessRut : contractData.rut}
                        </p>
                        <p><span className="font-semibold">Domicilio:</span>{' '}
                          {personType === 'juridica'
                            ? `${contractData.street || ''}, ${contractData.floor || ''}, ${contractData.commune || ''}, ${contractData.region || ''}`.replace(/^,\s*|,\s*,/g, '').trim()
                            : contractData.address}
                        </p>
                        <p><span className="font-semibold">Correo electrónico:</span>{' '}
                          {personType === 'juridica' ? (formData?.businessEmail || '_________________') : (formData?.email || '_________________')}
                        </p>
                      </div>

                      <div className="mt-4">
                        <p className="font-semibold mb-2">Costos Variables (Comisión)</p>
                        <p className="mb-2">
                          Dentro de los costos variables se consideran dos tipos de tarifarios escalonados, los cuales acumulan de manera independiente con cuentas de cobro diferentes.
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Tarifario de tarifa fija por transacción:</span> Tabla escalonada con descuento por volumen de transacciones.
                          Valor fijo por transacción expresada en UF. El valor de la UF se fija el primer día del mes de operación.
                        </p>
                        <p className="text-xs text-gray-500 italic">
                          Los valores presentados se les debe agregar el IVA. El tarifario aplica para recaudación en cuenta de Khipu con rendición fondos al día siguiente hábil
                          en cuenta del banco Itaú o cuenta del comercio en el Banco Itaú. En caso de utilizarse otra cuenta de cobro las partes acuerdan la revisión de las tarifas indicadas.
                        </p>
                        {tarifarioUrl && (
                          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <a
                              href={tarifarioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                            >
                              <FileText className="w-4 h-4" />
                              Ver tarifario escalonado aplicable (PDF)
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-300">
                        <p className="mb-4 font-semibold">Las Partes firman en señal de aceptación.</p>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <p className="border-t border-gray-500 pt-2 text-center">Roberto Opazo Gazmuri</p>
                            <p className="text-center text-gray-600">pp. Khipu SpA</p>
                            <div className="mt-4">
                              <p className="border-t border-gray-500 pt-2 text-center">Emilio Davis Méndez</p>
                              <p className="text-center text-gray-600">pp. Khipu SpA</p>
                            </div>
                          </div>
                          <div>
                            <p className="border-t border-gray-500 pt-2 text-center">{contractData.fullName}</p>
                            {personType === 'juridica' && (
                              <p className="text-center text-gray-600">pp. {contractData.businessName}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                ) : showMandatoContract ? (
                  // Contrato de Mandato para Persona Natural con Pagos Instantáneos
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>MANDATO PARA PERCIBIR EL PAGO</p>
                      <p className="mt-2">{personType === 'natural' && (formData?.firstName || formData?.lastName) ? `${formData?.firstName || ''} ${formData?.lastName || ''}`.trim() : '___________________'}</p>
                      <p>Y</p>
                      <p>KHIPU SPA</p>
                    </div>

                    <p>
                      En el Santiago de Chile lugar, a {currentDay} de {currentMonth} de {currentYear}, entre:
                    </p>

                    <p>
                      Por una parte: KHIPU SPA, en adelante "Khipu", sociedad por acciones, Rol Único Tributario N° 76.187.287-7, 
                      representada por don ROBERTO OPAZO GAZMURI, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 9.123.845-4 
                      y don EMILIO DAVIS MENDEZ, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados 
                      en calle Las Urbinas N° 53, piso 13, comuna de Providencia, Chile,
                    </p>

                    <p>
                      Por otra parte: {contractData.fullName}, Rol Único Tributario N° {contractData.rut} sociedad representada por 
                      don(a) {contractData.fullName}, chileno(a), domiciliados en {contractData.address}, 
                      en adelante "el Cobrador", se ha convenido el siguiente mandato para percibir el pago:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: Definiciones.</h4>
                      <p className="mb-2">Para los efectos del presente contrato se definen los siguientes conceptos:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>"Khipu", es el mandatario para percibir el pago acordado entre el Cobrador y el Pagador, y lo ejecuta por medio del Sistema Khipu.</li>
                        <li>"Cobrador", es la persona natural o jurídica que ha mandatado a Khipu para percibir el pago convenido entre el primero y el Pagador.</li>
                        <li>"Pagador", es la persona natural o jurídica que ha acordado un pago con el Cobrador, y que ha mandatado a Khipu para efectuar el pago convenido.</li>
                        <li>"Sistema Khipu", es el conjunto de programas computacionales (en especial la Aplicación de Terminal de Pago Khipu), licencias, portales web, procedimientos, equipamiento (computadores personales, servidores y aparatos de telecomunicaciones) y servicios de terceros que permiten perfeccionar pagos electrónicos, mediante transferencias electrónicas bancarias entre cuentas corrientes y/o cuentas vista que ejecutan en el sistema bancario nacional, conforme sus políticas, prácticas y mecanismos de seguridad, u otro sistema determinado por Khipu.</li>
                        <li>"Aplicación Terminal de Pago Khipu", es un navegador web o browser, que permite navegar por páginas programadas en lenguaje HTML, preparado para automatizar la generación de transferencias de dinero entre cuentas bancarias.</li>
                        <li>"Pago", es la suma de dinero determinada en cada operación efectuada mediante el Sistema Khipu, entre el Cobrador y Pagador, que es entregada a Khipu y que éste último recibe del Pagador, por cuenta y nombre del Cobrador.</li>
                        <li>"Operación", es el ejercicio especial y particular del mandato para percibir el pago que se conviene en este instrumento, realizado por el Pagador a Khipu, identificado mediante un código único, fecha y monto, y que se perfecciona en el instante en que los fondos son recibidos en la cuenta corriente de Khipu.</li>
                        <li>"Código Único de Operación", es el código exclusivo que identifica cada operación.</li>
                        <li>"Comisión", es una suma de dinero pagada a Khipu, acordada para cada operación según los términos incluidos en el Anexo de Condiciones Particulares de este contrato correspondiente al precio del servicio prestado por Khipu.</li>
                        <li>"Hora de Cierre Diario", es la hora establecida en el Sistema Khipu para el cierre de la rendición de pagos percibidos.</li>
                        <li>"Condiciones de Uso", es el conjunto de políticas y prácticas de operación del Sistema Khipu, estipuladas en el documento denominado "Condiciones de Uso", el cual se encuentra disponible en el sitio web https://khipu.com.</li>
                        <li>"Convenio Pagador –Cobrador" o "Convención Pagador –Cobrador", acuerdo de voluntad, escrito o no, entre Pagador y Cobrador, del cual deriva la obligación del primero de pagar al segundo una determinada suma de dinero.</li>
                        <li>"Usuario", es la persona natural o jurídica que realiza una operación en el Sistema Khipu y que se encuentra registrada en éste mediante la individualización de una o más casillas electrónicas.</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: Objeto del contrato.</h4>
                      <p>
                        El Cobrador mandata a Khipu para percibir el pago de cobros de operaciones mediante el Sistema Khipu, en los términos contenidos 
                        en este contrato y conforme las disposiciones de los artículos 2116 y siguientes del Código Civil y demás normas legales pertinentes. 
                        El mandato se entenderá otorgado al momento en que el Cobrador registre la operación en el Sistema Khipu, y su ejecución se perfeccionará 
                        con la recepción de los fondos por parte de Khipu, lo que importará la aceptación del mandato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: Forma de transferir el Pago percibido.</h4>
                      <p>
                        Khipu efectuará un depósito en la cuenta corriente o cuenta vista del Cobrador, mediante una transferencia de fondos electrónica, 
                        pago por nómina u otro producto bancario, de forma tal que permita que todas las operaciones de percepción de pago perfeccionadas 
                        antes de la Hora de Cierre Diario y que no hayan sido rendidas o depositadas en fecha precedente, en el Sistema Khipu, sean 
                        depositadas dentro del día hábil bancario siguiente.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: Rendición de Pagos</h4>
                      <p>
                        Khipu, diariamente practicará rendiciones de las operaciones efectivamente concretadas, esto es de los montos percibidos, 
                        para el Cobrador conforme la Hora de Cierre Diario, mediante la remisión del detalle de las mismas, que le serán remitidas 
                        vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema Khipu y que además quedarán 
                        disponibles para el Cobrador en el Sistema Khipu. En caso de no existir casilla electrónica configurada en el Sistema Khipu, 
                        la rendición será informada únicamente mediante su publicación en el Sistema.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: Comisión y otros costos</h4>
                      <p className="mb-2">
                        El Cobrador, por la aceptación del pago por medio del Sistema Khipu, se obliga a pagar mensualmente a Khipu, la comisión 
                        y las tarifas fijas establecidos en el Anexo de Condiciones Particulares o en sus modificaciones.
                      </p>
                      {tarifarioUrl && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900 mb-2 font-semibold">
                            📄 Plan seleccionado: {selectedPlan === 'plan-porcentual' ? 'Plan Porcentual' : 'Plan con Tarifa Fija'}
                          </p>
                          <a
                            href={tarifarioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                          >
                            <FileText className="w-4 h-4" />
                            Ver tarifario aplicable (PDF)
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: Mandato irrevocable para deducir comisión.</h4>
                      <p>
                        El Cobrador otorga mandato especial e irrevocable a Khipu para que deduzca de los pagos que deba efectuar al Cobrador, 
                        su comisión y eventuales impuestos aplicables, como así también para que le haga entrega de los valores netos correspondientes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEPTIMO: Vigencia.</h4>
                      <p>
                        El presente contrato tendrá una duración de un año contado desde la fecha de suscripción, sin perjuicio que, del derecho 
                        de cualquiera de las partes para ponerle término en cualquier tiempo mediante comunicación electrónica remitida a lo menos 
                        con 30 días corridos de anticipación.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: Firma electrónica y ejemplar del Contrato.</h4>
                      <p>
                        El presente Contrato será firmado electrónicamente por ambas partes y quedará registrado en un ejemplar disponible en el 
                        Sistema Khipu, el que podrá ser descargado por El Cobrador en cualquier momento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">NOVENO: Prórroga de competencia.</h4>
                      <p>
                        Las partes se someterán en relación a este Contrato a las Leyes de la República de Chile. Además, prorrogan competencia 
                        en los tribunales ordinarios de la comuna y ciudad de Santiago y se someten a la jurisdicción de sus tribunales.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-4 font-semibold">Las Partes firman en señal de aceptación.</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">Roberto Opazo Gazmuri</p>
                          <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          <div className="mt-4">
                            <p className="border-t border-gray-500 pt-2 text-center">Emilio Davis Méndez</p>
                            <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">{contractData.fullName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                
                ) : showMandatoPercibirPagoContract ? (
                  // Contrato de MANDATO PARA PERCIBIR EL PAGO (negocios < 160k, no PSP, no mandato terceros)
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>MANDATO PARA PERCIBIR EL PAGO</p>
                      <p className="mt-2">{contractData.businessName}</p>
                      <p>Y</p>
                      <p>KHIPU SPA</p>
                    </div>

                    <p>
                      En el Santiago de Chile lugar, a {currentDay} de {currentMonth} de {currentYear}, entre:
                    </p>

                    <p>
                      Por una parte: KHIPU SPA, en adelante "Khipu", sociedad por acciones, Rol Único Tributario N° 76.187.287-7, 
                      representada por don ROBERTO OPAZO GAZMURI, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 9.123.845-4 
                      y don EMILIO DAVIS MENDEZ, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados 
                      en calle Las Urbinas N° 53, piso 13, comuna de Providencia, Chile,
                    </p>

                    <p>
                      Por otra parte: <strong>{contractData.businessName}</strong>, Rol Único Tributario N° <strong>{contractData.businessRut}</strong> 
                      sociedad representada por don(a) <strong>{contractData.fullName}</strong>, chileno, Cédula Nacional de Identidad 
                      N° <strong>{contractData.legalRepRut}</strong>, domiciliado en <strong>{contractData.street}</strong>, piso <strong>{contractData.floor}</strong>, 
                      comuna de <strong>{contractData.commune}</strong>, <strong>{contractData.region}</strong>, en adelante "el Cobrador", referidos conjuntamente 
                      como las "Partes", se ha convenido el siguiente mandato para percibir el pago:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: Definiciones.</h4>
                      <p className="mb-2">Para los efectos del presente contrato se definen los siguientes conceptos:</p>
                      <p className="mb-2">
                        "Khipu", es el mandatario para percibir el pago acordado entre el Cobrador y el Pagador, y lo ejecuta por medio del Sistema Khipu.
                      </p>
                      <p className="mb-2">
                        "Cobrador", es la persona natural o jurídica que ha mandatado a Khipu para percibir el pago convenido entre el primero y el Pagador.
                      </p>
                      <p className="mb-2">
                        "Pagador", es la persona natural o jurídica que ha acordado un pago con el Cobrador, y que ha mandatado a Khipu para efectuar el pago convenido.
                      </p>
                      <p className="mb-2">
                        "Sistema Khipu", es el conjunto de programas computacionales (en especial la Aplicación de Terminal de Pago Khipu), licencias, portales web, 
                        procedimientos, equipamiento (computadores personales, servidores y aparatos de telecomunicaciones) y servicios de terceros que permiten 
                        perfeccionar pagos electrónicos, mediante transferencias electrónicas bancarias entre cuentas corrientes y/o cuentas vista que ejecutan en 
                        el sistema bancario nacional, conforme sus políticas, prácticas y mecanismos de seguridad, u otro sistema determinado por Khipu. El Sistema 
                        podrá incluir herramientas electrónicas que faciliten la comunicación entre Cobrador y Pagador, sin que por ello Khipu se transforme en parte 
                        de las convenciones que pacten, ni actué como intermediador.
                      </p>
                      <p className="mb-2">
                        "Aplicación Terminal de Pago Khipu", es un navegador web o browser, que permite navegar por páginas programadas en lenguaje HTML, preparado 
                        para automatizar la generación de transferencias de dinero entre cuentas bancarias, mostrando las páginas web con una representación visual 
                        distinta a la que mostraría un navegador web de propósito general, pero sin alterar los mecanismos de seguridad de las mismas.
                      </p>
                      <p className="mb-2">
                        "Pago", es la suma de dinero determinada en cada operación efectuada mediante el Sistema Khipu, entre el Cobrador y Pagador, que es entregada 
                        a Khipu y que éste último recibe del Pagador, por cuenta y nombre del Cobrador.
                      </p>
                      <p className="mb-2">
                        "Operación", es el ejercicio especial y particular del mandato para percibir el pago que se conviene en este instrumento, realizado por el 
                        Pagador a Khipu, identificado mediante un código único, fecha y monto, y que se perfecciona en el instante en que los fondos son recibidos 
                        en la cuenta corriente de Khipu.
                      </p>
                      <p className="mb-2">
                        "Código Único de Operación", es el código exclusivo que identifica cada operación.
                      </p>
                      <p className="mb-2">
                        "Comisión", es una suma de dinero pagada a Khipu, acordada para cada operación según los términos incluidos en el Anexo de Condiciones 
                        Particulares de este contrato correspondiente al precio del servicio prestado por Khipu.
                      </p>
                      <p className="mb-2">
                        "Hora de Cierre Diario", es la hora establecida en el Sistema Khipu para el cierre de la rendición de pagos percibidos.
                      </p>
                      <p className="mb-2">
                        "Condiciones de Uso", es el conjunto de políticas y prácticas de operación del Sistema Khipu, estipuladas en el documento denominado 
                        "Condiciones de Uso", el cual se encuentra disponible en el sitio web https://khipu.com, pudiendo ser descargado desde aquel.
                      </p>
                      <p className="mb-2">
                        "Convenio Pagador –Cobrador" o "Convención Pagador –Cobrador", acuerdo de voluntad, escrito o no, entre Pagador y Cobrador, del cual 
                        deriva la obligación del primero de pagar al segundo una determinada suma de dinero, la que es satisfecha por medio de la operación del 
                        mandato ejecutado por medio de Khipu. Khipu no es parte de dicho acuerdo de voluntades.
                      </p>
                      <p className="mb-2">
                        "Usuario", es la persona natural o jurídica que realiza una operación en el Sistema Khipu y que se encuentra registrada en éste mediante 
                        la individualización de una o más casillas electrónicas.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: Objeto del contrato.</h4>
                      <p>
                        El Cobrador mandata a Khipu para percibir el pago de cobros de operaciones mediante el Sistema Khipu, en los términos contenidos en este 
                        contrato y conforme las disposiciones de los artículos 2116 y siguientes del Código Civil y demás normas legales pertinentes. El mandato 
                        se entenderá otorgado al momento en que el Cobrador registre la operación en el Sistema Khipu, y su ejecución se perfeccionará con la 
                        recepción de los fondos por parte de Khipu, lo que importará la aceptación del mandato.
                      </p>
                      <p className="mt-2">
                        El Sistema Khipu dispondrá de un campo específico que permita al Cobrador indicar un código único a cada transacción, de manera que facilite 
                        la conciliación de los cobros realizados mediante el Sistema Khipu y el sistema de venta del Cobrador.
                      </p>
                      <p className="mt-2">
                        Khipu no participa ni interviene en el acuerdo de voluntades Convenio Pagador-Cobrador, ni en su causa, objeto y/o condiciones, siendo el 
                        Cobrador el responsable y quien registra la operación de cobro en el Sistema Khipu, y Pagador y Cobrador los únicos responsables de verificar 
                        la veracidad de los elementos que configuran cada Operación.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: Forma de transferir el Pago percibido.</h4>
                      <p>
                        Khipu efectuará un depósito en la cuenta corriente o cuenta vista del Cobrador, mediante una transferencia de fondos electrónica, pago por 
                        nómina u otro producto bancario, de forma tal que permita que todas las operaciones de percepción de pago perfeccionadas antes de la Hora 
                        de Cierre Diario y que no hayan sido rendidas o depositadas en fecha precedente, en el Sistema Khipu, sean depositadas dentro del día hábil 
                        bancario siguiente.
                      </p>
                      <p className="mt-2">
                        La imposibilidad del banco en que se encuentren depositados los fondos mandatados para el pago, de transferir el pago al Cobrador, sea ella 
                        a consecuencia de terremotos, maremotos, catástrofes naturales, huelgas generalizadas, guerras, conmoción nacional o por otro caso de fuerza 
                        mayor o caso fortuito, u otra situación ajena a la responsabilidad de Khipu, no genera responsabilidad alguna para este último. Sin perjuicio 
                        de lo anterior, Khipu se obliga a actuar diligentemente con el objeto de poner a disposición del Cobrador el pago percibido tan pronto como 
                        ello sea posible, una vez superadas las circunstancias que hubieren impedido su transferencia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: Rendición de Pagos</h4>
                      <p>
                        Khipu, diariamente practicará rendiciones de las operaciones efectivamente concretadas, esto es de los montos percibidos, para el Cobrador 
                        conforme la Hora de Cierre Diario, mediante la remisión del detalle de las mismas, que le serán remitidas vía correo electrónico a la casilla 
                        electrónica configurada por el Cobrador en el Sistema Khipu y que además quedarán disponibles para el Cobrador en el Sistema Khipu. En caso 
                        de no existir casilla electrónica configurada en el Sistema Khipu, la rendición será informada únicamente mediante su publicación en el Sistema.
                      </p>
                      <p className="mt-2">
                        La rendición tendrá efectos meramente informativos y operativos, y no implicará validación, verificación ni garantía por parte de Khipu 
                        respecto de la exactitud, licitud o veracidad de los datos registrados por el Cobrador o el Pagador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: Comprobante de Pago.</h4>
                      <p>
                        Khipu se obliga a emitir un comprobante de pago firmado electrónicamente, por cada una de las operaciones efectuadas a través del Sistema 
                        Khipu, una vez percibidos los fondos para los que es mandatado a pagar por el Pagador, en el cual se individualice el Código Único de Operación, 
                        monto, fecha de la misma, Pagador, Cobrador y demás antecedentes señalados en Condiciones de Uso.
                      </p>
                      <p className="mt-2">
                        El Comprobante de Pago será remitido vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema Khipu y que 
                        además quedarán disponibles en el Sistema Khipu. En caso de existir imposibilidad de remitir y/o recibir el comprobante, la rendición será 
                        informada únicamente mediante su publicación en el Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: Comisión y otros costos</h4>
                      <p>
                        El Cobrador, por la aceptación del pago por medio del Sistema Khipu, se obliga a pagar mensualmente a Khipu, la comisión y las tarifas fijas 
                        establecidos en el Anexo de Condiciones Particulares o en sus modificaciones. El monto a pagar por cada Operación efectuada en el mes se calcula 
                        al día del pago efectivo de cada operación entre Pagador y Khipu y al término del mes se liquida la totalidad de las operaciones cursadas, 
                        conforme a la tarifa indicada en el Anexo de condiciones particulares.
                      </p>
                      {tarifarioUrl && (
                        <p className="mt-2">
                          Tarifario aplicable: <a href={tarifarioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">{tarifarioUrl}</a>
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SÉPTIMO: Mandato irrevocable para deducir comisión.</h4>
                      <p>
                        El Cobrador otorga mandato especial e irrevocable a Khipu para que deduzca de los pagos que deba efectuar al Cobrador, su comisión y eventuales 
                        impuestos aplicables, como así también para que le haga entrega de los valores netos correspondientes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: Suministro de servicio y/o bienes.</h4>
                      <p>
                        El Cobrador reconoce que Khipu no tiene obligación alguna en el cumplimiento en tiempo, forma, cantidad, calidad o precio en la entrega de 
                        cualquier bien, servicio u otro tipo de contraprestación que pudiere dar origen o causar el pago mandatado, en términos mediatos o inmediatos.
                      </p>
                      <p className="mt-2">
                        Asimismo, la eventual obligación de emitir boleta o factura derivada de la adquisición de un bien y/o prestación de algún servicio contratado 
                        recae única y exclusivamente en el Cobrador. Lo anterior no obsta a la obligación de Khipu de facturar los servicios prestados en conformidad 
                        a lo estipulado en este Contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">NOVENO: Requerimiento de operación lícita y real.</h4>
                      <p>
                        El Cobrador reconoce, acepta y se obliga a utilizar el Sistema Khipu sólo para recibir pagos de origen y con finalidad lícita, pudiendo ser 
                        estos derivados de la adquisición de bienes, prestación de servicios, actividades o prestaciones en general, convenidas entre él y el Pagador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO: Reclamo por diferencias en operaciones.</h4>
                      <p>
                        En el evento que en las rendiciones indicadas se omitiesen operaciones realizadas en el periodo respectivo; contengan retenciones, descuentos 
                        u otros cargos indebidos o improcedentes; o bien existiesen errores o diferencias con sus propios registros, el Cobrador tendrá un plazo máximo 
                        de 5 días corridos, contados desde la emisión de la rendición respectiva, para efectuar el correspondiente reclamo, transcurrido dicho plazo 
                        sin existir reclamo, se entenderá aprobada la rendición por el Cobrador sin más trámite.
                      </p>
                      <p className="mt-2">
                        Para la presentación de reclamos, éstos deben ser interpuestos en forma pormenorizada, indicando precisamente la operación omitida o respecto 
                        de la cual existen errores o diferencias, mediante el Código de Operación, e indicando los motivos y antecedentes en que se funda el reclamo. 
                        Respecto de las operaciones no reclamadas, la liquidación se entenderá aprobada.
                      </p>
                      <p className="mt-2">
                        Para efectos de la presentación de reclamos, Khipu se obliga a disponer en el Sistema Khipu una opción para el ingreso y seguimientos de reclamos, 
                        el cual identificará cada reclamo mediante un número único.
                      </p>
                      <p className="mt-2">
                        El reclamo será resuelto por Khipu, conforme sus respaldos y registros bancarios correspondientes, dentro de los 30 días siguientes de recibido 
                        el reclamo.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO PRIMERO: Reembolso.</h4>
                      <p>
                        Si Khipu realizara una rendición de pagos, donde el monto transferido fuera mayor al total recaudado, menos la comisión, se gestionará como si 
                        dicho dinero transferido en exceso hubiese sido entregado por adelantado.
                      </p>
                      <p className="mt-2">
                        En la siguiente rendición se descontará el adelanto transfiriendo al Cobrador el saldo entre el monto a rendir y el adelanto. Si el monto del 
                        adelanto fuera mayor al monto que se debe rendir al día hábil siguiente, entonces no se realizará transferencia. Esto ocurrirá en las rendiciones 
                        de los días hábiles posteriores hasta que el adelanto haya sido rebajado completamente.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO SEGUNDO: Imposibilidad de cumplimiento.</h4>
                      <p>
                        El Cobrador declara conocer que, en razón de ser éste un mandato para percibir el pago, la imposibilidad de Khipu de percibir el pago o de 
                        enterar al Cobrador algún pago percibido; o, si éste fuera enterado con retraso a lo pactado, sea que tales situaciones se funden en hechos de 
                        cualquiera de las partes contratantes o del Pagador, será responsabilidad única y de cargo del Cobrador la de entregar al Pagador el o los bienes 
                        o de prestar el o los servicios contratados al Pagador, del cual pudiera emanar el pago mandatado a ejecutar.
                      </p>
                      <p className="mt-2">
                        Asimismo, el Cobrador declara estar en conocimiento que Khipu no será responsable en caso alguno de eventuales perjuicios directos o indirectos, 
                        previstos o imprevistos, que puedan originarse a él en virtud del incumplimiento de alguna o algunas de sus obligaciones para con el Pagador.
                      </p>
                      <p className="mt-2">
                        Las partes acuerdan que Khipu queda exento de toda responsabilidad de perjuicios directos e indirectos, previstos e imprevistos, si por razones 
                        de caso fortuito o fuerza mayor tales como sismos, cortes de energía eléctrica y/o del servicio telefónico y/o líneas de transmisión de datos, 
                        intervenciones de redes por parte de terceros, no funcionamiento de redes públicas y/o privadas, no funcionamiento de los sistemas de uno o más 
                        bancos, actos terroristas, huelgas u otros similares; no se pudiere mantener en funcionamiento u operativo el Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO TERCERO: Controversia Cobrador – Pagador.</h4>
                      <p>
                        Cualquier controversia o dificultad entre el Cobrador y el Pagador, especialmente las relativas a la calidad, cantidad o cualquier característica 
                        de una venta o servicio prestado, deberá ser resuelta directamente entre esas partes, sin intervención ni responsabilidad alguna de Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO CUARTO: Cambio de antecedentes del Cobrador.</h4>
                      <p>
                        El Cobrador deberá modificar en forma inmediata, en el sistema Khipu, cualquier cambio relativo a los antecedentes registrados en él y que sean 
                        necesarios para la correcta ejecución del mandato. El Cobrador es responsable exclusivo de informar oportunamente a Khipu de cualquier cambio en 
                        la forma de pago, especialmente tratándose de la cuenta bancaría en la que Khipu debe depositar los montos recaudados, no siendo Khipu responsable 
                        por los perjuicios que por ellos se pudieran causar.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO QUINTO: Condiciones de Uso.</h4>
                      <p>
                        El Cobrador declara conocer y acepta las Condiciones de Uso del Sistema Khipu, las cuales se encuentran disponibles en el portal web de Khipu.
                      </p>
                      <p className="mt-2">
                        Khipu dentro de las condiciones del presente contrato y su(s) Anexo(s), podrá emitir unilateralmente manuales, instrucciones o normas operacionales 
                        destinadas a complementar el sistema establecido en este instrumento o destinadas a adoptar acciones o mecanismos de seguridad en las operaciones 
                        para evitar usos indebidos o fraudulentos del Sistema Khipu, debiendo el Cobrador atenerse a tales normas.
                      </p>
                      <p className="mt-2">
                        Las normas que disponga Khipu serán comunicadas y difundidas por medios electrónicos, con a lo menos 10 días previos a su entrada en vigencia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SEXTO: Modificaciones.</h4>
                      <p>
                        Las modificaciones de las condiciones del presente contrato y sus Condiciones de Uso podrán acordarse por medio de sistemas electrónicos y con a 
                        lo menos 30 días corridos de anticipación a la fecha en que las modificaciones del caso comenzarán a regir.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SEPTIMO: Prohibiciones.</h4>
                      <p>
                        El Cobrador no podrá ceder total o parcialmente el presente contrato y/o cualquiera de los derechos que de él puedan emanar. Sin perjuicio de lo 
                        anterior, Khipu queda facultado para ceder los derechos y obligaciones que emanan de este contrato, previa notificación al cobrador con a lo menos 
                        10 días de anticipación.
                      </p>
                      <p className="mt-2">
                        Queda prohibido al Pagador y Cobrador incorporar al Sistema Khipu cualquier tipo de información o antecedentes falsos o que atente contra las leyes 
                        nacionales o internacionales, sean ellas civiles, penales, comerciales, o de propiedad intelectual, sin ser esta una enumeración taxativa. Siendo 
                        de única y exclusiva responsabilidad de la veracidad ideológica, intelectual y/o material de la información proporcionada al Sistema Khipu, como 
                        asimismo mantener actualizados los antecedentes exigidos por el Sistema Khipu.
                      </p>
                      <p className="mt-2">
                        El Cobrador faculta a Khipu, para que éste conforme su criterio y políticas, pueda eliminar o suspender del Sistema Khipu cualquier antecedente 
                        proporcionado por el Pagador o Cobrador que se estime pueda afectar leyes o normas nacionales, extranjeras o supranacionales, situación que incluso 
                        puede ser motivo de la suspensión o eliminación del Cobrador del Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO OCTAVO: Término del contrato por incumplimiento o insolvencia.</h4>
                      <p>
                        El incumplimiento del Cobrador de cualquiera de las obligaciones que emanan del presente instrumento o sus modificaciones, faculta a Khipu para 
                        poner término a éste en forma inmediata y sin previo aviso, sin perjuicio de ella procurará practicar los oficios pertinentes para que el cobrador 
                        cumpla sus obligaciones.
                      </p>
                      <p className="mt-2">
                        Igual facultad regirá para el caso de que alguna de las partes cayere en insolvencia o fuere declarada su quiebra.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO NOVENO: Propiedad de los fondos.</h4>
                      <p>
                        Las partes declaran conocer que las sumas de dinero que Khipu percibe del Pagador y transfiere electrónicamente al Cobrador en razón de las 
                        operaciones descritas en este contrato no son de propiedad de Khipu, siendo éste un mero poseedor de ellas, sin perjuicio de lo concerniente a 
                        las comisiones que por el uso del Sistema cobra. Khipu dispondrá de cuentas bancarias separadas para la administración de los fondos de su 
                        propiedad y la de los fondos que le son entregados en mandato de pago.
                      </p>
                      <p className="mt-2">
                        El Cobrador declara conocer que Khipu brinda este servicio a otros cobradores y que dichos fondos cumplen las mismas condiciones señaladas.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGESIMO: Vigencia.</h4>
                      <p>
                        El presente contrato tendrá una duración de un año contado desde la fecha de suscripción, sin perjuicio que, del derecho de cualquiera de las 
                        partes para ponerle término en cualquier tiempo mediante comunicación electrónica remitida a lo menos con 30 días corridos de anticipación. Con 
                        todo, el contrato se renovare tácita y automáticamente por períodos iguales y sucesivos de 1 año cada uno, si ninguna de las partes haya comunicado 
                        por escrito su intención de darle término con 30 días de anticipación a la expiración de su plazo de vigencia original o prorrogado.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO PRIMERO: Versiones anteriores sin efecto.</h4>
                      <p>
                        El presente contrato reemplaza cualquier otro acuerdo o convención celebrado con anterioridad entre las partes sobre las materias que aquí se tratan.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEGUNDO: Propiedad industrial.</h4>
                      <p>
                        Las partes dejan establecido que podrán utilizar sus respectivas razones sociales, marcas comerciales, nombres distintivos, imágenes o logotipos 
                        en campañas publicitarias o presentaciones de carácter comercial. Tal utilización de modo alguno constituye un traspaso o licencia de uso de tales 
                        elementos para fines distintos del presente Contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO TERCERO: Firma electrónica y ejemplar del Contrato.</h4>
                      <p>
                        El presente Contrato será firmado electrónicamente por ambas partes y quedará registrado en un ejemplar disponible en el Sistema Khipu, el que 
                        podrá ser descargado por El Cobrador en cualquier momento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO CUARTO: Cumplimiento Ley N° 20.393 y Ley N° 21.595</h4>
                      <p>
                        Las Partes se obligan a cumplir de buena fe con todas las leyes y regulaciones aplicables a los Servicios a prestar, y/o cualquiera otra prestación 
                        a realizar para que sea objeto del presente Contrato. En especial, las partes declaran conocer que la otra parte ha implementado un Modelo de 
                        Prevención de Delitos. En especial, cada parte se obliga a no realizar ninguna actividad que pueda ser considerada constitutiva de delito y que por 
                        tanto conlleve o pueda conllevar responsabilidad penal para la otra parte, en el contexto de las disposiciones de la Ley N°20.393 y la Ley N° 21.595 
                        que establece la responsabilidad penal de las personas jurídicas en diversos tipos penales, y sus modificaciones posteriores.
                      </p>
                      <p className="mt-2">
                        Atendido lo señalado precedentemente, las partes se obligan a tomar todas las medidas necesarias para asegurar que éste, sus trabajadores o 
                        dependientes, y sus subcontratistas, no incurrirán en alguna conducta prohibida por la ley y en especial aquellas que puedan generar algún tipo de 
                        responsabilidad penal para la otra parte, las que, en caso de ocurrir deberán ser informadas de inmediato a la otra parte, a través del Sistema de 
                        Denuncia que corresponda, debiendo además tomar todas las medidas que se encuentren a su alcance para cesar en las mismas y mitigar sus consecuencias.
                      </p>
                      <p className="mt-2">
                        Además, teniendo especial consideración los servicios contratados, las partes declaran conocer el texto de la Ley N°21.459, comprendiendo los delitos 
                        que en ella se han tipificado, por lo que se obligan expresamente a cumplir en todo momento con lo dispuesto en dicha Ley, en la ejecución de los 
                        Servicios a que se refiere el presente contrato.
                      </p>
                      <p className="mt-2">
                        Asimismo, las partes, velarán especialmente porque todos sus dependientes en el ejercicio de la prestación de Servicios tecnológicos y/o durante su 
                        ejecución, cumplan, asimismo, en todo momento la Ley N°21.459. En relación con lo anterior, las partes deberán reportar o informar de forma inmediata 
                        a la otra parte, toda vez que tome conocimiento de que alguno de sus trabajadores, a cualquier título, cometa algún tipo de infracción a la Ley N°21.459.
                      </p>
                      <p className="mt-2">
                        Las partes elevan a la presente cláusula al carácter de esencial.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO QUINTO: Tratamiento de Datos Personales.</h4>
                      <p>
                        Las Partes reconocen que, en virtud de la prestación de los Servicios objeto del Contrato, Khipu accederá, sólo para los efectos de recolección y 
                        captura de datos, a datos de carácter personal pertenecientes estrictamente necesarios para el proceso de pago, siempre y cuando ésta última cuente 
                        con la debida fuente o base de licitud para ello conforme las disposiciones de la Ley N°19.628 sobre Protección de la Vida Privada, y sus modificaciones 
                        posteriores, particularmente la Ley N°21.719. El responsable del tratamiento y de la licitud de dichas es el Cobrador, así como contar con la fuente 
                        de licitud, cumplir con la finalidad respectiva, el periodo del tratamiento y contar con los procedimientos, herramientas y medidas organizativas 
                        necesarias para el cumplimiento de la normativa de protección de datos.
                      </p>
                      <p className="mt-2">
                        En consecuencia, y dado que posteriormente los datos personales a los que acceda Khipu, quien sólo participa del proceso de captura y recolección, 
                        serán entregados única y exclusivamente al Cobrador, éste último se obliga a que en el tratamiento de tales datos respetarán estrictamente las 
                        disposiciones de la normativa vigente. El Cobrador ha implementado e implementará políticas, protocolos y sistemas para cumplir con todas las 
                        disposiciones legales que regulan la materia, y especialmente, se ha obligado a exigir a sus proveedores que manejen o traten datos personales de 
                        titularidad de cualquier persona, tales como clientes y/o colaboradores, a disponer de un sistema que asegura -a lo menos- lo siguiente:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>Conservar los Datos bajo estricta confidencialidad y secreto.</li>
                        <li>Utilizarlos exclusivamente para las finalidades indicadas en la presente cláusula y de acuerdo con las instrucciones impartidas por el Cobrador.</li>
                        <li>No comunicar, ceder, ni compartir los Datos con otras personas, ni subcontratar el tratamiento de los Datos, sin la autorización expresa del Cobrador.</li>
                        <li>Asegurarse que los Datos sean manejados únicamente por aquellos empleados cuya intervención sea estrictamente necesaria para la correcta ejecución del Contrato.</li>
                        <li>Exigir a aquellos empleados que tengan acceso a los Datos, obligaciones idénticas a las que se establecen en la presente cláusula.</li>
                        <li>Implementar las medidas de seguridad de índole técnica y organizativa apropiadas para garantizar la seguridad de los Datos, evitando su alteración, pérdida, 
                        tratamiento o acceso no autorizado, de conformidad con el estado de la tecnología, la naturaleza de los Datos y los posibles riesgos a que estén expuestos.</li>
                        <li>Notificar al Cobrador las violaciones de la seguridad que puedan afectar la confidencialidad, integridad, disponibilidad, y resiliencia de los Datos, sin 
                        dilación alguna, junto con toda la información relevante de la incidencia.</li>
                        <li>Destruir o devolver los Datos ya sea a solicitud del Cobrador o una vez finalizado el presente Contrato, así como también los soportes o documentos en que 
                        consten dichos Datos, sin conservar copia alguna.</li>
                        <li>Asistir al Cobrador en el ejercicio de los derechos que se les reconocen a los titulares de los datos en la ley vigente y, específicamente, a informar en 
                        caso de cualquier solicitud que reciba de los titulares en relación con el ejercicio de dichos derechos, de forma inmediata, y en no más de 2 días hábiles.</li>
                        <li>Apoyar y poner a disposición del Cobrador toda la información necesaria para demostrar el cumplimiento de sus obligaciones.</li>
                      </ul>
                      <p className="mt-2">
                        A mayor abundamiento, Khipu declara y asegura que no guardará, archivará ni almacenará datos, salvo los registros de pagos, de suerte tal que, una vez 
                        entregados a través de medio cifrado, termina toda intervención en dicho proceso.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGESIMO SEXTO: No renuncia.</h4>
                      <p>
                        Si Khipu dejara de exigir el cumplimiento de alguna de las disposiciones establecidas en el presente contrato, ello no será de ninguna manera 
                        interpretado como una renuncia a la estipulación del caso, ni en ninguna manera afectará la validez de la misma o cualquiera de sus partes o el 
                        derecho de Khipu para posteriormente exigir el cumplimiento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGESIMO SEPTIMO: Prórroga de competencia</h4>
                      <p>
                        Las partes se someterán en relación a este Contrato a las Leyes de la República de Chile. Además, prorrogan competencia en los tribunales ordinarios 
                        de la comuna y ciudad de Santiago y se someten a la jurisdicción de sus tribunales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PERSONERÍAS.</h4>
                      <p>
                        La personería de don Emilio Davis Méndez y la de don Roberto Opazo Gazmuri para representar a Khipu SpA constan en escritura pública de 12 de 
                        noviembre de 2012 autorizada por el Notario Público de Santiago señor Pablo Gonzalez Caamaño.
                      </p>
                      <p className="mt-2">
                        La personería de don(a) <strong>{contractData.fullName}</strong> para representar a <strong>{contractData.businessName}</strong> consta en el 
                        registro de comercio correspondiente.
                      </p>
                      <p className="mt-2">
                        La persona natural que acepta y suscribe el presente contrato declara ser absolutamente capaz para contratar, y en caso de estar actuando en 
                        representación de otra persona, sea esta natural o jurídica, declara poseer facultades suficientes para representarla, pudiendo contratar en su 
                        nombre y obligarla.
                      </p>
                      <p className="mt-2">
                        Khipu podrá exigir, en cualquier oportunidad, la presentación de antecedentes que acrediten de manera suficiente la personaría en virtud de la cual 
                        se actúa, reservándose el derecho a suspender o eliminar del Sistema Khipu a quien no acredite la personería de quien actuó en su representación, o 
                        sea ratificado expresamente lo obrado por la representada.
                      </p>
                    </div>

                    <div className="text-center mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-8">Las Partes firman en señal de aceptación.</p>
                      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <div>
                          <div className="border-t border-gray-400 pt-2">
                            <p className="font-semibold">Roberto Opazo Gazmuri</p>
                            <p className="text-sm text-gray-600">pp. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <div className="border-t border-gray-400 pt-2">
                            <p className="font-semibold">Emilio Davis Mendez</p>
                            <p className="text-sm text-gray-600">pp. Khipu SpA</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="border-t border-gray-400 pt-2 max-w-xs mx-auto">
                          <p className="font-semibold">{contractData.fullName}</p>
                          <p className="text-sm text-gray-600">pp. {contractData.businessName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                
                ) : showAcuerdoPSPContract ? (
                  // Contrato de Acuerdo de Cooperación Comercial para PSP o Mandato de Terceros
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>ACUERDO DE COOPERACION COMERCIAL PARA LA INTEGRACIÓN DE KHIPU (ADQUIRENTE) EN {contractData.businessName.toUpperCase()} (PSP)</p>
                    </div>

                    <p>
                      En la ciudad de Santiago, a {currentDay} días del mes de {currentMonth} de {currentYear}, comparecen:
                    </p>

                    <p>
                      POR UNA PARTE: KHIPU SPA, en adelante "KHIPU", sociedad por acciones, Rol Único Tributario N° 76.187.287-7, 
                      representada por don ROBERTO OPAZO GAZMURI, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 9.123.845-4 
                      y EMILIO SALVADOR DAVIS MÉNDEZ, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados 
                      en calle Las Urbinas Nº 53, Oficina nº 132, comuna de Providencia, Santiago, Chile,
                    </p>

                    <p>
                      y POR OTRA PARTE: <strong>{contractData.businessName}</strong>, Rol Único Tributario Nº <strong>{contractData.businessRut}</strong>, 
                      en adelante el Proveedor de Servicio de Pago (en adelante PSP), representada en este acto por don(a) <strong>{contractData.fullName}</strong>, 
                      chileno, Cédula Nacional de Identidad Nº <strong>{contractData.legalRepRut}</strong>, con domicilio en <strong>{contractData.street}</strong>, 
                      oficina <strong>{contractData.floor}</strong>, comuna de <strong>{contractData.commune}</strong>, Santiago, Chile.
                    </p>

                    <p>
                      Han convenido celebrar el presente acuerdo sujeto a los siguientes términos y condiciones:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">I ANTECEDENTES</h4>
                      <p className="mb-2">
                        I.1.- KHIPU ofrece una solución tecnológica para pagar y recaudar con transferencias electrónicas, así como para el desarrollo de aplicaciones móviles. 
                        Estas soluciones son comercializadas con las marcas Khipu y B2App.
                      </p>
                      <p>
                        I.2.- PSP posee una plataforma tecnológica con la cual entrega servicios de procesamiento de pagos y gestión de transacciones electrónicas.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">II DEFINICIONES</h4>
                      <p className="mb-2">
                        II.1.- Plataforma del PSP: Sistema tecnológico propiedad del PSP mediante el cual procesa transacciones y provee servicios de pago a sus clientes.
                      </p>
                      <p className="mb-2">
                        II.2.- Plataforma de Khipu: Es el conjunto de programas computacionales (en especial la Aplicación de Terminal de Pago Khipu para sus versiones 
                        web y app), licencias, portales web, procedimientos, equipamiento (computadores personales, servidores, servicios y aparatos de telecomunicaciones) 
                        y servicios de terceros que permiten perfeccionar pagos electrónicos, mediante transferencias electrónicas bancarias entre cuentas corrientes y/o 
                        cuentas vista que ejecutan en el sistema bancario nacional, conforme sus políticas, prácticas y mecanismos de seguridad, u otro sistema determinado 
                        por KHIPU.
                      </p>
                      <p className="mb-2">
                        II.3.- Integración: Conjunto de programas computacionales que permiten la comunicación automática de dos o más sistemas para la ejecución de un proceso.
                      </p>
                      <p className="mb-2">
                        II.4.- Cuenta de cobro: Se refiere a la o las Cuentas que se generan en la Cuenta del PSP. A esa Cuenta de Cobro, se asocia una cuenta bancaria, 
                        que es donde se realizan las rendiciones. La cuenta bancaria es de titularidad del PSP y KHIPU no asume responsabilidad alguna respecto de los pagos 
                        recibidos en dicha cuenta.
                      </p>
                      <p className="mb-2">
                        II.5.- Botón de pago: Es una herramienta provista por KHIPU, la cual puede ser insertada en múltiples plataformas (correos electrónicos, sitios webs, 
                        aplicaciones móviles) con el objetivo que los Usuarios finales pueda realizar el pago de sus compromisos.
                      </p>
                      <p className="mb-2">
                        II.6.- Modelo Operacional: Es el mecanismo mediante el cual el PSP recibirá los dineros provenientes de las operaciones realizadas a través de la 
                        Plataforma de KHIPU.
                      </p>
                      <p className="mb-2">
                        II.7.- Cliente: Corresponde al Comercio que recibe el servicio brindado por el PSP, el cual incorpora la integración con la plataforma de Khipu.
                      </p>
                      <p className="mb-2">
                        II.8.- Grandes Clientes: Son aquellos clientes atendidos por el PSP que superen los 200.000 pagos, o los 210.000 UF mensuales.
                      </p>
                      <p className="mb-2">
                        II.9.- Usuarios finales: Son las entidades naturales o jurídicas que harán pagos a través de la plataforma de los comercios que serán atendidos por 
                        el PSP. KHIPU no tendrá acceso a la información de dichos usuarios.
                      </p>
                      <p className="mb-2">
                        II.10.- Marca KHIPU: Se entiende por el logotipo de KHIPU con su tipografía y colores, los cuales deberán ser provistos por KHIPU mediante la entrega 
                        del Manual de Marca correspondiente.
                      </p>
                      <p>
                        II.11.- Tarifario con descuentos por volumen: Corresponde al costo cobrado por KHIPU al PSP por sus servicios de pagos con transferencia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">III OBJETO</h4>
                      <p className="mb-2">
                        III.1.- Las partes han decidido realizar un acuerdo comercial de manera de que KHIPU provea sus sistemas, servicios tecnológicos, unir sus recursos 
                        y capacidades para que el PSP pueda ofrecer a sus Clientes o Grandes Clientes en conjunto sus productos y servicios, en el territorio de Chile y en 
                        otros territorios en donde de manera previamente acordada, decidan participar. El PSP es el único responsable de garantizar y asegurar que sus Clientes 
                        o Grandes Clientes correspondan a empresas que cumplan la normativa para operar en Chile y que asimismo se dediquen, operen y exploten actividades lícitas.
                      </p>
                      <p className="mb-2">
                        III.2.- El PSP agregará los servicios de transferencias simplificada y normal provistos por Khipu en su plataforma, para ofrecerlos a todos sus clientes 
                        y grandes clientes nuevos y actuales.
                      </p>
                      <p>
                        III.3.- KHIPU pondrá a disposición del PSP interfaces de programación que permitirán al PSP crear botones de pago de la plataforma de Khipu, disponibles 
                        desde la plataforma del PSP. Los fondos de las operaciones de pago exitosas que Khipu recaude, serán enviados directamente al PSP a su cuenta bancaria.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">IV NATURALEZA DE LA RELACIÓN ENTRE LAS PARTES</h4>
                      <p>
                        Las partes acuerdan mantenerse como empresas independientes, responsables cada uno de sus propios actos. Ninguna de las partes es responsable por las 
                        deudas u obligaciones de la otra. Este acuerdo no significa vinculación de dependencia económica o subordinación jurídica alguna entre cada una de las 
                        partes y los empleados de la otra parte. Las partes declaran que cada una se obliga a responder, de manera independiente y separada, por sus propias 
                        acciones, obligaciones y/o actos.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">V COMISIÓN Y OTROS COBROS</h4>
                      <p>
                        V.1.- El PSP se obliga a pagar a Khipu por el uso de su Sistema y/o plataforma la comisión y las tarifas fijas establecidas en el Anexo de Condiciones 
                        Particulares o en sus modificaciones. El monto a pagar por cada Operación efectuada en el mes se calcula al término del mes y se liquida la totalidad 
                        de las operaciones cursadas, conforme a la tarifa indicada en el Anexo de condiciones particulares.
                      </p>
                      {tarifarioUrl && (
                        <p className="mt-2">
                          Tarifario aplicable: <a href={tarifarioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">{tarifarioUrl}</a>
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VI COBRO DE COMISIONES</h4>
                      <p className="mb-2">
                        VI.1.- Las comisiones y aquellas tarifas fijas devengadas en el mes inmediatamente anterior serán facturadas por Khipu, mensualmente, dentro de los 
                        primeros 5 días corridos del mes siguiente a su prestación. El PSP se compromete a realizar el pago de la comisión y de los otros cobros que procedan 
                        dentro de los treinta (30) días corridos siguientes a la recepción de la factura correspondiente.
                      </p>
                      <p className="mb-2">
                        VI.2.- Para los valores expresados en Unidades de Fomento, el valor en pesos chilenos de ésta será aquel determinado por el Banco Central correspondiente 
                        a la fecha del último día de prestación de los servicios.
                      </p>
                      <p className="mb-2">
                        VI.3.- En caso que el PSP pague la factura correspondiente y no vencida antes del día 20 del mes en curso, se aplicará al PSP un descuento de pronto pago 
                        de 8 UF aplicable en la factura del mes inmediatamente siguiente.
                      </p>
                      <p className="mb-2">
                        VI.4.- La mora o simple retardo en el pago a que estará obligado el PSP, facultará a Khipu para aplicar al monto que se adeude el interés corriente, por 
                        todo el periodo comprendido entre la fecha en que se hizo exigible la obligación y la de su pago efectivo.
                      </p>
                      <p className="mb-2">
                        VI.5.- En caso de mora o simple retardo en el pago de cualquier factura mensual en más de quince (15) días en dos (2) ocasiones durante cada semestre de 
                        la vigencia del presente contrato, se entenderá como un incumplimiento de una obligación material y dará derecho a Khipu a poner término anticipadamente 
                        al referido contrato.
                      </p>
                      <p>
                        VI.6.- Si la mora señalada se mantiene por más de 30 días, se faculta a Khipu para incorporar al PSP en el Boletín de Información Comercial y en DICOM.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VII MODELO OPERACIONAL</h4>
                      <p className="mb-2">
                        VII.1.- El PSP recibirá las transferencias directamente a su cuenta bancaria, es decir la recaudación será realizada en la cuenta del PSP. Para tales 
                        efectos deberá informar a KHIPU la cuenta bancaria de su titularidad mediante la cual se utilizarán los servicios objeto de este contrato.
                      </p>
                      <p className="mb-2">
                        VII.2.- El PSP podrá optar por alguna de las siguientes opciones de conciliación por parte de KHIPU:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Conciliación en el origen: En este caso, KHIPU concilia el cobro y el pago basado en la confirmación entregada por el banco desde donde el pagador realiza el pago.</li>
                        <li>Conciliación en destino: El PSP pondrá a disposición de KHIPU el acceso a la cartola de transferencia de una cuenta bancaria, de manera exclusiva para recibir pagos realizados con la plataforma de KHIPU.</li>
                      </ul>
                      <p className="mt-2">
                        VII.3.- Independiente del tipo de conciliación, el PSP será responsable de aclarar con el banco proveedor de la cuenta de destino cualquier problema 
                        relacionado con cobros de comisiones, reversas, intereses u omisiones de transferencias que el banco haya informado en sus sistemas.
                      </p>
                      <p>
                        VII.4.- El PSP deberá conocer la Política y Procedimiento de Conocimiento de Clientes (KYC) de KHIPU. En especial, el PSP deberá cumplir con las 
                        disposiciones sobre clientes de cuidado especial, incluyendo prohibiciones para Casas de Cambio, venta de monedas virtuales, tarjetas prepago y 
                        plataformas de inversión no reguladas por CMF.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIII USO DE MARCA KHIPU</h4>
                      <p>
                        VIII.1.- El PSP deberá usar la marca KHIPU previa autorización de Khipu. La tipografía, dimensiones y colores deberán ser las indicadas en el Manual 
                        de Marca que se entregará junto con la firma del presente acuerdo.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">IX RESOLUCIÓN DE DIFERENCIAS</h4>
                      <p className="mb-2">
                        IX.1.- Las partes aceptan someter la interpretación y el cumplimiento del presente acuerdo a las leyes de la República de Chile.
                      </p>
                      <p>
                        IX.2.- Las diferencias técnicas y meramente operativas en este acuerdo comercial serán zanjadas en primera instancia por un comité de acuerdos formado 
                        por 4 personas (2 de cada parte). Si el comité no logra acuerdo, las diferencias serán resueltas con la intervención de un árbitro arbitrador conforme 
                        al Reglamento del Centro de Arbitraje y Mediación de Santiago.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">X PROHIBICIONES</h4>
                      <p>
                        Las partes no podrán: a) Otorgar garantías en nombre de la otra parte; b) incurrir en gastos por cuenta de la otra parte o crearle deudas; c) Firmar 
                        acuerdos o contratos con terceros creando obligaciones para la otra parte; d) Disponer, vender, alquilar, o dar en garantía bienes de la otra parte; 
                        e) otorgar licencias de los productos de la otra parte que no se encuentren autorizadas; f) realizar comunicaciones que pudieren perjudicar la imagen 
                        de la otra parte.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XI CONFIDENCIALIDAD</h4>
                      <p className="mb-2">
                        XI.1.- Las partes mantendrán en estricta confidencialidad todo documento, material o información suministrada por cualquiera de las partes a la otra, 
                        incluyendo información técnica, datos, procesos, programas informáticos, sistemas, costos, equipos, operaciones, datos de clientes y/o proveedores, 
                        métodos y/o políticas comerciales.
                      </p>
                      <p className="mb-2">
                        XI.2.- Las partes deberán mantener la confidencialidad de la Información y no podrán divulgarla a persona alguna sin previa autorización por escrito de 
                        la otra parte.
                      </p>
                      <p className="mb-2">
                        XI.3.- Se exceptúa de esta reserva la información requerida por la Fiscalía Nacional Económica, Comisión para el Mercado Financiero, Tribunal de Defensa 
                        de la Libre Competencia, Unidad de Análisis Financieros, Policía de Investigaciones o cualquier otra autoridad competente.
                      </p>
                      <p className="mb-2">
                        XI.4.- Las partes se obligan a no promocionar por correo electrónico o de cualquier otra forma sus servicios, de manera directa o indirecta, a empresas 
                        o clientes de la otra parte.
                      </p>
                      <p>
                        XI.5.- Las obligaciones asumidas bajo esta cláusula subsistirán por un plazo de 2 años contados a partir de la finalización del acuerdo.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XII PLAZO Y VIGENCIA</h4>
                      <p className="mb-2">
                        XII.1.- El presente acuerdo tendrá una duración indefinida y cualquiera de las partes podrá poner término al mismo mediante notificación por correo electrónico.
                      </p>
                      <p className="mb-2">
                        XII.2.- La notificación de término de contrato deberá incluir la fecha a partir de la cual el contrato perderá vigencia. Dicha fecha no podrá ser inferior 
                        al día en que se cumplan 3 meses desde que la notificación haya sido recibida por la otra parte.
                      </p>
                      <p>
                        XII.3.- En caso de que cualquiera de las partes ponga término a este acuerdo, las obligaciones de pago se mantendrán vigentes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XIII PROPIEDAD INTELECTUAL</h4>
                      <p>
                        Los sistemas de Khipu, sus diferentes funcionalidades, aplicaciones y todas las variables de aquéllas son de propiedad única y exclusiva de KHIPU. Se 
                        otorga una licencia al PSP, limitada únicamente a su uso. Todos los contenidos incluidos en los sistemas de Khipu, tales como textos, material gráfico, 
                        logotipos, códigos fuente, imágenes, son de propiedad exclusiva de Khipu y están protegidos por las leyes sobre propiedad intelectual.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XIV RESPONSABILIDAD, SEGURIDAD Y DATOS</h4>
                      <p className="mb-2">
                        1. El PSP es el único responsable del contenido de sus transmisiones y publicaciones. KHIPU no se hace responsable de los productos o servicios que se 
                        transen ni del cumplimiento de la normativa legal vigente.
                      </p>
                      <p className="mb-2">
                        2. El PSP garantiza que la información que suministra para la operación de los sistemas es veraz, completa, exacta y actualizada.
                      </p>
                      <p>
                        3. PSP dará cumplimiento a lo establecido en la Ley 19.628 sobre tratamiento de datos personales o la normativa que lo reemplace.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XV LIMITACIÓN DE RESPONSABILIDAD</h4>
                      <p>
                        La responsabilidad de Khipu en relación con las obligaciones asumidas en virtud de este acuerdo estará limitada. En ningún caso podrá el PSP reclamar de 
                        Khipu indemnización alguna por daños o perjuicios que no sean imputables directamente a KHIPU, tales como fallas en interconexión, equipos del PSP, ataques 
                        de hackeo, fallas en telecomunicaciones, fallas de terceros servidores, caso fortuito o fuerza mayor.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XVI GARANTÍA SOBRE LOS SISTEMAS</h4>
                      <p>
                        El PSP acepta que los sistemas se suministran "tal y como se presenta". Una vez terminado el servicio, KHIPU podrá eliminar toda la información del PSP 
                        de la base de datos.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XVII CUMPLIMIENTO LEY 20.393 Y 21.595</h4>
                      <p>
                        Las partes declaran que han implementado un Modelo de Prevención de Delitos conforme a la Ley 20.393 y 21.595 sobre Responsabilidad Penal de las Personas 
                        Jurídicas. Las partes se obligan a hacer cumplir toda la normativa relacionada con lavado de activos, financiamiento del terrorismo, cohecho y receptación. 
                        El incumplimiento será causal de terminación anticipada.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XVIII TRATAMIENTO DE DATOS PERSONALES</h4>
                      <p className="mb-2">
                        Las Partes reconocen que el único responsable del tratamiento y de la licitud del procesamiento de datos personales es exclusivamente EL PSP y sus Clientes, 
                        conforme a la Ley N°19.628 y sus modificaciones. Khipu sólo entrega un servicio tecnológico al PSP.
                      </p>
                      <p>
                        Será de exclusivo cargo y costo del PSP el pago de todo perjuicio directo que sea provocado a Khipu por filtraciones de datos personales, obligándose a 
                        mantener indemne a Khipu al respecto.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XIX DISPOSICIONES FINALES</h4>
                      <p className="mb-2">
                        1. Cesión de Derechos: Ninguna de las Partes podrá ceder los derechos derivados del presente Contrato sin el consentimiento previo y por escrito de la otra Parte.
                      </p>
                      <p className="mb-2">
                        2. Acuerdo Total: El presente Contrato constituye la totalidad de lo convenido entre las Partes y reemplaza a cualquier otro acuerdo previo.
                      </p>
                      <p className="mb-2">
                        3. Plazos: Los plazos estipulados en este Contrato serán de días hábiles bancarios.
                      </p>
                      <p className="mb-2">
                        4. Gastos: Los costos y gastos en que deba incurrir el PSP para que pueda operar en los sistemas de Khipu serán de su exclusiva responsabilidad.
                      </p>
                      <p className="mb-2">
                        5. Domicilio y Jurisdicción: Las Partes fijan domicilio en la comuna y ciudad de Santiago de Chile.
                      </p>
                      <p>
                        6. Término del contrato: El incumplimiento del PSP faculta a KHIPU para poner término en forma inmediata. Igual facultad regirá para el caso de insolvencia o quiebra.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">XX NOTIFICACIONES</h4>
                      <p className="mb-2">
                        XX.1.- Las notificaciones o comunicaciones que deban ser realizadas entre las partes se harán por correo electrónico dirigido a los administradores de 
                        contrato de la otra parte.
                      </p>
                      <p className="mb-2">
                        XX.2.- Las partes nombran a los siguientes administradores de contrato:
                      </p>
                      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                        <div>
                          <p className="font-semibold">Por KHIPU:</p>
                          <p>Constanza Vergara</p>
                          <p className="text-sm text-gray-600">constanza.vergara@khipu.com</p>
                          <p className="mt-2">Soporte Khipu</p>
                          <p className="text-sm text-gray-600">soporte@khipu.com</p>
                        </div>
                        <div>
                          <p className="font-semibold">Por PSP:</p>
                          <p>{contractData.fullName}</p>
                          <p className="text-sm text-gray-600">{contractData.email || 'Por confirmar'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-8 text-center font-semibold">DE CONFORMIDAD, las partes suscriben dos ejemplares de idéntico tenor.</p>
                      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <div>
                          <div className="border-t border-gray-400 pt-2 text-center">
                            <p className="font-semibold">Roberto Opazo Gazmuri</p>
                            <p className="text-sm text-gray-600">pp. Khipu SpA</p>
                          </div>
                          <div className="border-t border-gray-400 pt-2 text-center mt-8">
                            <p className="font-semibold">Emilio Davis Mendez</p>
                            <p className="text-sm text-gray-600">pp. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <div className="border-t border-gray-400 pt-2 text-center">
                            <p className="font-semibold">{contractData.fullName}</p>
                            <p className="text-sm text-gray-600">pp. {contractData.businessName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                ) : showPrestacionServiciosCuentaPropiaContract ? (
                  // Contrato de Prestación de Servicios + Mandato para Persona Jurídica con Cuenta Propia
                  <>
                  {/* Contrato de Prestación de Servicios para Persona Jurídica con Cuenta Propia */}
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>CONTRATO</p>
                      <p>DE PRESTACIÓN DE SERVICIOS</p>
                      <p className="mt-2">{contractData.businessName}</p>
                      <p>Y</p>
                      <p>KHIPU SPA</p>
                    </div>

                    <p>
                      En el Santiago de Chile lugar, a {currentDay} de {currentMonth} de {currentYear}, entre:
                    </p>

                    <p>
                      Por una parte: KHIPU SpA, en adelante "Khipu", sociedad por acciones, Rol Único Tributario N° 76.187.287-7, 
                      representada por don Roberto Opazo Gazmuri, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 9.123.845-4 
                      y don Emilio Davis Méndez, chileno, Ingeniero Civil, Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados 
                      en calle Las Urbinas N° 53, piso 13, comuna de Providencia, Chile,
                    </p>

                    <p>
                      Por otra parte: <strong>{contractData.businessName}</strong>, Rol Único Tributario N° <strong>{contractData.businessRut}</strong>, sociedad representada por{' '}
                      don(a) <strong>{contractData.fullName}</strong>, chileno, Cédula Nacional de Identidad N° <strong>{contractData.legalRepRut}</strong>, domiciliado{' '}
                      en <strong>{contractData.street}</strong>, piso <strong>{contractData.floor}</strong>, comuna de <strong>{contractData.commune}</strong>, <strong>{contractData.region}</strong>, en adelante "el Cobrador",{' '}
                      referidos conjuntamente como las "Partes", se ha convenido el siguiente Contrato de prestación de servicios:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: Definiciones.</h4>
                      <p className="mb-2">Para los efectos del presente Contrato se definen los siguientes conceptos:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>"Khipu", es KHIPU SPA, empresa que celebra este Contrato como prestador de servicios, quien se compromete a implementar y mantener el Sistema Khipu para posibilitar el Pago entre el Cobrador y el Pagador por medio de dicho Sistema.</li>
                        <li>"Cobrador", o el "Cliente", es <strong>{contractData.businessName}</strong> para quien Khipu se compromete a prestar los servicios a que refiere el presente Contrato.</li>
                        <li>"Pagador", es la persona natural o jurídica que ha acordado un Pago con el Cobrador.</li>
                        <li>"Sistema Khipu", es el conjunto de programas computacionales (en especial la Aplicación Terminal de Pago Khipu), licencias, portales web, procedimientos, equipamiento (computadores personales, servidores y aparatos de telecomunicaciones) y servicios de terceros que permiten perfeccionar pagos electrónicos, mediante transferencias electrónicas bancarias entre cuentas corrientes y/o cuentas vistas abiertas en el sistema bancario nacional, conforme a sus políticas, prácticas y mecanismos de seguridad, u otro sistema determinado por Khipu. El Sistema podrá incluir herramientas electrónicas que faciliten la comunicación entre El Cobrador y El Pagador, sin que por ello Khipu se transforme en parte de las convenciones que pacten, ni actúen como intermediario.</li>
                        <li>"Aplicación Terminal de Pago Khipu", es un navegador web o browser, que permite navegar por páginas programadas en lenguaje HTML, preparado para automatizar la generación de transferencias de dinero entre cuentas bancarias de El Pagador y El Cliente, mostrando las páginas web con una representación visual distinta a la que mostraría un navegador web de propósito general, pero sin alterar los mecanismos de seguridad de las mismas.</li>
                        <li>"Pago", es la suma de dinero determinada en cada operación efectuada mediante el Sistema Khipu, entre El Cobrador y El Pagador, mediante una transferencia bancaria electrónica entre la cuenta corriente o cuenta vista del El Pagador a la cuenta de El Cobrador.</li>
                        <li>"Operación", es el funcionamiento del Sistema Khipu, respecto de cada Pago realizado por El Pagador al Cobrador, identificado mediante un código único, fecha y monto, y que se perfecciona en el instante en que los fondos son recibidos en la Cuenta de El Cobrador.</li>
                        <li>"Código Único de Operación", es el código exclusivo que identifica cada Operación.</li>
                        <li>"Comisión", es una suma de dinero pagada a Khipu, acordada para cada operación según los términos incluidos en el Anexo de Condiciones Particulares de este Contrato, correspondiente al precio del servicio prestado por Khipu.</li>
                        <li>"Hora de Cierre Diario", es la hora establecida en el Sistema Khipu para el cierre de la rendición de pagos efectuados en cada día.</li>
                        <li>"Condiciones de Uso", es el conjunto de políticas y prácticas de operación del Sistema Khipu, estipuladas en el documento homónimo que se encuentra disponible en el sitio web https://www.khipu.com, pudiendo ser descargado desde aquel y que forma parte de este Contrato.</li>
                        <li>"Convenio Pagador – Cobrador" o "Convención Pagador – Cobrador", acuerdo de voluntad, escrito o no, entre El Pagador y El Cobrador, del cual deriva la obligación del primero de pagar al segundo una determinada suma de dinero, la que es satisfecha por medio de la operación del mandato ejecutado por medio de Khipu. Khipu no es parte de dicho acuerdo de voluntades.</li>
                        <li>"Usuario", es la persona natural o jurídica que realiza una operación en el Sistema Khipu y que se encuentra registrada en éste mediante la individualización de una o más casillas electrónicas.</li>
                        <li>"Cuentas de Cobro" Son las cuentas corrientes bancarias que El Cobrador tendrá en Banco Itaú. Se recomienda que El Cobrador tenga como mínimo 3 cuentas reservadas en forma exclusiva para la operación con Khipu. Estas cuentas tendrán como único propósito recibir Pagos a través del Sistema Khipu. El Cobrador facultará a Khipu para solicitar confirmación de recepción de fondos y revisar saldos y cartolas en línea.</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: Objeto del Contrato</h4>
                      <p className="mb-2">
                        El objeto del presente Contrato es prestar servicios informáticos, contenidos en el Sistema Khipu, de apoyo al proceso de recaudación de dinero pagado por Pagadores al Cobrador, en cuentas bancarias de este último.
                      </p>
                      <p>
                        Khipu no participa ni interviene en el acuerdo de voluntades entre Pagador y Cobrador, ni en su causa, objeto y/o condiciones. Es el Cobrador el responsable y quien registra la operación de cobro en el Sistema Khipu, Pagador y Cobrador son los únicos responsables de verificar la veracidad de los elementos que configuran cada operación y de cumplir las obligaciones recíprocamente contraídas.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: Rendición de Pagos</h4>
                      <p className="mb-2">
                        Los pagos efectivamente realizados por el Pagador se materializarán a través de transferencias de fondos hechas desde la cuenta corriente del Pagador a una cuenta corriente del Cobrador (Cuenta Cobrador), a menos que por contingencia Khipu haya redireccionado los pagos a una cuenta del Cobrador en un banco configurado para ello. Las cuentas de recaudación configuradas en el Sistema Khipu deberán ser destinadas por el Cobrador exclusivamente para gestionar la recaudación por ventas gestionadas a través del Sistema Khipu, siendo de su entera responsabilidad los inconvenientes ocasionados a la operación, la utilización de la Cuenta Cobrador para fines distintos de los estipulados en este Contrato. Asimismo, el Cobrador será responsable de aclarar con el banco proveedor de la cuenta, cualquier problema relacionado con cobros de comisiones, intereses u omisiones de transferencias que el banco haya informado en sus sistemas.
                      </p>
                      <p>
                        Khipu diariamente practicará rendiciones de las Operaciones concretadas efectivamente, esto es, montos percibidos por el Cobrador conforme la Hora de Cierre Diario del día anterior, mediante la remisión del detalle de las mismas vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema Khipu y que además quedarán disponibles para el Cobrador en el Sistema Khipu. En caso de no existir casilla electrónica configurada en el Sistema Khipu, la rendición será informada únicamente mediante su publicación en el Sistema.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: Comprobante de Pago.</h4>
                      <p className="mb-2">
                        Khipu se obliga a emitir un comprobante de pago firmado electrónicamente por un representante legal, por cada una de las operaciones efectuadas a través del Sistema Khipu, inmediatamente a continuación de percibidos los fondos en la Cuenta del Cobrador, en el cual se individualice el Código Único de Operación, monto, fecha de la misma, Pagador, Cobrador y demás antecedentes señalados en las Condiciones de Uso.
                      </p>
                      <p>
                        El Comprobante de Pago será remitido vía correo electrónico a la casilla electrónica configurada por el Cobrador en el Sistema Khipu y además quedará disponible en el Sistema Khipu. En caso de existir imposibilidad de remitir y/o recibir el comprobante, la rendición será informada únicamente mediante su publicación en el Sistema Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: Comisión y otros costos</h4>
                      <p>
                        El Cobrador se obliga a pagar a Khipu por el uso de su Sistema la comisión y las tarifas fijas establecidas en el Anexo de Condiciones Particulares o en sus modificaciones. El monto a pagar por cada Operación efectuada en el mes se calcula al término del mes y se liquida la totalidad de las operaciones cursadas, conforme a la tarifa indicada en el Anexo de condiciones particulares.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: Cobro de comisiones.</h4>
                      <p className="mb-2">
                        Las comisiones y aquellas tarifas fijas devengadas en el mes inmediatamente anterior serán facturadas por Khipu, mensualmente, dentro de los primeros 5 días corridos del mes siguiente a su prestación. El Cobrador se compromete a realizar el pago de la comisión y de los otros cobros que procedan dentro de los treinta (30) días corridos siguientes a la recepción de la factura correspondiente. La referida factura sólo podrá ser objetada por causales legales, dentro del octavo día contado desde su recepción.
                      </p>
                      <p className="mb-2">
                        Para los valores expresados en Unidades de Fomento, el valor en pesos chilenos de ésta será aquel determinado por el Banco Central correspondiente a la fecha del último día de prestación de los servicios. Si por cualquier motivo o causa se suprimiere o congelare la reajustabilidad de la Unidad de Fomento, el saldo se convertirá en el equivalente en pesos a la fecha que ocurra tal evento, y se reajustará de acuerdo a la variación que experimente el Índice de Precios al Consumidor.
                      </p>
                      <p className="mb-2">
                        En caso que el Cliente pague la factura correspondiente y no vencida antes del día 20 del mes en curso, se aplicará al Cliente un descuento de pronto pago. El descuento de pronto pago consiste en un descuento de 8 UF aplicable en la factura del mes inmediatamente siguiente, que sólo aplicará si la factura anterior ha sido pagada en forma previa al día 20 de cada mes calendario. Si Khipu se atrasara en la emisión de la factura, el plazo de pago para recibir el beneficio de pronto pago se extenderá por 15 días corridos desde la fecha de emisión de la factura.
                      </p>
                      <p className="mb-2">
                        La mora o simple retardo en el pago a que estará obligado el Cliente, facultará a Khipu para aplicar al monto que se adeude el interés corriente, por todo el periodo comprendido entre la fecha en que se hizo exigible la obligación y la de su pago efectivo.
                      </p>
                      <p className="mb-2">
                        En caso de mora o simple retardo en el pago de cualquier factura mensual en más de quince (15) días en dos (2) ocasiones durante cada semestre de la vigencia del presente contrato, se entenderá como un incumplimiento de una obligación material y dará derecho a Khipu a poner término anticipadamente al referido contrato, sin perjuicio de la obligación del Cliente de pagar las facturas ya vencidas, más intereses y reajustes correspondientes al periodo de la mora.
                      </p>
                      <p>
                        Los pagos recibidos se imputarán a la deuda más antigua que el Cliente mantenga con Khipu, por cualquier causa o concepto.
                      </p>
                      {tarifarioUrl && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900 mb-2 font-semibold">
                            📄 Plan seleccionado: {selectedPlan === 'plan-porcentual' ? 'Plan Porcentual' : 'Plan con Tarifa Fija'}
                          </p>
                          <a
                            href={tarifarioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                          >
                            <FileText className="w-4 h-4" />
                            Ver tarifario aplicable (PDF)
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEPTIMO: Suministro de servicio y/o bienes.</h4>
                      <p className="mb-2">
                        El Cobrador reconoce que Khipu no tiene obligación alguna respecto del cumplimiento en tiempo, forma, cantidad, calidad o precio en la entrega de cualquier bien, servicio u otro tipo de contraprestación que pudiere dar origen o causar el pago mandatado, en términos mediatos o inmediatos.
                      </p>
                      <p className="mb-2">
                        Asimismo, la eventual obligación de emitir boleta o factura derivada de la adquisición de un bien y/o prestación de algún servicio contratado recae única y exclusivamente en el Cobrador.
                      </p>
                      <p className="mb-2">
                        El Cobrador se obliga a mantener indemne, indemnizar y liberar de toda responsabilidad a Khipu por todo y cualquier perjuicio (incluidos multas, sanciones y honorarios de abogados) que pueda sufrir o incurrir en razón de cualquier reclamo, acción judicial, acción administrativa, o de cualquier otro tipo que derive de cualquier acto u omisión imputable al Cobrador.
                      </p>
                      <p>
                        El Cobrador acepta y mandata a Khipu, aparte de las facultades que otorga la ley a ésta, para descontar de lo que le corresponda pagar con ocasión de este Contrato los montos correspondientes a multas, sanciones, impuestos, gravámenes, daños, perjuicios y/o gastos, o estimaciones de resultado, sin límite alguno, para hacer efectivo lo pactado en el inciso anterior.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: Requerimiento de operación lícita y real.</h4>
                      <p>
                        El Cobrador reconoce, acepta y se obliga a utilizar el Sistema Khipu sólo para recibir pagos de origen y con finalidad lícita, pudiendo ser estos derivados de la adquisición de bienes, prestación de servicios, actividades o prestaciones en general, convenidas entre él y el Pagador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">NOVENO: Reclamo por diferencias en operaciones.</h4>
                      <p className="mb-2">
                        En el evento que en las rendiciones indicadas se omitiesen operaciones realizadas en el periodo respectivo; contengan retenciones, descuentos u otros cargos indebidos o improcedentes; o bien existiesen errores o diferencias con sus propios registros, el Cobrador tendrá un plazo máximo de 5 días corridos, contados desde la emisión de la rendición respectiva, para efectuar el correspondiente reclamo, transcurrido dicho plazo sin existir reclamo, se entenderá aprobada la rendición por el Cobrador sin más trámite.
                      </p>
                      <p className="mb-2">
                        Para la presentación de reclamos, éstos deben ser interpuestos en forma pormenorizada, indicando precisamente la operación omitida o respecto de la cual existen errores o diferencias, mediante el Código Único de Operación, e indicando los motivos y antecedentes en que se funda el reclamo.
                      </p>
                      <p>
                        Para efectos de la presentación de reclamos, Khipu se obliga a disponer en el Sistema Khipu una opción para el ingreso y seguimientos de reclamos, en la cual identificará cada reclamo mediante un número único. El reclamo será resuelto por Khipu, conforme a sus respaldos y registros bancarios de la Cuenta Cobrador, dentro de los 30 días siguientes de recibido el reclamo.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO: Reclamo por diferencias en operaciones.</h4>
                      <p>
                        En el evento que en las rendiciones indicadas se omitiesen operaciones realizadas en el periodo respectivo; contengan retenciones, descuentos u otros cargos indebidos o improcedentes; o bien existiesen errores o diferencias con sus propios registros, el Cobrador tendrá un plazo máximo de 5 días corridos, contados desde la emisión de la rendición respectiva, para efectuar el correspondiente reclamo, transcurrido dicho plazo sin existir reclamo, se entenderá aprobada la rendición por el Cobrador sin más trámite.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO PRIMERO: Reembolso.</h4>
                      <p>
                        Si Khipu realizara una rendición de pagos, donde el monto transferido fuera mayor al total recaudado, menos la comisión, se gestionará como si dicho dinero transferido en exceso hubiese sido entregado por adelantado. En la siguiente rendición se descontará el adelanto transfiriendo al Cobrador el saldo entre el monto a rendir y el adelanto.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DECIMO SEGUNDO: Imposibilidad de cumplimiento.</h4>
                      <p>
                        El Cobrador declara conocer que, en razón de ser éste un mandato para percibir el pago, la imposibilidad de Khipu de percibir el pago o de enterar al Cobrador algún pago percibido será responsabilidad única y de cargo del Cobrador la de entregar al Pagador el o los bienes o de prestar el o los servicios contratados al Pagador, del cual pudiera emanar el pago mandatado a ejecutar.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO TERCERO: Controversia Cobrador – Pagador.</h4>
                      <p>
                        Cualquier controversia o dificultad entre el Cobrador y el Pagador, especialmente las relativas a la calidad, cantidad o cualquier característica de una venta o servicio prestado, deberá ser resuelta directamente entre esas partes, sin intervención ni responsabilidad alguna de Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO CUARTO: Cambio de antecedentes del Cobrador.</h4>
                      <p>
                        El Cobrador deberá modificar en forma inmediata, en el sistema Khipu, cualquier cambio relativo a los antecedentes registrados en él y que sean necesarios para la correcta ejecución del mandato. El Cobrador es responsable exclusivo de informar oportunamente a Khipu de cualquier cambio en la forma de pago, especialmente tratándose de la cuenta bancaria en la que Khipu debe depositar los montos recaudados.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO QUINTO: Condiciones de Uso.</h4>
                      <p>
                        El Cobrador declara conocer y acepta las Condiciones de Uso del Sistema Khipu, las cuales se encuentran disponibles en el portal web de Khipu. Khipu podrá emitir unilateralmente manuales, instrucciones o normas operacionales destinadas a complementar el sistema, debiendo el Cobrador atenerse a tales normas. Las normas que disponga Khipu serán comunicadas y difundidas por medios electrónicos, con a lo menos 10 días previos a su entrada en vigencia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SEXTO: Modificaciones.</h4>
                      <p>
                        Las modificaciones de las condiciones del presente contrato y sus Condiciones de Uso podrán acordarse por medio de sistemas electrónicos y con a lo menos 30 días corridos de anticipación a la fecha en que las modificaciones del caso comenzarán a regir.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SÉPTIMO: Prohibiciones.</h4>
                      <p>
                        El Cobrador no podrá ceder total o parcialmente el presente contrato y/o cualquiera de los derechos que de él puedan emanar. Sin perjuicio de lo anterior, Khipu queda facultado para ceder los derechos y obligaciones que emanan de este contrato, previa notificación al cobrador con a lo menos 10 días de anticipación. Queda prohibido al Pagador y Cobrador incorporar al Sistema Khipu cualquier tipo de información o antecedentes falsos o que atente contra las leyes nacionales o internacionales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO OCTAVO: Término del contrato por incumplimiento o insolvencia.</h4>
                      <p>
                        El incumplimiento del Cobrador de cualquiera de las obligaciones que emanan del presente instrumento o sus modificaciones, faculta a Khipu para poner término a éste en forma inmediata y sin previo aviso. Igual facultad regirá para el caso de que alguna de las partes cayere en insolvencia o fuere declarada su quiebra.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO NOVENO: Propiedad de los fondos.</h4>
                      <p>
                        Las partes declaran conocer que las sumas de dinero que Khipu percibe del Pagador y transfiere electrónicamente al Cobrador en razón de las operaciones descritas en este contrato no son de propiedad de Khipu, siendo éste un mero poseedor de ellas, sin perjuicio de lo concerniente a las comisiones que por el uso del Sistema cobra. Khipu dispondrá de cuentas bancarias separadas para la administración de los fondos de su propiedad y la de los fondos que le son entregados en mandato de pago.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO: Vigencia.</h4>
                      <p>
                        El presente contrato tendrá una duración de un año contado desde la fecha de suscripción, sin perjuicio que, del derecho de cualquiera de las partes para ponerle término en cualquier tiempo mediante comunicación electrónica remitida a lo menos con 30 días corridos de anticipación. Con todo, el contrato se renovará tácita y automáticamente por períodos iguales y sucesivos de 1 año cada uno, si ninguna de las partes haya comunicado por escrito su intención de darle término con 30 días de anticipación a la expiración de su plazo de vigencia original o prorrogado.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO PRIMERO: Versiones anteriores sin efecto.</h4>
                      <p>
                        El presente contrato reemplaza cualquier otro acuerdo o convención celebrado con anterioridad entre las partes sobre las materias que aquí se tratan.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEGUNDO: Propiedad industrial.</h4>
                      <p>
                        Las partes dejan establecido que podrán utilizar sus respectivas razones sociales, marcas comerciales, nombres distintivos, imágenes o logotipos en campañas publicitarias o presentaciones de carácter comercial.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO TERCERO: Firma electrónica y ejemplar del Contrato.</h4>
                      <p>
                        El presente Contrato será firmado electrónicamente por ambas partes y quedará registrado en un ejemplar disponible en el Sistema Khipu, el que podrá ser descargado por El Cobrador en cualquier momento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO CUARTO: Cumplimiento Ley N° 20.393 y Ley N° 21.595</h4>
                      <p>
                        Las Partes se obligan a cumplir de buena fe con todas las leyes y regulaciones aplicables a los Servicios a prestar. En especial, las partes declaran conocer que la otra parte ha implementado un Modelo de Prevención de Delitos y se obligan a no realizar ninguna actividad que pueda ser considerada constitutiva de delito en el contexto de las disposiciones de la Ley N°20.393 y la Ley N° 21.595.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO QUINTO: Tratamiento de Datos Personales.</h4>
                      <p>
                        Las Partes reconocen que, en virtud de la prestación de los Servicios objeto del Contrato, Khipu accederá, sólo para los efectos de recolección y captura de datos, a datos de carácter personal estrictamente necesarios para el proceso de pago, conforme las disposiciones de la Ley N°19.628 sobre Protección de la Vida Privada y sus modificaciones posteriores, particularmente la Ley N°21.719. El responsable del tratamiento es el Cobrador.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SEXTO: No renuncia.</h4>
                      <p>
                        Si Khipu dejara de exigir el cumplimiento de alguna de las disposiciones establecidas en el presente contrato, ello no será de ninguna manera interpretado como una renuncia a la estipulación del caso, ni en ninguna manera afectará la validez de la misma o cualquiera de sus partes.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO SÉPTIMO: Prórroga de competencia</h4>
                      <p>
                        Las partes se someterán en relación a este Contrato a las Leyes de la República de Chile. Además, prorrogan competencia en los tribunales ordinarios de la comuna y ciudad de Santiago y se someten a la jurisdicción de sus tribunales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PERSONERÍAS.</h4>
                      <p className="mb-2">
                        La personería de don Emilio Davis Méndez y la de don Roberto Opazo Gazmuri para representar a Khipu SpA constan en escritura pública de 12 de noviembre de 2012 autorizada por el Notario Público de Santiago señor Pablo Gonzalez Caamaño.
                      </p>
                      <p>
                        La personería de don(a) <strong>{contractData.fullName}</strong> para representar a <strong>{contractData.businessName}</strong> consta por escritura pública extendida en la Notaría de Santiago.
                      </p>
                      <p className="mt-2">
                        La persona natural que acepta y suscribe el presente contrato declara ser absolutamente capaz para contratar, y en caso de estar actuando en representación de otra persona, sea esta natural o jurídica, declara poseer facultades suficientes para representarla, pudiendo contratar en su nombre y obligarla.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-4 font-semibold">Las Partes firman en señal de aceptación.</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">Roberto Opazo Gazmuri</p>
                          <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          <div className="mt-4">
                            <p className="border-t border-gray-500 pt-2 text-center">Emilio Davis Méndez</p>
                            <p className="text-center text-gray-600">pp. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">{contractData.fullName}</p>
                          <p className="text-center text-gray-600">pp. {contractData.businessName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>

                ) : showWaaSContract ? (
                  // Contrato de Prestación de Servicios WaaS
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4">
                      <p>CONTRATO DE PRESTACIÓN DE SERVICIOS WaaS</p>
                      <p className="mt-2">{contractData.businessName || contractData.fullName}</p>
                      <p>Y</p>
                      <p>KHIPU SpA</p>
                    </div>

                    <p>
                      En Santiago de Chile, a {currentDay} de {currentMonth} de {currentYear}, entre KHIPU SpA, sociedad por acciones,
                      Rol Único Tributario N° 76.187.287-7, representada por don Roberto Opazo Gazmuri chileno, Ingeniero Civil,
                      Cédula Nacional de Identidad N°9.123.845-4, y don Emilio Davis Mendez, chileno, Ingeniero Civil, Cédula Nacional
                      de Identidad N° 10.340.294-8, todos domiciliados en calle Las Urbinas Nº 53, Oficina Nº 132, comuna de Providencia,
                      Chile, en adelante "Khipu", el "Proveedor" o el "Prestador", indistintamente, por una parte, y por la otra,{' '}
                      <strong>{contractData.businessName || contractData.fullName || '_______________'}</strong>, {personType === 'juridica' ? `sociedad del giro de su denominación, Rol Único Tributario Nº ${contractData.businessRut || '_______________'}, representada por don(a) ${contractData.fullName || '_______________'}, cédula de identidad N° ${contractData.legalRepRut || '_______________'},` : `Rol Único Tributario Nº ${contractData.rut || '_______________'},'`}{' '}
                      domiciliado en <strong>{contractData.street || '_______________'}</strong>, <strong>{contractData.commune || '_______________'}</strong>,
                      Región <strong>{contractData.region || '_______________'}</strong>, en adelante "<strong>{contractData.businessName || contractData.fullName || '_______________'}</strong>" o el "Cliente",
                      indistintamente, se ha convenido el siguiente contrato de prestación de servicios WaaS In:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: ANTECEDENTES:</h4>
                      <p className="mb-2">
                        <strong>{contractData.businessName || contractData.fullName || '_______________'}</strong>, es una empresa del rubro <strong>{formData?.industry || '____________'}</strong>.
                      </p>
                      <p>KHIPU es una empresa tecnológica del rubro financiero y proveedora de servicios tecnológicos.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: OBJETO:</h4>
                      <p className="mb-2">
                        Por medio del presente contrato, las Partes acuerdan que Khipu suministrará al Cliente, los servicios tecnológicos
                        que se describen en este Contrato, los que son debidamente aceptados por el representante compareciente respecto de
                        todos sus términos y condiciones.
                      </p>
                      <p className="mb-2">
                        El servicio que Khipu prestará al Cliente, es el servicio de customización, acceso a ciertos contenidos,
                        antecedentes y/o datos en general requeridos de manera expresa por el Cliente y que son indicados en el Anexo Nº1
                        del presente contrato, "Detalles del servicio". El Cliente declara expresamente que los contenidos, datos e
                        información respecto de los cuales se solicita el servicio son de su propiedad y que se encuentra facultado para
                        disponer de ellos y/o en caso de corresponder a datos o información de terceros cuenta con las autorizaciones
                        suficientes para su obtención y tratamiento.
                      </p>
                      <p className="mb-2">
                        Las partes dejan constancia que los datos se extraerán a través de la tecnología webcraping, y en caso de
                        tratarse de datos personales, el Cliente se obliga a tomar las medidas tecnológicas y organizativas para el
                        cumplimiento de la normativa de protección de datos.
                      </p>
                      <p>
                        Khipu sólo entrega los medios tecnológicos para el proceso de extracción, recopilación y recolección de
                        contenidos, información y/o datos y no guarda, no retiene, no almacena ni archiva datos, información y/o
                        contenidos, terminando la intervención de Khipu con la entrega y puesta a disposición del Cliente de la
                        información, datos o contenido extraído. El Cliente entiende y acepta que los servicios prestados al amparo
                        del presente contrato, sólo pueden ser utilizados para fines lícitos y en cumplimiento de la normativa vigente.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: PRECIO:</h4>
                      <p className="mb-2">
                        El Cliente se obliga a pagar a Khipu por el uso de su Sistema la comisión y las tarifas fijas establecidas en
                        el Anexo adjunto o en sus modificaciones.
                      </p>
                      <p>
                        El monto a pagar por cada Consulta efectuada en el mes se calcula al término del mes y se liquida la
                        totalidad de las consultas cursadas, conforme a la tarifa indicada en el Anexo adjunto o en sus posteriores modificaciones.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: FORMA DE PAGO</h4>
                      <p className="mb-2">
                        Las comisiones y aquellas tarifas fijas devengadas en el mes inmediatamente anterior serán facturadas por Khipu,
                        mensualmente, dentro de los primeros 5 días corridos del mes siguiente a su prestación. A dicha factura se
                        adjuntará la liquidación de la totalidad de los servicios utilizados por el Cliente en el mes inmediatamente anterior.
                      </p>
                      <p className="mb-2">
                        El Cliente se compromete a realizar el pago de la comisión y de los otros cobros que procedan dentro de los
                        treinta (30) días corridos siguientes a la recepción de la factura correspondiente. La referida factura sólo podrá
                        ser objetada por causales legales, dentro del octavo día contados desde su recepción.
                      </p>
                      <p className="mb-2">
                        En caso que el Cliente pague la factura correspondiente y no vencida antes del día 20 del mes en curso, se
                        aplicará al Cliente un descuento de Pronto pago. El descuento de pronto pago consiste en un descuento de 8 UF
                        aplicable en la factura del mes inmediatamente siguiente, que sólo aplicará si la factura anterior ha sido pagada
                        en forma previa al día 20 de cada mes calendario.
                      </p>
                      <p>
                        La mora o simple retardo en el pago de los pagos a que estará obligada el Cliente, facultará a Khipu para
                        aplicar al monto que se le adeude el interés máximo convencional, por todo el periodo comprendido entre la
                        fecha en que se hizo exigible la obligación y la de su pago efectivo.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: PROPIEDAD INTELECTUAL.</h4>
                      <p className="mb-2">
                        El Cliente se obliga a respetar la propiedad intelectual, industrial y de cualquier otra naturaleza de que sea
                        titular Khipu. En consecuencia, el Cliente no adquirirá derechos, títulos ni interés en la información, los datos,
                        las herramientas, los procesos o métodos de Khipu, ni en los derechos de autor, marcas registradas, secretos
                        comerciales, patentes u otras formas de propiedad intelectual o intangible de Khipu con excepción de las
                        expresamente reguladas por el presente Contrato.
                      </p>
                      <p>
                        A mayor abundamiento, las partes dejan expresa constancia que toda la información y datos que sean recolectados,
                        capturados, y/o transmitidos producto de los servicios que emanan del presente contrato, son tratados y procesados
                        de manera exclusiva el Cliente.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: MARCAS</h4>
                      <p>
                        A título enunciativo, pero no limitativo, todas las marcas comerciales, logotipos, contenidos sonoros,
                        audiovisuales, señales y signos, patentes, softwares y demás invenciones intelectuales, se encuentran protegidos
                        por los derechos de propiedad intelectual e industrial de sus respectivos dueños, por lo que queda terminantemente
                        prohibido, reproducir, copiar, o manipularlos, sin previa autorización escrita de la otra parte.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SÉPTIMO: CONFIDENCIALIDAD</h4>
                      <p className="mb-2">
                        La información entregada o que se entregue en virtud de los servicios contratados a Khipu será para su único y
                        exclusivo uso, y con el solo propósito de facilitar el cumplimiento del presente contrato. Toda la información que
                        se entregue, que no corresponda a derechos de autor de Khipu, es de propiedad del Cliente y Khipu no podrá
                        ponerla a disposición de terceros en ninguna circunstancia o condición.
                      </p>
                      <p className="mb-2">
                        Cada parte se obliga expresamente, durante todo el período de vigencia del presente contrato y hasta 5 años
                        después del término del mismo, a no revelar de forma alguna a terceros la información a la que haya tenido acceso
                        en virtud del contrato.
                      </p>
                      <p>
                        Las partes acuerdan que deberán cada una en la parte que le corresponde dar íntegro cumplimiento a la normativa
                        vigente y se comprometen a ajustar sus sistemas, protocolos y procedimientos a toda modificación que ocurra a la
                        normativa que rige la protección de datos personales en Chile.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: TRATAMIENTO DE DATOS PERSONALES.</h4>
                      <p className="mb-2">
                        Las Partes reconocen que, en virtud de la prestación de los Servicios objeto del Contrato, Khipu proporcionará
                        la tecnología para los efectos de recolección y captura de datos, pudiendo incluir datos de carácter personal,
                        en caso que el Cliente así lo decida y cuenta con la fuente o base de licitud para tales efectos. De esta manera,
                        el responsable ante la normativa vigente y obligado al íntegro cumplimiento de la Ley N°19.628 sobre Protección
                        de la Vida Privada es el Cliente.
                      </p>
                      <p>
                        Khipu no guarda, archiva ni almacena datos, de suerte tal que no participa del o los procesos de tratamiento
                        que pueda efectuar el Cliente. Al respecto, será de exclusivo cargo y costo del Cliente el pago de todo perjuicio
                        que sea provocado a Khipu por incumplimiento a la normativa vigente o por filtraciones de datos personales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">NOVENO: IMPOSIBILIDAD DE CUMPLIMIENTO EN LA PRESTACIÓN DE SERVICIOS</h4>
                      <p className="mb-2">
                        Las partes acuerdan que Khipu queda exento de toda responsabilidad de perjuicios directos e indirectos,
                        previstos e imprevistos, si por razones de caso fortuito o fuerza mayor tales como sismos, cortes de energía
                        eléctrica, intervenciones de redes por parte de terceros, no funcionamiento de redes públicas y/o privadas,
                        no funcionamiento de los sistemas de uno o más bancos, actos terroristas, huelgas u otros similares; no se
                        pudiere mantener en funcionamiento u operativo el Sistema Khipu.
                      </p>
                      <p>
                        Asimismo, Khipu no es responsable de la calidad, integridad y completitud de la información extraída y enviada
                        al Cliente, ya que ello depende de los responsables del manejo y tratamiento de dicha información.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO: CUMPLIMIENTO LEY N° 20.393 Y N° 21.595</h4>
                      <p className="mb-2">
                        Las partes establecen obligaciones recíprocas para los efectos del cumplimiento de la Ley N° 20.393 y N° 21.595,
                        así como cualquier normativa que en el futuro las complemente, modifique o reemplace. Las partes declaran que
                        han implementado un Modelo de Prevención, con políticas de control y fiscalización.
                      </p>
                      <p>
                        Las partes se obligan a hacer cumplir, con el máximo celo, a sus trabajadores, colaboradores, funcionarios
                        o dependientes, agentes, contratistas y prestadores de servicios, toda la normativa relacionada con lavado
                        de activos, financiamiento del terrorismo, cohecho y receptación, y demás delitos contemplados en la ley 21.595.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO PRIMERO: CUMPLIMIENTO LEY N° 21.643.</h4>
                      <p>
                        Las partes declaran que mantienen un compromiso activo con el trato digno y una cultura de respeto hacia todas
                        las personas, y como consecuencia de ello, se comprometen a no realizar cualquier conducta que pueda ser
                        constitutiva de malos tratos, comportamientos incívicos, tratos discriminatorios, acoso o violencia sexual,
                        y en general, situaciones que puedan constituir violencia en el trabajo, conforme se define aquella en la
                        Ley 21.643, su reglamento y normativa aplicable.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SEGUNDO: COMUNICACIONES.</h4>
                      <p>
                        Para todos los efectos del presente Contrato, toda comunicación entre las Partes se realizará a los
                        siguientes correos electrónicos:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-3 mt-2">
                        <p><strong>CLIENTE:</strong> {formData?.email || '____________________@____.____'}</p>
                        <p><strong>Khipu:</strong> soporte@khipu.com</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO QUINTO: DISPOSICIONES FINALES</h4>
                      <p className="mb-2">
                        <strong>15.5. Domicilio y Jurisdicción.</strong> Para todos los efectos legales del presente Contrato, las
                        Partes fijan domicilio en la comuna y ciudad de Santiago de Chile y se someten a la Jurisdicción de los
                        Tribunales Ordinarios de Justicia.
                      </p>
                      <p className="mb-2">
                        <strong>15.7. Vigencia.</strong> El presente contrato es de vigencia indefinida, sin perjuicio de poder
                        Khipu o el Cliente ponerle término en cualquier tiempo mediante comunicación electrónica remitida a lo menos
                        con 60 días corridos de anticipación.
                      </p>
                      <p>
                        <strong>15.8. Término del contrato.</strong> El incumplimiento del Cliente de cualquiera de las obligaciones
                        que emanan del presente instrumento o sus modificaciones, faculta a Khipu para poner término a éste en forma
                        inmediata y sin previo aviso, sin derecho a indemnización alguna en favor del Cliente.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <h4 className="font-bold text-gray-900 mb-3">ANEXO 1. Detalles del servicio de Webscraping as a Service (WaaS)</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Fuente:</strong> Privada</p>
                        <p><strong>Fuentes de extracción:</strong> Sitios web de bancos operativos en Chile</p>
                        <p><strong>Requiere credenciales privadas:</strong> Sí</p>
                        <p><strong>Requiere guardado de credenciales:</strong> Sí</p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold mb-2">PRECIOS DEL SERVICIO:</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border border-gray-200 rounded">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-3 py-2 text-left border-b">Servicio</th>
                                <th className="px-3 py-2 text-left border-b">Precio</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b"><td className="px-3 py-2">Costo de setup</td><td className="px-3 py-2">No Aplica</td></tr>
                              <tr className="border-b"><td className="px-3 py-2">Mantención fuentes</td><td className="px-3 py-2">0 UF + IVA por entidad consultada</td></tr>
                              <tr><td className="px-3 py-2">Administración y cobranza</td><td className="px-3 py-2">Costo fijo mensual de 8 UF (aplica desde el 2° mes de facturación si no aplica descuento por pronto pago)</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-4 font-semibold">Las partes firman en señal de aceptación.</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">Roberto Opazo Gazmuri</p>
                          <p className="text-center text-gray-600">p.p. Khipu SpA</p>
                          <div className="mt-4">
                            <p className="border-t border-gray-500 pt-2 text-center">Emilio Davis Mendez</p>
                            <p className="text-center text-gray-600">p.p. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">{contractData.fullName}</p>
                          <p className="text-center text-gray-600">p.p. {contractData.businessName || contractData.fullName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                ) : showPagosAutomaticosContract ? (
                  // Contrato de Mandato para Pagos Automáticos
                  <div className="text-sm leading-relaxed space-y-4 text-gray-800">
                    <div className="text-center font-bold mb-4 space-y-1">
                      <p>CONTRATO DE MANDATO PARA LA SUSCRIPCIÓN DEL</p>
                      <p>SERVICIO DE PAGOS AUTOMÁTICOS</p>
                      <p className="mt-2">Khipu SpA</p>
                      <p>Y</p>
                      <p>{contractData.businessName || contractData.fullName}</p>
                    </div>

                    <p>
                      En Santiago, a {currentDay} de {currentMonth} de {currentYear}, entre Khipu SpA, sociedad por acciones,
                      Rol Único Tributario N° 76.187.287-7, representada por don Roberto Opazo Gazmuri, chileno, Ingeniero Civil,
                      Cédula Nacional de Identidad N° 9.123.845-4, y don Emilio Davis Méndez, chileno, Ingeniero Civil,
                      Cédula Nacional de Identidad N° 10.340.294-8, todos domiciliados en calle Las Urbinas N° 53, piso 13,
                      comuna de Providencia, Región Metropolitana, Chile, en adelante "Khipu", y por la otra,{' '}
                      <strong>{contractData.businessName || contractData.fullName || 'XXXX'}</strong>,
                      Rol Único Tributario Nº <strong>{contractData.businessRut || contractData.rut || 'XXX'}</strong>,
                      {personType === 'juridica' && (
                        <> representada por don(a) <strong>{contractData.fullName || 'XXXXX'}</strong>,
                        Cédula Nacional de Identidad N° <strong>{contractData.legalRepRut || 'XXXXXX'}</strong>,</>
                      )}{' '}
                      domiciliado en <strong>{contractData.street || 'XXXXX'}</strong>,
                      comuna de <strong>{contractData.commune || 'XXXX'}</strong>,
                      <strong>{contractData.region || 'Región Metropolitana'}</strong>, Chile,
                      en adelante "el Comercio", se ha convenido el siguiente contrato de mandato para la suscripción de pagos automáticos:
                    </p>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">PRIMERO: Definiciones.</h4>
                      <p className="mb-2">Para los efectos del presente contrato se definen los siguientes conceptos:</p>
                      <ul className="space-y-2 pl-4">
                        <li><strong>"Khipu"</strong>: es el encargado y mandatario para materializar, por encargo del Comercio, la suscripción del Cliente Final, conforme a lo acordado entre el Comercio y el Cliente Final, y al sistema de pagos automáticos que se indica en este Contrato.</li>
                        <li><strong>"El Comercio"</strong>: es la contraparte de Khipu en este Contrato y, en general, la persona natural o jurídica, con o sin fines de lucro, que por este acto encarga y mandata a Khipu para suscribir el pago automático convenido entre el primero y el Cliente Final.</li>
                        <li><strong>"El Cliente Final"</strong>: es la persona natural o jurídica que ha acordado uno o más pagos con el Comercio, a realizarse mediante la interfaz de usuario que Khipu disponibilice al efecto. Su relación con Khipu consta en los Términos y Condiciones Generales de uso de Khipu, disponibles en https://www.khipu.com/page/terminos-de-uso/.</li>
                        <li><strong>"Pagos automáticos"</strong>: es una solución de pagos recurrentes a partir de la cual se permite que el Cliente Final se suscriba a un mandato PAC en línea en favor del Comercio, con el fin de que se debiten sumas de dinero desde la cuenta bancaria, de prepago u otra de los Clientes Finales suscritos, conforme al Convenio existente entre éstos y el Comercio. El débito de los fondos respectivos no será realizado por Khipu, quedando totalmente bajo la responsabilidad del Comercio la gestión de dichos débitos.</li>
                        <li><strong>"Suscripción"</strong>: es la manifestación de voluntad realizada a través de la interfaz de Khipu por los Clientes Finales del Comercio para efectos de autorizar y mandatar los pagos automáticos en favor del Comercio, con cargo a su respectiva cuenta bancaria, de prepago u otra similar.</li>
                        <li><strong>"Comisión"</strong>: es la suma de dinero pagada por el Comercio a Khipu, acordada para cada suscripción de Clientes Finales a los pagos automáticos, correspondiente al precio del servicio prestado por Khipu.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEGUNDO: Objeto del contrato.</h4>
                      <p className="mb-2">
                        Dentro de su oferta de productos, Khipu ofrece el servicio de entrega de una interfaz para la suscripción de pagos automáticos
                        con cargo a cuentas bancarias, de prepago u otras similares (en adelante "PAC" o el "Servicio"), por parte de los Clientes
                        Finales del Comercio, mediante la utilización de herramientas tecnológicas en un entorno seguro y accesible.
                      </p>
                      <p>
                        El Comercio contrata a Khipu para que disponga de una interfaz de usuario que permita la suscripción de Clientes Finales al
                        sistema PAC indicado, a fin que sea el mismo Comercio el que posteriormente se encargue de la activación de dicha suscripción,
                        del débito de las sumas correspondientes y de recibir los cobros efectivamente debitados, en una cuenta propia.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TERCERO: Ausencia de recaudación.</h4>
                      <p>
                        En virtud del presente Contrato, Khipu no recaudará pago alguno en favor del Comercio, dado que los Clientes Finales
                        autorizarán los pagos automáticos con el fin que las sumas debitadas desde sus cuentas sean traspasadas directamente
                        a las cuentas del Comercio. En consecuencia, Khipu no asume responsabilidad alguna en relación al proceso de pago
                        por parte del Cliente Final al Comercio.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">CUARTO: Rendición de Suscripciones.</h4>
                      <p>
                        Khipu diariamente practicará al Comercio rendiciones de las suscripciones efectuadas por los Clientes Finales a través
                        de su plataforma, que le serán remitidas vía correo electrónico a la casilla electrónica configurada por el Comercio
                        y que además quedarán disponibles para el Comercio en las plataformas de Khipu.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">QUINTO: Comisión.</h4>
                      <p className="mb-3">
                        Por la prestación del servicio, el Comercio pagará a Khipu un precio fijo mensual de <strong>8 UF</strong> y asimismo,
                        un precio unitario por suscripción según la Tabla escalonada indicada a continuación:
                      </p>
                      <div className="overflow-x-auto mb-3">
                        <table className="w-full text-xs border border-gray-200 rounded">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-3 py-2 text-center border-b border-r" colSpan={2}>Escalones en Tx</th>
                              <th className="px-3 py-2 text-center border-b">Valor unitario (UF)</th>
                            </tr>
                            <tr>
                              <th className="px-3 py-2 text-center border-b border-r bg-gray-50">Desde</th>
                              <th className="px-3 py-2 text-center border-b border-r bg-gray-50">Hasta</th>
                              <th className="px-3 py-2 text-center border-b bg-gray-50"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b"><td className="px-3 py-2 text-center border-r">0</td><td className="px-3 py-2 text-center border-r">500</td><td className="px-3 py-2 text-center">0,0056</td></tr>
                            <tr className="border-b"><td className="px-3 py-2 text-center border-r">501</td><td className="px-3 py-2 text-center border-r">1.000</td><td className="px-3 py-2 text-center">0,0049</td></tr>
                            <tr className="border-b"><td className="px-3 py-2 text-center border-r">1.001</td><td className="px-3 py-2 text-center border-r">5.000</td><td className="px-3 py-2 text-center">0,0041</td></tr>
                            <tr className="border-b"><td className="px-3 py-2 text-center border-r">5.001</td><td className="px-3 py-2 text-center border-r">15.000</td><td className="px-3 py-2 text-center">0,0033</td></tr>
                            <tr className="border-b"><td className="px-3 py-2 text-center border-r">15.001</td><td className="px-3 py-2 text-center border-r">50.000</td><td className="px-3 py-2 text-center">0,0026</td></tr>
                            <tr><td className="px-3 py-2 text-center border-r">50.000</td><td className="px-3 py-2 text-center border-r">+</td><td className="px-3 py-2 text-center">0,0021</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mb-2">
                        Dado que el cálculo de la comisión respectiva es escalonado, se completará cada nivel de suscripciones antes de pasar al siguiente.
                        Las comisiones y tarifas fijas devengadas en el mes inmediatamente anterior serán facturadas por Khipu mensualmente, dentro
                        de los primeros 5 días corridos del mes siguiente a su prestación.
                      </p>
                      <p className="mb-2">
                        El Comercio se compromete a realizar el pago dentro de los treinta (30) días corridos siguientes a la recepción de la factura.
                        En caso que el Comercio pague antes del día 20 del mes en curso, se aplicará un descuento de pronto pago de <strong>8 UF</strong> en
                        la factura del mes inmediatamente siguiente.
                      </p>
                      <p>
                        La mora o simple retardo en el pago de cualquier factura mensual, en más de quince (15) días en dos (2) ocasiones durante cada
                        semestre de vigencia del contrato, dará derecho a Khipu a poner término anticipadamente al contrato.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SEXTO: Mandato irrevocable.</h4>
                      <p>
                        El Comercio otorga mandato especial e irrevocable a Khipu para que materialice la suscripción de sus Clientes Finales
                        a los pagos automáticos a que refiere este Contrato, conforme a las condiciones acordadas entre cada Cliente Final y el Comercio.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">SÉPTIMO: Suministro de servicio y/o bienes.</h4>
                      <p>
                        El Comercio reconoce que Khipu no tiene obligación alguna en el cumplimiento en tiempo, forma, cantidad, calidad o precio en
                        la entrega de cualquier bien, servicio u otro tipo de contraprestación que pudiere dar origen o causar el pago automático.
                        La eventual obligación de emitir boleta o factura derivada de la adquisición de un bien y/o prestación de algún servicio
                        recae única y exclusivamente en el Comercio.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">OCTAVO: Requerimiento de operación lícita y real.</h4>
                      <p>
                        El Comercio reconoce, acepta y se obliga a utilizar los servicios de Khipu sólo para suscribir pagos de origen y con
                        finalidad lícita. El Comercio se obliga, además, a solicitar del Cliente Final todas las autorizaciones necesarias para
                        el uso y tratamiento de sus datos personales, siendo el responsable exclusivo y directo de dicho uso y tratamiento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO: Imposibilidad de cumplimiento.</h4>
                      <p>
                        Las partes acuerdan que Khipu queda exento de toda responsabilidad de perjuicios directos e indirectos, previstos
                        e imprevistos, si por razones de caso fortuito o fuerza mayor tales como sismos, cortes de energía eléctrica,
                        intervenciones de redes por parte de terceros, no funcionamiento de redes públicas y/o privadas, no funcionamiento
                        de los sistemas de uno o más bancos, actos terroristas, huelgas, pandemia u otros similares; no pudiere mantener
                        en funcionamiento u operativos todo o parte de sus servicios.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO SÉPTIMO: Cumplimiento Ley 20.393 y Ley 21.595.</h4>
                      <p className="mb-2">
                        Las Partes se obligan a cumplir de buena fe con todas las leyes y regulaciones aplicables a los Servicios a prestar.
                        Cada parte se obliga a no realizar ninguna actividad que pueda ser considerada constitutiva de delito y que por tanto
                        conlleve responsabilidad penal para la otra parte, en el contexto de las disposiciones de la Ley N°20.393 y la Ley
                        N°21.595.
                      </p>
                      <p className="text-xs text-gray-500 italic">Las Partes elevan a la presente cláusula al carácter de esencial.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO OCTAVO: Cumplimiento Ley N° 21.643.</h4>
                      <p>
                        Las partes declaran que mantienen un compromiso activo con el trato digno y una cultura de respeto hacia todas las
                        personas, comprometiéndose a no realizar ninguna conducta que pueda ser constitutiva de malos tratos, comportamientos
                        incívicos, tratos discriminatorios, acoso o violencia sexual, conforme se define en la Ley 21.643.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">DÉCIMO NOVENO: Tratamiento de Datos Personales.</h4>
                      <p className="mb-2">
                        Las Partes reconocen que Khipu podrá acceder, sólo para los efectos de recolección y captura de datos, a datos
                        de carácter personal estrictamente necesarios para el proceso de gestión de autorizaciones PAC. El responsable
                        del tratamiento y licitud de las operaciones es exclusivamente el Comercio.
                      </p>
                      <p>
                        Khipu no guarda, archiva ni almacena datos, salvo los registros de las suscripciones efectuadas, de suerte tal
                        que una vez entregados a través de medio cifrado, termina toda intervención en dicho proceso.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO CUARTO: Vigencia.</h4>
                      <p>
                        El presente Contrato tendrá duración indefinida, sin perjuicio de poder cualquiera de las partes ponerle término
                        mediante comunicación electrónica remitida a la otra parte, con al menos <strong>30 días</strong> de anticipación
                        al cese.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO QUINTO: Competencia.</h4>
                      <p>
                        Las partes se someterán en relación a este Contrato a las Leyes de la República de Chile. Además, prorrogan
                        competencia en los tribunales ordinarios de la comuna de Santiago y se someten a la jurisdicción de sus tribunales.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">VIGÉSIMO NOVENO: Administradores de Contrato.</h4>
                      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mt-2">
                        <div>
                          <p className="font-semibold mb-1">Por Khipu SpA:</p>
                          <p>Constanza Vergara</p>
                          <p className="text-xs text-gray-600">constanza.vergara@khipu.com</p>
                          <p className="mt-1 text-xs text-gray-600">soporte@khipu.com</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Por el Comercio:</p>
                          <p>{contractData.fullName}</p>
                          <p className="text-xs text-gray-600">{formData?.email || 'Por confirmar'}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">TRIGÉSIMO: Personerías.</h4>
                      <p className="mb-2">
                        La personería de don Emilio Davis Méndez y de don Roberto Opazo Gazmuri para representar a Khipu SpA constan
                        en escritura pública de fecha 12 de noviembre de 2012 otorgada en la notaría de Santiago de don Pablo González Caamaño.
                      </p>
                      <p className="mb-2">
                        La personería de don(a) <strong>{contractData.fullName}</strong> para representar a{' '}
                        <strong>{contractData.businessName || contractData.fullName}</strong>{' '}
                        consta de escritura pública{personType === 'juridica' ? ` de fecha _____ de _____ de _____, otorgada en la Notaría de ${contractData.commune || 'XXXX'}.` : '.'}
                      </p>
                      <p>
                        La persona natural que acepta y suscribe el presente Contrato declara ser absolutamente capaz para contratar, y en caso
                        de estar actuando en representación de otra persona, declara poseer facultades suficientes para representarla.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <p className="mb-6 font-semibold text-center">De conformidad, las partes suscriben dos ejemplares de idéntico tenor.</p>
                      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <div className="space-y-4">
                          <div>
                            <p className="border-t border-gray-500 pt-2 text-center">Roberto Opazo Gazmuri</p>
                            <p className="text-center text-gray-600 text-xs">p.p. Khipu SpA</p>
                          </div>
                          <div>
                            <p className="border-t border-gray-500 pt-2 text-center">Emilio Davis Méndez</p>
                            <p className="text-center text-gray-600 text-xs">p.p. Khipu SpA</p>
                          </div>
                        </div>
                        <div>
                          <p className="border-t border-gray-500 pt-2 text-center">{contractData.fullName}</p>
                          <p className="text-center text-gray-600 text-xs">p.p. {contractData.businessName || contractData.fullName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                ) : (
                  // Contrato genérico (fallback)
                  <div className="space-y-4 text-sm text-gray-800">
                    {contractSections.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-bold text-gray-900">{section.title}</h4>
                        <p className="leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleReject}
                className="flex-1 px-8 py-4 border-2 border-red-300 bg-red-50 text-red-700 rounded-xl font-semibold hover:bg-red-100 hover:border-red-400 transition-all"
              >
                No acepto
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Acepto y firmo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mensaje para empresas de más de 160.000 USD */}
            {formData?.businessSize === 'Más de 160.000 USD' && personType === 'juridica' && (
              null
            )}
          </>
        )}

        {accepted === true && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              ¡Contrato aceptado!
            </h3>
            <p className="text-green-700">
              Redirigiendo a la siguiente etapa...
            </p>
          </div>
        )}

        {accepted === false && showObjection && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-900 mb-3">
                  ¿Tienes objeciones sobre el contrato?
                </h3>
                <p className="text-amber-800 mb-4">
                  Entendemos que revisar un contrato es un paso importante. Si tienes dudas o necesitas 
                  aclaraciones sobre alguna cláusula, nuestro equipo está aquí para ayudarte.
                </p>
                <div className="bg-white border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-900">Contáctanos:</span>
                  </div>
                  <p className="text-amber-800">
                    <a href="mailto:soporte@khipu.com" className="text-blue-600 hover:underline font-medium">
                      soporte@khipu.com
                    </a>
                  </p>
                  <p className="text-sm text-amber-700 mt-2">
                    Responderemos tus consultas en un plazo máximo de 24 horas hábiles.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAccepted(null);
                    setShowObjection(false);
                  }}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all"
                >
                  Volver a revisar el contrato
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Módulo Empresas de alto volumen - siempre visible */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-900 mb-1 flex items-center gap-2">
              🏢 Empresas de alto volumen
            </h3>
            <p className="text-amber-800 text-sm mb-2">
              Si tu empresa transacciona más de 160.000 USD y necesitas agregar una cláusula o anexo particular, comunícate con:
            </p>
            <a
              href="mailto:comercial@khipu.com"
              className="inline-flex items-center gap-2 text-amber-900 font-medium text-sm hover:text-amber-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              comercial@khipu.com
            </a>
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
