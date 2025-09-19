package com.jharol.taskmanager.service.usuario;

import com.jharol.taskmanager.dto.usuario.CrearUsuarioDTO;
import com.jharol.taskmanager.dto.usuario.UsuarioDTO;
import com.jharol.taskmanager.entity.Usuario;
import java.util.List;

public interface UsuarioService {
    UsuarioDTO crearUsuario(CrearUsuarioDTO dto);
    List<UsuarioDTO> listarUsuarios();
    Usuario obtenerUsuarioPorId(Long id);
    UsuarioDTO obtenerUsuarioDTOPorId(Long id);
}
