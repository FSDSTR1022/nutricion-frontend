import React from 'react'
import { createFilterOptions } from '@mui/material/Autocomplete'

{
    label: 'Between',
    value: 'between',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
        return null;
      }
      if (filterItem.value[0] == null || filterItem.value[1] == null) {
        return null;
      }
      return ({ value }): boolean => {
        return value != null && filterItem.value[0] <= value && value <= filterItem.value[1];
      };
    },
    InputComponent: InputNumberInterval,
  }



const Filter = () => {
  return (
    <div>Filter</div>
  )
}

export default Filter