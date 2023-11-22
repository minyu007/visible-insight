import Mock from 'mockjs';
import qs from 'query-string';
import dayjs from 'dayjs';
import { GetParams } from '@/types/global';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const textList = [
  {
    key: '603288.SH',
    clickNumber: '2023-12-28',
    title: 'FOSHAN HAITIAN FLAVORING & FOOD CO LTD A',
    increases: 36,
  },
  {
    key: '603027.SH',
    title: 'QIANHE CONDIMENT AND FOOD CO LTD A',
    clickNumber: '2023-12-21',
    increases: 29,
  },
  {
    key: '600298.SH',
    title: 'ANGEL YEAST CO LTD A',
    clickNumber: '2023-01-16',
    increases: 55,
  },
  {
    key: '600305.SH',
    title: 'JIANGSU HENGSHUN VGR IND CO A', 
    clickNumber: '2023-02-01',
    increases: 70,
  },
  {
    key: '002027.CH',
    title: 'FOCUS MEDIA INFORMATION TECHNOLOGY CO LTD A',
    clickNumber: '2023-12-08',
    increases: 16,
  },
];
const imageList = [
  {
    key: '603288.SH',
    clickNumber: '2023-12-28',
    title: 'FOSHAN HAITIAN FLAVORING & FOOD CO LTD A',
    increases: 36,
  },
  {
    key: '603027.SH',
    title: 'QIANHE CONDIMENT AND FOOD CO LTD A',
    clickNumber: '2023-12-21',
    increases: 29,
  },
  {
    key: '600298.SH',
    title: 'ANGEL YEAST CO LTD A',
    clickNumber: '2023-01-16',
    increases: 55,
  },
  {
    key: '600305.SH',
    title: 'JIANGSU HENGSHUN VGR IND CO A', 
    clickNumber: '2023-02-01',
    increases: 70,
  },
  {
    key: '002027.CH',
    title: 'FOCUS MEDIA INFORMATION TECHNOLOGY CO LTD A',
    clickNumber: '2023-12-08',
    increases: 16,
  },
];
const videoList = [
  // {
  //   key: 1,
  //   clickNumber: '367.6w+',
  //   title: '这是今日10点的南京',
  //   increases: 5,
  // },
  // {
  //   key: 2,
  //   clickNumber: '352.2w+',
  //   title: '立陶宛不断挑衅致经济受损民众…',
  //   increases: 17,
  // },
  // {
  //   key: 3,
  //   clickNumber: '348.9w+',
  //   title: '韩国艺人刘在石确诊新冠',
  //   increases: 30,
  // },
  // {
  //   key: 4,
  //   clickNumber: '346.3w+',
  //   title: '关于北京冬奥会，文在寅表态',
  //   increases: 12,
  // },
  // {
  //   key: 5,
  //   clickNumber: '271.2w+',
  //   title: '95后现役军人荣立一等功',
  //   increases: 2,
  // },
];
setupMock({
  setup() {
    Mock.mock(new RegExp('/api/content-data'), () => {
      const presetData = [58, 81, 53, 90, 64, 88, 49, 79];
      const getLineData = () => {
        const count = 8;
        return new Array(count).fill(0).map((el, idx) => ({
          x: dayjs()
            .day(idx - 2)
            .format('YYYY-MM-DD'),
          y: presetData[idx],
        }));
      };
      return successResponseWrap([...getLineData()]);
    });
    Mock.mock(new RegExp('/api/popular/list'), (params: GetParams) => {
      const { type = 'text' } = qs.parseUrl(params.url).query;
      if (type === 'image') {
        return successResponseWrap([...videoList]);
      }
      if (type === 'video') {
        return successResponseWrap([...imageList]);
      }
      return successResponseWrap([...textList]);
    });
  },
});
