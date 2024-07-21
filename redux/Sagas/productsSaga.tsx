import { ProductTypes } from "../ActionTypes";
import { ProductServices } from "../ApiServices";
import { takeLatest, call, put } from 'redux-saga/effects';

function* addToWishlist(action) {
    const { token, productId } = action.payload;
    try {
        const res = yield call(ProductServices.addTowishlist, { token, productId });
        if (res.error) {
            yield put({ type: ProductTypes.ADD_TO_WISHLIST_ERROR, error: res.message });
        } else {
            yield put({
                type: ProductTypes.ADD_TO_WISHLIST_SUCCESS,
                data: {
                    message: res.message,
                    product: res.product,
                },
            });
        }
    } catch (error) {
        yield put({ type: ProductTypes.ADD_TO_WISHLIST_ERROR, error: error.message });
    }
}


function* removeFromWishlist(action) {
    const { token, productId } = action.payload;
    try {
        const res = yield call(ProductServices.removeFromWishlist, { token, productId });
        if (res.error) {
            yield put({ type: ProductTypes.REMOVE_FROM_WISHLIST_ERROR, error: res.message });
        } else {
            yield put({
                type: ProductTypes.REMOVE_FROM_WISHLIST_SUCCESS,
                data: {
                    message: res.message,
                    productId: productId,
                },
            });
        }
    } catch (error) {
        yield put({ type: ProductTypes.ADD_TO_WISHLIST_ERROR, error: error.message });
    }
}


function* getWishListProducts(action) {
    const { token } = action.payload;
    try {
        const res = yield call(ProductServices.getWishListProducts, { token });
        if (res.error) {
            yield put({ type: ProductTypes.GET_WISHLIST_PRODUCTS_ERROR, error: res.message });
        } else {
            yield put({
                type: ProductTypes.GET_WISHLIST_PRODUCTS_SUCCESS,
                data: res,
            });
        }
    } catch (error) {
        yield put({ type: ProductTypes.GET_WISHLIST_PRODUCTS_ERROR, error: error.message });
    }
}



export default function* productsSaga() {
    yield takeLatest(ProductTypes.ADD_TO_WISHLIST_REQUEST, addToWishlist);
    yield takeLatest(ProductTypes.REMOVE_FROM_WISHLIST_REQUEST, removeFromWishlist);
    yield takeLatest(ProductTypes.GET_WISHLIST_PRODUCTS_REQUEST, getWishListProducts);
}
