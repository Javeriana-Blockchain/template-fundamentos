# Cómo trabajamos en este repositorio

## Ramas
- `main` está protegida: nada entra directo, todo entra por pull request (PR).
- Una rama por tarea: `semana-1/readme`, `semana-2/activo-jave`, `fix/trustline-faltante`.

## Commits (Conventional Commits)
Formato: `tipo: descripción corta en minúscula y en presente`

| Tipo | Cuándo |
|---|---|
| `feat:` | algo nuevo que funciona (una función, una pantalla) |
| `fix:` | corrección de un error |
| `docs:` | README, comentarios, guías |
| `test:` | pruebas nuevas o corregidas |
| `chore:` | configuración, dependencias, CI |

Ejemplos: `docs: agrega direcciones de testnet al README` · `feat: contador en instance storage` · `fix: valida monto mayor a cero`.

Un commit = un cambio. Si el mensaje necesita la palabra «y», probablemente son dos commits.

## Pull requests
1. Usa la plantilla que aparece al abrir el PR; no borres secciones.
2. La declaración de uso de IA es obligatoria.
3. Pide revisión a un integrante de otro equipo o al mentor. Un comentario sustantivo vale más que un «LGTM».
4. Se fusiona (merge) solo con CI en verde y al menos una aprobación.

## Secretos
Nunca subas llaves secretas (`S...`), frases de 12 palabras ni archivos `.env`. El `.gitignore` ayuda, pero la responsabilidad es tuya. Una llave secreta en el repo es un hallazgo crítico en la rúbrica.
