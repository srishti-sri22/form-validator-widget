/// <reference types="react" />

import * as React from "react"

export interface FieldConfig {
  name: string
  label?: string
  type?: string
  placeholder?: string
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
  }
  options?: { label: string; value: string }[]
}

export interface FormValidationWidgetProps {
  fields: FieldConfig[]
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>
  submitBtnText?: string
  theme?: string
}

export declare function FormValidationWidget(
  props: FormValidationWidgetProps
): React.ReactElement
