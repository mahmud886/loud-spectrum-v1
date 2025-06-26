export const getDimensionsByVolume = (totalCartVolumes) => {
  switch (true) {
    case totalCartVolumes <= 5: // 5ml
      return { height: 2, width: 1, length: 1 };
    case totalCartVolumes <= 20: // 20ml
      return { height: 3, width: 1.25, length: 1.25 };
    case totalCartVolumes <= 50: // 50ml
      return { height: 4, width: 1.75, length: 1.75 };
    case totalCartVolumes <= 100: // 100ml
      return { height: 5, width: 2, length: 2 };
    case totalCartVolumes <= 500: // 500ml
      return { height: 8, width: 3, length: 3 };
    case totalCartVolumes <= 1000: // 1000ml
      return { height: 10, width: 4, length: 4 };
    case totalCartVolumes > 1000: // 1 gallon
      return { height: 12, width: 8, length: 8 };
    default:
      return { height: 0, width: 0, length: 0 };
  }
};
