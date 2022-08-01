# Gestión de equipos

Stack: MERN

## Instrucciones de instalación

Clona el proyecto y abre dos terminales.
En una de las terminales harémos CD a la carpeta principal soccer-management y ejecutaremos:
### `npm install`

En otra terminal harémos CD a la carpeta server y ejecutaremos:
### `npm install`


Una vez se hayan instalado todas las dependencias ejecutaremos en ambas terminales el siguiente comando:
### `npm start`

Una vez se inicie el proyecto debería abrirse una pestaña en tu navegador con el siguiente enlace: [http://localhost:3000](http://localhost:3000).
También deberías poder ver un aviso en la terminal avisando de que el servidor está arrancado y conectado a la base de datos.


## DUMB de la DB & Colección de Postman

En el proyecto encontrarás una carpeta llamada dumb&postmancollection, en esta carpeta tendrás varios JSON entre los que se encuentra una colección de Postman y 3 JSON (coachs, players y teams) para que puedas importarlos a tu DB y realizar pruebas.

## Sobre la aplicación

Aplicación de gestión de equipos donde un equipo podrá registrarse, iniciar sesión, buscar jugadores o entrenadores, darlos de alta en el equipo, añadir el salario a los mismos sin que este exceda del presupuesto del equipo, podrá modificar el presupuesto (teniendo en cuenta los salarios) y dar de baja a entrenadores y jugadores.

Cada vez que un equipo tramite la alta o la baja a un miembro será notificado por correo electrónico.

Jugadores y entrenadores podrán darse de alta en la aplicación.
