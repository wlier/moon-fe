import { Button } from '@/components/ui/button'
import {
  Condition,
  DatasourceType,
  Gender,
  MetricType,
  Role,
  Status,
  StorageType,
  SustainType,
} from './enum'
import { Promethues, VictoriaMetrics } from '@/components/icon'

export interface PaginationReq {
  pageNum: number
  pageSize: number
}

export interface PaginationReply extends PaginationReq {
  total: number
}

export interface PaginationResponse<T> {
  pagination: PaginationReply
  list: T[]
}

export interface SelectExtendType {
  icon?: string
  color?: string
  remark?: string
  image?: string
}

export interface SelectType {
  value: number
  label: string
  children?: SelectType[]
  disabled: boolean
  extend?: SelectExtendType
}

// 枚举类型
export interface EnumItem {
  // 枚举值
  value: number
  // 枚举描述
  label: string
}

export const StatusData: Record<Status, { color: string; text: string }> = {
  [Status.StatusAll]: {
    color: 'blue',
    text: '全部',
  },
  [Status.StatusEnable]: {
    color: 'green',
    text: '启用',
  },
  [Status.StatusDisable]: {
    color: 'red',
    text: '禁用',
  },
}

export const GenderData: Record<Gender, string> = {
  [Gender.GenderAll]: '全部',
  [Gender.GenderMale]: '男',
  [Gender.GenderFemale]: '女',
}

export const RoleData: Record<Role, string> = {
  [Role.RoleAll]: '全部',
  [Role.RoleSupperAdmin]: '超级管理员',
  [Role.RoleAdmin]: '管理员',
  [Role.RoleUser]: '普通用户',
}

export type TagItemType = {
  text: string
  color: string
}

export const MetricTypeData: Record<MetricType, TagItemType> = {
  [MetricType.MetricTypeUnknown]: {
    text: '全部',
    color: '',
  },
  [MetricType.MetricTypeCounter]: {
    text: 'Counter',
    color: 'green',
  },
  [MetricType.MetricTypeGauge]: {
    text: 'Gauge',
    color: 'blue',
  },
  [MetricType.MetricTypeHistogram]: {
    text: 'Histogram',
    color: 'purple',
  },
  [MetricType.MetricTypeSummary]: {
    text: 'Summary',
    color: 'orange',
  },
}

export const DataSourceTypeData: Record<DatasourceType, string> = {
  [DatasourceType.DatasourceTypeUnknown]: '全部',
  [DatasourceType.DatasourceTypeMetric]: 'Metric',
  [DatasourceType.DatasourceTypeLog]: 'Log',
  [DatasourceType.DatasourceTypeTrace]: 'Trace',
}

export const StorageTypeData: Record<StorageType, string> = {
  [StorageType.StorageTypeUnknown]: '全部',
  [StorageType.StorageTypePrometheus]: 'Prometheus',
  [StorageType.StorageTypeVictoriaMetrics]: 'VictoriaMetrics',
}

export const StorageTypeIcon: Record<StorageType, React.ReactNode> = {
  [StorageType.StorageTypePrometheus]: (
    <Button variant='secondary' size='icon'>
      <Promethues />
    </Button>
  ),
  [StorageType.StorageTypeVictoriaMetrics]: (
    <Button variant='secondary' size='icon'>
      <VictoriaMetrics />
    </Button>
  ),
  [StorageType.StorageTypeUnknown]: undefined,
}

export const ConditionData: Record<Condition, string> = {
  [Condition.ConditionUnknown]: '全部',
  [Condition.ConditionEQ]: '等于(==)',
  [Condition.ConditionNE]: '不等于(!=)',
  [Condition.ConditionGT]: '大于(>)',
  [Condition.ConditionGTE]: '大于等于(>=)',
  [Condition.ConditionLT]: '小于(<)',
  [Condition.ConditionLTE]: '小于等于(<=)',
}

export const SustainTypeData: Record<SustainType, string> = {
  [SustainType.SustainTypeUnknown]: 'm时间内出现n次',
  [SustainType.SustainTypeFor]: 'm时间内出现n次',
  [SustainType.SustainTypeMax]: 'm时间内最多出现n次',
  [SustainType.SustainTypeMin]: 'm时间内最少出现n次',
}

// 操作
export enum ActionKey {
  /** 详情 */
  DETAIL = '__detail__',
  /** 编辑 */
  EDIT = '__edit__',
  /** 删除 */
  DELETE = '__delete__',
  /** 启用 */
  ENABLE = '__enable__',
  /** 禁用 */
  DISABLE = '__disable__',
  /** 操作日志 */
  OPERATION_LOG = '__operation_log__',
  /** 开启 */
  OPEN = '__open__',
  /** 关闭 */
  CLOSE = '__close__',
  /** 订阅 */
  SUBSCRIBE = '__subscribe__',
  /** 取消订阅 */
  UNSUBSCRIBE = '__unsubscribe__',
  /** 订阅列表 */
  SUBSCRIBER_LIST = '__subscriber_list__',
  /** 订阅策略 */
  SUBSCRIBER_STRATEGY = '__subscriber_strategy__',
  /** 策略列表 */
  STRATEGY_LIST = '__strategy_list__',
}
