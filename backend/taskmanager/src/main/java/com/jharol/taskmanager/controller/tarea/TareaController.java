package com.jharol.taskmanager.controller.tarea;

import com.jharol.taskmanager.dto.tarea.CrearTareaDTO;
import com.jharol.taskmanager.dto.tarea.TareaDTO;
import com.jharol.taskmanager.service.tarea.TareaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@RequiredArgsConstructor
public class TareaController {

    private final TareaService tareaService;

    @PostMapping("/usuario/{usuarioId}") // protegido
    public ResponseEntity<TareaDTO> crearTarea(@PathVariable Long usuarioId,
                                                @Valid @RequestBody CrearTareaDTO dto) {
        return ResponseEntity.ok(tareaService.crearTarea(usuarioId, dto));
    }

    @GetMapping("/usuario/{usuarioId}") // protegido
    public ResponseEntity<List<TareaDTO>> listarTareas(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(tareaService.listarTareas(usuarioId));
    }

    @PutMapping("/{tareaId}/usuario/{usuarioId}") // protegido
    public ResponseEntity<TareaDTO> actualizarTarea(@PathVariable Long tareaId,
                                                    @PathVariable Long usuarioId,
                                                    @Valid @RequestBody CrearTareaDTO dto) {
        return ResponseEntity.ok(tareaService.actualizarTarea(usuarioId, tareaId, dto));
    }

    @DeleteMapping("/{tareaId}/usuario/{usuarioId}") // protegido
    public ResponseEntity<String> eliminarTarea(@PathVariable Long tareaId,
                                                @PathVariable Long usuarioId) {
        tareaService.eliminarTarea(usuarioId, tareaId);
        return ResponseEntity.ok("Tarea con ID " + tareaId + " eliminada correctamente.");
    }
}
