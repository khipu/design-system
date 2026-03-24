import { 
  Palette, 
  Type, 
  Square, 
  MousePointer2, 
  Tag, 
  Bell, 
  Image, 
  Layout, 
  Layers, 
  FileText, 
  Zap, 
  Code, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  Sparkles,
  Package,
  Users,
  Eye,
  Download,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';

export function DesignSystemIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Versión 1.0</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6">
              Sistema de Diseño Khipu
            </h1>
            
            <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Documentación completa del tour virtual de onboarding. 
              Todos los componentes, estilos y patrones para implementación frontend.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/?showcase'}
                className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-6 h-auto"
              >
                <Eye className="w-5 h-5" />
                Ver Showcase Interactivo
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('/DESIGN_SYSTEM.md', '_blank')}
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              >
                <BookOpen className="w-5 h-5" />
                Leer Documentación
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">25+</div>
            <div className="text-gray-600">Componentes</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
            <div className="text-gray-600">Colores</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">7</div>
            <div className="text-gray-600">Documentos</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">30+</div>
            <div className="text-gray-600">Ejemplos</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Componentes del Sistema */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Qué Incluye el Sistema?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Componentes completos, documentación detallada y ejemplos listos para usar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Colores */}
            <ComponentCard
              icon={<Palette className="w-6 h-6 text-blue-600" />}
              title="Sistema de Colores"
              description="Paleta completa con 50+ colores, variables CSS y guías de uso"
              items={[
                'Colores primarios y secundarios',
                'Colores de feedback',
                'Escala de grises',
                'Variables CSS personalizadas'
              ]}
              bgColor="bg-blue-50"
            />

            {/* Tipografía */}
            <ComponentCard
              icon={<Type className="w-6 h-6 text-purple-600" />}
              title="Tipografía"
              description="Jerarquía completa de títulos, textos y estilos"
              items={[
                'Jerarquía H1-H4',
                'Tamaños de texto',
                'Pesos de fuente',
                'Colores de texto'
              ]}
              bgColor="bg-purple-50"
            />

            {/* Botones */}
            <ComponentCard
              icon={<MousePointer2 className="w-6 h-6 text-green-600" />}
              title="Botones"
              description="6 variantes con estados y tamaños diferentes"
              items={[
                'Default, Secondary, Outline',
                'Ghost, Destructive, Link',
                'Tamaños: SM, Default, LG, Icon',
                'Estados hover/focus/disabled'
              ]}
              bgColor="bg-green-50"
            />

            {/* Inputs */}
            <ComponentCard
              icon={<Square className="w-6 h-6 text-orange-600" />}
              title="Inputs y Formularios"
              description="Campos de texto, selects y validaciones"
              items={[
                'Inputs con estados',
                'Selects personalizados',
                'Labels con íconos',
                'Validación y errores'
              ]}
              bgColor="bg-orange-50"
            />

            {/* Cards */}
            <ComponentCard
              icon={<Layers className="w-6 h-6 text-pink-600" />}
              title="Cards"
              description="Cards modulares para diferentes propósitos"
              items={[
                'Cards de formulario',
                'Cards de selección',
                'Cards de pricing',
                'Cards de estado'
              ]}
              bgColor="bg-pink-50"
            />

            {/* Badges */}
            <ComponentCard
              icon={<Tag className="w-6 h-6 text-indigo-600" />}
              title="Badges y Tags"
              description="Etiquetas para estados y categorías"
              items={[
                '4 variantes base',
                'Badges personalizados',
                'Estados de proceso',
                'Etiquetas de selección'
              ]}
              bgColor="bg-indigo-50"
            />

            {/* Alerts */}
            <ComponentCard
              icon={<Bell className="w-6 h-6 text-red-600" />}
              title="Alerts y Notificaciones"
              description="Feedback visual para usuarios"
              items={[
                'Alert de éxito',
                'Alert de error',
                'Alert de advertencia',
                'Alert informativo'
              ]}
              bgColor="bg-red-50"
            />

            {/* Iconografía */}
            <ComponentCard
              icon={<Image className="w-6 h-6 text-yellow-600" />}
              title="Iconografía"
              description="20+ íconos de Lucide React documentados"
              items={[
                'Íconos de navegación',
                'Íconos de estado',
                'Íconos de contenido',
                'Tamaños estándar'
              ]}
              bgColor="bg-yellow-50"
            />

            {/* Layout */}
            <ComponentCard
              icon={<Layout className="w-6 h-6 text-teal-600" />}
              title="Layout y Espaciado"
              description="Sistema de espaciado y estructura"
              items={[
                'Espaciado en múltiplos de 4px',
                'Gaps y padding',
                'Border radius',
                'Max widths'
              ]}
              bgColor="bg-teal-50"
            />
          </div>
        </div>

        {/* Componentes Complejos */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Componentes Complejos del Tour
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <ComplexComponentCard
              title="Progress Bar"
              description="Barra de progreso de etapas con indicadores visuales de completado, actual y pendiente"
              image="🎯"
              features={['Estados visuales', 'Líneas conectoras', 'Indicadores de etapa']}
            />

            <ComplexComponentCard
              title="Header del Tour"
              description="Cabecera sticky con logo Khipu, título y acciones de ayuda y reinicio"
              image="🎨"
              features={['Logo con gradiente', 'Navegación', 'Acciones rápidas']}
            />

            <ComplexComponentCard
              title="Cards de Selección"
              description="Cards interactivas para Persona Natural y Jurídica con estados visuales"
              image="👤"
              features={['Estados seleccionado', 'Íconos contextuales', 'Badge de confirmación']}
            />

            <ComplexComponentCard
              title="Pricing Plans"
              description="Cards de planes de cobro con badges, características y CTAs"
              image="💰"
              features={['Badge recomendado', 'Lista de features', 'Botón de selección']}
            />
          </div>
        </div>

        {/* Documentación */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Documentación Disponible
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <DocumentCard
              icon={<Eye className="w-6 h-6" />}
              title="Showcase Interactivo"
              description="Interfaz visual para explorar todos los componentes en vivo"
              link="/?showcase"
              linkText="Ver Showcase"
              color="blue"
            />

            <DocumentCard
              icon={<BookOpen className="w-6 h-6" />}
              title="DESIGN_SYSTEM.md"
              description="Documentación completa con especificaciones exactas de todo el sistema"
              link="/DESIGN_SYSTEM.md"
              linkText="Leer Documentación"
              color="purple"
            />

            <DocumentCard
              icon={<Zap className="w-6 h-6" />}
              title="QUICK_REFERENCE.md"
              description="Guía rápida con snippets de código listos para copiar y pegar"
              link="/QUICK_REFERENCE.md"
              linkText="Ver Referencia"
              color="green"
            />

            <DocumentCard
              icon={<Code className="w-6 h-6" />}
              title="COMPONENT_EXAMPLES.md"
              description="30+ ejemplos completos de código con componentes funcionales"
              link="/COMPONENT_EXAMPLES.md"
              linkText="Ver Ejemplos"
              color="orange"
            />

            <DocumentCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="DESIGN_CHECKLIST.md"
              description="Checklist visual para validar implementaciones antes de commit"
              link="/DESIGN_CHECKLIST.md"
              linkText="Ver Checklist"
              color="pink"
            />

            <DocumentCard
              icon={<FileText className="w-6 h-6" />}
              title="SISTEMA_DISENO_README.md"
              description="Índice completo y guía de navegación entre documentos"
              link="/SISTEMA_DISENO_README.md"
              linkText="Ver Índice"
              color="indigo"
            />
          </div>
        </div>

        {/* Para Quién */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            ¿Para Quién es Este Sistema?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <AudienceCard
              icon={<Palette className="w-8 h-8 text-blue-600" />}
              title="Diseñadores"
              description="Explora componentes visualmente, especificaciones exactas y validación de implementaciones"
              actions={[
                'Ver Showcase Interactivo',
                'Revisar especificaciones de color',
                'Validar con checklist'
              ]}
            />

            <AudienceCard
              icon={<Code className="w-8 h-8 text-purple-600" />}
              title="Desarrolladores"
              description="Snippets de código, ejemplos completos y referencia rápida para implementación"
              actions={[
                'Copiar código de ejemplos',
                'Consultar referencia rápida',
                'Verificar en showcase'
              ]}
            />

            <AudienceCard
              icon={<Users className="w-8 h-8 text-green-600" />}
              title="Product Managers"
              description="Visión general del sistema, patrones de diseño y documentación completa"
              actions={[
                'Explorar showcase visual',
                'Revisar patrones de diseño',
                'Entender la estructura'
              ]}
            />
          </div>
        </div>

        {/* Stack Tecnológico */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Stack Tecnológico
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    React 18+
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Vite
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Estilos</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Tailwind CSS v4
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Class Variance Authority
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Componentes</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Radix UI
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Lucide React
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            Comienza a Usar el Sistema
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explora todos los componentes y empieza a implementar con confianza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/?showcase'}
              className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-6 h-auto"
            >
              <Eye className="w-5 h-5" />
              Ver Showcase
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              <ArrowRight className="w-5 h-5" />
              Ver Tour de Onboarding
            </Button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Sistema de Diseño Khipu v1.0</p>
            <p className="text-sm">Última actualización: Marzo 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Card de Componente
function ComponentCard({ 
  icon, 
  title, 
  description, 
  items, 
  bgColor 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  items: string[];
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente Card Complejo
function ComplexComponentCard({
  title,
  description,
  image,
  features
}: {
  title: string;
  description: string;
  image: string;
  features: string[];
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
      <div className="text-5xl mb-4">{image}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <span 
            key={index} 
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

// Componente Card de Documento
function DocumentCard({
  icon,
  title,
  description,
  link,
  linkText,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    pink: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
      <div className={`w-12 h-12 ${colorClasses[color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        target={link.startsWith('http') ? '_self' : '_blank'}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        {linkText}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

// Componente Card de Audiencia
function AudienceCard({
  icon,
  title,
  description,
  actions
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actions: string[];
}) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700 mb-3">Acciones recomendadas:</p>
        {actions.map((action, index) => (
          <div key={index} className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
