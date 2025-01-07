export const formatNumber = (val: number, fixed = 6) =>
  Number(val.toFixed(fixed))

export const isNumber = (val: string | number) => typeof val === 'number'
