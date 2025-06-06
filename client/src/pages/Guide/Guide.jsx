import React from 'react';
import styles from './Guide.module.css';

const Guide = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        DOCUMENTACIÓN DE USO - PÁGINA DE LOGIN DE TERRA RIPPLE
      </h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>OBJETIVO</h2>
        <p className={styles.text}>
          Describir detalladamente el funcionamiento de la página de login de Terra Ripple para que un asistente conversacional (chatbot) pueda guiar al usuario en su uso.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ESTRUCTURA DE LA INTERFAZ</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            <strong>Encabezado:</strong>
            <p>Logotipo y nombre de la plataforma: "terra ripple", ubicado en la parte superior izquierda.</p>
          </li>
          <li className={styles.listItem}>
            <strong>Mensaje de bienvenida:</strong>
            <p>Texto grande y visible en pantalla: "Hello again!". Indica que es una interfaz para usuarios recurrentes.</p>
          </li>
          <li className={styles.listItem}>
            <strong>Formulario de login:</strong>
            <ul className={styles.list}>
              <li className={styles.listItem}>Campo de texto <strong>"Username*"</strong> (obligatorio): aquí el usuario debe ingresar su nombre de usuario o dirección de correo electrónico asociada a su cuenta.</li>
              <li className={styles.listItem}>Campo de texto <strong>"Password*"</strong> (obligatorio): aquí el usuario debe ingresar su contraseña de acceso.</li>
              <li className={styles.listItem}>Botón <strong>"Log in!"</strong>: al presionarlo, se procesan los datos introducidos y se intenta autenticar al usuario.</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>FUNCIONALIDAD DEL LOGIN</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            <strong>Validación de campos:</strong>
            <p>Ambos campos son obligatorios. El sistema no permitirá iniciar sesión si alguno está vacío.</p>
          </li>
          <li className={styles.listItem}>
            <strong>Acción al hacer clic en "Log in!”:</strong>
            <ul className={styles.list}>
              <li className={styles.listItem}>El sistema verifica las credenciales ingresadas.</li>
              <li className={styles.listItem}>Si las credenciales son correctas, se redirige al usuario a su panel de control.</li>
              <li className={styles.listItem}>Si son incorrectas, se muestra un mensaje de error solicitando revisar el nombre de usuario o la contraseña.</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>RECOMENDACIONES PARA EL USUARIO</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Asegurarse de que el teclado no esté en mayúsculas activadas al escribir la contraseña.</li>
          <li className={styles.listItem}>Verificar que los datos introducidos sean correctos antes de iniciar sesión.</li>
          <li className={styles.listItem}>En caso de olvidar la contraseña, buscar un enlace como “¿Olvidaste tu contraseña?” o contactar con soporte (si aplica).</li>
          <li className={styles.listItem}>Si el usuario no tiene cuenta, debe buscar un enlace para registrarse en la página anterior.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>INDICACIONES PARA EL CHATBOT</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Si el usuario pregunta cómo iniciar sesión:</strong>
            <p>Indicarle que debe introducir su nombre de usuario y contraseña, y luego hacer clic en “Log in!”.</p>
          </li>
          <li className={styles.listItem}>
            <strong>Si el usuario pregunta por campos obligatorios:</strong>
            <p>Explicar que tanto “Username” como “Password” son obligatorios (marcados con *).</p>
          </li>
          <li className={styles.listItem}>
            <strong>Si el usuario dice que no puede iniciar sesión:</strong>
            <p>Sugerir que revise que los datos estén correctamente escritos, que no tenga activado el bloqueo de mayúsculas, o que restablezca la contraseña.</p>
          </li>
          <li className={styles.listItem}>
            <strong>Si el usuario no tiene cuenta:</strong>
            <p>Indicarle que revise si hay una opción para crear una cuenta o registrarse desde la pantalla anterior.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Guide;