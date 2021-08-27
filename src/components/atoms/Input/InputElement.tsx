import React, { ReactElement } from 'react'
import slugify from '@sindresorhus/slugify'
import styles from './InputElement.module.css'
import { InputProps } from '.'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const DefaultInput = ({
  size,
  className,
  prefix,
  postfix,
  additionalComponent,
  ...props
}: InputProps) => (
  <input
    className={cx({ input: true, [size]: size, [className]: className })}
    id={props.name}
    {...props}
  />
)

export default function InputElement({
  type,
  options,
  sortOptions,
  name,
  prefix,
  postfix,
  size,
  field,
  label,
  multiple,
  disabled,
  help,
  form,
  additionalComponent,
  ...props
}: InputProps): ReactElement {
  const styleClasses = cx({ select: true, [size]: size })
  switch (type) {
    case 'select': {
      const sortedOptions =
        !sortOptions && sortOptions === false
          ? options
          : options.sort((a: string, b: string) => a.localeCompare(b))
      return (
        <select
          id={name}
          className={styleClasses}
          {...props}
          multiple={multiple}
        >
          {field !== undefined && field.value === '' && (
            <option value="">---</option>
          )}
          {sortedOptions &&
            sortedOptions.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option} {postfix}
              </option>
            ))}
        </select>
      )
    }

    default:
      return prefix || postfix ? (
        <div className={`${prefix ? styles.prefixGroup : styles.postfixGroup}`}>
          {prefix && (
            <div className={cx({ prefix: true, [size]: size })}>{prefix}</div>
          )}
          <DefaultInput
            name={name}
            type={type || 'text'}
            size={size}
            disabled={disabled}
            {...props}
          />
          {postfix && (
            <div className={cx({ postfix: true, [size]: size })}>{postfix}</div>
          )}
        </div>
      ) : (
        <DefaultInput
          name={name}
          type={type || 'text'}
          size={size}
          disabled={disabled}
          {...props}
        />
      )
  }
}
