/**
 * Base de datos local de guías técnicas de TechDoc UTS.
 *
 * Estructura de cada guía:
 *  id            — Identificador único
 *  title         — Título descriptivo del procedimiento
 *  category      — hardware | software | redes | impresoras
 *  description   — Resumen del problema y contexto
 *  whenToUse     — Array: situaciones en que aplica esta guía
 *  tools         — Array: herramientas y requisitos previos
 *  steps         — Array de pasos (ver estructura abajo)
 *  expectedResult— Qué ocurre si el procedimiento es exitoso
 *  possibleErrors— Array: errores comunes y sus soluciones
 *  recommendations — Array: buenas prácticas del técnico
 *  equipment     — Array: modelos de equipos aplicables
 *  relatedGuides — Array de IDs de guías relacionadas
 *  tags          — Array: palabras clave para búsqueda
 *  views         — Contador de consultas
 *  featured      — Si aparece en guías destacadas
 *  author        — Técnico que documentó la guía
 *  createdAt     — Fecha de creación (YYYY-MM-DD)
 *
 * Estructura de cada paso:
 *  n      — Número de paso
 *  action — Título corto de la acción
 *  how    — Instrucciones detalladas de cómo ejecutar
 *  why    — Justificación técnica del paso
 *  code   — Comando o código (null si no aplica)
 */

export const GUIDES = [
  {
    id: 'g001',
    title: 'Respaldo de información con ROBOCOPY',
    category: 'software',
    description:
      'Procedimiento para realizar copia de seguridad completa de los archivos del usuario antes de formateo, cambio de equipo o riesgo de pérdida de datos, usando el comando nativo de Windows.',
    whenToUse: [
      'Antes de formateo o reinstalación del sistema operativo',
      'Cuando hay riesgo de pérdida de datos por falla de disco duro',
      'Al cambiar de equipo y migrar datos al nuevo',
      'Cuando el usuario solicita copia de seguridad de sus carpetas personales',
    ],
    tools: [
      'CMD (Símbolo del sistema) ejecutado como Administrador',
      'Disco externo o USB con espacio suficiente para la copia',
      'Permisos de administrador local en el equipo',
      'Cable USB 3.0 recomendado para mayor velocidad de transferencia',
    ],
    steps: [
      {
        n: 1,
        action: 'Identificar la información a respaldar',
        how: 'Consultar con el usuario qué archivos necesita conservar. Revisar las carpetas: Documentos, Escritorio, Descargas, Imágenes, Videos y cualquier carpeta personalizada que el usuario indique.',
        why: 'Evita respaldar información innecesaria y garantiza que los datos críticos no se pierdan. El usuario conoce mejor su propia información.',
        code: null,
      },
      {
        n: 2,
        action: 'Conectar el disco externo al equipo',
        how: 'Insertar el disco externo por el puerto USB. Verificar en el Explorador de archivos que el sistema lo reconozca y anotar la letra de la unidad asignada (ejemplo: D:\\, E:\\).',
        why: 'Es el destino donde se almacenará la copia de seguridad. Confirmar la letra de unidad evita errores en el comando ROBOCOPY.',
        code: null,
      },
      {
        n: 3,
        action: 'Abrir CMD como Administrador',
        how: 'Presionar la tecla Windows → escribir "cmd" → clic derecho sobre "Símbolo del sistema" → seleccionar "Ejecutar como administrador" → confirmar en el UAC.',
        why: 'ROBOCOPY requiere permisos elevados para copiar archivos de sistema y carpetas con restricciones de acceso.',
        code: null,
      },
      {
        n: 4,
        action: 'Ejecutar el comando ROBOCOPY',
        how: 'Escribir el comando adaptando el nombre de usuario y la letra del disco destino. Reemplazar "NombreUsuario" con el nombre real de la carpeta del usuario.',
        why: 'ROBOCOPY copia archivos de manera eficiente incluyendo permisos NTFS y subcarpetas. Es más confiable que copiar y pegar manualmente y puede resumir si se interrumpe.',
        code: 'robocopy C:\\Users\\NombreUsuario D:\\Backup\\NombreUsuario /E /COPYALL /R:1 /W:1\n\n// /E       → Copia subcarpetas incluyendo las vacías\n// /COPYALL → Copia atributos y permisos NTFS\n// /R:1     → Reintenta 1 vez si un archivo falla\n// /W:1     → Espera 1 segundo entre reintentos',
      },
      {
        n: 5,
        action: 'Monitorear el progreso de la copia',
        how: 'Observar la salida en CMD. ROBOCOPY muestra el progreso archivo por archivo. Esperar hasta que aparezca el resumen final con el conteo de archivos copiados.',
        why: 'Permite detectar errores durante la transferencia y confirmar que el proceso avanza correctamente sin interrupciones.',
        code: null,
      },
      {
        n: 6,
        action: 'Verificar la copia en el disco externo',
        how: 'Abrir el Explorador de archivos → navegar al disco externo → verificar que las carpetas y archivos estén presentes. Comparar el tamaño total de la carpeta original con la copia.',
        why: 'Garantiza que el respaldo fue exitoso antes de proceder con cualquier proceso irreversible como el formateo.',
        code: null,
      },
    ],
    expectedResult:
      'Todas las carpetas y archivos del usuario quedan copiados en el disco externo con la estructura de directorios original. ROBOCOPY muestra un resumen sin errores críticos (el error 2 o 5 en archivos del sistema es normal y puede ignorarse).',
    possibleErrors: [
      'Acceso denegado (Error 5): CMD no fue abierto como administrador. Cerrar y reabrir con permisos elevados.',
      'Ruta incorrecta (Error 2): El nombre de usuario está mal escrito. Verificar la ruta exacta en el Explorador antes de ejecutar.',
      'Disco sin espacio: El disco externo no tiene espacio suficiente. Usar otro disco o eliminar archivos innecesarios del destino.',
      'Dispositivo no reconocido: Probar otro puerto USB o verificar que el disco esté formateado en NTFS o FAT32.',
    ],
    recommendations: [
      'Verificar el espacio disponible en el disco externo antes de iniciar',
      'Preferir puertos USB 3.0 (color azul) para mayor velocidad de transferencia',
      'Documentar qué se respaldó y la fecha en el ticket GLPI',
      'Pedir al usuario que valide su información antes de cerrar el caso',
    ],
    equipment: [
      'HP All-in-One 440 G9 (81S76LS)',
      'Lenovo V530 All-in-One',
      'Lenovo V520s',
      'HP Compaq Pro 6300 Small',
      'Lenovo ThinkCentre M73',
      'HP ZBook X G1i 16"',
    ],
    relatedGuides: ['g004', 'g005'],
    tags: ['robocopy', 'backup', 'respaldo', 'migración', 'datos', 'CMD', 'formateo'],
    views: 47,
    featured: true,
    author: 'Soporte Técnico UTS',
    createdAt: '2025-01-15',
  },

  {
    id: 'g002',
    title: 'Configurar impresora HP LaserJet por red',
    category: 'impresoras',
    description:
      'Procedimiento para agregar e instalar impresoras HP LaserJet Pro (MFP 4103fdw, MFP M281fdw, P1606dn) en equipos con Windows usando conexión de red institucional.',
    whenToUse: [
      'Cuando el usuario no puede imprimir porque la impresora no está configurada',
      'Al reinstalar el sistema operativo en un equipo existente',
      'Al incorporar un equipo nuevo a la institución',
      'Cuando el usuario cambia de oficina y necesita conectarse a otra impresora de red',
    ],
    tools: [
      'Equipo con Windows 10/11 conectado a la red institucional',
      'Dirección IP de la impresora (ver en el panel de la impresora)',
      'Permisos de administrador en el equipo',
      'Driver HP (se descarga de hp.com/support si Windows no lo instala automáticamente)',
    ],
    steps: [
      {
        n: 1,
        action: 'Obtener la dirección IP de la impresora',
        how: 'En el panel de la impresora HP: Menú → Configuración de red → Ver dirección IP. Alternativa: imprimir página de configuración desde Menú → Informes → Configuración de red.',
        why: 'La IP es el identificador único de la impresora en la red. Sin ella no es posible agregar la impresora correctamente.',
        code: null,
      },
      {
        n: 2,
        action: 'Verificar conectividad de red con la impresora',
        how: 'Abrir CMD y ejecutar ping hacia la IP de la impresora. Confirmar que responda con los 4 paquetes.',
        why: 'Antes de instalar, confirmar que el equipo puede "ver" la impresora. Si no responde al ping hay un problema de red que debe resolverse primero.',
        code: 'ping 192.168.1.XXX\n// Reemplazar XXX con la IP real de la impresora\n\n// Resultado esperado:\n// Respuesta desde 192.168.1.XXX: bytes=32 tiempo=1ms TTL=64\n// Estadísticas: enviados=4, recibidos=4, perdidos=0 (0%)',
      },
      {
        n: 3,
        action: 'Abrir el asistente para agregar impresora',
        how: 'Ir a Inicio → Configuración → Bluetooth y dispositivos → Impresoras y escáneres → Agregar dispositivo. Si no aparece automáticamente, hacer clic en "Agregar manualmente".',
        why: 'Windows puede detectar impresoras en la red automáticamente si están en el mismo segmento de red.',
        code: null,
      },
      {
        n: 4,
        action: 'Agregar impresora por dirección TCP/IP',
        how: 'Seleccionar "Agregar una impresora usando una dirección TCP/IP o nombre de host" → ingresar la IP → Siguiente → esperar detección del puerto → Windows instala el driver automáticamente.',
        why: 'El método TCP/IP es el más confiable para impresoras de red en entornos institucionales donde la IP es estática.',
        code: null,
      },
      {
        n: 5,
        action: 'Instalar el driver correcto si es necesario',
        how: 'Si Windows no encuentra el driver: ir a hp.com/support → buscar el modelo exacto → descargar driver para Windows → ejecutar el instalador → seleccionar "Instalación básica de controladores".',
        why: 'El driver correcto garantiza todas las funciones de la impresora: calidad de impresión, bandeja de papel y escáner en los modelos MFP.',
        code: null,
      },
      {
        n: 6,
        action: 'Realizar impresión de prueba',
        how: 'Impresoras y escáneres → clic en la impresora instalada → Administrar → Imprimir página de prueba. Verificar que la página salga correctamente.',
        why: 'Confirma que toda la instalación fue exitosa y que el equipo se comunica correctamente con la impresora.',
        code: null,
      },
    ],
    expectedResult:
      'La impresora aparece en la lista de dispositivos de Windows, el usuario puede imprimir desde cualquier aplicación y la página de prueba se imprime sin problemas.',
    possibleErrors: [
      'Impresora no detectada (ping sin respuesta): Verificar que esté encendida y conectada al switch. Revisar cable de red.',
      'Driver no compatible: Descargar el driver oficial desde hp.com/support para el modelo exacto.',
      'Error de puerto TCP/IP: Eliminar la impresora, volver a agregar ingresando la IP correcta.',
      'Impresora aparece sin conexión: Cola de impresión → Impresora → Desactivar "Usar impresora sin conexión".',
      'Solo imprime en algunos equipos: Verificar mismo segmento de red. Puerto TCP 9100 no debe estar bloqueado.',
    ],
    recommendations: [
      'Solicitar al área de redes IP estática para cada impresora para evitar cambios de dirección',
      'Documentar la IP de cada impresora y su ubicación en el ticket GLPI',
      'Para modelos MFP, instalar software completo de HP para habilitar la función de escáner',
      'Verificar el nivel de tóner antes de la prueba de impresión',
    ],
    equipment: [
      'HP LaserJet Pro MFP 4103fdw',
      'HP LaserJet Pro MFP M281fdw',
      'HP LaserJet Pro P1606dn',
    ],
    relatedGuides: ['g003', 'g006'],
    tags: ['impresora', 'HP', 'red', 'TCP/IP', 'driver', 'LaserJet', 'MFP'],
    views: 63,
    featured: true,
    author: 'Soporte Técnico UTS',
    createdAt: '2025-01-20',
  },

  {
    id: 'g003',
    title: 'Diagnóstico de red: ping, tracert e ipconfig',
    category: 'redes',
    description:
      'Procedimiento para diagnosticar problemas de conectividad usando herramientas nativas de Windows. Permite identificar si el problema está en el equipo, el switch o en niveles superiores antes de escalar al área de redes.',
    whenToUse: [
      'Cuando un equipo reporta "sin internet" o "sin conexión a la red"',
      'Cuando una aplicación no puede conectarse a un servidor institucional',
      'Cuando la conexión es intermitente o muy lenta',
      'Antes de escalar al área de redes, para reportar con datos concretos',
    ],
    tools: [
      'CMD (Símbolo del sistema)',
      'Cable de red para verificación física',
      'Acceso al equipo afectado',
    ],
    steps: [
      {
        n: 1,
        action: 'Verificar la conexión física del cable de red',
        how: 'Inspeccionar que el cable RJ45 esté correctamente conectado al equipo y al punto de red o switch. Verificar que el LED del puerto de red del equipo esté encendido (naranja o verde).',
        why: 'Muchos problemas de red son simplemente un cable desconectado o dañado. Siempre empezar por lo más básico antes de usar comandos.',
        code: null,
      },
      {
        n: 2,
        action: 'Verificar la configuración IP del equipo',
        how: 'Presionar Win+R → escribir "cmd" → Enter. Ejecutar ipconfig y revisar: Dirección IPv4, Máscara de subred, Puerta de enlace predeterminada y DNS.',
        why: 'Determina si el equipo tiene una IP válida. Si muestra 169.254.x.x (IP APIPA) indica que el equipo no está recibiendo dirección del servidor DHCP.',
        code: 'ipconfig\n\n// Resultado normal (IP válida):\n// Dirección IPv4. . . . . : 192.168.X.X\n// Máscara de subred . . . : 255.255.255.0\n// Puerta de enlace pred. : 192.168.X.1\n\n// Resultado con problema:\n// Dirección IPv4. . . . . : 169.254.X.X  ← IP APIPA (sin DHCP)',
      },
      {
        n: 3,
        action: 'Hacer ping al Gateway (Puerta de enlace)',
        how: 'Usar la dirección de Gateway que mostró ipconfig y ejecutar el ping. Analizar el tiempo de respuesta y el porcentaje de pérdida de paquetes.',
        why: 'Si el gateway responde, el equipo tiene conexión local a la red. Si no responde, el problema está entre el equipo y el switch o router más cercano.',
        code: 'ping 192.168.1.1\n// Usar la IP real del gateway de tu red\n\n// Si responde → conexión local OK\n// Si no responde → problema en red local o cable',
      },
      {
        n: 4,
        action: 'Hacer ping a un servidor externo',
        how: 'Ejecutar ping al servidor DNS de Google (8.8.8.8). Si el gateway respondió pero este no, el problema está en la salida a internet.',
        why: 'Confirma si hay conectividad hacia internet. El 8.8.8.8 de Google es siempre accesible cuando hay conexión a internet.',
        code: 'ping 8.8.8.8\n\n// Si responde → hay acceso a internet\n// Si no responde (pero gateway sí) → problema de routing o firewall\n// Si nada responde → problema local en equipo o switch',
      },
      {
        n: 5,
        action: 'Ejecutar tracert para rastrear la ruta',
        how: 'Ejecutar tracert hacia Google. Analizar en qué "salto" (hop) se pierde la conexión. El primer salto siempre debe ser el gateway local.',
        why: 'Tracert muestra el camino completo que sigue la conexión hasta el destino. Identifica exactamente en qué punto de la red falla la comunicación.',
        code: 'tracert 8.8.8.8\n\n// Salto 1: Gateway local (192.168.x.x)\n// Salto 2-3: Red institucional / ISP\n// Salto 4+: Internet (si falla aquí es problema externo)\n\n// Los asteriscos (***) indican que el dispositivo no responde a ICMP',
      },
      {
        n: 6,
        action: 'Liberar y renovar IP si es APIPA',
        how: 'Si ipconfig mostró IP 169.254.x.x ejecutar los comandos de renovación en secuencia. Esperar entre cada uno.',
        why: 'Fuerza al equipo a solicitar una nueva dirección IP al servidor DHCP. Resuelve problemas de IP no asignada sin necesidad de reiniciar el equipo.',
        code: 'ipconfig /release\n// Esperar 3 segundos\n\nipconfig /renew\n// Esperar que asigne IP nueva\n\nipconfig\n// Verificar que ahora tenga IP válida (192.168.x.x)',
      },
      {
        n: 7,
        action: 'Documentar y escalar si es necesario',
        how: 'Si los pasos anteriores no resuelven el problema, documentar: IP del equipo, resultado del ping al gateway, resultado del tracert y número del punto de red. Reportar al área de redes.',
        why: 'El área de redes necesita datos precisos para resolver más rápido. Reportar con evidencia evita idas y venidas innecesarias entre áreas.',
        code: null,
      },
    ],
    expectedResult:
      'Se identifica en qué capa está el problema de red (física, local o internet). Si es problema físico o de IP se resuelve en el momento. Si es de infraestructura, se escala al área de redes con información precisa.',
    possibleErrors: [
      'Ping al gateway no responde: Verificar cable físico, reiniciar el adaptador de red en Administrador de dispositivos.',
      'IP APIPA (169.254.x.x): Problema con DHCP. Ejecutar ipconfig /release y /renew. Verificar cable y puerto del switch.',
      'Tracert muestra *** en todos los saltos: El firewall puede bloquear ICMP. Probar con ping primero para confirmar.',
      'Ping a 8.8.8.8 funciona pero no abre páginas web: Problema de DNS. Ejecutar: ipconfig /flushdns',
    ],
    recommendations: [
      'Anotar el número del punto de red (roseta) antes de llamar al área de redes',
      'Guardar capturas de pantalla de los resultados para el ticket GLPI',
      'Si varios equipos de la misma área fallan, es problema del switch o del segmento de red',
      'El comando "ping -t" hace ping continuo — útil para detectar intermitencias',
    ],
    equipment: [
      'HP All-in-One 440 G9 (81S76LS)',
      'Lenovo V530 All-in-One',
      'HP Compaq Pro 6300 Small',
      'HP ZBook X G1i 16"',
    ],
    relatedGuides: ['g002', 'g004'],
    tags: ['red', 'ping', 'tracert', 'ipconfig', 'diagnóstico', 'CMD', 'conectividad', 'DHCP'],
    views: 89,
    featured: true,
    author: 'Soporte Técnico UTS',
    createdAt: '2025-02-01',
  },

  {
    id: 'g004',
    title: 'Añadir equipo al dominio de la institución',
    category: 'redes',
    description:
      'Procedimiento para unir un equipo Windows al dominio institucional de la UTS, permitiendo al usuario autenticarse con sus credenciales corporativas y recibir las políticas de grupo (GPO).',
    whenToUse: [
      'Al instalar un equipo nuevo en la institución',
      'Al reinstalar Windows y el equipo sale del dominio',
      'Cuando el equipo muestra "No se puede iniciar sesión con cuenta del dominio"',
    ],
    tools: [
      'Equipo con Windows 10/11 Pro, Education o Enterprise (no funciona en Home)',
      'Conexión a la red institucional por cable LAN',
      'Nombre del dominio institucional (preguntar al área de sistemas)',
      'Credenciales de administrador del dominio',
    ],
    steps: [
      {
        n: 1,
        action: 'Verificar conexión a la red institucional',
        how: 'El equipo DEBE estar conectado por cable LAN. No es posible unir al dominio por WiFi en la mayoría de configuraciones. Verificar con ping al servidor de dominio.',
        why: 'El dominio requiere comunicación constante con el controlador de dominio. Sin conexión LAN activa el proceso fallará.',
        code: 'ping nombre-servidor-dominio\n// O ping a la IP del controlador de dominio\n// Debe responder para poder continuar el proceso',
      },
      {
        n: 2,
        action: 'Abrir configuración del sistema',
        how: 'Clic derecho en "Este equipo" → Propiedades → "Configuración avanzada del sistema" → pestaña "Nombre de equipo" → clic en "Cambiar".',
        why: 'Desde aquí se puede cambiar el nombre del equipo y unirlo al dominio en un mismo paso.',
        code: null,
      },
      {
        n: 3,
        action: 'Asignar nombre correcto al equipo',
        how: 'Establecer el nombre según la convención institucional (ejemplo: UTS-OF101-PC01). El nombre debe ser único en todo el dominio.',
        why: 'Un nombre descriptivo facilita la administración remota e identificación del equipo en el Active Directory.',
        code: null,
      },
      {
        n: 4,
        action: 'Unir el equipo al dominio',
        how: 'En "Miembro de" seleccionar "Dominio" → ingresar el nombre del dominio institucional → clic en Aceptar → ingresar credenciales de administrador del dominio → esperar la confirmación de bienvenida.',
        why: 'Las credenciales de administrador autorizan que el nuevo equipo sea registrado en el Active Directory de la organización.',
        code: null,
      },
      {
        n: 5,
        action: 'Reiniciar el equipo',
        how: 'Clic en Aceptar en el mensaje de bienvenida al dominio → cerrar todas las ventanas → reiniciar inmediatamente.',
        why: 'El reinicio es obligatorio para que los cambios de dominio surtan efecto. No omitir ni posponer este paso.',
        code: null,
      },
      {
        n: 6,
        action: 'Verificar inicio de sesión con cuenta del dominio',
        how: 'En la pantalla de login verificar que diga "Iniciar sesión en: DOMINIO". Ingresar credenciales del usuario. Si pide dominio explícito usar el formato: DOMINIO\\usuario.',
        why: 'Confirma que el equipo quedó correctamente unido y que el usuario puede autenticarse con sus credenciales institucionales.',
        code: null,
      },
    ],
    expectedResult:
      'El equipo aparece registrado en el Active Directory del dominio, el usuario inicia sesión con sus credenciales institucionales y las políticas de grupo (GPO) se aplican automáticamente.',
    possibleErrors: [
      'No se puede contactar el dominio: Verificar conexión por cable LAN. El WiFi puede no tener acceso al controlador de dominio.',
      'Credenciales rechazadas: Confirmar el nombre exacto del dominio y que las credenciales sean de un administrador del dominio.',
      'Nombre de equipo duplicado: Cambiar el nombre antes de unir al dominio.',
      'Windows Home no soporta dominios: El equipo debe tener Windows 10/11 Pro, Education o Enterprise.',
    ],
    recommendations: [
      'Registrar nombre del equipo y fecha de unión al dominio en el ticket GLPI',
      'Coordinar con el área de sistemas el nombre correcto y la OU donde debe quedar el equipo',
      'Verificar que las políticas GPO se apliquen correctamente: ejecutar gpresult /r en CMD como administrador',
    ],
    equipment: [
      'HP All-in-One 440 G9 (81S76LS)',
      'Lenovo V530 All-in-One',
      'Lenovo V520s',
      'HP ZBook X G1i 16"',
    ],
    relatedGuides: ['g003', 'g001'],
    tags: ['dominio', 'Active Directory', 'Windows', 'GPO', 'red', 'autenticación'],
    views: 34,
    featured: false,
    author: 'Soporte Técnico UTS',
    createdAt: '2025-02-10',
  },

  {
    id: 'g005',
    title: 'Cambio de tóner en impresoras HP LaserJet',
    category: 'impresoras',
    description:
      'Procedimiento para reemplazar el cartucho de tóner en las impresoras HP LaserJet Pro del inventario institucional: MFP 4103fdw, MFP M281fdw y P1606dn.',
    whenToUse: [
      'Cuando la impresora muestra alerta de "tóner bajo" o "reemplazar tóner"',
      'Cuando las impresiones salen con manchas, rayas o áreas sin tóner',
      'Cuando el panel indica nivel de tóner crítico o en rojo',
    ],
    tools: [
      'Cartucho de tóner original HP compatible con el modelo exacto',
      'Papel periódico o bolsa para depositar el cartucho usado',
      'Guantes de nitrilo (opcional pero recomendado)',
      'Paño limpio y seco',
    ],
    steps: [
      {
        n: 1,
        action: 'Identificar el cartucho correcto para el modelo',
        how: 'Verificar en la etiqueta de la impresora o en su panel el número de referencia del tóner:\n• HP MFP 4103fdw → HP 58A (CF258A) o 58X alta capacidad\n• HP M281fdw → HP 203A (CF540A) o 203X\n• HP P1606dn → HP 78A (CE278A)',
        why: 'Usar el cartucho incorrecto puede dañar la impresora o producir impresiones deficientes. Verificar siempre antes de abrir el empaque.',
        code: null,
      },
      {
        n: 2,
        action: 'Apagar la impresora y esperar',
        how: 'Apagar usando el botón de encendido. Esperar 3-5 minutos si la impresora estuvo en uso reciente antes de abrir la cubierta.',
        why: 'Evita daños electrónicos durante el cambio. El fusor opera a alta temperatura (hasta 200°C) — esperar que se enfríe evita quemaduras.',
        code: null,
      },
      {
        n: 3,
        action: 'Retirar el cartucho de tóner usado',
        how: 'Abrir la compuerta frontal → tomar el cartucho por el asa → jalarlo hacia afuera con movimiento firme y recto → depositarlo inmediatamente en la bolsa del empaque del cartucho nuevo.',
        why: 'El tóner es polvo fino que mancha con facilidad. Guardarlo inmediatamente evita contaminar el área de trabajo.',
        code: null,
      },
      {
        n: 4,
        action: 'Preparar el cartucho nuevo',
        how: 'Retirar el cartucho nuevo de su empaque → agitarlo suavemente de lado a lado 5-6 veces con movimiento horizontal → retirar la cinta selladora jalando la lengüeta hacia afuera.',
        why: 'Agitar el tóner redistribuye el polvo uniformemente para garantizar impresiones homogéneas desde la primera hoja.',
        code: null,
      },
      {
        n: 5,
        action: 'Insertar el cartucho nuevo',
        how: 'Alinear el cartucho con las guías del compartimento → insertarlo con movimiento firme hasta escuchar el clic de encaje → cerrar la cubierta frontal completamente.',
        why: 'El encaje correcto garantiza que el cartucho gire correctamente durante la impresión y no cause atascos de papel.',
        code: null,
      },
      {
        n: 6,
        action: 'Encender y hacer página de prueba',
        how: 'Encender la impresora → esperar que complete el proceso de inicio (1-2 minutos) → imprimir página de prueba desde el panel de control.',
        why: 'Confirma que el cartucho quedó correctamente instalado y que la impresión sale sin manchas ni rayas.',
        code: null,
      },
    ],
    expectedResult:
      'La impresora imprime con calidad óptima, sin manchas, rayas ni áreas vacías. El panel de la impresora indica el nivel de tóner como "Nuevo" o al máximo.',
    possibleErrors: [
      'Impresión con rayas verticales: El tóner no fue agitado correctamente. Retirar y agitar de nuevo antes de reinsertar.',
      'Mensaje "Cartucho no reconocido": Verificar que sea el modelo correcto para esa impresora. Retirar y reinsertar firmemente.',
      'Tóner derramado: Usar paño seco para limpiar. NO usar agua (el tóner es soluble en calor, no en agua fría).',
      'Cubierta no cierra correctamente: El cartucho no está alineado. Retirarlo completamente y reinsertar.',
    ],
    recommendations: [
      'Registrar el cambio en el inventario de consumibles de la institución',
      'Disponer el cartucho usado en el programa de reciclaje gratuito de HP',
      'Para el MFP 4103fdw, preferir HP 58X (alta capacidad) para mayor rendimiento',
      'Mantener siempre un cartucho de repuesto en bodega para evitar interrupciones',
    ],
    equipment: [
      'HP LaserJet Pro MFP 4103fdw',
      'HP LaserJet Pro MFP M281fdw',
      'HP LaserJet Pro P1606dn',
    ],
    relatedGuides: ['g002', 'g006'],
    tags: ['tóner', 'HP', 'LaserJet', 'impresora', 'mantenimiento', 'consumibles'],
    views: 28,
    featured: false,
    author: 'Soporte Técnico UTS',
    createdAt: '2025-02-15',
  },

  {
    id: 'g006',
    title: 'Configurar carpeta compartida para escanear desde HP MFP',
    category: 'impresoras',
    description:
      'Procedimiento para configurar la función "Escanear a carpeta de red" en las impresoras HP LaserJet MFP 4103fdw y M281fdw, de modo que el documento escaneado llegue automáticamente al equipo del usuario.',
    whenToUse: [
      'Cuando el usuario necesita escanear documentos directamente a su PC sin cable USB',
      'Al configurar una impresora MFP nueva en la red institucional',
      'Al reinstalar un equipo y restaurar la funcionalidad de escaneo',
    ],
    tools: [
      'Impresora HP LaserJet MFP 4103fdw o M281fdw conectada a la red',
      'Equipo destino con Windows 10/11 en la red institucional',
      'Dirección IP de la impresora',
      'Dirección IP del equipo destino (obtener con ipconfig)',
      'Permisos de administrador en el equipo destino',
    ],
    steps: [
      {
        n: 1,
        action: 'Crear y compartir la carpeta de destino',
        how: 'En el equipo destino crear una carpeta (ejemplo: C:\\Escaneos). Clic derecho → Propiedades → pestaña Compartir → Uso compartido avanzado → Activar compartir → Permisos: "Todos" con lectura y escritura → Aceptar.',
        why: 'La impresora necesita acceder a esta carpeta de red para depositar los archivos escaneados. Debe tener permisos de escritura habilitados.',
        code: null,
      },
      {
        n: 2,
        action: 'Obtener los datos de red del equipo destino',
        how: 'Abrir CMD en el equipo destino y ejecutar ipconfig. Anotar la Dirección IPv4 del equipo, el nombre de la carpeta compartida y las credenciales de Windows.',
        why: 'La impresora usará estos datos para conectarse al equipo y guardar los archivos escaneados en la carpeta correcta.',
        code: 'ipconfig\n// Anotar la Dirección IPv4: 192.168.X.X\n\n// La ruta de red de la carpeta será:\n// \\\\192.168.X.X\\Escaneos',
      },
      {
        n: 3,
        action: 'Acceder al servidor web embebido de la impresora (EWS)',
        how: 'Abrir el navegador en cualquier equipo → escribir la IP de la impresora en la barra de direcciones (ejemplo: http://192.168.1.XXX) → presionar Enter para acceder al panel de administración web.',
        why: 'El servidor web embebido (EWS) permite configurar la impresora directamente desde el navegador sin software adicional.',
        code: null,
      },
      {
        n: 4,
        action: 'Configurar el destino de escaneo en el EWS',
        how: 'En el EWS ir a: Escanear → Escanear a carpeta de red → Nueva. Completar: Nombre del acceso directo, Ruta de la carpeta (\\\\IP\\Escaneos), usuario y contraseña de Windows del equipo destino. Guardar configuración.',
        why: 'Este acceso directo aparecerá en el panel de la impresora para que el usuario simplemente pulse "Escanear" sin configurar nada cada vez.',
        code: null,
      },
      {
        n: 5,
        action: 'Probar el escaneo desde la impresora',
        how: 'Ir a la impresora → colocar documento en el alimentador → en el panel táctil seleccionar "Escanear" → elegir la carpeta configurada → pulsar Enviar. Verificar que el archivo llegue al equipo destino.',
        why: 'Confirma que toda la configuración es correcta y que el usuario puede usar la función de escaneo de forma autónoma.',
        code: null,
      },
    ],
    expectedResult:
      'Al seleccionar "Escanear a carpeta" en el panel de la impresora, el documento escaneado llega automáticamente en formato PDF o JPG a la carpeta del equipo del usuario.',
    possibleErrors: [
      'Error de autenticación: Las credenciales de Windows ingresadas en el EWS son incorrectas. Verificar usuario y contraseña del equipo destino.',
      'Carpeta no encontrada: La ruta de red está mal escrita o la carpeta no está compartida. Verificar la ruta desde otro equipo.',
      'Acceso denegado: Los permisos de la carpeta compartida no incluyen escritura. Agregar permiso de escritura.',
      'La IP del equipo cambió: Si el equipo tiene IP dinámica la dirección puede cambiar. Solicitar IP estática al área de redes.',
    ],
    recommendations: [
      'Solicitar al área de redes IP estática para el equipo destino del escaneo',
      'Crear la carpeta de escaneo en un disco con suficiente espacio libre',
      'Configurar el formato de escaneo en PDF para mejor compatibilidad',
      'Capacitar al usuario en cómo usar la función desde el panel de la impresora',
    ],
    equipment: [
      'HP LaserJet Pro MFP 4103fdw',
      'HP LaserJet Pro MFP M281fdw',
    ],
    relatedGuides: ['g002', 'g005'],
    tags: ['escaneo', 'carpeta compartida', 'MFP', 'HP', 'red', 'SMB', 'EWS'],
    views: 19,
    featured: false,
    author: 'Soporte Técnico UTS',
    createdAt: '2025-03-01',
  },
]
