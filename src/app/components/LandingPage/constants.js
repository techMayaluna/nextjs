export const navLinks = [
  {
    title: "Inicio",
    ref: "#",
  },
  {
    title: "Servicios",
    ref: "#services",
  },
  {
    title: "Cotizador",
    ref: "#calculator",
  },
  {
    title: "Politica",
    ref: "/politica",
  }
];

export const cardInfo = [
  {
    icon: "/risk.png",
    title: "Evaluación de Riesgos",
    description:
      "Le ayudamos a identificar peligros potenciales y factores de riesgo que pueden causar daño. Analizamos y evaluamos el riesgo asociado con ese peligro.",
  },
  {
    icon: "/strategia-proyectos.png",
    title: "Seguros Para Proyectos",
    description:
      "Un proyecto es una entidad independiente de tiempo limitado que normalmente incluye maquinaria, edificios e infraestructura.",
  },
  {
    icon: "/Riesgos-ambientales.png",
    title: "Seguros Para Propiedades",
    description:
      "Proteja sus propiedades contra la mayoría de los riesgos que puedan ocurrir, como incendios, robos y algunos daños causados ​​por el clima.",
  },
  {
    icon: "/seguros-carros.png",
    title: "Automóviles",
    description:
      "Poliza que cubre los siniestros que pueda sufrir su vehiculo tales como: Hurto y/o daños del vehículo, Responsabilidad Civil extra contractual, Gastos de Transporte/Asistencia al vehículo y más.",
  },
  {
    icon: "/seguro-de-vida-mayaluna.png",
    title: "Seguro de vida",
    description:
      "Todos merecen un futuro financiero seguro, y es por eso que los seguros de vida son tan importantes. Podemos ayudarlo a brindar tranquilidad financiera a su familia.",
  },
  {
    icon: "/seguro-de-identidad.png",
    title: "Protección contra robo de identidad",
    description:
      "Mantenga sus datos e identidad seguros. Sus datos son un activo valioso y nos aseguraremos de que estén protegidos.",
  },
];

export const servicesInfo = [
  {
    title: "ARL",
    description:
      "Contamos con programas de formacion en Seguros y Riesgos laborales, nuestro compromiso es brindar un total acompañamiento y asesoria con el fin de obtener la proteccion al factor mas valioso… SU GENTE.",
  },
  {
    title: "ACCIDENTES PERSONALES",
    description:
      "El Seguro Accidentes Personales cubre eventos inesperados como muerte accidental, invalidez, desmembración, gastos médicos por accidente, exequias por accidente, entre otros.",
  },
  {
    title: "RESPONSABILIDAD CIVIL (RC)",
    description:
      "Es la responsabilidad de un asegurado frente a terceros, dado el desarrollo de cualquier actividad, esta responsabilidad civil en el caso de tomarse para proteger automóviles puede derivarse en dos clases Contractual (RCC) y Extracontractual (RCE).",
    listItems: ["Pasajeros.", "Autos y Motos Particulares."],
  },
  {
    title: "POLIZA DE CUMPLIMIENTO",
    description:
      "Garantizar el Cumplimiento de contratos celebrados entre Entidades Públicas o Particulares.",
  },
  {
    title: "SEGUROS DE AUTOMÓVILES",
    description:
      "Garantizar el Cumplimiento de contratos celebrados entre Entidades Públicas o Particulares.",
    listItems: [
      "Hurto y/o daños del vehículo.",
      "Responsabilidad Civil Extra contractual.",
      "Gastos de Transporte/Asistencia al vehículo y conductor en viajes.",
      "Vehículo de reemplazo.",
      "Descuento Revisión Técnico Mecánica.",
    ],
  },
  {
    title: "SOAT",
    description:
      "Es un seguro obligatorio para todos los vehículos automotores que transiten por el territorio nacional colombiano, que ampara los daños corporales que se causen a las personas en accidentes de tránsito ya sean peatones, pasajeros, conductores.",
  },
];

export const soatTableInfo = [
  {
    accordionSection: "Motos",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      valor: "VALOR",
    },
    tipoVehiculo: {
      imageSrc:
        "/moto.png",
    },
    cilindraje: [
      "CICLOMOTOR",
      "Menos de 100",
      "100 A 200",
      "Más de 200",
      "MOTOCARRO",
    ],
    valor: ["$ 100.900", "$ 207.700", "$ 278.200", "$ 701.300", "$ 313.800"],
  },

  {
    accordionSection: "Camperos o Camionetas",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      modelosDesde2014Hasta2023: "MODELOS DESDE 2014 HASTA 2023",
      modelosDesde2013HaciaAtras: "MODELOS DESDE 2013 HACIA ATRAS",
    },
    tipoVehiculo: {
      imageSrc:
        "/camioneta.png",
    },
    cilindraje: ["Menos de 1.500", "1.500 A 2.500", "Mas de 2.500"],
    modelosDesde2014Hasta2023: ["$ 730.300", "$ 871.900", "$ 1.022.700"],
    modelosDesde2013HaciaAtras: ["$ 877.900", "$ 1.032.900", "$ 1.173.500"],
  },

  {
    accordionSection: "Camperos o Camionetas 2",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      modelosDesde2011Hasta2022: "MODELOS DESDE 2011 HASTA 2022",
      modelosDesde2010HaciaAtras: "MODELOS DESDE 2010 HACIA ATRAS",
    },
    tipoVehiculo: {
      imageSrc:
        "/camioneta.png",
    },
    cilindraje: ["Menos de 1.500", "1.500 A 2.500", "Mas de 2.500"],
    modelosDesde2011Hasta2022: ["$ 653.500", "$ 780.400", "$ 915.200"],
    modelosDesde2010HaciaAtras: ["$ 785.600", "$ 924.300", "$ 1.050.200"],
  },

  {
    accordionSection: "Carga o Mixto",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      valor: "VALOR",
    },
    tipoVehiculo: {
      imageSrc:
        "/carga.png",
    },
    cilindraje: ["Menos de 5 TON", "DE 5 A 15 TON", "Mas de 15 TON"],
    valor: ["$ 818.300", "$ 1.181.600", "$ 1.493.900"],
  },

  {
    accordionSection: "Oficiales Especiales",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      valor: "VALOR",
    },
    tipoVehiculo: {
      imageSrc:
        "/oficial.png",
    },
    cilindraje: ["Menos de 1.500", "1.500 A 2.500", "Mas de 2.500"],
    valor: ["$ 920.700", "$ 1.160.700", "$ 1.391.500"],
  },

  {
    accordionSection: "Autos Familiares",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      modelosDesde2014Hasta2023: "MODELOS DESDE 2014 HASTA 2023",
      modelosDesde2013HaciaAtras: "MODELOS DESDE 2013 HACIA ATRAS",
    },
    tipoVehiculo: {
      imageSrc:
        "/familiar.png",
    },
    cilindraje: ["Menos de 1.500", "1.500 A 2.500", "Mas de 2.500"],
    modelosDesde2014Hasta2023: ["$ 412.000", "$ 501.700", "$ 585.900"],
    modelosDesde2013HaciaAtras: ["$ 546.200", "$ 624.000", "$ 694.900"],
  },

  {
    accordionSection: "Vehículos para 6 o más pasajeros",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      modelosDesde2014Hasta2023: "MODELOS DESDE 2014 HASTA 2023",
      modelosDesde2013HaciaAtras: "MODELOS DESDE 2013 HACIA ATRAS",
    },
    tipoVehiculo: {
      imageSrc:
        "/6pasajeros.png",
    },
    cilindraje: ["Menos de 2.500", "2.500 o más"],
    modelosDesde2014Hasta2023: ["$ 734.500", "$ 983.100"],
    modelosDesde2013HaciaAtras: ["$ 937.500", "$ 1.180.500"],
  },

  {
    accordionSection: "Autos de Negocios",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      modelosDesde2014Hasta2023: "MODELOS DESDE 2014 HASTA 2023",
      modelosDesde2013HaciaAtras: "MODELOS DESDE 2013 HACIA ATRAS",
    },
    tipoVehiculo: {
      imageSrc:
        "/negocios.png",
    },
    cilindraje: ["Menos de 1.500", "1.500 A 2.500", "Mas de 2.500"],
    modelosDesde2014Hasta2023: ["$ 228.500", "$ 283.700", "$ 365.800"],
    modelosDesde2013HaciaAtras: ["$ 285.100", "$ 350.400", "$ 428.900"],
  },

  {
    accordionSection: "Servicio Público Urbano",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      valor: "VALOR",
    },
    tipoVehiculo: {
      imageSrc:
        "/bus.png",
    },
    cilindraje: ["Tarifa Única"],
    valor: ["$ 545.300"],
  },

  {
    accordionSection: "Servicio Público Intermunicipal",
    columnTitles: {
      tipoVehiculo: "TIPO DE VEHÍCULO",
      cilindraje: "CILINDRAJE",
      valor: "VALOR",
    },
    tipoVehiculo: {
      imageSrc:
        "/bus.png",
    },
    cilindraje: ["Menos de 10 Pasajeros", "10 o más Pasajeros"],
    valor: ["$ 539.400", "$ 782.100"],
  },
];

export const carouselImages = [
  "/Aliado-1.png",
  "/Aliado-2.png",
  "/Aliado-3.png",
  "/Aliado-4.png",
  "/Aliado-5.png",
  "/Aliado-6.png",
  "/Aliado-7.png",
  "/Aliado-8.png",
];