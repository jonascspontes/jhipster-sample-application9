package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Genero;
import com.mycompany.myapp.repository.GeneroRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Genero}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GeneroResource {

    private final Logger log = LoggerFactory.getLogger(GeneroResource.class);

    private static final String ENTITY_NAME = "genero";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GeneroRepository generoRepository;

    public GeneroResource(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    /**
     * {@code POST  /generos} : Create a new genero.
     *
     * @param genero the genero to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new genero, or with status {@code 400 (Bad Request)} if the genero has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/generos")
    public ResponseEntity<Genero> createGenero(@RequestBody Genero genero) throws URISyntaxException {
        log.debug("REST request to save Genero : {}", genero);
        if (genero.getId() != null) {
            throw new BadRequestAlertException("A new genero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Genero result = generoRepository.save(genero);
        return ResponseEntity.created(new URI("/api/generos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /generos} : Updates an existing genero.
     *
     * @param genero the genero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated genero,
     * or with status {@code 400 (Bad Request)} if the genero is not valid,
     * or with status {@code 500 (Internal Server Error)} if the genero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/generos")
    public ResponseEntity<Genero> updateGenero(@RequestBody Genero genero) throws URISyntaxException {
        log.debug("REST request to update Genero : {}", genero);
        if (genero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Genero result = generoRepository.save(genero);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, genero.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /generos} : get all the generos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of generos in body.
     */
    @GetMapping("/generos")
    public List<Genero> getAllGeneros() {
        log.debug("REST request to get all Generos");
        return generoRepository.findAll();
    }

    /**
     * {@code GET  /generos/:id} : get the "id" genero.
     *
     * @param id the id of the genero to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the genero, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/generos/{id}")
    public ResponseEntity<Genero> getGenero(@PathVariable Long id) {
        log.debug("REST request to get Genero : {}", id);
        Optional<Genero> genero = generoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(genero);
    }

    /**
     * {@code DELETE  /generos/:id} : delete the "id" genero.
     *
     * @param id the id of the genero to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/generos/{id}")
    public ResponseEntity<Void> deleteGenero(@PathVariable Long id) {
        log.debug("REST request to delete Genero : {}", id);
        generoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
