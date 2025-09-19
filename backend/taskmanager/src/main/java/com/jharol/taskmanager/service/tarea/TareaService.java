package com.jharol.taskmanager.service.tarea;

import com.jharol.taskmanager.dto.tarea.CrearTareaDTO;
import com.jharol.taskmanager.dto.tarea.TareaDTO;
import com.jharol.taskmanager.entity.Tarea;

import java.util.List;

public interface TareaService {

    TareaDTO crearTarea(Long usuarioId, CrearTareaDTO dto);
    List<TareaDTO> listarTareas(Long usuarioId);
    TareaDTO actualizarTarea(Long usuarioId, Long tareaId, CrearTareaDTO dto);
    void eliminarTarea(Long usuarioId, Long tareaId);
    Tarea obtenerTareaPorId(Long id);
}
