import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Building2, 
  User, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Info,
  Upload,
  Download,
  RotateCcw,
  HelpCircle,
  Check,
  X,
  Plus,
  Minus,
  Edit,
  Trash2,
  Search,
  Filter,
  Settings
} from 'lucide-react';

export function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
            <span className="text-3xl font-bold">K</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Khipu Design System</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Sistema de diseño completo del tour virtual de onboarding. 
            Todos los componentes, estilos y patrones documentados para implementación frontend.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            <TabsTrigger value="colors">Colores</TabsTrigger>
            <TabsTrigger value="typography">Tipografía</TabsTrigger>
            <TabsTrigger value="buttons">Botones</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="badges">Badges & Alerts</TabsTrigger>
            <TabsTrigger value="icons">Iconografía</TabsTrigger>
            <TabsTrigger value="layout">Layout & Spacing</TabsTrigger>
            <TabsTrigger value="components">Componentes Complejos</TabsTrigger>
          </TabsList>

          {/* COLORES */}
          <TabsContent value="colors" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Sistema de Colores</h2>
              
              {/* Colores Primarios */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Colores Primarios</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ColorCard
                    name="Primary"
                    hex="#030213"
                    var="--primary"
                    description="Color principal para botones y elementos destacados"
                  />
                  <ColorCard
                    name="Primary Foreground"
                    hex="#FFFFFF"
                    var="--primary-foreground"
                    description="Texto sobre color primario"
                  />
                  <ColorCard
                    name="Background"
                    hex="#FFFFFF"
                    var="--background"
                    description="Fondo principal de la aplicación"
                  />
                  <ColorCard
                    name="Foreground"
                    hex="oklch(0.145 0 0)"
                    var="--foreground"
                    description="Color de texto principal"
                  />
                </div>
              </div>

              {/* Colores de Acción */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Colores de Acción (Brand)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <div className="h-24 bg-blue-600 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Blue 600</p>
                      <p className="text-sm text-gray-600">#2563EB</p>
                      <p className="text-xs text-gray-500 mt-1">Botones CTA, links, selección</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-blue-700 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Blue 700</p>
                      <p className="text-sm text-gray-600">#1D4ED8</p>
                      <p className="text-xs text-gray-500 mt-1">Hover de botones</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-blue-100 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Blue 100</p>
                      <p className="text-sm text-gray-600">#DBEAFE</p>
                      <p className="text-xs text-gray-500 mt-1">Fondos de selección</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-blue-50 rounded-lg shadow-md border border-gray-200"></div>
                    <div>
                      <p className="font-semibold">Blue 50</p>
                      <p className="text-sm text-gray-600">#EFF6FF</p>
                      <p className="text-xs text-gray-500 mt-1">Hover suave</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colores Secundarios */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Colores Secundarios</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <div className="h-24 bg-purple-600 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Purple 600</p>
                      <p className="text-sm text-gray-600">#9333EA</p>
                      <p className="text-xs text-gray-500 mt-1">Persona Jurídica</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-purple-100 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Purple 100</p>
                      <p className="text-sm text-gray-600">#F3E8FF</p>
                      <p className="text-xs text-gray-500 mt-1">Fondos Persona Jurídica</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-green-500 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Green 500</p>
                      <p className="text-sm text-gray-600">#22C55E</p>
                      <p className="text-xs text-gray-500 mt-1">Estados de éxito</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-green-100 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Green 100</p>
                      <p className="text-sm text-gray-600">#DCFCE7</p>
                      <p className="text-xs text-gray-500 mt-1">Fondos de éxito</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colores de Feedback */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Colores de Feedback</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ColorCard
                    name="Destructive"
                    hex="#D4183D"
                    var="--destructive"
                    description="Errores y acciones destructivas"
                  />
                  <div className="space-y-3">
                    <div className="h-24 bg-yellow-500 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Yellow 500</p>
                      <p className="text-sm text-gray-600">#EAB308</p>
                      <p className="text-xs text-gray-500 mt-1">Advertencias</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-orange-500 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Orange 500</p>
                      <p className="text-sm text-gray-600">#F97316</p>
                      <p className="text-xs text-gray-500 mt-1">Alertas importantes</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 bg-blue-500 rounded-lg shadow-md"></div>
                    <div>
                      <p className="font-semibold">Blue 500 (Info)</p>
                      <p className="text-sm text-gray-600">#3B82F6</p>
                      <p className="text-xs text-gray-500 mt-1">Información</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colores Neutrales */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Colores Neutrales (Grises)</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: 'Gray 50', color: 'bg-gray-50', hex: '#F9FAFB', use: 'Fondos suaves' },
                    { name: 'Gray 100', color: 'bg-gray-100', hex: '#F3F4F6', use: 'Hover estados' },
                    { name: 'Gray 200', color: 'bg-gray-200', hex: '#E5E7EB', use: 'Bordes, divisores' },
                    { name: 'Gray 300', color: 'bg-gray-300', hex: '#D1D5DB', use: 'Bordes inputs' },
                    { name: 'Gray 400', color: 'bg-gray-400', hex: '#9CA3AF', use: 'Placeholders' },
                    { name: 'Gray 500', color: 'bg-gray-500', hex: '#6B7280', use: 'Texto secundario' },
                    { name: 'Gray 600', color: 'bg-gray-600', hex: '#4B5563', use: 'Texto normal' },
                    { name: 'Gray 700', color: 'bg-gray-700', hex: '#374151', use: 'Texto importante' },
                    { name: 'Gray 800', color: 'bg-gray-800', hex: '#1F2937', use: 'Títulos' },
                    { name: 'Gray 900', color: 'bg-gray-900', hex: '#111827', use: 'Títulos principales' },
                  ].map((color) => (
                    <div key={color.name} className="space-y-2">
                      <div className={`h-16 ${color.color} rounded-lg shadow-sm border border-gray-200`}></div>
                      <div>
                        <p className="font-medium text-xs">{color.name}</p>
                        <p className="text-xs text-gray-500">{color.hex}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{color.use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TIPOGRAFÍA */}
          <TabsContent value="typography" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Sistema de Tipografía</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Jerarquía de Títulos</h3>
                  <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                    <div className="border-b pb-4">
                      <h1 className="mb-2">Heading 1 - Títulos Principales</h1>
                      <p className="text-sm text-gray-600 font-mono">font-size: var(--text-2xl) | font-weight: 500 | line-height: 1.5</p>
                      <p className="text-xs text-gray-500 mt-1">Uso: Títulos de pantallas, encabezados principales</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h2 className="mb-2">Heading 2 - Subtítulos de Sección</h2>
                      <p className="text-sm text-gray-600 font-mono">font-size: var(--text-xl) | font-weight: 500 | line-height: 1.5</p>
                      <p className="text-xs text-gray-500 mt-1">Uso: Títulos de secciones, cards importantes</p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="mb-2">Heading 3 - Títulos de Cards</h3>
                      <p className="text-sm text-gray-600 font-mono">font-size: var(--text-lg) | font-weight: 500 | line-height: 1.5</p>
                      <p className="text-xs text-gray-500 mt-1">Uso: Títulos de cards, subsecciones</p>
                    </div>
                    
                    <div className="pb-4">
                      <h4 className="mb-2">Heading 4 - Subtítulos Menores</h4>
                      <p className="text-sm text-gray-600 font-mono">font-size: var(--text-base) | font-weight: 500 | line-height: 1.5</p>
                      <p className="text-xs text-gray-500 mt-1">Uso: Subtítulos de contenido, labels importantes</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Tamaños de Texto</h3>
                  <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                    <div className="border-b pb-3">
                      <p className="text-5xl mb-2">Texto 5XL</p>
                      <p className="text-sm text-gray-600 font-mono">text-5xl (48px)</p>
                      <p className="text-xs text-gray-500">Uso: Hero headers, landing pages</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-3xl mb-2">Texto 3XL</p>
                      <p className="text-sm text-gray-600 font-mono">text-3xl (30px)</p>
                      <p className="text-xs text-gray-500">Uso: Títulos de etapas principales</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-xl mb-2">Texto XL</p>
                      <p className="text-sm text-gray-600 font-mono">text-xl (20px)</p>
                      <p className="text-xs text-gray-500">Uso: Subtítulos destacados</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-lg mb-2">Texto Large</p>
                      <p className="text-sm text-gray-600 font-mono">text-lg (18px)</p>
                      <p className="text-xs text-gray-500">Uso: Texto destacado, labels principales</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-base mb-2">Texto Base (Por defecto)</p>
                      <p className="text-sm text-gray-600 font-mono">text-base (16px)</p>
                      <p className="text-xs text-gray-500">Uso: Texto de párrafos, inputs, botones</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-sm mb-2">Texto Small</p>
                      <p className="text-sm text-gray-600 font-mono">text-sm (14px)</p>
                      <p className="text-xs text-gray-500">Uso: Descripciones, texto secundario</p>
                    </div>
                    <div className="pb-3">
                      <p className="text-xs mb-2">Texto Extra Small</p>
                      <p className="text-sm text-gray-600 font-mono">text-xs (12px)</p>
                      <p className="text-xs text-gray-500">Uso: Labels de progreso, metadata, hints</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Pesos de Fuente</h3>
                  <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
                    <div className="border-b pb-3">
                      <p className="font-normal text-lg mb-1">Normal (400)</p>
                      <p className="text-sm text-gray-600 font-mono">font-normal | font-weight: 400</p>
                      <p className="text-xs text-gray-500">Uso: Texto de párrafos, inputs</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="font-medium text-lg mb-1">Medium (500)</p>
                      <p className="text-sm text-gray-600 font-mono">font-medium | font-weight: 500</p>
                      <p className="text-xs text-gray-500">Uso: Títulos, labels, botones</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="font-semibold text-lg mb-1">Semibold (600)</p>
                      <p className="text-sm text-gray-600 font-mono">font-semibold | font-weight: 600</p>
                      <p className="text-xs text-gray-500">Uso: Subtítulos destacados, CTAs</p>
                    </div>
                    <div className="pb-3">
                      <p className="font-bold text-lg mb-1">Bold (700)</p>
                      <p className="text-sm text-gray-600 font-mono">font-bold | font-weight: 700</p>
                      <p className="text-xs text-gray-500">Uso: Títulos principales, énfasis fuerte</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Colores de Texto</h3>
                  <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
                    <div className="border-b pb-3">
                      <p className="text-gray-900 text-lg mb-1">Texto Principal (Gray 900)</p>
                      <p className="text-sm text-gray-600 font-mono">text-gray-900 | #111827</p>
                      <p className="text-xs text-gray-500">Uso: Títulos, texto principal</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-gray-600 text-lg mb-1">Texto Secundario (Gray 600)</p>
                      <p className="text-sm text-gray-600 font-mono">text-gray-600 | #4B5563</p>
                      <p className="text-xs text-gray-500">Uso: Descripciones, texto de apoyo</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-gray-500 text-lg mb-1">Texto Terciario (Gray 500)</p>
                      <p className="text-sm text-gray-600 font-mono">text-gray-500 | #6B7280</p>
                      <p className="text-xs text-gray-500">Uso: Metadata, hints</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-gray-400 text-lg mb-1">Texto Deshabilitado (Gray 400)</p>
                      <p className="text-sm text-gray-600 font-mono">text-gray-400 | #9CA3AF</p>
                      <p className="text-xs text-gray-500">Uso: Estados deshabilitados</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="text-blue-600 text-lg mb-1">Texto Enlace (Blue 600)</p>
                      <p className="text-sm text-gray-600 font-mono">text-blue-600 | #2563EB</p>
                      <p className="text-xs text-gray-500">Uso: Links, acciones interactivas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* BOTONES */}
          <TabsContent value="buttons" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Sistema de Botones</h2>
              
              <div className="space-y-8">
                {/* Variantes */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Variantes de Botones</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Default (Primary)</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Button>Botón Default</Button>
                        <Button disabled>Disabled</Button>
                        <Button><ArrowRight /> Con Icono</Button>
                      </div>
                      <p className="text-xs text-gray-600 font-mono">variant="default" | Uso: Acciones principales, CTAs</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Secondary</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Button variant="secondary">Botón Secondary</Button>
                        <Button variant="secondary" disabled>Disabled</Button>
                        <Button variant="secondary"><Settings /> Con Icono</Button>
                      </div>
                      <p className="text-xs text-gray-600 font-mono">variant="secondary" | Uso: Acciones secundarias</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Outline</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Button variant="outline">Botón Outline</Button>
                        <Button variant="outline" disabled>Disabled</Button>
                        <Button variant="outline"><Filter /> Con Icono</Button>
                      </div>
                      <p className="text-xs text-gray-600 font-mono">variant="outline" | Uso: Acciones alternativas, botón Volver</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Ghost</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Button variant="ghost">Botón Ghost</Button>
                        <Button variant="ghost" disabled>Disabled</Button>
                        <Button variant="ghost"><Edit /> Con Icono</Button>
                      </div>
                      <p className="text-xs text-gray-600 font-mono">variant="ghost" | Uso: Acciones sutiles, menús</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Destructive</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Button variant="destructive">Botón Destructive</Button>
                        <Button variant="destructive" disabled>Disabled</Button>
                        <Button variant="destructive"><Trash2 /> Eliminar</Button>
                      </div>
                      <p className="text-xs text-gray-600 font-mono">variant="destructive" | Uso: Acciones destructivas, borrar</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Link</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Button variant="link">Botón Link</Button>
                        <Button variant="link" disabled>Disabled</Button>
                        <Button variant="link"><HelpCircle /> Ayuda</Button>
                      </div>
                      <p className="text-xs text-gray-600 font-mono">variant="link" | Uso: Enlaces estilizados</p>
                    </div>
                  </div>
                </div>

                {/* Tamaños */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tamaños de Botones</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-4">
                      <Button size="sm">Small</Button>
                      <p className="text-sm text-gray-600 font-mono">size="sm" | h: 32px | px: 12px</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button size="default">Default</Button>
                      <p className="text-sm text-gray-600 font-mono">size="default" | h: 36px | px: 16px</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button size="lg">Large</Button>
                      <p className="text-sm text-gray-600 font-mono">size="lg" | h: 40px | px: 24px</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button size="icon"><Plus /></Button>
                      <p className="text-sm text-gray-600 font-mono">size="icon" | 36px x 36px | Para íconos únicamente</p>
                    </div>
                  </div>
                </div>

                {/* Botones Personalizados del Tour */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Botones Personalizados del Tour</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Botón Continuar (Habilitado)</p>
                      <button className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all mb-3">
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <p className="text-xs text-gray-600 font-mono">
                        bg-blue-600 hover:bg-blue-700 text-white | rounded-xl | py-4 px-6
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Botón Continuar (Deshabilitado)</p>
                      <button className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gray-200 text-gray-400 cursor-not-allowed mb-3" disabled>
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <p className="text-xs text-gray-600 font-mono">
                        bg-gray-200 text-gray-400 cursor-not-allowed
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Botón de Ayuda (Header)</p>
                      <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mb-3">
                        <HelpCircle className="w-5 h-5" />
                        <span className="font-medium">Ayuda</span>
                      </button>
                      <p className="text-xs text-gray-600 font-mono">
                        text-blue-600 hover:bg-blue-50 | rounded-lg | px-4 py-2
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Botón de Reinicio (Header)</p>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-3">
                        <RotateCcw className="w-5 h-5" />
                      </button>
                      <p className="text-xs text-gray-600 font-mono">
                        text-gray-600 hover:bg-gray-100 | rounded-lg | p-2
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estados */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Estados de Interacción</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Estados de Hover</p>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• Default: <code className="bg-white px-2 py-1 rounded">hover:bg-primary/90</code></li>
                          <li>• Outline: <code className="bg-white px-2 py-1 rounded">hover:bg-accent</code></li>
                          <li>• Ghost: <code className="bg-white px-2 py-1 rounded">hover:bg-accent</code></li>
                          <li>• Custom Blue: <code className="bg-white px-2 py-1 rounded">hover:bg-blue-700</code></li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Estados de Focus</p>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• Focus Ring: <code className="bg-white px-2 py-1 rounded">focus-visible:ring-[3px]</code></li>
                          <li>• Ring Color: <code className="bg-white px-2 py-1 rounded">focus-visible:ring-ring/50</code></li>
                          <li>• Border: <code className="bg-white px-2 py-1 rounded">focus-visible:border-ring</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* INPUTS */}
          <TabsContent value="inputs" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Sistema de Inputs y Formularios</h2>
              
              <div className="space-y-8">
                {/* Inputs de Texto */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Inputs de Texto</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                      <Label htmlFor="input-1">Input Normal</Label>
                      <Input id="input-1" placeholder="Escribe algo..." />
                      <p className="text-xs text-gray-600 font-mono">
                        bg-input-background (#F3F3F5) | border border-input | rounded-md | h-9 | px-3
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                      <Label htmlFor="input-2">Input con Valor</Label>
                      <Input id="input-2" value="Texto de ejemplo" readOnly />
                      <p className="text-xs text-gray-600">Input con contenido</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                      <Label htmlFor="input-3">Input Deshabilitado</Label>
                      <Input id="input-3" placeholder="Campo deshabilitado" disabled />
                      <p className="text-xs text-gray-600 font-mono">
                        disabled:opacity-50 disabled:cursor-not-allowed
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                      <Label htmlFor="input-4">Input con Error</Label>
                      <Input id="input-4" placeholder="Campo con error" aria-invalid="true" />
                      <p className="text-xs text-red-600">Este campo es requerido</p>
                      <p className="text-xs text-gray-600 font-mono">
                        aria-invalid:border-destructive aria-invalid:ring-destructive/20
                      </p>
                    </div>
                  </div>
                </div>

                {/* Select Personalizado */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select (Personalizado del Tour)</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                    <label className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Selecciona tu país
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Selecciona un país</option>
                      <option value="chile">🇨🇱 Chile</option>
                      <option value="peru" disabled>🇵🇪 Perú (Próximamente)</option>
                    </select>
                    <p className="text-xs text-gray-600 font-mono">
                      bg-gray-50 border-gray-300 | rounded-lg | px-4 py-3 | focus:ring-2 focus:ring-blue-500
                    </p>
                  </div>
                </div>

                {/* Switch */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Switch (Toggle)</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="switch-1" />
                      <Label htmlFor="switch-1">Activar notificaciones</Label>
                    </div>
                    <p className="text-xs text-gray-600 font-mono">
                      Componente Switch de Radix UI con estilos personalizados
                    </p>
                  </div>
                </div>

                {/* Estados de Focus */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Estados de Inputs</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Estado Normal</p>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• Background: <code className="bg-white px-2 py-1 rounded">bg-input-background (#F3F3F5)</code></li>
                          <li>• Border: <code className="bg-white px-2 py-1 rounded">border-input (transparent)</code></li>
                          <li>• Altura: <code className="bg-white px-2 py-1 rounded">h-9 (36px)</code></li>
                          <li>• Padding: <code className="bg-white px-2 py-1 rounded">px-3 py-1</code></li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Estado Focus</p>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• Ring: <code className="bg-white px-2 py-1 rounded">focus-visible:ring-[3px]</code></li>
                          <li>• Ring Color: <code className="bg-white px-2 py-1 rounded">ring-ring/50</code></li>
                          <li>• Border: <code className="bg-white px-2 py-1 rounded">border-ring</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Labels y Helpers</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <Label className="text-lg font-semibold text-gray-900 mb-2 block">Label Principal</Label>
                      <p className="text-xs text-gray-600 font-mono mb-3">
                        text-lg font-semibold text-gray-900 | Uso: Labels de secciones importantes
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <Label>Label Normal de Campo</Label>
                      <p className="text-xs text-gray-600 font-mono">
                        font-medium | Uso: Labels de inputs estándar
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm text-gray-600">Texto de ayuda o descripción</p>
                      <p className="text-xs text-gray-600 font-mono">
                        text-sm text-gray-600 | Uso: Descripciones de campos
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-xs text-gray-500">Texto de hint o metadata</p>
                      <p className="text-xs text-gray-600 font-mono">
                        text-xs text-gray-500 | Uso: Hints, caracteres restantes, formato esperado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CARDS */}
          <TabsContent value="cards" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Sistema de Cards</h2>
              
              <div className="space-y-8">
                {/* Card Base */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Card Base</h3>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Título de Card</CardTitle>
                        <CardDescription>Descripción del contenido de esta card</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Contenido principal de la card. Aquí va la información relevante.
                        </p>
                      </CardContent>
                    </Card>
                    <p className="text-xs text-gray-600 font-mono">
                      bg-card border rounded-xl | gap-6 | px-6 py-6
                    </p>
                  </div>
                </div>

                {/* Card de Selección (Tipo de Persona) */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Card de Selección (Persona Natural/Jurídica)</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Seleccionada */}
                      <button className="p-6 rounded-xl border-2 border-blue-600 bg-blue-50 shadow-md transition-all text-left">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Persona Natural</h3>
                        <p className="text-sm text-gray-600">
                          Para emprendedores y freelancers
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          Seleccionado
                        </div>
                      </button>

                      {/* No seleccionada */}
                      <button className="p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-all text-left">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <Building2 className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Persona Jurídica</h3>
                        <p className="text-sm text-gray-600">
                          Para empresas constituidas
                        </p>
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 font-mono">
                      Seleccionada: border-2 border-blue-600 bg-blue-50 shadow-md<br/>
                      No seleccionada: border-2 border-gray-200 hover:border-gray-300 bg-white
                    </p>
                  </div>
                </div>

                {/* Card de Formulario */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Card de Formulario</h3>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Título de Sección
                    </label>
                    <Input placeholder="Campo de formulario" />
                  </div>
                  <p className="text-xs text-gray-600 font-mono mt-3">
                    bg-white rounded-xl p-6 border border-gray-200
                  </p>
                </div>

                {/* Card de Plan de Precios */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Card de Plan (Pricing)</h3>
                  <div className="border-2 border-blue-600 rounded-xl p-6 bg-blue-50 relative shadow-lg">
                    <div className="absolute -top-3 left-6">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        RECOMENDADO
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">Plan Starter</h3>
                    <p className="text-gray-600 mb-4">Ideal para comenzar</p>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-bold text-gray-900">2.9%</span>
                      <span className="text-gray-600">+ $150 por transacción</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Característica del plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Otra característica</span>
                      </li>
                    </ul>
                    <Button className="w-full">Seleccionar Plan</Button>
                  </div>
                  <p className="text-xs text-gray-600 font-mono mt-3">
                    border-2 border-blue-600 bg-blue-50 rounded-xl shadow-lg | Badge flotante para destacar
                  </p>
                </div>

                {/* Card de Estado */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Cards de Estado</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-900 mb-1">Estado de Éxito</h4>
                          <p className="text-sm text-green-700">Operación completada correctamente</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">Estado Informativo</h4>
                          <p className="text-sm text-blue-700">Información importante para el usuario</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 mb-1">Estado de Advertencia</h4>
                          <p className="text-sm text-yellow-700">Acción que requiere atención</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* BADGES & ALERTS */}
          <TabsContent value="badges" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Badges y Alerts</h2>
              
              <div className="space-y-8">
                {/* Badges */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Badges</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Variantes de Badges</p>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Badges Personalizados</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                          RECOMENDADO
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Completado
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Pendiente
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Persona Jurídica
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Inactivo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Alerts</h3>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Alert por defecto con información general
                      </AlertDescription>
                    </Alert>

                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Alert destructivo para errores o advertencias críticas
                      </AlertDescription>
                    </Alert>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-green-900">Éxito</p>
                          <p className="text-sm text-green-700 mt-1">Alert personalizado de éxito</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Información</p>
                          <p className="text-sm text-blue-700 mt-1">Alert personalizado informativo</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-yellow-900">Advertencia</p>
                          <p className="text-sm text-yellow-700 mt-1">Alert personalizado de advertencia</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ICONOGRAFÍA */}
          <TabsContent value="icons" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Sistema de Iconografía</h2>
              
              <div className="space-y-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Librería: Lucide React</p>
                  <p className="text-sm text-blue-700">
                    Todos los íconos utilizan la librería <code className="bg-blue-100 px-2 py-1 rounded">lucide-react</code>
                  </p>
                </div>

                {/* Tamaños */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tamaños de Íconos</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-4">
                      <User className="w-4 h-4 text-gray-700" />
                      <p className="text-sm text-gray-600 font-mono">w-4 h-4 (16px) - Íconos pequeños, inline</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <User className="w-5 h-5 text-gray-700" />
                      <p className="text-sm text-gray-600 font-mono">w-5 h-5 (20px) - Íconos estándar, botones</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <User className="w-6 h-6 text-gray-700" />
                      <p className="text-sm text-gray-600 font-mono">w-6 h-6 (24px) - Íconos destacados, cards</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <User className="w-10 h-10 text-gray-700" />
                      <p className="text-sm text-gray-600 font-mono">w-10 h-10 (40px) - Íconos grandes, progress</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <User className="w-12 h-12 text-gray-700" />
                      <p className="text-sm text-gray-600 font-mono">w-12 h-12 (48px) - Íconos en cards de selección</p>
                    </div>
                  </div>
                </div>

                {/* Íconos por Categoría */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Íconos por Categoría</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-4">Navegación y Acciones</p>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        <IconDemo icon={<ArrowRight />} name="ArrowRight" />
                        <IconDemo icon={<RotateCcw />} name="RotateCcw" />
                        <IconDemo icon={<HelpCircle />} name="HelpCircle" />
                        <IconDemo icon={<Settings />} name="Settings" />
                        <IconDemo icon={<Search />} name="Search" />
                        <IconDemo icon={<Filter />} name="Filter" />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-4">Estados y Feedback</p>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        <IconDemo icon={<CheckCircle2 />} name="CheckCircle2" color="text-green-600" />
                        <IconDemo icon={<Check />} name="Check" color="text-green-600" />
                        <IconDemo icon={<AlertCircle />} name="AlertCircle" color="text-yellow-600" />
                        <IconDemo icon={<Info />} name="Info" color="text-blue-600" />
                        <IconDemo icon={<X />} name="X" color="text-red-600" />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-4">Usuarios y Entidades</p>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        <IconDemo icon={<User />} name="User" color="text-blue-600" />
                        <IconDemo icon={<Building2 />} name="Building2" color="text-purple-600" />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-4">Acciones de Contenido</p>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        <IconDemo icon={<Upload />} name="Upload" />
                        <IconDemo icon={<Download />} name="Download" />
                        <IconDemo icon={<Edit />} name="Edit" />
                        <IconDemo icon={<Trash2 />} name="Trash2" color="text-red-600" />
                        <IconDemo icon={<Plus />} name="Plus" />
                        <IconDemo icon={<Minus />} name="Minus" />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-4">Ubicación</p>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        <IconDemo icon={<MapPin />} name="MapPin" color="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colores de Íconos */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Colores de Íconos</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Por Contexto</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" />
                            <code className="bg-white px-2 py-1 rounded">text-blue-600</code>
                            <span className="text-gray-600">- Persona Natural</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-purple-600" />
                            <code className="bg-white px-2 py-1 rounded">text-purple-600</code>
                            <span className="text-gray-600">- Persona Jurídica</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <code className="bg-white px-2 py-1 rounded">text-green-600</code>
                            <span className="text-gray-600">- Éxito</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <code className="bg-white px-2 py-1 rounded">text-yellow-600</code>
                            <span className="text-gray-600">- Advertencia</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <X className="w-5 h-5 text-red-600" />
                            <code className="bg-white px-2 py-1 rounded">text-red-600</code>
                            <span className="text-gray-600">- Error</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Neutrales</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-gray-600" />
                            <code className="bg-white px-2 py-1 rounded">text-gray-600</code>
                            <span className="text-gray-600">- Acciones generales</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-gray-500" />
                            <code className="bg-white px-2 py-1 rounded">text-gray-500</code>
                            <span className="text-gray-600">- Secundarios</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-gray-400" />
                            <code className="bg-white px-2 py-1 rounded">text-gray-400</code>
                            <span className="text-gray-600">- Deshabilitados</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* LAYOUT & SPACING */}
          <TabsContent value="layout" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Layout y Espaciado</h2>
              
              <div className="space-y-8">
                {/* Espaciado */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Sistema de Espaciado</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">Sistema de espaciado basado en múltiplos de 4px (0.25rem)</p>
                    <div className="space-y-3">
                      {[
                        { size: '1', px: '4px', rem: '0.25rem' },
                        { size: '2', px: '8px', rem: '0.5rem' },
                        { size: '3', px: '12px', rem: '0.75rem' },
                        { size: '4', px: '16px', rem: '1rem' },
                        { size: '6', px: '24px', rem: '1.5rem' },
                        { size: '8', px: '32px', rem: '2rem' },
                        { size: '12', px: '48px', rem: '3rem' },
                        { size: '16', px: '64px', rem: '4rem' },
                      ].map((space) => (
                        <div key={space.size} className="flex items-center gap-4">
                          <div className="w-20 flex-shrink-0">
                            <code className="text-sm bg-white px-2 py-1 rounded">{space.size}</code>
                          </div>
                          <div className="flex-1">
                            <div className="bg-blue-600 h-4" style={{ width: space.px }}></div>
                          </div>
                          <div className="w-32 text-sm text-gray-600 font-mono">
                            {space.px} / {space.rem}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gaps */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Gaps Comunes</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">gap-2 (8px)</p>
                      <p className="text-xs text-gray-600">Uso: Entre íconos y texto en botones</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">gap-3 (12px)</p>
                      <p className="text-xs text-gray-600">Uso: Entre elementos de un grupo relacionado</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">gap-4 (16px)</p>
                      <p className="text-xs text-gray-600">Uso: Grid de cards, elementos de lista</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">gap-6 (24px)</p>
                      <p className="text-xs text-gray-600">Uso: Cards internas, secciones</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">gap-8 (32px)</p>
                      <p className="text-xs text-gray-600">Uso: Secciones principales</p>
                    </div>
                  </div>
                </div>

                {/* Padding */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Padding Común en Componentes</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Botones</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Small: <code className="bg-white px-2 py-1 rounded">px-3 py-2 (h-8)</code></li>
                        <li>• Default: <code className="bg-white px-2 py-1 rounded">px-4 py-2 (h-9)</code></li>
                        <li>• Large: <code className="bg-white px-2 py-1 rounded">px-6 (h-10)</code></li>
                        <li>• Custom CTA: <code className="bg-white px-2 py-1 rounded">px-6 py-4</code></li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Cards</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Card estándar: <code className="bg-white px-2 py-1 rounded">p-6</code></li>
                        <li>• Card grande: <code className="bg-white px-2 py-1 rounded">p-8</code></li>
                        <li>• Card compacta: <code className="bg-white px-2 py-1 rounded">p-4</code></li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Inputs</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Input estándar: <code className="bg-white px-2 py-1 rounded">px-3 py-1 (h-9)</code></li>
                        <li>• Select personalizado: <code className="bg-white px-2 py-1 rounded">px-4 py-3</code></li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Contenedores</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Header: <code className="bg-white px-2 py-1 rounded">px-6 py-4</code></li>
                        <li>• Main content: <code className="bg-white px-2 py-1 rounded">px-6 py-8</code></li>
                        <li>• Progress bar: <code className="bg-white px-2 py-1 rounded">px-6 py-4</code></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Border Radius</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded"></div>
                      <div>
                        <p className="text-sm font-semibold">rounded (0.25rem / 4px)</p>
                        <p className="text-xs text-gray-600">Uso: Elementos muy pequeños</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-md"></div>
                      <div>
                        <p className="text-sm font-semibold">rounded-md (0.375rem / 6px)</p>
                        <p className="text-xs text-gray-600">Uso: Inputs, botones pequeños</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-lg"></div>
                      <div>
                        <p className="text-sm font-semibold">rounded-lg (0.5rem / 8px)</p>
                        <p className="text-xs text-gray-600">Uso: Botones, badges, elementos medianos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-xl"></div>
                      <div>
                        <p className="text-sm font-semibold">rounded-xl (0.75rem / 12px)</p>
                        <p className="text-xs text-gray-600">Uso: Cards, contenedores principales</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl"></div>
                      <div>
                        <p className="text-sm font-semibold">rounded-2xl (1rem / 16px)</p>
                        <p className="text-xs text-gray-600">Uso: Cards destacadas, hero sections</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="text-sm font-semibold">rounded-full</p>
                        <p className="text-xs text-gray-600">Uso: Badges, avatars, íconos circulares</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Max Width */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Anchos Máximos</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">max-w-2xl (672px)</p>
                      <p className="text-xs text-gray-600">Uso: Formularios, contenido de lectura</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">max-w-4xl (896px)</p>
                      <p className="text-xs text-gray-600">Uso: Contenedor principal del tour</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">max-w-7xl (1280px)</p>
                      <p className="text-xs text-gray-600">Uso: Header, contenedor global</p>
                    </div>
                  </div>
                </div>

                {/* Shadows */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Sombras</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-6">
                      <div className="w-24 h-24 bg-white shadow-sm rounded-xl"></div>
                      <div>
                        <p className="text-sm font-semibold">shadow-sm</p>
                        <p className="text-xs text-gray-600">Sombra sutil para elementos elevados levemente</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-6">
                      <div className="w-24 h-24 bg-white shadow-md rounded-xl"></div>
                      <div>
                        <p className="text-sm font-semibold">shadow-md</p>
                        <p className="text-xs text-gray-600">Cards seleccionadas, elementos destacados</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-6">
                      <div className="w-24 h-24 bg-white shadow-lg rounded-xl"></div>
                      <div>
                        <p className="text-sm font-semibold">shadow-lg</p>
                        <p className="text-xs text-gray-600">Cards de planes, elementos muy destacados</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* COMPONENTES COMPLEJOS */}
          <TabsContent value="components" className="space-y-8 mt-8">
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Componentes Complejos del Tour</h2>
              
              <div className="space-y-8">
                {/* Progress Bar */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Progress Bar (Barra de Progreso)</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                      {/* Simulación de progress bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className="flex flex-col items-center relative">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-green-500 text-white">
                              <Check className="w-5 h-5" />
                            </div>
                            <span className="text-xs mt-2 font-medium text-gray-900">Inicio</span>
                          </div>
                          <div className="flex-1 h-0.5 mx-2 relative -top-5">
                            <div className="h-full bg-green-500" />
                          </div>
                        </div>
                        <div className="flex items-center flex-1">
                          <div className="flex flex-col items-center relative">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-blue-600 text-white ring-4 ring-blue-100">
                              2
                            </div>
                            <span className="text-xs mt-2 font-medium text-gray-900">Perfil</span>
                          </div>
                          <div className="flex-1 h-0.5 mx-2 relative -top-5">
                            <div className="h-full bg-gray-200" />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex flex-col items-center relative">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-gray-200 text-gray-500">
                              3
                            </div>
                            <span className="text-xs mt-2 font-medium text-gray-400">Plan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-gray-700">Estados:</p>
                      <ul className="space-y-1 text-gray-600 ml-4">
                        <li>• <strong>Completado:</strong> <code className="bg-white px-2 py-1 rounded">bg-green-500 text-white</code> con ícono Check</li>
                        <li>• <strong>Actual:</strong> <code className="bg-white px-2 py-1 rounded">bg-blue-600 text-white ring-4 ring-blue-100</code></li>
                        <li>• <strong>Pendiente:</strong> <code className="bg-white px-2 py-1 rounded">bg-gray-200 text-gray-500</code></li>
                        <li>• <strong>Línea completada:</strong> <code className="bg-white px-2 py-1 rounded">bg-green-500</code></li>
                        <li>• <strong>Línea pendiente:</strong> <code className="bg-white px-2 py-1 rounded">bg-gray-200</code></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Header del Tour</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="bg-white border-b border-gray-200 rounded-lg overflow-hidden mb-4">
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-xl">K</span>
                            </div>
                            <div>
                              <h1 className="text-xl font-bold text-gray-900">Khipu</h1>
                              <p className="text-xs text-gray-500">Activación de cuenta</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <RotateCcw className="w-5 h-5" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <HelpCircle className="w-5 h-5" />
                              <span className="font-medium">Ayuda</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-gray-700">Estructura:</p>
                      <ul className="space-y-1 text-gray-600 ml-4">
                        <li>• Fondo: <code className="bg-white px-2 py-1 rounded">bg-white border-b border-gray-200</code></li>
                        <li>• Sticky: <code className="bg-white px-2 py-1 rounded">sticky top-0 z-40</code></li>
                        <li>• Logo: Gradiente <code className="bg-white px-2 py-1 rounded">from-blue-600 to-blue-700</code></li>
                        <li>• Título: <code className="bg-white px-2 py-1 rounded">text-xl font-bold</code></li>
                        <li>• Subtítulo: <code className="bg-white px-2 py-1 rounded">text-xs text-gray-500</code></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card de Selección de Persona */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Card de Selección (Persona Natural/Jurídica)</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <button className="p-6 rounded-xl border-2 border-blue-600 bg-blue-50 shadow-md transition-all text-left">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Persona Natural</h3>
                        <p className="text-sm text-gray-600">Para emprendedores y freelancers</p>
                        <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          Seleccionado
                        </div>
                      </button>
                      
                      <button className="p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-all text-left">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <Building2 className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Persona Jurídica</h3>
                        <p className="text-sm text-gray-600">Para empresas constituidas</p>
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-gray-700">Anatomía:</p>
                      <ul className="space-y-1 text-gray-600 ml-4">
                        <li>1. Contenedor de ícono circular con fondo de color</li>
                        <li>2. Título en font-semibold</li>
                        <li>3. Descripción en text-sm text-gray-600</li>
                        <li>4. Badge de selección (solo visible cuando está seleccionado)</li>
                        <li>5. Estados: border-blue-600 bg-blue-50 (seleccionado) vs border-gray-200 (normal)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Logo Khipu */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Logo Khipu</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-6 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">K</span>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">K</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-gray-700">Especificaciones:</p>
                      <ul className="space-y-1 text-gray-600 ml-4">
                        <li>• Gradiente: <code className="bg-white px-2 py-1 rounded">from-blue-600 to-blue-700</code></li>
                        <li>• Tamaño pequeño (header): <code className="bg-white px-2 py-1 rounded">w-10 h-10 rounded-lg</code></li>
                        <li>• Tamaño grande (hero): <code className="bg-white px-2 py-1 rounded">w-16 h-16 rounded-xl</code></li>
                        <li>• Letra: <code className="bg-white px-2 py-1 rounded">font-bold text-white</code></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTA Contacto */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">CTA de Contacto</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Tienes dudas?</h3>
                      <p className="text-gray-600 mb-6">
                        Nuestro equipo está aquí para ayudarte a elegir el mejor plan
                      </p>
                      <Button className="w-full md:w-auto">
                        <HelpCircle className="w-5 h-5" />
                        Contáctanos
                      </Button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-gray-700">Estructura:</p>
                      <ul className="space-y-1 text-gray-600 ml-4">
                        <li>• Fondo: <code className="bg-white px-2 py-1 rounded">bg-blue-50 border border-blue-200</code></li>
                        <li>• Padding: <code className="bg-white px-2 py-1 rounded">p-8</code></li>
                        <li>• Alineación: <code className="bg-white px-2 py-1 rounded">text-center</code></li>
                        <li>• Título: <code className="bg-white px-2 py-1 rounded">text-xl font-semibold</code></li>
                        <li>• Descripción: <code className="bg-white px-2 py-1 rounded">text-gray-600 mb-6</code></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transiciones */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Animaciones y Transiciones</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700 mb-2">Transiciones Estándar</p>
                        <ul className="space-y-1 text-gray-600 ml-4">
                          <li>• Botones y elementos interactivos: <code className="bg-white px-2 py-1 rounded">transition-all</code></li>
                          <li>• Solo colores: <code className="bg-white px-2 py-1 rounded">transition-colors</code></li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700 mb-2">Animación Fade In (custom)</p>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pb-12">
        <div className="bg-gray-800 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Guía de Implementación</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Tecnologías</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• React 18+</li>
                <li>• Tailwind CSS v4</li>
                <li>• Radix UI (componentes base)</li>
                <li>• Lucide React (íconos)</li>
                <li>• TypeScript</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Archivos Clave</h4>
              <ul className="space-y-1 text-gray-300 font-mono text-xs">
                <li>• /src/styles/theme.css (tokens de color)</li>
                <li>• /src/app/components/ui/* (componentes base)</li>
                <li>• /src/app/components/stages/* (componentes de etapas)</li>
                <li>• /src/app/components/OnboardingFlow.tsx (flujo principal)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function ColorCard({ name, hex, var: varName, description }: { name: string; hex: string; var: string; description: string }) {
  return (
    <div className="space-y-3">
      <div 
        className="h-24 rounded-lg shadow-md border border-gray-200" 
        style={{ backgroundColor: hex.startsWith('#') ? hex : `var(${varName})` }}
      ></div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{hex}</p>
        <p className="text-xs text-gray-500 mt-1 font-mono">{varName}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}

function IconDemo({ icon, name, color = "text-gray-700" }: { icon: React.ReactNode; name: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 ${color} flex items-center justify-center`}>
        {icon}
      </div>
      <p className="text-xs text-gray-600 text-center font-mono">{name}</p>
    </div>
  );
}
