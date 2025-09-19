package com.jharol.taskmanager.dto.tarea;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TareaDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private Long usuarioId;
    private String usuarioNombre;
}
