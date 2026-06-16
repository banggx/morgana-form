package com.mogana.form.controller;

import com.mogana.form.model.Form;
import com.mogana.form.service.ArchiveService;
import com.mogana.form.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/forms")
public class FormController {

    @Autowired
    private FormService formService;

    @Autowired
    private ArchiveService archiveService;

    // ... existing methods ...

    @PostMapping("/archive-batch")
    public ResponseEntity<Map<String, Object>> batchArchive(
            @RequestBody Map<String, Object> request) {
        List<Long> formIds = (List<Long>) request.get("formIds");
        String operation = (String) request.get("operation");
        Long operatorId = (Long) request.get("operatorId");

        Map<String, Object> result = archiveService.batchArchive(formIds, operation, operatorId);
        return ResponseEntity.ok(result);
    }

    // Keep all existing methods unchanged below
    @GetMapping
    public ResponseEntity<List<Form>> getAllForms() {
        return ResponseEntity.ok(formService.getAllForms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Form> getFormById(@PathVariable Long id) {
        return ResponseEntity.ok(formService.getFormById(id));
    }

    @PostMapping
    public ResponseEntity<Form> createForm(@RequestBody Form form) {
        return ResponseEntity.ok(formService.createForm(form));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Form> updateForm(@PathVariable Long id, @RequestBody Form form) {
        return ResponseEntity.ok(formService.updateForm(id, form));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteForm(@PathVariable Long id) {
        formService.deleteForm(id);
        return ResponseEntity.noContent().build();
    }
}