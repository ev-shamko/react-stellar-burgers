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

import { burgerVendorReducer, blankIngr, blankDraggableIngr } from './burgerVendor';

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

const testDraggableIngr = {
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
  instanceID: 0,
}

const initialState = {
  ingridientsData: {
    arrOfIngridients: [],
    ingrDataIsLoading: false,
    ingrDataHasError: false,
  },
  bun: blankDraggableIngr,
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
      bun: blankDraggableIngr,
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
      bun: blankDraggableIngr,
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
      bun: blankDraggableIngr,
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
      bun: blankDraggableIngr,
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
      bun: blankDraggableIngr,
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
      bun: blankDraggableIngr,
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

  it('should handle TOGGLE_MODAL_VISIBILITY', () => {
    expect(burgerVendorReducer(initialState, {
      type: TOGGLE_MODAL_VISIBILITY,
      value: true,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
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

  it('should handle SET_CURRENT_MODAL_TYPE', () => {
    expect(burgerVendorReducer(initialState, {
      type: SET_CURRENT_MODAL_TYPE,
      value: 'IngridientDetails',
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
      draggableIngridients: [],

      modalIsVisible: false,
      currentModalType: 'IngridientDetails',
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

  it('should handle SET_INGRIDIENT_IN_MODAL', () => {
    expect(burgerVendorReducer(initialState, {
      type: SET_INGRIDIENT_IN_MODAL,
      value: testIngr,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
      draggableIngridients: [],

      modalIsVisible: false,
      currentModalType: 'none',
      ingrInModalData: testIngr,

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

  it('should handle SET_ORDER_STATE', () => {
    expect(burgerVendorReducer(initialState, {
      type: SET_ORDER_STATE,
      value: {
        success: true,
        name: 'Test order',
        order: {
          number: '12345',
        },
      },
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
      draggableIngridients: [],

      modalIsVisible: false,
      currentModalType: 'none',
      ingrInModalData: blankIngr,

      orderData: {
        success: true,
        name: 'Test order',
        order: {
          number: '12345',
        },
      },
      constructorLoaderIsVisible: false,
    });
  });

  it('should handle ADD_BUN', () => {
    expect(burgerVendorReducer(initialState, {
      type: ADD_BUN,
      value: testDraggableIngr,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: testDraggableIngr,
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

  it('should handle ADD_SAUCE', () => {
    expect(burgerVendorReducer(initialState, {
      type: ADD_SAUCE,
      value: testDraggableIngr,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
      draggableIngridients: [testDraggableIngr],

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

  it('should handle ADD_MAIN', () => {
    expect(burgerVendorReducer(initialState, {
      type: ADD_MAIN,
      value: testDraggableIngr,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
      draggableIngridients: [testDraggableIngr],

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

  it('should handle REMOVE_ALL_INGRIDIENTS', () => {
    expect(burgerVendorReducer(initialState, {
      type: REMOVE_ALL_INGRIDIENTS,
    })).toEqual(initialState);
  });

  it('should handle SET_CONSTRUCTOR_LOADER', () => {
    expect(burgerVendorReducer(initialState, {
      type: SET_CONSTRUCTOR_LOADER,
      value: true,
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
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
      constructorLoaderIsVisible: true, // here
    });
  });

  it('should handle UPDATE_DRAGGABLE_INGRIDIENTS', () => {
    expect(burgerVendorReducer(initialState, {
      type: UPDATE_DRAGGABLE_INGRIDIENTS,
      value: [testDraggableIngr, testDraggableIngr],
    })).toEqual({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
      draggableIngridients: [testDraggableIngr, testDraggableIngr], // по сути, записывает сюда любой массив объектов нужного типа

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

  it('should handle RESORT_DRAGGABLE_INGRIDIENTS', () => {
    expect(burgerVendorReducer({
      ingridientsData: {
        arrOfIngridients: [],
        ingrDataIsLoading: false,
        ingrDataHasError: false,
      },
      bun: blankDraggableIngr,
      draggableIngridients: [[1, 2], [3, 4]], // тут происходит ресортировка


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
    }, {
      type: RESORT_DRAGGABLE_INGRIDIENTS,
      indexOfDraggedIngr: 0,
      indexOfDroppedIngr: 1,
    }))

      .toEqual({
        ingridientsData: {
          arrOfIngridients: [],
          ingrDataIsLoading: false,
          ingrDataHasError: false,
        },
        bun: blankDraggableIngr,
        draggableIngridients: [[3, 4], [1, 2]], // тут происходит ресортировка

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
      }, {
        type: RESORT_DRAGGABLE_INGRIDIENTS,
        indexOfDraggedIngr: 0,
        indexOfDroppedIngr: 1,
      });
  });


});