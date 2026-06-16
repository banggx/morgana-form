package com.mogana.form.service;

import com.mogana.form.model.Form;
import com.mogana.form.repository.FormRepository;
import com.mogana.form.util.AuditLogUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ArchiveService {

    @Autowired
    private FormRepository formRepository;

    @Transactional
    public Map<String, Object> batchArchive(List<Long> formIds, String operation, Long operatorId) {
        if (formIds == null || formIds.isEmpty()) {
            return Map.of("successCount", 0, "failed", Collections.emptyList());
        }

        List<Form> forms = formRepository.findByIdIn(formIds);
        Map<Long, Form> formMap = forms.stream().collect(Collectors.toMap(Form::getId, f -> f));

        List<String> failures = new ArrayList<>();
        int successCount = 0;

        for (Long id : formIds) {
            Form form = formMap.get(id);
            if (form == null) {
                failures.add("Form not found: " + id);
                continue;
            }

            try {
                switch (operation) {
                    case "archive":
                        if (form.getArchiveStatus() == null || "PENDING".equals(form.getArchiveStatus())) {
                            form.setArchiveStatus("ARCHIVED");
                            form.setArchiveMetadata(Map.of(
                                "operatorId", operatorId,
                                "archivedAt", LocalDateTime.now()
                            ));
                            successCount++;
                        } else {
                            failures.add("Cannot archive: form " + id + " is already " + form.getArchiveStatus());
                        }
                        break;
                    case "restore":
                        if ("ARCHIVED".equals(form.getArchiveStatus())) {
                            form.setArchiveStatus("RESTORED");
                            Map<String, Object> meta = Optional.ofNullable(form.getArchiveMetadata())
                                .map(m -> new HashMap<>(m))
                                .orElse(new HashMap<>());
                            meta.put("restoredAt", LocalDateTime.now());
                            form.setArchiveMetadata(meta);
                            successCount++;
                        } else {
                            failures.add("Cannot restore: form " + id + " is not ARCHIVED");
                        }
                        break;
                    case "permanent-delete":
                        if ("ARCHIVED".equals(form.getArchiveStatus()) || "RESTORED".equals(form.getArchiveStatus())) {
                            form.setArchiveStatus("PERMANENTLY_DELETED");
                            Map<String, Object> meta = Optional.ofNullable(form.getArchiveMetadata())
                                .map(m -> new HashMap<>(m))
                                .orElse(new HashMap<>());
                            meta.put("deletedAt", LocalDateTime.now());
                            form.setArchiveMetadata(meta);
                            successCount++;
                        } else {
                            failures.add("Cannot permanently delete: form " + id + " is not ARCHIVED or RESTORED");
                        }
                        break;
                    default:
                        failures.add("Unsupported operation: " + operation);
                }
            } catch (Exception e) {
                failures.add("Error processing form " + id + ": " + e.getMessage());
            }
        }

        formRepository.saveAll(forms);

        // Audit log
        AuditLogUtil.logBatchOperation(operatorId, "FORM_ARCHIVE_BATCH", operation, formIds, failures.isEmpty());

        return Map.of(
            "successCount", successCount,
            "failed", failures
        );
    }
}