import { RootState } from "redux/store";

const getCitiesList = (state: RootState) => state.cities.list;

const citiesSelectors = {
  getCitiesList,
};
export default citiesSelectors;
