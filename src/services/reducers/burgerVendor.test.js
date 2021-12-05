import {
  TOGGLE_MODAL_VISIBILITY,
  SET_CURRENT_MODAL_TYPE,
  SET_INGRIDIENT_IN_MODAL,
  SET_ORDER_STATE,
  INGRIDIENT_FETCH_SUCCESS,
  INGRIDIENT_FETCH_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_TYPE,
  ADD_BUN,
  ADD_SAUCE,
  ADD_MAIN,
  UPDATE_DRAGGABLE_INGRIDIENTS,
  REMOVE_ALL_INGRIDIENTS,
  RESORT_DRAGGABLE_INGRIDIENTS,
  SET_CONSTRUCTOR_LOADER,
} from '../actions/burgerVendor';

import { burgerVendorReducer, blankIngr } from './burgerVendor';

const testIngr = {
  _id: 'test',
  name: 'test',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: 'test',
  image_mobile: 'test',
  image_large: 'test',
  __v: 0,
}

const initialState = {
  ingridientsData: {
    arrOfIngridients: [],
    ingrDataIsLoading: false,
    ingrDataHasError: false,
  },
  bun: blankIngr,
  draggableIngridients: [],

  modalIsVisible: false,
  currentModalType: 'none',
  ingrInModalData: blankIngr,

  orderData: {
    success: false,
    name: '',
    order: {
      number: '',
    },
  },
  constructorLoaderIsVisible: false,
};


describe('burgerVendoe reducer', () => {
  it('should return initial state', () => {
    expect(burgerVendorReducer(undefined, {})).toEqual(initialState)
  });

  it('should handle INGRIDIENT_FETCH_SUCCESS', () => {
    expect(burgerVendorReducer(initialState, {
      type: INGRIDIENT_FETCH_SUCCESS,
      value: [testIngr, testIngr],
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [testIngr, testIngr], // в массив записываются объекты ингредиентов
        ingrDataIsLoading: false, //
        ingrDataHasError: false, //
      },
      bun: blankIngr,
      draggableIngridients: [],
      modalIsVisible: false,
      currentModalType: 'none',
      ingrInModalData: blankIngr,
      orderData: {
        success: false,
        name: '',
        order: {
          number: '',
        },
      },
      constructorLoaderIsVisible: false,
    });
  });

  it('should handle INGRIDIENT_FETCH_ERROR', () => {
    expect(burgerVendorReducer(initialState, {
      type: INGRIDIENT_FETCH_ERROR,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: true
      },
      bun: blankIngr,
      draggableIngridients: [],

      modalIsVisible: false,
      currentModalType: 'none',
      ingrInModalData: blankIngr,

      orderData: {
        success: false,
        name: '',
        order: {
          number: '',
        },
      },
      constructorLoaderIsVisible: false,
    });
  });

  it('should handle OPEN_MODAL', () => {
    expect(burgerVendorReducer(initialState, {
      type: OPEN_MODAL,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankIngr,
      draggableIngridients: [],

      modalIsVisible: true, // here
      currentModalType: 'none',
      ingrInModalData: blankIngr,

      orderData: {
        success: false,
        name: '',
        order: {
          number: '',
        },
      },
      constructorLoaderIsVisible: false,
    });
  });

  it('should handle CLOSE_MODAL', () => {
    expect(burgerVendorReducer({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankIngr,
      draggableIngridients: [],
    
      modalIsVisible: true, // here
      currentModalType: 'none',
      ingrInModalData: blankIngr,
    
      orderData: {
        success: false,
        name: '',
        order: {
          number: '',
        },
      },
      constructorLoaderIsVisible: false,
    }, {
      type: CLOSE_MODAL,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankIngr,
      draggableIngridients: [],

      modalIsVisible: false, // here
      currentModalType: 'none',
      ingrInModalData: blankIngr,

      orderData: {
        success: false,
        name: '',
        order: {
          number: '',
        },
      },
      constructorLoaderIsVisible: false,
    });
  });

  it('should handle SET_MODAL_TYPE', () => {
    expect(burgerVendorReducer(initialState, {
      type: SET_MODAL_TYPE,
      value: 'OrderCard',
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankIngr,
      draggableIngridients: [],
    
      modalIsVisible: false,
      currentModalType: 'OrderCard',
      ingrInModalData: blankIngr,
    
      orderData: {
        success: false,
        name: '',
        order: {
          number: '',
        },
      },
      constructorLoaderIsVisible: false,
    });
  });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

  // it('should handle ', () => {
  //   expect(burgerVendorReducer(initialState, {
  //     type: '',
  //     value: '',
  //   })).toEqual({});
  // });

});