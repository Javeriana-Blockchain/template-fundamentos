# Pantallas de la dApp · [nombre del equipo]

> Se llena en el taller en casa de la semana 3 (GUIA_S3, paso 1.6; bocetos en Figma o en papel, foto en esta carpeta). Tres pantallas, no más: lo que no quepa aquí no entra al Demo Day. Reemplaza lo que está entre `[ ]`.

## El problema en una frase

[Quién tiene el problema, qué le pasa hoy y qué cambia con la app. Ej.: "Los vendedores de la cafetería no aceptan pagos digitales porque las comisiones se comen el margen; con la app reciben un activo del semillero y lo cambian cada tarde."]

## ¿Por qué Stellar y no Nequi?

[Qué aporta la red: sin intermediario, cualquiera verifica, un activo propio, pagos entre personas que no se conocen, fee de centavos… Si la respuesta es "nada", el proyecto cambia de problema, no de tecnología.]

## Las tres pantallas

| # | Pantalla | Qué ve el usuario | Qué toca | Operación de Stellar que dispara | Qué muestra después |
|---|---|---|---|---|---|
| 1 | [Inicio] | [su dirección y balances de XLM y JAVE] | ["Conectar wallet"] | ninguna (lectura de Horizon) | [balances] |
| 2 | [Recibir] | [código QR con su G… y botón "agregar activo"] | ["Confiar en JAVE"] | `changeTrust` | [nueva línea en balances] |
| 3 | [Pagar] | [formulario: a quién, cuánto, en qué activo] | ["Enviar"] | `payment` (o `pathPaymentStrictSend` si cambia de activo) | [hash con enlace al explorador] |

Bocetos: `docs/pantalla-1.png`, `docs/pantalla-2.png`, `docs/pantalla-3.png` (foto del papel vale).

## Cuentas que necesita la demo

| Rol | Cuenta | Quién la controla |
|---|---|---|
| Emisora del activo | `G…` | [el equipo, bloqueada / sin bloquear] |
| Distribuidora | `G…` | [el equipo] |
| Usuario de prueba 1 | Freighter de [nombre] | [integrante] |
| Usuario de prueba 2 | Freighter de [nombre] | [integrante] |

## Qué NO hace la versión del Demo Day

[Lo que dejan fuera a propósito para llegar al 13 de noviembre. Ej.: "no hay login", "no convierte a pesos", "solo testnet".]

## Flujo de la demo (3 minutos, en orden)

1. [Conectar wallet de usuario 1, mostrar balances.]
2. [Usuario 2 agrega el activo; usuario 1 le paga 10 JAVE; aparece el hash.]
3. [Abrir el hash en stellar.expert y mostrar la operación.]

---

Revisado en office hours el [fecha] por [mentor]. Cambios pedidos: [ ].
