package com.jharol.taskmanager.dto.tarea;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CrearTareaDTO {

    @NotBlank
    private String titulo;

    private String descripcion;

    private String estado; // se marca PENDIENTE de entrada
}
