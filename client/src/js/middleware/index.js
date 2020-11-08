
const forbiddenWords = ["HarryPotter","LordOfRings","Ulysses"];
export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      return next(action);
    };
  };
}