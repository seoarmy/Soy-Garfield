import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Política de Privacidad</h1>
          <p className="text-slate-500">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-garfield-600 prose-a:no-underline hover:prose-a:underline">
          <p className="lead">
            En SoyGarfield ("nosotros", "nuestro" o "la web"), respetamos su privacidad y nos comprometemos a proteger sus datos personales.
            Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web y le informará sobre sus derechos de privacidad.
          </p>

          <h2>1. Información que recopilamos</h2>
          <p>
            Podemos recopilar, utilizar, almacenar y transferir diferentes tipos de datos personales sobre usted que hemos agrupado de la siguiente manera:
          </p>
          <ul>
            <li><strong>Datos de Identidad:</strong> incluye nombre, apellido, nombre de usuario o identificador similar.</li>
            <li><strong>Datos de Contacto:</strong> incluye dirección de correo electrónico y número de teléfono (si se proporcionan a través de formularios).</li>
            <li><strong>Datos Técnicos:</strong> incluye la dirección del protocolo de Internet (IP), sus datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utiliza para acceder a este sitio web.</li>
            <li><strong>Datos de Uso:</strong> incluye información sobre cómo utiliza nuestro sitio web, productos y servicios.</li>
          </ul>

          <h2>2. Cómo utilizamos su información</h2>
          <p>
            Solo utilizaremos sus datos personales cuando la ley nos lo permita. Lo más común es que utilicemos sus datos personales en las siguientes circunstancias:
          </p>
          <ul>
            <li>Para proporcionarle el contenido que ha solicitado (por ejemplo, boletines informativos).</li>
            <li>Para mejorar nuestro sitio web, productos/servicios, marketing y relaciones con los clientes.</li>
            <li>Para cumplir con una obligación legal o reglamentaria.</li>
          </ul>

          <h2>3. Cookies y tecnologías de seguimiento</h2>
          <p>
            Nuestro sitio web utiliza cookies para distinguirlo de otros usuarios de nuestro sitio web. Esto nos ayuda a brindarle una buena experiencia cuando navega por nuestro sitio web y también nos permite mejorarlo.
          </p>
          <p>
            Podemos utilizar herramientas de análisis de terceros, como Google Analytics, para ayudarnos a medir el tráfico y las tendencias de uso. Estas herramientas recopilan información enviada por su dispositivo o nuestro Servicio, incluidas las páginas web que visita, complementos y otra información que nos ayuda a mejorar el Servicio.
          </p>

          <h2>4. Enlaces de terceros</h2>
          <p>
            Este sitio web puede incluir enlaces a sitios web, complementos y aplicaciones de terceros. Hacer clic en esos enlaces o habilitar esas conexiones puede permitir que terceros recopilen o compartan datos sobre usted. No controlamos estos sitios web de terceros y no somos responsables de sus declaraciones de privacidad.
          </p>

          <h2>5. Seguridad de los datos</h2>
          <p>
            Hemos implementado medidas de seguridad adecuadas para evitar que sus datos personales se pierdan accidentalmente, se utilicen o se acceda a ellos de forma no autorizada, se alteren o se divulguen.
          </p>

          <h2>6. Contáctenos</h2>
          <p>
            Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, contáctenos en <a href="mailto:hello@soygarfield.com">hello@soygarfield.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;