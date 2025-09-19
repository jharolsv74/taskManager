package com.jharol.taskmanager.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor   // genera constructor con todos los atributos
@NoArgsConstructor    // genera constructor vacío
public class CrearUsuarioDTO {

    @NotBlank
    private String nombre;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
