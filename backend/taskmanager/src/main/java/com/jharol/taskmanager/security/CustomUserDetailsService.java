package com.jharol.taskmanager.security;

import com.jharol.taskmanager.entity.Usuario;
import com.jharol.taskmanager.repository.usuario.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        
        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getPassword())
                .roles("USER")
                .build();
    }
}
