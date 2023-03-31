export type ButtonType = 'search' | 'down' | 'add' | 'import'; // 按钮类型

export type Picker = 'date' | 'week' | 'month' | 'quarter' | 'year';

// 值 文字
export type Option = Record<'value' | 'label', string>;

interface BaseComponents {
  key: string;
  className?: string;
  label: string;
}

export interface BaseInputItem extends BaseComponents {
  disabled?: boolean;
  placeholder?: string;
}

export interface BaseSwitchItem extends BaseComponents {
}

export interface BaseSelectItem extends BaseComponents {
  placeholder?: string; // 占位符
  options: Option[]; // options
  showSearch?: boolean;
}

export interface BaseRangePickerItem extends BaseComponents {
  keys: [string, string]; //
  defaultValue?: [string, string]; //
  maxMonth?: number; // 最大月份
  placeholder?: [string, string]; // 占位符
  picker?: Picker; // pciker
}

export interface BaseButtonItem extends BaseComponents {
  buttonType?: ButtonType; // button 类型
  placeholder: string; // 按钮文字
}

export type BaseOptionItem =
  | (BaseInputItem & { type: 'input' })
  | (BaseSwitchItem & { type: 'switch' })
  | (BaseSelectItem & { type: 'select' })
  | (BaseRangePickerItem & { type: 'rangePicker' })
  | (BaseButtonItem & { type: 'button' });
