export const createCostTemplate = (data) => {

  const {price} = data;

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`;
};
