import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";


export const setCategoriesMap = (categoriesMap) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesMap)

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories)

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => {
    return async (dispatch) => {
        dispatch(fetchCategoriesStart())
        try {
            const categories = await getCollectionAndDocuments()
            dispatch(fetchCategoriesSuccess(categories))
        } catch (error) {
            dispatch(fetchCategoriesFailed(error))
        }
    }
}