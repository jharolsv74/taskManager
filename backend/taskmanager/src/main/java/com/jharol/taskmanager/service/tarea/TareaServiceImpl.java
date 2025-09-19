package com.jharol.taskmanager.service.tarea;

import com.jharol.taskmanager.dto.tarea.CrearTareaDTO;
import com.jharol.taskmanager.dto.tarea.TareaDTO;
import com.jharol.taskmanager.entity.EstadoTarea;
import com.jharol.taskmanager.entity.Tarea;
import com.jharol.taskmanager.entity.Usuario;
import com.jharol.taskmanager.exception.ResourceNotFoundException;
import com.jharol.taskmanager.repository.tarea.TareaRepository;
import com.jharol.taskmanager.repository.usuario.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TareaServiceImpl implements TareaService {

    private final TareaRepository tareaRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public TareaDTO crearTarea(Long usuarioId, CrearTareaDTO dto) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Tarea tarea = new Tarea();
        tarea.setTitulo(dto.getTitulo());
        tarea.setDescripcion(dto.getDescripcion());
        if(dto.getEstado() != null) {
            tarea.setEstado(EstadoTarea.valueOf(dto.getEstado()));
        }
        tarea.setUsuario(usuario);

        Tarea tareaGuardada = tareaRepository.save(tarea);
        return mapToDTO(tareaGuardada);
    }

    @Override
    public List<TareaDTO> listarTareas(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        return tareaRepository.findByUsuario(usuario)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TareaDTO actualizarTarea(Long usuarioId, Long tareaId, CrearTareaDTO dto) {
        Tarea tarea = obtenerTareaPorId(tareaId);
        if(!tarea.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para modificar esta tarea");
        }

        tarea.setTitulo(dto.getTitulo());
        tarea.setDescripcion(dto.getDescripcion());
        if(dto.getEstado() != null) {
            tarea.setEstado(EstadoTarea.valueOf(dto.getEstado()));
        }
        tarea.setFechaActualizacion(LocalDateTime.now());

        return mapToDTO(tareaRepository.save(tarea));
    }

    @Override
    public void eliminarTarea(Long usuarioId, Long tareaId) {
        Tarea tarea = obtenerTareaPorId(tareaId);
        if(!tarea.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para eliminar esta tarea");
        }
        tareaRepository.delete(tarea);
    }

    @Override
    public Tarea obtenerTareaPorId(Long id) {
        return tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + id));
    }

    private TareaDTO mapToDTO(Tarea tarea) {
        TareaDTO dto = new TareaDTO();
        dto.setId(tarea.getId());
        dto.setTitulo(tarea.getTitulo());
        dto.setDescripcion(tarea.getDescripcion());
        dto.setEstado(tarea.getEstado().name());
        dto.setFechaCreacion(tarea.getFechaCreacion());
        dto.setFechaActualizacion(tarea.getFechaActualizacion());
        dto.setUsuarioId(tarea.getUsuario().getId());
        dto.setUsuarioNombre(tarea.getUsuario().getNombre());
        return dto;
    }
}
