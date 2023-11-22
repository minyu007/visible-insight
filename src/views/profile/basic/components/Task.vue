<template>
  <div class="list-wrap">
    <a-row class="list-row" :gutter="24">
      <a-col :span="24">
        <a-row class="list-row" :gutter="24">
          <a-col :span="24">
            <a-divider orientation="left">Filter</a-divider>
          </a-col>
        </a-row>
        <a-row class="list-row" :gutter="24">
          <a-col :span="24">
            <a-space>
              <a-input-search
                size="mini"
                placeholder="ticker or company name"
                :style="{ width: '200px' }"
                @search="search"
                @clear="clearSeach()"
                allow-clear
                @press-enter="_search"
              />
              <a-select
                placeholder="Please select Analysts"
                multiple
                :scrollbar="scrollbar"
                size="mini"
                :style="{ width: '390px' }"
                @change="selectAnalyst"
              >
                <a-option v-for="analyst in analystList" :key="analyst">
                  {{ analyst }}
                </a-option>
              </a-select>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="list-row" :gutter="24">
      <a-col :span="24">
        <div class="container">
          <a-space>
            <div class="item todo">
              <a-divider orientation="left">
                {{ title }}
                <a-typography-text type="warning">Todo List</a-typography-text>
              </a-divider>
              <a-table
                :columns="sourceColumns"
                :data="todoData"
                :virtual-list-props="{ height: 400 }"
                :pagination="false"
                :bordered="true"
                :hoverable="false"
                size="mini"
              >
                <template #operation="{ record }">
                  <a-button
                    size="mini"
                    type="text"
                    status="normal"
                    shape="circle"
                    @click="go2Working(record)"
                  >
                    <icon-right />
                  </a-button>
                </template>
              </a-table>
            </div>
            <a-popconfirm
              content="Put all items into 'Working list'?"
              okText="comfirm"
              cancelText="No"
              position="left"
              @ok="allGo2Working(record)"
            >
              <a-button size="mini" type="primary" shape="circle">
                <icon-right />
              </a-button>
            </a-popconfirm>
            <div class="item working">
              <a-divider orientation="left">
                {{ title }}
                <a-typography-text type="success">Working</a-typography-text>
              </a-divider>
              <a-table
                :columns="workingColumns"
                :data="workingData"
                :virtual-list-props="{ height: 400 }"
                :pagination="false"
                :bordered="true"
                :hoverable="false"
                size="mini"
              >
                <template #operation1="{ record }">
                  <a-popconfirm
                    content="Delete confirmation?"
                    okText="comfirm"
                    cancelText="No"
                    position="left"
                    @ok="removeFromWorkingList(record)"
                  >
                    <a-button
                      size="mini"
                      type="text"
                      status="normal"
                      shape="circle"
                    >
                      <icon-delete />
                    </a-button>
                  </a-popconfirm>
                </template>
                <template #operation2="{ record }">
                  <a-button
                    size="mini"
                    type="text"
                    status="primary"
                    shape="circle"
                    @click="go2Done(record)"
                  >
                    <icon-right />
                  </a-button>
                </template>
              </a-table>
            </div>
            <a-space direction="vertical" fill>
              <a-popconfirm
                content="Put all items back into 'Working list'?"
                okText="comfirm"
                cancelText="No"
                position="left"
                @ok="allGoBack2Working(record)"
              >
                <a-button
                  size="mini"
                  type="primary"
                  shape="circle"
                  :disabled="!doneData.length"
                >
                  <icon-left />
                </a-button>
              </a-popconfirm>
              <a-popconfirm
                content="Put all items into 'Done list'?"
                okText="comfirm"
                cancelText="No"
                position="left"
                @ok="allGo2Done(record)"
              >
                <a-button
                  size="mini"
                  :disabled="!workingData.length"
                  type="primary"
                  shape="circle"
                >
                  <icon-right />
                </a-button>
              </a-popconfirm>
            </a-space>
            <div class="item done">
              <a-divider orientation="left">
                {{ title }}
                <a-typography-text type="primary">Done</a-typography-text>
              </a-divider>
              <a-table
                :columns="doneColumns"
                :data="doneData"
                :virtual-list-props="{ height: 400 }"
                :pagination="false"
                :bordered="true"
                :hoverable="false"
                size="mini"
              >
                <template #operation1="{ record }">
                  <a-button
                    size="mini"
                    type="text"
                    status="primary"
                    shape="circle"
                    @click="back2Working(record)"
                  >
                    <icon-left />
                  </a-button>
                </template>
                <template #operation2="{ record }">
                  <a-popconfirm
                    content="Delete confirmation?"
                    okText="comfirm"
                    cancelText="No"
                    position="left"
                    @ok="removeFromDoneList(record)"
                  >
                    <a-button
                      size="mini"
                      type="text"
                      status="normal"
                      shape="circle"
                    >
                      <icon-delete />
                    </a-button>
                  </a-popconfirm>
                </template>
              </a-table>
            </div>
          </a-space>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import {
  getTickersInTaskComponent,
  getTaskList,
  addTask,
  updateTask,
  deleteTask,
} from '@/api/list';

import { getToken, getChannel } from '@/utils/auth';
import { Message } from '@arco-design/web-vue';
import moment from 'moment';

import { Icon } from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/c/font_3959654_u1c47ts4n8s.js',
});

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    TaskCode: {
      type: String,
      required: true,
    },
    TaskName: {
      type: String,
      required: true,
    },
    OriginData: {
      type: Array,
      required: true,
    },
    TaskData: {
      type: Array,
      required: true,
    },
  },
  components: {
    IconFont,
  },
  setup(props, context) {
    const { loading, setLoading } = useLoading(true);
    const { t } = useI18n();
    const todoData = ref<any[]>([]);
    const todoOriginData = ref<any[]>(props.OriginData);
    const workingData = ref<any[]>([]);
    const doneData = ref<any[]>([]);
    const analystList = ref<any[]>([]);

    const Channel = getChannel();

    const title = props.title;

    watchEffect(() => {
      todoOriginData.value = props.OriginData;
      todoData.value = todoOriginData.value;
      analystList.value = todoOriginData.value
        .map((v) => v.analyst_name)
        .filter(
          (analyst_name, index, list) => list.indexOf(analyst_name) === index
        );

      workingData.value = props.TaskData.filter((v) => v[7] == props.TaskCode)
        .filter((v) => v[2] == '1')
        .map((v) => ({
          ticker_id: v[5],
          task_id: v[0],
          bbg_ticker: v[9],
          debt_ticker: v[10],
          local_company_name: v[13],
        }));
      doneData.value = props.TaskData.filter((v) => v[7] == props.TaskCode)
        .filter((v) => v[2] == '2')
        .map((v) => ({
          ticker_id: v[5],
          task_id: v[0],
          bbg_ticker: v[9],
          debt_ticker: v[10],
          local_company_name: v[13],
        }));
    });

    const fetchTaskList = async (params: any) => {
      setLoading(true);
      let a_number = getToken();
      a_number = a_number.toLowerCase();
      const { data } = await getTaskList({
        ...params,
        a_number,
        task_code: props.TaskCode,
      });
      workingData.value = data
        .filter((v) => v[2] == '1')
        .map((v) => ({
          ticker_id: v[5],
          task_id: v[0],
          bbg_ticker: v[9],
          debt_ticker: v[10],
          local_company_name: v[13],
        }));
      doneData.value = data
        .filter((v) => v[2] == '2')
        .map((v) => ({
          ticker_id: v[5],
          task_id: v[0],
          bbg_ticker: v[9],
          debt_ticker: v[10],
          local_company_name: v[13],
        }));
    };

    const go2Working = async (record) => {
      const arr = [...workingData.value];
      arr.push({
        ticker_id: record.ticker_id,
        bbg_ticker: record.bbg_ticker,
        debt_ticker: record.debt_ticker,
        task_id: '',
        local_company_name: record.local_company_name,
      });
      workingData.value = arr;
      const a_number = getToken().toLowerCase();
      const { data } = await addTask({
        a_number: a_number,
        ticker_id_list: [record.ticker_id],
        task_code: props.TaskCode,
        task_name: props.TaskName,
        task_status: '1', // 1 working, 2 done
      });
      await fetchTaskList({});
    };

    const go2Done = async (record) => {
      const arr1 = [...workingData.value];
      const arr2 = [...doneData.value];
      const idx = arr1.findIndex((v) => v.ticker_id == record.ticker_id);
      arr1.splice(idx, 1);
      arr2.push({
        ticker_id: record.key,
        bbg_ticker: record.bbg_ticker,
        debt_ticker: record.debt_ticker,
        task_id: record.task_id,
        local_company_name: record.local_company_name,
      });
      workingData.value = arr1;
      doneData.value = arr2;

      const a_number = getToken().toLowerCase();
      const { data } = await updateTask({
        a_number: a_number,
        task_status: '2',
        task_id_list: [record.task_id],
      });
      await fetchTaskList({});
    };

    const removeFromWorkingList = async (record) => {
      const arr = [...workingData.value];
      const idx = arr.findIndex((v) => v.ticker_id == record.ticker_id);
      arr.splice(idx, 1);
      workingData.value = arr;

      const a_number = getToken().toLowerCase();
      const { data } = await deleteTask({
        a_number: a_number,
        task_id_list: [record.task_id],
      });
      await fetchTaskList({});
    };

    const removeFromDoneList = async (record) => {
      const arr = [...doneData.value];
      const idx = arr.findIndex((v) => v.ticker_id == record.ticker_id);
      arr.splice(idx, 1);
      doneData.value = arr;

      const a_number = getToken().toLowerCase();
      const { data } = await deleteTask({
        a_number: a_number,
        task_id_list: [record.task_id],
      });
      await fetchTaskList({});
    };

    const back2Working = async (record) => {
      const arr1 = [...workingData.value];
      const arr2 = [...doneData.value];
      const idx = arr2.findIndex((v) => v.ticker_id == record.ticker_id);
      arr2.splice(idx, 1);
      arr1.push({
        ticker_id: record.key,
        bbg_ticker: record.bbg_ticker,
        local_company_name: record.local_company_name,
        debt_ticker: record.debt_ticker,
        market: record.market,
        analyst_name: record.analyst_name,
        task_id: record.task_id,
      });
      workingData.value = arr1;
      doneData.value = arr2;

      const a_number = getToken().toLowerCase();
      const { data } = await updateTask({
        a_number: a_number,
        task_status: '1',
        task_id_list: [record.task_id],
      });
      await fetchTaskList({});
    };

    const allGo2Working = async () => {
      const arr1 = [...todoData.value];
      const arr2 = [...workingData.value];
      arr2.push(...arr1);
      workingData.value = arr2;

      const a_number = getToken().toLowerCase();
      const { data } = await addTask({
        a_number: a_number,
        ticker_id_list: workingData.value.map((v) => v.ticker_id),
        task_code: props.TaskCode,
        task_name: props.TaskName,
        task_status: '1', // 1 working, 2 done
      });
      await fetchTaskList({});
    };

    const allGo2Done = async () => {
      const arr1 = [...workingData.value];
      const arr2 = [...doneData.value];
      arr2.push(...arr1);
      workingData.value = [];
      doneData.value = arr2;

      const a_number = getToken().toLowerCase();
      const { data } = await updateTask({
        a_number: a_number,
        task_id_list: doneData.value.map((v) => v.task_id),
        task_status: '2', // 1 working, 2 done
      });
      await fetchTaskList({});
    };

    const allGoBack2Working = async () => {
      const arr1 = [...doneData.value];
      const arr2 = [...workingData.value];
      arr2.push(...arr1);
      doneData.value = [];
      workingData.value = arr2;

      const a_number = getToken().toLowerCase();
      const { data } = await updateTask({
        a_number: a_number,
        task_id_list: arr1.map((v) => v.task_id),
        task_status: '1', // 1 working, 2 done
      });
      await fetchTaskList({});
    };
    const clearSeach = () => {
      todoData.value = todoOriginData.value;
    };
    const search = (txt) => {
      if (!txt) {
        todoData.value = todoOriginData.value;
        return;
      }
      todoData.value = todoOriginData.value.filter(
        (v) =>
          v.bbg_ticker.toLowerCase().indexOf(txt.toLowerCase()) != -1 ||
          v.bbg_ticker.toLowerCase() == txt.toLowerCase() ||
          v.local_company_name.toLowerCase() == txt.toLowerCase() ||
          v.local_company_name.toLowerCase().indexOf(txt.toLowerCase()) != -1 ||
          v.debt_ticker.toLowerCase() == txt.toLowerCase() ||
          v.debt_ticker.toLowerCase().indexOf(txt.toLowerCase()) != -1
      );
    };

    const selectAnalyst = (arr) => {
      if (!arr.length) {
        todoData.value = todoOriginData.value;
        return;
      }
      todoData.value = todoOriginData.value.filter((v) =>
        arr.includes(v.analyst_name)
      );
    };

    const rowSelection = {
      type: 'checkbox',
      showCheckedAll: true,
    };
    let sourceColumns = [];
    let workingColumns = [];
    let doneColumns = [];
    if (Channel == 'fi') {
      sourceColumns = [
        {
          title: 'Debt Ticker',
          dataIndex: 'debt_ticker',
          ellipsis: true,
        },
        {
          title: 'Analyst',
          dataIndex: 'analyst_name',
          ellipsis: true,
        },
        {
          title: 'Company Name',
          dataIndex: 'local_company_name',
          ellipsis: true,
        },
        {
          title: '',
          slotName: 'operation',
          dataIndex: 'operation',
          width: 60,
          fixed: 'right',
        },
      ];
      workingColumns = [
        {
          title: '',
          slotName: 'operation1',
          dataIndex: 'operation1',
          width: 50,
        },

        {
          title: 'Debt Ticker',
          dataIndex: 'debt_ticker',
          ellipsis: true,
        },
        {
          title: 'Company Name',
          dataIndex: 'local_company_name',
          ellipsis: true,
        },
        {
          title: '',
          slotName: 'operation2',
          dataIndex: 'operation2',
          width: 50,
        },
      ];
      doneColumns = [
        {
          title: '',
          slotName: 'operation1',
          dataIndex: 'operation1',
          width: 60,
        },

        {
          title: 'Debt Ticker',
          dataIndex: 'debt_ticker',
          ellipsis: true,
        },
        {
          title: 'Company Name',
          dataIndex: 'local_company_name',
          ellipsis: true,
        },

        {
          title: '',
          slotName: 'operation2',
          dataIndex: 'operation2',
          width: 60,
        },
      ];
    } else {
      sourceColumns = [
        {
          title: 'BBG Ticker',
          dataIndex: 'bbg_ticker',
          ellipsis: true,
          width: 160,
        },
        {
          title: 'Analyst',
          dataIndex: 'analyst_name',
          ellipsis: true,
        },
        {
          title: 'Company Name',
          dataIndex: 'local_company_name',
          ellipsis: true,
        },
        {
          title: '',
          slotName: 'operation',
          dataIndex: 'operation',
          width: 60,
          fixed: 'right',
        },
      ];

      workingColumns = [
        {
          title: '',
          slotName: 'operation1',
          dataIndex: 'operation1',
          width: 50,
        },
        {
          title: 'BBG Ticker',
          dataIndex: 'bbg_ticker',
          ellipsis: true,
        },
        {
          title: 'Company Name',
          dataIndex: 'local_company_name',
          ellipsis: true,
        },

        {
          title: '',
          slotName: 'operation2',
          dataIndex: 'operation2',
          width: 50,
        },
      ];
      doneColumns = [
        {
          title: '',
          slotName: 'operation1',
          dataIndex: 'operation1',
          width: 60,
        },
        {
          title: 'BBG Ticker',
          dataIndex: 'bbg_ticker',
          ellipsis: true,
        },
        {
          title: 'Company Name',
          dataIndex: 'local_company_name',
          ellipsis: true,
        },

        {
          title: '',
          slotName: 'operation2',
          dataIndex: 'operation2',
          width: 60,
        },
      ];
    }

    // fetchTickers({});
    // fetchTaskList({});

    const arrayContainsArray = (a, b) => {
      return b.every((v) => a.includes(v));
    };

    const expandable = {
      title: 'Expand',
      width: 80,
    };

    const scroll = {
      x: 2000,
      y: 200,
    };

    const _search = (e) => {
      search(e.target.value);
    };

    return {
      _search,
      title,
      scroll,
      loading,
      todoData,
      workingData,
      doneData,
      // fetchTickers,
      rowSelection,
      sourceColumns,
      workingColumns,
      doneColumns,
      go2Working,
      go2Done,
      back2Working,
      analystList,
      removeFromWorkingList,
      removeFromDoneList,
      search,
      selectAnalyst,
      allGo2Working,
      allGo2Done,
      allGoBack2Working,
      expandable,
      clearSeach,
    };
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  align-items: center;
}
.todo {
  width: 550px;
}
.working {
  width: 400px;
}
.done {
  width: 400px;
}
.card-wrap {
  height: 100%;
  transition: all 0.3s;
  border: 1px solid var(--color-neutral-3);
  &:hover {
    transform: translateY(-4px);
  }
  :deep(.arco-card-meta-description) {
    color: rgb(var(--gray-6));
    .arco-descriptions-item-label-inline {
      font-weight: normal;
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
    .arco-descriptions-item-value-inline {
      color: rgb(var(--gray-8));
    }
  }
}
.empty-wrap {
  height: 200px;
  border-radius: 4px;
  :deep(.arco-card) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    .arco-result-title {
      color: rgb(var(--gray-6));
    }
  }
}
</style>
