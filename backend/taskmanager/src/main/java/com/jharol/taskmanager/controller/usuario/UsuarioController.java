package com.jharol.taskmanager.controller.usuario;

import com.jharol.taskmanager.dto.usuario.CrearUsuarioDTO;
import com.jharol.taskmanager.dto.usuario.LoginRequestDTO;
import com.jharol.taskmanager.dto.usuario.UsuarioDTO;
import com.jharol.taskmanager.service.auth.AuthService;
import com.jharol.taskmanager.service.usuario.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final AuthService authService;

    // Registrar usuario
    @PostMapping("/registro")
    public ResponseEntity<UsuarioDTO> registrarUsuario(@Valid @RequestBody CrearUsuarioDTO dto) {
        UsuarioDTO usuarioCreado = usuarioService.crearUsuario(dto);
        return new ResponseEntity<>(usuarioCreado, HttpStatus.CREATED);
    }

    // Login usuario
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO dto) {
        String token = authService.login(dto.getEmail(), dto.getPassword());
        return ResponseEntity.ok(token);
    }

    // Listar todos los usuarios (protegido)
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    // Obtener usuario por ID (protegido)
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerUsuarioDTOPorId(id));
    }
}
