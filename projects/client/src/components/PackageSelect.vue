<template>
  <div class="wrapper">
    <span class="label"> Choose Your PDF_Package_Type: </span>
    <el-select
      :model-value="value"
      size="large"
      popper-class="select-popper"
      @change="handleSelectChanged">
      <el-option
        v-for="item in PACKAGE_TYPES"
        :key="item.value"
        :label="item.name"
        :value="item.value" />
    </el-select>
  </div>
</template>
<script setup>
import { ElSelect, ElOption } from 'element-plus';
import { PACKAGE_TYPES } from '../utils/constants';
defineProps({
  value: {
    type: String,
    default: 'elite',
  },
});
const emits = defineEmits(['update:value']);
const handleSelectChanged = (value) => {
  emits('update:value', value);
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: baseline;

  .label {
    margin-right: 15px;
    color: #142132;
    font-weight: 500;
    font-size: 24px;
    line-height: 22px;
  }

  :deep(.el-input__wrapper) {
    box-sizing: border-box;
    width: 150px;
    padding-left: 20px;
    font-weight: 500;
    font-size: 24px;
    line-height: 26.4px;
    background: #6576db2e;
    border-radius: 118.8px;
    box-shadow: none;

    --el-input-text-color: #142132;
    --el-select-input-color: #6576db;
    --el-select-input-font-size: 16px;
  }
}
</style>
<style>
.select-popper {
  --el-popover-border-radius: 20px;

  overflow-x: hidden;

  .select-popper {
    color: #142132;
    font-weight: 500;
    font-size: 24px;
    line-height: 26.4px;
    background: #fff;
  }

  .el-select-dropdown__item {
    display: flex;
    align-items: center;
    padding: 0 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    color: #142132;
    font-weight: 500;
    font-size: 24px;
    line-height: 26.4px;
  }
}
</style>
