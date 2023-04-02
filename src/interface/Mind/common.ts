// sla-collapse的配置数据类型
export type CollapseOptionType = Record<'title', string> & Record<'visible', boolean>;
// sla-collapse的模块类型
export type CollapseOptionKey = 'meta' | 'options';
// sla-collapse的数据组装类型
export type Collapse = Record<CollapseOptionKey, CollapseOptionType>;
