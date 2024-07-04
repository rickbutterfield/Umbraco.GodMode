import { DirectionModel } from "../api";

export const sortData = <T>(data: T[], sortBy: keyof T, sortDirection: DirectionModel) => {

  if (sortBy && sortDirection) {
    return data.sort((a: T, b: T) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) {
        return sortDirection === DirectionModel.ASCENDING ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === DirectionModel.ASCENDING ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  return data;

}