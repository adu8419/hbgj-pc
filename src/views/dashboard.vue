<template>
  <div class="container">
    <div class="content-title">最多1个文件,最大不超过5M</div>

    <el-upload
      class="upload-content"
      drag
      name="files"
      limit="1"
      action="http://t.pro.saagre.com/api/upload"
      :multiple="false"
      :on-change="handle"
      :before-upload="onBeforeUpload"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <el-button type="primary" @click="onSave" :disabled="disabled">提交保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { saveUploadFileAPI } from "../api";

const reload = inject("reload");

const route = useRoute();
const router = useRouter();
const userId = route.query.id;
if (!userId) {
  router.push("/403");
}

const maxSize = 5 * 1024 * 1024; //5M
const imgsList = ref([]);
const disabled = computed(() => {
  return imgsList.value?.length === 0;
});
const onBeforeUpload = (rawFile) => {
  console.log(rawFile, "before");
  if (rawFile.size > maxSize) {
    // 提示
    ElMessage.error("文件最大不超过5M");
    return false;
  }
};
const handle = (rawFile) => {
  console.log(rawFile);
  if (rawFile.response) {
    if (rawFile.response.code === 0) {
      // 上传成功

      imgsList.value = rawFile.response.data;
      ElMessage.success("上传成功");
    } else {
      // 上传失败
      ElMessage.error(rawFile.response.msg || "上传失败");
    }
  }

  // const res = await uploadFileAPI(rawFile.raw);
};
const onSave = async () => {
  if (imgsList.value && imgsList.value.length) {
    // 提交保存

    return;
    const params = {
      userId,
      files: imgsList.value,
    };
    const res = await saveUploadFileAPI(params);
    if (res.code === 0) {
      // 刷新页面？
      reload();
    }
  }
};
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.upload-content {
  width: 660px;
  margin-bottom: 24px;
}

.upload-content .el-upload-list__item-name {
  padding: 12px 0;
}
</style>
