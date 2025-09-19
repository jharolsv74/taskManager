package com.jharol.taskmanager.repository.tarea;

import com.jharol.taskmanager.entity.Tarea;
import com.jharol.taskmanager.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

    List<Tarea> findByUsuario(Usuario usuario);
}
