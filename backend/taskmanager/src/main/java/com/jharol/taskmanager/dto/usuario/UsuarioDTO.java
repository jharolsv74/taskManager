package com.jharol.taskmanager.dto.usuario;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private String nombre;
    private String email;
}