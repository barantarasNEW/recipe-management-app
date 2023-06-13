const BASE_URL = "https://647a26e2a455e257fa646388.mockapi.io/";

export const getRecipes = () => {
  return fetch(`${BASE_URL}recipes`)
    .then(res => res.json())
    .then(res => res);
};

export const getRecipe = (id: number) => {
  return fetch(`${BASE_URL}recipes/${id}`)
    .then(res => res.json())
    .then(res => res);
};