package com.jharol.taskmanager.service.usuario;

import com.jharol.taskmanager.dto.usuario.CrearUsuarioDTO;
import com.jharol.taskmanager.dto.usuario.UsuarioDTO;
import com.jharol.taskmanager.entity.Usuario;
import com.jharol.taskmanager.repository.usuario.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UsuarioServiceTest {

    @MockBean
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Test
    void crearUsuario_deberiaRetornarUsuarioDTO() {
        // Arrange
        CrearUsuarioDTO dto = new CrearUsuarioDTO("Jharol", "jharol@test.com", "123456");

        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword("hashedpassword");

        // Simula el guardado en el repositorio
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        // Act
        UsuarioDTO result = usuarioService.crearUsuario(dto);

        // Assert
        assertNotNull(result);
        assertEquals("Jharol", result.getNombre());
        assertEquals("jharol@test.com", result.getEmail());

        // Verifica que se haya llamado al método save exactamente 1 vez
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }
}
