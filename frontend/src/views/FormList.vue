<template>
  <div class="form-list">
    <!-- Batch action toolbar -->
    <div class="batch-toolbar" v-if="selectedFormIds.length > 0">
      <span>{{ selectedFormIds.length }} 个表单已选中</span>
      <select v-model="batchOperation" class="operation-select">
        <option value="archive">批量归档</option>
        <option value="restore">批量还原</option>
        <option value="permanent-delete">永久删除</option>
      </select>
      <button @click="confirmBatchOperation" class="btn btn-primary">确认</button>
      <button @click="clearSelection" class="btn btn-outline">取消</button>
    </div>

    <!-- Table header with checkbox -->
    <table class="form-table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" />
          </th>
          <th>表单名称</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="form in forms" :key="form.id">
          <td>
            <input
              type="checkbox"
              :value="form.id"
              v-model="selectedFormIds"
              @change="updateSelectAllState"
            />
          </td>
          <td>{{ form.name }}</td>
          <td>
            <span v-if="form.archiveStatus === 'ARCHIVED'" class="status archived">已归档</span>
            <span v-else-if="form.archiveStatus === 'RESTORED'" class="status restored">已还原</span>
            <span v-else-if="form.archiveStatus === 'PERMANENTLY_DELETED'" class="status deleted">已删除</span>
            <span v-else>{{ form.status }}</span>
          </td>
          <td>
            <button @click="viewForm(form.id)">查看</button>
            <button v-if="form.archiveStatus !== 'PERMANENTLY_DELETED'" @click="triggerArchive(form.id)">
              {{ form.archiveStatus === 'ARCHIVED' ? '还原' : '归档' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Confirmation dialog -->
    <div v-if="showConfirmDialog" class="modal">
      <div class="modal-content">
        <h3>确认{{ batchOperationLabel }}</h3>
        <p>确定要对 {{ selectedFormIds.length }} 个表单执行此操作吗？</p>
        <div class="modal-actions">
          <button @click="showConfirmDialog = false" class="btn btn-outline">取消</button>
          <button @click="executeBatchOperation" class="btn btn-danger">确认</button>
        </div>
      </div>
    </div>

    <!-- Result toast -->
    <div v-if="toast" class="toast" :class="{ 'success': toast.type === 'success', 'error': toast.type === 'error' }">
      {{ toast.message }}
      <button @click="toast = null">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFormStore } from '@/store/modules/form';
import { archiveBatch } from '@/api/form';

const formStore = useFormStore();
const selectedFormIds = ref([]);
const batchOperation = ref('archive');
const showConfirmDialog = ref(false);
const toast = ref(null);

const forms = computed(() => formStore.forms);

onMounted(() => {
  formStore.fetchForms();
});

const isAllSelected = computed(() => {
  if (forms.value.length === 0) return false;
  return selectedFormIds.value.length === forms.value.length;
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedFormIds.value = [];
  } else {
    selectedFormIds.value = forms.value.map(f => f.id);
  }
};

const updateSelectAllState = () => {
  if (selectedFormIds.value.length === 0) return;
  const allSelected = forms.value.every(f => selectedFormIds.value.includes(f.id));
  if (!allSelected && isAllSelected.value) {
    selectedFormIds.value = selectedFormIds.value.filter(id => forms.value.some(f => f.id === id));
  }
};

const batchOperationLabel = computed(() => {
  switch (batchOperation.value) {
    case 'archive': return '批量归档';
    case 'restore': return '批量还原';
    case 'permanent-delete': return '永久删除';
    default: return '操作';
  }
});

const confirmBatchOperation = () => {
  if (selectedFormIds.value.length === 0) return;
  showConfirmDialog.value = true;
};

const executeBatchOperation = async () => {
  try {
    const res = await archiveBatch({
      formIds: selectedFormIds.value,
      operation: batchOperation.value,
      operatorId: 1 // TODO: replace with real user ID from auth store
    });
    toast.value = {
      type: res.failed.length === 0 ? 'success' : 'error',
      message: `成功: ${res.successCount}，失败: ${res.failed.length}`
    };
    if (res.failed.length === 0) {
      formStore.fetchForms(); // refresh list
      selectedFormIds.value = [];
    }
  } catch (e) {
    toast.value = { type: 'error', message: '操作失败: ' + e.message };
  }
  showConfirmDialog.value = false;
};

const clearSelection = () => {
  selectedFormIds.value = [];
};

const viewForm = (id) => {
  window.location.href = `/pages/${id}`;
};

const triggerArchive = async (id) => {
  const form = forms.value.find(f => f.id === id);
  const op = form.archiveStatus === 'ARCHIVED' ? 'restore' : 'archive';
  try {
    await archiveBatch({
      formIds: [id],
      operation: op,
      operatorId: 1
    });
    formStore.fetchForms();
    toast.value = { type: 'success', message: `${op === 'archive' ? '归档' : '还原'}成功` };
  } catch (e) {
    toast.value = { type: 'error', message: '操作失败: ' + e.message };
  }
};
</script>

<style scoped>
.form-list { padding: 16px; }
.batch-toolbar { margin-bottom: 16px; display: flex; gap: 8px; align-items: center; }
.operation-select { padding: 6px 12px; border-radius: 4px; border: 1px solid #ccc; }
.form-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
.form-table th, .form-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
.form-table th:first-child, .form-table td:first-child { width: 40px; }
.status.archived { color: #6c757d; }
.status.restored { color: #28a745; }
.status.deleted { color: #dc3545; }
.modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; padding: 24px; border-radius: 8px; width: 400px; }
.modal-actions { margin-top: 16px; text-align: right; }
.toast { position: fixed; top: 20px; right: 20px; padding: 12px 24px; border-radius: 4px; z-index: 1001; }
.toast.success { background: #28a745; color: white; }
.toast.error { background: #dc3545; color: white; }
</style>