package com.jharol.taskmanager.service.usuario;

import com.jharol.taskmanager.dto.usuario.CrearUsuarioDTO;
import com.jharol.taskmanager.dto.usuario.UsuarioDTO;
import com.jharol.taskmanager.entity.Usuario;
import com.jharol.taskmanager.exception.ResourceNotFoundException;
import com.jharol.taskmanager.repository.usuario.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder; // Inyección de PasswordEncoder

    @Override
    public UsuarioDTO crearUsuario(CrearUsuarioDTO dto) {
        // Validar si el email ya existe
        if(usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword())); // Encriptar contraseña

        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return mapToDTO(usuarioGuardado);
    }

    @Override
    public List<UsuarioDTO> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioDTO obtenerUsuarioDTOPorId(Long id) {
        Usuario usuario = obtenerUsuarioPorId(id);
        return mapToDTO(usuario);
    }

    @Override
    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
    }

    // Método privado para mapear entidad a DTO
    private UsuarioDTO mapToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setEmail(usuario.getEmail());
        return dto;
    }
}
