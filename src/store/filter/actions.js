export const ADD_CATEGORY = 'FILTER:ADD_CATEGORY';
export const ADD_BRAND = 'FILTER:ADD_BRAND';
export const ADD_DESIGNER = 'FILTER:ADD_DESIGNER';

export const DELETE_CATEGORY = 'FILTER:DELETE_CATEGORY';
export const CLEAN_FILTER = 'FILTER:CLEAN_FILTER';

export const addCategory = (category) => ({
    type: ADD_CATEGORY,
    payload: category
})

export const addBrand= (brand) => ({
    type: ADD_BRAND,
    payload: brand
})

export const addDesigner= (designer) => ({
    type: ADD_DESIGNER,
    payload: designer
})

export const cleanFilter = {
    type: CLEAN_FILTER,
}