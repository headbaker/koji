export type Recipe = {
  id: string
  title: string
  description: string
  servings: number
  prepMinutes: number
  cookMinutes: number
  ingredients: { item: string; qty?: string }[]
  steps: string[]
  tags: string[]
}

export const RECIPES: Recipe[] = [
  {
    id: 'koji-miso-soup',
    title: 'Miso Soup (rápida)',
    description: 'Base simple: dashi + miso + tofu + alga. 10 min.',
    servings: 2,
    prepMinutes: 3,
    cookMinutes: 7,
    tags: ['japonés', 'rápida', 'caldo'],
    ingredients: [
      { item: 'Agua', qty: '500 ml' },
      { item: 'Dashi (instantáneo o casero)', qty: '1 cdita / al gusto' },
      { item: 'Pasta miso', qty: '1–2 cdas' },
      { item: 'Tofu firme', qty: '150 g' },
      { item: 'Wakame seco', qty: '1 cdita' },
      { item: 'Cebollín', qty: 'al gusto' },
    ],
    steps: [
      'Calienta el agua y disuelve el dashi.',
      'Agrega el wakame y el tofu en cubos; cocina 2–3 min.',
      'Apaga el fuego. Disuelve el miso en un bowl con un poco de caldo y regresa a la olla (no lo hiervas fuerte).',
      'Sirve y termina con cebollín.',
    ],
  },
  {
    id: 'chicken-rice-bowl',
    title: 'Chicken Rice Bowl (meal prep)',
    description: 'Pollo + arroz + veggies. Perfecto para 3–4 lunches.',
    servings: 4,
    prepMinutes: 10,
    cookMinutes: 20,
    tags: ['meal-prep', 'alto-proteína', 'simple'],
    ingredients: [
      { item: 'Pechuga de pollo', qty: '600 g' },
      { item: 'Arroz (crudo)', qty: '1 taza' },
      { item: 'Brócoli', qty: '2 tazas' },
      { item: 'Salsa de soya', qty: '2 cdas' },
      { item: 'Ajo', qty: '2 dientes' },
      { item: 'Limón', qty: '1' },
      { item: 'Aceite', qty: '1 cda' },
      { item: 'Sal y pimienta', qty: 'al gusto' },
    ],
    steps: [
      'Cocina el arroz.',
      'Sazona el pollo con sal/pimienta, ajo, soya y limón. Sella en sartén 5–6 min por lado.',
      'Cocina el brócoli al vapor o salteado 4–5 min.',
      'Arma bowls: arroz + pollo + brócoli. Guarda en tuppers.',
    ],
  },
  {
    id: 'oats-yogurt-fruit',
    title: 'Avena con yogurt y fruta',
    description: 'Desayuno rápido: saciante, barato y fácil de ajustar.',
    servings: 1,
    prepMinutes: 5,
    cookMinutes: 0,
    tags: ['desayuno', 'rápida', 'sin-cocción'],
    ingredients: [
      { item: 'Yogurt natural o griego', qty: '200 g' },
      { item: 'Avena', qty: '40–60 g' },
      { item: 'Miel o maple', qty: '1 cdita (opcional)' },
      { item: 'Fruta (plátano/fresas)', qty: '1 taza' },
      { item: 'Canela', qty: 'al gusto' },
      { item: 'Nueces o cacahuate', qty: '1 puñado (opcional)' },
    ],
    steps: [
      'Mezcla yogurt + avena + canela.',
      'Agrega fruta encima.',
      'Endulza si quieres y termina con nueces.',
    ],
  },
]