export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTOS":
      return {
        ...state,
        tour: Array.isArray(action.payload) ? action.payload : [], // Verifica que sea un array
      };

    case "ADD_PRODUCTO":
      return {
        ...state,
        tour: [...state.tour, action.payload], // Agrega el nuevo tour al estado existente
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: Array.isArray(action.payload) ? action.payload : [], // Verifica que sea un array
      };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_USER_ACTIVE":
      return {
        ...state,
        userActive: action.payload,
      };

    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.payload,
      };

    case "SET_USER_SURNAME":
      return {
        ...state,
        userSurname: action.payload,
      };

    case "SET_USER_EMAIL":
      return {
        ...state,
        userEmail: action.payload,
      };

    case "SET_USER_ADMINISTRATOR":
      return {
        ...state,
        userAdministrator: action.payload,
      };
      case "SET_USER_ID":
        return {
          ...state,
          userId: action.payload,
        };

    case "UPDATE_PRODUCT_CATEGORY":
      return {
        ...state,
        tour: state.tour.map((producto) =>
          producto.id === action.payload.productoId
            ? { ...producto, categoria: action.payload.categoria }
            : producto
        ),
      };

      case 'DELETE_PRODUCT':
        return {
          ...state,
          tour: state.tour.filter(producto => producto.id !== action.payload),
        };
        case "SET_DATE_RESERVED":
          return {
            ...state,
            dataReserved: action.payload,
          };
          case "SET_PEOPLE":
            return {
              ...state,
              people: action.payload,
            };
            case "SET_ID_RESERVATION":
              return {
                ...state,
                reservationId: action.payload,
              };
            case "SET_PRICE_RESERVED":
            return {
              ...state,
              priceReserved: action.payload,
            };
            case "TOGGLE_SEARCH_FORM":  // Nueva acción para manejar la visibilidad del formulario
            return { ...state, showSearchForm: action.payload };

    default:
      return state;
  }
};