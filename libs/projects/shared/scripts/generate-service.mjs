import { exec } from 'node:child_process';

const [feature, serviceName] = process.argv.slice(2);
const projectName = 'shared';

if (!feature || !serviceName) {
  console.error("Uso: npm run generate:service -- <feature> <serviceName>");
  console.error("Ejemplo: npm run generate:service -- auth login");
  process.exit(1);
}

const servicePath = `src/lib/${feature}/services/${serviceName}`;
const command = `ng generate service ${servicePath} --project=${projectName}`;

console.log(`Ejecutando: ${command}`);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar el comando: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error de comando (stderr): ${stderr}`);
    return;
  }
  console.log(stdout);
});