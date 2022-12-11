export interface ICitiesState {
  selectedIds: number[];
}

// Add new city

export interface IAddNewCityPayload {
  newId: number;
}

// Delete city

export interface IDeleteCityPayload {
  delId: number;
}
