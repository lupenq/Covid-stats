import React from "react";
export const LanguageContext = React.createContext('');

export const initialLanguageState = {
  language: 'Ru'
};

export const languageReducer = (state, action) => {
  switch(action.type) {
    case 'Ru':
      return {
        language: 'Ru'
      };
    case 'En':
      return {
        language: 'En'
      };
    default:
      return state
  }
};