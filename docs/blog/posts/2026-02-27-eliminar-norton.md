---
date: 2026-02-27
categories:
  - Ciberseguridad
  - Tutorial
tags:
  - Publicaciones
authors:
  - pablo
---

# La eliminación de Norton y el mito de los Antivirus

A menudo nos venden los programas antivirus como escudos impenetrables que protegen nuestros sistemas, pero la realidad puede ser muy distinta. Esta es una reflexión crítica sobre cómo, en muchas ocasiones, estos programas terminan comportándose de manera invasiva, casi como el propio malware del que prometen defendernos. Se apropian de los permisos del sistema, consumen recursos de manera desproporcionada y, lo peor de todo, secuestran el control de nuestro propio equipo, volviéndose extremadamente difíciles de desinstalar cuando decidimos prescindir de ellos. 

Estos son los pasos que he tenido que dar para eliminar Norton de mi equipo, un proceso que incluyó tener que **entrar en modo seguro**, ya que de otra manera fue imposible, ¡incluso usando la herramienta oficial de desinstalación de Norton!

<!-- more -->

Estos son los pasos que he seguido para la eliminación definitiva de Norton:

## Fase 1: El Blindaje de "Auto-protección"

El primer obstáculo fue finalizar los proecesos de Norton que no se dejaba cerrar.

!!! failure "Incidencia"
    El Administrador de tareas y el desinstalador estándar de Windows fallaron porque Norton protegía sus procesos como si fueran parte crítica del kernel.

!!! success "Solución inicial"
    Usamos **Bulk Crap Uninstaller (BCU)** para forzar la eliminación de la aplicación, pero los servicios y archivos del sistema permanecieron activos.

## Fase 2: La Batalla por los Permisos (SYSTEM vs Administrador)

Incluso con permisos de administrador, Norton denegó el acceso a sus propios archivos (`symamsi.dll`, `BuShell.dll`).

!!! failure "Incidencia"
    El error de "Acceso denegado" se debía a que los archivos pertenecían a un propietario de nivel superior.

!!! abstract "Maniobra"
    Aplicamos comandos de fuerza bruta (`takeown` e `icacls`) para reclamar la propiedad de las carpetas en `Program Files`.

!!! success "Escalada de privilegios"
    Usamos **PsExec** para lanzar una terminal con poder de `SYSTEM`, el nivel más alto de Windows, logrando finalmente ejecutar `sc delete` sobre el servicio que no se dejaba eliminar `nsWscSvc`.

## Fase 3: El Intento de "Resurrección"

Tras borrar los archivos, Norton intentó reconstruirse desde las sombras.

!!! failure "Incidencia"
    Al reiniciar, el sistema generaba automáticamente carpetas en `ProgramData` y lanzaba una ventana de instalación de "Mi Norton".

!!! abstract "Causa"
    Tareas programadas ocultas y registros "huérfanos" detectaban la ausencia del programa y disparaban una descarga de emergencia.

## Fase 4: El Golpe Final (Autoruns)

Para detener el ciclo infinito, tuvimos que limpiar el ADN del registro.

**Herramienta clave:** [Autoruns64 de Microsoft](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns).

!!! success "Limpieza final"
    Eliminamos todas las entradas de color "amarillas" (archivos que ya no existían pero seguían en la lista de arranque) y el driver `wpCtrlDrv_NGC`, que era el que mantenía la persistencia activa.

---

!!! info "Reflexión Final"
    La desinstalación de un software legítimo no debería requerir tácticas de *pentesting* ni herramientas de administrador de sistemas. ¿Que hubiera pasado si hubiera sido un usuario sin conocimientos de informática? Probablemente no lo habría podido desinstalar o habría tenido que formatear el disco duro. Esto demuestra que la línea entre la "seguridad agresiva" y el secuestro de nuestro equipo es, en el caso de algunos antivirus de terceros, demasiado fina. A día de hoy, las herramientas integradas en el sistema (como Windows Defender) suelen ser más que suficientes y mucho menos intrusivas.
