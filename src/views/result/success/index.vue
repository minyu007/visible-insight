<template>
  <div class="container">
    <Breadcrumb :items="['Authoring', 'Authoring-edit']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card">
        <div style="margin-left: 20%;font-size: 15px;color: black;height: 30px;padding-top: 20px;margin-bottom: 20px">
          ESG Rating List
        </div>
        <div class="cen" style="display:flex;flex-direction: row;width: 100%;">
          <div style="width: 18%;height: 110%;margin-right: 2%;margin-top: -3%">
            <a-table  style="height: 100%;width: 100%;" :columns="columns4" :data="data4" :pagination="false" />
          </div>
          <div class="wrapper">
            <a-table style="height: 300px;width: 100%" :columns="columns" :data="data" :scroll="scroll"
                     :loading="bool" :row-class="activeRowClass"
                     @row-click="cl"
                     :pagination="false"
            />
            <div class="cenbom">
              <!--            <template #title></template>  <template #title>ESG Rating Preview</template>-->
              <p style="position: absolute;top: -60px;font-size: 15px;color: black">ESG Engagement</p>
              <p style="position: absolute;top: -60px;font-size: 15px;left: 52%;color: black">ESG Rating Preview</p>

              <div style="width: 50%;height: 350px;display: flex;">

                <a-table style="width: 99%;" :columns="columns2" :data="data2" :expandable="expandable"
                         :scroll="scroll1" :loading="bool2" :pagination="false"/>
              </div>
              <div style="width: 50%;height: 350px;display: flex;flex-direction: column">
                <div style="height: 10%;margin-bottom: 30px;margin-left: 20px">
                  <a-space>
                    <a-popover title="Overall">
                      <a-button @click="changetable">Overall</a-button>
                      <!--                      <template #content>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                      </template>-->
                    </a-popover>
                    <a-popover title="Environmental" >
                      <a-button @click="changetable1">Environmental</a-button>
                      <!--                      <template #content>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                      </template>-->
                    </a-popover>
                    <a-popover title="Social">
                      <a-button @click="changetable2">Social</a-button>
                      <!--                      <template #content>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                      </template>-->
                    </a-popover>
                    <a-popover title="Governance">
                      <a-button @click="changetable3">Governance</a-button>
                      <!--                      <template #content>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                        <p>Here is the text content</p>-->
                      <!--                      </template>-->
                    </a-popover>
                  </a-space>
                </div>
                <a-table style="width: 99%;margin-left: 20px" :columns="columns3" :data="data3" :loading="bool2"
                         :scroll="scroll2" :bordered="{headerCell:true}" v-if="b1" :pagination="false"/>
                <a-table style="width: 99%;margin-left: 20px" :columns="columns31" :data="data31" :loading="bool2"
                         :scroll="scroll2" :bordered="{headerCell:true}" v-if="b2" :pagination="false"/>
                <a-table style="width: 99%;margin-left: 20px" :columns="columns32" :data="data32" :loading="bool2"
                         :scroll="scroll2" :bordered="{headerCell:true}" v-if="b3" :pagination="false"/>
                <a-table style="width: 99%;margin-left: 20px" :columns="columns33" :data="data33" :loading="bool2"
                         :scroll="scroll2" :bordered="{headerCell:true}" v-if="b4" :pagination="false"/>
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
let bool = ref(true);
let bool2 =ref(true)
onMounted(function() {
  setTimeout(() => {
    bool.value = false;
    bool2.value=false
  }, 1500);
});
const scroll = {
  x: 1500,
  y: 200
};
const scroll1 = {
  x: 1000,
  y: 250
};
const scroll2 = {
  x: 1000,
  y: 150
};
let b1 = ref(true), b2 = ref(false), b3 = ref(false), b4 = ref(false);
let changetable = function() {
  b1.value = true;
  b2.value = false;
  b3.value = false;
  b4.value = false;
};
let changetable2 = function() {
  b1.value = false;
  b2.value = false;
  b3.value = true;
  b4.value = false;
};
let changetable3 = function() {
  b1.value = false;
  b2.value = false;
  b3.value = false;
  b4.value = true;

};
let changetable1 = function() {
  b1.value = false;
  b2.value = true;
  b3.value = false;
  b4.value = false;

};
let actives = ref('')
let activeRowClass =  (record) => {
  // console.log(record)
  return record.key === actives.value ? 'activeRowLight' : '';
};

const cl = (record) => {
  // console.log(record.key)
  actives.value=record.key
  bool2.value=true
  setTimeout(() => {
    bool2.value = false;
  }, 1500);
}
//////
const columns = [
  {
    title: "BBC Ticker",
    dataIndex: "bbc Ticker"
  },
  {
    title: "ISIN",
    dataIndex: "isin"
  },
  {
    title: "CUSIP",
    dataIndex: "cusip"
  },
  {
    title: "Debt Ticker",
    dataIndex: "debt ticker"
  },
  {
    title: "Issure Name",
    dataIndex: "issure name"
  },
  {
    title: "Fi Assigned Analyst",
    dataIndex: "fi assigned analyst"
  },
  {
    title: "Eq Assigned Analyst",
    dataIndex: "eq assigned analyst"
  },
  {
    title: "Holding Fund Name",
    dataIndex: "holding fund name"
  },
  {
    title: "MSCI ESG Rating",
    dataIndex: "msci esg rating"
  }

];
const data = reactive([{
  key: "1",
  "bbc Ticker": "FOUR.LN",
  isin: "GB0006640972",
  cusip: "087998",
  "debt ticker": "       ",
  "issure name": "4IMPRINT GROUP PLC",
  "fi assigned analyst": "     ",
  "eq assigned analyst": "TURNER,BEN",
  "holding fund name": "BUMA-UI-FDS | FIDELITY",
  "msci esg rating": "AA",
  "msci derived esg rating": "     "
}, {
  key: "2",
  "bbc Ticker": "MMM.US",
  isin: "US88579Y1010",
  cusip: "88579Y",
  "debt ticker": "MMM CORP",
  "issure name": "3M CO",
  "fi assigned analyst": "MISSAR,BOBBY",
  "eq assigned analyst": "PAREKH,SHREEJI",
  "holding fund name": "FID GLBL CONC EQTY FND D...",
  "msci esg rating": "AAA",
  "msci derived esg rating": "     "
}, {
  key: "3",
  "bbc Ticker": "688536.CH",
  isin: "CNE1000042T2",
  cusip: "B19229",
  "debt ticker": "       ",
  "issure name": "3PEAK INC",
  "fi assigned analyst": "     ",
  "eq assigned analyst": "WANG,VIVIAN MZ",
  "holding fund name": "      ",
  "msci esg rating": "CCC",
  "msci derived esg rating": "     "
}, {
  key: "4",
  "bbc Ticker": "RRRP3.BZ",
  isin: "BRRRRPACNOR5",
  cusip: "B25862",
  "debt ticker": "       ",
  "issure name": "3R PETROLEUM OLEO E GA...",
  "fi assigned analyst": "     ",
  "eq assigned analyst": "STAFFORD,LAURA",
  "holding fund name": "FID FDS SUST RE EM EQ PL,FI...",
  "msci esg rating": "BBB",
  "msci derived esg rating": "     "
}, {
  key: "5",
  "bbc Ticker": "1530.HK",
  isin: "KYG8875G1029",
  cusip: "8875Y",
  "debt ticker": "          ",
  "issure name": "3SBIO INC",
  "fi assigned analyst": "     ",
  "eq assigned analyst": "LANG,YUANLIN",
  "holding fund name": "      ",
  "msci esg rating": "AA",
  "msci derived esg rating": "     "
}]);
///
const expandable = reactive({
  title: "Expand",
  width: 80,
  expandedRowRender: (record) => {
    if (record.key === "1") {
      return `EXECUTIVE REMUNERATION----- Responed to remuneration consultation letter. The main change they are proposing for the upcoming three-year
              period is the possibility of introducing an LTIP`;
    } else if (record.key === "2") {
      return `BUSINESS ETHICS---- We encouraged companies to manage social impacts on communities arising from the cost-of-living crisis in a responsible manner`;
    } else if (record.key === "3") {
      return;
    } else if (record.key === "4") {
      return;
    }
  }
});
const columns2 = [
  {
    title: "Date",
    dataIndex: "date"
  },
  {
    title: "Analyst",
    dataIndex: "analyst"
  },
  {
    title: "Objective",
    dataIndex: "objective"
  },
  {
    title: "Engagement Type",
    dataIndex: "engagement type"
  },
  {
    title: "Engagement Mode",
    dataIndex: "engagement mode"
  },
  {
    title: "Company Rpresentative",
    dataIndex: "company rpresentative"
  },
  {
    title: "Engagement Topic Area(s)",
    dataIndex: "engagement topic area(s)"
  }
];

const data2 = reactive([
  {
    key: "1",
    date: "10 Oct 2023",
    analyst: "ROBERTS FIL,MATTHEW",
    objective: "Policy development",
    "engagement type": "reactive",
    "engagement mode": "Written Correspondence",
    "company representative": "Remuneration Committee chair...",
    "engagement topic area(s)": "EXECUTIVE REMUNERATION"
  }, {
    key: "2",
    date: "22 Nov 2022",
    analyst: "ROBERTS FIL,MATTHEW",
    objective: "Improved performance",
    "engagement type": "Thematic",
    "engagement mode": "Written Correspondence",
    "company representative": "Chairman",
    "engagement topic area(s)": "BUSINESS ETHICS,CLIMATE CHANGE,EXECUTIVE REMUNERATION"
  }, {
    key: "3",
    date: "26 Nov 2020",
    analyst: "RoMANO,LUCA",
    objective: "N/A",
    "engagement type": "Proactive",
    "engagement mode": "Conference Call",
    "company representative": "Chairman",
    "engagement topic area(s)": "EXECUTIVE REMUNERATION"
  }, {
    key: "4",
    date: "09 Jul 2020",
    analyst: "ROBERTS FIL,MATTHEW",
    objective: "N/A",
    "engagement type": "proactive",
    "engagement mode": "Written Correspondence",
    "company representative": "Investor Relations",
    "engagement topic area(s)": "EXECUTIVE REMUNERATION"
  }
]);
//
const columns3 = reactive([{
  title: "Metrics & Data Reference",
  dataIndex: "mdr",
  // fixed: "left",
  width: 140
},
  {
    title: "Sub-Industry Average",
    dataIndex: "sia",
    // fixed: "left",
    width: 140
  }, {
    title: "MSCI Average",
    dataIndex: "ma",
    // fixed: "right",
    width: 120
  },
  {
    title: "3R PETROLEUM OLEO GAS SA",
    children: [{
      title: "MSCI Score",
      width: 100,
      dataIndex: "ms"
    }, {
      title: "ESG Score",
      width: 100,
      dataIndex: "es"
    }, {
      title: "Comment",
      dataIndex: "com",
      // fixed: "right",
      width: 120
    }
    ]
  }]);
const data3 = reactive([{
  key: "1",
  mdr: "Based on your analysis of the company's sus... ",
  sia: "Improving",
  ma: "",
  ms: "",
  es: "Stable",
  com: "34"
}, {
  key: "2",
  mdr: "Based on your analysis of the company's man... ",
  sia: "C",
  ma: "B",
  ms: "BBB",
  es: "D",
  com: "34"
},
  {
    key: "3",
    mdr: "Equity - How have you factored in ESG risk in your fundamental valuations for the company/issure",
    sia: "",
    ma: "",
    ms: "",
    es: "",
    com: "34"
  },
  {
    key: "4",
    mdr: "Fixed Income/PCT - How have you factored in ESG risk in your fundamental/relative value rating for the company/issuer",
    sia: "",
    ma: "",
    ms: "",
    es: "",
    com: "34"
  }
]);
//
const columns31 = reactive([
  {
    title: "Metrics & Data Reference",
    dataIndex: "mdr",
    // fixed: "left",
    width: 140
  },{
    title: "Weight",
    dataIndex: "w",
    // fixed: "right",
    width: 120
  },
  {
    title: "Sub-Industry Average",
    dataIndex: "sia",
    // fixed: "left",
    width: 140
  },
  {
    title: "3R PETROLEUM OLEO GAS SA",
    children: [{
      title: "Value",
      width: 100,
      dataIndex: "v"
    }, {
      title: "Score",
      width: 100,
      dataIndex: "s"
    }, {
      title: "Comment",
      dataIndex: "com",
      // fixed: "right",
      width: 120
    }
    ]
  }
]);
const data31 = reactive([{
  key: "1",
  mdr: "How does the company manage the water usage from its operations",
  sia: "1.48",
  w: "5%",
  s: "0",
  v: "",
  com: "No disclosure"
}, {
  key: "2",
  mdr: "How does the company manage the GHG emissions from its operations?",
  sia: "1.46",
  w: "55%",
  s: "0.5",
  v: "",
  com: "The company has a project in pace to..."
},
  {
    key: "3",
    mdr: "How does the company manage the toxic emissions from its operations?",
    sia: "1.24",
    w: "10%",
    s: "0",
    v: "",
    com: "No disclosure"
  },
  {
    key: "4",
    mdr: "How does the company manage the negative impact associated with sea use in regards to biodiversity",
    sia: "1.47",
    w: "5%",
    s: "0",
    v: "",
    com: "No disclosure"
  }
]);
//
const columns32 = reactive([
  {
    title: "Metrics & Data Reference",
    dataIndex: "mdr",
    // fixed: "left",
    width: 140
  },{
    title: "Weight",
    dataIndex: "w",
    // fixed: "right",
    width: 120
  },
  {
    title: "Sub-Industry Average",
    dataIndex: "sia",
    // fixed: "left",
    width: 140
  },
  {
    title: "3R PETROLEUM OLEO GAS SA",
    children: [{
      title: "Value",
      width: 100,
      dataIndex: "v"
    }, {
      title: "Score",
      width: 100,
      dataIndex: "s"
    }, {
      title: "Comment",
      dataIndex: "com",
      // fixed: "right",
      width: 120
    }
    ]
  }
]);
const data32 = reactive([{
  key: "4",
  mdr: "How does the company manage the negative impact associated with sea use in regards to biodiversity",
  sia: "1.47",
  w: "35%",
  s: "0",
  v: "",
  com: "No disclosure"
}, {
  key: "2",
  mdr: "How does the company manage the GHG emissions from its operations?",
  sia: "1.46",
  w: "55%",
  s: "0.5",
  v: "",
  com: "The company has a project in pace to..."
},
  {
    key: "3",
    mdr: "How does the company manage the toxic emissions from its operations?",
    sia: "1.24",
    w: "10%",
    s: "0",
    v: "",
    com: "No disclosure"
  },
  {
    key: "4",
    mdr: "How does the company manage the negative impact associated with sea use in regards to biodiversity",
    sia: "1.47",
    w: "5%",
    s: "0",
    v: "",
    com: "No disclosure"
  }
]);
//
const columns33 = reactive([
  {
    title: "Metrics & Data Reference",
    dataIndex: "mdr",
    // fixed: "left",
    width: 140
  },
  {
    title: "Sub-Industry Average",
    dataIndex: "sia",
    // fixed: "left",
    width: 140
  },
  {
    title: "3R PETROLEUM OLEO GAS SA",
    children: [{
      title: "Value",
      width: 100,
      dataIndex: "v"
    }, {
      title: "Score",
      width: 100,
      dataIndex: "s"
    },{
      title: "Weight",
      dataIndex: "w",
      // fixed: "right",
      width: 120
    },{
      title: "Comment",
      dataIndex: "com",
      // fixed: "right",
      width: 120
    }
    ]
  }
]);
const data33 = reactive([{
  key: "1",
  mdr: "Management quality score",
  sia: "1.68",
  w: "20%",
  s: "1",
  v: "",
  com: "None"
}, {
  key: "2",
  mdr: "Board Effectiveness",
  sia: "1.35",
  w: "10%",
  s: "1",
  v: "",
  com: "No issues"
},
  {
    key: "3",
    mdr: "How does the company manage the toxic emissions from its operations?",
    sia: "1.24",
    w: "10%",
    s: "0",
    v: "",
    com: "No disclosure"
  },
  {
    key: "4",
    mdr: "How does the company manage the negative impact associated with sea use in regards to biodiversity",
    sia: "1.47",
    w: "5%",
    s: "0",
    v: "",
    com: "No disclosure"
  }
]);


const columns4 = [
  {
    title: "ESG Function",
    dataIndex: "esg"
  }
];
const data4 = reactive([
  {
    key: "1",
    esg: "Time Frame"
  },
  {
    key: "2",
    esg: "Holdings Time Frame"
  },
  {
    key: "3",
    esg: "Assigned Analyst"
  },
  {
    key: "4",
    esg: "Sectors"
  },
  {
    key: "5",
    esg: "ESG Rating Questings"
  },
  {
    key: "6",
    esg: "Region"
  }, {
    key: "7",
    esg: "Holdings"
  },
  {
    key: "8",
    esg: "Is Held"
  },
  {
    key: "9",
    esg: "Is Assigned"
  },
  {
    key: "10",
    esg: "Rating"
  },
  {
    key: "11",
    esg: "Engagement Mode"
  }, {
    key: "12",
    esg: "Objective"
  }, {
    key: "13",
    esg: "Engagement Type"
  }, {
    key: "14",
    esg: "Company Representative"
  },
  {
    key: "15",
    esg: "Engagement Topics"
  }
]);
</script>

<script lang="ts">
export default {
  name: "Step"
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  background-color: var(--color-bg-2);
  width: 80%;
  :deep(.arco-form) {
    .arco-form-item {
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}
.cenbom {
  position: relative;
  margin: 50px 0 30px 0;
  display: flex;
  flex-direction: row;
  height: 350px;
  width: 100%;
}
:deep(.activeRowLight > .arco-table-td) {
  background-color: #d6deff !important;
}
.steps {
  margin-bottom: 76px;
}
</style>
