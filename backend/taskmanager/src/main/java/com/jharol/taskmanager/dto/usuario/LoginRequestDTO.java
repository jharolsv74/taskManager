package com.jharol.taskmanager.dto.usuario;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}