import { DirectionModel, DirectionModelEnum } from "../api";

export const sortTypeMapData = <T>(data: T[], sortBy: keyof T, sortDirection: DirectionModel) => {

  if (sortBy && sortDirection) {
    return data.sort((a: T, b: T) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) {
        return sortDirection === DirectionModelEnum.ASCENDING ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === DirectionModelEnum.ASCENDING ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  return data;

}