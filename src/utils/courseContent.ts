export interface CourseModule {
  id: string
  title: string
  description: string
  week: number
  objectives: string[]
  topics: Topic[]
  activities: Activity[]
  estimatedTime: string
  resources: Resource[]
}

export interface Topic {
  id: string
  title: string
  content: string
  duration: string
  type: 'theory' | 'practice' | 'demo' | 'workshop'
}

export interface Activity {
  id: string
  title: string
  description: string
  type: 'exercise' | 'challenge' | 'workshop' | 'demo'
  estimatedTime: string
  instructions: string[]
}

export interface Resource {
  id: string
  title: string
  url: string
  type: 'video' | 'article' | 'tool' | 'documentation'
  description: string
}

export const courseModules: CourseModule[] = [
  {
    id: '1',
    title: 'Fundamentos del Ecosistema Digital',
    description: 'Entender la arquitectura básica de una aplicación y las piezas clave del desarrollo.',
    week: 1,
    objectives: [
      'Comprender el SDLC y la analogía de la receta',
      'Diferenciar Front-end, Back-end, Base de datos y API',
      'Entender hosting, dominio y DNS',
      'Dominar herramientas esenciales: Git/GitHub, DevTools'
    ],
    topics: [
      {
        id: '1.1',
        title: 'Introducción al SDLC y la analogía de la receta',
        content: 'El Software Development Life Cycle (SDLC) es como seguir una receta de cocina. Cada paso es importante y debe seguirse en orden para obtener el resultado deseado.',
        duration: '30 min',
        type: 'theory'
      },
      {
        id: '1.2',
        title: 'Front-end vs Back-end vs Base de datos vs API',
        content: 'Entendemos la arquitectura de una aplicación web como las diferentes partes de una casa: el frontend es la fachada, el backend son los cimientos, la base de datos es el almacén y las APIs son las puertas de comunicación.',
        duration: '45 min',
        type: 'theory'
      },
      {
        id: '1.3',
        title: 'Hosting, dominio y DNS en lenguaje cotidiano',
        content: 'Explicamos conceptos técnicos usando analogías del mundo real para que sean fáciles de entender.',
        duration: '30 min',
        type: 'theory'
      },
      {
        id: '1.4',
        title: 'Herramientas esenciales: Git/GitHub, DevTools y filosofías Serverless',
        content: 'Aprendemos las herramientas que todo desarrollador debe conocer para trabajar eficientemente.',
        duration: '60 min',
        type: 'practice'
      }
    ],
    activities: [
      {
        id: '1.1',
        title: 'Clonar un repositorio y crear un branch',
        description: 'Ejercicio práctico de Git y GitHub',
        type: 'exercise',
        estimatedTime: '45 min',
        instructions: [
          'Clona un repositorio de ejemplo desde GitHub',
          'Crea una nueva rama para tu trabajo',
          'Haz algunos cambios en el código',
          'Crea un Pull Request',
          'Solicita una revisión de código'
        ]
      },
      {
        id: '1.2',
        title: 'Inspeccionar con DevTools',
        description: 'Desafío de análisis web',
        type: 'challenge',
        estimatedTime: '30 min',
        instructions: [
          'Abre las herramientas de desarrollador en tu navegador',
          'Inspecciona la estructura de una web popular',
          'Identifica los elementos HTML principales',
          'Analiza los estilos CSS aplicados',
          'Revisa las peticiones de red'
        ]
      }
    ],
    estimatedTime: '3-4 horas',
    resources: [
      {
        id: '1.1',
        title: 'Git y GitHub para principiantes',
        url: 'https://git-scm.com/book/es/v2',
        type: 'documentation',
        description: 'Guía oficial de Git'
      },
      {
        id: '1.2',
        title: 'Chrome DevTools Tutorial',
        url: 'https://developers.google.com/web/tools/chrome-devtools',
        type: 'video',
        description: 'Tutorial oficial de Chrome DevTools'
      }
    ]
  },
  {
    id: '2',
    title: 'Mentalidad Productiva y Diseño de Producto',
    description: 'Pensar como PM y diseñar un producto mínimo viable antes de escribir código.',
    week: 2,
    objectives: [
      'Entender el rol del Product Manager',
      'Aprender herramientas de descubrimiento',
      'Crear un PRD ligero con historias de usuario',
      'Desarrollar habilidades básicas de UX/UI'
    ],
    topics: [
      {
        id: '2.1',
        title: '¿Qué hace un PM? "El Qué" vs "El Cómo"',
        content: 'El Product Manager se enfoca en el "qué" se debe construir, mientras que el equipo técnico se enfoca en el "cómo" implementarlo.',
        duration: '30 min',
        type: 'theory'
      },
      {
        id: '2.2',
        title: 'Herramientas de descubrimiento: entrevistas, encuestas y prototipos rápidos',
        content: 'Aprendemos técnicas para entender las necesidades reales de los usuarios antes de construir.',
        duration: '45 min',
        type: 'practice'
      },
      {
        id: '2.3',
        title: 'Creación de un PRD ligero con historias de usuario y criterios de aceptación',
        content: 'Documentamos los requerimientos de manera clara y estructurada.',
        duration: '60 min',
        type: 'workshop'
      },
      {
        id: '2.4',
        title: 'Bocetado y UX/UI básico: wireframes con papel y herramientas digitales',
        content: 'Creamos prototipos visuales para validar ideas rápidamente.',
        duration: '45 min',
        type: 'practice'
      }
    ],
    activities: [
      {
        id: '2.1',
        title: 'Taller de levantamiento de requerimientos',
        description: 'Entrevistar a un compañero para entender sus necesidades',
        type: 'workshop',
        estimatedTime: '60 min',
        instructions: [
          'Prepara preguntas abiertas sobre un problema específico',
          'Conduce una entrevista de 15 minutos',
          'Documenta los insights principales',
          'Identifica oportunidades de mejora',
          'Define el problema principal a resolver'
        ]
      },
      {
        id: '2.2',
        title: 'Prototipo de baja fidelidad',
        description: 'Crear wireframes en papel o Figma',
        type: 'exercise',
        estimatedTime: '45 min',
        instructions: [
          'Define las pantallas principales de tu aplicación',
          'Crea wireframes en papel o Figma',
          'Define el flujo de navegación',
          'Identifica los elementos clave de la interfaz',
          'Valida con un compañero'
        ]
      }
    ],
    estimatedTime: '3-4 horas',
    resources: [
      {
        id: '2.1',
        title: 'Product Requirements Document Template',
        url: 'https://www.atlassian.com/agile/product-management/requirements',
        type: 'documentation',
        description: 'Plantilla para crear PRDs'
      },
      {
        id: '2.2',
        title: 'Figma Tutorial',
        url: 'https://www.figma.com/education/',
        type: 'video',
        description: 'Tutorial oficial de Figma'
      }
    ]
  },
  {
    id: '3',
    title: 'Prototipado y Pruebas Tempranas',
    description: 'Validar hipótesis antes de construir, optimizar tiempo y recursos.',
    week: 3,
    objectives: [
      'Entender diferentes tipos de prototipos',
      'Aprender técnicas de test de usabilidad',
      'Distinguir métricas cualitativas vs cuantitativas',
      'Aplicar feedback para mejorar el producto'
    ],
    topics: [
      {
        id: '3.1',
        title: 'Tipos de prototipos: papel, clickable y funcional',
        content: 'Exploramos diferentes niveles de fidelidad en prototipos y cuándo usar cada uno.',
        duration: '30 min',
        type: 'theory'
      },
      {
        id: '3.2',
        title: 'Test de usabilidad y feedback estructurado',
        content: 'Aprendemos técnicas para obtener feedback valioso de los usuarios.',
        duration: '45 min',
        type: 'practice'
      },
      {
        id: '3.3',
        title: 'Métricas cualitativas vs cuantitativas de validación',
        content: 'Entendemos qué métricas usar para medir el éxito de nuestro producto.',
        duration: '30 min',
        type: 'theory'
      }
    ],
    activities: [
      {
        id: '3.1',
        title: 'Sesión de prueba de usabilidad',
        description: 'Probar el prototipo con 3 usuarios',
        type: 'workshop',
        estimatedTime: '90 min',
        instructions: [
          'Prepara un guión de prueba',
          'Recluta 3 usuarios objetivo',
          'Conduce sesiones de 15 minutos cada una',
          'Observa sin intervenir',
          'Documenta hallazgos clave'
        ]
      },
      {
        id: '3.2',
        title: 'Reporte de hallazgos',
        description: 'Analizar resultados y ajustar el PRD',
        type: 'exercise',
        estimatedTime: '60 min',
        instructions: [
          'Sintetiza los hallazgos principales',
          'Prioriza los problemas encontrados',
          'Propone soluciones específicas',
          'Actualiza el PRD con los cambios',
          'Define próximos pasos'
        ]
      }
    ],
    estimatedTime: '3-4 horas',
    resources: [
      {
        id: '3.1',
        title: 'Usability Testing Guide',
        url: 'https://www.nngroup.com/articles/usability-testing-101/',
        type: 'article',
        description: 'Guía completa de testing de usabilidad'
      },
      {
        id: '3.2',
        title: 'User Research Methods',
        url: 'https://www.interaction-design.org/literature/topics/user-research',
        type: 'documentation',
        description: 'Métodos de investigación de usuarios'
      }
    ]
  },
  {
    id: '4',
    title: 'Tu Kit de Herramientas IA y Desarrollo',
    description: 'Ejecutar y acelerar el desarrollo usando IA y servicios gestionados.',
    week: 4,
    objectives: [
      'Dominar LLMs y asistentes de código',
      'Configurar y usar Supabase',
      'Implementar despliegue con Vercel',
      'Aplicar principios de testing y accesibilidad'
    ],
    topics: [
      {
        id: '4.1',
        title: 'Introducción a LLMs y asistentes de código',
        content: 'Aprendemos a usar herramientas como v0.dev, lovable, Cursor para acelerar el desarrollo.',
        duration: '60 min',
        type: 'practice'
      },
      {
        id: '4.2',
        title: 'Configurar y usar Supabase (BaaS)',
        content: 'Implementamos una base de datos backend-as-a-service para nuestro proyecto.',
        duration: '45 min',
        type: 'practice'
      },
      {
        id: '4.3',
        title: 'Despliegue rápido con Vercel y CI/CD básico',
        content: 'Aprendemos a desplegar aplicaciones de forma automática y eficiente.',
        duration: '45 min',
        type: 'practice'
      },
      {
        id: '4.4',
        title: 'Principios básicos de testing y accesibilidad',
        content: 'Aseguramos la calidad y accesibilidad de nuestro código.',
        duration: '30 min',
        type: 'theory'
      }
    ],
    activities: [
      {
        id: '4.1',
        title: 'Generar estructura de UI con IA',
        description: 'Usar v0.dev para crear interfaces',
        type: 'exercise',
        estimatedTime: '60 min',
        instructions: [
          'Define los componentes principales de tu UI',
          'Escribe prompts específicos para v0.dev',
          'Genera 3 versiones diferentes',
          'Compara y selecciona la mejor opción',
          'Personaliza el código generado'
        ]
      },
      {
        id: '4.2',
        title: 'Implementar CRUD y testing',
        description: 'Crear operaciones básicas y tests',
        type: 'exercise',
        estimatedTime: '90 min',
        instructions: [
          'Implementa operaciones CRUD en Supabase',
          'Conecta el frontend con la base de datos',
          'Escribe 2 tests unitarios',
          'Escribe 1 test de integración',
          'Verifica la accesibilidad básica'
        ]
      }
    ],
    estimatedTime: '4-5 horas',
    resources: [
      {
        id: '4.1',
        title: 'v0.dev Documentation',
        url: 'https://v0.dev/docs',
        type: 'documentation',
        description: 'Documentación oficial de v0.dev'
      },
      {
        id: '4.2',
        title: 'Supabase Tutorial',
        url: 'https://supabase.com/docs/guides/getting-started',
        type: 'video',
        description: 'Tutorial oficial de Supabase'
      }
    ]
  },
  {
    id: '5',
    title: 'Construcción del MVP Paso a Paso',
    description: 'Completar y desplegar un MVP que muestre valor real.',
    week: 5,
    objectives: [
      'Configurar infraestructura completa',
      'Desarrollar UI funcional',
      'Implementar autenticación',
      'Desplegar y presentar el MVP'
    ],
    topics: [
      {
        id: '5.1',
        title: 'Infraestructura: repositorio GitHub, Supabase, Vercel',
        content: 'Configuramos todo el entorno de desarrollo y despliegue.',
        duration: '30 min',
        type: 'practice'
      },
      {
        id: '5.2',
        title: 'UI generada y conectada a datos',
        content: 'Desarrollamos la interfaz de usuario y la conectamos con la base de datos.',
        duration: '90 min',
        type: 'practice'
      },
      {
        id: '5.3',
        title: 'Autenticación básica y gestión de usuarios',
        content: 'Implementamos el sistema de autenticación y gestión de usuarios.',
        duration: '60 min',
        type: 'practice'
      },
      {
        id: '5.4',
        title: 'Flujo de edición y guardado en base de datos',
        content: 'Creamos las funcionalidades principales de la aplicación.',
        duration: '90 min',
        type: 'practice'
      },
      {
        id: '5.5',
        title: 'Deploy final y checklist de calidad',
        content: 'Desplegamos la aplicación y verificamos que todo funcione correctamente.',
        duration: '45 min',
        type: 'practice'
      }
    ],
    activities: [
      {
        id: '5.1',
        title: 'Demo interna del MVP',
        description: 'Presentar el MVP en 5 minutos',
        type: 'demo',
        estimatedTime: '30 min',
        instructions: [
          'Prepara una presentación de 5 minutos',
          'Demuestra las funcionalidades principales',
          'Explica los desafíos técnicos superados',
          'Recibe feedback de los compañeros',
          'Documenta las mejoras sugeridas'
        ]
      },
      {
        id: '5.2',
        title: 'Checklist de revisión por pares',
        description: 'Revisar el código de los compañeros',
        type: 'workshop',
        estimatedTime: '60 min',
        instructions: [
          'Revisa el código de 2 compañeros',
          'Verifica la calidad del código',
          'Comprueba la funcionalidad',
          'Proporciona feedback constructivo',
          'Documenta las mejoras necesarias'
        ]
      }
    ],
    estimatedTime: '6-8 horas',
    resources: [
      {
        id: '5.1',
        title: 'Vercel Deployment Guide',
        url: 'https://vercel.com/docs/deployments',
        type: 'documentation',
        description: 'Guía de despliegue en Vercel'
      },
      {
        id: '5.2',
        title: 'Code Review Best Practices',
        url: 'https://github.com/thoughtbot/guides/tree/main/code-review',
        type: 'article',
        description: 'Mejores prácticas para code review'
      }
    ]
  },
  {
    id: '6',
    title: 'Validación de Mercado y Siguientes Pasos',
    description: 'Aprender a medir impacto y planear el crecimiento.',
    week: 6,
    objectives: [
      'Entender OKRs y KPIs',
      'Implementar estrategias de feedback continuo',
      'Desarrollar habilidades de pitch',
      'Planificar el roadmap del producto'
    ],
    topics: [
      {
        id: '6.1',
        title: 'OKRs, KPIs y métricas de adopción',
        content: 'Aprendemos a medir el éxito de nuestro producto de manera objetiva.',
        duration: '45 min',
        type: 'theory'
      },
      {
        id: '6.2',
        title: 'Estrategias de feedback continuo y roadmap mínimo',
        content: 'Desarrollamos un plan para mantener el producto actualizado y relevante.',
        duration: '60 min',
        type: 'workshop'
      },
      {
        id: '6.3',
        title: 'Introducción al pitch y financiación ágil',
        content: 'Aprendemos a comunicar el valor de nuestro producto a inversores.',
        duration: '45 min',
        type: 'practice'
      }
    ],
    activities: [
      {
        id: '6.1',
        title: 'Definir OKRs para el MVP',
        description: 'Crear objetivos medibles para el producto',
        type: 'exercise',
        estimatedTime: '45 min',
        instructions: [
          'Define 2 OKRs principales para tu MVP',
          'Establece métricas específicas',
          'Define el timeline para cada objetivo',
          'Crea un plan de seguimiento',
          'Documenta las acciones necesarias'
        ]
      },
      {
        id: '6.2',
        title: 'Simulación de pitch',
        description: 'Presentar ante inversores en 2 minutos',
        type: 'demo',
        estimatedTime: '30 min',
        instructions: [
          'Prepara un pitch de 2 minutos',
          'Enfócate en el problema y la solución',
          'Demuestra el valor único',
          'Presenta métricas clave',
          'Recibe feedback de la audiencia'
        ]
      }
    ],
    estimatedTime: '3-4 horas',
    resources: [
      {
        id: '6.1',
        title: 'OKR Framework Guide',
        url: 'https://www.whatmatters.com/faqs/okr-meaning-definition-example/',
        type: 'article',
        description: 'Guía completa del framework OKR'
      },
      {
        id: '6.2',
        title: 'Pitch Deck Templates',
        url: 'https://www.slidesgo.com/pitch-deck',
        type: 'tool',
        description: 'Plantillas para presentaciones'
      }
    ]
  }
]

export const getModuleById = (id: string): CourseModule | undefined => {
  return courseModules.find(module => module.id === id)
}

export const getAllModules = (): CourseModule[] => {
  return courseModules
}

export const getModuleProgress = (moduleId: string, userProgress: any[]): number => {
  const progress = userProgress.find(p => p.module_id === moduleId)
  return progress?.progress_percentage || 0
}

export const isModuleCompleted = (moduleId: string, userProgress: any[]): boolean => {
  const progress = userProgress.find(p => p.module_id === moduleId)
  return progress?.completed || false
} 