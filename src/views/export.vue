<template>
  <div>
    <div class="pdf-container">
      <div class="section index page">
        <div class="title">
          <p class="center">{{detailInfo.companyName}}</p>
          <p class="center">{{categoryNames}}</p>
        </div>

        <div class="footer">
          <span>环保管家：{{detailInfo.name}}</span>
          <span v-if="detailInfo.canSave">预计节约金额：{{detailInfo.cansave}}万元</span>
          <span>
            服务对象：{{inspectedName}}
            <span
              v-if="detailInfo.serviceCount"
            >（第{{detailInfo.serviceCount}}次服务）</span>
          </span>
          <span>服务日期：{{ serviceTime }}</span>
        </div>
      </div>

      <div class="section directory page">
        <div class="topic">目录</div>
        <div class="pdf-content">
          <div class="item" v-for="(direc,index) in directoryRef" :key="index">
            <div class="li">
              <div class="shrink">
                <span>{{ index+1 }}.</span>
                <span>{{direc.title}}</span>
              </div>
              <!-- <span
                class="flex1"
              >..................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................</span>
              <span>3</span>-->
            </div>
            <template v-for="(item,idx) in direc.list" :key="index+idx">
              <div class="li">
                <div class="shrink">
                  <span>{{ index+1 }}.{{ idx+1 }}</span>
                  <span>{{item.text}}</span>
                </div>
                <!-- <span
                  class="flex1"
                >..................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................</span>
                <span>3</span>-->
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="section pdf-main">
        <div class="paragraph feed">
          <h2 class="mb24">{{title}}</h2>
          <div
            class="indent"
          >{{serviceTime}}，{{detailInfo.companyName}}对{{inspectedName}}开展{{categoryNames}}服务，形成如下服务报告。</div>
        </div>
        <!--异常项-->
        <div class="box feed">
          <h2 class="mb24">1.异常项</h2>
          <div class="box-item" v-for="(item, index) in abnormalListRef" :key="item.id">
            <h3 class="mb24">1.{{index+1}}{{item.content}}</h3>
            <div>
              <div class="mb24">1）检查内容描述：</div>
              <div class="mb24 indent">{{item.result}}</div>
              <div>
                <div class="mb24">2）图片附件</div>
                <div class="mb24" v-if="item.images && item.images.length">
                  <img
                    v-for="img in item.images"
                    :src="img"
                    :key="img"
                    class="img"
                    crossorigin="anonymous"
                  />
                </div>
                <div class="mb24 indent" v-else>无</div>
              </div>
              <div>
                <div class="mb24">3）检查备注：</div>
                <div class="mb24 indent" v-if="item.remark">{{ item.remark }}</div>
                <div class="mb24 indent" v-else>无</div>
              </div>
            </div>
          </div>
        </div>
        <!--其他情况-->
        <div class="box feed">
          <h2 class="mb24">2.其他情况</h2>
          <div class="box-item" v-for="(item, index) in otherListRef" :key="item.id">
            <h3 class="mb24">1.{{index+1}}{{item.content}}</h3>
            <div>
              <div class="mb24">1）检查内容描述：</div>
              <div class="mb24 indent">{{item.result}}</div>
              <div>
                <div class="mb24">2）图片附件</div>
                <div class="mb24" v-if="item.images && item.images.length">
                  <img
                    v-for="img in item.images"
                    :src="img"
                    :key="img"
                    class="img"
                    crossorigin="anonymous"
                  />
                </div>
                <div class="mb24 indent" v-else>无</div>
              </div>
              <div>
                <div class="mb24">3）检查备注：</div>
                <div class="mb24 indent" v-if="item.remark">{{ item.remark }}</div>
                <div class="mb24 indent" v-else>无</div>
              </div>
            </div>
          </div>
        </div>
        <!--无异常项-->
        <div class="box feed">
          <h2 class="mb24">3.无异常项</h2>
          <div class="box-item" v-for="(item, index) in unAbnormalListRef" :key="item.id">
            <h3 class="mb24">1.{{index+1}}{{item.content}}</h3>
            <div>
              <div class="mb24">1）检查内容描述：</div>
              <div class="mb24 indent">{{item.result}}</div>
              <div>
                <div class="mb24">2）图片附件</div>
                <div class="mb24" v-if="item.images && item.images.length">
                  <img
                    v-for="img in item.images"
                    :src="img"
                    :key="img"
                    class="img"
                    crossorigin="anonymous"
                  />
                </div>
                <div class="mb24 indent" v-else>无</div>
              </div>
              <div>
                <div class="mb24">3）检查备注：</div>
                <div class="mb24 indent" v-if="item.remark">{{ item.remark }}</div>
                <div class="mb24 indent" v-else>无</div>
              </div>
            </div>
          </div>
        </div>

        <!--不涉及项-->
        <div class="box feed">
          <h2 class="mb24">4.不涉及项</h2>
          <div class="box-item" v-for="(item, index) in unInvolvedListRef" :key="item.id">
            <h3 class="mb24">1.{{index+1}}{{item.content}}</h3>
            <div>
              <div class="mb24">1）检查内容描述：</div>
              <div class="mb24 indent">{{item.result}}</div>
              <div>
                <div class="mb24">2）图片附件</div>
                <div class="mb24" v-if="item.images && item.images.length">
                  <img
                    v-for="img in item.images"
                    :src="img"
                    :key="img"
                    class="img"
                    crossorigin="anonymous"
                  />
                </div>
                <div class="mb24 indent" v-else>无</div>
              </div>
              <div>
                <div class="mb24">3）检查备注：</div>
                <div class="mb24 indent" v-if="item.remark">{{ item.remark }}</div>
                <div class="mb24 indent" v-else>无</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="export">
import { onMounted, reactive, ref, computed, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { getPdfDataAPI } from "../api";
import { flatFunc } from "../utils/util";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const route = useRoute();
const router = useRouter();
const id = route.query.id;

if (!id) {
  router.push("/403");
}

const detailInfo = reactive({});
const abnormalListRef = ref([]);
const unAbnormalListRef = ref([]);
const unInvolvedListRef = ref([]);
const otherListRef = ref([]);
const directoryRef = ref([]);
const categoryNames = computed(() => {
  const str = detailInfo?.checkDetail?.categoryNames?.join("") ?? "";
  return `${str}服务报告`;
});
const serviceTime = computed(() => {
  return detailInfo?.serviceDate ?? detailInfo?.checkDetail?.saveTime ?? "";
});
const inspectedName = computed(() => {
  return detailInfo?.checkDetail?.title ?? "";
});
const title = computed(() => {
  return detailInfo.companyName + categoryNames.value;
});
// const categorySubClass = computed(() => {
//   return detailInfo?.checkDetail?.categoryNames?.join("") ?? "" + "服务报告";
// });
const formatData = (data: any) => {
  // 扁平化
  return flatFunc(data.checkItems).filter((item: any) => !!item.id);
  //  找出异常项 islgnore 不涉及  isAbnormal异常
};

const getDirectory = (abnormalObj, list) => {
  abnormalObj.list = list.map((item) => {
    return {
      text: item.content,
    };
  });
};
const getBase64Image = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "";
    img.src = src;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx && ctx.drawImage(img, 0, 0, img.width, img.height);
      const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      const dataURL = canvas.toDataURL("image/" + ext);
      resolve(dataURL);
    };
  });
};
const getImgSrc = async (img) => {
  let res = await getBase64Image(img);
  return res ?? "";
};
const getData = async () => {
  const res = await getPdfDataAPI(id);
  console.log(res, "rrrrrr");
  if (res?.data?.code === 0) {
    Object.assign(detailInfo, res.data.data);

    // detailInfo.value = res.data;
    const list = formatData(res.data.data.checkDetail);
    // 异常项
    const abnormalList = list.filter(
      (item: any) => item.isAbnormal === true && !item.islgnore
    );
    // 无异常项
    const unAbnormalList = list.filter(
      (item: any) => item.isAbnormal === false && item.isRequire
    );
    // 不涉及此项
    const unInvolvedList = list.filter((item: any) => item.isRequire === false);
    //其他情况
    const otherList = list.filter((item: any) => !!item.other);

    abnormalListRef.value = abnormalList;

    unAbnormalListRef.value = unAbnormalList;

    unInvolvedListRef.value = unInvolvedList;

    otherListRef.value = otherList;

    const abnormalObj = {
      title: "异常项",
      list: [],
    };
    getDirectory(abnormalObj, abnormalList);

    const otherObj = {
      title: "其他情况",
      list: [],
    };
    getDirectory(otherObj, otherList);
    const unAbnormalObj = {
      title: "无异常项",
      list: [],
    };
    getDirectory(unAbnormalObj, unAbnormalList);
    const unInvolvedObj = {
      title: "不涉及项",
      list: [],
    };
    getDirectory(unInvolvedObj, unInvolvedList);

    directoryRef.value = [abnormalObj, otherObj, unAbnormalObj, unInvolvedObj];
    // 测试
    // nextTick(() => {

    //   console.log(100);
    //   let opt = {
    //     margin: 1, // pdf外边距
    //     filename: "pdf生成" + ".pdf", // 导出的pdf名称
    //     image: {
    //       // 图片的类型和质量，详情： https://github.com/eKoopmans/html2pdf.js#image-type-and-quality
    //       type: "png",
    //       quality: 0.98, // 取0-1，默认0.95，仅适用  jpeg/webp
    //     },
    //     html2canvas: {
    //       scale: 1,
    //       dpi: 92,
    //       useCORS: true,
    //     },
    //     jsPDF: {
    //       // 详情：http://www.rotisedapsales.com/snr/cloud2/website/jsPDF-master/docs/jsPDF.html
    //       unit: "pt", // pt、mm、cm、in
    //       format: "a4",
    //       orientation: "portrait", // 纵向p，横向l
    //     },
    //   };
    //   html2pdf().set(opt).from(document.getElementById("app")).save();
    // });
  } else {
    ElMessage.error(res?.data?.msg || "获取数据失败");
  }
};
onMounted(() => {
  getData();
});
</script>

<style scoped>
@media print {
  @page {
    size: A4 portrait;
  }
}
::-webkit-scrollbar {
  width: 0; /* 设置滚动条的宽度 */
}
.pdf-container {
  background: #fff;
}
.pdf-container .indent {
  text-indent: 2em;
}
.pdf-container .img {
  max-width: 100%;
}
.pdf-container .center {
  text-align: center;
}
.page {
  page-break-after: always;
  break-after: page;
}
.section {
  min-height: 100vh;
  padding: 0 64px;
}
.section.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.index .title {
  margin-top: 128px;
  font-weight: 600;
  font-size: 32px;
}
.index .footer {
  font-weight: 600;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  /* margin-bottom: 64px; */
}
.index .footer span {
  margin-bottom: 24px;
}

/**目录 */
.section.directory {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 128px;
}

.directory .pdf-content {
  width: 100%;
}
.directory .pdf-content .item .li {
  display: flex;
  padding-left: 24px;
  line-height: 28px;
}
.directory .pdf-content .item .li:first-child {
  padding-left: 0;
}
.directory span.flex1 {
  overflow: hidden;
}
.directory .shrink {
  flex-shrink: 0;
}
.pdf-main {
  padding-top: 128px;
}
.pdf-main .mb24 {
  margin-bottom: 24px;
}
.pdf-main .feed {
  margin-bottom: 32px;
}
</style>
