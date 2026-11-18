function normalizeCategoryId(categoryId) {
  return String(categoryId ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function resolveCategoryId(categoryId, categoryIds) {
  const normalizedCategoryId = normalizeCategoryId(categoryId);
  return categoryIds.find((id) => normalizeCategoryId(id) === normalizedCategoryId) ?? categoryId;
}

export function isCatalogNavigationItemActive(location, categoryId) {
  if (location.pathname !== '/catalog') return false;

  const currentCategoryId = new URLSearchParams(location.search).get('cat');
  const isAllProductsSelected = !currentCategoryId || normalizeCategoryId(currentCategoryId) === 'todos';

  if (categoryId === null) return isAllProductsSelected;
  if (isAllProductsSelected) return false;

  return normalizeCategoryId(currentCategoryId) === normalizeCategoryId(categoryId);
}
