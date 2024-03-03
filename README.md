## 启动

```
npm run dev
```

## 方法

### 多语言

```js
import locale, { langMap } from '@/locale';

// 获取多语言列表
langMap;
// 设置多语言
locale.setLanguage(name);
// 获取当前多语言
locale.getLanguage().name;
// 获取某个字段多语言 第二参数为插槽 第三个为需要返回的值
locale.t('title', ['$1'], [11]);
```

### echarts

```js
import useCharts from '@/hooks/useCharts';
// 初始化
let { chartData, setChartData, chartOptions } =
  useCharts <
  LineInf >
  {
    labels: [],
    datasets: [],
  };
// 设置 echarts 的值
setChartData({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [50, 60, 70, 80, 90],
    },
  ],
});

<Line data={chartData()} options={chartOptions} width={50} height={200} />;
```

### table

```tsx
// tableData 为值
// setTableData 设置值
// setPages 翻页
// setPageSize 设置PageSize
// requestData 请求
// page 基本参数 pageSize total pageNum
const { tableData, setTableData, setPages, setPageSize, requestData, page } =
  useTable < getAdministratorListParams; // params 泛型,
getAdministratorListResult > // 结果 泛型
  (getAdministratorList,
  {
    searchKey: '',
  });


<Table columns={columns} data={tableData()} />
<Pagination
  current={page().pageNum}
  pageSize={page().pageSize}
  total={page().total}
  onChange={(page: number) => {
  setPages(page);
  // console.log();
  }}
></Pagination>
```
