import { RootState } from "redux/store";

const getCitiesList = (state: RootState) => state.cities.selectedIds;

const citiesSelectors = {
  getCitiesList,
};
export default citiesSelectors;
